# Story 1.1: Implement FeatureCard Component

Status: ready-for-dev

<!-- Validation: Run validate-create-story for quality check before dev-story. -->

---

## Story

As a **developer using SDS**,
I want a **FeatureCard component**,
so that **I can display feature highlights with icons, titles, and descriptions consistently across the application**.

---

## Acceptance Criteria

### AC1: Core Rendering
**Given** a FeatureCard with icon, title, and description props
**When** the component renders
**Then** all three elements are visible in vertical layout, centered alignment

### AC2: Variant Support - Default
**Given** a FeatureCard with `variant="default"` (or no variant)
**When** the component renders
**Then** flat background styling is applied

### AC3: Variant Support - Stroke
**Given** a FeatureCard with `variant="stroke"`
**When** the component renders
**Then** bordered styling with shadow is applied

### AC4: Variant Support - Brand
**Given** a FeatureCard with `variant="brand"`
**When** the component renders
**Then** brand background color and contrasting text color are applied

### AC5: Design Token Usage
**Given** the FeatureCard CSS implementation
**When** styles are inspected
**Then** ALL values use `--sds-*` CSS variables (no hardcoded values)

### AC6: Accessibility
**Given** a FeatureCard component
**When** navigated with screen reader
**Then** title and description are announced, icon is hidden from assistive technology

### AC7: Storybook Documentation
**Given** Storybook is running (`npm run storybook`)
**When** navigating to Compositions/Cards/FeatureCard
**Then** stories for all variants are visible with working controls

---

## Tasks / Subtasks

- [ ] **Task 1: Create FeatureCard component file** (AC: 1, 2, 3, 4)
  - [ ] 1.1: Create `src/ui/compositions/Cards/FeatureCard.tsx`
  - [ ] 1.2: Define `FeatureCardProps` interface with JSDoc comments
  - [ ] 1.3: Implement component using Card base, Flex layout, Text primitives
  - [ ] 1.4: Support variant prop with default value "stroke"
  - [ ] 1.5: Add className prop passthrough

- [ ] **Task 2: Add CSS styles** (AC: 5)
  - [ ] 2.1: Add `.feature-card` class to `cards.css`
  - [ ] 2.2: Add `.feature-card-icon` container styles
  - [ ] 2.3: Add `.feature-card-description` color override
  - [ ] 2.4: Verify all values use SDS design tokens

- [ ] **Task 3: Update exports** (AC: 1)
  - [ ] 3.1: Add export to `src/ui/compositions/Cards/index.ts`
  - [ ] 3.2: Verify import works: `import { FeatureCard } from "compositions"`

- [ ] **Task 4: Add accessibility attributes** (AC: 6)
  - [ ] 4.1: Add `aria-hidden="true"` to icon container
  - [ ] 4.2: Verify text content is screen-reader accessible

- [ ] **Task 5: Create Storybook stories** (AC: 7)
  - [ ] 5.1: Create `src/stories/compositions/FeatureCard.stories.tsx`
  - [ ] 5.2: Add Default story (stroke variant)
  - [ ] 5.3: Add Brand story
  - [ ] 5.4: Add NoIcon edge case story
  - [ ] 5.5: Configure argTypes for variant control

---

## Dev Notes

### Architecture References
- **Component Design**: [Source: docs/bmad/architecture.md#3-Component-Architecture]
- **ADR-001 File Location**: [Source: docs/bmad/architecture.md#ADR-001]
- **ADR-002 Base Reuse**: [Source: docs/bmad/architecture.md#ADR-002]

### Code References
- **Base Card**: `src/ui/compositions/Cards/Cards.tsx` - Study Card, CardProps
- **Card Styles**: `src/ui/compositions/Cards/cards.css` - Pattern for card-* classes
- **Text Primitives**: `src/ui/primitives/Text/Text.tsx` - TextHeading, TextSmall
- **Layout**: `src/ui/layout/Flex/Flex.tsx` - Flex props: direction, gap, alignSecondary

### Figma MCP Verification (CRITICAL)

Before implementing, use Figma MCP to extract exact specs:

```javascript
// Get FeatureCard component measurements
figma_get_node({
  fileKey: "1380235722331273046",
  nodeId: "FEATURE_CARD_NODE_ID"  // Replace with actual node ID from Figma
})

// Get typography styles to match Text primitives
figma_get_styles({ fileKey: "1380235722331273046" })

// Get design token values for verification
figma_get_variables({ fileKey: "1380235722331273046" })
```

### Design Token References (FROM FIGMA MCP)
| Token | Variable | Value | MCP Path |
|-------|----------|-------|----------|
| Padding | `--sds-size-space-600` | 24px | `node.paddingTop` |
| Icon-Content Gap | `--sds-size-space-400` | 16px | `node.itemSpacing` |
| Title-Desc Gap | `--sds-size-space-200` | 8px | `children[1].itemSpacing` |
| Icon Container | `--sds-size-space-800` | 32px | `children[0].width` |
| Icon Size | `--sds-size-space-600` | 24px | `children[0].children[0].width` |
| Description Color | `--sds-color-text-default-secondary` | Gray | `fills[0].color` |

**Note**: Use Figma MCP to verify these values match the current design file before implementation.

### Import Patterns
```tsx
// Required imports for FeatureCard
import clsx from "clsx";
import { ReactNode } from "react";
import { Card, CardProps } from "./Cards";
import { Flex } from "layout";
import { TextHeading, TextSmall } from "primitives";
import "./cards.css";
```

### Verification Commands
```bash
# Run Storybook to verify
npm run storybook

# Build check (no TypeScript errors)
npm run build
```

---

## Project Structure Notes

### Alignment with Existing Structure
- Component in `compositions/Cards/` ✓
- CSS in shared `cards.css` ✓
- Stories in `stories/compositions/` ✓
- Export through barrel files ✓

### Detected Patterns to Follow
- Use `clsx()` for className composition
- Default export NOT used (named exports only)
- Props interface exported alongside component
- CSS classes prefixed with component name

---

## Dev Agent Record

### Agent Model Used

{{agent_model_name_version}}

### Debug Log References

(To be filled during implementation)

### Completion Notes List

(To be filled during implementation)

### File List

| Action | File Path |
|--------|-----------|
| CREATE | `src/ui/compositions/Cards/FeatureCard.tsx` |
| MODIFY | `src/ui/compositions/Cards/cards.css` |
| MODIFY | `src/ui/compositions/Cards/index.ts` |
| CREATE | `src/stories/compositions/FeatureCard.stories.tsx` |

---

## Validation Checklist (Pre-Implementation)

- [x] PRD reviewed: docs/bmad/PRD.md
- [x] Architecture reviewed: docs/bmad/architecture.md
- [x] All AC have clear Given/When/Then
- [x] Tasks are sequenced correctly
- [x] References cite specific file paths
- [x] Design tokens documented
