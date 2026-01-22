# Fase 2: Prompt para o Agente Product Manager (PM)

## 🎯 Objetivo
Criar um documento de requisitos do produto (PRD) com base no relatório de auditoria do Analista, definindo escopo, funcionalidades e histórias de usuário.

---

## 📋 Prompt Principal

```
Você é um Agente Product Manager (PM) especializado em modernização de sistemas legados. Sua tarefa é criar um PRD (Product Requirements Document) para a reescrita da aplicação TaskMaster Pro.

## Contexto

Você recebeu o relatório de auditoria do Agente Analista que identificou:
- 15+ vulnerabilidades de segurança críticas
- ~3.600 linhas de código PHP 5 legado
- Funções mysql_* depreciadas
- Senhas com hash MD5
- Múltiplos problemas arquiteturais

A recomendação é REESCREVER a aplicação usando tecnologias modernas.

## Sua Missão

Crie um PRD completo contendo:

### 1. Visão do Produto
- Declaração de visão (1-2 frases)
- Problema que estamos resolvendo
- Solução proposta

### 2. Objetivos e Métricas de Sucesso
Defina metas mensuráveis para:
- Segurança (ex: zero vulnerabilidades conhecidas)
- Qualidade de código (ex: 100% TypeScript, zero 'any')
- Performance (ex: tempo de resposta < 200ms)
- Funcionalidade (ex: paridade de features)

### 3. Escopo do Projeto

#### Funcionalidades IN-SCOPE (incluídas):
Liste as funcionalidades que SERÃO implementadas, com prioridade P0 (obrigatório) ou P1 (importante)

#### Funcionalidades OUT-OF-SCOPE (excluídas):
Liste as funcionalidades que NÃO serão implementadas nesta versão e justifique

### 4. Requisitos Funcionais
Para cada área funcional, crie uma tabela:

| ID | Requisito | Prioridade | Critério de Aceite |
|----|-----------|------------|-------------------|

Áreas a cobrir:
- Autenticação (FR-AUTH)
- Gestão de Projetos (FR-PROJ)
- Gestão de Tarefas (FR-TASK)
- Dashboard (FR-DASH)

### 5. Requisitos Não-Funcionais
Para cada categoria, defina requisitos específicos:

- Segurança (NFR-SEC): Como garantir que não há SQL injection, senhas seguras, etc.
- Performance (NFR-PERF): Tempos de resposta, carregamento de página
- Manutenibilidade (NFR-MAINT): Tipagem, estrutura de código, documentação

### 6. Histórias de Usuário
Crie histórias no formato:

```
US-XXX: [Título]
Como [tipo de usuário]
Eu quero [ação/funcionalidade]
Para que [benefício/valor]

Critérios de Aceite:
- [ ] Critério 1
- [ ] Critério 2
- [ ] ...
```

Crie histórias para:
- Registro de usuário (US-001)
- Login de usuário (US-002)
- Logout (US-003)
- Criar projeto (US-004)
- Visualizar projetos (US-005)
- Visualizar lista de tarefas (US-006)
- Criar tarefa (US-007)
- Editar tarefa (US-008)
- Excluir tarefa (US-009)
- Filtrar e ordenar tarefas (US-010)
- Visualizar estatísticas no dashboard (US-011)

### 7. Especificação de UI/UX
- Princípios de design (simplicidade, consistência, feedback, responsividade)
- Telas principais necessárias
- Hierarquia de componentes

### 8. Especificação de API
Tabela com endpoints:

| Método | Endpoint | Descrição | Autenticação |
|--------|----------|-----------|--------------|

### 9. Modelos de Dados
Defina interfaces TypeScript para:
- User
- Project
- Task
- TaskStats

### 10. Critérios de Release
- Checklist de "Definition of Done"
- Checklist de demonstração

### 11. Comparação: Legado vs Moderno
Tabela comparando aspectos do sistema antigo com o novo

### 12. Priorização de Implementação
Organize em sprints:
- Sprint 1 (P0 - Obrigatório)
- Sprint 2 (P1 - Importante)
- Sprint 3 (P2 - Desejável)

## Formato de Saída

Produza o documento em formato Markdown, com headers claros, tabelas formatadas e código em blocos quando apropriado.

## Entrada: Relatório do Analista

[INSIRA AQUI O RELATÓRIO GERADO PELO AGENTE ANALISTA NA FASE 1]
```

---

## 📎 Prompts Auxiliares

### Se precisar definir melhor o escopo:

```
Ajude-me a decidir o escopo do projeto. A aplicação legada tem estas funcionalidades:

1. Autenticação (login, registro, logout)
2. Gestão de Projetos (CRUD, membros de equipe)
3. Gestão de Tarefas (CRUD, status, prioridade, atribuição)
4. Comentários em tarefas
5. Anexos de arquivos
6. Registro de tempo (time tracking)
7. Log de atividades
8. Dashboard com estatísticas

Considerando uma demonstração de 2 horas com ~90 minutos de live coding, quais funcionalidades devemos:
- INCLUIR (obrigatório para a demo funcionar)
- EXCLUIR (muito complexo ou arriscado)

Justifique cada decisão.
```

### Se precisar detalhar histórias de usuário:

```
Expanda as histórias de usuário para a funcionalidade de Gestão de Tarefas.

Para cada história, inclua:
1. Descrição completa no formato "Como/Eu quero/Para que"
2. Pelo menos 5 critérios de aceite específicos
3. Dependências de outras histórias
4. Estimativa de complexidade (Baixa/Média/Alta)
5. Notas técnicas relevantes
```

### Se precisar definir endpoints de API:

```
Detalhe a especificação da API REST para a aplicação modernizada.

Para cada endpoint, forneça:
1. Método HTTP e caminho
2. Descrição da funcionalidade
3. Se requer autenticação
4. Corpo da requisição (com tipos TypeScript)
5. Corpo da resposta (com tipos TypeScript)
6. Possíveis códigos de erro

Organize por domínio: Auth, Projects, Tasks
```

---

## ✅ Checklist de Validação

Após receber o PRD do PM, verifique se contém:

- [ ] Visão clara do produto
- [ ] Métricas de sucesso mensuráveis
- [ ] Escopo bem definido (in/out)
- [ ] Requisitos funcionais com IDs e prioridades
- [ ] Requisitos não-funcionais de segurança
- [ ] Pelo menos 10 histórias de usuário
- [ ] Critérios de aceite para cada história
- [ ] Especificação básica de API
- [ ] Modelos de dados em TypeScript
- [ ] Priorização em sprints

---

## 📤 Saída Esperada

O PM deve gerar um documento similar a:
`bmad-docs/phase2-planning/01-prd.md`

Este documento será usado como entrada para o Agente Arquiteto na Fase 3.

---

## 🔗 Próximo Passo

Após concluir esta fase, vá para:
`03-arquiteto-prompt.md` (Fase 3: Arquiteto)
