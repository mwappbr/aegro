# Fase 1: Prompt para o Agente Analista

## 🎯 Objetivo
Realizar uma auditoria completa do código legado PHP, identificando vulnerabilidades de segurança, débito técnico e problemas arquiteturais.

---

## 📋 Prompt Principal

```
Você é um Agente Analista especializado em auditoria de código legado. Sua tarefa é analisar uma aplicação PHP 5 chamada "TaskMaster Pro" e produzir um relatório completo de auditoria.

## Sua Missão

Analise o código fonte fornecido e produza um relatório técnico detalhado contendo:

### 1. Resumo Executivo
- Visão geral do estado atual da aplicação
- Nível de risco (Crítico/Alto/Médio/Baixo)
- Recomendação principal (manter/refatorar/reescrever)

### 2. Avaliação da Stack Tecnológica
Para cada tecnologia utilizada, avalie:
- Versão atual vs versão mais recente
- Status de suporte (ativo/depreciado/EOL)
- Nível de risco associado

### 3. Vulnerabilidades de Segurança
Para cada vulnerabilidade encontrada, documente:
- Categoria (SQL Injection, XSS, etc.)
- Severidade (Crítica/Alta/Média/Baixa)
- Localização exata (arquivo e linha)
- Código vulnerável
- Impacto potencial
- Recomendação de correção

### 4. Débito Técnico
Identifique e categorize:
- Funções depreciadas em uso
- Padrões de código problemáticos
- Falta de tipagem
- Ausência de testes
- Código duplicado
- Acoplamento excessivo

### 5. Análise Arquitetural
Avalie:
- Separação de responsabilidades
- Padrões de design utilizados
- Escalabilidade
- Manutenibilidade

### 6. Métricas do Código
Calcule aproximadamente:
- Total de linhas de código
- Número de arquivos
- Complexidade ciclomática estimada
- Cobertura de testes (se existir)

### 7. Recomendações Finais
- Ação recomendada (manter/patch/refatorar/reescrever)
- Justificativa
- Riscos de não agir
- Próximos passos sugeridos

## Formato de Saída

Produza o relatório em formato Markdown, organizado com headers claros e tabelas quando apropriado.

## Código para Análise

[INSIRA AQUI O CÓDIGO DOS SEGUINTES ARQUIVOS:]
- includes/config.php
- includes/database.php
- includes/functions.php
- includes/session.php
- classes/User.php
- classes/Task.php
- classes/Project.php
- classes/Attachment.php
- login.php
- dashboard.php
- database.sql
```

---

## 📎 Prompts Auxiliares

### Se precisar de mais detalhes sobre vulnerabilidades:

```
Expanda a seção de vulnerabilidades de segurança. Para cada vulnerabilidade SQL Injection encontrada, forneça:

1. O código exato que é vulnerável
2. Um exemplo de payload de ataque
3. O impacto específico desse ataque
4. A correção recomendada com código de exemplo

Foque especialmente nas classes User.php, Task.php e Project.php.
```

### Se precisar de análise de débito técnico mais detalhada:

```
Detalhe o débito técnico da aplicação. Crie uma tabela com:

| Arquivo | Problema | Severidade | Esforço para Corrigir |
|---------|----------|------------|----------------------|

Inclua todos os usos de funções mysql_* depreciadas e práticas de código problemáticas.
```

### Se precisar de recomendações mais específicas:

```
Com base na sua análise, responda:

1. Quanto tempo levaria para corrigir apenas as vulnerabilidades críticas sem refatorar?
2. Qual seria o custo de manutenção mensal estimado se mantivermos o código atual?
3. Quais são os 3 riscos mais urgentes que precisam de atenção imediata?
4. Se fôssemos migrar para uma stack moderna, qual você recomendaria e por quê?
```

---

## ✅ Checklist de Validação

Após receber o relatório do Analista, verifique se contém:

- [ ] Resumo executivo com recomendação clara
- [ ] Lista de todas as vulnerabilidades de SQL Injection
- [ ] Identificação do problema de hash MD5 para senhas
- [ ] Lista de credenciais hardcoded
- [ ] Avaliação das funções mysql_* depreciadas
- [ ] Problemas de upload de arquivos documentados
- [ ] Problemas de sessão documentados
- [ ] Recomendação final (deve ser "reescrever")

---

## 📤 Saída Esperada

O Analista deve gerar um documento similar a:
`bmad-docs/phase1-analysis/01-analyst-brief.md`

Este documento será usado como entrada para o Agente PM na Fase 2.

---

## 🔗 Próximo Passo

Após concluir esta fase, vá para:
`02-pm-prompt.md` (Fase 2: Product Manager)
