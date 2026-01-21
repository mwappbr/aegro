# Component Standards

## Component Template

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

## Naming Conventions

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

## Component Categories

| Prefix | Purpose | Example |
|--------|---------|---------|
| `App` | Global reusable components | `AppButton`, `AppCard`, `AppSpinner` |
| `The` | Singleton layout components | `TheHeader`, `TheFooter`, `TheSkipLink` |
| `Story` | Story/article domain | `StoryCard`, `StoryList`, `StoryDetail` |
| `Comment` | Comment domain | `CommentItem`, `CommentList`, `CommentThread` |

---
