# Epic 3: Comments System & Hierarchy

**Goal:** Desenvolver sistema completo e acessível de exibição de comentários com hierarquia visual clara de threads aninhadas, controles de expansão/colapso, sanitização segura de conteúdo HTML, e otimização de performance para artigos com grande volume de comentários. Permitir que usuários naveguem facilmente através de discussões complexas mantendo clareza visual e acessibilidade.

## Story 3.1: Comments Data Fetching & Structure

**Como** desenvolvedor,
**Eu quero** buscar e estruturar dados de comentários hierarquicamente,
**Para que** possamos renderizar threads aninhadas de forma organizada.

### Acceptance Criteria

1. Função no API service para buscar comentário por ID (`getCommentById`)
2. Função recursiva implementada para buscar árvore completa de comentários dado array de IDs raiz
3. Estrutura de dados apropriada criada para representar comentários aninhados (tree structure)
4. Comentários deletados ou mortos tratados adequadamente (exibir placeholder ou ocultar)
5. Loading de comentários otimizado (batch requests se possível, ou loading progressivo)
6. Tipos TypeScript para Comment interface incluindo propriedades kids (replies)
7. Testes unitários para lógica de estruturação de comentários usando Vitest
8. Tratamento de erro para comentários que falharem ao carregar (não bloquear thread inteira)

## Story 3.2: Comment Component & Basic Rendering

**Como** usuário,
**Eu quero** ver comentários associados ao artigo de forma clara,
**Para que** eu possa ler opiniões e discussões sobre o conteúdo.

### Acceptance Criteria

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

## Story 3.3: Hierarchical Threading & Visual Indentation

**Como** usuário,
**Eu quero** ver visualmente a hierarquia de replies em uma discussão,
**Para que** eu possa entender o fluxo de conversação e relações entre comentários.

### Acceptance Criteria

1. Comentários aninhados renderizam recursivamente (replies dentro de replies)
2. Indentação visual implementada para cada nível de nesting (ex: 2rem por nível)
3. Borda lateral ou linha vertical conectando replies a comentário pai
4. Profundidade máxima de indentação configurada (ex: 5 níveis) para evitar overflow em mobile
5. Em mobile, indentação reduzida (ex: 1rem) para preservar espaço de leitura
6. Cores de borda ou background alternadas por nível para facilitar distinção visual
7. Estrutura semântica de lista aninhada (ul > li > ul > li) ou equivalente
8. Navegação via teclado funciona através da hierarquia de comentários
9. Leitores de tela anunciam nível de nesting apropriadamente (aria-level ou headings)

## Story 3.4: Expand/Collapse Comment Threads

**Como** usuário,
**Eu quero** expandir e colapsar threads de comentários,
**Para que** eu possa focar em conversas relevantes e ocultar threads longas que não me interessam.

### Acceptance Criteria

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

## Story 3.5: Comments Loading States & Pagination

**Como** usuário,
**Eu quero** feedback sobre loading de comentários e controle sobre quantos carregar,
**Para que** eu tenha experiência responsiva mesmo em artigos com muitos comentários.

### Acceptance Criteria

1. Loading indicator exibido enquanto comentários são buscados
2. Comentários carregam em batches (ex: primeiros 20 comentários raiz, depois load more)
3. Botão "Carregar mais comentários" implementado se houver mais de X comentários
4. Loading progressivo: comentários já carregados ficam visíveis enquanto próximos carregam
5. Estado de erro tratado para falhas ao buscar comentários individuais
6. Skeleton UI ou placeholder para comentários em loading
7. Mensagem "Nenhum comentário ainda" exibida se artigo não tiver comentários
8. Performance monitorada: artigo com 100+ comentários deve manter interface responsiva
9. Estratégia de virtualização considerada se necessário para threads extremamente longas (opcional para MVP)

## Story 3.6: Comment Metadata & Interactions

**Como** usuário,
**Eu quero** ver informações contextuais sobre cada comentário,
**Para que** eu possa avaliar relevância e timing das contribuições.

### Acceptance Criteria

1. Nome do autor exibido de forma destacada em cada comentário
2. Tempo desde postagem formatado relativamente ("há 2 horas", "há 3 dias") em português
3. Indicação visual se comentário é do autor original do artigo (OP badge)
4. Número de replies diretos exibido quando thread está colapsada
5. Link "Responder" exibido (pode ser não-funcional no MVP, preparação para feature futura)
6. Todos os metadados claramente legíveis com contraste adequado
7. Autor pode ser formatado como link (preparação para perfil, não-clicável no MVP)
8. Comentários deletados exibem placeholder "[comentário deletado]" ao invés de conteúdo

## Story 3.7: Comments Accessibility & Keyboard Navigation

**Como** usuário que navega via teclado ou leitor de tela,
**Eu quero** acessar todos os comentários e controles facilmente,
**Para que** eu possa participar da experiência completa independente de minhas capacidades.

### Acceptance Criteria

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
