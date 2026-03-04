Adicionar ao AGENT.md:

** Tools & Integrations
Memory Search — memory-search/ in project dir, hybrid search (vector + BM25) over all .md files. Run python3 memory-search/search.py

** Automation (cron)
| Schedule | Script | Output |
|----------|--------|--------|
| Daily 6:30 UTC | search.py index | Re-indexes memory search |

** Memory Files
MEMORY.md stays in auto-memory for system prompt loading:
| File | Purpose | Loaded |
|------|---------|--------|
| MEMORY.md | Decisions log + lessons learned | Auto (system prompt) |
| SOUL.md | Claude's role, personality, values | Reference |
| USER.md | Mauro's profile and preferences | Reference |
| PROJECTS.md | Project index with summaries and architecture | Reference |
| projects/<name>/ | Per-project details, changelog, config notes | Searchable |
| servers.md | Full server inventory with specs | Reference |
| daily/ | Session logs (YYYY-MM-DD.md) | Searchable |
Search all memory: python3 memory-search/search.py query "search terms"

** Conventions
When adding new documentation, use Markdown format
