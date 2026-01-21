# Requirements

## Functional

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

## Non Functional

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
