# Technical Assumptions

## Repository Structure

**Monorepo** - Estrutura de repositório único contendo toda a aplicação frontend, facilitando manutenção e deploy para projeto de demonstração.

## Service Architecture

**Frontend-only Application com Service Layer:**
- Aplicação Single Page Application (SPA) sem backend próprio
- Camada de serviço (Service Layer) para abstrair todas as chamadas à API do HackerNews
- Possível necessidade de proxy simples caso haja limitações CORS da API do HackerNews
- Arquitetura baseada em componentes reutilizáveis Vue seguindo boas práticas (Composition API, composables)

**Framework Frontend:** Vue.js 3 (TypeScript) - Escolhido por:
- Ecossistema maduro com excelente suporte a acessibilidade
- TypeScript para type safety e melhor manutenibilidade
- Composition API moderna e reativa facilitando gestão de estado
- Documentação excelente e curva de aprendizado amigável
- Facilita demonstração de habilidades técnicas modernas

**Build Tool:** Vite - Build tool moderno e rápido, otimizado para desenvolvimento Vue

**Styling:** Tailwind CSS + Scoped Styles
- Tailwind para utility-first styling e responsividade rápida
- Vue scoped styles para componentes que necessitem estilos isolados
- Design tokens para paleta de cores e tipografia centralizados

## Testing Requirements

**Unit + Integration Testing:**
- **Unit Tests:** Testes de componentes individuais e funções utilitárias usando Vitest + Vue Test Utils
- **Integration Tests:** Testes de fluxos completos (buscar artigos → exibir → navegar comentários) usando Vue Test Utils
- **Accessibility Testing:** Testes automatizados com jest-axe/vitest-axe e validação manual com ferramentas como WAVE, Axe DevTools e Lighthouse
- **Manual Testing:** Testes manuais focados em navegação por teclado e experiência com leitores de tela (NVDA/JAWS)

**Coverage mínimo:** 70% para lógica de negócio e serviços de API

## Additional Technical Assumptions and Requests

- **Hosting:** Vercel ou Netlify para deploy estático com CI/CD automático a partir do repositório Git
- **Versionamento:** Git com commits semânticos seguindo Conventional Commits
- **Linting e Formatting:** ESLint + Prettier configurados com regras de acessibilidade (eslint-plugin-vuejs-accessibility)
- **Environment Variables:** Uso de variáveis de ambiente para configurações (ex: URL base da API, timeouts)
- **Error Handling:** Implementação de error handlers globais Vue (app.config.errorHandler) para tratamento gracioso de erros de componentes
- **Cache Strategy:** localStorage para cache básico de artigos recentemente visualizados (melhorar performance e permitir visualização offline limitada)
- **API Rate Limiting:** Implementar debounce/throttle em requisições quando apropriado para respeitar limites da API
- **Bundle Size:** Monitorar tamanho do bundle final, target <500KB para JavaScript bundle principal
- **Documentation:** README.md com instruções de setup, build e deploy; comentários em código para decisões não óbvias

---
