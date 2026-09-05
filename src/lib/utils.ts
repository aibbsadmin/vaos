import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Formato de moneda peruana usado en toda la demo. */
export function soles(n: number) {
  return `S/ ${n.toFixed(2)}`;
}

/** Colores de avatar — rotación de 6 de la paleta (doc 08, §5 Avatar). */
const AVATAR_COLORS = ["#1E8449", "#2F5233", "#D68910", "#3A6640", "#27AE60"];

export function avatarColor(seed: string) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return AVATAR_COLORS[h % AVATAR_COLORS.length];
}
