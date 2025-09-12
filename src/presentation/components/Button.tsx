import { ReactNode } from "react";
import { cn } from "@/shared/utils/cn"; // helper para concatenar clases

type ButtonProps = {
  children: ReactNode;
  variant?: "primary" | "secondary";
  onClick?: () => void;
  className?: string;
};

export default function Button({
  children,
  variant = "primary",
  onClick,
  className,
}: ButtonProps) {
  const baseStyles =
    "px-6 py-2 rounded-full font-semibold transition-all duration-300 flex items-center gap-2";

  const variants = {
    primary:
      "bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:opacity-90 shadow-lg shadow-purple-500/30",
    secondary:
      "border border-white text-white hover:bg-white hover:text-purple-900",
  };

  return (
    <button
      onClick={onClick}
      className={cn(baseStyles, variants[variant], className)}
    >
      {children}
    </button>
  );
}
