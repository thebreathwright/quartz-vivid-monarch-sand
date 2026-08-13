import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-sm text-sm font-medium transition-[opacity,transform,background-color] duration-150 disabled:pointer-events-none disabled:opacity-40 active:scale-[0.98] min-h-11 px-4",
  {
    variants: {
      variant: {
        primary: "bg-accent text-accent-fg hover:opacity-90",
        secondary: "bg-raised text-fg shadow-[var(--shadow-border)] hover:bg-surface",
        ghost: "text-muted hover:text-fg hover:bg-raised",
        danger: "bg-reject/15 text-reject hover:bg-reject/25",
      },
      size: {
        default: "min-h-11 px-4",
        sm: "min-h-10 px-3 text-xs",
        icon: "size-11 p-0",
      },
    },
    defaultVariants: { variant: "primary", size: "default" },
  },
);

export function Button({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<"button"> & VariantProps<typeof buttonVariants>) {
  return <button className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}
