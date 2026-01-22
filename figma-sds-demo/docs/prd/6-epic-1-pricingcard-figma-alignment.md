# 6. Epic 1: PricingCard Figma Alignment

**Epic Goal:** Achieve pixel-perfect alignment between the React PricingCard component and the Figma SDS Pricing Card design.

**Integration Requirements:**
- Must not break existing PricingCard usage
- Must use existing design tokens
- Must maintain accessibility

---

## Story 1.1: Verify and Update Design Token Usage

**As a** developer using the SDS,  
**I want** PricingCard to use the correct design tokens,  
**so that** the component matches Figma specifications exactly.

### Acceptance Criteria

| # | Criteria |
|---|----------|
| AC1 | Padding uses `--sds-size-space-800` (32px) for large size |
| AC2 | Padding uses `--sds-size-space-600` (24px) for small size |
| AC3 | Internal gap uses `--sds-size-space-600` (24px) |
| AC4 | Border radius uses `--sds-size-radius-200` (8px) |
| AC5 | All colors reference semantic tokens (not primitives) |
| AC6 | Typography matches Figma styles exactly |

### Integration Verification

| # | Verification |
|---|--------------|
| IV1 | Existing Storybook stories render without errors |
| IV2 | `pricingPlanToPricingCardProps` helper produces valid props |
| IV3 | No visual regression in existing variant/size combinations |

---

## Story 1.2: Create Code Connect Mapping

**As a** designer using Figma Dev Mode,  
**I want** to see the React code for PricingCard when I select it in Figma,  
**so that** I can copy accurate implementation code.

### Acceptance Criteria

| # | Criteria |
|---|----------|
| AC1 | Code Connect file created at `figma/PricingCard.figma.tsx` |
| AC2 | Props mapped to Figma component properties |
| AC3 | Variants (default, stroke, brand) correctly mapped |
| AC4 | Size variants (large, small) correctly mapped |
| AC5 | Code Connect published to Figma |

### Integration Verification

| # | Verification |
|---|--------------|
| IV1 | Selecting Pricing Card in Figma shows React code |
| IV2 | Generated code compiles without errors |
| IV3 | Props match between Figma and React |

---

## Story 1.3: Update Storybook Documentation

**As a** developer consuming the SDS,  
**I want** comprehensive Storybook documentation for PricingCard,  
**so that** I can understand all available props and variants.

### Acceptance Criteria

| # | Criteria |
|---|----------|
| AC1 | Story exists for each variant (default, stroke, brand) |
| AC2 | Story exists for each size (large, small) |
| AC3 | Controls available for all configurable props |
| AC4 | Story descriptions include usage guidance |
| AC5 | PricingCardSkeleton has its own story |

### Integration Verification

| # | Verification |
|---|--------------|
| IV1 | All stories render without console errors |
| IV2 | Controls modify component in real-time |
| IV3 | Stories accessible at expected Storybook path |

---
