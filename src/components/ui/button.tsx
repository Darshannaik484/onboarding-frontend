import type { ButtonHTMLAttributes } from "react";
import { cn } from "../../lib/utils";

type ButtonVariant = "default" | "outline" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const variantStyles: Record<ButtonVariant, string> = {
  default:
    "bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed",
  outline:
    "border border-slate-300 bg-white text-slate-700 hover:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed",
  ghost:
    "text-slate-700 hover:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed",
};

export const Button = ({
  className,
  variant = "default",
  type = "button",
  ...props
}: ButtonProps) => (
  <button
    type={type}
    className={cn(
      "inline-flex h-10 items-center justify-center rounded-md px-4 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
      variantStyles[variant],
      className,
    )}
    {...props}
  />
);
