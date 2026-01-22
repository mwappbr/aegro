# TaskMaster Pro - Modern Application

Aplicação moderna construída com TypeScript, React, Node.js e Prisma.

## Stack Tecnológica

### Backend
- **Runtime**: Node.js 20 LTS
- **Framework**: Express.js 4.x
- **Linguagem**: TypeScript 5.x
- **ORM**: Prisma 5.x
- **Banco de Dados**: SQLite (dev) / PostgreSQL (prod)
- **Autenticação**: JWT + bcrypt
- **Validação**: Zod

### Frontend
- **Framework**: React 18.x
- **Linguagem**: TypeScript 5.x
- **Build Tool**: Vite 5.x
- **Estilização**: Tailwind CSS 3.x
- **Roteamento**: React Router 6.x

## Estrutura do Projeto

```
modern-app-scaffold/
├── server/          # Backend API
│   ├── src/
│   │   ├── routes/      # Rotas da API
│   │   ├── services/    # Lógica de negócio
│   │   ├── validators/  # Schemas Zod
│   │   ├── middleware/  # Middlewares Express
│   │   └── types/       # TypeScript types
│   └── prisma/          # Schema e migrations
│
└── client/          # Frontend React
    └── src/
        ├── api/         # Cliente API
        ├── components/  # Componentes React
        ├── pages/       # Páginas da aplicação
        ├── context/     # React Context
        └── types/       # TypeScript types
```

## Instalação

### 1. Instalar dependências

```bash
npm run install:all
```

Ou manualmente:

```bash
npm install
cd server && npm install
cd ../client && npm install
```

### 2. Configurar ambiente

Copie o arquivo `.env.example` no diretório `server/` e configure as variáveis:

```bash
cd server
cp .env.example .env
```

Edite o arquivo `.env` com suas configurações.

### 3. Configurar banco de dados

```bash
cd server
npm run prisma:generate
npm run prisma:migrate
```

### 4. Iniciar desenvolvimento

```bash
# Inicia servidor e cliente simultaneamente
npm run dev

# Ou separadamente:
npm run dev:server  # Backend na porta 3000
npm run dev:client   # Frontend na porta 5173
```

## Scripts Disponíveis

### Root
- `npm run dev` - Inicia servidor e cliente em desenvolvimento
- `npm run build` - Build de produção para ambos
- `npm run install:all` - Instala dependências de todos os projetos

### Server
- `npm run dev` - Desenvolvimento com hot reload
- `npm run build` - Compila TypeScript
- `npm run start` - Inicia servidor de produção
- `npm run prisma:generate` - Gera Prisma Client
- `npm run prisma:migrate` - Executa migrations
- `npm run prisma:studio` - Abre Prisma Studio
- `npm run test` - Executa testes

### Client
- `npm run dev` - Desenvolvimento com Vite
- `npm run build` - Build de produção
- `npm run preview` - Preview do build de produção
- `npm run lint` - Executa linter

## Próximos Passos

Siga as histórias (stories) na ordem definida:

1. **Story 1.1**: Registro de Usuário
2. **Story 1.2**: Login de Usuário
3. **Story 1.3**: Dashboard
4. ... (demais stories)

## Documentação

- Arquitetura: `docs/architecture/`
- PRD: `docs/prd/`
- Stories: `docs/stories/`
