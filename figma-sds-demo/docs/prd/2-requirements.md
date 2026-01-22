# 2. Requirements

## 2.1 Functional Requirements

### FR1: Core Component Structure
| ID | Requirement | Priority | Status |
|----|-------------|----------|--------|
| FR1.1 | Component renders title using `TextHeading` primitive | Must | ✅ Exists |
| FR1.2 | Component displays price with currency and interval label | Must | ✅ Exists |
| FR1.3 | Component renders feature list using `TextList`/`TextListItem` | Must | ✅ Exists |
| FR1.4 | Component includes CTA button with configurable text | Must | ✅ Exists |
| FR1.5 | Support `listSlot` prop for custom list content | Should | ✅ Exists |

### FR2: Variant Support
| ID | Requirement | Priority | Status |
|----|-------------|----------|--------|
| FR2.1 | Support `variant="default"` (white background, no border) | Must | ✅ Exists |
| FR2.2 | Support `variant="stroke"` (bordered with drop shadow) | Must | ✅ Exists |
| FR2.3 | Support `variant="brand"` (brand background, inverted text) | Must | ✅ Exists |

### FR3: Size Variants
| ID | Requirement | Priority | Status |
|----|-------------|----------|--------|
| FR3.1 | Support `size="large"` (vertical layout, centered) | Must | ✅ Exists |
| FR3.2 | Support `size="small"` (horizontal price layout, compact) | Must | ✅ Exists |

### FR4: Design Token Usage (from Figma MCP)
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

### FR5: Typography (from Figma MCP)
| ID | Requirement | Figma Style | Priority |
|----|-------------|-------------|----------|
| FR5.1 | Title uses Heading style (Inter Semi Bold 24px) | `TextHeading` | Must |
| FR5.2 | Price uses Title Page style (Inter Bold 48px) | `TextPrice` | Must |
| FR5.3 | Currency uses Subtitle Small style (Inter Bold 24px) | `TextPrice` currency | Must |
| FR5.4 | Interval label uses Body Small (Inter Regular 14px) | `TextPrice` label | Must |
| FR5.5 | List items use Body Base (Inter Regular 16px) | `TextListItem` | Must |
| FR5.6 | Button text uses Body Base (Inter Regular 16px) | `Button` | Must |

### FR6: Accessibility
| ID | Requirement | Priority | Status |
|----|-------------|----------|--------|
| FR6.1 | Price must be announced as complete value (e.g., "$50 per month") | Must | 🔍 Verify |
| FR6.2 | Button must have accessible name | Must | ✅ Exists |
| FR6.3 | Card structure must use semantic HTML | Should | ✅ Exists |
| FR6.4 | Focus states must be visible | Must | ✅ Exists |

## 2.2 Non-Functional Requirements

### NFR1: Code Quality
| ID | Requirement | Priority |
|----|-------------|----------|
| NFR1.1 | TypeScript with exported `PricingCardProps` interface | Must |
| NFR1.2 | Follow existing component patterns (clsx, CSS modules) | Must |
| NFR1.3 | No console warnings or errors | Must |
| NFR1.4 | Props documented with JSDoc comments | Should |

### NFR2: Documentation
| ID | Requirement | Priority |
|----|-------------|----------|
| NFR2.1 | Storybook stories for all variants and sizes | Must |
| NFR2.2 | Storybook controls for interactive prop exploration | Should |
| NFR2.3 | Usage examples in story descriptions | Should |

### NFR3: Figma Integration
| ID | Requirement | Priority |
|----|-------------|----------|
| NFR3.1 | Code Connect mapping file created | Should |
| NFR3.2 | Props mapped to Figma component properties | Should |
| NFR3.3 | Variant mapping documented | Should |

### NFR4: Performance
| ID | Requirement | Priority |
|----|-------------|----------|
| NFR4.1 | No unnecessary re-renders on prop changes | Should |
| NFR4.2 | CSS-only hover/focus states (no JS event handlers for visuals) | Should |
| NFR4.3 | Bundle size impact < 1KB gzipped | Should |

## 2.3 Compatibility Requirements

| ID | Requirement | Description |
|----|-------------|-------------|
| CR1 | API Compatibility | Existing `PricingCardProps` interface must not have breaking changes |
| CR2 | Style Compatibility | Visual appearance must remain consistent with current implementation |
| CR3 | Integration Compatibility | Must work with existing `pricingPlanToPricingCardProps` helper |
| CR4 | Storybook Compatibility | Existing stories must continue to render correctly |

---
