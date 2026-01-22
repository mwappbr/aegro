# 4. Design da API

## 4.1 Endpoints RESTful

### Autenticação

**POST /api/auth/register**
- **Descrição**: Criar nova conta de usuário
- **Autenticação**: Não requerida
- **Request Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```
- **Response 201**:
```json
{
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2026-01-15T10:00:00Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```
- **Erros**:
  - `400 Bad Request`: Dados inválidos (validação Zod falhou)
  - `409 Conflict`: Email já está em uso

**POST /api/auth/login**
- **Descrição**: Autenticar usuário existente
- **Autenticação**: Não requerida
- **Request Body**:
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```
- **Response 200**:
```json
{
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```
- **Erros**:
  - `400 Bad Request`: Dados inválidos
  - `401 Unauthorized`: Credenciais inválidas

**GET /api/auth/me**
- **Descrição**: Obter dados do usuário autenticado
- **Autenticação**: Requerida (JWT token)
- **Request Headers**: `Authorization: Bearer <token>`
- **Response 200**:
```json
{
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2026-01-15T10:00:00Z"
  }
}
```
- **Erros**:
  - `401 Unauthorized`: Token ausente ou inválido

### Projetos

**GET /api/projects**
- **Descrição**: Listar todos os projetos do usuário autenticado
- **Autenticação**: Requerida
- **Response 200**:
```json
{
  "projects": [
    {
      "id": 1,
      "name": "Website Redesign",
      "description": "Complete overhaul...",
      "ownerId": 1,
      "createdAt": "2026-01-15T10:00:00Z",
      "updatedAt": "2026-01-15T10:00:00Z",
      "_count": {
        "tasks": 5
      }
    }
  ]
}
```

**POST /api/projects**
- **Descrição**: Criar novo projeto
- **Autenticação**: Requerida
- **Request Body**:
```json
{
  "name": "New Project",
  "description": "Project description (optional)"
}
```
- **Response 201**:
```json
{
  "project": {
    "id": 1,
    "name": "New Project",
    "description": "Project description",
    "ownerId": 1,
    "createdAt": "2026-01-15T10:00:00Z",
    "updatedAt": "2026-01-15T10:00:00Z"
  }
}
```

**GET /api/projects/:id**
- **Descrição**: Obter projeto específico
- **Autenticação**: Requerida
- **Response 200**: Mesmo formato de POST
- **Erros**: `404 Not Found` se projeto não existe ou não pertence ao usuário

**PUT /api/projects/:id**
- **Descrição**: Atualizar projeto
- **Autenticação**: Requerida
- **Request Body**:
```json
{
  "name": "Updated Name",
  "description": "Updated description"
}
```
- **Response 200**: Projeto atualizado
- **Erros**: `404 Not Found` se não existe ou não pertence ao usuário

**DELETE /api/projects/:id**
- **Descrição**: Excluir projeto (cascade remove tarefas)
- **Autenticação**: Requerida
- **Response 200**:
```json
{
  "success": true
}
```
- **Erros**: `404 Not Found` se não existe ou não pertence ao usuário

### Tarefas

**GET /api/tasks**
- **Descrição**: Listar tarefas com filtros e ordenação
- **Autenticação**: Requerida
- **Query Parameters**:
  - `status`: `pending` | `in_progress` | `completed` | (vazio = todos)
  - `priority`: `low` | `medium` | `high` | (vazio = todos)
  - `projectId`: `number` | (vazio = todos)
  - `search`: `string` (busca em título e descrição)
  - `sort`: `createdAt` | `dueDate` | `priority` | `title` (default: `createdAt`)
  - `order`: `asc` | `desc` (default: `desc`)
- **Response 200**:
```json
{
  "tasks": [
    {
      "id": 1,
      "title": "Design homepage",
      "description": "Create modern design",
      "status": "completed",
      "priority": "high",
      "dueDate": "2026-01-20T00:00:00Z",
      "projectId": 1,
      "createdById": 1,
      "assignedToId": 1,
      "createdAt": "2026-01-15T10:00:00Z",
      "updatedAt": "2026-01-18T10:00:00Z",
      "project": {
        "id": 1,
        "name": "Website Redesign"
      }
    }
  ]
}
```

**GET /api/tasks/stats**
- **Descrição**: Obter estatísticas de tarefas do usuário
- **Autenticação**: Requerida
- **Response 200**:
```json
{
  "stats": {
    "total": 15,
    "pending": 5,
    "inProgress": 3,
    "completed": 6,
    "overdue": 1
  }
}
```

**POST /api/tasks**
- **Descrição**: Criar nova tarefa
- **Autenticação**: Requerida
- **Request Body**:
```json
{
  "title": "New Task",
  "description": "Task description (optional)",
  "priority": "medium",
  "dueDate": "2026-01-25T00:00:00Z",
  "projectId": 1
}
```
- **Response 201**: Tarefa criada

**GET /api/tasks/:id**
- **Descrição**: Obter tarefa específica
- **Autenticação**: Requerida
- **Response 200**: Tarefa completa com relações

**PUT /api/tasks/:id**
- **Descrição**: Atualizar tarefa
- **Autenticação**: Requerida
- **Request Body**:
```json
{
  "title": "Updated Title",
  "status": "in_progress",
  "priority": "high",
  "dueDate": "2026-01-30T00:00:00Z"
}
```
- **Response 200**: Tarefa atualizada

**DELETE /api/tasks/:id**
- **Descrição**: Excluir tarefa
- **Autenticação**: Requerida
- **Response 200**:
```json
{
  "success": true
}
```

## 4.2 Formato de Resposta de Erro

```typescript
interface ErrorResponse {
  error: string;        // Código do erro (ex: "VALIDATION_ERROR", "UNAUTHORIZED")
  message: string;      // Mensagem legível para o usuário
  details?: unknown;    // Detalhes adicionais (opcional)
}
```

**Exemplos de Respostas de Erro:**

```json
// 400 Bad Request - Validação falhou
{
  "error": "VALIDATION_ERROR",
  "message": "Dados inválidos",
  "details": {
    "field": "email",
    "issue": "Email deve ser um endereço válido"
  }
}

// 401 Unauthorized - Token inválido
{
  "error": "UNAUTHORIZED",
  "message": "Token de autenticação inválido ou expirado"
}

// 404 Not Found - Recurso não encontrado
{
  "error": "NOT_FOUND",
  "message": "Tarefa não encontrada"
}

// 409 Conflict - Conflito (ex: email duplicado)
{
  "error": "CONFLICT",
  "message": "Email já está em uso"
}

// 500 Internal Server Error
{
  "error": "INTERNAL_ERROR",
  "message": "Erro interno do servidor"
}
```

---
