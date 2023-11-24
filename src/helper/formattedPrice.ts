import type { StateExtraObject } from "@/components/types/ServiceTypes";

export function getPriceWithOptions(startedPrice: number, extras: StateExtraObject): number {
    if (extras) {
      for (const key in extras) {
        if (extras.hasOwnProperty(key)) {
          const extra = extras[key];
  
          // Vérifiez si extra a les propriétés nécessaires
          if (extra) {
            startedPrice += (extra.quantity * extra.price);
          } else {
            console.error("Extra mal formé :", extra);
          }
        }
      }
    }
  
    return startedPrice;
  }