# API Integration

## Service Template

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

## API Client Configuration

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
