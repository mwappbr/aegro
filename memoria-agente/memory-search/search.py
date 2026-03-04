#!/usr/bin/env python3
"""Memory search — hybrid vector + BM25 search over markdown files.

Usage:
    python search.py index              # Index all .md files
    python search.py status             # Show index stats
    python search.py query "text"       # Search (top 5)
    python search.py query "text" --json # JSON output
    python search.py query "text" -n 10 # Top N results
"""

import argparse
import hashlib
import json
import os
import re
import sys
import time
from pathlib import Path

import numpy as np
from fastembed import TextEmbedding
from rank_bm25 import BM25Okapi

# --- Config ---
SCRIPT_DIR = Path(__file__).resolve().parent
CACHE_FILE = SCRIPT_DIR / ".cache.json"
MODEL_NAME = "BAAI/bge-small-en-v1.5"
VECTOR_WEIGHT = 0.7
BM25_WEIGHT = 0.3

# Paths to index — project repo + any Claude auto-memory directories
PROJECT_DIR = SCRIPT_DIR.parent  # ~/Projects/ci_cd_claude/ or /home/claude/project
CLAUDE_PROJECTS_DIR = Path.home() / ".claude" / "projects"

def get_search_paths() -> list[Path]:
    """Build search paths: project dir + all auto-memory dirs under .claude/projects/."""
    paths = [PROJECT_DIR]
    if CLAUDE_PROJECTS_DIR.exists():
        for d in CLAUDE_PROJECTS_DIR.iterdir():
            mem_dir = d / "memory"
            if mem_dir.is_dir():
                paths.append(mem_dir)
    return paths

SEARCH_PATHS = get_search_paths()


def find_md_files() -> list[Path]:
    """Find all .md files in search paths, excluding the memory-search dir."""
    files = []
    for base in SEARCH_PATHS:
        if not base.exists():
            continue
        for f in base.rglob("*.md"):
            # Skip files inside memory-search/ and hidden dirs
            if "memory-search" in f.parts:
                continue
            if any(p.startswith(".") for p in f.relative_to(base).parts):
                continue
            files.append(f)
    # Deduplicate by resolved path
    seen = set()
    unique = []
    for f in files:
        resolved = f.resolve()
        if resolved not in seen:
            seen.add(resolved)
            unique.append(f)
    return sorted(unique)


def chunk_markdown(content: str, file_path: str) -> list[dict]:
    """Split markdown by ## headers. Each chunk includes its header."""
    chunks = []
    # Split on ## headers (keep the header with the chunk)
    parts = re.split(r"(?=^## )", content, flags=re.MULTILINE)

    for part in parts:
        text = part.strip()
        if not text:
            continue
        # Extract header if present
        lines = text.split("\n", 1)
        header = lines[0].lstrip("#").strip() if lines[0].startswith("#") else "(intro)"
        chunks.append({
            "header": header,
            "content": text,
            "source": file_path,
            "hash": hashlib.md5(text.encode()).hexdigest(),
        })
    return chunks


def load_cache() -> dict:
    """Load embedding cache from disk."""
    if CACHE_FILE.exists():
        with open(CACHE_FILE) as f:
            return json.load(f)
    return {}


def save_cache(cache: dict):
    """Save embedding cache to disk."""
    with open(CACHE_FILE, "w") as f:
        json.dump(cache, f, separators=(",", ":"))


def get_model() -> TextEmbedding:
    """Load the embedding model."""
    return TextEmbedding(model_name=MODEL_NAME)


def cosine_similarity(a: list[float], b: list[float]) -> float:
    """Compute cosine similarity between two vectors."""
    a_np = np.array(a)
    b_np = np.array(b)
    dot = np.dot(a_np, b_np)
    norm = np.linalg.norm(a_np) * np.linalg.norm(b_np)
    if norm == 0:
        return 0.0
    return float(dot / norm)


def min_max_normalize(scores: list[float]) -> list[float]:
    """Normalize scores to [0, 1] range."""
    if not scores:
        return scores
    lo, hi = min(scores), max(scores)
    if hi == lo:
        return [1.0] * len(scores)
    return [(s - lo) / (hi - lo) for s in scores]


def tokenize(text: str) -> list[str]:
    """Simple whitespace + lowercase tokenizer."""
    return re.findall(r"\w+", text.lower())


# --- Commands ---

def cmd_index(args):
    """Index all .md files, caching embeddings."""
    files = find_md_files()
    if not files:
        print("No .md files found.")
        return

    cache = load_cache()
    model = None  # Lazy load
    total_chunks = 0
    files_updated = 0

    for f in files:
        key = str(f.resolve())
        mtime = os.path.getmtime(f)
        content = f.read_text(encoding="utf-8", errors="replace")
        chunks = chunk_markdown(content, key)
        total_chunks += len(chunks)

        # Check if file is already cached and unchanged
        if key in cache and cache[key].get("mtime") == mtime:
            # Verify chunk count matches
            if len(cache[key].get("chunks", [])) == len(chunks):
                continue

        # Need to (re-)embed this file
        if model is None:
            print(f"Loading model {MODEL_NAME}...")
            model = get_model()

        files_updated += 1
        texts = [c["content"] for c in chunks]
        embeddings = list(model.embed(texts))

        cache[key] = {
            "mtime": mtime,
            "chunks": [
                {
                    "header": c["header"],
                    "hash": c["hash"],
                    "embedding": emb.tolist(),
                }
                for c, emb in zip(chunks, embeddings)
            ],
        }
        print(f"  Indexed: {f.name} ({len(chunks)} chunks)")

    save_cache(cache)
    print(f"\nDone. {len(files)} files, {total_chunks} chunks total. {files_updated} files updated.")


def cmd_status(args):
    """Show index stats."""
    cache = load_cache()
    if not cache:
        print("No index found. Run: python search.py index")
        return

    total_chunks = sum(len(entry["chunks"]) for entry in cache.values())
    stale = 0
    for path, entry in cache.items():
        if not Path(path).exists() or os.path.getmtime(path) != entry.get("mtime"):
            stale += 1

    print(f"Files indexed: {len(cache)}")
    print(f"Total chunks:  {total_chunks}")
    print(f"Stale files:   {stale}")
    print(f"Cache file:    {CACHE_FILE}")
    print(f"Cache size:    {CACHE_FILE.stat().st_size / 1024:.1f} KB")


def cmd_query(args):
    """Hybrid search: vector + BM25."""
    query_text = args.query
    top_n = args.n
    output_json = args.json

    cache = load_cache()
    if not cache:
        print("No index found. Run: python search.py index", file=sys.stderr)
        sys.exit(1)

    # Collect all chunks with current content from disk + cached embeddings
    all_chunks = []
    for path, entry in cache.items():
        p = Path(path)
        if not p.exists():
            continue
        content = p.read_text(encoding="utf-8", errors="replace")
        file_chunks = chunk_markdown(content, path)

        # Match cached embeddings to current chunks by hash
        cached_by_hash = {c["hash"]: c["embedding"] for c in entry["chunks"]}
        for fc in file_chunks:
            if fc["hash"] in cached_by_hash:
                fc["embedding"] = cached_by_hash[fc["hash"]]
                all_chunks.append(fc)

    if not all_chunks:
        print("No indexed chunks available. Run: python search.py index", file=sys.stderr)
        sys.exit(1)

    # Vector search
    model = get_model()
    query_emb = list(model.embed([query_text]))[0].tolist()
    vector_scores = [cosine_similarity(query_emb, c["embedding"]) for c in all_chunks]

    # BM25 search
    tokenized_corpus = [tokenize(c["content"]) for c in all_chunks]
    tokenized_query = tokenize(query_text)
    bm25 = BM25Okapi(tokenized_corpus)
    bm25_scores = bm25.get_scores(tokenized_query).tolist()

    # Normalize and combine
    v_norm = min_max_normalize(vector_scores)
    b_norm = min_max_normalize(bm25_scores)
    combined = [
        VECTOR_WEIGHT * v + BM25_WEIGHT * b
        for v, b in zip(v_norm, b_norm)
    ]

    # Rank
    ranked = sorted(enumerate(combined), key=lambda x: x[1], reverse=True)[:top_n]

    if output_json:
        results = []
        for idx, score in ranked:
            c = all_chunks[idx]
            results.append({
                "score": round(score, 4),
                "source": c["source"],
                "section": c["header"],
                "content": c["content"][:500],
            })
        print(json.dumps(results, indent=2))
    else:
        for rank, (idx, score) in enumerate(ranked, 1):
            c = all_chunks[idx]
            source = Path(c["source"]).name
            print(f"\n{'─' * 60}")
            print(f"  #{rank}  score={score:.4f}  {source} → {c['header']}")
            print(f"{'─' * 60}")
            # Show first 3 lines of content
            lines = c["content"].strip().split("\n")[:3]
            for line in lines:
                print(f"  {line}")
            if len(c["content"].strip().split("\n")) > 3:
                print("  ...")


def main():
    parser = argparse.ArgumentParser(
        description="Hybrid search over markdown memory files"
    )
    sub = parser.add_subparsers(dest="command", required=True)

    sub.add_parser("index", help="Index all .md files")
    sub.add_parser("status", help="Show index stats")

    q = sub.add_parser("query", help="Search memory files")
    q.add_argument("query", help="Search query text")
    q.add_argument("-n", type=int, default=5, help="Number of results (default: 5)")
    q.add_argument("--json", action="store_true", help="Output as JSON")

    args = parser.parse_args()

    if args.command == "index":
        cmd_index(args)
    elif args.command == "status":
        cmd_status(args)
    elif args.command == "query":
        cmd_query(args)


if __name__ == "__main__":
    main()
