import type { StateExtraObject } from "@/components/types/ServiceTypes";

export function transformStateToExtras(stateExtra: StateExtraObject) {
    // Filtrer les éléments avec switch à true
    const selectedExtras = Object.entries(stateExtra)
      .filter(([extraId, extraData]) => extraData.switch)
      .map(([extraId, extraData]) => ({
        extraId: parseInt(extraId, 10),
        quantity: extraData.quantity,
      }));
  
    // Vérifier si des extras sont sélectionnés
    if (selectedExtras.length > 0) {
      return selectedExtras;
    } else {
      return [];
    }
  }