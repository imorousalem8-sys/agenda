import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-blue-600 text-white shadow hover:bg-blue-700",
        secondary:
          "border-transparent bg-slate-100 text-slate-900 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-100",
        destructive:
          "border-transparent bg-red-500/15 text-red-600 border-red-500/30 dark:text-red-400",
        outline: "text-slate-950 dark:text-slate-50",
        success:
          "border-transparent bg-emerald-500/15 text-emerald-600 border-emerald-500/30 dark:text-emerald-400",
        warning:
          "border-transparent bg-amber-500/15 text-amber-600 border-amber-500/30 dark:text-amber-400",
        sapphire:
          "border-cyan-400/30 bg-blue-600/20 text-blue-400 dark:text-cyan-300 shadow-sm",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
