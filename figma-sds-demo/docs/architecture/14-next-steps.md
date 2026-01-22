# 14. Next Steps

## 14.1 Story Manager Handoff

**Prompt for Story Manager:**

> Implement the PricingCard Figma Alignment enhancement per `docs/architecture.md`. This enhancement has 3 stories defined in the PRD:
>
> 1. **Story 1.1:** Verify and Update Design Token Usage
>    - Verify padding, gap, border-radius, colors match Figma MCP extraction
>    - Update `cards.css` if discrepancies found
>    - Integration checkpoint: Storybook renders without visual changes
>
> 2. **Story 1.2:** Create Code Connect Mapping
>    - Create Code Connect in `src/figma/compositions/Cards.figma.tsx`
>    - Map props to Figma component properties
>    - Integration checkpoint: `npx figma connect publish` succeeds
>
> 3. **Story 1.3:** Update Storybook Documentation
>    - Ensure stories exist for all variant × size combinations
>    - Add controls for all configurable props
>    - Integration checkpoint: No console errors in Storybook
>
> **Key constraints:**
> - No breaking changes to `PricingCardProps`
> - All values must use `--sds-*` CSS variables
> - Follow existing `clsx` pattern for class composition

## 14.2 Developer Handoff

**Prompt for Developer:**

> You are implementing the PricingCard Figma Alignment enhancement. Key references:
>
> **Architecture:** `docs/architecture.md`  
> **PRD:** `docs/bmad/prd-pricing-card.md`  
> **Component:** `src/ui/compositions/Cards/Cards.tsx` (lines 253-311)  
> **Styles:** `src/ui/compositions/Cards/cards.css`
>
> **Technical Decisions:**
> 1. Modify existing component in-place (ADR from existing architecture)
> 2. Add Code Connect to existing `Cards.figma.tsx` file
> 3. Use Storybook for visual regression testing
>
> **Implementation Sequence:**
> 1. First, verify current token usage against PRD Appendix A
> 2. Second, update CSS if discrepancies found
> 3. Third, add Code Connect mapping
> 4. Fourth, update Storybook stories
> 5. Finally, run `npm run storybook` to verify no regressions
>
> **Verification Steps:**
> - Inspect computed styles in DevTools to confirm token usage
> - Compare Storybook output to Figma screenshot
> - Run `npx figma connect publish` to verify Code Connect

---
