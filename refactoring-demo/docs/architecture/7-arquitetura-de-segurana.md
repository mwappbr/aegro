# 7. Arquitetura de Segurança

## 7.1 Controles vs Vulnerabilidades do Legado

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

## 7.2 Schemas de Validação Zod

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
