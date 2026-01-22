# 9. Modelos de Dados

## 9.1 Interfaces TypeScript

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

## 9.2 Schema do Banco de Dados (Prisma)

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
