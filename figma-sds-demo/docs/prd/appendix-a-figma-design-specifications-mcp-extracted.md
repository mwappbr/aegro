# Appendix A: Figma Design Specifications (MCP Extracted)

## Component Details

| Property | Value |
|----------|-------|
| **Figma Node ID** | `3007:870` |
| **Component Name** | Pricing Card |
| **Dimensions** | 314.67px × 395px |

## Design Tokens Applied

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

## Component Structure (from Figma)

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

## Visual Reference

The Figma component shows:
- White background card with subtle border
- Centered title "Title" in heading style
- Large price display "$50" with "/ mo" label
- 5 bullet-point list items
- Full-width dark button "Button"

---
