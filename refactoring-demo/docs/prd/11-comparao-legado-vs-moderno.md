# 11. Comparação: Legado vs Moderno

| Aspecto | Sistema Legado (PHP 5) | Sistema Moderno (TypeScript) |
|---------|------------------------|------------------------------|
| **Segurança** | 25+ vulnerabilidades críticas | 0 vulnerabilidades conhecidas |
| **SQL Injection** | 15+ instâncias (queries concatenadas) | 0 (Prisma ORM com prepared statements) |
| **Autenticação** | MD5 + salt hardcoded | bcrypt (cost 10+) |
| **Type Safety** | Nenhuma (PHP sem type hints) | 100% TypeScript strict mode |
| **Testes** | 0% cobertura | >80% cobertura (unit + integration) |
| **Estrutura de Código** | Procedural, globals, acoplado | Arquitetura em camadas, desacoplado |
| **Validação** | Inconsistente, `db_escape()` insuficiente | Zod schemas em todas as camadas |
| **Tratamento de Erros** | `die()`, sem exception handling | Middleware centralizado, logging estruturado |
| **ORM** | Nenhum (queries SQL manuais) | Prisma (type-safe, migrations) |
| **API** | Não existe (páginas PHP diretas) | API RESTful completa |
| **Frontend** | Bootstrap 3.3.7 + jQuery 1.12.4 | React 18 + Tailwind CSS |
| **Build System** | Nenhum | Webpack/Vite, hot reload |
| **CI/CD** | Não suportado | Pipeline automatizado |
| **Documentação** | Comentários esparsos | README, JSDoc, tipos TypeScript |
| **Manutenibilidade** | Muito baixa (código spaghetti) | Alta (código limpo, testável) |
| **Escalabilidade** | Não escalável | Preparado para escalar |
| **Developer Experience** | Ruim (sem autocomplete, sem tipos) | Excelente (IDE support completo) |
| **Linhas de Código** | ~3.600 (não tipado) | ~2.000 estimado (tipado) |
| **Dependências** | Manuais, sem gerenciador | npm/yarn, package.json |
| **Suporte** | PHP 5 EOL desde 2018 | Node.js 20 LTS (suporte até 2026+) |

---
