# 10. Critérios de Release

## 10.1 Definition of Done

Para considerar uma feature completa, todos os itens abaixo devem estar concluídos:

**Código:**
- [ ] Código implementado seguindo padrões do projeto
- [ ] TypeScript strict mode, zero erros de compilação
- [ ] Zero erros de ESLint
- [ ] Código revisado (code review)
- [ ] Sem código comentado ou não utilizado

**Testes:**
- [ ] Testes unitários escritos para lógica de negócio
- [ ] Testes de integração para endpoints da API
- [ ] Cobertura de testes >80% para código novo
- [ ] Todos os testes passando

**Documentação:**
- [ ] README atualizado se necessário
- [ ] Comentários JSDoc em funções públicas
- [ ] Changelog atualizado

**Funcionalidade:**
- [ ] Feature funciona conforme especificado
- [ ] Critérios de aceite da user story atendidos
- [ ] Validações de entrada implementadas
- [ ] Tratamento de erros implementado
- [ ] Mensagens de erro claras e úteis

**UI/UX:**
- [ ] Interface implementada conforme design
- [ ] Responsivo (pelo menos desktop)
- [ ] Loading states implementados
- [ ] Mensagens de feedback (sucesso/erro) implementadas
- [ ] Acessibilidade básica (labels, contraste)

**Segurança:**
- [ ] Validação de entrada no backend
- [ ] Autenticação/autorização verificada
- [ ] Sem vulnerabilidades conhecidas
- [ ] Secrets em variáveis de ambiente

## 10.2 Checklist de Demonstração

Antes da demo, verificar que todas as funcionalidades core funcionam:

**Autenticação:**
- [ ] Posso registrar um novo usuário
- [ ] Posso fazer login com credenciais válidas
- [ ] Login falha com credenciais inválidas
- [ ] Posso fazer logout
- [ ] Rotas protegidas redirecionam se não autenticado

**Projetos:**
- [ ] Posso criar um novo projeto
- [ ] Projeto aparece na lista após criação
- [ ] Posso editar nome e descrição do projeto
- [ ] Posso excluir projeto (e tarefas são removidas)

**Tarefas:**
- [ ] Posso criar uma nova tarefa com todos os campos
- [ ] Tarefa aparece na lista após criação
- [ ] Posso editar todos os campos da tarefa
- [ ] Posso alterar status da tarefa (pending → in_progress → completed)
- [ ] Posso excluir tarefa (com confirmação)
- [ ] Tarefas atrasadas são destacadas visualmente

**Filtros e Ordenação:**
- [ ] Posso filtrar tarefas por status
- [ ] Posso filtrar tarefas por prioridade
- [ ] Posso filtrar tarefas por projeto
- [ ] Filtros podem ser combinados
- [ ] Posso ordenar tarefas por diferentes critérios

**Dashboard:**
- [ ] Cards de estatísticas mostram números corretos
- [ ] Estatísticas atualizam quando tarefas mudam
- [ ] Card "Atrasadas" destaca tarefas em vermelho
- [ ] Posso adicionar tarefa rapidamente do dashboard
- [ ] Lista de tarefas funciona no dashboard

**Performance:**
- [ ] Página carrega em <3 segundos
- [ ] Ações (criar/editar) respondem em <200ms
- [ ] Sem erros no console do navegador
- [ ] Sem erros no servidor

---
