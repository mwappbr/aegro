# 2. Estrutura do Projeto

## 2.1 Estrutura de Diretórios

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
