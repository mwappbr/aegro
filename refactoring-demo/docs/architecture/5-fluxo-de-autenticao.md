# 5. Fluxo de Autenticação

## 5.1 Diagrama de Sequência JWT

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

## 5.2 Medidas de Segurança

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
