# Testing Requirements

## Component Test Template

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

## Testing Best Practices

1. **Unit Tests**: Test individual components in isolation
2. **Integration Tests**: Test component interactions and data flow
3. **E2E Tests**: Test critical user flows (using Playwright - future)
4. **Coverage Goals**: Aim for 80% code coverage on business logic
5. **Test Structure**: Arrange-Act-Assert pattern
6. **Mock External Dependencies**: API calls, routing, localStorage

## Test File Organization

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
