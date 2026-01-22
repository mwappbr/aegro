# 4. Requisitos Funcionais

## 4.1 Autenticação (FR-AUTH)

| ID | Requisito | Prioridade | Critério de Aceite |
|----|-----------|------------|-------------------|
| FR-AUTH-01 | Registro de usuário | P0 | Usuário pode criar conta com nome, email (único), senha (mínimo 8 caracteres) e confirmação de senha. Email validado, senha hasheada com bcrypt antes de salvar. |
| FR-AUTH-02 | Login de usuário | P0 | Usuário pode fazer login com email e senha. Sistema valida credenciais, gera JWT token e retorna para cliente. Token armazenado em localStorage. |
| FR-AUTH-03 | Logout | P0 | Usuário pode fazer logout. Token removido do localStorage, redirecionamento para página de login. |
| FR-AUTH-04 | Persistência de sessão | P1 | Token JWT persiste entre refreshs de página. Middleware valida token em todas as requisições protegidas. |
| FR-AUTH-05 | Segurança de senha | P0 | Senhas hasheadas com bcrypt (cost factor 10+). Nunca armazenadas em texto plano. Validação de força mínima (8 caracteres). |
| FR-AUTH-06 | Rotas protegidas | P0 | Rotas que requerem autenticação verificam token JWT. Usuários não autenticados são redirecionados para login. |
| FR-AUTH-07 | Obter usuário atual | P1 | Endpoint `/api/auth/me` retorna dados do usuário autenticado baseado no token JWT. |

## 4.2 Gestão de Projetos (FR-PROJ)

| ID | Requisito | Prioridade | Critério de Aceite |
|----|-----------|------------|-------------------|
| FR-PROJ-01 | Criar projeto | P0 | Usuário pode criar projeto com nome (obrigatório) e descrição (opcional). Projeto é associado ao usuário como owner. |
| FR-PROJ-02 | Listar projetos | P0 | Usuário vê lista de todos os projetos que possui. Lista ordenada por data de criação (mais recente primeiro). |
| FR-PROJ-03 | Visualizar projeto | P1 | Usuário pode visualizar detalhes de um projeto (nome, descrição, data de criação, contagem de tarefas). |
| FR-PROJ-04 | Editar projeto | P1 | Usuário pode editar nome e descrição de projetos que possui. Validação de nome obrigatório. |
| FR-PROJ-05 | Excluir projeto | P1 | Usuário pode excluir projetos que possui. Exclusão em cascade remove todas as tarefas associadas. Confirmação antes de excluir. |
| FR-PROJ-06 | Filtrar tarefas por projeto | P1 | Na lista de tarefas, usuário pode filtrar para ver apenas tarefas de um projeto específico. |

## 4.3 Gestão de Tarefas (FR-TASK)

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

## 4.4 Dashboard (FR-DASH)

| ID | Requisito | Prioridade | Critério de Aceite |
|----|-----------|------------|-------------------|
| FR-DASH-01 | Estatísticas de tarefas | P0 | Dashboard exibe cards com contadores: Total de tarefas, Pendentes, Em progresso, Concluídas, Atrasadas. Números atualizados em tempo real. |
| FR-DASH-02 | Lista de tarefas no dashboard | P0 | Dashboard mostra lista de tarefas (mesma funcionalidade da página de tarefas) com opção de filtros rápidos. |
| FR-DASH-03 | Formulário rápido de adicionar tarefa | P1 | Dashboard tem formulário compacto para adicionar tarefa rapidamente (campos essenciais: título, prioridade, projeto). |
| FR-DASH-04 | Visualização de tarefas atrasadas | P1 | Seção destacada no dashboard mostrando apenas tarefas atrasadas com contador e lista. |
| FR-DASH-05 | Atualização em tempo real | P2 | Quando tarefa é criada/editada em outra aba, dashboard atualiza automaticamente (ou ao fazer refresh manual). |

---
