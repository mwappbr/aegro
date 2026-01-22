import type { Meta, StoryObj } from "@storybook/react";
import {
  Card,
  PricingCard,
  PricingCardSkeleton,
  ProductInfoCard,
  ReviewCard,
  StatsCard,
  TestimonialCard,
} from "compositions";
import {
  IconActivity,
  IconClock,
  IconCode,
  IconCompass,
  IconSmile,
} from "icons";
import { placeholder } from "images";
import { Flex } from "layout";
import { Button, ButtonGroup, Image, Text, TextHeading } from "primitives";
import { ComponentProps } from "react";

const meta: Meta<typeof Card> = {
  component: Card,
  title: "SDS Compositions/Cards",
  parameters: { layout: "centered" },
};
export default meta;

export const StoryCard: StoryObj<
  ComponentProps<typeof Card> & {
    "[asset]": "none" | "icon" | "image";
    "[interaction]": boolean;
  }
> = {
  name: "Card",
  args: {
    direction: "vertical",
    variant: "default",
    "[asset]": "none",
    "[interaction]": false,
  },
  argTypes: {
    direction: {
      control: { type: "select" },
      options: ["vertical", "horizontal"],
    },
    variant: {
      control: { type: "select" },
      options: ["default", "padded", "stroke"],
    },
    "[asset]": {
      control: { type: "select" },
      options: ["none", "icon", "image"],
    },
  },
  render: ({ "[asset]": _asset, "[interaction]": _interaction, ...args }) => (
    <Card
      {...args}
      asset={
        _asset === "icon" ? (
          <IconActivity size="32" />
        ) : _asset === "image" ? (
          <Image
            alt="A nice image"
            aspectRatio="1-1"
            size="small"
            src={placeholder}
          />
        ) : undefined
      }
      interactionProps={
        _interaction
          ? {
              "aria-label": "Visit something nice about this card",
              href: "https://google.com",
            }
          : undefined
      }
    >
      <TextHeading>This is a card</TextHeading>
      <Text>
        Answer the frequently asked question in a simple sentence, a longish
        paragraph, or even in a list.
      </Text>
      <ButtonGroup align="start">
        <Button variant="neutral">Hello there!</Button>
      </ButtonGroup>
    </Card>
  ),
};

export const StoryPricingCard: StoryObj<typeof PricingCard> = {
  name: "Pricing Card",
  render: () => (
    <Flex
      container
      wrap
      gap="400"
      type="third"
      alignPrimary="center"
      direction="row"
    >
      {[1, 2, 3].map((i) => (
        <PricingCard
          key={i}
          variant={i === 2 ? "brand" : undefined}
          heading="Wow Tier"
          action="Buy this"
          price={(5 * (5 - i)).toString()}
          priceCurrency="$"
          size="large"
          sku={`sku-${i}`}
          interval="month"
          onAction={() => {}}
          actionVariant={i === 2 ? "neutral" : undefined}
          list={["List item 1", "List item 2", "List item 3"]}
        />
      ))}
      {[1, 2, 3].map((i) => (
        <PricingCard
          key={i}
          variant={i === 2 ? "brand" : undefined}
          heading="Wow Tier"
          action="Buy this"
          price={(5 * (5 - i)).toString()}
          priceCurrency="$"
          size="small"
          sku={`sku-${i}`}
          interval="year"
          onAction={() => {}}
          actionVariant={i === 2 ? "neutral" : undefined}
          list={["List item 1", "List item 2", "List item 3"]}
        />
      ))}
    </Flex>
  ),
};

/**
 * Interactive playground for PricingCard with full control over all props.
 * Use this story to explore all available configurations and test different combinations.
 *
 * @example
 * ```tsx
 * <PricingCard
 *   sku="pro-monthly"
 *   interval="month"
 *   heading="Pro Plan"
 *   price="50"
 *   priceCurrency="$"
 *   priceLabel="/ mo"
 *   size="large"
 *   variant="stroke"
 *   action="Get Started"
 *   actionVariant="primary"
 *   onAction={() => console.log("clicked")}
 *   list={["Feature 1", "Feature 2", "Feature 3"]}
 * />
 * ```
 */
export const PricingCardPlayground: StoryObj<typeof PricingCard> = {
  name: "Playground",
  args: {
    sku: "pro-monthly",
    interval: "month",
    heading: "Pro Plan",
    price: "50",
    priceCurrency: "$",
    priceLabel: "/ mo",
    size: "large",
    variant: "stroke",
    action: "Get Started",
    actionVariant: "primary",
    actionDisabled: false,
    list: ["Unlimited projects", "Priority support", "Advanced analytics"],
  },
  argTypes: {
    heading: { control: "text", description: "The plan name displayed at the top of the card" },
    price: { control: "text", description: "The price amount (without currency)" },
    priceCurrency: { control: "text", description: "Currency symbol (e.g., $, €, £)" },
    priceLabel: { control: "text", description: "Label shown after price (e.g., / mo, / yr)" },
    size: {
      control: "select",
      options: ["large", "small"],
      description: "Card size - large for featured plans, small for compact display",
    },
    variant: {
      control: "select",
      options: ["default", "stroke", "brand"],
      description: "Visual style - use brand for highlighted/featured plans",
    },
    action: { control: "text", description: "CTA button text" },
    actionVariant: {
      control: "select",
      options: ["primary", "neutral", "subtle"],
      description: "Button style variant",
    },
    actionDisabled: { control: "boolean", description: "Disable the action button" },
    sku: { control: "text", description: "Unique identifier for the pricing tier" },
    interval: {
      control: "select",
      options: ["month", "year"],
      description: "Billing interval",
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          "A fully interactive playground for the PricingCard component. Modify any prop using the controls panel to see how the component responds. Ideal for exploring all available configurations.",
      },
    },
  },
  render: (args) => <PricingCard {...args} onAction={() => alert(`Action: ${args.action}`)} />,
};

/**
 * Default variant - standard pricing card with subtle background.
 */
export const PricingCardDefault: StoryObj<typeof PricingCard> = {
  name: "Default Variant",
  args: {
    sku: "basic-monthly",
    interval: "month",
    heading: "Basic Plan",
    price: "19",
    priceCurrency: "$",
    priceLabel: "/ mo",
    size: "large",
    variant: "default",
    action: "Select Plan",
    actionVariant: "primary",
    list: ["5 projects", "Email support", "Basic analytics"],
  },
  parameters: {
    docs: {
      description: {
        story:
          "The default variant provides a subtle background without a border. Use this for standard pricing tiers that don't need emphasis.",
      },
    },
  },
  render: (args) => <PricingCard {...args} onAction={() => {}} />,
};

/**
 * Stroke variant - pricing card with a visible border outline.
 */
export const PricingCardStroke: StoryObj<typeof PricingCard> = {
  name: "Stroke Variant",
  args: {
    sku: "pro-monthly",
    interval: "month",
    heading: "Pro Plan",
    price: "49",
    priceCurrency: "$",
    priceLabel: "/ mo",
    size: "large",
    variant: "stroke",
    action: "Select Plan",
    actionVariant: "primary",
    list: ["Unlimited projects", "Priority support", "Advanced analytics"],
  },
  parameters: {
    docs: {
      description: {
        story:
          "The stroke variant adds a border outline to the card. This is the default variant and works well for most pricing displays.",
      },
    },
  },
  render: (args) => <PricingCard {...args} onAction={() => {}} />,
};

/**
 * Brand variant - highlighted pricing card for featured or recommended plans.
 */
export const PricingCardBrand: StoryObj<typeof PricingCard> = {
  name: "Brand Variant",
  args: {
    sku: "enterprise-monthly",
    interval: "month",
    heading: "Enterprise",
    price: "99",
    priceCurrency: "$",
    priceLabel: "/ mo",
    size: "large",
    variant: "brand",
    action: "Contact Sales",
    actionVariant: "neutral",
    list: ["Everything in Pro", "Dedicated support", "Custom integrations", "SLA guarantee"],
  },
  parameters: {
    docs: {
      description: {
        story:
          "The brand variant uses the brand color scheme to highlight featured or recommended plans. Typically used for the most popular tier. Note: use neutral button variant for better contrast.",
      },
    },
  },
  render: (args) => <PricingCard {...args} onAction={() => {}} />,
};

/**
 * Large size - full-featured card with vertical layout and prominent pricing.
 */
export const PricingCardLarge: StoryObj<typeof PricingCard> = {
  name: "Large Size",
  args: {
    sku: "pro-monthly",
    interval: "month",
    heading: "Pro Plan",
    price: "49",
    priceCurrency: "$",
    priceLabel: "/ mo",
    size: "large",
    variant: "stroke",
    action: "Get Started",
    actionVariant: "primary",
    list: ["Unlimited projects", "Priority support", "Advanced analytics"],
  },
  parameters: {
    docs: {
      description: {
        story:
          "Large size displays the card in a vertical layout with prominent pricing. Best for dedicated pricing pages where cards have room to breathe.",
      },
    },
  },
  render: (args) => <PricingCard {...args} onAction={() => {}} />,
};

/**
 * Small size - compact card with horizontal header layout.
 */
export const PricingCardSmall: StoryObj<typeof PricingCard> = {
  name: "Small Size",
  args: {
    sku: "pro-yearly",
    interval: "year",
    heading: "Pro Plan",
    price: "490",
    priceCurrency: "$",
    priceLabel: "/ yr",
    size: "small",
    variant: "stroke",
    action: "Get Started",
    actionVariant: "primary",
    list: ["Unlimited projects", "Priority support", "Advanced analytics"],
  },
  parameters: {
    docs: {
      description: {
        story:
          "Small size displays the card in a compact horizontal header layout. Use when space is limited or for secondary pricing displays.",
      },
    },
  },
  render: (args) => <PricingCard {...args} onAction={() => {}} />,
};

/**
 * Skeleton loading state for PricingCard.
 * Use while pricing data is being fetched.
 */
export const PricingCardSkeletonStory: StoryObj<typeof PricingCardSkeleton> = {
  name: "Skeleton",
  args: {
    size: "large",
  },
  argTypes: {
    size: {
      control: "select",
      options: ["large", "small"],
      description: "Size of the skeleton card",
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          "A loading skeleton placeholder for PricingCard. Display this while pricing data is being fetched to maintain layout stability and provide visual feedback to users.",
      },
    },
  },
  render: (args) => <PricingCardSkeleton {...args} />,
};

export const StoryProductInfoCard: StoryObj<typeof ProductInfoCard> = {
  name: "Product Info Card",
  render: () => (
    <Flex container wrap type="quarter" gap="400" direction="row">
      <ProductInfoCard
        asset={<Image alt="Accessibility!" src={placeholder} />}
        heading="Product"
        price="5"
        rating={4.7}
        description="Wow do we have a cool thing for you. What an amazing thing."
      />
      <ProductInfoCard
        asset={<Image alt="Accessibility!" src={placeholder} />}
        heading="Product"
        price="5"
        rating={4.7}
        description="Wow do we have a cool thing for you. What an amazing thing."
      />
      <ProductInfoCard
        asset={<Image alt="Accessibility!" src={placeholder} />}
        heading="Product"
        price="5"
        rating={4.7}
        description="Wow do we have a cool thing for you. What an amazing thing."
      />
      <ProductInfoCard
        asset={<Image alt="Accessibility!" src={placeholder} />}
        heading="Product"
        price="5"
        rating={4.7}
        description="Wow do we have a cool thing for you. What an amazing thing."
      />
    </Flex>
  ),
};

export const StoryReviewCard: StoryObj<typeof StatsCard> = {
  name: "Review Card",
  render: () => (
    <Flex
      container
      wrap
      type="quarter"
      alignPrimary="stretch"
      gap="400"
      direction="row"
    >
      <ReviewCard
        stars={4}
        title="This rocks"
        body="Cannot believe how amazing this experience was"
        name="Charlie Brown"
        date="June 2024"
        src={placeholder}
      />
      <ReviewCard
        stars={5}
        title="This rocks"
        body="Cannot believe how amazing this experience was"
        name="Charlie Brown"
        date="June 2024"
        src={placeholder}
      />
      <ReviewCard
        stars={5}
        title="This rocks"
        body="Cannot believe how amazing this experience was"
        name="Charlie Brown"
        date="June 2024"
        src={placeholder}
      />
      <ReviewCard
        stars={4}
        title="This rocks"
        body="Cannot believe how amazing this experience was"
        name="Charlie Brown"
        date="June 2024"
        src={placeholder}
      />
    </Flex>
  ),
};

export const StoryStatsCard: StoryObj<typeof StatsCard> = {
  name: "Stats Card",
  render: () => (
    <Flex
      container
      wrap
      type="quarter"
      alignPrimary="stretch"
      gap="400"
      direction="row"
    >
      <StatsCard
        icon={<IconClock size="40" />}
        stat="400"
        description="SDS Hours"
      />
      <StatsCard
        icon={<IconCode size="40" />}
        stat="15.3k"
        description="Lines of TypeScript"
      />
      <StatsCard
        icon={<IconSmile size="40" />}
        stat="8M"
        description="Smiles"
      />
      <StatsCard
        icon={<IconCompass size="40" />}
        stat="120.4k"
        description="Directions"
      />
    </Flex>
  ),
};

export const StoryTestimonialCard: StoryObj<typeof TestimonialCard> = {
  name: "Testimonial Card",
  render: () => (
    <Flex
      container
      wrap
      type="third"
      alignPrimary="stretch"
      gap="400"
      direction="row"
    >
      <TestimonialCard
        heading="“Something splendid”"
        src={placeholder}
        username="fullname421"
        name="Full Name"
      />
      <TestimonialCard
        heading="“Something splendid”"
        src={placeholder}
        username="fullname421"
        name="Full Name"
      />
      <TestimonialCard
        heading="“Something splendid”"
        src={placeholder}
        username="fullname421"
        name="Full Name"
      />
    </Flex>
  ),
};
