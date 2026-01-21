# Frontend Developer Standards

## Critical Coding Rules

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

## Quick Reference

### Common Commands

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

### Key Import Patterns

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

### File Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Vue Components | PascalCase.vue | `StoryCard.vue` |
| Composables | camelCase.ts | `useHackerNews.ts` |
| Services | camelCase.ts | `hackerNewsApi.ts` |
| Types | camelCase.ts | `story.ts` |
| Utils | camelCase.ts | `sanitize.ts` |
| Tests | *.spec.ts | `StoryCard.spec.ts` |
| CSS | kebab-case.css | `variables.css` |

### Project-Specific Patterns

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
