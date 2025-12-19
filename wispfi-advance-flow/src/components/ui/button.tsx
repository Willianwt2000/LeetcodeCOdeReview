import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--cta-ring))] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-[hsl(var(--ink-900))] bg-transparent text-[hsl(var(--ink-900))] hover:bg-[hsl(var(--outline-hover))]",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        hero: "btn-hero shadow hover:opacity-95",
        cta: "bg-cta text-cta-foreground hover:bg-[hsl(var(--cta-hover))] shadow",
        brandBlue:
          "bg-[hsl(var(--brand-blue))] !text-[rgb(255,255,255)] font-semibold hover:bg-[hsl(var(--brand-blue-hover))] shadow-md hover:shadow-lg",
      },
      size: {
        default: "h-10 px-4 py-2 touch-target",
        sm: "h-9 rounded-md px-3 min-h-[44px] sm:min-h-auto",
        lg: "h-11 rounded-md px-8 touch-target",
        icon: "h-10 w-10 touch-target",
        mobile: "h-12 px-6 py-3 text-base touch-target",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  href?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, href, ...props }, ref) => {
    // Force asChild to true when href is provided for proper link rendering
    const shouldUseAsChild = asChild || !!href;
    const Comp = shouldUseAsChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
