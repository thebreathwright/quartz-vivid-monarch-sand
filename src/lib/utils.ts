import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function shortHash(hex: string, n = 8) {
  if (!hex) return "—";
  return hex.slice(0, n);
}

export function nowIso() {
  return new Date().toISOString();
}
