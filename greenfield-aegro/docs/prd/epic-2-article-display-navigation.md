# Epic 2: Article Display & Navigation

**Goal:** Implementar visualização completa e acessível de artigos individuais do HackerNews, incluindo todos os metadados relevantes, link para fonte original, e navegação fluida da lista para artigo e vice-versa. Garantir que toda experiência seja acessível via teclado e atenda padrões WCAG AA, permitindo que usuários consumam conteúdo de artigos de forma confortável.

## Story 2.1: Article Detail View - Basic Structure

**Como** usuário,
**Eu quero** visualizar detalhes completos de um artigo quando clico em um item da lista,
**Para que** eu possa ler o título completo, metadados e acessar o artigo original.

### Acceptance Criteria

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

## Story 2.2: Article Metadata Enhancement

**Como** usuário,
**Eu quero** ver informações contextuais adicionais sobre o artigo,
**Para que** eu possa avaliar relevância e autenticidade do conteúdo antes de acessar link externo.

### Acceptance Criteria

1. Domínio do link externo exibido de forma destacada (extraído da URL, ex: "github.com")
2. Ícone ou badge visual indicando tipo de post (Article, Ask HN, Show HN, Job, Poll)
3. Tempo desde postagem formatado de forma relativa e amigável ("há 3 horas", "há 2 dias")
4. Número de comentários exibido com ícone de comentário claro
5. Informação do autor formatada como link (preparação para futura feature de perfil, pode ser não-clicável no MVP)
6. Todos os metadados organizados visualmente com espaçamento adequado
7. Contraste de cor para todos os textos atende WCAG AA
8. Metadados anunciados corretamente por leitores de tela com labels apropriados

## Story 2.3: Article Text Content Display (Ask/Show HN)

**Como** usuário,
**Eu quero** ler o texto completo de posts tipo "Ask HN" ou "Show HN",
**Para que** eu possa entender a questão ou demonstração sem precisar acessar link externo.

### Acceptance Criteria

1. Texto do artigo (propriedade `text` da API) renderizado quando disponível
2. HTML do texto sanitizado para prevenir XSS (usar biblioteca como DOMPurify)
3. Formatação HTML básica preservada (parágrafos, links, code blocks se houver)
4. Links dentro do texto do artigo abrem em nova aba com segurança (rel="noopener noreferrer")
5. Tipografia do texto de conteúdo segue design tokens (min 16px, line-height 1.6)
6. Code blocks (se presentes) formatados com monospace font e background diferenciado
7. Espaçamento adequado entre parágrafos para legibilidade
8. Máxima largura de linha configurada (ex: 70ch) para facilitar leitura

## Story 2.4: Back Navigation & Breadcrumbs

**Como** usuário,
**Eu quero** entender onde estou na aplicação e retornar facilmente à lista,
**Para que** eu possa navegar de forma intuitiva entre artigos sem me perder.

### Acceptance Criteria

1. Breadcrumb navigation implementado (Home > Article Title)
2. Link "Home" no breadcrumb leva à lista de artigos
3. Botão "← Voltar" posicionado de forma visível no topo da página de artigo
4. Ambos métodos de navegação (breadcrumb e botão) funcionam via teclado
5. Indicadores visuais claros para elementos interativos (hover, focus states)
6. Navegação preserva scroll position ao voltar para lista (se tecnicamente viável)
7. Title da página atualizado com título do artigo para contexto de navegação
8. Breadcrumb estruturado semanticamente (nav > ol > li ou schema.org markup)

## Story 2.5: Loading States & Error Handling

**Como** usuário,
**Eu quero** feedback claro sobre o que está acontecendo quando navego,
**Para que** eu entenda se a aplicação está funcionando ou se há algum problema.

### Acceptance Criteria

1. Skeleton UI ou spinner exibido enquanto artigo carrega
2. Loading indicator é acessível (aria-live region ou role="status")
3. Mensagem clara exibida se artigo não for encontrado ("Artigo não encontrado")
4. Mensagem clara exibida se houver erro de rede ("Erro ao carregar artigo, tente novamente")
5. Botão "Tentar novamente" fornecido em situações de erro
6. Estados de loading não bloqueiam navegação (usuário pode voltar durante loading)
7. Timeout configurado para requests (ex: 10s), com mensagem apropriada se timeout ocorrer
8. Todas as mensagens de erro são amigáveis e em português brasileiro claro

## Story 2.6: Responsive Article Layout

**Como** usuário em diferentes dispositivos,
**Eu quero** que o artigo seja legível e bem formatado em qualquer tamanho de tela,
**Para que** eu possa ler confortavelmente em desktop, tablet ou mobile.

### Acceptance Criteria

1. Layout de artigo responsivo funciona em desktop (1920x1080), tablet (1024x768) e mobile (375x667)
2. Em mobile, metadados reorganizam-se verticalmente mantendo legibilidade
3. Botão "Voltar" permanece facilmente acessível em todas as resoluções
4. Imagens no conteúdo (se houver) respondem e não ultrapassam largura do container
5. Texto não quebra de forma estranha ou ultrapassa limites do viewport
6. Touch targets em mobile têm tamanho mínimo de 44x44px
7. Espaçamento e padding ajustam-se proporcionalmente para cada breakpoint
8. Breadcrumbs colapsam ou ajustam-se adequadamente em telas pequenas

---
