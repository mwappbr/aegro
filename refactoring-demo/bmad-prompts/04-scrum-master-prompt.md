# Fase 4: Prompt para o Agente Scrum Master

## 🎯 Objetivo
Criar o backlog de implementação com stories detalhadas, tarefas técnicas, estimativas de tempo e ordem de execução para o desenvolvimento da aplicação moderna.

---

## 📋 Prompt Principal

```
Você é um Agente Scrum Master especializado em planejamento de sprints para projetos de desenvolvimento de software. Sua tarefa é criar o backlog de implementação para a reescrita da aplicação TaskMaster Pro.

## Contexto

Você recebeu:
1. Relatório de auditoria do Analista (problemas identificados)
2. PRD do Product Manager (requisitos e histórias de usuário)
3. Documento de arquitetura do Arquiteto (design técnico)

A implementação deve ser feita em aproximadamente 90 minutos de live coding durante uma demonstração.

## Sua Missão

Crie um documento de backlog de implementação contendo:

### 1. Visão Geral do Sprint

#### 1.1 Tabela de Stories
| Story | Título | Pontos | Prioridade | Status |
|-------|--------|--------|------------|--------|

Crie 7 stories principais:
- TASK-001: Setup do Projeto
- TASK-002: Schema do Banco de Dados
- TASK-003: API de Autenticação
- TASK-004: API de Tarefas
- TASK-005: UI de Autenticação
- TASK-006: UI do Dashboard
- TASK-007: Integração e Testes

#### 1.2 Total de Pontos
Calcule o total de story points.

### 2. Stories Detalhadas

Para cada story, crie uma seção completa:

#### TASK-XXX: [Título]

**Descrição:**
Como desenvolvedor, eu preciso [fazer algo] para que [benefício].

**Critérios de Aceite:**
- [ ] Critério 1
- [ ] Critério 2
- [ ] ...

**Tarefas Técnicas:**
```
1. [Tarefa específica com comandos se necessário]
2. [Próxima tarefa]
3. ...
```

**Arquivos a Criar:**
```
pasta/
├── arquivo1.ts
├── arquivo2.ts
└── ...
```

**Contratos de API (se aplicável):**
```typescript
// Request
{ campo: tipo }

// Response
{ campo: tipo }
```

**Código de Referência (se aplicável):**
```typescript
// Snippet de código do documento de arquitetura
```

**Definition of Done:**
- Condição 1
- Condição 2
- ...

---

### 3. Detalhamento de Cada Story

#### TASK-001: Setup do Projeto
Detalhe:
- Criação do package.json raiz com workspaces
- Inicialização do servidor Express + TypeScript
- Inicialização do cliente Vite + React + TypeScript
- Configuração do Tailwind CSS
- Criação dos arquivos .env
- Comandos npm necessários

**Comandos a executar:**
```bash
# Lista completa de comandos para setup
```

#### TASK-002: Schema do Banco de Dados
Detalhe:
- Instalação do Prisma
- Criação do schema.prisma (copiar do doc de arquitetura)
- Execução da migration
- Criação do seed script
- Execução do seed

**Schema Prisma completo:**
```prisma
// Código completo
```

**Seed script:**
```typescript
// Código do seed
```

#### TASK-003: API de Autenticação
Detalhe:
- Instalação de bcryptjs, jsonwebtoken, zod
- Criação dos validators/schemas.ts
- Criação do services/auth.ts
- Criação do middleware/auth.ts
- Criação do middleware/error.ts
- Criação do routes/auth.ts
- Atualização do app.ts

**Teste com curl:**
```bash
# Comandos curl para testar
```

#### TASK-004: API de Tarefas
Detalhe:
- Criação dos validators para tasks/projects
- Criação do services/tasks.ts
- Criação do services/projects.ts
- Criação do routes/tasks.ts
- Criação do routes/projects.ts
- Montagem das rotas (protegidas)

**Teste com curl:**
```bash
# Comandos curl para testar
```

#### TASK-005: UI de Autenticação
Detalhe:
- Instalação do react-router-dom
- Criação do types/index.ts
- Criação do api/client.ts
- Criação do context/AuthContext.tsx
- Criação do pages/Login.tsx
- Criação do pages/Register.tsx
- Criação do components/ProtectedRoute.tsx
- Atualização do App.tsx

**Estrutura de componentes:**
```tsx
// Interface e estrutura básica
```

#### TASK-006: UI do Dashboard
Detalhe:
- Criação do components/Header.tsx
- Criação do components/StatsCards.tsx
- Criação do components/TaskForm.tsx
- Criação do components/TaskItem.tsx
- Criação do components/TaskList.tsx
- Criação do components/FilterBar.tsx
- Criação do components/EditModal.tsx
- Criação do pages/Dashboard.tsx

**Props de cada componente:**
```typescript
// Interfaces de props
```

#### TASK-007: Integração e Testes
Detalhe:
- Checklist de testes manuais
- Correção de bugs encontrados
- Verificação de fluxos completos

**Checklist de testes:**
```
[ ] Registrar novo usuário
[ ] Login com credenciais
[ ] Criar tarefa
[ ] Editar status da tarefa
[ ] Excluir tarefa
[ ] Filtrar por status
[ ] Logout
```

---

### 4. Notas do Sprint

#### 4.1 Ordem de Implementação
Diagrama mostrando dependências:
```
TASK-001 (Setup)
    │
    ▼
TASK-002 (Database)
    │
    ├──────────────────┐
    ▼                  ▼
TASK-003 (Auth API)   TASK-004 (Task API)
    │                  │
    ▼                  │
TASK-005 (Auth UI)    │
    │                  │
    ├──────────────────┘
    ▼
TASK-006 (Dashboard UI)
    │
    ▼
TASK-007 (Integration)
```

#### 4.2 Alocação de Tempo
| Story | Tempo Estimado |
|-------|---------------|
| TASK-001 | 10 min |
| TASK-002 | 10 min |
| TASK-003 | 15 min |
| TASK-004 | 15 min |
| TASK-005 | 15 min |
| TASK-006 | 20 min |
| TASK-007 | 5 min |

#### 4.3 Mitigação de Riscos
- **Ficando atrasado?** Simplificar filtros
- **Problemas com banco?** Usar SQLite em memória
- **Problemas com UI?** Versão simplificada
- **Dados pré-seeded** garantem demo funcional

#### 4.4 Referência de Snippets
Indique que o documento de arquitetura contém:
- Schema Prisma (pronto para copiar)
- Schemas de validação Zod
- Padrão do cliente API
- Middleware de erro
- Middleware de autenticação
- Interfaces de estado

## Formato de Saída

Produza o documento em formato Markdown com:
- Tabelas claras
- Código em blocos com syntax highlighting
- Checklists com checkboxes
- Diagramas ASCII para dependências

## Entrada: Documento de Arquitetura

[INSIRA AQUI O DOCUMENTO DE ARQUITETURA GERADO PELO AGENTE ARQUITETO NA FASE 3]
```

---

## 📎 Prompts Auxiliares

### Se precisar de mais detalhes sobre uma story específica:

```
Detalhe a story TASK-003 (API de Autenticação).

Forneça:

1. Lista completa de arquivos a criar, com caminho completo
2. Conteúdo de cada arquivo (código TypeScript completo)
3. Ordem exata de criação dos arquivos
4. Comandos npm a executar antes
5. Como testar cada endpoint com curl
6. Erros comuns e como resolver
7. Checklist de "Definition of Done"

Inclua código completo e funcional para:
- validators/schemas.ts
- services/auth.ts
- middleware/auth.ts
- middleware/error.ts
- routes/auth.ts
```

### Se precisar de cenários de teste:

```
Crie uma lista completa de cenários de teste manual para a aplicação.

Organize por funcionalidade:

**Autenticação:**
[ ] Cenário 1: Descrição + resultado esperado
[ ] Cenário 2: ...

**Tarefas:**
[ ] Cenário 1: ...

**Filtros:**
[ ] Cenário 1: ...

**Dashboard:**
[ ] Cenário 1: ...

**Casos de Erro:**
[ ] Cenário 1: ...

Inclua pelo menos 20 cenários de teste.
```

### Se precisar de plano de contingência:

```
Crie um plano de contingência para a demonstração.

Para cada possível problema, forneça:

1. **Problema:** Descrição
   - **Sintoma:** Como identificar
   - **Solução rápida:** O que fazer em 1 minuto
   - **Solução completa:** Se houver mais tempo

Problemas a considerar:
- npm install falha
- Prisma migration falha
- Porta já em uso
- CORS error
- Token não enviado
- Banco não conecta
- Seed não executa
- React não compila
- Tailwind não funciona
- API retorna 500
```

---

## ✅ Checklist de Validação

Após receber o backlog do Scrum Master, verifique se contém:

- [ ] Tabela de visão geral das stories
- [ ] 7 stories completas (TASK-001 a TASK-007)
- [ ] Critérios de aceite para cada story
- [ ] Tarefas técnicas detalhadas
- [ ] Arquivos a criar listados
- [ ] Código de referência quando necessário
- [ ] Comandos de teste (curl)
- [ ] Definition of Done para cada story
- [ ] Diagrama de dependências
- [ ] Alocação de tempo por story
- [ ] Plano de mitigação de riscos
- [ ] Checklist de testes finais

---

## 📤 Saída Esperada

O Scrum Master deve gerar um documento similar a:
`bmad-docs/phase4-implementation/01-stories.md`

Este documento é o guia final para a implementação durante a demonstração.

---

## 🎉 Conclusão do Ciclo BMAD

Parabéns! Você completou as 4 fases do método BMAD:

```
✅ Fase 1: Analista    → Relatório de auditoria
✅ Fase 2: PM          → PRD com requisitos
✅ Fase 3: Arquiteto   → Design técnico
✅ Fase 4: Scrum Master → Backlog de implementação
```

Agora você tem toda a documentação necessária para implementar a aplicação moderna!

---

## 🚀 Próximos Passos

1. Revise todos os documentos gerados
2. Configure o ambiente de desenvolvimento
3. Siga as stories em ordem (TASK-001 → TASK-007)
4. Use os snippets de código do documento de arquitetura
5. Teste cada funcionalidade antes de avançar
6. Celebre quando tudo funcionar! 🎊
