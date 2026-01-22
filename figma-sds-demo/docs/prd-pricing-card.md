# Figma SDS - Pricing Card Enhancement PRD

**Version:** 1.0  
**Author:** Mauro (via PM Agent John)  
**Date:** 2026-01-21  
**Project:** Figma Simple Design System (Brownfield)  
**Status:** Draft

---

## 1. Intro Project Analysis and Context

### 1.1 Analysis Source

- **Type:** IDE-based fresh analysis + Figma MCP extraction
- **Figma Node ID:** `3007:870` (Pricing Card)
- **Codebase Location:** `src/ui/compositions/Cards/Cards.tsx`

### 1.2 Current Project State

The Figma Simple Design System (SDS) React codebase is a mature brownfield design system with:

| Aspect | Details |
|--------|---------|
| **Framework** | React 18+ with TypeScript |
| **Styling** | CSS Modules + CSS Custom Properties (design tokens) |
| **Utilities** | clsx for className composition |
| **Documentation** | Storybook |
| **Design Tokens** | Auto-generated from Figma Variables (`src/theme.css`) |

**Existing Card Components:**
- `Card` - Base component with variants (default, stroke, brand)
- `PricingCard` - Current pricing tier display
- `ProductInfoCard` - Product showcase
- `ReviewCard` - Customer reviews
- `StatsCard` - Metric display
- `TestimonialCard` - Quote display

### 1.3 Available Documentation

| Document | Status | Location |
|----------|--------|----------|
| Architecture | ✅ Available | `docs/bmad/architecture.md` |
| Design Tokens | ✅ Available | `src/theme.css` |
| Component Source | ✅ Available | `src/ui/compositions/Cards/` |
| Storybook | ✅ Available | Component stories |

### 1.4 Enhancement Scope Definition

**Enhancement Type:** ✅ Major Feature Modification

**Enhancement Description:**  
Verify and enhance the existing `PricingCard` component to achieve pixel-perfect alignment with the Figma SDS "Pricing Card" design, based on MCP-extracted specifications.

**Impact Assessment:** ✅ Moderate Impact (some existing code changes)

The enhancement may require:
- Adjusting spacing/padding values
- Updating typography usage
- Adding missing props or variants
- Creating Code Connect mapping

### 1.5 Goals

1. **Figma-Code Parity**: Ensure PricingCard matches Figma design specs exactly
2. **Token Compliance**: Verify all SDS design tokens are correctly applied
3. **Code Connect**: Enable Figma Dev Mode integration
4. **Accessibility**: Maintain WCAG 2.1 AA compliance
5. **Documentation**: Update Storybook with accurate examples

### 1.6 Background Context

The PricingCard is a critical composition for SaaS landing pages, pricing tables, and subscription UIs. While the current implementation is functional, this enhancement ensures:

1. Design handoff accuracy for teams using Figma Dev Mode
2. Consistent visual language across design and code
3. Reduced implementation time for developers copying from Figma

### 1.7 Change Log

| Change | Date | Version | Description | Author |
|--------|------|---------|-------------|--------|
| Initial Draft | 2026-01-21 | 1.0 | PRD created from Figma MCP extraction | PM Agent John |

---

## 2. Requirements

### 2.1 Functional Requirements

#### FR1: Core Component Structure
| ID | Requirement | Priority | Status |
|----|-------------|----------|--------|
| FR1.1 | Component renders title using `TextHeading` primitive | Must | ✅ Exists |
| FR1.2 | Component displays price with currency and interval label | Must | ✅ Exists |
| FR1.3 | Component renders feature list using `TextList`/`TextListItem` | Must | ✅ Exists |
| FR1.4 | Component includes CTA button with configurable text | Must | ✅ Exists |
| FR1.5 | Support `listSlot` prop for custom list content | Should | ✅ Exists |

#### FR2: Variant Support
| ID | Requirement | Priority | Status |
|----|-------------|----------|--------|
| FR2.1 | Support `variant="default"` (white background, no border) | Must | ✅ Exists |
| FR2.2 | Support `variant="stroke"` (bordered with drop shadow) | Must | ✅ Exists |
| FR2.3 | Support `variant="brand"` (brand background, inverted text) | Must | ✅ Exists |

#### FR3: Size Variants
| ID | Requirement | Priority | Status |
|----|-------------|----------|--------|
| FR3.1 | Support `size="large"` (vertical layout, centered) | Must | ✅ Exists |
| FR3.2 | Support `size="small"` (horizontal price layout, compact) | Must | ✅ Exists |

#### FR4: Design Token Usage (from Figma MCP)
| ID | Requirement | Figma Token | CSS Variable | Priority |
|----|-------------|-------------|--------------|----------|
| FR4.1 | Padding must use space-800 (32px) for large size | `--sds-size-space-800` | `var(--sds-size-space-800)` | Must |
| FR4.2 | Padding must use space-600 (24px) for small size | `--sds-size-space-600` | `var(--sds-size-space-600)` | Must |
| FR4.3 | Content gap must use space-600 (24px) | `--sds-size-space-600` | `var(--sds-size-space-600)` | Must |
| FR4.4 | Border radius must use radius-200 (8px) | `--sds-size-radius-200` | `var(--sds-size-radius-200)` | Must |
| FR4.5 | Border must use stroke-border (1px) | `--sds-size-stroke-border` | `var(--sds-size-stroke-border)` | Must |
| FR4.6 | Background (default) must use background-default-default | `--sds-color-background-default-default` | `#ffffff` | Must |
| FR4.7 | Border color must use border-default-default | `--sds-color-border-default-default` | `#d9d9d9` | Must |
| FR4.8 | Text primary must use text-default-default | `--sds-color-text-default-default` | `#1e1e1e` | Must |
| FR4.9 | Text secondary must use text-default-secondary | `--sds-color-text-default-secondary` | `#757575` | Must |

#### FR5: Typography (from Figma MCP)
| ID | Requirement | Figma Style | Priority |
|----|-------------|-------------|----------|
| FR5.1 | Title uses Heading style (Inter Semi Bold 24px) | `TextHeading` | Must |
| FR5.2 | Price uses Title Page style (Inter Bold 48px) | `TextPrice` | Must |
| FR5.3 | Currency uses Subtitle Small style (Inter Bold 24px) | `TextPrice` currency | Must |
| FR5.4 | Interval label uses Body Small (Inter Regular 14px) | `TextPrice` label | Must |
| FR5.5 | List items use Body Base (Inter Regular 16px) | `TextListItem` | Must |
| FR5.6 | Button text uses Body Base (Inter Regular 16px) | `Button` | Must |

#### FR6: Accessibility
| ID | Requirement | Priority | Status |
|----|-------------|----------|--------|
| FR6.1 | Price must be announced as complete value (e.g., "$50 per month") | Must | 🔍 Verify |
| FR6.2 | Button must have accessible name | Must | ✅ Exists |
| FR6.3 | Card structure must use semantic HTML | Should | ✅ Exists |
| FR6.4 | Focus states must be visible | Must | ✅ Exists |

### 2.2 Non-Functional Requirements

#### NFR1: Code Quality
| ID | Requirement | Priority |
|----|-------------|----------|
| NFR1.1 | TypeScript with exported `PricingCardProps` interface | Must |
| NFR1.2 | Follow existing component patterns (clsx, CSS modules) | Must |
| NFR1.3 | No console warnings or errors | Must |
| NFR1.4 | Props documented with JSDoc comments | Should |

#### NFR2: Documentation
| ID | Requirement | Priority |
|----|-------------|----------|
| NFR2.1 | Storybook stories for all variants and sizes | Must |
| NFR2.2 | Storybook controls for interactive prop exploration | Should |
| NFR2.3 | Usage examples in story descriptions | Should |

#### NFR3: Figma Integration
| ID | Requirement | Priority |
|----|-------------|----------|
| NFR3.1 | Code Connect mapping file created | Should |
| NFR3.2 | Props mapped to Figma component properties | Should |
| NFR3.3 | Variant mapping documented | Should |

#### NFR4: Performance
| ID | Requirement | Priority |
|----|-------------|----------|
| NFR4.1 | No unnecessary re-renders on prop changes | Should |
| NFR4.2 | CSS-only hover/focus states (no JS event handlers for visuals) | Should |
| NFR4.3 | Bundle size impact < 1KB gzipped | Should |

### 2.3 Compatibility Requirements

| ID | Requirement | Description |
|----|-------------|-------------|
| CR1 | API Compatibility | Existing `PricingCardProps` interface must not have breaking changes |
| CR2 | Style Compatibility | Visual appearance must remain consistent with current implementation |
| CR3 | Integration Compatibility | Must work with existing `pricingPlanToPricingCardProps` helper |
| CR4 | Storybook Compatibility | Existing stories must continue to render correctly |

---

## 3. User Interface Enhancement Goals

### 3.1 Integration with Existing UI

The PricingCard enhancement integrates with:

| Component | Integration |
|-----------|-------------|
| `Card` (base) | Uses Card for container, variants, and padding |
| `Flex` | Uses Flex for internal layout composition |
| `TextHeading` | Renders plan title |
| `TextPrice` | Renders price display with currency and label |
| `TextList` / `TextListItem` | Renders feature list |
| `Button` / `ButtonGroup` | Renders CTA action |

### 3.2 Modified/New Screens and Views

| Location | Change Type | Description |
|----------|-------------|-------------|
| Storybook: Compositions/Cards/PricingCard | Enhancement | Update stories with accurate Figma-aligned examples |
| Storybook: Compositions/Cards/PricingCardSkeleton | Verification | Ensure loading state matches design |

### 3.3 UI Consistency Requirements

1. **Spacing**: All internal spacing must use SDS space tokens (not arbitrary values)
2. **Typography**: All text must use SDS text primitives (not raw HTML elements)
3. **Colors**: All colors must reference semantic tokens (not primitive colors)
4. **Borders**: Must use SDS stroke tokens for consistency
5. **Shadows**: Must use SDS drop-shadow effects

---

## 4. Technical Constraints and Integration Requirements

### 4.1 Existing Technology Stack

| Category | Technology | Version |
|----------|------------|---------|
| **Language** | TypeScript | 5.x |
| **Framework** | React | 18.x |
| **Styling** | CSS Modules + Custom Properties | - |
| **Utilities** | clsx | 2.x |
| **Documentation** | Storybook | 7.x+ |
| **Build** | Vite | 5.x |

### 4.2 Integration Approach

**Frontend Integration Strategy:**
- Modify existing `PricingCard` component in-place
- Ensure all changes are additive (no breaking changes)
- Use existing CSS custom properties from `theme.css`

**Testing Integration Strategy:**
- Visual regression via Storybook
- Manual verification against Figma design
- Accessibility audit with browser DevTools

### 4.3 Code Organization and Standards

**File Structure:**
```
src/ui/compositions/Cards/
├── Cards.tsx          # PricingCard component (modify)
├── cards.css          # Styles (verify/update)
└── Cards.stories.tsx  # Storybook (update)
```

**Naming Conventions:**
- Props: `camelCase` (e.g., `priceLabel`, `actionVariant`)
- CSS Classes: `kebab-case` (e.g., `card-variant-stroke`)
- Design Tokens: `--sds-{category}-{property}-{variant}`

**Coding Standards:**
- Use `clsx` for conditional class composition
- Destructure props with defaults
- Export both component and props interface

### 4.4 Deployment and Operations

**Build Process:**
- No changes to build configuration required
- Component auto-bundled with existing Vite setup

**Configuration:**
- No new environment variables
- No runtime configuration changes

### 4.5 Risk Assessment and Mitigation

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Breaking existing implementations | Low | High | Maintain backward-compatible API |
| Visual regression | Medium | Medium | Compare against Figma screenshots |
| Token mismatch | Low | Low | Verify tokens exist in theme.css |
| Accessibility regression | Low | High | Test with screen reader |

---

## 5. Epic and Story Structure

### 5.1 Epic Approach

**Epic Structure Decision:** Single Epic

**Rationale:** This enhancement is a focused modification to an existing component with limited scope. A single epic with 2-3 stories is appropriate because:
1. All changes are localized to the Cards composition
2. No architectural changes required
3. Clear definition of done

---

## 6. Epic 1: PricingCard Figma Alignment

**Epic Goal:** Achieve pixel-perfect alignment between the React PricingCard component and the Figma SDS Pricing Card design.

**Integration Requirements:**
- Must not break existing PricingCard usage
- Must use existing design tokens
- Must maintain accessibility

---

### Story 1.1: Verify and Update Design Token Usage

**As a** developer using the SDS,  
**I want** PricingCard to use the correct design tokens,  
**so that** the component matches Figma specifications exactly.

#### Acceptance Criteria

| # | Criteria |
|---|----------|
| AC1 | Padding uses `--sds-size-space-800` (32px) for large size |
| AC2 | Padding uses `--sds-size-space-600` (24px) for small size |
| AC3 | Internal gap uses `--sds-size-space-600` (24px) |
| AC4 | Border radius uses `--sds-size-radius-200` (8px) |
| AC5 | All colors reference semantic tokens (not primitives) |
| AC6 | Typography matches Figma styles exactly |

#### Integration Verification

| # | Verification |
|---|--------------|
| IV1 | Existing Storybook stories render without errors |
| IV2 | `pricingPlanToPricingCardProps` helper produces valid props |
| IV3 | No visual regression in existing variant/size combinations |

---

### Story 1.2: Create Code Connect Mapping

**As a** designer using Figma Dev Mode,  
**I want** to see the React code for PricingCard when I select it in Figma,  
**so that** I can copy accurate implementation code.

#### Acceptance Criteria

| # | Criteria |
|---|----------|
| AC1 | Code Connect file created at `figma/PricingCard.figma.tsx` |
| AC2 | Props mapped to Figma component properties |
| AC3 | Variants (default, stroke, brand) correctly mapped |
| AC4 | Size variants (large, small) correctly mapped |
| AC5 | Code Connect published to Figma |

#### Integration Verification

| # | Verification |
|---|--------------|
| IV1 | Selecting Pricing Card in Figma shows React code |
| IV2 | Generated code compiles without errors |
| IV3 | Props match between Figma and React |

---

### Story 1.3: Update Storybook Documentation

**As a** developer consuming the SDS,  
**I want** comprehensive Storybook documentation for PricingCard,  
**so that** I can understand all available props and variants.

#### Acceptance Criteria

| # | Criteria |
|---|----------|
| AC1 | Story exists for each variant (default, stroke, brand) |
| AC2 | Story exists for each size (large, small) |
| AC3 | Controls available for all configurable props |
| AC4 | Story descriptions include usage guidance |
| AC5 | PricingCardSkeleton has its own story |

#### Integration Verification

| # | Verification |
|---|--------------|
| IV1 | All stories render without console errors |
| IV2 | Controls modify component in real-time |
| IV3 | Stories accessible at expected Storybook path |

---

## 7. Success Metrics

### Definition of Done

- [ ] All design token values verified against Figma MCP extraction
- [ ] Visual comparison passes (component matches Figma screenshot)
- [ ] No TypeScript errors in component
- [ ] No console warnings in Storybook
- [ ] Existing implementations continue to work
- [ ] Code Connect mapping functional in Figma Dev Mode
- [ ] Accessibility audit passes (no critical issues)

### Acceptance Testing

| Test | Method | Pass Criteria |
|------|--------|---------------|
| Visual Parity | Side-by-side comparison | <2px variance |
| Token Usage | DevTools inspection | All values from CSS variables |
| Accessibility | axe DevTools | No critical/serious issues |
| Regression | Existing stories | No visual changes |

---

## 8. Out of Scope

The following are explicitly **NOT** included in this PRD:

| Item | Reason |
|------|--------|
| New PricingCard variants | Use existing variant system |
| Animation/transitions | Not in Figma design |
| Dark mode support | Already handled by token system |
| Mobile-specific layouts | Handled by existing responsive logic |
| Unit tests | Storybook serves as visual regression |
| New helper functions | Existing `pricingPlanToPricingCardProps` sufficient |

---

## Appendix A: Figma Design Specifications (MCP Extracted)

### Component Details

| Property | Value |
|----------|-------|
| **Figma Node ID** | `3007:870` |
| **Component Name** | Pricing Card |
| **Dimensions** | 314.67px × 395px |

### Design Tokens Applied

```json
{
  "spacing": {
    "--sds-size-space-200": "8px",
    "--sds-size-space-300": "12px",
    "--sds-size-space-400": "16px",
    "--sds-size-space-600": "24px",
    "--sds-size-space-800": "32px"
  },
  "radius": {
    "--sds-size-radius-200": "8px"
  },
  "stroke": {
    "--sds-size-stroke-border": "1px"
  },
  "colors": {
    "--sds-color-background-default-default": "#ffffff",
    "--sds-color-background-brand-default": "#2c2c2c",
    "--sds-color-border-default-default": "#d9d9d9",
    "--sds-color-border-brand-default": "#2c2c2c",
    "--sds-color-text-default-default": "#1e1e1e",
    "--sds-color-text-default-secondary": "#757575",
    "--sds-color-text-brand-on-brand": "#f5f5f5"
  },
  "typography": {
    "heading": {
      "family": "Inter",
      "weight": 600,
      "size": "24px",
      "lineHeight": 1.2
    },
    "titlePage": {
      "family": "Inter", 
      "weight": 700,
      "size": "48px"
    },
    "subtitleSmall": {
      "family": "Inter",
      "weight": 700,
      "size": "24px"
    },
    "bodySmall": {
      "family": "Inter",
      "weight": 400,
      "size": "14px"
    },
    "bodyBase": {
      "family": "Inter",
      "weight": 400,
      "size": "16px",
      "lineHeight": 1.4
    }
  }
}
```

### Component Structure (from Figma)

```
Pricing Card
├── Top (content wrapper)
│   ├── Text Heading (title)
│   ├── Text Price
│   │   ├── Price (currency + amount)
│   │   └── Label (interval)
│   └── Text List
│       ├── Text List Item
│       ├── Text List Item
│       ├── Text List Item
│       ├── Text List Item
│       └── Text List Item
└── Button (CTA)
```

### Visual Reference

The Figma component shows:
- White background card with subtle border
- Centered title "Title" in heading style
- Large price display "$50" with "/ mo" label
- 5 bullet-point list items
- Full-width dark button "Button"

---

## Appendix B: Existing Implementation Reference

### Current Props Interface

```typescript
export type PricingCardProps = {
  sku: string;
  interval: "month" | "year";
  heading: string;
  price: TextPriceProps["price"];
  priceCurrency: TextPriceProps["currency"];
  priceLabel?: TextPriceProps["label"];
  size?: TextPriceProps["size"];
  variant?: CardProps["variant"];
  action: string;
  actionIcon?: ReactNode;
  actionVariant?: ButtonProps["variant"];
  actionDisabled?: boolean;
  onAction: () => void;
  list?: string[];
  listSlot?: ReactNode;
};
```

### Current Component Location

```
src/ui/compositions/Cards/Cards.tsx (lines 253-311)
```

---

## Appendix C: Code Connect Template

```typescript
// figma/PricingCard.figma.tsx
import figma from "@figma/code-connect";
import { PricingCard } from "../src/ui/compositions/Cards";

figma.connect(PricingCard, "FIGMA_URL_HERE", {
  props: {
    heading: figma.string("Title"),
    price: figma.string("Price"),
    priceCurrency: figma.string("Currency"),
    priceLabel: figma.string("Label"),
    variant: figma.enum("Variant", {
      Default: "default",
      Stroke: "stroke",
      Brand: "brand",
    }),
    size: figma.enum("Size", {
      Large: "large",
      Small: "small",
    }),
    action: figma.string("Button Text"),
  },
  example: (props) => (
    <PricingCard
      {...props}
      sku="example-sku"
      interval="month"
      onAction={() => {}}
    />
  ),
});
```

---

*Document generated by PM Agent John using BMAD Brownfield PRD Template v2.0*
