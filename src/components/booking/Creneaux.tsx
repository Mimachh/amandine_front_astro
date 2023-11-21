import React, { useState, useEffect } from 'react';
import type { SlotsProps } from '../types/CalendarTypes';
import Loader from '../Loader';

interface CreneauxProps {
  selectedDaySlots: SlotsProps;
  duration: number;
  color: string;
  setHourSelected: (value: string) => void;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  currentStep: number;
  setSelectedSlotIndex: (value: number) => void;
  selectedSlotIndex: number;
}

export default function Creneaux(props: CreneauxProps) {
  const { selectedDaySlots, duration, color, setHourSelected, setCurrentStep, currentStep,
    selectedSlotIndex, setSelectedSlotIndex
  } = props;
  const [loading, setLoading] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    setLoading(false);
  }, [selectedDaySlots]);

  if (loading) {
    return <div><Loader /></div>;
  }

  return (
    <div>
      {/* Afficher les créneaux ici */}
      {selectedDaySlots && (
        <div className='text-gray-800'>
          <ul 
          style={{
            color: color,

          }}
          className={`grid md:grid-cols-4 grid-cols-3 gap-1 text-center`}>
            {Object.entries(selectedDaySlots).map(([startDateTime, slot], index) => (
              <li 
              style={{
                border: `1px solid ${color}`,
                backgroundColor: index === hoveredIndex ? color : (index === selectedSlotIndex ? color : 'transparent'),
                // opacity: index === hoveredIndex ? "90%" : '',
                color: index === hoveredIndex ? "white" : (index === selectedSlotIndex ? "white" : ''),
                transition: 'all ease 0.4s',
              }}
              onMouseOver={() => setHoveredIndex(index)}
              onMouseOut={() => setHoveredIndex(null)}
              key={startDateTime} className={`rounded-[5px] cursor-pointer`}>
                <button
                type='button'
                className='py-1 w-full h-full'
                onClick={() => {
                  setSelectedSlotIndex(index)
                  setHourSelected(`${formatHour(startDateTime)}-${formatHour(addDuration(startDateTime, duration))}`)
                  setCurrentStep(currentStep + 1)
                }}
                >
                    {formatHour(startDateTime)}-{formatHour(addDuration(startDateTime, duration))}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

// Fonction pour ajouter la durée à un horaire
function addDuration(startTime: string, durationInSeconds: number): string {
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
function formatHour(hour: string): string {
  const [hourPart, minutePart] = hour.split(':');
  const formattedHour = parseInt(hourPart, 10).toString();
  return `${formattedHour}h${minutePart}`;
}
