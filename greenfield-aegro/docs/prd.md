# HackerNews Redesign for Senior Tech Enthusiasts - Documento de Requisitos do Produto (PRD)

---

## Goals and Background Context

### Goals

- Criar uma interface web acessível que permita usuários acima de 60 anos consumir conteúdo do HackerNews de forma confortável e intuitiva
- Demonstrar integração bem-sucedida com a API oficial do HackerNews mantendo fidelidade ao conteúdo original
- Implementar design acessível com tema azul moderno que atenda padrões WCAG 2.1 AA
- Validar que melhorias de acessibilidade aumentam significativamente a usabilidade para o público-alvo
- Criar um projeto de portfólio que demonstre expertise em design centrado no usuário e acessibilidade web

### Background Context

Usuários seniores interessados em tecnologia enfrentam barreiras significativas ao tentar acessar o HackerNews original, uma das principais fontes de discussões técnicas de qualidade. A interface minimalista do HackerNews, apesar de eficiente para usuários experientes, apresenta texto pequeno, baixo contraste, navegação complexa de comentários aninhados e ausência de recursos de acessibilidade. Isso resulta em frustração e abandono da plataforma por parte de usuários acima de 60 anos que possuem interesse genuíno no conteúdo técnico.

Este projeto visa criar uma "ponte acessível" ao ecossistema HackerNews, consumindo a API oficial e apresentando o mesmo conteúdo com design moderno, tipografia otimizada (mínimo 16px), paleta de cores azuis com alto contraste, espaçamento generoso e navegação simplificada. Como projeto de demonstração, o foco está em validar o conceito de design acessível e demonstrar habilidades técnicas, sem necessidade de escala comercial.

### Change Log

| Data | Versão | Descrição | Autor |
|------|--------|-----------|-------|
| 2026-01-20 | 1.2 | Atualização da fonte para fonte Roboto | Mauro |
| 2026-01-20 | 1.1 | Atualização do stack técnico: React → Vue.js 3 | John (PM) |
| 2026-01-20 | 1.0 | Criação inicial do PRD baseado no Project Brief | John (PM) |

---

## Requirements

### Functional

**FR1:** O sistema deve consumir a API oficial do HackerNews (Firebase) para obter artigos em tempo real

**FR2:** O sistema deve exibir a lista de artigos principais (top stories) com título, pontuação, autor e número de comentários

**FR3:** O sistema deve permitir visualizar o artigo completo quando o usuário clicar em um item da lista

**FR4:** O sistema deve exibir comentários associados a cada artigo, mantendo a hierarquia de threads aninhadas

**FR5:** O sistema deve permitir expandir e colapsar threads de comentários para facilitar navegação

**FR6:** O sistema deve exibir metadados de cada artigo incluindo data de postagem, autor, e link para fonte original

**FR7:** O sistema deve tratar erros de API graciosamente, exibindo mensagens claras ao usuário quando dados não estiverem disponíveis

**FR8:** O sistema deve exibir estados de loading claros enquanto busca dados da API

**FR9:** O sistema deve permitir navegação de volta à lista de artigos a partir da visualização de artigo individual

**FR10:** O sistema deve sanitizar conteúdo HTML dos comentários para prevenir XSS e outros ataques

**FR11:** O sistema deve exibir link para artigo original do HackerNews mantendo transparência sobre a fonte

**FR12:** O sistema deve ser totalmente navegável via teclado para usuários que não utilizam mouse

### Non Functional

**NFR1:** A aplicação deve carregar a página inicial em menos de 3 segundos em conexões de banda larga típicas

**NFR2:** A aplicação deve atender 100% dos critérios WCAG 2.1 nível AA para acessibilidade

**NFR3:** Toda tipografia deve ter tamanho mínimo de 16px para leitura confortável

**NFR4:** Todas as combinações de cor texto/fundo devem ter contraste mínimo de 4.5:1 conforme WCAG AA

**NFR5:** A aplicação deve ser responsiva, funcionando adequadamente em desktops (1920x1080), tablets (1024x768) e dispositivos móveis (375x667)

**NFR6:** O código deve seguir padrões de HTML semântico para garantir compatibilidade com leitores de tela

**NFR7:** Taxa de sucesso de requisições à API deve ser superior a 95% em condições normais de operação

**NFR8:** A aplicação deve funcionar nos navegadores modernos mais recentes (Chrome, Firefox, Safari, Edge)

**NFR9:** Elementos interativos devem ter área clicável mínima de 44x44px conforme guidelines de acessibilidade

**NFR10:** A aplicação deve manter performance fluida mesmo ao renderizar artigos com mais de 100 comentários

---

## User Interface Design Goals

### Overall UX Vision

A experiência do usuário deve ser **calma, clara e dignificada**. A interface não deve parecer "para idosos", mas sim uma versão moderna e profissional do HackerNews que por design é acessível a todos. A navegação deve ser intuitiva mesmo para usuários que não utilizam a plataforma diariamente, com hierarquia visual clara e feedback consistente para todas as ações. O design deve transmitir confiança e seriedade técnica, mantendo o espírito intelectual do HackerNews original.

### Key Interaction Paradigms

- **Navegação Linear e Previsível:** Estrutura de navegação simples e consistente (lista → artigo → voltar), evitando complexidade desnecessária
- **Affordances Visuais Claras:** Botões e links claramente identificáveis com estados hover, focus e active bem definidos
- **Expansão Progressiva:** Informação apresentada gradualmente, com comentários colapsados por padrão e expansíveis sob demanda
- **Feedback Visual Imediato:** Estados de loading, erro e sucesso claramente comunicados através de indicadores visuais não ambíguos
- **Foco Prioritário no Conteúdo:** Design que prioriza legibilidade do conteúdo sobre densidade de informação

### Core Screens and Views

- **Tela Principal (Home):** Lista de top stories do HackerNews com cartões visuais que exibem título, pontuação, autor, número de comentários e tempo de postagem
- **Tela de Artigo:** Visualização do artigo individual com metadados, link para fonte original, e seção de comentários
- **Visualização de Comentários:** Interface hierárquica de comentários com indentação visual clara, indicadores de nível de thread, e controles de expansão/colapso
- **Tela de Erro:** Página amigável para situações de erro de API ou conteúdo não disponível, com opções claras de ação

### Accessibility

**WCAG 2.1 Nível AA** - Conformidade total com critérios de acessibilidade incluindo:
- Contraste de cor mínimo 4.5:1 para texto normal
- Navegação completa via teclado com indicadores de foco visíveis
- HTML semântico e estrutura de landmarks ARIA apropriada
- Compatibilidade com leitores de tela (labels adequados, alt texts, live regions)
- Textos redimensionáveis até 200% sem perda de funcionalidade

### Branding

**Tema Azul Profissional e Moderno:**
- Paleta de cores azuis cuidadosamente escolhida para transmitir profissionalismo, confiança e tranquilidade
- Azuis profundos para elementos principais e títulos
- Azuis médios para links e elementos interativos
- Azuis claros para backgrounds secundários e estados hover
- Cinzas neutros para textos secundários e separadores
- Todos os pares de cores validados para contraste WCAG AA
- Tipografia limpa e moderna (fonte sans-serif legível como Inter, Open Sans ou similar - preferencialmente a fonte Roboto)
- Espaçamento generoso entre elementos (mínimo 1.5 line-height para corpo de texto)

### Target Device and Platforms

**Web Responsivo** - Navegadores modernos em:
- Desktop (1920x1080 e resoluções comuns)
- Tablet (1024x768 landscape e 768x1024 portrait)
- Mobile (375x667 e tamanhos similares)

A aplicação deve adaptar layout mantendo legibilidade e acessibilidade em todos os tamanhos de tela. Prioridade para experiência desktop/tablet dado o público-alvo, mas mobile deve ser funcional.

---

## Technical Assumptions

### Repository Structure

**Monorepo** - Estrutura de repositório único contendo toda a aplicação frontend, facilitando manutenção e deploy para projeto de demonstração.

### Service Architecture

**Frontend-only Application com Service Layer:**
- Aplicação Single Page Application (SPA) sem backend próprio
- Camada de serviço (Service Layer) para abstrair todas as chamadas à API do HackerNews
- Possível necessidade de proxy simples caso haja limitações CORS da API do HackerNews
- Arquitetura baseada em componentes reutilizáveis Vue seguindo boas práticas (Composition API, composables)

**Framework Frontend:** Vue.js 3 (TypeScript) - Escolhido por:
- Ecossistema maduro com excelente suporte a acessibilidade
- TypeScript para type safety e melhor manutenibilidade
- Composition API moderna e reativa facilitando gestão de estado
- Documentação excelente e curva de aprendizado amigável
- Facilita demonstração de habilidades técnicas modernas

**Build Tool:** Vite - Build tool moderno e rápido, otimizado para desenvolvimento Vue

**Styling:** Tailwind CSS + Scoped Styles
- Tailwind para utility-first styling e responsividade rápida
- Vue scoped styles para componentes que necessitem estilos isolados
- Design tokens para paleta de cores e tipografia centralizados

### Testing Requirements

**Unit + Integration Testing:**
- **Unit Tests:** Testes de componentes individuais e funções utilitárias usando Vitest + Vue Test Utils
- **Integration Tests:** Testes de fluxos completos (buscar artigos → exibir → navegar comentários) usando Vue Test Utils
- **Accessibility Testing:** Testes automatizados com jest-axe/vitest-axe e validação manual com ferramentas como WAVE, Axe DevTools e Lighthouse
- **Manual Testing:** Testes manuais focados em navegação por teclado e experiência com leitores de tela (NVDA/JAWS)

**Coverage mínimo:** 70% para lógica de negócio e serviços de API

### Additional Technical Assumptions and Requests

- **Hosting:** Vercel ou Netlify para deploy estático com CI/CD automático a partir do repositório Git
- **Versionamento:** Git com commits semânticos seguindo Conventional Commits
- **Linting e Formatting:** ESLint + Prettier configurados com regras de acessibilidade (eslint-plugin-vuejs-accessibility)
- **Environment Variables:** Uso de variáveis de ambiente para configurações (ex: URL base da API, timeouts)
- **Error Handling:** Implementação de error handlers globais Vue (app.config.errorHandler) para tratamento gracioso de erros de componentes
- **Cache Strategy:** localStorage para cache básico de artigos recentemente visualizados (melhorar performance e permitir visualização offline limitada)
- **API Rate Limiting:** Implementar debounce/throttle em requisições quando apropriado para respeitar limites da API
- **Bundle Size:** Monitorar tamanho do bundle final, target <500KB para JavaScript bundle principal
- **Documentation:** README.md com instruções de setup, build e deploy; comentários em código para decisões não óbvias

---

## Epic List

### Epic 1: Foundation & Core Infrastructure
Estabelecer fundação do projeto com configuração de repositório, ferramentas de desenvolvimento, CI/CD básico, integração com API do HackerNews e componentes base do design system acessível. Ao final, ter uma aplicação funcional que exibe lista básica de artigos do HackerNews.

### Epic 2: Article Display & Navigation
Implementar visualização completa de artigos individuais com metadados, link para fonte original, e navegação fluida entre lista e artigo. Garantir que toda navegação seja acessível via teclado e atenda padrões de acessibilidade.

### Epic 3: Comments System & Hierarchy
Desenvolver sistema completo de exibição de comentários com hierarquia visual clara, controles de expansão/colapso, e tratamento seguro de conteúdo HTML. Otimizar performance para artigos com muitos comentários.

### Epic 4: Polish, Accessibility Validation & Deploy
Refinar design, validar conformidade WCAG 2.1 AA, implementar melhorias de performance, e fazer deploy da aplicação em ambiente de demonstração com documentação completa.

---

## Epic 1: Foundation & Core Infrastructure

**Goal:** Estabelecer toda a infraestrutura técnica necessária e criar uma aplicação funcional que exibe a lista de top stories do HackerNews com design acessível. Ao completar este épico, teremos um MVP navegável que demonstra integração com API e princípios de design acessível, pronto para ser expandido com funcionalidades adicionais.

### Story 1.1: Project Setup & Development Environment

**Como** desenvolvedor,
**Eu quero** configurar o projeto com todas as ferramentas e dependências necessárias,
**Para que** possamos iniciar o desenvolvimento com estrutura sólida e boas práticas estabelecidas.

#### Acceptance Criteria

1. Repositório Git inicializado com estrutura de pastas organizada seguindo padrões Vue/Vite
2. Projeto Vue 3 + TypeScript + Vite configurado e funcionando com hot reload
3. Tailwind CSS configurado com tema base incluindo paleta de cores azuis acessíveis e tokens de design
4. ESLint + Prettier configurados com regras de acessibilidade (eslint-plugin-vuejs-accessibility)
5. package.json contém todas as dependências necessárias com versões especificadas
6. README.md inicial criado com instruções de setup e execução do projeto
7. .gitignore configurado adequadamente para projeto Node/Vue
8. Aplicação roda localmente com sucesso ao executar `npm run dev`

### Story 1.2: Design System - Typography & Color Tokens

**Como** desenvolvedor,
**Eu quero** estabelecer design tokens para tipografia e cores acessíveis,
**Para que** possamos manter consistência visual e acessibilidade em toda a aplicação.

#### Acceptance Criteria

1. Arquivo de configuração Tailwind customizado com paleta de cores azuis validada para WCAG AA (contraste mínimo 4.5:1)
2. Escala tipográfica definida com tamanhos mínimos de 16px para corpo de texto
3. Line-heights configurados para legibilidade (mínimo 1.5 para corpo de texto, 1.2 para headings)
4. Família de fonte importada e configurada (Roboto de prefInter, Open Sans ou similar sans-serif legível)
5. Utility classes customizadas criadas para espaçamentos generosos entre elementos
6. Documentação inline ou em arquivo separado listando todos os tokens de cor com seus valores hex e nomes semânticos
7. Classes de foco customizadas para navegação por teclado com outline visível e acessível

### Story 1.3: HackerNews API Service Layer

**Como** desenvolvedor,
**Eu quero** criar uma camada de serviço para interagir com a API do HackerNews,
**Para que** possamos abstrair lógica de API e facilitar testes e manutenção futura.

#### Acceptance Criteria

1. Módulo de serviço TypeScript criado com funções tipadas para cada endpoint da API HackerNews
2. Função `getTopStories()` implementada retornando array de IDs de artigos top stories
3. Função `getStoryById(id)` implementada retornando detalhes completos de um artigo
4. Tratamento de erros implementado com tipos de erro específicos (NetworkError, APIError, etc.)
5. Timeouts configurados para requisições (ex: 10 segundos)
6. Tipos TypeScript interfaces criados para Story, Comment e outros objetos da API
7. Função utilitária para lidar com limitações CORS se necessário (proxy ou configuração)
8. Testes unitários básicos para funções do serviço mockando fetch

### Story 1.4: Base Layout & Navigation Structure

**Como** usuário,
**Eu quero** ver uma estrutura de página clara com navegação consistente,
**Para que** eu possa entender onde estou na aplicação e navegar facilmente.

#### Acceptance Criteria

1. Componente Layout base criado com header, main content area e footer
2. Header contém logo/título da aplicação e navegação básica (home)
3. HTML semântico utilizado (header, nav, main, footer, landmarks ARIA onde apropriado)
4. Skip link implementado para pular para conteúdo principal (acessibilidade teclado)
5. Footer contém link para HackerNews original e nota sobre fonte de dados
6. Layout responsivo funciona em desktop (1920x1080), tablet (1024x768) e mobile (375x667)
7. Navegação via teclado funciona perfeitamente com indicadores de foco visíveis
8. Página renderiza com título da aplicação e estrutura vazia funcionando

### Story 1.5: Top Stories List Display

**Como** usuário,
**Eu quero** ver a lista de artigos principais do HackerNews,
**Para que** eu possa navegar e escolher artigos de meu interesse.

#### Acceptance Criteria

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

### Story 1.6: Routing & Basic Navigation

**Como** usuário,
**Eu quero** navegar entre diferentes páginas da aplicação via URLs,
**Para que** eu possa compartilhar links e usar botões de navegação do navegador.

#### Acceptance Criteria

1. Vue Router configurado na aplicação
2. Rota `/` (home) exibe lista de top stories
3. Rota `/story/:id` criada para visualização de artigo individual (pode exibir placeholder inicialmente)
4. Navegação entre rotas funciona sem reload completo da página (SPA behavior)
5. Botões voltar/avançar do navegador funcionam corretamente
6. URL atualiza ao navegar entre páginas
7. Título da página (document.title) atualiza conforme navegação para acessibilidade
8. 404 page implementada para rotas não existentes
9. Foco é gerenciado adequadamente ao mudar de rota (foco move para conteúdo principal)

### Story 1.7: CI/CD & Initial Deploy

**Como** desenvolvedor,
**Eu quero** configurar deploy automático da aplicação,
**Para que** possamos ter uma versão de demonstração acessível online a qualquer momento.

#### Acceptance Criteria

1. Repositório conectado a Vercel ou Netlify
2. Build de produção configurado e funcionando (`npm run build` produz bundle otimizado)
3. Deploy automático configurado para branch main
4. Aplicação acessível via URL pública fornecida pelo serviço de hosting
5. Environment variables configuradas se necessário (URLs de API, etc.)
6. Build de produção passa em verificações de linting
7. README atualizado com link para aplicação deployada
8. Verificação básica de que aplicação carrega corretamente em produção (não apenas localmente)

---

## Epic 2: Article Display & Navigation

**Goal:** Implementar visualização completa e acessível de artigos individuais do HackerNews, incluindo todos os metadados relevantes, link para fonte original, e navegação fluida da lista para artigo e vice-versa. Garantir que toda experiência seja acessível via teclado e atenda padrões WCAG AA, permitindo que usuários consumam conteúdo de artigos de forma confortável.

### Story 2.1: Article Detail View - Basic Structure

**Como** usuário,
**Eu quero** visualizar detalhes completos de um artigo quando clico em um item da lista,
**Para que** eu possa ler o título completo, metadados e acessar o artigo original.

#### Acceptance Criteria

1. Componente ArticleDetail criado que recebe ID do artigo via route params
2. Dados do artigo buscados via API service ao carregar componente
3. Loading state exibido enquanto artigo é carregado
4. Título do artigo exibido com tipografia destacada (heading h1)
5. Metadados exibidos: pontuação, autor, data/hora de postagem, tipo de post
6. Link para artigo original externo exibido de forma clara (opens in new tab com rel="noopener noreferrer")
7. Para posts tipo "Ask HN" ou "Show HN", texto do post (se houver) exibido abaixo dos metadados
8. Botão "Voltar para lista" implementado permitindo retorno à home
9. Estado de erro tratado (artigo não encontrado, erro de API)
10. HTML semântico utilizado (article, header, etc.)
11. Navegação via teclado funciona (Tab entre elementos, Enter para ativar links/botões)

### Story 2.2: Article Metadata Enhancement

**Como** usuário,
**Eu quero** ver informações contextuais adicionais sobre o artigo,
**Para que** eu possa avaliar relevância e autenticidade do conteúdo antes de acessar link externo.

#### Acceptance Criteria

1. Domínio do link externo exibido de forma destacada (extraído da URL, ex: "github.com")
2. Ícone ou badge visual indicando tipo de post (Article, Ask HN, Show HN, Job, Poll)
3. Tempo desde postagem formatado de forma relativa e amigável ("há 3 horas", "há 2 dias")
4. Número de comentários exibido com ícone de comentário claro
5. Informação do autor formatada como link (preparação para futura feature de perfil, pode ser não-clicável no MVP)
6. Todos os metadados organizados visualmente com espaçamento adequado
7. Contraste de cor para todos os textos atende WCAG AA
8. Metadados anunciados corretamente por leitores de tela com labels apropriados

### Story 2.3: Article Text Content Display (Ask/Show HN)

**Como** usuário,
**Eu quero** ler o texto completo de posts tipo "Ask HN" ou "Show HN",
**Para que** eu possa entender a questão ou demonstração sem precisar acessar link externo.

#### Acceptance Criteria

1. Texto do artigo (propriedade `text` da API) renderizado quando disponível
2. HTML do texto sanitizado para prevenir XSS (usar biblioteca como DOMPurify)
3. Formatação HTML básica preservada (parágrafos, links, code blocks se houver)
4. Links dentro do texto do artigo abrem em nova aba com segurança (rel="noopener noreferrer")
5. Tipografia do texto de conteúdo segue design tokens (min 16px, line-height 1.6)
6. Code blocks (se presentes) formatados com monospace font e background diferenciado
7. Espaçamento adequado entre parágrafos para legibilidade
8. Máxima largura de linha configurada (ex: 70ch) para facilitar leitura

### Story 2.4: Back Navigation & Breadcrumbs

**Como** usuário,
**Eu quero** entender onde estou na aplicação e retornar facilmente à lista,
**Para que** eu possa navegar de forma intuitiva entre artigos sem me perder.

#### Acceptance Criteria

1. Breadcrumb navigation implementado (Home > Article Title)
2. Link "Home" no breadcrumb leva à lista de artigos
3. Botão "← Voltar" posicionado de forma visível no topo da página de artigo
4. Ambos métodos de navegação (breadcrumb e botão) funcionam via teclado
5. Indicadores visuais claros para elementos interativos (hover, focus states)
6. Navegação preserva scroll position ao voltar para lista (se tecnicamente viável)
7. Title da página atualizado com título do artigo para contexto de navegação
8. Breadcrumb estruturado semanticamente (nav > ol > li ou schema.org markup)

### Story 2.5: Loading States & Error Handling

**Como** usuário,
**Eu quero** feedback claro sobre o que está acontecendo quando navego,
**Para que** eu entenda se a aplicação está funcionando ou se há algum problema.

#### Acceptance Criteria

1. Skeleton UI ou spinner exibido enquanto artigo carrega
2. Loading indicator é acessível (aria-live region ou role="status")
3. Mensagem clara exibida se artigo não for encontrado ("Artigo não encontrado")
4. Mensagem clara exibida se houver erro de rede ("Erro ao carregar artigo, tente novamente")
5. Botão "Tentar novamente" fornecido em situações de erro
6. Estados de loading não bloqueiam navegação (usuário pode voltar durante loading)
7. Timeout configurado para requests (ex: 10s), com mensagem apropriada se timeout ocorrer
8. Todas as mensagens de erro são amigáveis e em português brasileiro claro

### Story 2.6: Responsive Article Layout

**Como** usuário em diferentes dispositivos,
**Eu quero** que o artigo seja legível e bem formatado em qualquer tamanho de tela,
**Para que** eu possa ler confortavelmente em desktop, tablet ou mobile.

#### Acceptance Criteria

1. Layout de artigo responsivo funciona em desktop (1920x1080), tablet (1024x768) e mobile (375x667)
2. Em mobile, metadados reorganizam-se verticalmente mantendo legibilidade
3. Botão "Voltar" permanece facilmente acessível em todas as resoluções
4. Imagens no conteúdo (se houver) respondem e não ultrapassam largura do container
5. Texto não quebra de forma estranha ou ultrapassa limites do viewport
6. Touch targets em mobile têm tamanho mínimo de 44x44px
7. Espaçamento e padding ajustam-se proporcionalmente para cada breakpoint
8. Breadcrumbs colapsam ou ajustam-se adequadamente em telas pequenas

---

## Epic 3: Comments System & Hierarchy

**Goal:** Desenvolver sistema completo e acessível de exibição de comentários com hierarquia visual clara de threads aninhadas, controles de expansão/colapso, sanitização segura de conteúdo HTML, e otimização de performance para artigos com grande volume de comentários. Permitir que usuários naveguem facilmente através de discussões complexas mantendo clareza visual e acessibilidade.

### Story 3.1: Comments Data Fetching & Structure

**Como** desenvolvedor,
**Eu quero** buscar e estruturar dados de comentários hierarquicamente,
**Para que** possamos renderizar threads aninhadas de forma organizada.

#### Acceptance Criteria

1. Função no API service para buscar comentário por ID (`getCommentById`)
2. Função recursiva implementada para buscar árvore completa de comentários dado array de IDs raiz
3. Estrutura de dados apropriada criada para representar comentários aninhados (tree structure)
4. Comentários deletados ou mortos tratados adequadamente (exibir placeholder ou ocultar)
5. Loading de comentários otimizado (batch requests se possível, ou loading progressivo)
6. Tipos TypeScript para Comment interface incluindo propriedades kids (replies)
7. Testes unitários para lógica de estruturação de comentários usando Vitest
8. Tratamento de erro para comentários que falharem ao carregar (não bloquear thread inteira)

### Story 3.2: Comment Component & Basic Rendering

**Como** usuário,
**Eu quero** ver comentários associados ao artigo de forma clara,
**Para que** eu possa ler opiniões e discussões sobre o conteúdo.

#### Acceptance Criteria

1. Componente Comment criado para renderizar comentário individual
2. Comentário exibe autor, tempo desde postagem, e texto do comentário
3. HTML do comentário sanitizado usando DOMPurify para prevenir XSS
4. Formatação HTML básica preservada (parágrafos, links, code, listas)
5. Links em comentários abrem em nova aba com segurança (noopener noreferrer)
6. Code blocks em comentários formatados com monospace e background diferenciado
7. Tipografia segue design tokens (min 16px, line-height 1.5)
8. Componente CommentList criado que renderiza lista de comentários raiz
9. Seção de comentários claramente separada do conteúdo principal do artigo
10. Heading "Comentários" (ou similar) para delimitar seção de comentários

### Story 3.3: Hierarchical Threading & Visual Indentation

**Como** usuário,
**Eu quero** ver visualmente a hierarquia de replies em uma discussão,
**Para que** eu possa entender o fluxo de conversação e relações entre comentários.

#### Acceptance Criteria

1. Comentários aninhados renderizam recursivamente (replies dentro de replies)
2. Indentação visual implementada para cada nível de nesting (ex: 2rem por nível)
3. Borda lateral ou linha vertical conectando replies a comentário pai
4. Profundidade máxima de indentação configurada (ex: 5 níveis) para evitar overflow em mobile
5. Em mobile, indentação reduzida (ex: 1rem) para preservar espaço de leitura
6. Cores de borda ou background alternadas por nível para facilitar distinção visual
7. Estrutura semântica de lista aninhada (ul > li > ul > li) ou equivalente
8. Navegação via teclado funciona através da hierarquia de comentários
9. Leitores de tela anunciam nível de nesting apropriadamente (aria-level ou headings)

### Story 3.4: Expand/Collapse Comment Threads

**Como** usuário,
**Eu quero** expandir e colapsar threads de comentários,
**Para que** eu possa focar em conversas relevantes e ocultar threads longas que não me interessam.

#### Acceptance Criteria

1. Botão de colapsar/expandir implementado para comentários que têm replies
2. Estado de colapsado/expandido gerenciado (Vue ref/reactive state)
3. Por padrão, comentários carregam expandidos (opcionalmente primeiros N níveis expandidos)
4. Ao colapsar, replies ficam ocultos e botão muda para indicar estado ("Expandir [X replies]")
5. Ao expandir, replies são exibidos novamente
6. Ícone visual claro indicando estado (chevron down/right, +/-, etc.)
7. Botão é acessível via teclado (Tab para focar, Enter/Space para ativar)
8. Transição suave ao expandir/colapsar (Vue transitions ou CSS transition)
9. Estado de foco preservado ao expandir/colapsar (não perde posição na página)
10. "Expandir tudo" / "Colapsar tudo" buttons no topo da seção de comentários

### Story 3.5: Comments Loading States & Pagination

**Como** usuário,
**Eu quero** feedback sobre loading de comentários e controle sobre quantos carregar,
**Para que** eu tenha experiência responsiva mesmo em artigos com muitos comentários.

#### Acceptance Criteria

1. Loading indicator exibido enquanto comentários são buscados
2. Comentários carregam em batches (ex: primeiros 20 comentários raiz, depois load more)
3. Botão "Carregar mais comentários" implementado se houver mais de X comentários
4. Loading progressivo: comentários já carregados ficam visíveis enquanto próximos carregam
5. Estado de erro tratado para falhas ao buscar comentários individuais
6. Skeleton UI ou placeholder para comentários em loading
7. Mensagem "Nenhum comentário ainda" exibida se artigo não tiver comentários
8. Performance monitorada: artigo com 100+ comentários deve manter interface responsiva
9. Estratégia de virtualização considerada se necessário para threads extremamente longas (opcional para MVP)

### Story 3.6: Comment Metadata & Interactions

**Como** usuário,
**Eu quero** ver informações contextuais sobre cada comentário,
**Para que** eu possa avaliar relevância e timing das contribuições.

#### Acceptance Criteria

1. Nome do autor exibido de forma destacada em cada comentário
2. Tempo desde postagem formatado relativamente ("há 2 horas", "há 3 dias") em português
3. Indicação visual se comentário é do autor original do artigo (OP badge)
4. Número de replies diretos exibido quando thread está colapsada
5. Link "Responder" exibido (pode ser não-funcional no MVP, preparação para feature futura)
6. Todos os metadados claramente legíveis com contraste adequado
7. Autor pode ser formatado como link (preparação para perfil, não-clicável no MVP)
8. Comentários deletados exibem placeholder "[comentário deletado]" ao invés de conteúdo

### Story 3.7: Comments Accessibility & Keyboard Navigation

**Como** usuário que navega via teclado ou leitor de tela,
**Eu quero** acessar todos os comentários e controles facilmente,
**Para que** eu possa participar da experiência completa independente de minhas capacidades.

#### Acceptance Criteria

1. Toda navegação de comentários funciona via teclado (Tab, Enter, Space)
2. Ordem de foco lógica através de comentários e replies (top to bottom, respeitando hierarquia)
3. Botões de expandir/colapsar têm labels descritivos (ex: "Expandir 5 respostas" não apenas ícone)
4. Leitores de tela anunciam corretamente estrutura hierárquica de comentários
5. ARIA attributes apropriados usados (role="tree" ou estrutura de headings com níveis)
6. Estado de colapsado/expandido comunicado a leitores de tela (aria-expanded)
7. Skip links ou landmarks permitindo pular seção de comentários se desejado
8. Foco visível claramente indicado em todos os elementos interativos
9. Comentários longos não quebram interface ou impedem navegação
10. Tested com pelo menos um leitor de tela (NVDA, JAWS, ou VoiceOver)

---

## Epic 4: Polish, Accessibility Validation & Deploy

**Goal:** Refinar design visual, validar conformidade total com WCAG 2.1 AA através de testes automatizados e manuais, implementar melhorias de performance identificadas, corrigir bugs encontrados, e fazer deploy final da aplicação com documentação completa. Garantir que a aplicação seja um projeto de demonstração profissional e pronto para inclusão em portfólio.

### Story 4.1: Visual Design Polish & Consistency

**Como** usuário,
**Eu quero** uma experiência visual consistente e profissional em toda a aplicação,
**Para que** eu tenha confiança na qualidade do produto e navegação intuitiva.

#### Acceptance Criteria

1. Todos os componentes seguem consistentemente design tokens (cores, tipografia, espaçamento)
2. Estados hover, focus e active implementados de forma consistente em todos os elementos interativos
3. Transições suaves aplicadas a interações (hover, expand/collapse, page transitions)
4. Ícones consistentes utilizados em toda aplicação (biblioteca de ícones única)
5. Loading states visuais consistentes (mesmo spinner/skeleton pattern em toda app)
6. Error states visuais consistentes (mesmo design de mensagens de erro)
7. Espaçamento e padding revisados para generosidade e respirabilidade em todas as telas
8. Revisão completa de alinhamentos, garantindo grid visual consistente
9. Paleta de cores aplicada de forma harmoniosa sem exceções visuais estranhas

### Story 4.2: Automated Accessibility Testing

**Como** desenvolvedor,
**Eu quero** validar acessibilidade automaticamente,
**Para que** possamos garantir conformidade WCAG 2.1 AA de forma consistente.

#### Acceptance Criteria

1. jest-axe configurado e integrado aos testes de componentes
2. Testes de acessibilidade criados para todos os componentes principais (Layout, StoryList, ArticleDetail, Comment)
3. Lighthouse CI configurado e executando em builds
4. Score de acessibilidade Lighthouse de 100 alcançado em todas as páginas principais
5. Axe DevTools browser extension utilizado para varredura manual das páginas
6. WAVE tool utilizado para validação adicional
7. Todos os issues reportados por ferramentas automatizadas corrigidos
8. Documentação de resultados de testes em arquivo (ex: ACCESSIBILITY.md)

### Story 4.3: Manual Accessibility Testing & Keyboard Navigation

**Como** QA ou desenvolvedor,
**Eu quero** validar acessibilidade manualmente com ferramentas assistivas reais,
**Para que** possamos garantir experiência funcional além de conformidade técnica.

#### Acceptance Criteria

1. Teste completo de navegação via teclado realizado em todas as páginas (apenas Tab, Enter, Space, Arrows)
2. Teste com leitor de tela realizado (NVDA, JAWS, ou VoiceOver) em fluxos principais
3. Checklist WCAG 2.1 AA preenchida documentando conformidade de cada critério
4. Contraste de cores validado manualmente com ferramentas (ex: Contrast Checker)
5. Todos os issues encontrados documentados e corrigidos
6. Fluxo completo testado: home → artigo → expandir comentários → voltar home
7. Teste em diferentes resoluções e dispositivos (desktop, tablet, mobile)
8. Documentação de resultados de testes manuais (screenshots, notas)

### Story 4.4: Performance Optimization

**Como** usuário,
**Eu quero** que a aplicação carregue rapidamente e responda de forma fluida,
**Para que** eu tenha experiência agradável sem frustrações de performance.

#### Acceptance Criteria

1. Bundle size analisado e otimizado (target: <500KB para main bundle)
2. Code splitting implementado para rotas (lazy loading de ArticleDetail page com defineAsyncComponent)
3. Imagens (se houver) otimizadas e com lazy loading
4. Componentes otimizados com v-once, v-memo ou computed properties onde apropriado
5. API responses cacheadas em localStorage com estratégia de invalidação (ex: cache de 5 minutos)
6. Lighthouse Performance score de pelo menos 90 alcançado
7. Tempo de carregamento inicial <3 segundos em conexão de banda larga (tested com throttling)
8. Sem jank ou stuttering ao scrollar listas longas ou expandir comentários

### Story 4.5: Error Handling & Edge Cases

**Como** usuário,
**Eu quero** experiência robusta mesmo quando algo dá errado,
**Para que** eu possa continuar usando a aplicação ou entender claramente o problema.

#### Acceptance Criteria

1. Todas as chamadas de API têm tratamento de erro robusto
2. Mensagens de erro são claras, em português, e indicam próximos passos
3. Error boundary implementado no nível de app capturando erros de componente
4. Página de fallback de erro friendly exibida quando error boundary captura erro
5. Casos extremos testados: artigo sem comentários, artigo deletado, network offline, API timeout
6. Loading states não ficam "travados" indefinidamente (timeouts implementados)
7. Botões "Tentar novamente" funcionam corretamente em situações de erro
8. Console errors revisados e corrigidos (zero errors no console em uso normal)

### Story 4.6: Documentation & Code Quality

**Como** desenvolvedor futuro ou revisor do projeto,
**Eu quero** documentação clara e código bem organizado,
**Para que** eu possa entender rapidamente o projeto e fazer manutenções.

#### Acceptance Criteria

1. README.md completo com: descrição do projeto, screenshots, instruções de setup, build, deploy
2. ACCESSIBILITY.md documentando decisões de design acessível e resultados de testes
3. Comentários em código para decisões não óbvias ou complexas
4. Tipos TypeScript utilizados consistentemente em todo código (minimal use of `any`)
5. Componentes organizados em estrutura de pastas lógica
6. Código formatado consistentemente (Prettier executado em todo codebase)
7. Linting passa sem erros ou warnings
8. package.json com scripts documentados (dev, build, test, lint)
9. LICENSE file adicionado ao repositório (MIT ou similar open source license)

### Story 4.7: Final Deploy & Production Validation

**Como** stakeholder do projeto,
**Eu quero** aplicação deployada e funcional em produção,
**Para que** possamos demonstrar o projeto e incluir em portfólio.

#### Acceptance Criteria

1. Build de produção otimizado criado e deployado em Vercel/Netlify
2. URL de produção funcionando e acessível publicamente
3. Testes de smoke realizados em produção: home carrega, artigo carrega, comentários carregam
4. Verificação de que API calls funcionam em produção (não apenas localhost)
5. Lighthouse audit executado em URL de produção com scores satisfatórios
6. Testes em múltiplos navegadores: Chrome, Firefox, Safari, Edge
7. README atualizado com link para aplicação live
8. Screenshots da aplicação adicionados ao README
9. Custom domain configurado (opcional, se disponível)
10. Analytics básico configurado (Google Analytics ou similar) para demonstração (opcional)

---

## Checklist Results Report

### Executive Summary

- **Overall PRD Completeness:** 92%
- **MVP Scope Appropriateness:** Just Right
- **Readiness for Architecture Phase:** **READY**
- **Most Critical Gaps:** Falta plano de monitoramento operacional detalhado (não bloqueante)

### Category Analysis

| Category                         | Status  | Critical Issues |
| -------------------------------- | ------- | --------------- |
| 1. Problem Definition & Context  | PASS    | None |
| 2. MVP Scope Definition          | PASS    | None |
| 3. User Experience Requirements  | PASS    | None |
| 4. Functional Requirements       | PASS    | None |
| 5. Non-Functional Requirements   | PASS    | None |
| 6. Epic & Story Structure        | PASS    | None |
| 7. Technical Guidance            | PASS    | None |
| 8. Cross-Functional Requirements | PARTIAL | Plano de monitoramento operacional poderia ser mais detalhado |
| 9. Clarity & Communication       | PASS    | None |

### Strengths

- ✅ Escopo MVP muito bem balanceado e realista
- ✅ Requirements claros, testáveis e completos
- ✅ Épicos e stories excelentemente estruturados com sequência lógica
- ✅ Acessibilidade tratada como prioridade desde o início
- ✅ Technical assumptions bem documentados (Vue 3 + TypeScript + Vite + Tailwind)
- ✅ Acceptance criteria detalhados e verificáveis (8-10 por story)
- ✅ Sequenciamento lógico de stories dentro de épicos
- ✅ First epic completo com setup, scaffolding e infrastructure

### Areas for Improvement (Non-Blocking)

- ⚠️ Plano de monitoramento operacional poderia ser mais detalhado
- ⚠️ Baseline metrics do HackerNews original para comparação seriam úteis
- ℹ️ Diagramas de fluxo de usuário seriam benéficos (opcional)

### Final Verdict

**✅ READY FOR ARCHITECT**

Este PRD está completo, bem estruturado e pronto para a fase de arquitetura técnica. Os gaps identificados são menores e não bloqueiam o progresso para próximas fases.

---

## Next Steps

### UX Expert Prompt

```
@ux-expert Olá! Acabei de finalizar o PRD do projeto "HackerNews Redesign for Senior Tech Enthusiasts" (docs/prd.md). 

Por favor, revise o documento e crie a especificação de design de interface (UI/UX) focando em:
- Design system com paleta azul acessível (WCAG AA)
- Componentes principais: StoryList, ArticleDetail, CommentThread
- Layouts responsivos para desktop, tablet e mobile
- Padrões de interação para expandir/colapsar comentários
- Estados de loading, erro e feedback visual

O projeto prioriza acessibilidade para usuários acima de 60 anos. Use este PRD como input para criar a especificação de arquitetura de UI.
```

### Architect Prompt

```
@architect Olá! O PRD do projeto "HackerNews Redesign for Senior Tech Enthusiasts" está completo (docs/prd.md).

Por favor, crie a arquitetura técnica detalhada para:
- Stack: Vue 3 + TypeScript + Vite + Tailwind CSS
- Frontend-only SPA consumindo HackerNews API
- Estrutura de componentes Vue (Composition API), composables e service layer
- Estratégias de cache, tratamento de erros e performance
- Configuração de testes (Vitest + Vue Test Utils + vitest-axe)
- Setup de CI/CD com Vercel/Netlify

Use este PRD como input para criar o documento de arquitetura completo.
```
