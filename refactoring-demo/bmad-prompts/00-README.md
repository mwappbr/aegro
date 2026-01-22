# BMAD Prompts - Guia de Comandos para Agentes

## 📋 Visão Geral

Este diretório contém os **prompts/comandos** para serem enviados aos agentes BMAD durante a demonstração de refatoração do TaskMaster Pro.

Cada arquivo representa uma fase do método BMAD e contém os comandos exatos que você deve enviar ao respectivo agente.

---

## 🤖 Agentes BMAD e Seus Papéis

| Agente | Fase | Responsabilidade |
|--------|------|------------------|
| **Analista** | Fase 1 | Auditar código legado, identificar vulnerabilidades e débito técnico |
| **Product Manager (PM)** | Fase 2 | Definir requisitos, escopo e histórias de usuário |
| **Arquiteto** | Fase 3 | Projetar arquitetura técnica, escolher tecnologias |
| **Scrum Master (SM)** | Fase 4 | Criar stories de implementação, planejar sprint |

---

## 📁 Arquivos de Prompts

```
bmad-prompts/
├── 00-README.md                    # Este arquivo
├── 01-analista-prompt.md           # Comandos para o Agente Analista
├── 02-pm-prompt.md                 # Comandos para o Agente PM
├── 03-arquiteto-prompt.md          # Comandos para o Agente Arquiteto
└── 04-scrum-master-prompt.md       # Comandos para o Agente Scrum Master
```

---

## 🚀 Como Usar

### 1. Preparação
Antes de começar, certifique-se de ter:
- Acesso ao código legado em `legacy-php/`
- Uma ferramenta de IA configurada (Claude, GPT-4, etc.)

### 2. Executar Cada Fase em Ordem

```
Fase 1: Analista    → Gera relatório de auditoria
        ↓
Fase 2: PM          → Gera documento de requisitos (PRD)
        ↓
Fase 3: Arquiteto   → Gera documento de arquitetura
        ↓
Fase 4: Scrum Master → Gera stories de implementação
```

### 3. Para Cada Fase
1. Abra o arquivo de prompt correspondente
2. Copie o prompt completo
3. Cole no chat com o agente IA
4. Forneça os arquivos de código quando solicitado
5. Salve o resultado gerado

---

## ⚡ Dicas de Uso

### Fornecer Contexto
Sempre forneça o código fonte relevante junto com o prompt:
```
[Cole o prompt]

Aqui está o código para análise:

[Cole o conteúdo dos arquivos PHP]
```

### Iterar se Necessário
Se o resultado não estiver completo:
- Peça para expandir seções específicas
- Solicite mais detalhes sobre pontos importantes
- Peça exemplos de código quando apropriado

### Manter Consistência
Cada fase usa o resultado da anterior:
- Fase 2 usa o relatório da Fase 1
- Fase 3 usa o PRD da Fase 2
- Fase 4 usa a arquitetura da Fase 3

---

## 📝 Exemplo de Fluxo de Trabalho

```bash
# 1. Comece com o Analista
cat 01-analista-prompt.md
# Cole no chat + forneça código legado
# Salve resultado em bmad-docs/phase1-analysis/

# 2. Continue com o PM
cat 02-pm-prompt.md
# Cole no chat + forneça relatório do Analista
# Salve resultado em bmad-docs/phase2-planning/

# 3. Continue com o Arquiteto
cat 03-arquiteto-prompt.md
# Cole no chat + forneça PRD do PM
# Salve resultado em bmad-docs/phase3-solutioning/

# 4. Finalize com o Scrum Master
cat 04-scrum-master-prompt.md
# Cole no chat + forneça arquitetura
# Salve resultado em bmad-docs/phase4-implementation/
```

---

## 🎯 Objetivos da Demonstração

Ao final das 4 fases, você terá:

1. **Relatório de Auditoria** - Lista completa de vulnerabilidades e débito técnico
2. **PRD (Product Requirements Document)** - Requisitos funcionais e não-funcionais
3. **Documento de Arquitetura** - Design técnico completo
4. **Stories de Implementação** - Backlog pronto para desenvolvimento

---

*Boa demonstração!* 🚀
