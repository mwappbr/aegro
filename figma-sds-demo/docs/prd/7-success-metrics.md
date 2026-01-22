# 7. Success Metrics

## Definition of Done

- [ ] All design token values verified against Figma MCP extraction
- [ ] Visual comparison passes (component matches Figma screenshot)
- [ ] No TypeScript errors in component
- [ ] No console warnings in Storybook
- [ ] Existing implementations continue to work
- [ ] Code Connect mapping functional in Figma Dev Mode
- [ ] Accessibility audit passes (no critical issues)

## Acceptance Testing

| Test | Method | Pass Criteria |
|------|--------|---------------|
| Visual Parity | Side-by-side comparison | <2px variance |
| Token Usage | DevTools inspection | All values from CSS variables |
| Accessibility | axe DevTools | No critical/serious issues |
| Regression | Existing stories | No visual changes |

---
