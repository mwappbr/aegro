# 6. Histórias de Usuário

## Epic 1: Autenticação

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

## Epic 2: Gestão de Projetos

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

## Epic 3: Gestão de Tarefas

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

## Epic 4: Dashboard

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
