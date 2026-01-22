# 5. Requisitos Não-Funcionais

## 5.1 Segurança (NFR-SEC)

| ID | Requisito | Implementação |
|----|-----------|----------------|
| NFR-SEC-01 | Zero SQL Injection | Prisma ORM utiliza prepared statements em todas as queries. Nenhuma interpolação de strings em SQL. Validação de tipos em tempo de compilação. |
| NFR-SEC-02 | Hash de senhas seguro | bcrypt com cost factor 10+ (configurável via env). Nunca usar MD5, SHA1 ou algoritmos obsoletos. |
| NFR-SEC-03 | Autenticação JWT segura | JWT com algoritmo HS256. Token expira em 24h (configurável). Secret armazenado em variável de ambiente. Validação de assinatura em todas as requisições. |
| NFR-SEC-04 | Validação de entrada | Zod schemas em todos os endpoints da API. Validação de tipos, formatos (email, dates), e constraints (min/max length, ranges). Rejeitar requisições inválidas com erro 400. |
| NFR-SEC-05 | CORS configurado | CORS habilitado apenas para origens permitidas (whitelist). Headers apropriados (Access-Control-Allow-Origin, etc.). |
| NFR-SEC-06 | Variáveis de ambiente | Todas as credenciais, secrets e configurações sensíveis em arquivo `.env` (nunca commitado). Validação de variáveis obrigatórias no startup. |
| NFR-SEC-07 | Proteção contra XSS | Sanitização de entrada do usuário. React escapa automaticamente, mas validar dados no backend também. |
| NFR-SEC-08 | Rate limiting | Implementar rate limiting em endpoints de autenticação (prevenir brute force). Limite de requisições por IP. |
| NFR-SEC-09 | HTTPS obrigatório | Em produção, todas as comunicações via HTTPS. Redirecionar HTTP para HTTPS. |
| NFR-SEC-10 | Headers de segurança | Headers HTTP de segurança: X-Content-Type-Options, X-Frame-Options, X-XSS-Protection, Strict-Transport-Security. |

## 5.2 Performance (NFR-PERF)

| ID | Requisito | Meta |
|----|-----------|------|
| NFR-PERF-01 | Tempo de resposta da API | <200ms para operações CRUD (p95) |
| NFR-PERF-02 | Carregamento inicial da página | <3s (First Contentful Paint) |
| NFR-PERF-03 | Tempo de query no banco | <50ms por query (p95) |
| NFR-PERF-04 | Tamanho do bundle JavaScript | <500KB (gzipped) para página inicial |
| NFR-PERF-05 | Paginação | Listas com >20 itens devem ser paginadas (não carregar tudo de uma vez) |

## 5.3 Manutenibilidade (NFR-MAINT)

| ID | Requisito | Implementação |
|----|-----------|----------------|
| NFR-MAINT-01 | Type safety completo | TypeScript strict mode habilitado. Zero uso de `any`. Todas as funções com type hints e return types. |
| NFR-MAINT-02 | Estrutura de código | Arquitetura em camadas: Routes → Validators (Zod) → Services → Prisma. Separação clara de responsabilidades. |
| NFR-MAINT-03 | Tratamento de erros | Middleware centralizado de tratamento de erros. Erros padronizados com códigos HTTP apropriados. Logging estruturado. |
| NFR-MAINT-04 | Linting e formatação | ESLint + Prettier configurados. Zero erros de linting. Formatação automática no commit (pre-commit hooks). |
| NFR-MAINT-05 | Documentação | README com instruções de setup. Comentários JSDoc em funções públicas. Documentação de API (Swagger/OpenAPI opcional). |
| NFR-MAINT-06 | Testes | Cobertura mínima de 80%. Testes unitários para services e validators. Testes de integração para rotas da API. |
| NFR-MAINT-07 | Versionamento | Git com commits semânticos. Tags de versão. Changelog mantido. |
| NFR-MAINT-08 | CI/CD | Pipeline automatizado: lint → testes → build → deploy. Falha em qualquer etapa bloqueia deploy. |

---
