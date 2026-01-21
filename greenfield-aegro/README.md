# HN Acessível

Uma interface acessível para o Hacker News, desenvolvida com Vue 3, TypeScript e Tailwind CSS, seguindo as diretrizes WCAG 2.1 AA.

## Descrição

HN Acessível é uma aplicação web que oferece uma experiência de navegação inclusiva para o Hacker News. O projeto foi desenvolvido com foco em acessibilidade, garantindo que todos os usuários possam acessar e interagir com o conteúdo de forma eficiente.

### Características Principais

- **Acessibilidade WCAG 2.1 AA**: Navegação por teclado, leitores de tela, contraste adequado
- **Interface Responsiva**: Funciona em dispositivos móveis e desktop
- **Performance Otimizada**: Carregamento rápido e cache inteligente
- **TypeScript**: Tipagem estática para maior segurança do código

## Pré-requisitos

- **Node.js**: versão 18.x ou superior
- **npm**: versão 9.x ou superior

## Instalação

1. Clone o repositório:

```bash
git clone <repository-url>
cd greenfield-aegro
```

2. Instale as dependências:

```bash
npm install
```

3. Configure as variáveis de ambiente:

```bash
cp .env.example .env
```

4. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`

## Scripts Disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia o servidor de desenvolvimento com hot reload |
| `npm run build` | Gera a build de produção |
| `npm run preview` | Visualiza a build de produção localmente |
| `npm run test` | Executa os testes com Vitest |
| `npm run test:ui` | Executa os testes com interface visual |
| `npm run test:coverage` | Executa os testes e gera relatório de cobertura |
| `npm run lint` | Executa o ESLint para verificar o código |
| `npm run lint:fix` | Corrige automaticamente problemas de linting |
| `npm run format` | Formata o código com Prettier |
| `npm run type-check` | Verifica os tipos TypeScript |

## Estrutura do Projeto

```
src/
├── App.vue                    # Componente raiz
├── main.ts                    # Ponto de entrada da aplicação
├── router/
│   └── index.ts               # Configuração do Vue Router
├── assets/
│   ├── styles/
│   │   ├── main.css           # Estilos globais + Tailwind
│   │   └── variables.css      # Tokens de design (CSS custom properties)
│   └── fonts/                 # Arquivos de fonte (se self-hosted)
├── components/
│   ├── common/                # Componentes compartilhados/reutilizáveis
│   ├── layout/                # Componentes de layout (header, footer)
│   ├── story/                 # Componentes relacionados a histórias
│   └── comment/               # Componentes relacionados a comentários
├── composables/               # Funções de composição reutilizáveis (use* prefix)
├── services/
│   ├── api/                   # Clientes de API
│   └── cache/                 # Utilitários de cache
├── types/                     # Interfaces TypeScript
├── utils/                     # Funções utilitárias
├── views/                     # Componentes de página (rotas)
└── __tests__/                 # Testes (espelha a estrutura src/)
```

## Tech Stack

- **Vue 3.4.x** - Framework reativo com Composition API
- **TypeScript 5.3.x** - Tipagem estática
- **Vite 5.x** - Build tool e dev server
- **Tailwind CSS 3.4.x** - Framework de CSS utilitário
- **Vue Router 4.x** - Roteamento SPA
- **Vitest** - Framework de testes
- **ESLint + Prettier** - Linting e formatação

## Licença

Este projeto está sob a licença MIT.
