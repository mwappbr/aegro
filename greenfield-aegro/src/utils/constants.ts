/**
 * Application Constants
 * Environment configuration and application-wide constants
 */

// API Configuration
export const API_BASE_URL: string =
  import.meta.env.VITE_HN_API_BASE_URL ||
  'https://hacker-news.firebaseio.com/v0'
export const API_TIMEOUT: number =
  Number(import.meta.env.VITE_API_TIMEOUT) || 10000

// Cache Configuration
export const CACHE_ENABLED: boolean =
  import.meta.env.VITE_ENABLE_CACHE === 'true'
export const CACHE_TTL_MS: number =
  Number(import.meta.env.VITE_CACHE_TTL_MS) || 300000

// Pagination & Display Settings
export const STORIES_PER_PAGE: number = 30
export const COMMENTS_BATCH_SIZE: number = 20
export const MAX_COMMENT_DEPTH: number = 5

// Application Metadata
export const APP_TITLE: string =
  import.meta.env.VITE_APP_TITLE || 'HN Acessível'
export const APP_VERSION: string = import.meta.env.VITE_APP_VERSION || '1.0.0'

// Cache Keys
export const CACHE_KEYS = {
  TOP_STORIES: 'hn:top-stories',
  NEW_STORIES: 'hn:new-stories',
  BEST_STORIES: 'hn:best-stories',
  ASK_STORIES: 'hn:ask-stories',
  SHOW_STORIES: 'hn:show-stories',
  JOB_STORIES: 'hn:job-stories',
  STORY_ITEM: (id: number): string => `hn:story:${id}`,
  COMMENT_ITEM: (id: number): string => `hn:comment:${id}`,
  USER_PROFILE: (username: string): string => `hn:user:${username}`,
} as const

// Story Types
export const STORY_TYPES = {
  TOP: 'topstories',
  NEW: 'newstories',
  BEST: 'beststories',
  ASK: 'askstories',
  SHOW: 'showstories',
  JOB: 'jobstories',
} as const

export type StoryType = (typeof STORY_TYPES)[keyof typeof STORY_TYPES]
