# Epic 4: Polish, Accessibility Validation & Deploy

**Goal:** Refinar design visual, validar conformidade total com WCAG 2.1 AA através de testes automatizados e manuais, implementar melhorias de performance identificadas, corrigir bugs encontrados, e fazer deploy final da aplicação com documentação completa. Garantir que a aplicação seja um projeto de demonstração profissional e pronto para inclusão em portfólio.

## Story 4.1: Visual Design Polish & Consistency

**Como** usuário,
**Eu quero** uma experiência visual consistente e profissional em toda a aplicação,
**Para que** eu tenha confiança na qualidade do produto e navegação intuitiva.

### Acceptance Criteria

1. Todos os componentes seguem consistentemente design tokens (cores, tipografia, espaçamento)
2. Estados hover, focus e active implementados de forma consistente em todos os elementos interativos
3. Transições suaves aplicadas a interações (hover, expand/collapse, page transitions)
4. Ícones consistentes utilizados em toda aplicação (biblioteca de ícones única)
5. Loading states visuais consistentes (mesmo spinner/skeleton pattern em toda app)
6. Error states visuais consistentes (mesmo design de mensagens de erro)
7. Espaçamento e padding revisados para generosidade e respirabilidade em todas as telas
8. Revisão completa de alinhamentos, garantindo grid visual consistente
9. Paleta de cores aplicada de forma harmoniosa sem exceções visuais estranhas

## Story 4.2: Automated Accessibility Testing

**Como** desenvolvedor,
**Eu quero** validar acessibilidade automaticamente,
**Para que** possamos garantir conformidade WCAG 2.1 AA de forma consistente.

### Acceptance Criteria

1. jest-axe configurado e integrado aos testes de componentes
2. Testes de acessibilidade criados para todos os componentes principais (Layout, StoryList, ArticleDetail, Comment)
3. Lighthouse CI configurado e executando em builds
4. Score de acessibilidade Lighthouse de 100 alcançado em todas as páginas principais
5. Axe DevTools browser extension utilizado para varredura manual das páginas
6. WAVE tool utilizado para validação adicional
7. Todos os issues reportados por ferramentas automatizadas corrigidos
8. Documentação de resultados de testes em arquivo (ex: ACCESSIBILITY.md)

## Story 4.3: Manual Accessibility Testing & Keyboard Navigation

**Como** QA ou desenvolvedor,
**Eu quero** validar acessibilidade manualmente com ferramentas assistivas reais,
**Para que** possamos garantir experiência funcional além de conformidade técnica.

### Acceptance Criteria

1. Teste completo de navegação via teclado realizado em todas as páginas (apenas Tab, Enter, Space, Arrows)
2. Teste com leitor de tela realizado (NVDA, JAWS, ou VoiceOver) em fluxos principais
3. Checklist WCAG 2.1 AA preenchida documentando conformidade de cada critério
4. Contraste de cores validado manualmente com ferramentas (ex: Contrast Checker)
5. Todos os issues encontrados documentados e corrigidos
6. Fluxo completo testado: home → artigo → expandir comentários → voltar home
7. Teste em diferentes resoluções e dispositivos (desktop, tablet, mobile)
8. Documentação de resultados de testes manuais (screenshots, notas)

## Story 4.4: Performance Optimization

**Como** usuário,
**Eu quero** que a aplicação carregue rapidamente e responda de forma fluida,
**Para que** eu tenha experiência agradável sem frustrações de performance.

### Acceptance Criteria

1. Bundle size analisado e otimizado (target: <500KB para main bundle)
2. Code splitting implementado para rotas (lazy loading de ArticleDetail page com defineAsyncComponent)
3. Imagens (se houver) otimizadas e com lazy loading
4. Componentes otimizados com v-once, v-memo ou computed properties onde apropriado
5. API responses cacheadas em localStorage com estratégia de invalidação (ex: cache de 5 minutos)
6. Lighthouse Performance score de pelo menos 90 alcançado
7. Tempo de carregamento inicial <3 segundos em conexão de banda larga (tested com throttling)
8. Sem jank ou stuttering ao scrollar listas longas ou expandir comentários

## Story 4.5: Error Handling & Edge Cases

**Como** usuário,
**Eu quero** experiência robusta mesmo quando algo dá errado,
**Para que** eu possa continuar usando a aplicação ou entender claramente o problema.

### Acceptance Criteria

1. Todas as chamadas de API têm tratamento de erro robusto
2. Mensagens de erro são claras, em português, e indicam próximos passos
3. Error boundary implementado no nível de app capturando erros de componente
4. Página de fallback de erro friendly exibida quando error boundary captura erro
5. Casos extremos testados: artigo sem comentários, artigo deletado, network offline, API timeout
6. Loading states não ficam "travados" indefinidamente (timeouts implementados)
7. Botões "Tentar novamente" funcionam corretamente em situações de erro
8. Console errors revisados e corrigidos (zero errors no console em uso normal)

## Story 4.6: Documentation & Code Quality

**Como** desenvolvedor futuro ou revisor do projeto,
**Eu quero** documentação clara e código bem organizado,
**Para que** eu possa entender rapidamente o projeto e fazer manutenções.

### Acceptance Criteria

1. README.md completo com: descrição do projeto, screenshots, instruções de setup, build, deploy
2. ACCESSIBILITY.md documentando decisões de design acessível e resultados de testes
3. Comentários em código para decisões não óbvias ou complexas
4. Tipos TypeScript utilizados consistentemente em todo código (minimal use of `any`)
5. Componentes organizados em estrutura de pastas lógica
6. Código formatado consistentemente (Prettier executado em todo codebase)
7. Linting passa sem erros ou warnings
8. package.json com scripts documentados (dev, build, test, lint)
9. LICENSE file adicionado ao repositório (MIT ou similar open source license)

## Story 4.7: Final Deploy & Production Validation

**Como** stakeholder do projeto,
**Eu quero** aplicação deployada e funcional em produção,
**Para que** possamos demonstrar o projeto e incluir em portfólio.

### Acceptance Criteria

1. Build de produção otimizado criado e deployado em Vercel/Netlify
2. URL de produção funcionando e acessível publicamente
3. Testes de smoke realizados em produção: home carrega, artigo carrega, comentários carregam
4. Verificação de que API calls funcionam em produção (não apenas localhost)
5. Lighthouse audit executado em URL de produção com scores satisfatórios
6. Testes em múltiplos navegadores: Chrome, Firefox, Safari, Edge
7. README atualizado com link para aplicação live
8. Screenshots da aplicação adicionados ao README
9. Custom domain configurado (opcional, se disponível)
10. Analytics básico configurado (Google Analytics ou similar) para demonstração (opcional)

---
