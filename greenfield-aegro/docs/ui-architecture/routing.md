# Routing

## Route Configuration

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

## Route Meta Types

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
