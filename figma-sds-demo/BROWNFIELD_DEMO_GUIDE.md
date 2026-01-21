# Brownfield Development Demo: Figma to React with BMAD Method

This guide walks you through using **Figma's Simple Design System (SDS)** repository to demonstrate how AI development agents can create new React components using the **BMAD (Breakthrough Method for Agile AI-Driven Development)**.

## Overview

This demo showcases:
- A real React codebase with existing components (brownfield scenario)
- Direct integration with a Figma design file
- Using the BMAD agent workflow: PM → Architect → SM → DEV
- Step-by-step AI agent prompts for each phase

## BMAD Agent Workflow

The BMAD method uses specialized AI agents working sequentially:

| Step | Agent | Role | Output |
|------|-------|------|--------|
| 1 | **PM (John)** | Product Manager | `docs/bmad/PRD.md` |
| 2 | **Architect (Winston)** | System Architect | `docs/bmad/architecture.md` |
| 3 | **SM (Bob)** | Scrum Master | `docs/bmad/story-1.1.md` |
| 4 | **DEV (Amelia)** | Developer | Implementation Code |

**👉 See [docs/bmad/BMAD_WORKFLOW_GUIDE.md](docs/bmad/BMAD_WORKFLOW_GUIDE.md) for complete agent prompts!**

## Resources

| Resource | Link |
|----------|------|
| **Figma Community File** | https://www.figma.com/community/file/1380235722331273046/simple-design-system |
| **Live Storybook** | https://figma.github.io/sds/storybook |
| **GitHub Repository** | https://github.com/figma/sds |

## Prerequisites

1. **Cursor IDE** with MCP support enabled
2. **Figma MCP Server** configured in Cursor (critical for design extraction)
3. **Figma account** (free tier works)
4. **Node.js 18+** installed

### Figma MCP Tools Used

Each BMAD agent uses Figma MCP to extract real design data:

| Tool | Purpose |
|------|---------|
| `figma_get_file` | Get file structure and pages |
| `figma_get_node` | Get component measurements (padding, gaps, sizes) |
| `figma_get_styles` | Extract typography and color styles |
| `figma_get_variables` | Get design tokens |
| `figma_get_components` | List all components in the file |

## Quick Setup

```bash
# Install dependencies
cd figma-sds-demo
npm install

# Start development server
npm run app:dev     # Runs at http://localhost:8000

# Or start Storybook
npm run storybook   # Runs at http://localhost:6006
```

## Project Structure

```
figma-sds-demo/
├── .cursor/
│   └── rules/
│       └── usage-guidelines.mdc    # Cursor AI instructions
├── src/
│   ├── ui/
│   │   ├── primitives/             # Atomic components (Button, Input, etc.)
│   │   ├── compositions/           # Complex components (Cards, Forms, etc.)
│   │   │   └── Cards/              # Existing card implementations
│   │   ├── layout/                 # Layout components (Flex, Section)
│   │   └── hooks/                  # Custom hooks
│   ├── figma/                      # Code Connect mappings
│   └── theme.css                   # Design tokens as CSS variables
├── figma.config.json               # Figma file URL substitutions
└── package.json
```

## Existing Card Components

The repository includes several card implementations in `src/ui/compositions/Cards/`:

| Component | Purpose |
|-----------|---------|
| `Card` | Base card with variants (default, stroke, brand) |
| `PricingCard` | Price tier display with features list |
| `ProductInfoCard` | Product details with image and rating |
| `ReviewCard` | User reviews with star ratings |
| `StatsCard` | Statistics/metrics display |
| `TestimonialCard` | Quote testimonials with avatar |

## Demo: Create a New Card Component with Cursor MCP

### Step 1: Open the Figma File

1. Open the [Figma Community File](https://www.figma.com/community/file/1380235722331273046/simple-design-system)
2. Duplicate it to your account (optional, for editing)
3. Navigate to the **Cards** component page

### Step 2: Configure Figma MCP in Cursor

Ensure your Cursor has the Figma MCP server configured. The server allows Cursor to:
- Extract design data from selected Figma nodes
- Get Code Connect information
- Access design tokens and variables

### Step 3: Create a New Feature Card

In Cursor, select a card design in Figma, then prompt the AI:

```
Using the selected Figma design, create a new FeatureCard component that follows
the existing Card patterns in this codebase. The card should:
1. Display an icon, title, and description
2. Support the same variants as the base Card (default, stroke, brand)
3. Use SDS design tokens and layout components
4. Follow the TypeScript patterns from existing cards
```

### Expected AI Workflow

The Cursor AI should:

1. **Use Figma MCP tools** to extract:
   - Component structure and props
   - Design tokens (colors, spacing, typography)
   - Code Connect mappings

2. **Read existing patterns** from:
   - `.cursor/rules/usage-guidelines.mdc` for coding guidelines
   - `src/ui/compositions/Cards/Cards.tsx` for component patterns
   - `src/theme.css` for available CSS variables

3. **Generate the component** following SDS conventions:
   - Use `clsx` for dynamic class names
   - Import from aliased paths (`primitives`, `layout`, `icons`)
   - Apply CSS variables for all styling
   - Create TypeScript interfaces for props

### Example Generated Code Structure

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

## Design Token Usage

Always use CSS variables from `src/theme.css`:

```css
/* Colors */
var(--sds-color-background-default-default)
var(--sds-color-text-default-default)
var(--sds-color-border-default-default)

/* Spacing */
var(--sds-size-space-200)  /* 8px */
var(--sds-size-space-400)  /* 16px */
var(--sds-size-space-600)  /* 24px */
var(--sds-size-space-800)  /* 32px */

/* Typography */
var(--sds-typography-heading-*)
var(--sds-typography-body-*)

/* Border Radius */
var(--sds-size-radius-200)
```

## Layout Components

Use SDS layout components instead of custom CSS:

```tsx
// Flexbox layouts
<Flex direction="row" gap="400" alignPrimary="center" alignSecondary="stretch">
  {children}
</Flex>

// Page sections
<Section variant="stroke" padding="600">
  {content}
</Section>
```

## Code Connect Integration

The `figma.config.json` maps Figma URLs to components using substitution keys:

```json
{
  "documentUrlSubstitutions": {
    "<FIGMA_CARDS_PRICING_CARD>": "https://figma.com/design/...?node-id=123-456"
  }
}
```

This enables Code Connect in Figma's Dev Mode to show the corresponding React code.

## Cursor Rules

The `.cursor/rules/usage-guidelines.mdc` file provides AI instructions including:
- Import alias conventions
- CSS variable usage requirements
- Component composition patterns
- Common pitfalls to avoid

## Testing Your Component

1. Add the component to Storybook:

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
    title: "Feature Title",
    description: "Feature description text",
    variant: "stroke",
  },
};
```

2. Run Storybook: `npm run storybook`

## BMAD Workflow Quick Start

### Option 1: Use Pre-Created Documents
The `docs/bmad/` folder already contains example BMAD artifacts:
- `PRD.md` - Product requirements for FeatureCard
- `architecture.md` - Technical architecture decisions
- `story-1.1.md` - Ready-to-implement user story

You can skip directly to the DEV agent to implement the component.

### Option 2: Run Full BMAD Workflow
Follow the detailed prompts in [docs/bmad/BMAD_WORKFLOW_GUIDE.md](docs/bmad/BMAD_WORKFLOW_GUIDE.md) to:
1. Have PM agent create fresh requirements
2. Have Architect agent design the solution
3. Have SM agent create implementation stories
4. Have DEV agent write the code

## Next Steps

- **Run the BMAD demo**: Follow [BMAD_WORKFLOW_GUIDE.md](docs/bmad/BMAD_WORKFLOW_GUIDE.md)
- Explore more components in the [Live Storybook](https://figma.github.io/sds/storybook)
- Set up Figma API authentication for Code Connect publishing
- Learn more about BMAD: [github.com/bmad-code-org/BMAD-METHOD](https://github.com/bmad-code-org/BMAD-METHOD)

## Troubleshooting

**Cursor can't access Figma data:**
- Ensure Figma MCP server is running and configured
- Check that you have the Figma file open and a node selected

**Components don't render correctly:**
- Verify CSS variables exist in `theme.css`
- Check import paths use the correct aliases
- Review the existing Card components for patterns

**Storybook errors:**
- Run `npm install` to ensure all dependencies
- Check for TypeScript errors in terminal output
