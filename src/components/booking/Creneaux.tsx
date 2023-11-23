import React, { useState, useEffect } from 'react';
import type { SlotsProps } from '../types/CalendarTypes';
import Loader from '../Loader';
import TitleStep from './TitleStep';
import { addHours, format, isAfter, isSameDay, parse, startOfToday } from 'date-fns';

interface CreneauxProps {
  selectedDaySlots: SlotsProps;
  duration: number;
  color: string;
  setHourSelected: (value: string) => void;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  currentStep: number;
  setSelectedSlotIndex: (value: number) => void;
  selectedSlotIndex: number;
  daySelected: string;
}

export default function Creneaux(props: CreneauxProps) {
  const { selectedDaySlots, duration, color, setHourSelected, setCurrentStep, currentStep,
    selectedSlotIndex, setSelectedSlotIndex, daySelected
  } = props;
  const [loading, setLoading] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [hasAvailableSlots, setHasAvailableSlots] = useState(true)
  console.log(selectedDaySlots)
  useEffect(() => {
    setLoading(false);
  }, [selectedDaySlots]);

  if (loading) {
    return <div><Loader /></div>;
  }
  let availableSlotsCount = 0;
  return (
    <div>
      <TitleStep
        title='Choisissez une heure'
      />
      {/* Afficher les créneaux ici */}
      {selectedDaySlots && (
        <div className='text-gray-800'>
          <ul
            style={{
              color: color,

            }}
            className={`grid md:grid-cols-4 grid-cols-3 gap-1 text-center`}>
            {Object.entries(selectedDaySlots).map(([startDateTime, slot], index) => {
              const isTodayOrLater = isSameDay(parse(daySelected, 'yyyy-MM-dd', new Date()), startOfToday());


              // Si le créneau est pour aujourd'hui, exclure les créneaux pour les 4 prochaines heures
              if (isTodayOrLater) {
                const fourHoursLater = addHours(new Date(), 6);
                const slotStartTime = parse(startDateTime, 'HH:mm', new Date());

                if (isAfter(slotStartTime, fourHoursLater)) {
                  // ... le reste du code
                  availableSlotsCount++; // Incrémenter le compteur
                  return (
                    getList(index, startDateTime)
                  );
                }
              } else {
                // ... le reste du code pour les jours qui ne sont pas aujourd'hui
                availableSlotsCount++; // Incrémenter le compteur
                return (
                  getList(index, startDateTime)
                );
              }

              return null// Ne rien afficher si ce n'est pas aujourd'hui ou avant 4 heures
            })}
          </ul>
          {availableSlotsCount === 0 && (
            <p className='italic text-sm text-center text-red-600'>Désolé, il n'y a plus de créneaux disponibles pour cette journée.</p>
          )}
        </div>
      )}
    </div>
  );


  function getList(index: number, startDateTime: string) {
    return (
      <li
        style={{
          border: `1px solid ${color}`,
          backgroundColor: index === hoveredIndex ? color : (index === selectedSlotIndex ? color : 'transparent'),
          color: index === hoveredIndex ? 'white' : (index === selectedSlotIndex ? 'white' : ''),
          transition: 'all ease 0.4s',
        }}
        onMouseOver={() => setHoveredIndex(index)}
        onMouseOut={() => setHoveredIndex(null)}
        key={startDateTime}
        className={`rounded-[5px] cursor-pointer`}
      >
        <button
          type='button'
          className='py-1 w-full h-full'
          onClick={() => {
            setSelectedSlotIndex(index);
            setHourSelected(`${formatHour(startDateTime)}-${formatHour(addDuration(startDateTime, duration))}`);
            setCurrentStep(currentStep + 1);
          }}
        >
          {formatHour(startDateTime)}-{formatHour(addDuration(startDateTime, duration))}
        </button>
      </li>
    )
  }
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

