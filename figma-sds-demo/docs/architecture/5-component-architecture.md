# 5. Component Architecture

## 5.1 Existing Component Structure

The `PricingCard` component already exists and follows established patterns:

```
PricingCard
├── Card (base component)
│   ├── variant: "default" | "stroke" | "brand"
│   ├── padding: "600" | "800"
│   └── direction: "vertical"
├── Flex (layout container)
│   ├── TextHeading (plan title)
│   └── TextPrice (price display)
│       ├── currency
│       ├── price
│       └── label
├── TextList (feature list)
│   └── TextListItem[] (individual features)
└── ButtonGroup > Button (CTA)
```

## 5.2 Component Integration Points

| Component | Integration Type | Purpose |
|-----------|-----------------|---------|
| `Card` | Base composition | Provides variant, padding, border-radius |
| `Flex` | Layout | Manages spacing and alignment |
| `TextHeading` | Primitive | Renders plan title |
| `TextPrice` | Primitive | Renders price with currency/label |
| `TextList` / `TextListItem` | Primitive | Renders feature list |
| `Button` / `ButtonGroup` | Primitive | Renders CTA action |

## 5.3 Props Interface (Existing - No Changes)

```typescript
export type PricingCardProps = {
  sku: string;
  interval: "month" | "year";
  heading: string;
  price: TextPriceProps["price"];
  priceCurrency: TextPriceProps["currency"];
  priceLabel?: TextPriceProps["label"];
  size?: TextPriceProps["size"];          // "large" | "small"
  variant?: CardProps["variant"];          // "default" | "stroke" | "brand"
  action: string;
  actionIcon?: ReactNode;
  actionVariant?: ButtonProps["variant"];
  actionDisabled?: boolean;
  onAction: () => void;
  list?: string[];
  listSlot?: ReactNode;
};
```

## 5.4 Component Interaction Diagram

```mermaid
graph TD
    subgraph "PricingCard Component"
        PC[PricingCard] --> Card[Card base]
        Card --> Flex1[Flex: header]
        Flex1 --> TH[TextHeading]
        Flex1 --> TP[TextPrice]
        Card --> TL[TextList]
        TL --> TLI1[TextListItem]
        TL --> TLI2[TextListItem]
        TL --> TLIN[TextListItem...]
        Card --> Flex2[Flex: footer]
        Flex2 --> BG[ButtonGroup]
        BG --> BTN[Button]
    end
    
    subgraph "CSS Tokens"
        T1[--sds-size-space-600]
        T2[--sds-size-space-800]
        T3[--sds-size-radius-200]
        T4[--sds-color-background-*]
        T5[--sds-color-border-*]
    end
    
    Card -.-> T1
    Card -.-> T2
    Card -.-> T3
    Card -.-> T4
    Card -.-> T5
```

---
