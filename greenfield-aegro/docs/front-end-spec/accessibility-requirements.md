# Accessibility Requirements

## Compliance Target

**Standard:** WCAG 2.1 Nível AA (conformidade total, não parcial)

**Rationale:** Este é um projeto fundamentalmente sobre acessibilidade. Conformidade AA não é uma "feature adicional" mas o próprio propósito do produto. Todos os critérios WCAG 2.1 AA devem ser atendidos sem exceções.

## Key Requirements

### Visual

**Color contrast ratios:**
- Texto normal (16px+): Mínimo 4.5:1 contra background
- Texto grande (18px+ ou 14px+ bold): Mínimo 3:1
- Elementos de UI e gráficos: Mínimo 3:1
- Validação: Usar ferramenta WebAIM Contrast Checker em todas as combinações
- Nunca usar cor como único meio de transmitir informação (sempre texto ou ícone adicional)

**Focus indicators:**
- Outline azul sólido 3px (`outline: 3px solid #1e40af`)
- Offset de 2px para separar do elemento (`outline-offset: 2px`)
- Sempre visível, nunca usar `outline: none` sem alternativa
- Focus indicators consistentes em toda aplicação
- Estado de focus claramente distinguível de estado hover

**Text sizing:**
- Tamanho mínimo: 16px para corpo de texto (14px aceitável apenas para metadados secundários)
- Texto redimensionável até 200% sem perda de funcionalidade (usar unidades relativas: rem, em)
- Não usar `user-select: none` em texto (permitir seleção/cópia)
- Max-width de linha: 70-80 caracteres para facilitar leitura

### Interaction

**Keyboard navigation:**
- 100% da aplicação navegável via teclado (sem necessidade de mouse)
- Tab order lógico (top-to-bottom, left-to-right, seguindo hierarquia visual)
- Enter ou Space ativam elementos interativos
- Escape fecha modals/overlays (se implementados no futuro)
- Skip link no início: "Pular para conteúdo principal" (visível ao focus)
- Focus nunca fica preso (focus traps apenas em modals, com gestão adequada)
- Atalhos de teclado (opcional MVP): não conflitam com browser/screen reader defaults

**Screen reader support:**
- HTML semântico em 100% do código (header, nav, main, article, aside, footer)
- Landmarks ARIA onde HTML semântico não é suficiente
- Labels descritivos em todos os elementos interativos
- Anúncios de loading/erro via aria-live regions
- Imagens decorativas com alt="" (empty alt), imagens funcionais com alt descritivo
- Formulários (se implementados) com labels explicitamente associados

**Touch targets:**
- Tamanho mínimo: 44x44px (seguindo guidelines Apple/Android)
- Espaçamento entre targets: mínimo 8px para evitar toques acidentais
- Área clicável pode ser maior que elemento visual (padding aumenta hit area)
- Gestos de swipe/drag evitados no MVP (apenas tap/click)

### Content

**Alternative text:**
- Imagens de conteúdo: alt descritivo e conciso
- Imagens decorativas/ícones: alt="" ou aria-hidden="true"
- Emojis importantes: span com aria-label explicativo (ex: <span aria-label="pontos">⬆️</span>)
- Ícones SVG: `<title>` interno ou aria-label no container

**Heading structure:**
- Hierarquia lógica sem pulos (h1 → h2 → h3, nunca h1 → h3)
- Um único h1 por página (título principal)
- Headings descrevem o conteúdo que seguem
- Não usar headings apenas para styling (usar CSS)
- Screen readers usam headings para navegação rápida

**Form labels:**
- (Não aplicável no MVP, mas preparar para futuro)
- Todos os inputs têm `<label>` explicitamente associado via `for` attribute
- Placeholders não substituem labels
- Mensagens de erro associadas via aria-describedby

## Testing Strategy

**Automated Testing:**
1. **jest-axe** integrado em testes de componentes Vue
   - Executar em todos os componentes principais
   - CI/CD bloqueia merge se testes axe falham
2. **Lighthouse CI** em pipeline
   - Score de acessibilidade >= 100 requerido
   - Auditorias em todas as páginas principais (/, /story/:id)
3. **Axe DevTools** extension
   - Varredura manual durante desenvolvimento
   - Zero issues críticos permitidos

**Manual Testing:**
1. **Keyboard navigation** (30 min test session)
   - Desconectar mouse
   - Navegar 100% da aplicação via Tab/Enter/Space
   - Verificar focus visível em todos os elementos
   - Checklist: Home → Article → Comments → Back
2. **Screen reader** (1h test session)
   - NVDA (Windows) ou VoiceOver (Mac)
   - Fluxos principais narrados corretamente
   - Landmarks e headings funcionando
   - Loading states e erros anunciados
3. **Contrast verification**
   - WebAIM Contrast Checker em todas as combinações de cores
   - Screenshot + análise com ferramentas automáticas
4. **Browser zoom** (200% test)
   - Zoom de texto a 200%
   - Layout não quebra, funcionalidade mantida
   - Scroll horizontal minimizado

**Acceptance Criteria:**
- Zero issues críticos em automated tools (axe, Lighthouse)
- 100% navegável via teclado sem bloqueios
- Screen reader anuncia corretamente conteúdo e interações
- Contraste de todas as combinações >= 4.5:1 (ou 3:1 para texto grande)
- Documentação de testes em `docs/accessibility-testing.md`

---
