---
stepsCompleted: [codebase-analysis, adr, component-design, integration, file-changes]
inputDocuments: [PRD.md, existing-cards-analysis]
workflowType: 'architecture'
---

# Architecture Document - FeatureCard Component

**Author:** Mauro (via Architect Agent Winston)
**Date:** 2026-01-21
**PRD Reference:** docs/bmad/PRD.md

---

## 1. Existing Codebase Analysis

### Current Component Tree
```
src/ui/
├── primitives/                 # Atomic components
│   ├── Text/
│   │   ├── Text.tsx           # Base text + variants
│   │   └── index.ts
│   ├── Icon/
│   │   └── Icon.tsx           # Icon wrapper
│   └── ...
├── compositions/              # Complex components
│   ├── Cards/
│   │   ├── Cards.tsx          # Card + PricingCard + ProductInfoCard + ...
│   │   ├── cards.css          # Shared card styles
│   │   └── index.ts           # Barrel export
│   └── ...
├── layout/                    # Layout utilities
│   ├── Flex/
│   │   └── Flex.tsx           # Flexbox wrapper
│   └── Section/
└── icons/                     # Generated icon components
    ├── IconStar.tsx
    └── ...
```

### Established Patterns

#### Pattern 1: Composition over Inheritance
Cards compose primitives rather than extend them:
```tsx
// Good: Composition
<Card variant="stroke">
  <TextHeading>Title</TextHeading>
  <TextSmall>Description</TextSmall>
</Card>

// Not used: Inheritance
class PricingCard extends Card { ... }
```

#### Pattern 2: CSS Variables for All Styling
```css
/* All values are tokens */
.card {
  padding: var(--sds-size-space-600);
  gap: var(--sds-size-space-400);
  background: var(--sds-color-background-default-default);
}
```

#### Pattern 3: clsx for Dynamic Classes
```tsx
import clsx from "clsx";

<div className={clsx(
  "card",
  `card-variant-${variant}`,
  `card-padding-${padding}`,
  className
)} />
```

#### Pattern 4: TypeScript with Pick/Omit
```tsx
export type PricingCardProps = Pick<CardProps, "variant"> & {
  title: string;
  price: string;
  features: string[];
};
```

---

## 2. Architecture Decision Records (ADR)

### ADR-001: Component File Location

**Decision**: Create `FeatureCard.tsx` as a separate file in `Cards/` directory

**Options Considered**:

| Option | Pros | Cons |
|--------|------|------|
| A: Add to Cards.tsx | Single file, co-located | File grows large, harder to maintain |
| B: New FeatureCard.tsx | **Modular**, follows existing pattern | Additional file |
| C: New directory | Maximum isolation | Over-engineering for single component |

**Chosen**: Option B

**Rationale**:
- Existing complex cards (would be in separate files if codebase grew)
- Easier code review and maintenance
- Follows principle of single responsibility
- Current Cards.tsx is already substantial

### ADR-002: Base Component Reuse

**Decision**: Compose using existing Card component

**Rationale**:
- Card already handles variants (default, stroke, brand)
- Card handles padding options
- Card handles direction and alignment
- DRY: No duplicate variant logic

```tsx
// FeatureCard composes Card
export function FeatureCard(props) {
  return (
    <Card variant={props.variant} padding="600" direction="vertical">
      {/* FeatureCard-specific content */}
    </Card>
  );
}
```

### ADR-003: Styling Approach

**Decision**: Add FeatureCard-specific styles to existing `cards.css`

**Rationale**:
- Keeps card styles co-located
- Shares CSS custom properties
- Follows existing pattern
- Avoids CSS module complexity

---

## 3. Component Architecture

### Component Diagram
```
┌─────────────────────────────────────────────┐
│              FeatureCard                     │
│  ┌────────────────────────────────────────┐ │
│  │              Card (base)                │ │
│  │  variant, padding, direction, align     │ │
│  │  ┌──────────────────────────────────┐  │ │
│  │  │    .feature-card-icon            │  │ │
│  │  │    {icon} (ReactNode)            │  │ │
│  │  └──────────────────────────────────┘  │ │
│  │  ┌──────────────────────────────────┐  │ │
│  │  │    Flex (column, center)         │  │ │
│  │  │    ┌────────────────────────┐    │  │ │
│  │  │    │ TextHeading (title)    │    │  │ │
│  │  │    └────────────────────────┘    │  │ │
│  │  │    ┌────────────────────────┐    │  │ │
│  │  │    │ TextSmall (description)│    │  │ │
│  │  │    └────────────────────────┘    │  │ │
│  │  └──────────────────────────────────┘  │ │
│  └────────────────────────────────────────┘ │
└─────────────────────────────────────────────┘
```

### Props Interface
```typescript
import { CardProps } from "./Cards";

export type FeatureCardProps = Pick<CardProps, "variant"> & {
  /** Icon element (typically from icons/) */
  icon: ReactNode;

  /** Feature title */
  title: string;

  /** Feature description */
  description: string;

  /** Additional CSS classes */
  className?: string;
};
```

### Implementation Skeleton
```tsx
import clsx from "clsx";
import { ReactNode } from "react";
import { Card, CardProps } from "./Cards";
import { Flex } from "layout";
import { TextHeading, TextSmall } from "primitives";
import "./cards.css";

export function FeatureCard({
  icon,
  title,
  description,
  variant = "stroke",
  className,
}: FeatureCardProps) {
  return (
    <Card
      variant={variant}
      padding="600"
      direction="vertical"
      align="center"
      className={clsx("feature-card", className)}
    >
      <div className="feature-card-icon" aria-hidden="true">
        {icon}
      </div>
      <Flex direction="column" alignSecondary="center" gap="200">
        <TextHeading>{title}</TextHeading>
        <TextSmall className="feature-card-description">
          {description}
        </TextSmall>
      </Flex>
    </Card>
  );
}
```

---

## 4. Integration Points

### Import Path
```tsx
// Developers will import as:
import { FeatureCard } from "compositions";

// Which resolves to:
// src/ui/compositions/index.ts
//   → src/ui/compositions/Cards/index.ts
//     → src/ui/compositions/Cards/FeatureCard.tsx
```

### Export Chain
```
src/ui/compositions/Cards/FeatureCard.tsx
  ↓ export { FeatureCard, FeatureCardProps }
src/ui/compositions/Cards/index.ts
  ↓ export * from "./FeatureCard"
src/ui/compositions/index.ts
  ↓ export * from "./Cards"
```

### Storybook Integration
```
src/stories/compositions/FeatureCard.stories.tsx
  → imports from "compositions"
  → appears at: Compositions/Cards/FeatureCard
```

---

## 5. File Changes Required

### New Files
| File | Purpose |
|------|---------|
| `src/ui/compositions/Cards/FeatureCard.tsx` | Component implementation |
| `src/stories/compositions/FeatureCard.stories.tsx` | Storybook stories |

### Modified Files
| File | Change |
|------|--------|
| `src/ui/compositions/Cards/cards.css` | Add `.feature-card` styles |
| `src/ui/compositions/Cards/index.ts` | Add FeatureCard export |

### Optional (Code Connect)
| File | Change |
|------|--------|
| `src/figma/compositions/FeatureCard.figma.tsx` | Figma Code Connect |
| `figma.config.json` | Add URL substitution |

---

## 6. Design Token Mapping

### Figma MCP Extraction

Before implementation, extract exact values using Figma MCP:

```javascript
// Get component structure and measurements
figma_get_node({
  fileKey: "1380235722331273046",
  nodeId: "FEATURE_CARD_NODE_ID"
})

// Get typography styles
figma_get_styles({ fileKey: "1380235722331273046" })

// Get color/spacing variables
figma_get_variables({ fileKey: "1380235722331273046" })
```

### Figma → CSS Variables

| Figma Property | MCP Path | Figma Value | CSS Variable |
|----------------|----------|-------------|--------------|
| Padding | `node.paddingTop` | 24px | `--sds-size-space-600` |
| Icon-Content Gap | `node.itemSpacing` | 16px | `--sds-size-space-400` |
| Title-Desc Gap | `children[1].itemSpacing` | 8px | `--sds-size-space-200` |
| Icon Container | `children[0].width` | 32px | `--sds-size-space-800` |
| Corner Radius | `node.cornerRadius` | 8px | `--sds-size-radius-200` |
| Desc Color | `node.fills[0].color` | Gray | `--sds-color-text-default-secondary` |

### Typography Mapping
| Element | Primitive | Figma Style | MCP Verification |
|---------|-----------|-------------|------------------|
| Title | `<TextHeading>` | Heading/Small | `figma_get_styles` → match font-size |
| Description | `<TextSmall>` | Body/Small | `figma_get_styles` → match font-size |

**Note**: Use `figma_get_node` to verify these mappings match the current Figma file before implementation.

---

## 7. Testing Strategy

### Visual Testing (Storybook)
- Default variant story
- Stroke variant story
- Brand variant story
- No-icon edge case
- Long text edge case

### Manual Verification
```bash
# Start Storybook
npm run storybook

# Verify at http://localhost:6006
# Navigate to Compositions/Cards/FeatureCard
```

### Accessibility Testing
- Screen reader test: Verify content announced correctly
- Icon should be `aria-hidden="true"` (decorative)
- Text should be readable by assistive technology

### Design Token Verification
1. Open browser DevTools
2. Inspect FeatureCard element
3. Verify computed styles use `--sds-*` variables
4. No hardcoded pixel values

---

## 8. Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Card base component changes | Low | Medium | Pin to current API |
| CSS variable naming changes | Low | High | Use existing token names only |
| Import path changes | Low | Medium | Follow established pattern |

---

## 9. Future Considerations

### Potential Extensions (Not in Scope)
- `FeatureCardInteractive`: With onClick/href support
- `FeatureCardWithCTA`: With action button
- `FeatureCardGrid`: Layout component for multiple cards

### Code Connect
When Figma API token is configured:
```bash
npx figma connect publish
```

This will sync the FeatureCard Code Connect to Figma Dev Mode.
