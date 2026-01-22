# Fase 3: Prompt para o Agente Arquiteto

## 🎯 Objetivo
Projetar a arquitetura técnica completa da aplicação moderna, incluindo escolha de tecnologias, estrutura de projeto, design de API e esquema de banco de dados.

---

## 📋 Prompt Principal

```
Você é um Agente Arquiteto de Software especializado em aplicações web modernas. Sua tarefa é criar o documento de arquitetura técnica para a reescrita da aplicação TaskMaster Pro.

## Contexto

Você recebeu:
1. Relatório de auditoria do Analista 03-auditoria-completa.md
2. PRD do Product Manager 01-prd.md

A aplicação será reescrita usando tecnologias modernas, com foco em:
- Segurança (eliminar todas as vulnerabilidades do legado)
- Tipagem (TypeScript em todo o código)
- Manutenibilidade (separação de responsabilidades)
- Testabilidade (arquitetura que facilita testes)

## Sua Missão

Crie um documento de arquitetura técnica completo contendo:

### 1. Visão Geral da Arquitetura

#### 1.1 Diagrama de Alto Nível
Crie um diagrama ASCII mostrando:
- Camada Cliente (React)
- Camada Servidor (Express)
- Camada de Dados (Prisma + SQLite)
- Fluxo de comunicação entre camadas

#### 1.2 Stack Tecnológica
Para cada tecnologia escolhida, forneça uma tabela:

| Camada | Tecnologia | Justificativa |
|--------|------------|---------------|

Inclua:
- Frontend: Framework, linguagem, estilização, estado
- Backend: Runtime, framework, linguagem
- Banco de dados: ORM, banco de dados
- Autenticação: Método, biblioteca
- Validação: Biblioteca

#### 1.3 Comparação Legado vs Moderno
Tabela mostrando como cada problema do legado é resolvido:

| Aspecto | Legado PHP | Moderno TypeScript |
|---------|------------|-------------------|

### 2. Estrutura do Projeto

#### 2.1 Estrutura de Diretórios
Mostre a árvore completa de diretórios para:
- Raiz do monorepo
- Pasta server/ com todas as subpastas
- Pasta client/ com todas as subpastas

Use formato de árvore com comentários explicativos.

### 3. Design do Banco de Dados

#### 3.1 Schema Prisma
Forneça o schema completo em código Prisma:

```prisma
// Inclua:
// - Model User com relações
// - Model Project com relações
// - Model Task com relações
// - Todos os indexes necessários
// - Configuração do datasource
```

#### 3.2 Migração do Schema Legado
Tabela mapeando tabelas/colunas do MySQL legado para Prisma:

| Legado (MySQL) | Moderno (Prisma) | Mudanças |
|----------------|------------------|----------|

### 4. Design da API

#### 4.1 Endpoints RESTful
Para cada grupo de endpoints, documente:

**Autenticação:**
```
POST /api/auth/register
Requisição: { ... }
Resposta 201: { ... }
Erros: 400, 409

POST /api/auth/login
...

GET /api/auth/me
...
```

**Projetos:**
```
GET /api/projects
POST /api/projects
PUT /api/projects/:id
DELETE /api/projects/:id
```

**Tarefas:**
```
GET /api/tasks
GET /api/tasks/stats
POST /api/tasks
GET /api/tasks/:id
PUT /api/tasks/:id
DELETE /api/tasks/:id
```

#### 4.2 Formato de Resposta de Erro
Defina interface TypeScript para erros padronizados.

### 5. Fluxo de Autenticação

#### 5.1 Diagrama de Sequência JWT
Crie diagrama ASCII mostrando:
1. Cliente faz login
2. Servidor valida credenciais
3. Servidor gera JWT
4. Cliente armazena token
5. Cliente faz requisição autenticada
6. Servidor valida token
7. Servidor retorna dados

#### 5.2 Medidas de Segurança
Tabela com controles de segurança:

| Medida | Implementação |
|--------|---------------|

### 6. Arquitetura de Componentes React

#### 6.1 Árvore de Componentes
Mostre hierarquia completa:
```
<App>
  <AuthProvider>
    <Router>
      ...
    </Router>
  </AuthProvider>
</App>
```

#### 6.2 Gerenciamento de Estado
Defina interfaces TypeScript para:
- AuthState (contexto global)
- DashboardState (estado local)

#### 6.3 Padrão do Cliente API
Forneça código de exemplo para função genérica de requisição.

### 7. Arquitetura de Segurança

#### 7.1 Controles vs Vulnerabilidades do Legado
Tabela mostrando como cada vulnerabilidade é mitigada:

| Vulnerabilidade Legado | Controle Moderno | Implementação |
|-----------------------|------------------|---------------|

#### 7.2 Schemas de Validação Zod
Forneça código de exemplo para schemas de:
- Registro de usuário
- Login
- Criação de projeto
- Criação de tarefa

### 8. Configuração de Desenvolvimento

#### 8.1 Variáveis de Ambiente
Liste todas as variáveis necessárias para:
- server/.env
- client/.env

#### 8.2 Comandos de Desenvolvimento
Liste todos os comandos npm necessários para:
- Instalação
- Setup do banco
- Seed de dados
- Execução em desenvolvimento

#### 8.3 Credenciais de Demonstração
Defina usuário/senha para demo após seed.

### 9. Estratégia de Tratamento de Erros

#### 9.1 Middleware de Erro (Servidor)
Forneça código TypeScript para middleware que trata:
- Erros Zod (validação)
- Erros de autenticação
- Erros genéricos

#### 9.2 Tratamento de Erro (Cliente)
Mostre padrão de código para try/catch em componentes.

### 10. Considerações de Deploy

#### 10.1 Checklist de Produção
Lista de itens a verificar antes de produção.

#### 10.2 Caminho de Escalabilidade
```
Desenvolvimento: SQLite + servidor local
Staging: PostgreSQL + servidor único
Produção: PostgreSQL + load balancer
```

## Formato de Saída

Produza o documento em formato Markdown com:
- Headers hierárquicos claros
- Código em blocos com syntax highlighting
- Tabelas formatadas
- Diagramas ASCII quando apropriado

## Entrada: PRD do Product Manager

[INSIRA AQUI O PRD GERADO PELO AGENTE PM NA FASE 2]
```

---

## 📎 Prompts Auxiliares

### Se precisar de mais detalhes sobre Prisma:

```
Detalhe o schema Prisma para a aplicação. Inclua:

1. Modelo User completo com:
   - Campos necessários
   - Relações com Project e Task
   - Índices de performance

2. Modelo Project completo com:
   - Campos necessários
   - Relação com Owner (User)
   - Relação com Tasks
   - Cascade delete

3. Modelo Task completo com:
   - Todos os campos (status, priority, dueDate, etc.)
   - Relação com Project (opcional)
   - Relação com Creator (User)
   - Relação com Assignee (User, opcional)
   - Índices para queries comuns

Forneça o código Prisma completo e comentado.
```

### Se precisar de mais detalhes sobre API:

```
Detalhe os contratos da API para o endpoint de tarefas.

Para cada endpoint (GET /tasks, POST /tasks, PUT /tasks/:id, DELETE /tasks/:id), forneça:

1. Descrição da funcionalidade
2. Headers necessários
3. Query parameters (se aplicável)
4. Request body com interface TypeScript
5. Response body com interface TypeScript
6. Todos os códigos de status possíveis
7. Exemplos de requisição/resposta

Inclua também o endpoint GET /tasks/stats com a interface TaskStats.
```

### Se precisar de mais detalhes sobre segurança:

```
Detalhe a arquitetura de segurança da aplicação.

Para cada vulnerabilidade do sistema legado, explique:

1. SQL Injection
   - Como o Prisma previne isso?
   - Mostre exemplo de código seguro

2. Senhas MD5
   - Como bcrypt resolve isso?
   - Qual custo/rounds usar?
   - Mostre código de hash e verificação

3. Credenciais hardcoded
   - Como usar .env corretamente?
   - Quais variáveis são necessárias?
   - Como validar se estão configuradas?

4. Validação de entrada
   - Como Zod funciona?
   - Mostre schemas de validação completos
   - Como integrar com Express?

5. Autorização
   - Como garantir que usuários só acessam seus dados?
   - Mostre middleware de autenticação
   - Mostre verificação de ownership em services
```

---

## ✅ Checklist de Validação

Após receber o documento de arquitetura, verifique se contém:

- [ ] Diagrama de arquitetura de alto nível
- [ ] Justificativa para cada tecnologia escolhida
- [ ] Estrutura de diretórios completa
- [ ] Schema Prisma completo com relações
- [ ] Todos os endpoints de API documentados
- [ ] Fluxo de autenticação JWT explicado
- [ ] Árvore de componentes React
- [ ] Schemas de validação Zod
- [ ] Variáveis de ambiente listadas
- [ ] Comandos de desenvolvimento
- [ ] Tratamento de erros documentado

---

## 📤 Saída Esperada

O Arquiteto deve gerar um documento similar a:
`bmad-docs/phase3-solutioning/01-architecture.md`

Este documento será usado como entrada para o Agente Scrum Master na Fase 4.

---

## 🔗 Próximo Passo

Após concluir esta fase, vá para:
`04-scrum-master-prompt.md` (Fase 4: Scrum Master)
