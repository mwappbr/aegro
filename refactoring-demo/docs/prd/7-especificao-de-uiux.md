# 7. Especificação de UI/UX

## 7.1 Princípios de Design

1. **Simplicidade**: Interface limpa e desobstruída, focando no essencial. Remover elementos desnecessários.
2. **Consistência**: Padrões visuais consistentes (cores, tipografia, espaçamento, componentes) em toda a aplicação.
3. **Feedback**: Feedback visual imediato em todas as ações do usuário (loading states, mensagens de sucesso/erro, confirmações).
4. **Responsividade**: Layout adaptável para diferentes tamanhos de tela (foco inicial em desktop, responsividade básica para tablet).
5. **Acessibilidade**: Contraste adequado, navegação por teclado, labels descritivos, ARIA attributes onde necessário.
6. **Familiaridade**: Layout similar ao sistema legado para facilitar transição dos usuários existentes.

## 7.2 Telas Principais

| Tela | Componentes Principais | Prioridade |
|------|------------------------|------------|
| **Login** | Email input, Password input, Submit button, Link para registro, Mensagens de erro | P0 |
| **Registro** | Nome input, Email input, Password input, Confirm password input, Submit button, Link para login, Validação em tempo real | P0 |
| **Dashboard** | Header (user info, logout), Stats cards (5 cards), Task form (quick add), Filter bar, Task list, Edit modal | P0 |
| **Lista de Tarefas** | Filter bar, Sort dropdown, Task list (cards ou tabela), Empty state, Pagination (se >20 itens) | P0 |
| **Modal de Edição** | Form com todos os campos de tarefa, Save button, Cancel button, Loading state, Validação | P0 |
| **Sidebar de Projetos** | Lista de projetos, Botão "Novo Projeto", Projeto selecionado destacado | P1 |

## 7.3 Hierarquia de Componentes

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

## 7.4 Sistema de Cores

- **Primária**: Azul (#3B82F6) - ações principais, links
- **Sucesso**: Verde (#10B981) - tarefas concluídas, mensagens de sucesso
- **Aviso**: Amarelo (#F59E0B) - tarefas em progresso, avisos
- **Erro**: Vermelho (#EF4444) - tarefas atrasadas, erros, prioridade alta
- **Neutro**: Cinza (#6B7280) - tarefas pendentes, texto secundário
- **Background**: Branco/Cinza claro (#F9FAFB) - fundo da aplicação

## 7.5 Estados Visuais

- **Loading**: Spinner ou skeleton screens durante carregamento
- **Hover**: Efeito de hover em botões e cards clicáveis
- **Active**: Estado ativo em filtros e navegação
- **Disabled**: Botões desabilitados durante submissão de formulários
- **Error**: Mensagens de erro em vermelho abaixo dos campos
- **Success**: Mensagens de sucesso em verde no topo da página

---
