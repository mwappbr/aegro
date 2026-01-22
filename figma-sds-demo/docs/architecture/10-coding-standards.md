# 10. Coding Standards

## 10.1 Existing Standards Compliance

| Standard | Project Pattern |
|----------|-----------------|
| **Code Style** | TypeScript with explicit types, functional components |
| **Linting Rules** | ESLint with React hooks plugin |
| **Testing Patterns** | Storybook for visual regression |
| **Documentation Style** | JSDoc comments for props, Storybook for usage |

## 10.2 Enhancement-Specific Standards

- **Token Usage:** All spacing, colors, and typography MUST use `--sds-*` CSS variables
- **No Magic Numbers:** Hardcoded pixel values are prohibited
- **Code Connect Mapping:** Props must map 1:1 with Figma component properties

## 10.3 Critical Integration Rules

| Rule | Implementation |
|------|----------------|
| **Existing API Compatibility** | `PricingCardProps` interface unchanged |
| **Database Integration** | N/A |
| **Error Handling** | Existing error boundaries apply |
| **Logging Consistency** | Console warnings for deprecated props only |

---
