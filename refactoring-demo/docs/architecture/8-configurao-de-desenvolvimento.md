# 8. Configuração de Desenvolvimento

## 8.1 Variáveis de Ambiente

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

## 8.2 Comandos de Desenvolvimento

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

## 8.3 Credenciais de Demonstração

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
