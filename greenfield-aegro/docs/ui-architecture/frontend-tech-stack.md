# Frontend Tech Stack

## Technology Stack Table

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

## Additional Dependencies

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
