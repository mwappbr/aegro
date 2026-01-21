# Wireframes & Mockups

**Primary Design Files:** Wireframes de baixa fidelidade incluídos neste documento. Para mockups de alta fidelidade, ver Figma (link será adicionado quando disponível).

## Key Screen Layouts

### Screen 1: Homepage - Lista de Top Stories

**Purpose:** Exibir lista navegável de artigos principais do HackerNews de forma clara e acessível

**Key Elements:**
- **Header fixo** (altura ~80px): Logo "HN Acessível" à esquerda (ícone diamante + texto), título centralizado, área para futura navegação
- **Skip link** (invisível até focus): "Pular para conteúdo principal"
- **Main content area**: Lista de cards de artigos com padding generoso (20-24px entre cards)
- **Article card** (cada):
  - Título (heading h2, 20-24px, semibold, cor azul primário, clicável)
  - Metadados (16px, linha única): 🧑 autor | ↑ pontos | 💬 comentários | 🕐 tempo (ícones Flaticon)
  - Domínio do link externo (14px, cinza médio) se aplicável
  - Background branco com borda sutil, hover levanta card (box-shadow)
  - Área clicável mínima 60px altura total
- **Loading state**: 5 skeleton cards com shimmer animation
- **Error state**: Mensagem centralizada + botão "Tentar Novamente" (azul primário, 44x150px mínimo)
- **Footer**: Link para HackerNews original, nota sobre fonte de dados

**Interaction Notes:**
- Hover sobre card: elevação sutil (box-shadow), cursor pointer, título sublinha
- Focus (keyboard): outline azul espesso (3px) ao redor do card inteiro
- Click em qualquer parte do card navega para artigo
- Tab order: Skip link → cards (top to bottom) → footer links

**Design File Reference:** `wireframes/01-homepage.fig` (a ser criado)

---

### Screen 2: Visualização de Artigo

**Purpose:** Exibir artigo individual com todos os metadados, texto (se houver) e acesso ao original

**Key Elements:**
- **Header** (mesmo da homepage)
- **Breadcrumb** (abaixo do header): Home > Título do artigo (truncado)
- **Botão Voltar** (canto superior esquerdo): "← Voltar" (texto + ícone Flaticon `fi-rr-angle-small-left`, 44x120px)
- **Article container** (max-width 800px, centralizado):
  - **Título** (h1, 28-32px, bold, azul escuro)
  - **Metadados row 1**: Tipo de post badge (pill azul claro) | 🧑 Autor | 🕐 "há X horas" (ícones Flaticon)
  - **Metadados row 2**: ↑ Pontos | 💬 Comentários | 🔗 Domínio (ícones Flaticon)
  - **Separador horizontal** (1px, cinza claro)
  - **Link para original** (botão secundário destaque): "🔗 Acessar Artigo Original →" (ícone Flaticon `fi-rr-link`, opens in new tab)
  - **Texto do artigo** (se tipo Ask/Show HN): Parágrafos com line-height 1.6, max-width 70ch
  - **Separador antes de comentários**
- **Comments section**: Veja Screen 3
- **Footer** (mesmo da homepage)

**Interaction Notes:**
- Botão "Voltar": hover muda background para azul claro, focus tem outline azul
- Link para original: hover sublinha + background azul muito claro
- Warning antes de abrir link externo (opcional): Tooltip "Abrirá em nova aba"
- Focus management: Ao carregar página, foco vai para h1 (title) com tabindex="-1"

**Design File Reference:** `wireframes/02-article-view.fig` (a ser criado)

---

### Screen 3: Seção de Comentários

**Purpose:** Exibir hierarquia de comentários com controles de expansão/colapso

**Key Elements:**
- **Section heading** (h2): "Comentários (X)" onde X é total de comentários
- **Controles globais** (alinhados à direita):
  - Botão "Expandir Todos" | "Colapsar Todos" (toggle)
  - Dropdown "Ordenar por" (opcional para MVP): Mais antigos | Mais recentes
- **Comment thread** (estrutura recursiva):
  - **Comment container**: Background branco alternado com cinza muito claro por nível
  - **Indentação visual**: 32px por nível (máx 5 níveis visíveis)
  - **Borda lateral**: Linha vertical azul claro conectando replies ao parent (3px)
  - **Comment header**:
    - 🧑 Autor (bold se OP - Original Poster, ícone Flaticon `fi-rr-user`) | 🕐 "há X minutos/horas/dias" (ícone `fi-rr-clock`)
    - Badge "OP" se autor do comentário = autor do artigo
  - **Comment body**: Texto com line-height 1.5, 16px, preserva formatação básica
  - **Comment footer**:
    - Botão "⌄ Recolher" (se expandido, ícone `fi-rr-angle-small-down`) | "› Expandir (X respostas)" (se colapsado, ícone `fi-rr-angle-small-right`)
    - Link "Responder" (não funcional no MVP, cinza claro)
  - **Nested replies**: Renderizado recursivamente com indentação aumentada
- **Loading state**: Skeleton comments com animação
- **Empty state**: "Nenhum comentário ainda. Seja o primeiro a comentar no HackerNews original!"
- **Load more button** (se >20 comentários): "Carregar mais comentários" (botão secundário)

**Interaction Notes:**
- Collapse button: Ao clicar, thread desaparece com transition fade (200ms), botão muda para "Expandir (X)"
- Expand button: Ao clicar, thread aparece com fade-in (200ms)
- Keyboard nav: Tab percorre comentários em ordem hierárquica (depth-first), Enter ativa collapse/expand
- Long comments: Considerar "Ver mais" após 500 chars (opcional)
- Deleted comments: Exibir "[comentário deletado]" em itálico cinza, sem collapse button

**Design File Reference:** `wireframes/03-comments-section.fig` (a ser criado)

---

### Screen 4: Estados de Loading e Erro

**Purpose:** Fornecer feedback visual claro durante carregamento e em situações de erro

**Key Elements:**

**Loading State (Homepage):**
- 5-6 skeleton cards com shimmer animation
- Cada skeleton: Retângulo para título, linha menor para metadados
- Animação shimmer: gradiente linear movendo da esquerda para direita, loop infinito

**Loading State (Article Page):**
- Skeleton para título (h1): retângulo largo no topo
- Skeleton para metadados: 2 linhas de retângulos menores
- Skeleton para texto: múltiplas linhas de largura variável (simulando parágrafos)

**Error State (Network Error):**
- Ícone centralizado (48x48px, vermelho suave, Flaticon `fi-rr-cross-circle`)
- Mensagem heading (h2): "Não foi possível conectar"
- Mensagem descritiva: "Verifique sua conexão com a internet e tente novamente"
- Botão primário: "Tentar Novamente" (azul, 44x180px, ícone `fi-rr-refresh`)
- Botão secundário: "Voltar para Início"

**Error State (404 - Artigo não encontrado):**
- Ícone centralizado (Flaticon `fi-rr-search`)
- Mensagem heading: "Artigo não encontrado"
- Mensagem descritiva: "Este artigo pode ter sido deletado ou o link está incorreto"
- Botão primário: "Voltar para Lista de Artigos"

**Error State (Timeout):**
- Ícone centralizado (Flaticon `fi-rr-time-fast`)
- Mensagem: "A requisição está demorando mais que o esperado"
- Dois botões: "Continuar Aguardando" | "Cancelar"

**Interaction Notes:**
- Todos os error states têm aria-live="polite" para anúncio a leitores de tela
- Loading states usam role="status" com aria-label="Carregando conteúdo"
- Botões de retry têm focus automático quando error state aparece
- Mensagens são sempre em português claro, sem jargão técnico

**Design File Reference:** `wireframes/04-states.fig` (a ser criado)

---
