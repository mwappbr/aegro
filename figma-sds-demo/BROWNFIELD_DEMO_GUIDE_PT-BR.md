# Demo de Desenvolvimento Brownfield: Figma para React com Cursor MCP

Esta demo orienta você a usar o arquivo **Simple Design System (SDS)** do Figma para demonstrar como agentes de desenvolvimento com IA (como o Cursor com MCP) podem criar novos componentes React baseados em designs do Figma.

## Visão Geral

Esta demo apresenta:
- Uma base de código React real com componentes existentes
- Integração direta com um arquivo de design do Figma
- Uso das ferramentas MCP do Cursor para criar um novo componente Card a partir das especificações do Figma

## Recursos

| Recurso | Link |
|---------|------|
| **Arquivo da Comunidade Figma** | https://www.figma.com/community/file/1380235722331273046/simple-design-system |
| **Storybook Online** | https://figma.github.io/sds/storybook |
| **Repositório GitHub** | https://github.com/figma/sds |

## Pré-requisitos

1. **Cursor IDE** com suporte a MCP habilitado
2. **Conta Figma** (plano gratuito funciona)
3. **Node.js 18+** instalado
4. **Figma MCP Server** configurado no Cursor (para extração de design)

## Configuração Rápida

```bash
# Instalar dependências
cd figma-sds-demo
npm install

# Iniciar servidor de desenvolvimento
npm run app:dev     # Executa em http://localhost:8000

# Ou iniciar o Storybook
npm run storybook   # Executa em http://localhost:6006
```

## Estrutura do Projeto

```
figma-sds-demo/
├── .cursor/
│   └── rules/
│       └── usage-guidelines.mdc    # Instruções para IA do Cursor
├── src/
│   ├── ui/
│   │   ├── primitives/             # Componentes atômicos (Button, Input, etc.)
│   │   ├── compositions/           # Componentes complexos (Cards, Forms, etc.)
│   │   │   └── Cards/              # Implementações de cards existentes
│   │   ├── layout/                 # Componentes de layout (Flex, Section)
│   │   └── hooks/                  # Hooks customizados
│   ├── figma/                      # Mapeamentos do Code Connect
│   └── theme.css                   # Design tokens como variáveis CSS
├── figma.config.json               # Substituições de URL do Figma
└── package.json
```

## Componentes Card Existentes

O repositório inclui várias implementações de cards em `src/ui/compositions/Cards/`:

| Componente | Finalidade |
|------------|------------|
| `Card` | Card base com variantes (default, stroke, brand) |
| `PricingCard` | Exibição de planos de preços com lista de recursos |
| `ProductInfoCard` | Detalhes do produto com imagem e avaliação |
| `ReviewCard` | Avaliações de usuários com classificação por estrelas |
| `StatsCard` | Exibição de estatísticas/métricas |
| `TestimonialCard` | Depoimentos com citação e avatar |

## Demo: Criar um Novo Componente Card com Cursor MCP

### Passo 1: Abrir o Arquivo do Figma

1. Abra o [Arquivo da Comunidade Figma](https://www.figma.com/community/file/1380235722331273046/simple-design-system)
2. Duplique-o para sua conta (opcional, para edição)
3. Navegue até a página do componente **Cards**

### Passo 2: Configurar o Figma MCP no Cursor

Certifique-se de que seu Cursor tenha o servidor Figma MCP configurado. O servidor permite que o Cursor:
- Extraia dados de design dos nós selecionados no Figma
- Obtenha informações do Code Connect
- Acesse design tokens e variáveis

### Passo 3: Criar um Novo Feature Card

No Cursor, selecione um design de card no Figma e então faça o prompt para a IA:

```
Usando o design selecionado no Figma, crie um novo componente FeatureCard que siga
os padrões de Card existentes nesta base de código. O card deve:
1. Exibir um ícone, título e descrição
2. Suportar as mesmas variantes do Card base (default, stroke, brand)
3. Usar os design tokens e componentes de layout do SDS
4. Seguir os padrões TypeScript dos cards existentes
```

### Fluxo de Trabalho Esperado da IA

A IA do Cursor deve:

1. **Usar as ferramentas Figma MCP** para extrair:
   - Estrutura do componente e props
   - Design tokens (cores, espaçamento, tipografia)
   - Mapeamentos do Code Connect

2. **Ler os padrões existentes** de:
   - `.cursor/rules/usage-guidelines.mdc` para diretrizes de código
   - `src/ui/compositions/Cards/Cards.tsx` para padrões de componentes
   - `src/theme.css` para variáveis CSS disponíveis

3. **Gerar o componente** seguindo as convenções do SDS:
   - Usar `clsx` para nomes de classes dinâmicas
   - Importar de caminhos com alias (`primitives`, `layout`, `icons`)
   - Aplicar variáveis CSS para toda estilização
   - Criar interfaces TypeScript para props

### Exemplo de Estrutura de Código Gerado

```tsx
// src/ui/compositions/Cards/FeatureCard.tsx
import clsx from "clsx";
import { Flex } from "layout";
import { Text, TextHeading, TextSmall } from "primitives";
import { Card, CardProps } from "./Cards";
import { ReactNode } from "react";

export type FeatureCardProps = Pick<CardProps, "variant"> & {
  icon: ReactNode;
  title: string;
  description: string;
};

export function FeatureCard({
  icon,
  title,
  description,
  variant = "stroke",
}: FeatureCardProps) {
  return (
    <Card variant={variant} padding="600" direction="vertical" align="center">
      {icon}
      <Flex direction="column" alignSecondary="center" gap="200">
        <TextHeading>{title}</TextHeading>
        <TextSmall>{description}</TextSmall>
      </Flex>
    </Card>
  );
}
```

## Uso de Design Tokens

Sempre use variáveis CSS de `src/theme.css`:

```css
/* Cores */
var(--sds-color-background-default-default)
var(--sds-color-text-default-default)
var(--sds-color-border-default-default)

/* Espaçamento */
var(--sds-size-space-200)  /* 8px */
var(--sds-size-space-400)  /* 16px */
var(--sds-size-space-600)  /* 24px */
var(--sds-size-space-800)  /* 32px */

/* Tipografia */
var(--sds-typography-heading-*)
var(--sds-typography-body-*)

/* Raio da Borda */
var(--sds-size-radius-200)
```

## Componentes de Layout

Use os componentes de layout do SDS em vez de CSS customizado:

```tsx
// Layouts Flexbox
<Flex direction="row" gap="400" alignPrimary="center" alignSecondary="stretch">
  {children}
</Flex>

// Seções de página
<Section variant="stroke" padding="600">
  {content}
</Section>
```

## Integração com Code Connect

O `figma.config.json` mapeia URLs do Figma para componentes usando chaves de substituição:

```json
{
  "documentUrlSubstitutions": {
    "<FIGMA_CARDS_PRICING_CARD>": "https://figma.com/design/...?node-id=123-456"
  }
}
```

Isso habilita o Code Connect no Dev Mode do Figma para mostrar o código React correspondente.

## Regras do Cursor

O arquivo `.cursor/rules/usage-guidelines.mdc` fornece instruções para a IA incluindo:
- Convenções de alias de importação
- Requisitos de uso de variáveis CSS
- Padrões de composição de componentes
- Armadilhas comuns a evitar

## Testando Seu Componente

1. Adicione o componente ao Storybook:

```tsx
// src/stories/compositions/FeatureCard.stories.tsx
import { FeatureCard } from "compositions";
import { IconStar } from "icons";

export default {
  title: "Compositions/Cards/FeatureCard",
  component: FeatureCard,
};

export const Default = {
  args: {
    icon: <IconStar />,
    title: "Título do Recurso",
    description: "Texto de descrição do recurso",
    variant: "stroke",
  },
};
```

2. Execute o Storybook: `npm run storybook`

## Próximos Passos

- Explore mais componentes no [Storybook Online](https://figma.github.io/sds/storybook)
- Configure autenticação da API do Figma para publicação do Code Connect
- Tente criar outras composições (Formulários, Cabeçalhos, etc.)

## Solução de Problemas

**O Cursor não consegue acessar dados do Figma:**
- Certifique-se de que o servidor Figma MCP está rodando e configurado
- Verifique se você tem o arquivo do Figma aberto e um nó selecionado

**Componentes não renderizam corretamente:**
- Verifique se as variáveis CSS existem em `theme.css`
- Confira se os caminhos de importação usam os aliases corretos
- Revise os componentes Card existentes para entender os padrões

**Erros no Storybook:**
- Execute `npm install` para garantir todas as dependências
- Verifique erros de TypeScript na saída do terminal
