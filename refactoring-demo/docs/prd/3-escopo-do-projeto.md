# 3. Escopo do Projeto

## 3.1 Funcionalidades IN-SCOPE (Incluídas)

### Prioridade P0 (Obrigatório - MVP)

1. **Autenticação Completa**
   - Registro de usuário com validação
   - Login com JWT
   - Logout e gerenciamento de sessão
   - Proteção de rotas autenticadas

2. **Gestão de Projetos (CRUD)**
   - Criar projeto (nome, descrição)
   - Listar projetos do usuário
   - Editar projeto
   - Excluir projeto (com cascade para tarefas)

3. **Gestão de Tarefas (CRUD Completo)**
   - Criar tarefa (título, descrição, prioridade, data de vencimento, projeto)
   - Listar tarefas com filtros
   - Editar tarefa (todos os campos + status)
   - Excluir tarefa
   - Atualizar status (pending → in_progress → completed)

4. **Dashboard com Estatísticas**
   - Cards com contadores (total, pending, in_progress, completed, overdue)
   - Lista de tarefas com filtros e ordenação
   - Destaque visual para tarefas atrasadas

### Prioridade P1 (Importante - Fase 2)

5. **Filtros e Ordenação Avançados**
   - Filtrar por status, prioridade, projeto
   - Ordenar por data de criação, vencimento, prioridade
   - Busca por texto (título, descrição)

6. **Atribuição de Tarefas**
   - Atribuir tarefa a usuário
   - Visualizar tarefas atribuídas

7. **Melhorias de UX**
   - Feedback visual em todas as ações
   - Loading states
   - Mensagens de erro claras
   - Validação em tempo real de formulários

## 3.2 Funcionalidades OUT-OF-SCOPE (Excluídas)

| Funcionalidade | Justificativa |
|----------------|---------------|
| **Anexos de Arquivos** | Feature complexa com riscos de segurança (upload, validação de tipo, armazenamento). Requer implementação cuidadosa de validação de MIME type, magic bytes, e armazenamento seguro. Deixar para versão futura. |
| **Sistema de Comentários** | Adiciona complexidade de real-time updates e notificações. Não é essencial para MVP. |
| **Time Tracking (Registro de Tempo)** | Requer UI adicional complexa e lógica de cálculo. Pode ser adicionado posteriormente. |
| **Log de Atividades Detalhado** | Sistema legado tinha activity_log, mas para MVP focamos em funcionalidades core. |
| **Notificações por Email** | Requer integração com serviço de email e templates. Não crítico para demo. |
| **Painel Administrativo** | Sistema de roles e permissões adiciona complexidade. MVP foca em usuário único. |
| **Múltiplos Membros por Projeto** | Simplificação: cada projeto tem um dono. Colaboração pode ser adicionada depois. |
| **Tags e Categorias** | Sistema legado tinha tags como VARCHAR, mas para MVP focamos em projetos como organização. |
| **Versão Mobile** | Foco inicial em desktop. Responsividade básica, mas não app mobile nativo. |
| **Integrações Externas** | APIs de terceiros (Slack, GitHub, etc.) ficam para versões futuras. |

**Justificativa Geral**: O escopo foi definido para permitir uma demonstração funcional completa em ~90 minutos de desenvolvimento, focando nas funcionalidades core que demonstram a modernização e segurança da aplicação.

---
