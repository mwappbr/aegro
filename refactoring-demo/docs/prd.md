# Product Requirements Document (PRD)
## TaskMaster Pro - Modernização Completa

**Agente**: Product Manager (PM)  
**Versão**: 1.0  
**Data**: Janeiro 2026  
**Status**: Aprovado para Desenvolvimento  
**Baseado em**: Relatório de Auditoria Técnica (03-auditoria-completa.md)

---

## 1. Visão do Produto

### 1.1 Declaração de Visão

Transformar o TaskMaster Pro de uma aplicação legada vulnerável em PHP 5 em uma aplicação web moderna, segura, escalável e manutenível, utilizando tecnologias de ponta (TypeScript, React, Node.js) que garantem segurança desde o início, qualidade de código e capacidade de evolução contínua.

### 1.2 Problema que Estamos Resolvendo

A aplicação legada TaskMaster Pro apresenta problemas críticos que impedem sua evolução e colocam em risco a segurança dos dados:

**Segurança Crítica:**
- 15+ vulnerabilidades de SQL Injection em todo o código
- Autenticação insegura usando MD5 com salt hardcoded
- Upload de arquivos vulnerável a execução de código remoto
- 25+ vulnerabilidades de segurança no total

**Tecnologia Obsoleta:**
- PHP 5 em End-of-Life desde 2018 (sem patches de segurança)
- Uso de funções `mysql_*` removidas no PHP 7+
- Dependências frontend obsoletas (Bootstrap 3.3.7, jQuery 1.12.4)

**Débito Técnico Estrutural:**
- 3.600+ linhas de código não tipado e não testado
- Arquitetura procedural sem separação de responsabilidades
- Zero cobertura de testes automatizados
- Acoplamento excessivo e dependências globais
- Impossibilidade de implementar CI/CD ou práticas modernas

**Impacto no Negócio:**
- Risco de violação de dados e conformidade (LGPD/GDPR)
- Impossibilidade de contratar desenvolvedores (ninguém trabalha com PHP 5)
- Custo crescente de manutenção
- Impossibilidade de adicionar features modernas

### 1.3 Solução Proposta

Reescrita completa da aplicação com stack moderna e práticas de desenvolvimento de classe mundial:

**Stack Tecnológica:**
- **Backend**: Node.js 20 LTS + TypeScript + Express.js
- **Frontend**: React 18 + TypeScript + Tailwind CSS
- **Database**: PostgreSQL 15+ com Prisma ORM
- **Autenticação**: JWT + bcrypt (cost 10+)
- **Validação**: Zod para schema validation

**Arquitetura:**
- API-first design para futuras integrações
- Separação clara de camadas (Routes → Validators → Services → Prisma)
- Type safety completo (TypeScript strict mode, zero `any`)
- Testabilidade desde o início (unit + integration tests)

**Segurança:**
- Zero SQL Injection (Prisma ORM com prepared statements)
- Senhas hasheadas com bcrypt
- Validação de entrada em todas as camadas
- Práticas OWASP Top 10 implementadas

---

## 2. Objetivos e Métricas de Sucesso

### 2.1 Objetivos Primários

| Objetivo | Métrica | Meta | Como Medir |
|----------|---------|------|------------|
| **Segurança** | Vulnerabilidades SQL Injection | 0 | Code review + SAST tools |
| **Segurança** | Senhas hasheadas corretamente | 100% | Verificação de uso de bcrypt |
| **Segurança** | Vulnerabilidades conhecidas | 0 | OWASP Top 10 checklist |
| **Qualidade de Código** | Uso de TypeScript `any` | 0 | ESLint rule + TypeScript strict |
| **Qualidade de Código** | Cobertura de testes | >80% | Jest coverage reports |
| **Qualidade de Código** | Erros de linting | 0 | ESLint + Prettier |
| **Performance** | Tempo de resposta da API | <200ms | APM tools (p95) |
| **Performance** | Carregamento inicial da página | <3s | Lighthouse |
| **Funcionalidade** | Paridade de features core | 100% | Checklist de funcionalidades |
| **Manutenibilidade** | Complexidade ciclomática média | <10 | SonarQube |

### 2.2 Métricas de Sucesso Secundárias

- **Developer Experience**: Setup do projeto em <5 minutos
- **Documentação**: 100% dos endpoints documentados
- **CI/CD**: Pipeline automatizado com testes e deploy
- **Type Safety**: 100% das funções com type hints e return types

---

## 3. Escopo do Projeto

### 3.1 Funcionalidades IN-SCOPE (Incluídas)

#### Prioridade P0 (Obrigatório - MVP)

1. **Autenticação Completa**
   - Registro de usuário com validação
   - Login com JWT
   - Logout e gerenciamento de sessão
   - Proteção de rotas autenticadas

2. **Gestão de Projetos (CRUD)**
   - Criar projeto (nome, descrição)
   - Listar projetos do usuário
   - Editar projeto
   - Excluir projeto (com cascade para tarefas)

3. **Gestão de Tarefas (CRUD Completo)**
   - Criar tarefa (título, descrição, prioridade, data de vencimento, projeto)
   - Listar tarefas com filtros
   - Editar tarefa (todos os campos + status)
   - Excluir tarefa
   - Atualizar status (pending → in_progress → completed)

4. **Dashboard com Estatísticas**
   - Cards com contadores (total, pending, in_progress, completed, overdue)
   - Lista de tarefas com filtros e ordenação
   - Destaque visual para tarefas atrasadas

#### Prioridade P1 (Importante - Fase 2)

5. **Filtros e Ordenação Avançados**
   - Filtrar por status, prioridade, projeto
   - Ordenar por data de criação, vencimento, prioridade
   - Busca por texto (título, descrição)

6. **Atribuição de Tarefas**
   - Atribuir tarefa a usuário
   - Visualizar tarefas atribuídas

7. **Melhorias de UX**
   - Feedback visual em todas as ações
   - Loading states
   - Mensagens de erro claras
   - Validação em tempo real de formulários

### 3.2 Funcionalidades OUT-OF-SCOPE (Excluídas)

| Funcionalidade | Justificativa |
|----------------|---------------|
| **Anexos de Arquivos** | Feature complexa com riscos de segurança (upload, validação de tipo, armazenamento). Requer implementação cuidadosa de validação de MIME type, magic bytes, e armazenamento seguro. Deixar para versão futura. |
| **Sistema de Comentários** | Adiciona complexidade de real-time updates e notificações. Não é essencial para MVP. |
| **Time Tracking (Registro de Tempo)** | Requer UI adicional complexa e lógica de cálculo. Pode ser adicionado posteriormente. |
| **Log de Atividades Detalhado** | Sistema legado tinha activity_log, mas para MVP focamos em funcionalidades core. |
| **Notificações por Email** | Requer integração com serviço de email e templates. Não crítico para demo. |
| **Painel Administrativo** | Sistema de roles e permissões adiciona complexidade. MVP foca em usuário único. |
| **Múltiplos Membros por Projeto** | Simplificação: cada projeto tem um dono. Colaboração pode ser adicionada depois. |
| **Tags e Categorias** | Sistema legado tinha tags como VARCHAR, mas para MVP focamos em projetos como organização. |
| **Versão Mobile** | Foco inicial em desktop. Responsividade básica, mas não app mobile nativo. |
| **Integrações Externas** | APIs de terceiros (Slack, GitHub, etc.) ficam para versões futuras. |

**Justificativa Geral**: O escopo foi definido para permitir uma demonstração funcional completa em ~90 minutos de desenvolvimento, focando nas funcionalidades core que demonstram a modernização e segurança da aplicação.

---

## 4. Requisitos Funcionais

### 4.1 Autenticação (FR-AUTH)

| ID | Requisito | Prioridade | Critério de Aceite |
|----|-----------|------------|-------------------|
| FR-AUTH-01 | Registro de usuário | P0 | Usuário pode criar conta com nome, email (único), senha (mínimo 8 caracteres) e confirmação de senha. Email validado, senha hasheada com bcrypt antes de salvar. |
| FR-AUTH-02 | Login de usuário | P0 | Usuário pode fazer login com email e senha. Sistema valida credenciais, gera JWT token e retorna para cliente. Token armazenado em localStorage. |
| FR-AUTH-03 | Logout | P0 | Usuário pode fazer logout. Token removido do localStorage, redirecionamento para página de login. |
| FR-AUTH-04 | Persistência de sessão | P1 | Token JWT persiste entre refreshs de página. Middleware valida token em todas as requisições protegidas. |
| FR-AUTH-05 | Segurança de senha | P0 | Senhas hasheadas com bcrypt (cost factor 10+). Nunca armazenadas em texto plano. Validação de força mínima (8 caracteres). |
| FR-AUTH-06 | Rotas protegidas | P0 | Rotas que requerem autenticação verificam token JWT. Usuários não autenticados são redirecionados para login. |
| FR-AUTH-07 | Obter usuário atual | P1 | Endpoint `/api/auth/me` retorna dados do usuário autenticado baseado no token JWT. |

### 4.2 Gestão de Projetos (FR-PROJ)

| ID | Requisito | Prioridade | Critério de Aceite |
|----|-----------|------------|-------------------|
| FR-PROJ-01 | Criar projeto | P0 | Usuário pode criar projeto com nome (obrigatório) e descrição (opcional). Projeto é associado ao usuário como owner. |
| FR-PROJ-02 | Listar projetos | P0 | Usuário vê lista de todos os projetos que possui. Lista ordenada por data de criação (mais recente primeiro). |
| FR-PROJ-03 | Visualizar projeto | P1 | Usuário pode visualizar detalhes de um projeto (nome, descrição, data de criação, contagem de tarefas). |
| FR-PROJ-04 | Editar projeto | P1 | Usuário pode editar nome e descrição de projetos que possui. Validação de nome obrigatório. |
| FR-PROJ-05 | Excluir projeto | P1 | Usuário pode excluir projetos que possui. Exclusão em cascade remove todas as tarefas associadas. Confirmação antes de excluir. |
| FR-PROJ-06 | Filtrar tarefas por projeto | P1 | Na lista de tarefas, usuário pode filtrar para ver apenas tarefas de um projeto específico. |

### 4.3 Gestão de Tarefas (FR-TASK)

| ID | Requisito | Prioridade | Critério de Aceite |
|----|-----------|------------|-------------------|
| FR-TASK-01 | Criar tarefa | P0 | Usuário pode criar tarefa com título (obrigatório), descrição (opcional), prioridade (low/medium/high), data de vencimento (opcional), projeto (opcional). Tarefa criada com status "pending" por padrão. |
| FR-TASK-02 | Listar tarefas | P0 | Usuário vê lista de todas as tarefas que criou ou que foram atribuídas a ele. Lista mostra título, status, prioridade, data de vencimento, projeto. |
| FR-TASK-03 | Visualizar tarefa | P1 | Usuário pode visualizar detalhes completos de uma tarefa (todos os campos + datas de criação/atualização). |
| FR-TASK-04 | Editar tarefa | P0 | Usuário pode editar todos os campos de uma tarefa (título, descrição, prioridade, data de vencimento, projeto). Validação de campos obrigatórios. |
| FR-TASK-05 | Atualizar status | P0 | Usuário pode alterar status da tarefa: pending → in_progress → completed. Transições são validadas (não pode voltar de completed para pending sem edição manual). |
| FR-TASK-06 | Excluir tarefa | P0 | Usuário pode excluir tarefas que criou. Confirmação antes de excluir. Tarefa removida permanentemente. |
| FR-TASK-07 | Filtrar tarefas | P1 | Usuário pode filtrar tarefas por: status (all/pending/in_progress/completed), prioridade (all/low/medium/high), projeto. Filtros podem ser combinados. |
| FR-TASK-08 | Ordenar tarefas | P1 | Usuário pode ordenar tarefas por: data de criação (mais recente/mais antiga), data de vencimento, prioridade (high → low), título (A-Z). |
| FR-TASK-09 | Buscar tarefas | P1 | Usuário pode buscar tarefas por texto (busca em título e descrição). Busca case-insensitive. |
| FR-TASK-10 | Atribuir tarefa | P2 | Usuário pode atribuir tarefa a outro usuário (se implementado sistema de membros de projeto). Por enquanto, tarefa é atribuída ao criador. |
| FR-TASK-11 | Destaque de tarefas atrasadas | P0 | Tarefas com data de vencimento no passado e status diferente de "completed" são destacadas visualmente (cor vermelha, ícone de alerta). |

### 4.4 Dashboard (FR-DASH)

| ID | Requisito | Prioridade | Critério de Aceite |
|----|-----------|------------|-------------------|
| FR-DASH-01 | Estatísticas de tarefas | P0 | Dashboard exibe cards com contadores: Total de tarefas, Pendentes, Em progresso, Concluídas, Atrasadas. Números atualizados em tempo real. |
| FR-DASH-02 | Lista de tarefas no dashboard | P0 | Dashboard mostra lista de tarefas (mesma funcionalidade da página de tarefas) com opção de filtros rápidos. |
| FR-DASH-03 | Formulário rápido de adicionar tarefa | P1 | Dashboard tem formulário compacto para adicionar tarefa rapidamente (campos essenciais: título, prioridade, projeto). |
| FR-DASH-04 | Visualização de tarefas atrasadas | P1 | Seção destacada no dashboard mostrando apenas tarefas atrasadas com contador e lista. |
| FR-DASH-05 | Atualização em tempo real | P2 | Quando tarefa é criada/editada em outra aba, dashboard atualiza automaticamente (ou ao fazer refresh manual). |

---

## 5. Requisitos Não-Funcionais

### 5.1 Segurança (NFR-SEC)

| ID | Requisito | Implementação |
|----|-----------|----------------|
| NFR-SEC-01 | Zero SQL Injection | Prisma ORM utiliza prepared statements em todas as queries. Nenhuma interpolação de strings em SQL. Validação de tipos em tempo de compilação. |
| NFR-SEC-02 | Hash de senhas seguro | bcrypt com cost factor 10+ (configurável via env). Nunca usar MD5, SHA1 ou algoritmos obsoletos. |
| NFR-SEC-03 | Autenticação JWT segura | JWT com algoritmo HS256. Token expira em 24h (configurável). Secret armazenado em variável de ambiente. Validação de assinatura em todas as requisições. |
| NFR-SEC-04 | Validação de entrada | Zod schemas em todos os endpoints da API. Validação de tipos, formatos (email, dates), e constraints (min/max length, ranges). Rejeitar requisições inválidas com erro 400. |
| NFR-SEC-05 | CORS configurado | CORS habilitado apenas para origens permitidas (whitelist). Headers apropriados (Access-Control-Allow-Origin, etc.). |
| NFR-SEC-06 | Variáveis de ambiente | Todas as credenciais, secrets e configurações sensíveis em arquivo `.env` (nunca commitado). Validação de variáveis obrigatórias no startup. |
| NFR-SEC-07 | Proteção contra XSS | Sanitização de entrada do usuário. React escapa automaticamente, mas validar dados no backend também. |
| NFR-SEC-08 | Rate limiting | Implementar rate limiting em endpoints de autenticação (prevenir brute force). Limite de requisições por IP. |
| NFR-SEC-09 | HTTPS obrigatório | Em produção, todas as comunicações via HTTPS. Redirecionar HTTP para HTTPS. |
| NFR-SEC-10 | Headers de segurança | Headers HTTP de segurança: X-Content-Type-Options, X-Frame-Options, X-XSS-Protection, Strict-Transport-Security. |

### 5.2 Performance (NFR-PERF)

| ID | Requisito | Meta |
|----|-----------|------|
| NFR-PERF-01 | Tempo de resposta da API | <200ms para operações CRUD (p95) |
| NFR-PERF-02 | Carregamento inicial da página | <3s (First Contentful Paint) |
| NFR-PERF-03 | Tempo de query no banco | <50ms por query (p95) |
| NFR-PERF-04 | Tamanho do bundle JavaScript | <500KB (gzipped) para página inicial |
| NFR-PERF-05 | Paginação | Listas com >20 itens devem ser paginadas (não carregar tudo de uma vez) |

### 5.3 Manutenibilidade (NFR-MAINT)

| ID | Requisito | Implementação |
|----|-----------|----------------|
| NFR-MAINT-01 | Type safety completo | TypeScript strict mode habilitado. Zero uso de `any`. Todas as funções com type hints e return types. |
| NFR-MAINT-02 | Estrutura de código | Arquitetura em camadas: Routes → Validators (Zod) → Services → Prisma. Separação clara de responsabilidades. |
| NFR-MAINT-03 | Tratamento de erros | Middleware centralizado de tratamento de erros. Erros padronizados com códigos HTTP apropriados. Logging estruturado. |
| NFR-MAINT-04 | Linting e formatação | ESLint + Prettier configurados. Zero erros de linting. Formatação automática no commit (pre-commit hooks). |
| NFR-MAINT-05 | Documentação | README com instruções de setup. Comentários JSDoc em funções públicas. Documentação de API (Swagger/OpenAPI opcional). |
| NFR-MAINT-06 | Testes | Cobertura mínima de 80%. Testes unitários para services e validators. Testes de integração para rotas da API. |
| NFR-MAINT-07 | Versionamento | Git com commits semânticos. Tags de versão. Changelog mantido. |
| NFR-MAINT-08 | CI/CD | Pipeline automatizado: lint → testes → build → deploy. Falha em qualquer etapa bloqueia deploy. |

---

## 6. Histórias de Usuário

### Epic 1: Autenticação

```
US-001: Registro de Usuário
Como um novo usuário
Eu quero criar uma conta no sistema
Para que eu possa gerenciar meus projetos e tarefas

Critérios de Aceite:
- [ ] Formulário de registro com campos: nome, email, senha, confirmação de senha
- [ ] Validação de email (formato válido e único no sistema)
- [ ] Validação de senha (mínimo 6 caracteres)
- [ ] Senha e confirmação devem ser iguais
- [ ] Senha hasheada com bcrypt antes de salvar no banco
- [ ] Mensagem de sucesso após registro
- [ ] Redirecionamento para página de login após registro bem-sucedido
- [ ] Mensagens de erro claras para cada tipo de validação falhada
- [ ] Prevenção de registro duplicado (email já existe)
```

```
US-002: Login de Usuário
Como um usuário registrado
Eu quero fazer login no sistema
Para que eu possa acessar minhas tarefas e projetos

Critérios de Aceite:
- [ ] Formulário de login com campos: email e senha
- [ ] Validação de credenciais no backend
- [ ] Geração de token JWT após login bem-sucedido
- [ ] Token armazenado no localStorage do navegador
- [ ] Redirecionamento para dashboard após login
- [ ] Mensagem de erro para credenciais inválidas
- [ ] Token expira após 24 horas (configurável)
- [ ] Opção de "Lembrar-me" (estender expiração do token)
```

```
US-003: Logout
Como um usuário logado
Eu quero fazer logout
Para que eu possa encerrar minha sessão de forma segura

Critérios de Aceite:
- [ ] Botão de logout visível no header/navbar
- [ ] Token JWT removido do localStorage ao clicar em logout
- [ ] Redirecionamento para página de login
- [ ] Mensagem de confirmação (opcional: "Você foi deslogado com sucesso")
- [ ] Todas as requisições subsequentes falham (token não existe mais)
```

### Epic 2: Gestão de Projetos

```
US-004: Criar Projeto
Como um usuário
Eu quero criar novos projetos
Para que eu possa organizar minhas tarefas por contexto

Critérios de Aceite:
- [ ] Formulário para criar projeto com campos: nome (obrigatório) e descrição (opcional)
- [ ] Validação: nome não pode estar vazio
- [ ] Projeto criado é automaticamente associado ao usuário logado como owner
- [ ] Projeto aparece na lista de projetos após criação
- [ ] Mensagem de sucesso após criação
- [ ] Data de criação registrada automaticamente
- [ ] Redirecionamento ou atualização da lista após criação
```

```
US-005: Visualizar Projetos
Como um usuário
Eu quero ver todos os meus projetos
Para que eu possa navegar entre eles e filtrar tarefas

Critérios de Aceite:
- [ ] Lista de projetos exibida em sidebar ou dropdown
- [ ] Cada projeto mostra: nome, descrição (se houver), contagem de tarefas
- [ ] Projetos ordenados por data de criação (mais recente primeiro)
- [ ] Opção de clicar em projeto para filtrar tarefas
- [ ] Indicador visual de projeto selecionado/ativo
- [ ] Estado vazio quando usuário não tem projetos
```

### Epic 3: Gestão de Tarefas

```
US-006: Visualizar Lista de Tarefas
Como um usuário
Eu quero ver todas as minhas tarefas
Para que eu possa acompanhar meu trabalho

Critérios de Aceite:
- [ ] Lista de tarefas exibida em formato de cards ou tabela
- [ ] Cada tarefa mostra: título, status, prioridade, data de vencimento, projeto
- [ ] Tarefas atrasadas destacadas visualmente (cor vermelha, ícone)
- [ ] Status exibido com badge colorido (pending=cinza, in_progress=azul, completed=verde)
- [ ] Prioridade exibida com ícone ou cor (low=verde, medium=amarelo, high=vermelho)
- [ ] Estado vazio quando não há tarefas
- [ ] Lista atualizada após criar/editar/excluir tarefa
```

```
US-007: Criar Tarefa
Como um usuário
Eu quero adicionar novas tarefas
Para que eu possa registrar novos itens de trabalho

Critérios de Aceite:
- [ ] Formulário com campos: título (obrigatório), descrição (opcional), prioridade (dropdown: low/medium/high), data de vencimento (date picker), projeto (dropdown)
- [ ] Validação: título não pode estar vazio
- [ ] Prioridade padrão: "medium" se não selecionada
- [ ] Status padrão: "pending" ao criar
- [ ] Tarefa associada ao usuário logado como criador
- [ ] Tarefa aparece na lista imediatamente após criação
- [ ] Mensagem de sucesso
- [ ] Formulário limpo após criação bem-sucedida
```

```
US-008: Editar Tarefa
Como um usuário
Eu quero modificar tarefas existentes
Para que eu possa atualizar detalhes e status conforme o trabalho progride

Critérios de Aceite:
- [ ] Botão "Editar" em cada tarefa da lista
- [ ] Modal ou página de edição com formulário pré-preenchido
- [ ] Todos os campos editáveis: título, descrição, prioridade, data de vencimento, projeto, status
- [ ] Validação de campos obrigatórios
- [ ] Mudanças salvas no backend via API
- [ ] Lista atualizada imediatamente após salvar
- [ ] Opção de cancelar edição (fechar modal sem salvar)
- [ ] Feedback visual durante salvamento (loading state)
```

```
US-009: Excluir Tarefa
Como um usuário
Eu quero remover tarefas
Para que eu possa limpar tarefas canceladas ou duplicadas

Critérios de Aceite:
- [ ] Botão "Excluir" em cada tarefa
- [ ] Diálogo de confirmação antes de excluir ("Tem certeza que deseja excluir esta tarefa?")
- [ ] Opção de cancelar exclusão
- [ ] Tarefa removida do banco de dados após confirmação
- [ ] Tarefa removida da lista imediatamente
- [ ] Mensagem de sucesso ("Tarefa excluída com sucesso")
- [ ] Exclusão é permanente (não há lixeira/restauração)
```

```
US-010: Filtrar e Ordenar Tarefas
Como um usuário
Eu quero filtrar e ordenar minhas tarefas
Para que eu possa encontrar tarefas específicas rapidamente

Critérios de Aceite:
- [ ] Filtro por status: dropdown com opções (Todos, Pendentes, Em Progresso, Concluídas)
- [ ] Filtro por prioridade: dropdown (Todos, Baixa, Média, Alta)
- [ ] Filtro por projeto: dropdown com lista de projetos (Todos, Projeto 1, Projeto 2, ...)
- [ ] Filtros podem ser combinados (ex: Pendentes + Alta prioridade + Projeto X)
- [ ] Ordenação: dropdown com opções (Data de criação, Data de vencimento, Prioridade, Título)
- [ ] Ordenação ascendente/descendente (mais recente primeiro ou mais antiga primeiro)
- [ ] Filtros e ordenação persistem durante a sessão (ou resetam ao recarregar)
- [ ] Contador mostra quantas tarefas correspondem aos filtros aplicados
```

### Epic 4: Dashboard

```
US-011: Visualizar Estatísticas no Dashboard
Como um usuário
Eu quero ver estatísticas das minhas tarefas
Para que eu possa entender minha carga de trabalho

Critérios de Aceite:
- [ ] Card "Total" mostrando número total de tarefas
- [ ] Card "Pendentes" mostrando tarefas com status "pending"
- [ ] Card "Em Progresso" mostrando tarefas com status "in_progress"
- [ ] Card "Concluídas" mostrando tarefas com status "completed"
- [ ] Card "Atrasadas" mostrando tarefas com data de vencimento no passado e status != "completed"
- [ ] Cards atualizados em tempo real quando tarefas são criadas/editadas
- [ ] Card "Atrasadas" destacado visualmente (cor vermelha, ícone de alerta)
- [ ] Números são clicáveis (ao clicar, filtra lista para mostrar apenas aquelas tarefas)
- [ ] Estatísticas calculadas no backend e retornadas via API
```

---

## 7. Especificação de UI/UX

### 7.1 Princípios de Design

1. **Simplicidade**: Interface limpa e desobstruída, focando no essencial. Remover elementos desnecessários.
2. **Consistência**: Padrões visuais consistentes (cores, tipografia, espaçamento, componentes) em toda a aplicação.
3. **Feedback**: Feedback visual imediato em todas as ações do usuário (loading states, mensagens de sucesso/erro, confirmações).
4. **Responsividade**: Layout adaptável para diferentes tamanhos de tela (foco inicial em desktop, responsividade básica para tablet).
5. **Acessibilidade**: Contraste adequado, navegação por teclado, labels descritivos, ARIA attributes onde necessário.
6. **Familiaridade**: Layout similar ao sistema legado para facilitar transição dos usuários existentes.

### 7.2 Telas Principais

| Tela | Componentes Principais | Prioridade |
|------|------------------------|------------|
| **Login** | Email input, Password input, Submit button, Link para registro, Mensagens de erro | P0 |
| **Registro** | Nome input, Email input, Password input, Confirm password input, Submit button, Link para login, Validação em tempo real | P0 |
| **Dashboard** | Header (user info, logout), Stats cards (5 cards), Task form (quick add), Filter bar, Task list, Edit modal | P0 |
| **Lista de Tarefas** | Filter bar, Sort dropdown, Task list (cards ou tabela), Empty state, Pagination (se >20 itens) | P0 |
| **Modal de Edição** | Form com todos os campos de tarefa, Save button, Cancel button, Loading state, Validação | P0 |
| **Sidebar de Projetos** | Lista de projetos, Botão "Novo Projeto", Projeto selecionado destacado | P1 |

### 7.3 Hierarquia de Componentes

```
App
├── AuthProvider (Context)
│   ├── LoginPage
│   │   ├── LoginForm
│   │   │   ├── EmailInput
│   │   │   ├── PasswordInput
│   │   │   └── SubmitButton
│   │   └── RegisterLink
│   └── RegisterPage
│       └── RegisterForm
│           ├── NameInput
│           ├── EmailInput
│           ├── PasswordInput
│           ├── ConfirmPasswordInput
│           └── SubmitButton
└── ProtectedRoute
    └── Dashboard
        ├── Header
        │   ├── UserInfo
        │   └── LogoutButton
        ├── StatsCards
        │   ├── TotalCard
        │   ├── PendingCard
        │   ├── InProgressCard
        │   ├── CompletedCard
        │   └── OverdueCard
        ├── TaskForm (Quick Add)
        │   ├── TitleInput
        │   ├── PrioritySelect
        │   ├── ProjectSelect
        │   └── SubmitButton
        ├── FilterBar
        │   ├── StatusFilter
        │   ├── PriorityFilter
        │   ├── ProjectFilter
        │   └── SortSelect
        ├── TaskList
        │   └── TaskItem (múltiplos)
        │       ├── TaskTitle
        │       ├── TaskStatus
        │       ├── TaskPriority
        │       ├── TaskDueDate
        │       ├── TaskProject
        │       ├── EditButton
        │       └── DeleteButton
        └── EditModal
            ├── TaskForm (completo)
            ├── SaveButton
            └── CancelButton
```

### 7.4 Sistema de Cores

- **Primária**: Azul (#3B82F6) - ações principais, links
- **Sucesso**: Verde (#10B981) - tarefas concluídas, mensagens de sucesso
- **Aviso**: Amarelo (#F59E0B) - tarefas em progresso, avisos
- **Erro**: Vermelho (#EF4444) - tarefas atrasadas, erros, prioridade alta
- **Neutro**: Cinza (#6B7280) - tarefas pendentes, texto secundário
- **Background**: Branco/Cinza claro (#F9FAFB) - fundo da aplicação

### 7.5 Estados Visuais

- **Loading**: Spinner ou skeleton screens durante carregamento
- **Hover**: Efeito de hover em botões e cards clicáveis
- **Active**: Estado ativo em filtros e navegação
- **Disabled**: Botões desabilitados durante submissão de formulários
- **Error**: Mensagens de erro em vermelho abaixo dos campos
- **Success**: Mensagens de sucesso em verde no topo da página

---

## 8. Especificação de API

### 8.1 Endpoints - Autenticação

| Método | Endpoint | Descrição | Autenticação | Request Body | Response |
|--------|----------|-----------|--------------|--------------|----------|
| POST | `/api/auth/register` | Criar nova conta | Não | `{ name, email, password }` | `{ user, token }` |
| POST | `/api/auth/login` | Autenticar usuário | Não | `{ email, password }` | `{ user, token }` |
| GET | `/api/auth/me` | Obter usuário atual | Sim (JWT) | - | `{ user }` |

### 8.2 Endpoints - Projetos

| Método | Endpoint | Descrição | Autenticação | Request Body | Response |
|--------|----------|-----------|--------------|--------------|----------|
| GET | `/api/projects` | Listar projetos do usuário | Sim | - | `{ projects: Project[] }` |
| POST | `/api/projects` | Criar novo projeto | Sim | `{ name, description? }` | `{ project: Project }` |
| GET | `/api/projects/:id` | Obter projeto específico | Sim | - | `{ project: Project }` |
| PUT | `/api/projects/:id` | Atualizar projeto | Sim | `{ name?, description? }` | `{ project: Project }` |
| DELETE | `/api/projects/:id` | Excluir projeto | Sim | - | `{ success: true }` |

### 8.3 Endpoints - Tarefas

| Método | Endpoint | Descrição | Autenticação | Request Body | Response |
|--------|----------|-----------|--------------|--------------|----------|
| GET | `/api/tasks` | Listar tarefas (com filtros) | Sim | Query: `?status=&priority=&projectId=&sort=` | `{ tasks: Task[] }` |
| POST | `/api/tasks` | Criar nova tarefa | Sim | `{ title, description?, priority, dueDate?, projectId? }` | `{ task: Task }` |
| GET | `/api/tasks/:id` | Obter tarefa específica | Sim | - | `{ task: Task }` |
| PUT | `/api/tasks/:id` | Atualizar tarefa | Sim | `{ title?, description?, status?, priority?, dueDate?, projectId? }` | `{ task: Task }` |
| DELETE | `/api/tasks/:id` | Excluir tarefa | Sim | - | `{ success: true }` |
| GET | `/api/tasks/stats` | Obter estatísticas | Sim | - | `{ stats: TaskStats }` |

### 8.4 Códigos de Status HTTP

- `200 OK`: Requisição bem-sucedida
- `201 Created`: Recurso criado com sucesso
- `400 Bad Request`: Dados inválidos (validação falhou)
- `401 Unauthorized`: Token ausente ou inválido
- `403 Forbidden`: Usuário não tem permissão
- `404 Not Found`: Recurso não encontrado
- `500 Internal Server Error`: Erro no servidor

### 8.5 Formato de Erro

```typescript
{
  error: string;        // Código do erro (ex: "VALIDATION_ERROR")
  message: string;      // Mensagem legível
  details?: unknown;    // Detalhes adicionais (opcional)
}
```

Exemplo:
```json
{
  "error": "VALIDATION_ERROR",
  "message": "Email já está em uso",
  "details": {
    "field": "email",
    "value": "user@example.com"
  }
}
```

---

## 9. Modelos de Dados

### 9.1 Interfaces TypeScript

```typescript
// User
interface User {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

// Project
interface Project {
  id: number;
  name: string;
  description: string | null;
  ownerId: number;
  createdAt: Date;
  updatedAt: Date;
  _count?: {
    tasks: number;
  };
}

// Task
interface Task {
  id: number;
  title: string;
  description: string | null;
  status: 'pending' | 'in_progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  dueDate: Date | null;
  projectId: number | null;
  createdById: number;
  assignedToId: number | null;
  createdAt: Date;
  updatedAt: Date;
  project?: Project;
  createdBy?: User;
  assignedTo?: User | null;
}

// Task Statistics
interface TaskStats {
  total: number;
  pending: number;
  inProgress: number;
  completed: number;
  overdue: number;
}

// Auth Response
interface AuthResponse {
  user: User;
  token: string;
}

// API Error Response
interface ErrorResponse {
  error: string;
  message: string;
  details?: unknown;
}
```

### 9.2 Schema do Banco de Dados (Prisma)

```prisma
model User {
  id        Int      @id @default(autoincrement())
  name      String
  email     String   @unique
  password  String   // hasheada com bcrypt
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  projects  Project[] @relation("ProjectOwner")
  tasks     Task[]    @relation("TaskCreator")
  assignedTasks Task[] @relation("TaskAssignee")
}

model Project {
  id          Int      @id @default(autoincrement())
  name        String
  description String?
  ownerId     Int
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  owner       User     @relation("ProjectOwner", fields: [ownerId], references: [id], onDelete: Cascade)
  tasks       Task[]
}

model Task {
  id          Int       @id @default(autoincrement())
  title       String
  description String?
  status      TaskStatus @default(pending)
  priority    TaskPriority @default(medium)
  dueDate     DateTime?
  projectId   Int?
  createdById Int
  assignedToId Int?
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
  
  project     Project?  @relation(fields: [projectId], references: [id], onDelete: SetNull)
  createdBy   User      @relation("TaskCreator", fields: [createdById], references: [id])
  assignedTo  User?     @relation("TaskAssignee", fields: [assignedToId], references: [id], onDelete: SetNull)
}

enum TaskStatus {
  pending
  in_progress
  completed
}

enum TaskPriority {
  low
  medium
  high
}
```

---

## 10. Critérios de Release

### 10.1 Definition of Done

Para considerar uma feature completa, todos os itens abaixo devem estar concluídos:

**Código:**
- [ ] Código implementado seguindo padrões do projeto
- [ ] TypeScript strict mode, zero erros de compilação
- [ ] Zero erros de ESLint
- [ ] Código revisado (code review)
- [ ] Sem código comentado ou não utilizado

**Testes:**
- [ ] Testes unitários escritos para lógica de negócio
- [ ] Testes de integração para endpoints da API
- [ ] Cobertura de testes >80% para código novo
- [ ] Todos os testes passando

**Documentação:**
- [ ] README atualizado se necessário
- [ ] Comentários JSDoc em funções públicas
- [ ] Changelog atualizado

**Funcionalidade:**
- [ ] Feature funciona conforme especificado
- [ ] Critérios de aceite da user story atendidos
- [ ] Validações de entrada implementadas
- [ ] Tratamento de erros implementado
- [ ] Mensagens de erro claras e úteis

**UI/UX:**
- [ ] Interface implementada conforme design
- [ ] Responsivo (pelo menos desktop)
- [ ] Loading states implementados
- [ ] Mensagens de feedback (sucesso/erro) implementadas
- [ ] Acessibilidade básica (labels, contraste)

**Segurança:**
- [ ] Validação de entrada no backend
- [ ] Autenticação/autorização verificada
- [ ] Sem vulnerabilidades conhecidas
- [ ] Secrets em variáveis de ambiente

### 10.2 Checklist de Demonstração

Antes da demo, verificar que todas as funcionalidades core funcionam:

**Autenticação:**
- [ ] Posso registrar um novo usuário
- [ ] Posso fazer login com credenciais válidas
- [ ] Login falha com credenciais inválidas
- [ ] Posso fazer logout
- [ ] Rotas protegidas redirecionam se não autenticado

**Projetos:**
- [ ] Posso criar um novo projeto
- [ ] Projeto aparece na lista após criação
- [ ] Posso editar nome e descrição do projeto
- [ ] Posso excluir projeto (e tarefas são removidas)

**Tarefas:**
- [ ] Posso criar uma nova tarefa com todos os campos
- [ ] Tarefa aparece na lista após criação
- [ ] Posso editar todos os campos da tarefa
- [ ] Posso alterar status da tarefa (pending → in_progress → completed)
- [ ] Posso excluir tarefa (com confirmação)
- [ ] Tarefas atrasadas são destacadas visualmente

**Filtros e Ordenação:**
- [ ] Posso filtrar tarefas por status
- [ ] Posso filtrar tarefas por prioridade
- [ ] Posso filtrar tarefas por projeto
- [ ] Filtros podem ser combinados
- [ ] Posso ordenar tarefas por diferentes critérios

**Dashboard:**
- [ ] Cards de estatísticas mostram números corretos
- [ ] Estatísticas atualizam quando tarefas mudam
- [ ] Card "Atrasadas" destaca tarefas em vermelho
- [ ] Posso adicionar tarefa rapidamente do dashboard
- [ ] Lista de tarefas funciona no dashboard

**Performance:**
- [ ] Página carrega em <3 segundos
- [ ] Ações (criar/editar) respondem em <200ms
- [ ] Sem erros no console do navegador
- [ ] Sem erros no servidor

---

## 11. Comparação: Legado vs Moderno

| Aspecto | Sistema Legado (PHP 5) | Sistema Moderno (TypeScript) |
|---------|------------------------|------------------------------|
| **Segurança** | 25+ vulnerabilidades críticas | 0 vulnerabilidades conhecidas |
| **SQL Injection** | 15+ instâncias (queries concatenadas) | 0 (Prisma ORM com prepared statements) |
| **Autenticação** | MD5 + salt hardcoded | bcrypt (cost 10+) |
| **Type Safety** | Nenhuma (PHP sem type hints) | 100% TypeScript strict mode |
| **Testes** | 0% cobertura | >80% cobertura (unit + integration) |
| **Estrutura de Código** | Procedural, globals, acoplado | Arquitetura em camadas, desacoplado |
| **Validação** | Inconsistente, `db_escape()` insuficiente | Zod schemas em todas as camadas |
| **Tratamento de Erros** | `die()`, sem exception handling | Middleware centralizado, logging estruturado |
| **ORM** | Nenhum (queries SQL manuais) | Prisma (type-safe, migrations) |
| **API** | Não existe (páginas PHP diretas) | API RESTful completa |
| **Frontend** | Bootstrap 3.3.7 + jQuery 1.12.4 | React 18 + Tailwind CSS |
| **Build System** | Nenhum | Webpack/Vite, hot reload |
| **CI/CD** | Não suportado | Pipeline automatizado |
| **Documentação** | Comentários esparsos | README, JSDoc, tipos TypeScript |
| **Manutenibilidade** | Muito baixa (código spaghetti) | Alta (código limpo, testável) |
| **Escalabilidade** | Não escalável | Preparado para escalar |
| **Developer Experience** | Ruim (sem autocomplete, sem tipos) | Excelente (IDE support completo) |
| **Linhas de Código** | ~3.600 (não tipado) | ~2.000 estimado (tipado) |
| **Dependências** | Manuais, sem gerenciador | npm/yarn, package.json |
| **Suporte** | PHP 5 EOL desde 2018 | Node.js 20 LTS (suporte até 2026+) |

---

## 12. Priorização de Implementação

### Sprint 1 (P0 - Obrigatório - MVP Core)

**Objetivo**: Ter uma aplicação funcional com autenticação e CRUD básico de tarefas.

1. **Setup do Projeto**
   - [ ] Inicializar projeto Node.js + TypeScript
   - [ ] Configurar Prisma com PostgreSQL
   - [ ] Criar schema do banco (User, Project, Task)
   - [ ] Configurar ESLint + Prettier
   - [ ] Setup de estrutura de pastas (routes, services, validators)

2. **Autenticação (Backend)**
   - [ ] Endpoint POST `/api/auth/register`
   - [ ] Endpoint POST `/api/auth/login`
   - [ ] Endpoint GET `/api/auth/me`
   - [ ] Middleware de autenticação JWT
   - [ ] Validação com Zod

3. **Autenticação (Frontend)**
   - [ ] Página de Login
   - [ ] Página de Registro
   - [ ] Context de autenticação (AuthProvider)
   - [ ] Proteção de rotas (ProtectedRoute)

4. **Tarefas (Backend)**
   - [ ] Endpoint GET `/api/tasks` (listar)
   - [ ] Endpoint POST `/api/tasks` (criar)
   - [ ] Endpoint PUT `/api/tasks/:id` (editar)
   - [ ] Endpoint DELETE `/api/tasks/:id` (excluir)
   - [ ] Validação com Zod

5. **Dashboard (Frontend)**
   - [ ] Layout básico (Header, Sidebar)
   - [ ] Lista de tarefas
   - [ ] Formulário de criar tarefa
   - [ ] Modal de editar tarefa
   - [ ] Funcionalidade de excluir tarefa

**Duração Estimada**: 2-3 semanas

### Sprint 2 (P1 - Importante - Features Completas)

**Objetivo**: Completar funcionalidades essenciais e melhorar UX.

1. **Projetos (Backend + Frontend)**
   - [ ] CRUD completo de projetos
   - [ ] Associação de tarefas a projetos
   - [ ] Filtro de tarefas por projeto

2. **Dashboard Estatísticas**
   - [ ] Endpoint GET `/api/tasks/stats`
   - [ ] Cards de estatísticas no dashboard
   - [ ] Destaque de tarefas atrasadas

3. **Filtros e Ordenação**
   - [ ] Filtro por status
   - [ ] Filtro por prioridade
   - [ ] Ordenação por diferentes critérios
   - [ ] UI de filtros no dashboard

4. **Melhorias de UX**
   - [ ] Loading states
   - [ ] Mensagens de sucesso/erro
   - [ ] Validação em tempo real
   - [ ] Confirmação antes de excluir

**Duração Estimada**: 2 semanas

### Sprint 3 (P2 - Desejável - Polimento)

**Objetivo**: Melhorias finais, testes e documentação.

1. **Testes**
   - [ ] Testes unitários para services
   - [ ] Testes de integração para rotas
   - [ ] Cobertura >80%

2. **Documentação**
   - [ ] README completo
   - [ ] Comentários JSDoc
   - [ ] Guia de setup

3. **CI/CD**
   - [ ] Pipeline GitHub Actions
   - [ ] Lint → Test → Build → Deploy

4. **Melhorias Finais**
   - [ ] Otimizações de performance
   - [ ] Ajustes de UI/UX
   - [ ] Tratamento de edge cases

**Duração Estimada**: 1-2 semanas

**Total Estimado**: 5-7 semanas (com equipe de 2-3 desenvolvedores)

---

## Anexos

### A. Referências

- Relatório de Auditoria Técnica: `bmad-docs/phase1-analysis/03-auditoria-completa.md`
- Stack Recomendada: Node.js 20 LTS, TypeScript, React 18, PostgreSQL 15+, Prisma

### B. Glossário

- **MVP**: Minimum Viable Product (Produto Mínimo Viável)
- **JWT**: JSON Web Token (token de autenticação)
- **ORM**: Object-Relational Mapping (mapeamento objeto-relacional)
- **CRUD**: Create, Read, Update, Delete (operações básicas)
- **EOL**: End of Life (fim do suporte)
- **OWASP**: Open Web Application Security Project

---

*Documento preparado por: BMAD Product Manager Agent*  
*Aprovado por: Product Owner*  
*Próximo passo: Handoff para Agente Arquiteto (Fase 3)*
