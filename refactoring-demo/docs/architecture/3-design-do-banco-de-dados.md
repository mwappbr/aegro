# 3. Design do Banco de Dados

## 3.1 Schema Prisma

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

## 3.2 Migração do Schema Legado

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
