# Epic 1: Foundation & Core Infrastructure

**Goal:** Estabelecer toda a infraestrutura técnica necessária e criar uma aplicação funcional que exibe a lista de top stories do HackerNews com design acessível. Ao completar este épico, teremos um MVP navegável que demonstra integração com API e princípios de design acessível, pronto para ser expandido com funcionalidades adicionais.

## Story 1.1: Project Setup & Development Environment

**Como** desenvolvedor,
**Eu quero** configurar o projeto com todas as ferramentas e dependências necessárias,
**Para que** possamos iniciar o desenvolvimento com estrutura sólida e boas práticas estabelecidas.

### Acceptance Criteria

1. Repositório Git inicializado com estrutura de pastas organizada seguindo padrões Vue/Vite
2. Projeto Vue 3 + TypeScript + Vite configurado e funcionando com hot reload
3. Tailwind CSS configurado com tema base incluindo paleta de cores azuis acessíveis e tokens de design
4. ESLint + Prettier configurados com regras de acessibilidade (eslint-plugin-vuejs-accessibility)
5. package.json contém todas as dependências necessárias com versões especificadas
6. README.md inicial criado com instruções de setup e execução do projeto
7. .gitignore configurado adequadamente para projeto Node/Vue
8. Aplicação roda localmente com sucesso ao executar `npm run dev`

## Story 1.2: Design System - Typography & Color Tokens

**Como** desenvolvedor,
**Eu quero** estabelecer design tokens para tipografia e cores acessíveis,
**Para que** possamos manter consistência visual e acessibilidade em toda a aplicação.

### Acceptance Criteria

1. Arquivo de configuração Tailwind customizado com paleta de cores azuis validada para WCAG AA (contraste mínimo 4.5:1)
2. Escala tipográfica definida com tamanhos mínimos de 16px para corpo de texto
3. Line-heights configurados para legibilidade (mínimo 1.5 para corpo de texto, 1.2 para headings)
4. Família de fonte importada e configurada (Roboto de prefInter, Open Sans ou similar sans-serif legível)
5. Utility classes customizadas criadas para espaçamentos generosos entre elementos
6. Documentação inline ou em arquivo separado listando todos os tokens de cor com seus valores hex e nomes semânticos
7. Classes de foco customizadas para navegação por teclado com outline visível e acessível

## Story 1.3: HackerNews API Service Layer

**Como** desenvolvedor,
**Eu quero** criar uma camada de serviço para interagir com a API do HackerNews,
**Para que** possamos abstrair lógica de API e facilitar testes e manutenção futura.

### Acceptance Criteria

1. Módulo de serviço TypeScript criado com funções tipadas para cada endpoint da API HackerNews
2. Função `getTopStories()` implementada retornando array de IDs de artigos top stories
3. Função `getStoryById(id)` implementada retornando detalhes completos de um artigo
4. Tratamento de erros implementado com tipos de erro específicos (NetworkError, APIError, etc.)
5. Timeouts configurados para requisições (ex: 10 segundos)
6. Tipos TypeScript interfaces criados para Story, Comment e outros objetos da API
7. Função utilitária para lidar com limitações CORS se necessário (proxy ou configuração)
8. Testes unitários básicos para funções do serviço mockando fetch

## Story 1.4: Base Layout & Navigation Structure

**Como** usuário,
**Eu quero** ver uma estrutura de página clara com navegação consistente,
**Para que** eu possa entender onde estou na aplicação e navegar facilmente.

### Acceptance Criteria

1. Componente Layout base criado com header, main content area e footer
2. Header contém logo/título da aplicação e navegação básica (home)
3. HTML semântico utilizado (header, nav, main, footer, landmarks ARIA onde apropriado)
4. Skip link implementado para pular para conteúdo principal (acessibilidade teclado)
5. Footer contém link para HackerNews original e nota sobre fonte de dados
6. Layout responsivo funciona em desktop (1920x1080), tablet (1024x768) e mobile (375x667)
7. Navegação via teclado funciona perfeitamente com indicadores de foco visíveis
8. Página renderiza com título da aplicação e estrutura vazia funcionando

## Story 1.5: Top Stories List Display

**Como** usuário,
**Eu quero** ver a lista de artigos principais do HackerNews,
**Para que** eu possa navegar e escolher artigos de meu interesse.

### Acceptance Criteria

1. Componente StoryList criado que busca top stories ao carregar
2. Loading state exibido enquanto dados são buscados (spinner ou skeleton UI acessível)
3. Cada artigo exibido em card/item com título, pontuação, autor, número de comentários e tempo desde postagem
4. Títulos são links clicáveis que navegam para visualização do artigo (implementação básica, pode ser placeholder inicialmente)
5. Formatação de tempo relativa implementada ("2 hours ago", "1 day ago", etc.) em português
6. Tipografia e espaçamento seguem design tokens estabelecidos (mínimo 16px, line-height adequado)
7. Estado de erro tratado graciosamente com mensagem clara ao usuário e opção de retry
8. Lista limitada inicialmente a 30 artigos (primeiros 30 do top stories)
9. Navegação por teclado funciona através da lista com Tab e Enter
10. Lista é anunciada corretamente por leitores de tela (role="list" ou elemento semântico apropriado)

## Story 1.6: Routing & Basic Navigation

**Como** usuário,
**Eu quero** navegar entre diferentes páginas da aplicação via URLs,
**Para que** eu possa compartilhar links e usar botões de navegação do navegador.

### Acceptance Criteria

1. Vue Router configurado na aplicação
2. Rota `/` (home) exibe lista de top stories
3. Rota `/story/:id` criada para visualização de artigo individual (pode exibir placeholder inicialmente)
4. Navegação entre rotas funciona sem reload completo da página (SPA behavior)
5. Botões voltar/avançar do navegador funcionam corretamente
6. URL atualiza ao navegar entre páginas
7. Título da página (document.title) atualiza conforme navegação para acessibilidade
8. 404 page implementada para rotas não existentes
9. Foco é gerenciado adequadamente ao mudar de rota (foco move para conteúdo principal)

## Story 1.7: CI/CD & Initial Deploy

**Como** desenvolvedor,
**Eu quero** configurar deploy automático da aplicação,
**Para que** possamos ter uma versão de demonstração acessível online a qualquer momento.

### Acceptance Criteria

1. Repositório conectado a Vercel ou Netlify
2. Build de produção configurado e funcionando (`npm run build` produz bundle otimizado)
3. Deploy automático configurado para branch main
4. Aplicação acessível via URL pública fornecida pelo serviço de hosting
5. Environment variables configuradas se necessário (URLs de API, etc.)
6. Build de produção passa em verificações de linting
7. README atualizado com link para aplicação deployada
8. Verificação básica de que aplicação carrega corretamente em produção (não apenas localmente)

---
