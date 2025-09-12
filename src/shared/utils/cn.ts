import { clsx, ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Helper para combinar clases de Tailwind sin conflictos.
 * Ejemplo:
 * cn("px-4 py-2", condition && "bg-red-500", "bg-blue-500")
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
