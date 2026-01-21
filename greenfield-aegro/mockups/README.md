# Mockups - HackerNews Acessível

Protótipos HTML/CSS da interface do projeto HackerNews Redesign for Senior Tech Enthusiasts.

## 📁 Arquivos

### `homepage.html`
Mockup da página inicial (lista de Top Stories) implementando completamente a especificação UI/UX.

### `all-components.html` ⭐
**Biblioteca completa de componentes** - Showcase de TODOS os componentes do projeto em uma única página:
- Paleta de cores completa
- Tipografia (5 níveis)
- Header + Footer
- Botões (6 variações)
- Badges (6 tipos)
- Story Cards
- Breadcrumb
- Página de Artigo completa
- Sistema de comentários hierárquico (4 níveis de nesting)
- Estados de loading (skeleton)
- Estados de erro (3 tipos)
- Conjunto completo de ícones Flaticon

## 🚀 Como Visualizar

### Opção 1: Abrir diretamente no navegador
1. Navegue até a pasta `mockups/`
2. Clique duas vezes em `homepage.html`
3. O arquivo abrirá no seu navegador padrão

### Opção 2: Via terminal
```bash
# Na raiz do projeto
open mockups/homepage.html  # macOS
xdg-open mockups/homepage.html  # Linux
start mockups/homepage.html  # Windows
```

### Opção 3: Live Server (recomendado para desenvolvimento)
Se você usa VS Code com Live Server:
1. Clique com botão direito em `homepage.html`
2. Selecione "Open with Live Server"

## ✨ Características Implementadas

### Design System
- ✅ Fonte Roboto (400, 500, 600, 700) via Google Fonts
- ✅ Paleta de cores azul completa (Primary: #1e40af, etc.)
- ✅ Sistema de espaçamento (4px, 8px, 12px, 16px, 20px, 24px, 32px, 48px, 64px)
- ✅ Tipografia com tamanhos e line-heights especificados

### Componentes
- ✅ **Header** fixo com logo e navegação
- ✅ **Article Cards** com hover states e elevação
- ✅ **Skeleton Loading State** com shimmer animation
- ✅ **Footer** com links para HackerNews original

### Acessibilidade (WCAG 2.1 AA)
- ✅ Skip link para conteúdo principal
- ✅ HTML semântico (header, nav, main, article, footer)
- ✅ ARIA labels e roles apropriados
- ✅ Focus indicators visíveis (outline 3px azul)
- ✅ Contraste de cores validado (mínimo 4.5:1)
- ✅ Navegação 100% via teclado (Tab, Enter)
- ✅ Ícones Flaticon com aria-labels para metadados

### Responsividade
- ✅ Mobile (320px - 767px): Layout single-column, padding reduzido
- ✅ Tablet (768px - 1023px): Max-width 700px
- ✅ Desktop (1024px+): Max-width 1200px
- ✅ Breakpoints conforme especificação

### Performance & UX
- ✅ Transitions suaves (150-200ms)
- ✅ Hover states em cards (elevação, borda azul)
- ✅ Loading state com skeleton UI e shimmer animation
- ✅ Prefers-reduced-motion support (animações desabilitadas se usuário configurar)

## 🧪 Testes Recomendados

### Acessibilidade
1. **Navegação por Teclado:**
   - Pressione Tab repetidamente
   - Verifique que skip link aparece primeiro
   - Todos os cards e links devem ser alcançáveis
   - Focus indicators visíveis (outline azul 3px)

2. **Screen Reader:** (NVDA, JAWS, ou VoiceOver)
   - Testar anúncio de landmarks (banner, navigation, main, contentinfo)
   - Verificar leitura de metadados (ícones Flaticon com aria-labels)
   - Confirmar que headings são anunciados corretamente

3. **Contraste:**
   - Validar com WebAIM Contrast Checker
   - Todas as combinações devem passar WCAG AA (4.5:1)

### Responsividade
1. Redimensionar janela do navegador:
   - Mobile: 375px width
   - Tablet: 768px width
   - Desktop: 1280px width

2. DevTools Responsive Mode:
   - Testar iPhone SE (375x667)
   - Testar iPad (768x1024)
   - Testar Desktop (1920x1080)

### Performance
1. Lighthouse Audit:
   - Abrir Chrome DevTools
   - Aba "Lighthouse"
   - Executar audit (Categories: Accessibility, Performance)
   - Verificar score >= 90 (Performance), 100 (Accessibility)

## 🎨 Customização

### Alterar Cores
Edite as variáveis CSS no `:root` (linhas 20-41):
```css
--color-primary: #1e40af;  /* Azul principal */
--color-accent: #93c5fd;   /* Azul claro */
/* etc. */
```

### Testar Loading State
Descomente o script no final do HTML (linhas 558-574) para simular carregamento de 2 segundos.

### Adicionar Mais Cards
Copie um bloco `<li><article class="story-card">...</article></li>` e modifique o conteúdo.

## 📊 Comparação com Especificação

| Especificação | Implementado | Notas |
|--------------|-------------|-------|
| Fonte Roboto | ✅ | Google Fonts, weights 400/500/600/700 |
| Paleta Azul | ✅ | Todas as 15 cores definidas em CSS vars |
| Cards com elevação hover | ✅ | Box-shadow + translateY |
| Skip link | ✅ | Visível ao focus, primeira tab stop |
| Skeleton loading | ✅ | Shimmer animation 1.5s |
| Responsivo 3 breakpoints | ✅ | Mobile, Tablet, Desktop |
| Focus indicators 3px | ✅ | Azul primário, offset 2px |
| Ícones Flaticon com aria-label | ✅ | user, arrow-small-up, comment, clock, diamond |
| Metadados separados por \| | ✅ | Separadores ocultos em mobile |
| Footer com links | ✅ | Link para HackerNews original |

## 🔄 Próximos Passos

1. **Criar mock da página de artigo** (`article.html`)
2. **Criar mock da seção de comentários** (incluir no `article.html`)
3. **Adicionar interatividade com JavaScript** (expand/collapse comentários)
4. **Converter para componentes Vue.js** (fase de implementação)

## 📝 Notas

- Este é um **mockup estático** para validação de design
- Dados de artigos são **mockados** (não consomem API real)
- Loading state está **oculto por padrão** (descomente script para testar)
- Todos os links apontam para URLs placeholders (`/story/:id`)

---

**Autor:** Sally (UX Expert)  
**Data:** 2026-01-20  
**Baseado em:** `docs/front-end-spec.md` e `docs/prd.md`
