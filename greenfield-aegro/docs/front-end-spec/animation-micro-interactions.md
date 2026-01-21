# Animation & Micro-interactions

## Motion Principles

1. **Purposeful, Not Decorative:** Animações servem para comunicar mudança de estado ou orientar atenção, nunca apenas para "enfeitar"
2. **Fast and Subtle:** Durações curtas (150-300ms), sem distrair ou retardar interação
3. **Respect User Preferences:** Respeitar `prefers-reduced-motion` para usuários sensíveis a movimento
4. **Ease Over Linear:** Usar easing curves naturais (ease-out, ease-in-out), evitar linear ou bouncy excessivo
5. **Consistent Timing:** Mesmas durações e easings para interações similares em toda aplicação

## Key Animations

- **Button Hover:** Transition de background-color e box-shadow, Duration: 150ms, Easing: ease-out
- **Button Press:** Scale transform (0.98), Duration: 100ms, Easing: ease-in-out
- **Card Hover:** Box-shadow elevation increase, Duration: 200ms, Easing: ease-out
- **Link Hover:** Underline appearance com transition, Duration: 150ms, Easing: ease
- **Page Transition:** Fade-in do conteúdo, Duration: 250ms, Easing: ease-in (opcional, não bloquear navegação)
- **Collapse/Expand Comments:** Height transition com overflow hidden + fade opacity, Duration: 200ms, Easing: ease-in-out
- **Loading Spinner:** Rotate 360deg infinito, Duration: 1000ms, Easing: linear
- **Skeleton Shimmer:** Translate X de gradiente linear, Duration: 1500ms, Easing: ease-in-out infinite
- **Focus Indicator:** Instant (0ms) ou very fast (50ms), sem delay para indicador aparecer
- **Error Shake:** Translate X (-10px → 10px → 0), Duration: 300ms, Easing: ease-in-out (apenas em erros de validação críticos)
- **Success Fade-in:** Opacity 0 → 1 + translate Y (-10px → 0), Duration: 300ms, Easing: ease-out
- **Tooltip Appear:** Opacity 0 → 1 + scale (0.95 → 1), Duration: 150ms, Easing: ease-out, Delay: 500ms (hover)

**Reduced Motion:**
- Media query: `@media (prefers-reduced-motion: reduce)`
- Quando detectado: Todas as animações reduzidas a 0ms (instant) ou removidas
- Exceções: Focus indicators permanecem (acessibilidade crítica)
- Loading states: Substitui spinner rotativo por pulsing opacity simples

**Implementation Notes:**
- Usar CSS transitions e animations quando possível (melhor performance que JS)
- Vue transitions (`<Transition>`) para componentes condicionais (collapse/expand, page transitions)
- RequestAnimationFrame para animações JS complexas (não necessário no MVP)
- Will-change property usado com cautela (apenas em elements com animation frequent)

---
