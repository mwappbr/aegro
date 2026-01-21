# Next Steps

## UX Expert Prompt

```
@ux-expert Olá! Acabei de finalizar o PRD do projeto "HackerNews Redesign for Senior Tech Enthusiasts" (docs/prd.md). 

Por favor, revise o documento e crie a especificação de design de interface (UI/UX) focando em:
- Design system com paleta azul acessível (WCAG AA)
- Componentes principais: StoryList, ArticleDetail, CommentThread
- Layouts responsivos para desktop, tablet e mobile
- Padrões de interação para expandir/colapsar comentários
- Estados de loading, erro e feedback visual

O projeto prioriza acessibilidade para usuários acima de 60 anos. Use este PRD como input para criar a especificação de arquitetura de UI.
```

## Architect Prompt

```
@architect Olá! O PRD do projeto "HackerNews Redesign for Senior Tech Enthusiasts" está completo (docs/prd.md).

Por favor, crie a arquitetura técnica detalhada para:
- Stack: Vue 3 + TypeScript + Vite + Tailwind CSS
- Frontend-only SPA consumindo HackerNews API
- Estrutura de componentes Vue (Composition API), composables e service layer
- Estratégias de cache, tratamento de erros e performance
- Configuração de testes (Vitest + Vue Test Utils + vitest-axe)
- Setup de CI/CD com Vercel/Netlify

Use este PRD como input para criar o documento de arquitetura completo.
```
