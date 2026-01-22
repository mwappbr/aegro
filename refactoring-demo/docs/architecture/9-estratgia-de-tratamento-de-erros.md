# 9. Estratégia de Tratamento de Erros

## 9.1 Middleware de Erro (Servidor)

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

## 9.2 Tratamento de Erro (Cliente)

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
