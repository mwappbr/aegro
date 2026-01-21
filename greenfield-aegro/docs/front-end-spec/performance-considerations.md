# Performance Considerations

## Performance Goals

- **Page Load (Homepage):** <3 segundos em banda larga (4G), <5 segundos em 3G
- **Interaction Response:** <100ms para feedback visual (hover, focus), <200ms para ações (click button)
- **Animation FPS:** 60fps consistente em todas as animações e scrolling

**Lighthouse Targets:**
- Performance: >=90
- Accessibility: 100 (não negociável)
- Best Practices: >=95
- SEO: >=90

## Design Strategies

**Asset Optimization:**
- **Fonts:** Usar apenas weights necessários do Roboto (400, 600, 700), subset para Latin + Latin Extended
- **Icons:** Inline SVG para ícones críticos (above fold), lazy load restante ou usar sprite sheet
- **Images:** (Futuras) WebP com fallback JPEG, lazy loading com intersection observer, responsive srcset
- **Favicon:** Otimizar para <10KB, fornecer múltiplos tamanhos

**Code Splitting:**
- Route-based splitting: HomePage e ArticlePage como chunks separados (Vue Router lazy loading)
- Component-level splitting: Carregar CommentThread apenas quando necessário (defineAsyncComponent)
- Vendor bundles: Separar dependencies grandes (DOMPurify) em chunk próprio

**Rendering Optimization:**
- **Virtual Scrolling:** Considerar para listas muito longas (>100 items), mas avaliar se adiciona complexidade desnecessária no MVP
- **Memoization:** Vue computed properties e v-memo para comentários aninhados (evitar re-renders)
- **Debounce/Throttle:** Aplicar em scroll events se houver listeners (não necessário no MVP)
- **Lazy Loading Comments:** Carregar apenas primeiros 20 comentários, "Load More" button para restante

**Caching Strategy:**
- **localStorage:** Cachear top stories por 5 minutos, cachear artigos individuais por 10 minutos
- **Service Worker:** (Futuro, não MVP) Estratégia stale-while-revalidate para API responses
- **HTTP Cache Headers:** Configurar em Vercel/Netlify para assets estáticos (fonts, icons) - cache longo com hashing

**Bundle Size:**
- Target: <500KB total JS bundle (main + chunks)
- Monitorar com bundlephobia.com e Vite bundle analyzer
- Evitar libraries pesadas desnecessárias (momentjs → usar date-fns ou Intl.DateTimeFormat nativo)

**Perceived Performance:**
- **Skeleton Screens:** Sempre preferir skeleton UI a spinners (dá sensação de velocidade)
- **Optimistic UI:** (Futuro) Mostrar estado de sucesso antes de confirmação da API (não aplicável a read-only MVP)
- **Instant Feedback:** Hover/focus states respondem imediatamente (0-50ms), não esperam network
- **Progressive Loading:** Mostrar conteúdo parcial enquanto resto carrega (ex: artigo sem comentários, depois adiciona)

**Monitoring:**
- Lighthouse CI em cada deploy
- Web Vitals tracking (Largest Contentful Paint, First Input Delay, Cumulative Layout Shift)
- Real User Monitoring (opcional): Google Analytics 4 com Web Vitals ou similar

---
