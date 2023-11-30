// Fonction pour ajouter la durée à un horaire
export function addDuration(startTime: string, durationInSeconds: number): string {
    const [startHour, startMinute] = startTime.split(':').map(Number);
  
    // Convertir le temps de début en minutes
    const totalStartMinutes = startHour * 60 + startMinute;
  
    // Calculer le temps de fin en minutes
    const totalEndMinutes = totalStartMinutes + durationInSeconds / 60;
  
    // Extraire l'heure et les minutes de totalEndMinutes
    const endHour = Math.floor(totalEndMinutes / 60);
    const endMinute = Math.round(totalEndMinutes % 60);
  
    // Formater l'heure de fin
    const formattedEndHour = String(endHour).padStart(2, '0');
    const formattedEndMinute = String(endMinute).padStart(2, '0');
  
    return `${formattedEndHour}:${formattedEndMinute}`;
  }
  
  // Fonction pour formater l'heure au format "H:mm"
  export function formatHour(hour: string): string {
    const [hourPart, minutePart] = hour.split(':');
    const formattedHour = parseInt(hourPart, 10).toString();
    return `${formattedHour}h${minutePart}`;
  }




