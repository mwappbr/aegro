# Responsiveness Strategy

## Breakpoints

| Breakpoint | Min Width | Max Width | Target Devices |
|------------|-----------|-----------|----------------|
| Mobile | 320px | 767px | iPhone SE, iPhone 12/13/14, Android phones |
| Tablet | 768px | 1023px | iPad, iPad Mini, Android tablets, landscape phones |
| Desktop | 1024px | 1439px | Laptops, small desktop monitors |
| Wide | 1440px | - | Large desktop monitors, 2K/4K displays |

**Testing Resolutions:**
- Mobile: 375x667 (iPhone SE), 390x844 (iPhone 14)
- Tablet: 768x1024 (iPad Portrait), 1024x768 (iPad Landscape)
- Desktop: 1280x720, 1920x1080
- Wide: 2560x1440 (optional enhancement)

## Adaptation Patterns

**Layout Changes:**

**Mobile (320-767px):**
- Single column layout exclusivamente
- Containers full-width com padding 16px
- Cards ocupam largura completa (no gap lateral)
- Stacking vertical de todos os elementos
- Metadados de artigo reorganizados verticalmente ou wrap em múltiplas linhas
- Header altura reduzida a 64px, título pode truncar
- Footer items stack verticalmente

**Tablet (768-1023px):**
- Layout ainda single-column, mas max-width 700px centralizado
- Padding lateral aumenta para 24px
- Cards mantêm max-width mas com margin lateral
- Metadados podem ficar em linha única se couberem
- Header full-height 80px
- Footer pode ter 2 colunas se múltiplos links

**Desktop (1024px+):**
- Max-width de conteúdo: 800px (artigo), 1200px (lista) centralizado
- Padding lateral generoso (32-48px dependendo da largura)
- Todos os metadados em linha única
- Hover states habilitados (não presentes em touch devices)
- Cards com espaçamento lateral

**Wide (1440px+):**
- Max-width mantido (não expandir indefinidamente)
- Padding lateral pode aumentar para 64px+
- Opcionalmente: Sidebar com índice ou metadados extras (futuro)

**Navigation Changes:**

**Mobile:**
- Skip link "Pular para conteúdo" sempre visível ao focus
- Breadcrumbs: Título de artigo truncado a 30 chars
- Botão "Voltar" full-width ou width mínima 150px, posicionado no topo
- Header: Logo/título centralizado ou esquerda, sem navegação extra

**Tablet/Desktop:**
- Breadcrumbs com título completo (ou truncado a 50 chars)
- Botão "Voltar" posicionado à esquerda, inline com breadcrumb
- Header: Logo esquerda, título centro (opcional), navegação direita (futuro)

**Content Priority:**

**Mobile:**
- Título do artigo: prioridade máxima, full-width, 24px (reduzido de 32px)
- Metadados: apenas essenciais visíveis imediatamente (autor, tempo), resto colapsado ou em linha seguinte
- Comentários: Indentação reduzida a 16px/nível (máx 3 níveis visualmente distintos)
- Link para artigo original: Botão full-width, destaque visual alto
- Loading states: Mensagens mais curtas ("Carregando...")

**Tablet:**
- Metadados: Todos visíveis em 1-2 linhas
- Indentação comentários: 24px/nível (máx 4 níveis)
- Link artigo original: Width natural (não full-width)

**Desktop:**
- Todos os metadados visíveis em linha única
- Indentação comentários: 32px/nível (máx 5 níveis)
- Espaçamento generoso entre todos os elementos

**Interaction Changes:**

**Mobile (Touch):**
- Hover states desabilitados (media query: `@media (hover: none)`)
- Touch targets mínimos 44x44px rigorosamente aplicados
- Buttons potencialmente full-width para facilitar toque
- Ripple effect ou active state visual em toques (feedback tátil via CSS)
- Scroll suave habilitado (`scroll-behavior: smooth`)
- Zoom de pinch habilitado (não usar `user-scalable=no`)

**Tablet (Hybrid):**
- Suporte a touch e mouse (devices como Surface)
- Hover states presentes mas touch targets mantidos grandes
- Layout híbrido: aproveita espaço de tablet mas assume touch-first

**Desktop (Mouse + Keyboard):**
- Hover states completos habilitados
- Cursor pointer em elementos clicáveis
- Tooltips aparecem ao hover (timing: 500ms delay)
- Scrollbars visíveis (não ocultar)
- Focus indicators otimizados para navegação Tab

---
