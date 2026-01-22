# 8. Especificação de API

## 8.1 Endpoints - Autenticação

| Método | Endpoint | Descrição | Autenticação | Request Body | Response |
|--------|----------|-----------|--------------|--------------|----------|
| POST | `/api/auth/register` | Criar nova conta | Não | `{ name, email, password }` | `{ user, token }` |
| POST | `/api/auth/login` | Autenticar usuário | Não | `{ email, password }` | `{ user, token }` |
| GET | `/api/auth/me` | Obter usuário atual | Sim (JWT) | - | `{ user }` |

## 8.2 Endpoints - Projetos

| Método | Endpoint | Descrição | Autenticação | Request Body | Response |
|--------|----------|-----------|--------------|--------------|----------|
| GET | `/api/projects` | Listar projetos do usuário | Sim | - | `{ projects: Project[] }` |
| POST | `/api/projects` | Criar novo projeto | Sim | `{ name, description? }` | `{ project: Project }` |
| GET | `/api/projects/:id` | Obter projeto específico | Sim | - | `{ project: Project }` |
| PUT | `/api/projects/:id` | Atualizar projeto | Sim | `{ name?, description? }` | `{ project: Project }` |
| DELETE | `/api/projects/:id` | Excluir projeto | Sim | - | `{ success: true }` |

## 8.3 Endpoints - Tarefas

| Método | Endpoint | Descrição | Autenticação | Request Body | Response |
|--------|----------|-----------|--------------|--------------|----------|
| GET | `/api/tasks` | Listar tarefas (com filtros) | Sim | Query: `?status=&priority=&projectId=&sort=` | `{ tasks: Task[] }` |
| POST | `/api/tasks` | Criar nova tarefa | Sim | `{ title, description?, priority, dueDate?, projectId? }` | `{ task: Task }` |
| GET | `/api/tasks/:id` | Obter tarefa específica | Sim | - | `{ task: Task }` |
| PUT | `/api/tasks/:id` | Atualizar tarefa | Sim | `{ title?, description?, status?, priority?, dueDate?, projectId? }` | `{ task: Task }` |
| DELETE | `/api/tasks/:id` | Excluir tarefa | Sim | - | `{ success: true }` |
| GET | `/api/tasks/stats` | Obter estatísticas | Sim | - | `{ stats: TaskStats }` |

## 8.4 Códigos de Status HTTP

- `200 OK`: Requisição bem-sucedida
- `201 Created`: Recurso criado com sucesso
- `400 Bad Request`: Dados inválidos (validação falhou)
- `401 Unauthorized`: Token ausente ou inválido
- `403 Forbidden`: Usuário não tem permissão
- `404 Not Found`: Recurso não encontrado
- `500 Internal Server Error`: Erro no servidor

## 8.5 Formato de Erro

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
