# 1. Visão Geral da Arquitetura

## 1.1 Diagrama de Alto Nível

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

## 1.2 Stack Tecnológica

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

## 1.3 Comparação Legado vs Moderno

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
