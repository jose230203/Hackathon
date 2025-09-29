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
    "px-6 py-2 font-['Montserrat'] font-medium transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-[0_0_25px_10px_rgba(168,85,247,1)] cursor-pointer";

  const variants = {
    primary:
      "bg-gradient-to-r from-[#A855F7] via-[#8B5CF6] to-[#6366F1] text-white rounded-[10px] hover:opacity-90 shadow-lg shadow-purple-500/30",
    secondary:
      "px-9 py-4 rounded-[20px] bg-[#352C73] text-white",
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