# Appendix B: Existing Implementation Reference

## Current Props Interface

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

## Current Component Location

```
src/ui/compositions/Cards/Cards.tsx (lines 253-311)
```

---
