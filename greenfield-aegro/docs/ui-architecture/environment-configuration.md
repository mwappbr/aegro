# Environment Configuration

## Environment Variables

```bash
# .env.example

# API Configuration
VITE_HN_API_BASE_URL=https://hacker-news.firebaseio.com/v0
VITE_API_TIMEOUT=10000

# Feature Flags
VITE_ENABLE_CACHE=true
VITE_CACHE_TTL_MS=300000

# Build Configuration
VITE_APP_TITLE=HN Acessível
VITE_APP_VERSION=1.0.0

# Analytics (optional, future)
# VITE_GA_TRACKING_ID=UA-XXXXXXXX-X
```

## Environment Type Definitions

```typescript
// env.d.ts
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_HN_API_BASE_URL: string
  readonly VITE_API_TIMEOUT: string
  readonly VITE_ENABLE_CACHE: string
  readonly VITE_CACHE_TTL_MS: string
  readonly VITE_APP_TITLE: string
  readonly VITE_APP_VERSION: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
```

## Constants File

```typescript
// utils/constants.ts

// API
export const API_BASE_URL = import.meta.env.VITE_HN_API_BASE_URL || 'https://hacker-news.firebaseio.com/v0'
export const API_TIMEOUT = Number(import.meta.env.VITE_API_TIMEOUT) || 10000

// Cache
export const CACHE_ENABLED = import.meta.env.VITE_ENABLE_CACHE !== 'false'
export const CACHE_TTL_MS = Number(import.meta.env.VITE_CACHE_TTL_MS) || 5 * 60 * 1000 // 5 minutes

// Pagination
export const STORIES_PER_PAGE = 30
export const COMMENTS_BATCH_SIZE = 20
export const MAX_COMMENT_DEPTH = 5

// App
export const APP_TITLE = import.meta.env.VITE_APP_TITLE || 'HN Acessível'
export const APP_VERSION = import.meta.env.VITE_APP_VERSION || '1.0.0'

// Cache Keys
export const CACHE_KEYS = {
  TOP_STORIES: 'hn_top_stories',
  STORY_PREFIX: 'hn_story_',
  COMMENTS_PREFIX: 'hn_comments_'
} as const
```

---
