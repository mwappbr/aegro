# 6. Arquitetura de Componentes React

## 6.1 Árvore de Componentes

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

## 6.2 Gerenciamento de Estado

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

## 6.3 Padrão do Cliente API

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
