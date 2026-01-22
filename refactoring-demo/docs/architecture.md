# Technical Architecture Document
## TaskMaster Pro - Modernização Completa

**Agente**: Architect (Winston)  
**Versão**: 1.0  
**Data**: Janeiro 2026  
**Status**: Aprovado para Desenvolvimento  
**Baseado em**: 
- Relatório de Auditoria Técnica (`03-auditoria-completa.md`)
- Product Requirements Document (`01-prd.md`)

---

## 1. Visão Geral da Arquitetura

### 1.1 Diagrama de Alto Nível

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT TIER                              │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                 React 18 + TypeScript                    │    │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────────────────┐     │    │
│  │  │  Login   │ │ Register │ │      Dashboard        │     │    │
│  │  │   Page   │ │   Page   │ │  (Tasks, Projects,    │     │    │
│  │  │          │ │          │ │   Stats, Filters)     │     │    │
│  │  └──────────┘ └──────────┘ └──────────────────────┘     │    │
│  │                      │                                   │    │
│  │              ┌───────┴───────┐                          │    │
│  │              │  Auth Context │                          │    │
│  │              │  (JWT Token)  │                          │    │
│  │              └───────────────┘                          │    │
│  │                      │                                   │    │
│  │              ┌───────┴───────┐                          │    │
│  │              │  API Client   │                          │    │
│  │              │  (Fetch API)  │                          │    │
│  │              └───────────────┘                          │    │
│  └─────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ HTTP/REST (JSON)
                              │ Authorization: Bearer <JWT>
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                         SERVER TIER                              │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │         Node.js 20 LTS + Express.js + TypeScript         │    │
│  │  ┌──────────────────────────────────────────────────┐   │    │
│  │  │                  Middleware                       │   │    │
│  │  │  [CORS] [JSON] [Auth Guard] [Error Handler]      │   │    │
│  │  └──────────────────────────────────────────────────┘   │    │
│  │                         │                                │    │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐   │    │
│  │  │  Auth    │ │  Task    │ │ Project  │ │  Stats   │   │    │
│  │  │  Routes  │ │  Routes  │ │  Routes  │ │  Routes  │   │    │
│  │  └────┬─────┘ └────┬─────┘ └────┬─────┘ └────┬─────┘   │    │
│  │       │            │            │            │          │    │
│  │  ┌────▼─────┐ ┌────▼─────┐ ┌────▼─────┐ ┌────▼─────┐   │    │
│  │  │  Auth    │ │  Task    │ │ Project  │ │  Stats   │   │    │
│  │  │ Service  │ │ Service  │ │ Service  │ │ Service  │   │    │
│  │  └────┬─────┘ └────┬─────┘ └────┬─────┘ └────┬─────┘   │    │
│  │       │            │            │            │          │    │
│  │  ┌────▼─────┐ ┌────▼─────┐ ┌────▼─────┐ ┌────▼─────┐   │    │
│  │  │  Zod     │ │  Zod     │ │  Zod     │ │  Zod     │   │    │
│  │  │Validator │ │Validator │ │Validator │ │Validator │   │    │
│  │  └────┬─────┘ └────┬─────┘ └────┬─────┘ └────┬─────┘   │    │
│  │       └────────────┼────────────┼────────────┘          │    │
│  │                    ▼            ▼                       │    │
│  │              ┌──────────────────────┐                   │    │
│  │              │     Prisma ORM       │                   │    │
│  │              │  (Type-safe queries) │                   │    │
│  │              │  (Prepared stmts)   │                   │    │
│  │              └──────────────────────┘                   │    │
│  └─────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                         DATA TIER                                │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                    SQLite Database                       │    │
│  │                  (Dev) / PostgreSQL (Prod)              │    │
│  │                                                          │    │
│  │  ┌──────────────┐        ┌──────────────┐               │    │
│  │  │    users     │        │   projects   │               │    │
│  │  ├──────────────┤        ├──────────────┤               │    │
│  │  │ id (PK)      │◄───────│ ownerId (FK) │               │    │
│  │  │ name         │        │ id (PK)      │               │    │
│  │  │ email (UNIQ) │        │ name         │               │    │
│  │  │ password     │        │ description  │               │    │
│  │  │ createdAt    │        │ createdAt    │               │    │
│  │  │ updatedAt    │        │ updatedAt    │               │    │
│  │  └──────────────┘        └───────┬──────┘               │    │
│  │         │                        │                       │    │
│  │         │                        │                       │    │
│  │         ▼                        ▼                       │    │
│  │  ┌─────────────────────────────────────────┐            │    │
│  │  │                 tasks                    │            │    │
│  │  ├─────────────────────────────────────────┤            │    │
│  │  │ id (PK)        │ title       │ status   │            │    │
│  │  │ priority       │ dueDate     │ projectId│            │    │
│  │  │ createdById    │ assignedToId│ createdAt│            │    │
│  │  │ updatedAt      │ description │          │            │    │
│  │  └─────────────────────────────────────────┘            │    │
│  └─────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘
```

**Fluxo de Comunicação:**
1. Cliente faz requisição HTTP para servidor Express
2. Middleware de autenticação valida JWT token
3. Rota específica recebe requisição
4. Validator Zod valida dados de entrada
5. Service executa lógica de negócio
6. Prisma ORM executa query type-safe no banco
7. Resposta JSON retornada ao cliente

### 1.2 Stack Tecnológica

| Camada | Tecnologia | Versão | Justificativa |
|--------|------------|--------|---------------|
| **Frontend - Framework** | React | 18.x | Componentes reutilizáveis, ecosystem maduro, suporte TypeScript nativo |
| **Frontend - Linguagem** | TypeScript | 5.x | Type safety, melhor DX, menos bugs em runtime, autocomplete inteligente |
| **Frontend - Estilização** | Tailwind CSS | 3.x | Utility-first, desenvolvimento rápido, consistência visual, sem CSS customizado complexo |
| **Frontend - Estado Global** | React Context API | Built-in | Simples, suficiente para escopo (auth), sem dependências externas |
| **Frontend - HTTP Client** | Fetch API | Native | Nativo do browser, sem dependências, suporte moderno |
| **Backend - Runtime** | Node.js | 20 LTS | Suporte de longo prazo até 2026+, performance excelente, ecosystem rico |
| **Backend - Framework** | Express.js | 4.x | Leve, flexível, amplamente usado, middleware ecosystem |
| **Backend - Linguagem** | TypeScript | 5.x | Type safety end-to-end, mesmo código do frontend, menos erros |
| **Banco de Dados - ORM** | Prisma | 5.x | Type-safe queries, elimina SQL Injection, migrations automáticas, excelente DX |
| **Banco de Dados - Dev** | SQLite | 3.x | Simples para desenvolvimento, sem setup complexo, arquivo único |
| **Banco de Dados - Prod** | PostgreSQL | 15+ | Robusto, features avançadas, suporte completo do Prisma |
| **Autenticação - Método** | JWT (JSON Web Token) | - | Stateless, escalável, não requer sessões no servidor |
| **Autenticação - Biblioteca** | jsonwebtoken | 9.x | Padrão da indústria, bem mantida, suporte TypeScript |
| **Autenticação - Hash** | bcrypt | 5.x | Algoritmo seguro, cost configurável, padrão da indústria |
| **Validação - Biblioteca** | Zod | 3.x | Schema-based validation, type inference automático, integração perfeita com TypeScript |
| **Validação - Integração** | express-validator | - | Middleware para Express, integração com Zod |

### 1.3 Comparação Legado vs Moderno

| Aspecto | Legado PHP | Moderno TypeScript | Benefício |
|---------|------------|-------------------|-----------|
| **Segurança - SQL Injection** | 15+ vulnerabilidades (queries concatenadas) | 0 (Prisma usa prepared statements) | Eliminação completa de SQL Injection |
| **Segurança - Autenticação** | MD5 + salt hardcoded | bcrypt (cost 10+) | Senhas criptograficamente seguras |
| **Segurança - Validação** | `db_escape()` inconsistente | Zod schemas em todas as camadas | Validação consistente e type-safe |
| **Type Safety** | Nenhuma (PHP sem type hints) | 100% TypeScript strict mode | Erros detectados em compile-time |
| **Testes** | 0% cobertura | >80% cobertura (unit + integration) | Confiança em mudanças, regressões detectadas |
| **Estrutura de Código** | Procedural, globals, acoplado | Arquitetura em camadas (Routes → Validators → Services → Prisma) | Separação de responsabilidades, testável |
| **ORM** | Nenhum (queries SQL manuais) | Prisma (type-safe, migrations) | Queries type-safe, migrations versionadas |
| **API** | Não existe (páginas PHP diretas) | API RESTful completa | Frontend/backend separados, possível mobile app |
| **Frontend** | Bootstrap 3.3.7 + jQuery 1.12.4 | React 18 + Tailwind CSS | Componentes reutilizáveis, UI moderna |
| **Build System** | Nenhum | Vite/Webpack, hot reload | Desenvolvimento rápido, otimizações automáticas |
| **Tratamento de Erros** | `die()`, sem exception handling | Middleware centralizado, logging estruturado | Erros tratados consistentemente |
| **CI/CD** | Não suportado | Pipeline automatizado (GitHub Actions) | Deploy automatizado, testes antes de produção |
| **Documentação** | Comentários esparsos | README, JSDoc, tipos TypeScript | Documentação gerada automaticamente |
| **Manutenibilidade** | Muito baixa (código spaghetti) | Alta (código limpo, testável, tipado) | Fácil adicionar features, menos bugs |
| **Escalabilidade** | Não escalável | Preparado para escalar (stateless, API-first) | Suporta crescimento de usuários/dados |
| **Developer Experience** | Ruim (sem autocomplete, sem tipos) | Excelente (IDE support completo, type inference) | Produtividade muito maior |

---

## 2. Estrutura do Projeto

### 2.1 Estrutura de Diretórios

```
refactoring-demo/
├── client/                          # Frontend React Application
│   ├── public/                      # Arquivos estáticos
│   │   ├── index.html
│   │   └── favicon.ico
│   ├── src/
│   │   ├── api/                     # Cliente API e configuração
│   │   │   ├── client.ts            # Configuração do cliente HTTP
│   │   │   ├── auth.ts              # Endpoints de autenticação
│   │   │   ├── projects.ts          # Endpoints de projetos
│   │   │   └── tasks.ts              # Endpoints de tarefas
│   │   ├── components/              # Componentes React reutilizáveis
│   │   │   ├── Button/
│   │   │   │   ├── Button.tsx
│   │   │   │   └── Button.css
│   │   │   ├── Input/
│   │   │   │   ├── Input.tsx
│   │   │   │   └── Input.css
│   │   │   ├── Modal/
│   │   │   │   ├── Modal.tsx
│   │   │   │   └── Modal.css
│   │   │   └── TaskCard/
│   │   │       ├── TaskCard.tsx
│   │   │       └── TaskCard.css
│   │   ├── context/                 # React Context providers
│   │   │   └── AuthContext.tsx      # Context de autenticação
│   │   ├── pages/                   # Páginas da aplicação
│   │   │   ├── LoginPage.tsx
│   │   │   ├── RegisterPage.tsx
│   │   │   ├── DashboardPage.tsx
│   │   │   └── TasksPage.tsx
│   │   ├── types/                   # TypeScript type definitions
│   │   │   ├── user.ts
│   │   │   ├── project.ts
│   │   │   ├── task.ts
│   │   │   └── api.ts
│   │   ├── utils/                   # Funções utilitárias
│   │   │   ├── storage.ts           # localStorage helpers
│   │   │   └── format.ts            # Formatação de datas, etc.
│   │   ├── App.tsx                  # Componente raiz
│   │   ├── index.tsx                # Entry point
│   │   └── index.css                # Estilos globais
│   ├── package.json
│   ├── tsconfig.json                # Configuração TypeScript
│   ├── vite.config.ts               # Configuração Vite
│   └── tailwind.config.js           # Configuração Tailwind
│
├── server/                          # Backend Node.js Application
│   ├── prisma/
│   │   ├── schema.prisma           # Schema do banco de dados
│   │   ├── migrations/             # Migrations do Prisma
│   │   └── seed.ts                 # Script de seed de dados
│   ├── src/
│   │   ├── middleware/              # Express middleware
│   │   │   ├── auth.ts              # Middleware de autenticação JWT
│   │   │   ├── errorHandler.ts     # Tratamento centralizado de erros
│   │   │   ├── cors.ts             # Configuração CORS
│   │   │   └── logger.ts            # Logging middleware
│   │   ├── routes/                  # Rotas da API
│   │   │   ├── auth.routes.ts       # Rotas de autenticação
│   │   │   ├── projects.routes.ts   # Rotas de projetos
│   │   │   ├── tasks.routes.ts      # Rotas de tarefas
│   │   │   └── index.ts             # Agregador de rotas
│   │   ├── services/                # Lógica de negócio
│   │   │   ├── auth.service.ts      # Serviço de autenticação
│   │   │   ├── project.service.ts  # Serviço de projetos
│   │   │   ├── task.service.ts      # Serviço de tarefas
│   │   │   └── stats.service.ts     # Serviço de estatísticas
│   │   ├── validators/               # Schemas de validação Zod
│   │   │   ├── auth.validator.ts    # Validação de auth
│   │   │   ├── project.validator.ts # Validação de projetos
│   │   │   └── task.validator.ts    # Validação de tarefas
│   │   ├── types/                   # TypeScript type definitions
│   │   │   ├── user.ts
│   │   │   ├── project.ts
│   │   │   ├── task.ts
│   │   │   └── api.ts
│   │   ├── utils/                   # Funções utilitárias
│   │   │   ├── jwt.ts               # Helpers de JWT
│   │   │   ├── bcrypt.ts            # Helpers de bcrypt
│   │   │   └── errors.ts            # Classes de erro customizadas
│   │   ├── app.ts                   # Configuração Express
│   │   └── server.ts                # Entry point do servidor
│   ├── .env.example                  # Exemplo de variáveis de ambiente
│   ├── .env                          # Variáveis de ambiente (não commitado)
│   ├── package.json
│   └── tsconfig.json                 # Configuração TypeScript
│
├── .github/
│   └── workflows/
│       └── ci.yml                   # Pipeline CI/CD
│
├── README.md                         # Documentação principal
└── package.json                      # Root package.json (workspace)
```

**Comentários Explicativos:**

- **client/src/api/**: Cliente HTTP centralizado com funções type-safe para cada recurso
- **client/src/components/**: Componentes React reutilizáveis seguindo padrão de pasta por componente
- **client/src/context/**: Context API para estado global (autenticação)
- **client/src/pages/**: Páginas principais da aplicação
- **client/src/types/**: Definições TypeScript compartilhadas
- **server/src/middleware/**: Middleware Express (auth, error handling, CORS)
- **server/src/routes/**: Rotas organizadas por recurso
- **server/src/services/**: Lógica de negócio isolada (testável)
- **server/src/validators/**: Schemas Zod para validação de entrada
- **server/prisma/**: Schema e migrations do Prisma

---

## 3. Design do Banco de Dados

### 3.1 Schema Prisma

```prisma
// datasource.db - Configuração do banco de dados
datasource db {
  provider = "sqlite"  // SQLite para desenvolvimento
  url      = env("DATABASE_URL")
}

// generator.client - Geração do Prisma Client
generator client {
  provider = "prisma-client-js"
}

// ============================================================================
// MODEL: User
// ============================================================================
model User {
  id        Int      @id @default(autoincrement())
  name      String
  email     String   @unique
  password  String   // Hasheada com bcrypt (60+ caracteres)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  // Relações
  projects       Project[] @relation("ProjectOwner")
  createdTasks   Task[]    @relation("TaskCreator")
  assignedTasks  Task[]    @relation("TaskAssignee")
  
  // Índices para performance
  @@index([email])
  @@map("users")
}

// ============================================================================
// MODEL: Project
// ============================================================================
model Project {
  id          Int      @id @default(autoincrement())
  name        String
  description String?
  ownerId     Int
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  // Relações
  owner User   @relation("ProjectOwner", fields: [ownerId], references: [id], onDelete: Cascade)
  tasks Task[]
  
  // Índices para performance
  @@index([ownerId])
  @@map("projects")
}

// ============================================================================
// MODEL: Task
// ============================================================================
model Task {
  id          Int          @id @default(autoincrement())
  title       String
  description String?
  status      TaskStatus   @default(pending)
  priority    TaskPriority @default(medium)
  dueDate     DateTime?
  projectId   Int?
  createdById Int
  assignedToId Int?
  createdAt   DateTime     @default(now())
  updatedAt   DateTime     @updatedAt
  
  // Relações
  project     Project?    @relation(fields: [projectId], references: [id], onDelete: SetNull)
  createdBy   User         @relation("TaskCreator", fields: [createdById], references: [id])
  assignedTo  User?        @relation("TaskAssignee", fields: [assignedToId], references: [id], onDelete: SetNull)
  
  // Índices para queries comuns
  @@index([createdById])
  @@index([assignedToId])
  @@index([projectId])
  @@index([status])
  @@index([dueDate])
  @@index([status, dueDate]) // Índice composto para queries de tarefas atrasadas
  @@map("tasks")
}

// ============================================================================
// ENUMS
// ============================================================================
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

**Características do Schema:**

- **Foreign Keys**: Todas as relações têm foreign keys com `onDelete` apropriado (Cascade para projetos, SetNull para tarefas)
- **Índices**: Índices em colunas frequentemente consultadas (status, dueDate, projectId, etc.)
- **Enums**: Status e prioridade como enums (type-safe, validação no banco)
- **Timestamps**: `createdAt` e `updatedAt` automáticos
- **Nullable Fields**: Campos opcionais marcados como `String?` ou `Int?`

### 3.2 Migração do Schema Legado

| Legado (MySQL) | Moderno (Prisma) | Mudanças |
|----------------|------------------|----------|
| **users.id** | `User.id` | Mantido (INT → Int) |
| **users.email** | `User.email` | Mantido, adicionado `@unique` constraint |
| **users.password** | `User.password` | VARCHAR(100) → String (suporta bcrypt 60+ chars) |
| **users.name** | `User.name` | Mantido |
| **users.role** | ❌ Removido | Não necessário para MVP (sistema single-user) |
| **users.avatar** | ❌ Removido | Não no escopo do MVP |
| **users.department** | ❌ Removido | Não no escopo do MVP |
| **users.phone** | ❌ Removido | Não no escopo do MVP |
| **users.is_active** | ❌ Removido | Não necessário para MVP |
| **users.last_login** | ❌ Removido | Não necessário para MVP |
| **projects.id** | `Project.id` | Mantido |
| **projects.name** | `Project.name` | Mantido |
| **projects.description** | `Project.description` | TEXT → String? (nullable) |
| **projects.status** | ❌ Removido | Não necessário para MVP |
| **projects.owner_id** | `Project.ownerId` | Adicionado foreign key com cascade delete |
| **projects.start_date** | ❌ Removido | Não no escopo do MVP |
| **projects.end_date** | ❌ Removido | Não no escopo do MVP |
| **projects.budget** | ❌ Removido | Não no escopo do MVP |
| **projects.color** | ❌ Removido | Não no escopo do MVP |
| **project_members** | ❌ Removido | Não no escopo do MVP (projeto single-owner) |
| **tasks.id** | `Task.id` | Mantido |
| **tasks.project_id** | `Task.projectId` | Adicionado foreign key com SetNull on delete |
| **tasks.title** | `Task.title` | Mantido |
| **tasks.description** | `Task.description` | TEXT → String? (nullable) |
| **tasks.priority** | `Task.priority` | ENUM → Enum TaskPriority (low/medium/high) |
| **tasks.status** | `Task.status` | ENUM simplificado (pending/in_progress/completed) |
| **tasks.assigned_to** | `Task.assignedToId` | Adicionado foreign key |
| **tasks.created_by** | `Task.createdById` | Adicionado foreign key |
| **tasks.due_date** | `Task.dueDate` | DATE → DateTime? (nullable) |
| **tasks.estimated_hours** | ❌ Removido | Não no escopo do MVP |
| **tasks.actual_hours** | ❌ Removido | Não no escopo do MVP |
| **tasks.tags** | ❌ Removido | Não no escopo do MVP (tags como VARCHAR era anti-pattern) |
| **tasks.completed_at** | ❌ Removido | Pode ser derivado de status + updatedAt |
| **comments** | ❌ Removido | Não no escopo do MVP |
| **attachments** | ❌ Removido | Não no escopo do MVP |
| **time_logs** | ❌ Removido | Não no escopo do MVP |
| **activity_log** | ❌ Removido | Não no escopo do MVP |

**Principais Mudanças:**

1. **Simplificação**: Removidos campos não essenciais para MVP
2. **Foreign Keys**: Adicionadas constraints de integridade referencial
3. **Índices**: Adicionados índices para otimizar queries comuns
4. **Enums**: Status e prioridade como enums type-safe
5. **Timestamps**: `createdAt` e `updatedAt` automáticos via Prisma
6. **Type Safety**: Schema Prisma gera tipos TypeScript automaticamente

---

## 4. Design da API

### 4.1 Endpoints RESTful

#### Autenticação

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

#### Projetos

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

#### Tarefas

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

### 4.2 Formato de Resposta de Erro

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

## 5. Fluxo de Autenticação

### 5.1 Diagrama de Sequência JWT

```
┌─────────┐                    ┌─────────┐                    ┌─────────┐
│ Cliente │                    │ Servidor │                    │  Banco  │
│ (React) │                    │(Express) │                    │ (SQLite)│
└────┬────┘                    └────┬────┘                    └────┬────┘
     │                              │                              │
     │  1. POST /api/auth/login    │                              │
     │     { email, password }     │                              │
     │─────────────────────────────>│                              │
     │                              │                              │
     │                              │  2. Buscar usuário por email │
     │                              │─────────────────────────────>│
     │                              │                              │
     │                              │  3. Verificar senha (bcrypt) │
     │                              │<─────────────────────────────│
     │                              │                              │
     │                              │  4. Gerar JWT token          │
     │                              │     (payload: { userId, email })│
     │                              │                              │
     │  5. Retorna { user, token }  │                              │
     │<─────────────────────────────│                              │
     │                              │                              │
     │  6. Armazenar token em       │                              │
     │     localStorage             │                              │
     │                              │                              │
     │  7. POST /api/tasks          │                              │
     │     Headers:                 │                              │
     │     Authorization: Bearer <token>                           │
     │─────────────────────────────>│                              │
     │                              │                              │
     │                              │  8. Validar token JWT        │
     │                              │     (verificar assinatura)   │
     │                              │                              │
     │                              │  9. Extrair userId do token   │
     │                              │                              │
     │                              │  10. Buscar tarefas do usuário│
     │                              │─────────────────────────────>│
     │                              │                              │
     │                              │  11. Retorna tarefas          │
     │                              │<─────────────────────────────│
     │                              │                              │
     │  12. Retorna { tasks: [...] }│                              │
     │<─────────────────────────────│                              │
     │                              │                              │
```

**Fluxo Detalhado:**

1. **Login**: Cliente envia email e senha
2. **Validação**: Servidor busca usuário e verifica senha com bcrypt
3. **Geração de Token**: Servidor gera JWT com payload `{ userId, email, iat, exp }`
4. **Armazenamento**: Cliente armazena token em `localStorage`
5. **Requisições Autenticadas**: Cliente inclui token no header `Authorization: Bearer <token>`
6. **Validação de Token**: Middleware valida assinatura e expiração do token
7. **Autorização**: Servidor usa `userId` do token para filtrar dados do usuário

### 5.2 Medidas de Segurança

| Medida | Implementação |
|--------|---------------|
| **Hash de Senhas** | bcrypt com cost factor 10 (configurável via `BCRYPT_ROUNDS`) |
| **JWT Secret** | Secret armazenado em variável de ambiente `JWT_SECRET` (mínimo 32 caracteres) |
| **Expiração de Token** | Token expira em 24 horas (configurável via `JWT_EXPIRES_IN`) |
| **Validação de Assinatura** | Middleware verifica assinatura HMAC-SHA256 em todas as requisições |
| **HTTPS em Produção** | Todas as comunicações via HTTPS (tokens não trafegam em texto plano) |
| **CORS Configurado** | CORS habilitado apenas para origens permitidas (whitelist) |
| **Rate Limiting** | Rate limiting em endpoints de autenticação (prevenir brute force) |
| **Validação de Entrada** | Zod schemas validam todos os dados de entrada antes de processar |
| **Sanitização** | Dados sanitizados antes de exibir (React escapa automaticamente, mas validar no backend também) |
| **Headers de Segurança** | Headers HTTP de segurança (X-Content-Type-Options, X-Frame-Options, etc.) |

---

## 6. Arquitetura de Componentes React

### 6.1 Árvore de Componentes

```
<App>
  ├── <AuthProvider>
  │     ├── <Router>
  │     │     ├── <Route path="/login">
  │     │     │     └── <LoginPage>
  │     │     │           └── <LoginForm>
  │     │     │                 ├── <Input type="email" />
  │     │     │                 ├── <Input type="password" />
  │     │     │                 └── <Button type="submit" />
  │     │     │
  │     │     ├── <Route path="/register">
  │     │     │     └── <RegisterPage>
  │     │     │           └── <RegisterForm>
  │     │     │                 ├── <Input type="text" name="name" />
  │     │     │                 ├── <Input type="email" />
  │     │     │                 ├── <Input type="password" />
  │     │     │                 ├── <Input type="password" name="confirmPassword" />
  │     │     │                 └── <Button type="submit" />
  │     │     │
  │     │     └── <ProtectedRoute>
  │     │           └── <DashboardPage>
  │     │                 ├── <Header>
  │     │                 │     ├── <UserInfo>
  │     │                 │     └── <LogoutButton>
  │     │                 │
  │     │                 ├── <StatsCards>
  │     │                 │     ├── <StatCard label="Total" />
  │     │                 │     ├── <StatCard label="Pendentes" />
  │     │                 │     ├── <StatCard label="Em Progresso" />
  │     │                 │     ├── <StatCard label="Concluídas" />
  │     │                 │     └── <StatCard label="Atrasadas" />
  │     │                 │
  │     │                 ├── <TaskForm>
  │     │                 │     ├── <Input name="title" />
  │     │                 │     ├── <Select name="priority" />
  │     │                 │     ├── <Select name="projectId" />
  │     │                 │     └── <Button type="submit" />
  │     │                 │
  │     │                 ├── <FilterBar>
  │     │                 │     ├── <Select name="status" />
  │     │                 │     ├── <Select name="priority" />
  │     │                 │     ├── <Select name="projectId" />
  │     │                 │     └── <Input name="search" />
  │     │                 │
  │     │                 └── <TaskList>
  │     │                       └── <TaskCard> (múltiplos)
  │     │                             ├── <TaskTitle />
  │     │                             ├── <TaskStatus />
  │     │                             ├── <TaskPriority />
  │     │                             ├── <TaskDueDate />
  │     │                             ├── <TaskProject />
  │     │                             ├── <Button onClick={handleEdit} />
  │     │                             └── <Button onClick={handleDelete} />
  │     │
  │     └── <EditModal> (condicional)
  │           ├── <TaskForm completo>
  │           ├── <Button onClick={handleSave} />
  │           └── <Button onClick={handleCancel} />
  │
  └── <ErrorBoundary>
        └── (tratamento de erros globais)
```

### 6.2 Gerenciamento de Estado

**AuthState (Context Global)**

```typescript
interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

interface AuthContextValue extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}
```

**DashboardState (Estado Local)**

```typescript
interface DashboardState {
  tasks: Task[];
  projects: Project[];
  stats: TaskStats;
  filters: {
    status: TaskStatus | 'all';
    priority: TaskPriority | 'all';
    projectId: number | null;
    search: string;
  };
  sort: {
    field: 'createdAt' | 'dueDate' | 'priority' | 'title';
    order: 'asc' | 'desc';
  };
  isLoading: boolean;
  error: string | null;
  selectedTask: Task | null; // Para modal de edição
}
```

### 6.3 Padrão do Cliente API

```typescript
// client/src/api/client.ts
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = localStorage.getItem('token');
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Erro na requisição');
  }

  return response.json();
}

// Exemplo de uso
export async function getTasks(filters?: TaskFilters): Promise<Task[]> {
  const params = new URLSearchParams();
  if (filters?.status) params.append('status', filters.status);
  if (filters?.priority) params.append('priority', filters.priority);
  if (filters?.projectId) params.append('projectId', String(filters.projectId));
  if (filters?.search) params.append('search', filters.search);
  
  const query = params.toString();
  return apiRequest<Task[]>(`/tasks${query ? `?${query}` : ''}`);
}

export async function createTask(data: CreateTaskInput): Promise<Task> {
  return apiRequest<Task>('/tasks', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}
```

---

## 7. Arquitetura de Segurança

### 7.1 Controles vs Vulnerabilidades do Legado

| Vulnerabilidade Legado | Controle Moderno | Implementação |
|-----------------------|------------------|---------------|
| **SQL Injection (15+ instâncias)** | Prisma ORM com prepared statements | Todas as queries via Prisma Client (type-safe, zero SQL manual) |
| **Senhas MD5** | bcrypt com cost 10+ | `bcrypt.hash(password, 10)` no registro, `bcrypt.compare()` no login |
| **Credenciais hardcoded** | Variáveis de ambiente | Todas as secrets em `.env` (nunca commitado), validação no startup |
| **Validação inconsistente** | Zod schemas em todas as camadas | Validators Zod em todos os endpoints antes de processar |
| **Ausência de autorização** | Middleware de autenticação + verificação de ownership | Middleware JWT + services verificam `userId` antes de retornar dados |
| **Upload de arquivos vulnerável** | ❌ Removido do MVP | Feature de upload não incluída no escopo inicial |
| **XSS (flash messages)** | React escapa automaticamente + sanitização backend | React escapa HTML, backend valida dados antes de salvar |
| **Sessão insegura** | JWT stateless | Tokens JWT com expiração, sem sessões no servidor |
| **Remember me inseguro** | JWT com expiração configurável | Token expira em 24h, pode ser estendido via refresh token (futuro) |
| **Debug mode em produção** | Variável de ambiente | `NODE_ENV=production` desabilita logs detalhados |

### 7.2 Schemas de Validação Zod

**Registro de Usuário**

```typescript
// server/src/validators/auth.validator.ts
import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string()
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .max(100, 'Nome deve ter no máximo 100 caracteres'),
  email: z.string()
    .email('Email inválido')
    .max(100, 'Email deve ter no máximo 100 caracteres'),
  password: z.string()
    .min(8, 'Senha deve ter pelo menos 8 caracteres')
    .max(100, 'Senha deve ter no máximo 100 caracteres')
    .regex(/[A-Z]/, 'Senha deve conter pelo menos uma letra maiúscula')
    .regex(/[a-z]/, 'Senha deve conter pelo menos uma letra minúscula')
    .regex(/[0-9]/, 'Senha deve conter pelo menos um número'),
});

export type RegisterInput = z.infer<typeof registerSchema>;
```

**Login**

```typescript
export const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(1, 'Senha é obrigatória'),
});

export type LoginInput = z.infer<typeof loginSchema>;
```

**Criação de Projeto**

```typescript
// server/src/validators/project.validator.ts
import { z } from 'zod';

export const createProjectSchema = z.object({
  name: z.string()
    .min(1, 'Nome do projeto é obrigatório')
    .max(200, 'Nome deve ter no máximo 200 caracteres'),
  description: z.string()
    .max(1000, 'Descrição deve ter no máximo 1000 caracteres')
    .optional()
    .nullable(),
});

export type CreateProjectInput = z.infer<typeof createProjectSchema>;
```

**Criação de Tarefa**

```typescript
// server/src/validators/task.validator.ts
import { z } from 'zod';

export const createTaskSchema = z.object({
  title: z.string()
    .min(1, 'Título é obrigatório')
    .max(200, 'Título deve ter no máximo 200 caracteres'),
  description: z.string()
    .max(2000, 'Descrição deve ter no máximo 2000 caracteres')
    .optional()
    .nullable(),
  priority: z.enum(['low', 'medium', 'high']).default('medium'),
  dueDate: z.string()
    .datetime('Data inválida')
    .optional()
    .nullable()
    .transform((val) => val ? new Date(val) : null),
  projectId: z.number().int().positive().optional().nullable(),
});

export type CreateTaskInput = z.infer<typeof createTaskSchema>;
```

---

## 8. Configuração de Desenvolvimento

### 8.1 Variáveis de Ambiente

**server/.env**

```env
# Database
DATABASE_URL="file:./dev.db"

# JWT
JWT_SECRET="your-super-secret-key-minimum-32-characters-long"
JWT_EXPIRES_IN="24h"

# Bcrypt
BCRYPT_ROUNDS=10

# Server
PORT=3000
NODE_ENV=development

# CORS
CORS_ORIGIN="http://localhost:5173"
```

**client/.env**

```env
VITE_API_URL=http://localhost:3000/api
```

**Variáveis de Produção (server/.env.production)**

```env
DATABASE_URL="postgresql://user:password@localhost:5432/taskmaster"
JWT_SECRET="<gerado-aleatoriamente-em-producao>"
JWT_EXPIRES_IN="24h"
BCRYPT_ROUNDS=12
PORT=3000
NODE_ENV=production
CORS_ORIGIN="https://taskmaster.example.com"
```

### 8.2 Comandos de Desenvolvimento

**Instalação**

```bash
# Root (workspace)
npm install

# Client
cd client
npm install

# Server
cd server
npm install
```

**Setup do Banco**

```bash
# Gerar Prisma Client
cd server
npx prisma generate

# Criar banco e aplicar migrations
npx prisma migrate dev --name init

# (Opcional) Abrir Prisma Studio para visualizar dados
npx prisma studio
```

**Seed de Dados**

```bash
cd server
npx prisma db seed
```

**Execução em Desenvolvimento**

```bash
# Terminal 1 - Backend
cd server
npm run dev

# Terminal 2 - Frontend
cd client
npm run dev
```

**Scripts package.json (server)**

```json
{
  "scripts": {
    "dev": "tsx watch src/server.ts",
    "build": "tsc",
    "start": "node dist/server.js",
    "prisma:generate": "prisma generate",
    "prisma:migrate": "prisma migrate dev",
    "prisma:studio": "prisma studio",
    "prisma:seed": "tsx prisma/seed.ts"
  }
}
```

**Scripts package.json (client)**

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  }
}
```

### 8.3 Credenciais de Demonstração

Após executar o seed, as seguintes credenciais estarão disponíveis:

**Usuário Admin:**
- Email: `admin@taskmaster.com`
- Senha: `admin123`

**Usuários de Teste:**
- Email: `john@example.com`
- Senha: `password`
- Email: `jane@example.com`
- Senha: `password`

**Nota**: No sistema moderno, as senhas serão hasheadas com bcrypt, não MD5. O seed deve gerar senhas com bcrypt.

---

## 9. Estratégia de Tratamento de Erros

### 9.1 Middleware de Erro (Servidor)

```typescript
// server/src/middleware/errorHandler.ts
import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export class AppError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public code?: string
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Erro de validação Zod
  if (err instanceof ZodError) {
    return res.status(400).json({
      error: 'VALIDATION_ERROR',
      message: 'Dados inválidos',
      details: err.errors.map((e) => ({
        field: e.path.join('.'),
        issue: e.message,
      })),
    });
  }

  // Erro do Prisma (ex: constraint violation)
  if (err instanceof PrismaClientKnownRequestError) {
    if (err.code === 'P2002') {
      // Unique constraint violation
      return res.status(409).json({
        error: 'CONFLICT',
        message: 'Registro já existe',
        details: { field: err.meta?.target },
      });
    }
    if (err.code === 'P2025') {
      // Record not found
      return res.status(404).json({
        error: 'NOT_FOUND',
        message: 'Registro não encontrado',
      });
    }
  }

  // Erro de autenticação
  if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
    return res.status(401).json({
      error: 'UNAUTHORIZED',
      message: 'Token de autenticação inválido ou expirado',
    });
  }

  // Erro customizado da aplicação
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      error: err.code || 'APPLICATION_ERROR',
      message: err.message,
    });
  }

  // Erro genérico (não esperado)
  console.error('Unexpected error:', err);
  return res.status(500).json({
    error: 'INTERNAL_ERROR',
    message: process.env.NODE_ENV === 'production' 
      ? 'Erro interno do servidor' 
      : err.message,
  });
}
```

### 9.2 Tratamento de Erro (Cliente)

```typescript
// Exemplo de uso em componente React
import { useState } from 'react';
import { createTask } from '../api/tasks';

function TaskForm() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: CreateTaskInput) => {
    try {
      setIsLoading(true);
      setError(null);
      await createTask(data);
      // Sucesso - atualizar lista, fechar modal, etc.
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Erro ao criar tarefa');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="error">{error}</div>}
      {/* ... campos do formulário ... */}
    </form>
  );
}
```

---

## 10. Considerações de Deploy

### 10.1 Checklist de Produção

**Segurança:**
- [ ] `JWT_SECRET` gerado aleatoriamente (mínimo 32 caracteres)
- [ ] `NODE_ENV=production` configurado
- [ ] HTTPS habilitado (certificado SSL válido)
- [ ] CORS configurado apenas para domínio de produção
- [ ] Variáveis de ambiente validadas no startup
- [ ] Headers de segurança HTTP configurados
- [ ] Rate limiting habilitado em endpoints de autenticação

**Banco de Dados:**
- [ ] PostgreSQL configurado (não SQLite)
- [ ] Migrations aplicadas (`prisma migrate deploy`)
- [ ] Backup automático configurado
- [ ] Connection pooling configurado
- [ ] Índices criados e otimizados

**Aplicação:**
- [ ] Build de produção executado (`npm run build`)
- [ ] Testes passando (unit + integration)
- [ ] Cobertura de testes >80%
- [ ] Logging estruturado configurado
- [ ] Monitoramento e alertas configurados
- [ ] Health check endpoint implementado

**Infraestrutura:**
- [ ] Servidor Node.js com PM2 ou similar
- [ ] Reverse proxy (Nginx) configurado
- [ ] SSL/TLS configurado
- [ ] Firewall configurado
- [ ] Domínio e DNS configurados

### 10.2 Caminho de Escalabilidade

```
┌─────────────────────────────────────────────────────────────┐
│ DESENVOLVIMENTO                                              │
│ ─────────────────────────────────────────────────────────── │
│ • SQLite (arquivo local)                                     │
│ • Servidor Node.js local (porta 3000)                       │
│ • Frontend Vite dev server (porta 5173)                      │
│ • Sem load balancing                                         │
│ • Sem cache                                                  │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│ STAGING                                                       │
│ ─────────────────────────────────────────────────────────── │
│ • PostgreSQL (servidor único)                                │
│ • Servidor Node.js único                                     │
│ • Frontend servido via Nginx                                 │
│ • Sem load balancing                                         │
│ • Cache básico (Redis opcional)                             │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│ PRODUÇÃO                                                     │
│ ─────────────────────────────────────────────────────────── │
│ • PostgreSQL (replicação master-slave)                     │
│ • Múltiplos servidores Node.js                               │
│ • Load balancer (Nginx ou cloud LB)                         │
│ • CDN para assets estáticos                                 │
│ • Redis para cache e sessões (se necessário)                │
│ • Monitoramento (APM, logs agregados)                       │
└─────────────────────────────────────────────────────────────┘
```

**Evolução Futura:**

1. **Microserviços**: Separar auth, tasks, projects em serviços independentes
2. **Message Queue**: Adicionar filas (RabbitMQ, Kafka) para processamento assíncrono
3. **Cache Distribuído**: Redis cluster para cache e sessões
4. **Database Sharding**: Sharding horizontal se volume de dados crescer
5. **CDN Global**: CDN para servir assets estáticos globalmente

---

## Conclusão

Este documento de arquitetura define a base técnica para a reescrita completa do TaskMaster Pro, transformando uma aplicação legada vulnerável em PHP 5 em uma aplicação moderna, segura e escalável usando TypeScript, React e Node.js.

**Principais Diferenciais:**

✅ **Segurança**: Zero vulnerabilidades conhecidas desde o início  
✅ **Type Safety**: TypeScript strict mode em todo o código  
✅ **Testabilidade**: Arquitetura em camadas facilita testes  
✅ **Manutenibilidade**: Código limpo, documentado e organizado  
✅ **Escalabilidade**: API-first, stateless, preparado para crescer  

**Próximos Passos:**

1. Revisar e aprovar este documento
2. Handoff para Scrum Master (Fase 4) para criação de user stories
3. Iniciar desenvolvimento seguindo esta arquitetura

---

*Documento gerado por: BMAD Architect Agent (Winston)*  
*Data: Janeiro 2026*  
*Versão: 1.0*
