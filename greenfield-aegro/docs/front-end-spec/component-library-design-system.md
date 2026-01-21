# Component Library / Design System

**Design System Approach:** Criar biblioteca de componentes customizada baseada em princípios de acessibilidade WCAG 2.1 AA. Não usar framework de UI pronto (Bootstrap, Material, etc.) para garantir controle total sobre acessibilidade e branding. Componentes Vue 3 com Composition API, utilizando Tailwind CSS para styling com design tokens customizados.

## Core Components

### Component: Button

**Purpose:** Elemento clicável primário para ações do usuário

**Variants:**
- **Primary**: Background azul primário (#1e40af), texto branco, uso para ação principal (CTA)
- **Secondary**: Background branco, borda azul, texto azul, uso para ações secundárias
- **Ghost**: Transparente, texto azul, hover muda background, uso para ações terciárias (Voltar, etc.)
- **Danger**: Background vermelho suave (#ef4444), texto branco, uso para ações destrutivas (raras no MVP)

**States:**
- **Default**: Cores conforme variant
- **Hover**: Background 10% mais escuro, cursor pointer, transition 150ms
- **Focus**: Outline azul 3px offset 2px, sempre visível (não usar `outline: none`)
- **Active/Pressed**: Background 15% mais escuro, scale 0.98 (micro-animation)
- **Disabled**: Opacity 0.5, cursor not-allowed, sem hover/active effects
- **Loading**: Spinner branco/azul dentro do botão, texto "Carregando...", disabled state

**Usage Guidelines:**
- Altura mínima: 44px (toque acessível)
- Largura mínima: 100px (exceto ícone-only buttons)
- Padding horizontal: 24px
- Font size: 16px, font-weight: 600
- Border-radius: 8px (cantos suavemente arredondados)
- Sempre usar texto descritivo, evitar apenas ícones sem label
- Em mobile, buttons podem ser full-width para facilitar toque
- Máximo 2 buttons lado-a-lado (primary + secondary), restante em stack vertical

**Accessibility:**
- Usar elemento `<button>` semântico, não `<div>` com click handler
- Sempre incluir `type="button"` explícito (exceto submit buttons)
- Loading state deve ter aria-live="polite" e aria-busy="true"
- Disabled buttons devem ter aria-disabled="true" e explicação via tooltip se não óbvio

---

### Component: Card (Article Card)

**Purpose:** Container para exibir preview de artigo na lista principal

**Variants:**
- **Default**: Background branco, borda cinza clara 1px, hover levita
- **Skeleton**: Background cinza claro com shimmer animation, durante loading

**States:**
- **Default**: Box-shadow sutil, border 1px solid #e5e7eb
- **Hover**: Box-shadow elevado (0 4px 12px rgba(0,0,0,0.1)), border azul claro, cursor pointer
- **Focus**: Outline azul 3px, box-shadow mantém elevation
- **Active**: Scale 0.99, transition rápida
- **Visited** (opcional): Título em roxo suave para indicar artigo já lido

**Usage Guidelines:**
- Padding interno: 20px (desktop), 16px (mobile)
- Margin entre cards: 16px vertical
- Border-radius: 12px
- Max-width: 900px (centralizado)
- Toda área do card é clicável (link envolve card inteiro)
- Título do artigo é h2 semanticamente
- Metadados em linha única com separadores visuais (|)
- Domínio do link externo em texto menor e cor secundária

**Accessibility:**
- Card é um `<article>` semântico dentro de `<a>` tag
- Heading h2 para título dentro do article
- Metadados em spans com ícones Flaticon que possuem aria-label apropriado
- Ícones têm aria-label descritivo ("Autor", "Pontos", "Comentários", "Tempo")
- Focus outline envolve card inteiro, não apenas título
- Keyboard: Tab para focar card, Enter para navegar

---

### Component: Comment Thread

**Purpose:** Exibir comentário individual com suporte a nesting e collapse/expand

**Variants:**
- **Root comment**: Sem indentação, background branco
- **Nested comment**: Indentação progressiva, background alternado (branco/cinza#f9fafb)
- **Collapsed comment**: Apenas header visível, body e replies ocultos
- **Deleted comment**: Placeholder "[comentário deletado]" em itálico cinza

**States:**
- **Expanded** (default): Todo conteúdo visível, botão mostra "Recolher"
- **Collapsed**: Apenas header + contador replies, botão mostra "Expandir (X respostas)"
- **Loading replies**: Skeleton comments dentro do thread
- **Error loading**: Mensagem inline "Erro ao carregar respostas" + retry button

**Usage Guidelines:**
- Indentação: 32px por nível (máx 5 níveis visualmente distintos)
- Borda lateral esquerda: 3px sólida azul claro (#93c5fd) conectando a parent
- Padding interno: 16px
- Margin vertical entre comments: 12px
- Font-size body: 16px, line-height: 1.5
- Author name: bold, 16px, cor primária
- Timestamp: 14px, cor cinza médio, à direita do author
- Collapse button: Ghost variant, alinhado à esquerda no footer
- Suporta HTML sanitizado (parágrafos, links, code blocks)
- Code blocks: background cinza escuro, texto monospace, padding 12px

**Accessibility:**
- Estrutura de lista semântica: `<ul>` e `<li>` com nesting
- Cada comment é um `<article>` ou `<section>`
- Author como heading `<h3>` ou `<h4>` dependendo do nível
- Collapse button tem aria-expanded="true/false" e aria-controls="comment-{id}-body"
- Nível de nesting anunciado via aria-level ou heading hierarchy
- Keyboard: Tab navega entre comments e collapse buttons, Enter ativa collapse/expand

---

### Component: Breadcrumb

**Purpose:** Mostrar hierarquia de navegação e localização atual

**Variants:**
- **Standard**: Home > Título da página atual

**States:**
- **Default**: Links em azul, separador ">" em cinza
- **Hover** (em links): Sublinha texto, cursor pointer
- **Focus**: Outline azul no link
- **Current page** (último item): Texto normal (não link), cor cinza escuro

**Usage Guidelines:**
- Font-size: 14px
- Padding vertical: 16px
- Separador: ">" com margin 8px horizontal
- Título da página truncado se >50 caracteres, com "..." no final
- Tooltip com título completo ao hover no truncado
- Posicionado abaixo do header, acima do conteúdo principal
- Max-width alinhado com conteúdo principal (800px)

**Accessibility:**
- Estrutura semântica: `<nav aria-label="Breadcrumb">` contendo `<ol>`
- Cada item é `<li>`, com link dentro (exceto current page)
- Current page tem aria-current="page"
- Screen readers anunciam "Breadcrumb navigation" e quantidade de níveis

---

### Component: Loading Spinner / Skeleton

**Purpose:** Indicar loading state de forma clara e acessível

**Variants:**
- **Spinner**: Círculo animado rotacionando (uso em buttons e loading inline)
- **Skeleton**: Retângulos com shimmer animation (uso em placeholders de conteúdo)

**States:**
- **Animating**: Rotação contínua (spinner) ou shimmer loop (skeleton)

**Usage Guidelines:**

**Spinner:**
- Tamanho: 24px x 24px (default), 16px (small para buttons)
- Cor: Azul primário (#1e40af) em background branco, branco em background azul
- Animation: 360deg rotation, 1s linear infinite
- Sempre acompanhado de texto "Carregando..." visível ou via aria-label

**Skeleton:**
- Background: Linear gradient cinza claro → cinza médio → cinza claro
- Animation: Shimmer movendo da esquerda para direita, 1.5s ease infinite
- Border-radius: 8px (matching componente real)
- Altura: Matching componente real (ex: 60px para card, 32px para título)

**Accessibility:**
- Spinner: role="status" e aria-label="Carregando conteúdo"
- Skeleton: aria-busy="true" no container, aria-live="polite"
- Nunca usar apenas ícone sem texto (mesmo que visually-hidden)
- Timeout de 30s: Se loading persiste, mostrar mensagem de erro

---
