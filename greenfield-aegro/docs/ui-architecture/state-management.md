# State Management

## Store Structure

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

## State Management Template

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

## State Patterns

1. **Composable-based**: All state managed via composables, no global store
2. **Readonly exports**: State refs exported as readonly to prevent external mutation
3. **Cache-first**: Check localStorage cache before API calls
4. **Error boundaries**: Each composable handles its own error state
5. **Loading states**: Explicit loading flags for UI feedback

---
