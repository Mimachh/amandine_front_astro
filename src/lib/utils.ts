import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}




export const bonusSupplementaires = [
  {
    id: 1,
    title: "Paiement sur place",
  },
  {
    id: 2,
    title: "Café ou chocolat offert",
  },
]