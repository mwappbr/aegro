# HackerNews Redesign for Senior Tech Enthusiasts - Frontend Architecture Document

---

## Change Log

| Date | Version | Description | Author |
|------|---------|-------------|--------|
| 2026-01-20 | 1.0 | Initial frontend architecture document | Winston (Architect) |

---

## Template and Framework Selection

### Framework Decision

**Selected Stack:** Vue 3 + TypeScript + Vite (via create-vue)

**Rationale:**
- PRD explicitly specifies Vue.js 3 with TypeScript and Composition API
- Vite provides fast HMR and optimized production builds
- No starter template required - custom accessible design system will be built from scratch
- Full control over component implementation needed for WCAG 2.1 AA compliance

**Constraints from Starter:**
- None - vanilla Vue 3 setup allows maximum flexibility
- All tooling, components, and patterns will follow accessibility-first approach

---

## Frontend Tech Stack

### Technology Stack Table

| Category | Technology | Version | Purpose | Rationale |
|----------|------------|---------|---------|-----------|
| Framework | Vue.js 3 | ^3.4.x | Core SPA framework | Composition API, excellent TypeScript support, reactive data binding |
| UI Library | Custom Components | N/A | Accessible component library | Full control over accessibility, no third-party UI framework per UX spec |
| State Management | Vue Composables + Reactive | Built-in | Application state | Lightweight, sufficient for read-only app, no Pinia/Vuex overhead needed |
| Routing | Vue Router | ^4.3.x | Client-side routing | Official router, supports lazy loading, navigation guards |
| Build Tool | Vite | ^5.x | Development & bundling | Fast HMR, optimized builds, native ESM support |
| Styling | Tailwind CSS | ^3.4.x | Utility-first CSS | Rapid development, design tokens, responsive utilities, tree-shaking |
| Testing | Vitest + Vue Test Utils | ^1.x / ^2.x | Unit & integration tests | Fast, Vite-native, excellent Vue component testing |
| Component Library | Custom (Accessible) | N/A | UI components | Built in-house following WCAG 2.1 AA, Flaticon Uicons for icons |
| Form Handling | Native + Composables | N/A | Form state (future) | Not needed in MVP (read-only), prepared for future enhancements |
| Animation | Vue Transitions + CSS | Built-in | Micro-interactions | Native Vue transitions, CSS animations, respects prefers-reduced-motion |
| Dev Tools | Vue DevTools, ESLint, Prettier | Latest | Development experience | Debugging, code quality, consistent formatting |
| HTTP Client | Native Fetch API | Built-in | API requests | Lightweight, no axios needed for simple REST calls |
| HTML Sanitization | DOMPurify | ^3.x | XSS prevention | Sanitize HTML comments from HackerNews API |
| Date Formatting | date-fns | ^3.x | Relative time display | Lightweight alternative to moment.js, tree-shakeable |

### Additional Dependencies

```json
{
  "dependencies": {
    "vue": "^3.4.0",
    "vue-router": "^4.3.0",
    "dompurify": "^3.0.0",
    "date-fns": "^3.0.0"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^5.0.0",
    "typescript": "^5.3.0",
    "vite": "^5.0.0",
    "tailwindcss": "^3.4.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0",
    "vitest": "^1.0.0",
    "@vue/test-utils": "^2.4.0",
    "vitest-axe": "^0.1.0",
    "eslint": "^8.56.0",
    "eslint-plugin-vue": "^9.20.0",
    "eslint-plugin-vuejs-accessibility": "^2.2.0",
    "prettier": "^3.2.0",
    "@types/dompurify": "^3.0.0"
  }
}
```

---

## Project Structure

```plaintext
src/
├── App.vue                          # Root component with layout
├── main.ts                          # Application entry point
├── router/
│   └── index.ts                     # Vue Router configuration
├── assets/
│   ├── styles/
│   │   ├── main.css                 # Global styles + Tailwind imports
│   │   └── variables.css            # CSS custom properties (design tokens)
│   └── fonts/                       # Local font files (Roboto) if self-hosted
├── components/
│   ├── common/                      # Shared/reusable components
│   │   ├── AppButton.vue            # Accessible button component
│   │   ├── AppCard.vue              # Card container component
│   │   ├── AppBreadcrumb.vue        # Breadcrumb navigation
│   │   ├── AppSpinner.vue           # Loading spinner
│   │   ├── AppSkeleton.vue          # Skeleton loading placeholder
│   │   ├── AppErrorMessage.vue      # Error state display
│   │   └── AppIcon.vue              # Icon wrapper (Flaticon Uicons)
│   ├── layout/
│   │   ├── TheHeader.vue            # Site header with navigation
│   │   ├── TheFooter.vue            # Site footer
│   │   └── TheSkipLink.vue          # Skip to main content link
│   ├── story/
│   │   ├── StoryCard.vue            # Article preview card for list
│   │   ├── StoryList.vue            # List of story cards
│   │   ├── StoryDetail.vue          # Full article view
│   │   └── StoryMeta.vue            # Metadata display (author, time, points)
│   └── comment/
│       ├── CommentItem.vue          # Single comment with collapse
│       ├── CommentList.vue          # List of root comments
│       └── CommentThread.vue        # Recursive nested comments
├── composables/
│   ├── useApi.ts                    # Generic API fetch wrapper
│   ├── useHackerNews.ts             # HackerNews-specific API calls
│   ├── useRelativeTime.ts           # Date formatting (date-fns)
│   ├── useLocalStorage.ts           # Cache management
│   └── useAccessibility.ts          # Focus management, announcements
├── services/
│   ├── api/
│   │   ├── client.ts                # Fetch client with error handling
│   │   └── hackerNewsApi.ts         # HackerNews API service
│   └── cache/
│       └── storageCache.ts          # localStorage cache utilities
├── types/
│   ├── story.ts                     # Story/Item type definitions
│   ├── comment.ts                   # Comment type definitions
│   └── api.ts                       # API response types
├── utils/
│   ├── sanitize.ts                  # DOMPurify wrapper
│   ├── formatters.ts                # Text/number formatters
│   └── constants.ts                 # App constants (API URLs, timeouts)
├── views/
│   ├── HomeView.vue                 # Homepage with story list
│   ├── StoryView.vue                # Individual story page
│   └── NotFoundView.vue             # 404 error page
└── __tests__/
    ├── components/                  # Component unit tests
    ├── composables/                 # Composable tests
    └── services/                    # Service tests
```

### Directory Conventions

- **components/**: Organized by feature domain (common, layout, story, comment)
- **composables/**: Reusable composition functions (use* prefix)
- **services/**: External integrations and business logic
- **types/**: TypeScript interfaces and type definitions
- **views/**: Route-level page components
- **__tests__/**: Mirrors src/ structure for easy test discovery

---

## Component Standards

### Component Template

```typescript
<script setup lang="ts">
/**
 * ComponentName
 * @description Brief description of component purpose
 * @example <ComponentName :prop="value" @event="handler" />
 */

// --- Imports ---
import { ref, computed, onMounted } from 'vue'
import type { PropType } from 'vue'

// --- Types ---
interface Props {
  /** Description of the prop */
  title: string
  /** Optional prop with default */
  variant?: 'primary' | 'secondary'
}

interface Emits {
  (e: 'click', payload: MouseEvent): void
  (e: 'update', value: string): void
}

// --- Props & Emits ---
const props = withDefaults(defineProps<Props>(), {
  variant: 'primary'
})

const emit = defineEmits<Emits>()

// --- Reactive State ---
const isLoading = ref(false)

// --- Computed ---
const buttonClasses = computed(() => ({
  'btn-primary': props.variant === 'primary',
  'btn-secondary': props.variant === 'secondary'
}))

// --- Methods ---
function handleClick(event: MouseEvent): void {
  emit('click', event)
}

// --- Lifecycle ---
onMounted(() => {
  // Initialization logic
})

// --- Expose (if needed) ---
defineExpose({
  // Public methods/properties
})
</script>

<template>
  <div
    class="component-name"
    :class="buttonClasses"
    role="button"
    tabindex="0"
    :aria-label="title"
    @click="handleClick"
    @keydown.enter="handleClick"
    @keydown.space.prevent="handleClick"
  >
    <slot />
  </div>
</template>

<style scoped>
.component-name {
  /* Component-specific styles */
}
</style>
```

### Naming Conventions

| Element | Convention | Example |
|---------|------------|---------|
| Components | PascalCase, descriptive | `StoryCard.vue`, `AppButton.vue` |
| Composables | camelCase with `use` prefix | `useHackerNews.ts`, `useRelativeTime.ts` |
| Services | camelCase | `hackerNewsApi.ts`, `storageCache.ts` |
| Types/Interfaces | PascalCase | `Story`, `Comment`, `ApiResponse` |
| Constants | SCREAMING_SNAKE_CASE | `API_BASE_URL`, `CACHE_TTL_MS` |
| CSS Classes | kebab-case (BEM-like) | `story-card`, `story-card__title` |
| Event Handlers | camelCase with handle/on prefix | `handleClick`, `onSubmit` |
| Props | camelCase | `isLoading`, `storyId` |
| Refs | camelCase | `isExpanded`, `commentData` |

### Component Categories

| Prefix | Purpose | Example |
|--------|---------|---------|
| `App` | Global reusable components | `AppButton`, `AppCard`, `AppSpinner` |
| `The` | Singleton layout components | `TheHeader`, `TheFooter`, `TheSkipLink` |
| `Story` | Story/article domain | `StoryCard`, `StoryList`, `StoryDetail` |
| `Comment` | Comment domain | `CommentItem`, `CommentList`, `CommentThread` |

---

## State Management

### Store Structure

```plaintext
src/composables/
├── useApi.ts                    # Generic fetch with loading/error states
├── useHackerNews.ts             # HackerNews data fetching
│   ├── useTopStories()          # Fetch top stories list
│   ├── useStory(id)             # Fetch single story
│   └── useComments(ids)         # Fetch comment tree
├── useLocalStorage.ts           # Persistent cache
│   ├── useStorageCache()        # Generic cache operations
│   └── CACHE_KEYS               # Cache key constants
└── useAccessibility.ts          # A11y utilities
    ├── useAnnounce()            # Screen reader announcements
    └── useFocusManagement()     # Focus trap and restoration
```

### State Management Template

```typescript
// composables/useHackerNews.ts
import { ref, readonly } from 'vue'
import type { Ref } from 'vue'
import { hackerNewsApi } from '@/services/api/hackerNewsApi'
import { useStorageCache } from './useLocalStorage'
import type { Story, Comment } from '@/types'

// --- Types ---
interface UseTopStoriesReturn {
  stories: Readonly<Ref<Story[]>>
  isLoading: Readonly<Ref<boolean>>
  error: Readonly<Ref<Error | null>>
  fetchStories: () => Promise<void>
  refresh: () => Promise<void>
}

// --- Constants ---
const CACHE_KEY = 'hn_top_stories'
const CACHE_TTL = 5 * 60 * 1000 // 5 minutes

// --- Composable ---
export function useTopStories(): UseTopStoriesReturn {
  // State
  const stories = ref<Story[]>([])
  const isLoading = ref(false)
  const error = ref<Error | null>(null)

  // Cache
  const { get: getCache, set: setCache } = useStorageCache<Story[]>(CACHE_KEY)

  // Actions
  async function fetchStories(): Promise<void> {
    // Check cache first
    const cached = getCache()
    if (cached) {
      stories.value = cached
      return
    }

    isLoading.value = true
    error.value = null

    try {
      const ids = await hackerNewsApi.getTopStoryIds()
      const limitedIds = ids.slice(0, 30) // Limit to 30 stories
      const fetchedStories = await hackerNewsApi.getStoriesByIds(limitedIds)
      
      stories.value = fetchedStories
      setCache(fetchedStories, CACHE_TTL)
    } catch (e) {
      error.value = e instanceof Error ? e : new Error('Failed to fetch stories')
    } finally {
      isLoading.value = false
    }
  }

  async function refresh(): Promise<void> {
    // Clear cache and refetch
    setCache([], 0) // Invalidate
    await fetchStories()
  }

  return {
    stories: readonly(stories),
    isLoading: readonly(isLoading),
    error: readonly(error),
    fetchStories,
    refresh
  }
}

// --- Single Story Composable ---
export function useStory(id: Ref<number> | number) {
  const story = ref<Story | null>(null)
  const isLoading = ref(false)
  const error = ref<Error | null>(null)

  async function fetchStory(): Promise<void> {
    const storyId = typeof id === 'number' ? id : id.value
    
    isLoading.value = true
    error.value = null

    try {
      story.value = await hackerNewsApi.getItem(storyId)
    } catch (e) {
      error.value = e instanceof Error ? e : new Error('Failed to fetch story')
    } finally {
      isLoading.value = false
    }
  }

  return {
    story: readonly(story),
    isLoading: readonly(isLoading),
    error: readonly(error),
    fetchStory
  }
}
```

### State Patterns

1. **Composable-based**: All state managed via composables, no global store
2. **Readonly exports**: State refs exported as readonly to prevent external mutation
3. **Cache-first**: Check localStorage cache before API calls
4. **Error boundaries**: Each composable handles its own error state
5. **Loading states**: Explicit loading flags for UI feedback

---

## API Integration

### Service Template

```typescript
// services/api/hackerNewsApi.ts
import { apiClient } from './client'
import type { Story, Comment, HNItem } from '@/types'

const BASE_URL = 'https://hacker-news.firebaseio.com/v0'

/**
 * HackerNews API Service
 * @see https://github.com/HackerNews/API
 */
export const hackerNewsApi = {
  /**
   * Get top story IDs
   * @returns Array of story IDs (up to 500)
   */
  async getTopStoryIds(): Promise<number[]> {
    return apiClient.get<number[]>(`${BASE_URL}/topstories.json`)
  },

  /**
   * Get a single item (story, comment, job, poll, etc.)
   * @param id - Item ID
   */
  async getItem(id: number): Promise<HNItem> {
    return apiClient.get<HNItem>(`${BASE_URL}/item/${id}.json`)
  },

  /**
   * Get multiple stories by IDs
   * @param ids - Array of story IDs
   */
  async getStoriesByIds(ids: number[]): Promise<Story[]> {
    const promises = ids.map(id => this.getItem(id))
    const items = await Promise.all(promises)
    return items.filter((item): item is Story => item?.type === 'story')
  },

  /**
   * Get comment tree recursively
   * @param commentIds - Root comment IDs
   * @param depth - Maximum recursion depth (default: 5)
   */
  async getCommentTree(
    commentIds: number[],
    depth: number = 5
  ): Promise<Comment[]> {
    if (depth === 0 || commentIds.length === 0) {
      return []
    }

    const comments: Comment[] = []
    
    for (const id of commentIds) {
      try {
        const item = await this.getItem(id)
        
        if (item && item.type === 'comment' && !item.deleted) {
          const comment: Comment = {
            id: item.id,
            by: item.by || '[deleted]',
            text: item.text || '',
            time: item.time,
            kids: [],
            parent: item.parent,
            deleted: item.deleted || false,
            dead: item.dead || false
          }

          // Recursively fetch child comments
          if (item.kids && item.kids.length > 0) {
            comment.kids = await this.getCommentTree(item.kids, depth - 1)
          }

          comments.push(comment)
        }
      } catch (error) {
        // Skip failed comments, don't block entire thread
        console.warn(`Failed to fetch comment ${id}:`, error)
      }
    }

    return comments
  }
}
```

### API Client Configuration

```typescript
// services/api/client.ts
import { API_TIMEOUT } from '@/utils/constants'

/**
 * API Error types
 */
export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public code?: string
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

export class NetworkError extends ApiError {
  constructor(message: string = 'Network error. Please check your connection.') {
    super(message, undefined, 'NETWORK_ERROR')
    this.name = 'NetworkError'
  }
}

export class TimeoutError extends ApiError {
  constructor(message: string = 'Request timed out. Please try again.') {
    super(message, undefined, 'TIMEOUT_ERROR')
    this.name = 'TimeoutError'
  }
}

/**
 * Fetch with timeout wrapper
 */
async function fetchWithTimeout(
  url: string,
  options: RequestInit = {},
  timeout: number = API_TIMEOUT
): Promise<Response> {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeout)

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal
    })
    return response
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      throw new TimeoutError()
    }
    throw new NetworkError()
  } finally {
    clearTimeout(timeoutId)
  }
}

/**
 * Generic API client
 */
export const apiClient = {
  async get<T>(url: string): Promise<T> {
    const response = await fetchWithTimeout(url)

    if (!response.ok) {
      throw new ApiError(
        `HTTP error ${response.status}`,
        response.status,
        'HTTP_ERROR'
      )
    }

    const data = await response.json()
    
    if (data === null) {
      throw new ApiError('Item not found', 404, 'NOT_FOUND')
    }

    return data as T
  }
}
```

---

## Routing

### Route Configuration

```typescript
// router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
    meta: {
      title: 'HN Acessível - Top Stories',
      announceOnEnter: 'Página inicial carregada. Lista de artigos principais.'
    }
  },
  {
    path: '/story/:id',
    name: 'story',
    component: () => import('@/views/StoryView.vue'),
    props: route => ({ id: Number(route.params.id) }),
    meta: {
      title: 'Carregando artigo...',
      announceOnEnter: 'Carregando artigo.'
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFoundView.vue'),
    meta: {
      title: 'Página não encontrada - HN Acessível',
      announceOnEnter: 'Erro 404. Página não encontrada.'
    }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // Restore scroll position on back navigation
    if (savedPosition) {
      return savedPosition
    }
    // Scroll to top on new navigation
    return { top: 0 }
  }
})

// --- Navigation Guards ---

// Update document title
router.beforeEach((to, from, next) => {
  const title = to.meta.title as string
  if (title) {
    document.title = title
  }
  next()
})

// Focus management for accessibility
router.afterEach((to) => {
  // Move focus to main content after navigation
  setTimeout(() => {
    const main = document.querySelector('main')
    if (main) {
      main.setAttribute('tabindex', '-1')
      main.focus()
      main.removeAttribute('tabindex')
    }
  }, 100)

  // Announce page change to screen readers
  const announcement = to.meta.announceOnEnter as string
  if (announcement) {
    announceToScreenReader(announcement)
  }
})

/**
 * Announce message to screen readers via live region
 */
function announceToScreenReader(message: string): void {
  const announcer = document.getElementById('sr-announcer')
  if (announcer) {
    announcer.textContent = ''
    setTimeout(() => {
      announcer.textContent = message
    }, 50)
  }
}

export default router
```

### Route Meta Types

```typescript
// types/router.ts
import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    title?: string
    announceOnEnter?: string
    requiresAuth?: boolean // Future use
  }
}
```

---

## Styling Guidelines

### Styling Approach

**Primary:** Tailwind CSS with custom design tokens  
**Secondary:** Vue scoped styles for component-specific overrides  
**Icons:** Flaticon Uicons via CDN

**Methodology:**
- Utility-first with Tailwind for rapid development
- Custom CSS properties (design tokens) for theming
- Scoped styles only when Tailwind insufficient
- No CSS-in-JS or styled-components

### Global Theme Variables

```css
/* assets/styles/variables.css */

:root {
  /* === COLOR PALETTE === */
  
  /* Primary Blues */
  --color-primary: #1e40af;
  --color-primary-light: #3b82f6;
  --color-primary-dark: #1e3a8a;
  --color-secondary: #60a5fa;
  --color-accent: #93c5fd;
  
  /* Semantic Colors */
  --color-success: #10b981;
  --color-warning: #f59e0b;
  --color-error: #ef4444;
  
  /* Neutral Grays */
  --color-gray-900: #111827;
  --color-gray-700: #374151;
  --color-gray-500: #6b7280;
  --color-gray-300: #d1d5db;
  --color-gray-100: #f3f4f6;
  --color-gray-50: #f9fafb;
  --color-white: #ffffff;
  
  /* === TYPOGRAPHY === */
  
  /* Font Families */
  --font-family-base: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
  --font-family-mono: 'Roboto Mono', 'Courier New', monospace;
  
  /* Font Sizes */
  --font-size-xs: 0.75rem;    /* 12px */
  --font-size-sm: 0.875rem;   /* 14px */
  --font-size-base: 1rem;     /* 16px */
  --font-size-lg: 1.125rem;   /* 18px */
  --font-size-xl: 1.25rem;    /* 20px */
  --font-size-2xl: 1.5rem;    /* 24px */
  --font-size-3xl: 2rem;      /* 32px */
  
  /* Font Weights */
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
  
  /* Line Heights */
  --line-height-tight: 1.2;
  --line-height-snug: 1.3;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.6;
  
  /* === SPACING === */
  
  --spacing-xs: 0.25rem;   /* 4px */
  --spacing-sm: 0.5rem;    /* 8px */
  --spacing-md: 0.75rem;   /* 12px */
  --spacing-base: 1rem;    /* 16px */
  --spacing-lg: 1.25rem;   /* 20px */
  --spacing-xl: 1.5rem;    /* 24px */
  --spacing-2xl: 2rem;     /* 32px */
  --spacing-3xl: 3rem;     /* 48px */
  --spacing-4xl: 4rem;     /* 64px */
  
  /* === LAYOUT === */
  
  --max-width-content: 800px;
  --max-width-container: 1200px;
  --header-height: 80px;
  --header-height-mobile: 64px;
  
  /* === BORDERS & SHADOWS === */
  
  --border-radius-sm: 0.25rem;  /* 4px */
  --border-radius-md: 0.5rem;   /* 8px */
  --border-radius-lg: 0.75rem;  /* 12px */
  
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
  --shadow-hover: 0 4px 12px rgba(0, 0, 0, 0.15);
  
  /* === FOCUS === */
  
  --focus-ring-color: var(--color-primary);
  --focus-ring-width: 3px;
  --focus-ring-offset: 2px;
  
  /* === TRANSITIONS === */
  
  --transition-fast: 150ms ease-out;
  --transition-normal: 200ms ease-in-out;
  --transition-slow: 300ms ease-in-out;
  
  /* === Z-INDEX === */
  
  --z-dropdown: 100;
  --z-sticky: 200;
  --z-fixed: 300;
  --z-modal: 400;
  --z-tooltip: 500;
}

/* === DARK MODE (Future) === */
/* 
@media (prefers-color-scheme: dark) {
  :root {
    --color-gray-900: #f9fafb;
    --color-gray-50: #111827;
    ...
  }
}
*/

/* === REDUCED MOTION === */

@media (prefers-reduced-motion: reduce) {
  :root {
    --transition-fast: 0ms;
    --transition-normal: 0ms;
    --transition-slow: 0ms;
  }
  
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* === FOCUS STYLES === */

:focus-visible {
  outline: var(--focus-ring-width) solid var(--focus-ring-color);
  outline-offset: var(--focus-ring-offset);
}

/* Remove default focus for mouse users */
:focus:not(:focus-visible) {
  outline: none;
}

/* === BASE STYLES === */

html {
  font-size: 16px;
  scroll-behavior: smooth;
}

body {
  font-family: var(--font-family-base);
  font-size: var(--font-size-base);
  line-height: var(--line-height-normal);
  color: var(--color-gray-900);
  background-color: var(--color-gray-50);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* === SCREEN READER ONLY === */

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* Skip Link - visible on focus */
.skip-link {
  position: absolute;
  top: -100%;
  left: 50%;
  transform: translateX(-50%);
  z-index: var(--z-fixed);
  padding: var(--spacing-sm) var(--spacing-lg);
  background: var(--color-primary);
  color: var(--color-white);
  border-radius: var(--border-radius-md);
  text-decoration: none;
  font-weight: var(--font-weight-semibold);
}

.skip-link:focus {
  top: var(--spacing-base);
}
```

### Tailwind Configuration

```javascript
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1e40af',
          light: '#3b82f6',
          dark: '#1e3a8a'
        },
        secondary: '#60a5fa',
        accent: '#93c5fd'
      },
      fontFamily: {
        sans: ['Roboto', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Arial', 'sans-serif'],
        mono: ['Roboto Mono', 'Courier New', 'monospace']
      },
      fontSize: {
        // Enforce minimum 14px (0.875rem)
        'xs': ['0.875rem', { lineHeight: '1.4' }],  // 14px, not 12px
        'sm': ['0.875rem', { lineHeight: '1.4' }],  // 14px
        'base': ['1rem', { lineHeight: '1.5' }],     // 16px
        'lg': ['1.125rem', { lineHeight: '1.6' }],   // 18px
        'xl': ['1.25rem', { lineHeight: '1.4' }],    // 20px
        '2xl': ['1.5rem', { lineHeight: '1.3' }],    // 24px
        '3xl': ['2rem', { lineHeight: '1.2' }],      // 32px
      },
      spacing: {
        '18': '4.5rem',  // 72px
        '22': '5.5rem',  // 88px
      },
      maxWidth: {
        'content': '800px',
        'container': '1200px'
      },
      minHeight: {
        'touch': '44px'  // Minimum touch target
      },
      boxShadow: {
        'hover': '0 4px 12px rgba(0, 0, 0, 0.15)'
      },
      borderRadius: {
        'card': '12px'
      }
    }
  },
  plugins: []
}
```

---

## Testing Requirements

### Component Test Template

```typescript
// __tests__/components/story/StoryCard.spec.ts
import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { axe, toHaveNoViolations } from 'vitest-axe'
import StoryCard from '@/components/story/StoryCard.vue'
import type { Story } from '@/types'

// Extend Vitest matchers
expect.extend(toHaveNoViolations)

// Mock data
const mockStory: Story = {
  id: 123,
  title: 'Test Story Title',
  url: 'https://example.com/article',
  by: 'testuser',
  score: 100,
  time: Math.floor(Date.now() / 1000) - 3600, // 1 hour ago
  descendants: 50,
  type: 'story',
  kids: [1, 2, 3]
}

describe('StoryCard', () => {
  // --- Rendering Tests ---
  describe('Rendering', () => {
    it('renders story title', () => {
      const wrapper = mount(StoryCard, {
        props: { story: mockStory }
      })
      
      expect(wrapper.text()).toContain('Test Story Title')
    })

    it('renders author name', () => {
      const wrapper = mount(StoryCard, {
        props: { story: mockStory }
      })
      
      expect(wrapper.text()).toContain('testuser')
    })

    it('renders score and comment count', () => {
      const wrapper = mount(StoryCard, {
        props: { story: mockStory }
      })
      
      expect(wrapper.text()).toContain('100')
      expect(wrapper.text()).toContain('50')
    })

    it('renders relative time', () => {
      const wrapper = mount(StoryCard, {
        props: { story: mockStory }
      })
      
      // Should contain "há 1 hora" or similar
      expect(wrapper.text()).toMatch(/há.*hora/i)
    })

    it('extracts and displays domain from URL', () => {
      const wrapper = mount(StoryCard, {
        props: { story: mockStory }
      })
      
      expect(wrapper.text()).toContain('example.com')
    })
  })

  // --- Interaction Tests ---
  describe('Interactions', () => {
    it('emits click event when card is clicked', async () => {
      const wrapper = mount(StoryCard, {
        props: { story: mockStory }
      })
      
      await wrapper.trigger('click')
      
      expect(wrapper.emitted('click')).toBeTruthy()
      expect(wrapper.emitted('click')![0]).toEqual([mockStory.id])
    })

    it('responds to Enter key press', async () => {
      const wrapper = mount(StoryCard, {
        props: { story: mockStory }
      })
      
      await wrapper.trigger('keydown.enter')
      
      expect(wrapper.emitted('click')).toBeTruthy()
    })

    it('responds to Space key press', async () => {
      const wrapper = mount(StoryCard, {
        props: { story: mockStory }
      })
      
      await wrapper.trigger('keydown.space')
      
      expect(wrapper.emitted('click')).toBeTruthy()
    })
  })

  // --- Accessibility Tests ---
  describe('Accessibility', () => {
    it('has no accessibility violations', async () => {
      const wrapper = mount(StoryCard, {
        props: { story: mockStory }
      })
      
      const results = await axe(wrapper.element)
      expect(results).toHaveNoViolations()
    })

    it('has correct ARIA attributes', () => {
      const wrapper = mount(StoryCard, {
        props: { story: mockStory }
      })
      
      const article = wrapper.find('article')
      expect(article.exists()).toBe(true)
      
      const link = wrapper.find('a')
      expect(link.attributes('aria-label')).toContain('Test Story Title')
    })

    it('is focusable via keyboard', () => {
      const wrapper = mount(StoryCard, {
        props: { story: mockStory }
      })
      
      const link = wrapper.find('a')
      expect(link.attributes('tabindex')).not.toBe('-1')
    })

    it('has semantic heading for title', () => {
      const wrapper = mount(StoryCard, {
        props: { story: mockStory }
      })
      
      const heading = wrapper.find('h2')
      expect(heading.exists()).toBe(true)
      expect(heading.text()).toBe('Test Story Title')
    })
  })

  // --- Edge Cases ---
  describe('Edge Cases', () => {
    it('handles story without URL (Ask HN)', () => {
      const askStory = { ...mockStory, url: undefined }
      const wrapper = mount(StoryCard, {
        props: { story: askStory }
      })
      
      expect(wrapper.text()).not.toContain('example.com')
    })

    it('handles story with zero comments', () => {
      const noComments = { ...mockStory, descendants: 0 }
      const wrapper = mount(StoryCard, {
        props: { story: noComments }
      })
      
      expect(wrapper.text()).toContain('0')
    })

    it('handles very long titles gracefully', () => {
      const longTitle = { 
        ...mockStory, 
        title: 'A'.repeat(200) 
      }
      const wrapper = mount(StoryCard, {
        props: { story: longTitle }
      })
      
      // Should render without breaking
      expect(wrapper.find('h2').exists()).toBe(true)
    })
  })
})
```

### Testing Best Practices

1. **Unit Tests**: Test individual components in isolation
2. **Integration Tests**: Test component interactions and data flow
3. **E2E Tests**: Test critical user flows (using Playwright - future)
4. **Coverage Goals**: Aim for 80% code coverage on business logic
5. **Test Structure**: Arrange-Act-Assert pattern
6. **Mock External Dependencies**: API calls, routing, localStorage

### Test File Organization

```plaintext
src/__tests__/
├── components/
│   ├── common/
│   │   ├── AppButton.spec.ts
│   │   └── AppCard.spec.ts
│   ├── story/
│   │   ├── StoryCard.spec.ts
│   │   └── StoryList.spec.ts
│   └── comment/
│       └── CommentThread.spec.ts
├── composables/
│   ├── useHackerNews.spec.ts
│   └── useLocalStorage.spec.ts
├── services/
│   └── hackerNewsApi.spec.ts
└── setup.ts                        # Test setup and global mocks
```

---

## Environment Configuration

### Environment Variables

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

### Environment Type Definitions

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

### Constants File

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

## Frontend Developer Standards

### Critical Coding Rules

1. **Accessibility First**
   - ALL interactive elements must be keyboard accessible
   - ALWAYS use semantic HTML (`button`, `a`, `nav`, `main`, `article`)
   - NEVER use `outline: none` without providing alternative focus indicator
   - ALWAYS include `aria-label` on icon-only buttons
   - ALWAYS use `alt` text on images (empty `alt=""` for decorative)

2. **TypeScript Strict Mode**
   - NO use of `any` type (use `unknown` and type guards)
   - ALL functions must have explicit return types
   - ALL props must be typed with interfaces
   - Use `readonly` for refs that shouldn't be mutated externally

3. **Component Rules**
   - ONE component per file
   - Use `<script setup lang="ts">` syntax
   - Props interface before emits interface
   - Composables for reusable logic, not mixins
   - NO direct DOM manipulation (use refs and Vue reactivity)

4. **Styling Rules**
   - Tailwind utilities for most styling
   - CSS custom properties for theming
   - Scoped styles only when Tailwind insufficient
   - NEVER use `!important` (fix specificity properly)
   - Mobile-first responsive design

5. **State Management**
   - Composables for shared state
   - `readonly()` for exported state
   - NO global mutable state
   - Cache invalidation must be explicit

6. **Error Handling**
   - ALL API calls wrapped in try/catch
   - User-friendly error messages (Portuguese)
   - NEVER show raw error messages to users
   - Log errors to console for debugging

7. **Performance**
   - Lazy load route components
   - Use `v-memo` for expensive list renders
   - Debounce scroll/resize handlers
   - Cache API responses appropriately

8. **Testing**
   - Test accessibility with vitest-axe
   - Test keyboard navigation
   - Test loading and error states
   - Mock external dependencies

### Quick Reference

#### Common Commands

```bash
# Development
npm run dev              # Start dev server (Vite)
npm run build            # Production build
npm run preview          # Preview production build

# Testing
npm run test             # Run tests (Vitest)
npm run test:ui          # Vitest UI mode
npm run test:coverage    # Generate coverage report

# Linting & Formatting
npm run lint             # ESLint check
npm run lint:fix         # ESLint auto-fix
npm run format           # Prettier format

# Type Checking
npm run type-check       # Vue-tsc type check
```

#### Key Import Patterns

```typescript
// Vue Composition API
import { ref, computed, watch, onMounted } from 'vue'
import type { Ref, ComputedRef } from 'vue'

// Vue Router
import { useRouter, useRoute } from 'vue-router'
import type { RouteLocationNormalized } from 'vue-router'

// Composables (use @ alias)
import { useHackerNews } from '@/composables/useHackerNews'
import { useRelativeTime } from '@/composables/useRelativeTime'

// Types
import type { Story, Comment } from '@/types'

// Services
import { hackerNewsApi } from '@/services/api/hackerNewsApi'

// Utils
import { sanitizeHtml } from '@/utils/sanitize'
import { API_TIMEOUT, CACHE_KEYS } from '@/utils/constants'
```

#### File Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Vue Components | PascalCase.vue | `StoryCard.vue` |
| Composables | camelCase.ts | `useHackerNews.ts` |
| Services | camelCase.ts | `hackerNewsApi.ts` |
| Types | camelCase.ts | `story.ts` |
| Utils | camelCase.ts | `sanitize.ts` |
| Tests | *.spec.ts | `StoryCard.spec.ts` |
| CSS | kebab-case.css | `variables.css` |

#### Project-Specific Patterns

```typescript
// Accessible Button Pattern
<button
  type="button"
  class="min-h-touch px-6 py-3 ..."
  :aria-label="label"
  :aria-busy="isLoading"
  :disabled="isLoading"
  @click="handleClick"
>
  <AppIcon v-if="icon" :name="icon" aria-hidden="true" />
  <span>{{ text }}</span>
</button>

// API Call Pattern
const { data, isLoading, error, execute } = useApi<Story[]>(
  () => hackerNewsApi.getTopStories()
)

// Relative Time Pattern
const timeAgo = useRelativeTime(story.time) // Returns "há 2 horas"

// Safe HTML Rendering
<div v-html="sanitizeHtml(comment.text)" />
```

---

## Appendix: Type Definitions

```typescript
// types/story.ts
export interface Story {
  id: number
  title: string
  url?: string
  text?: string
  by: string
  score: number
  time: number
  descendants: number
  type: 'story' | 'job' | 'poll'
  kids?: number[]
}

// types/comment.ts
export interface Comment {
  id: number
  by: string
  text: string
  time: number
  parent: number
  kids: Comment[]
  deleted: boolean
  dead: boolean
}

// types/api.ts
export interface HNItem {
  id: number
  type: 'story' | 'comment' | 'job' | 'poll' | 'pollopt'
  by?: string
  time: number
  text?: string
  dead?: boolean
  deleted?: boolean
  parent?: number
  poll?: number
  kids?: number[]
  url?: string
  score?: number
  title?: string
  parts?: number[]
  descendants?: number
}

export type ApiState = 'idle' | 'loading' | 'success' | 'error'

export interface ApiResponse<T> {
  data: T | null
  state: ApiState
  error: Error | null
}
```

---

*Document generated by Winston (Architect) using BMAD™ Core on 2026-01-20*
