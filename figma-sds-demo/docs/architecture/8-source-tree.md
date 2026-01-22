# 8. Source Tree

## 8.1 Existing Project Structure (Relevant Parts)

```
src/
├── ui/
│   ├── compositions/
│   │   └── Cards/
│   │       ├── Cards.tsx          # Contains PricingCard (lines 253-311)
│   │       ├── cards.css          # Card styles with CSS variables
│   │       └── index.ts           # Barrel export
│   └── primitives/
│       └── Text/                  # TextPrice, TextHeading, etc.
├── figma/
│   ├── compositions/
│   │   ├── Cards.figma.tsx        # Existing Card Code Connect
│   │   └── ...
│   └── primitives/
│       └── ...
├── stories/
│   └── compositions/
│       └── Cards.stories.tsx      # Existing card stories
└── theme.css                      # Design tokens from Figma
```

## 8.2 New File Organization

```
src/
├── ui/compositions/Cards/
│   ├── Cards.tsx                  # MODIFY: Verify token usage
│   └── cards.css                  # MODIFY: Verify/update token values
├── figma/compositions/
│   └── Cards.figma.tsx            # MODIFY: Add PricingCard Code Connect
└── stories/compositions/
    └── Cards.stories.tsx          # MODIFY: Update PricingCard stories
```

## 8.3 Integration Guidelines

| Aspect | Guideline |
|--------|-----------|
| **File Naming** | Follow existing pattern - no new files for component |
| **Folder Organization** | Code Connect in `src/figma/compositions/` |
| **Import/Export Patterns** | Maintain existing barrel exports |

---
