import { useState } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import { add, eachDayOfInterval, endOfMonth, endOfWeek, format, getDay, isAfter, isEqual, isSameMonth, isToday, parse, startOfToday, startOfWeek } from "date-fns"
import { fr } from 'date-fns/locale';
import type { CalendarProps, SlotsProps } from '../types/CalendarTypes'
import { getFormattedCurrentMonthDates, getFormattedDayOffDates } from '@/helper/formattedDates'
import TitleStep from './TitleStep';



function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}



export default function Calendar(props: CalendarProps) {



    const { service, slots, employee, setCurrentStep, currentStep, setDaySelected } = props;



    const today = startOfToday();
    const [selectedDay, setSelectedDay] = useState(today)
    const [currentMonth, setCurrentMonth] = useState(format(today, 'MMMM-yyyy'))

    let firstDayCurrentMonth = parse(currentMonth, 'MMMM-yyyy', new Date());
    const newDays = eachDayOfInterval({
        start: startOfWeek(firstDayCurrentMonth, { locale: fr }),
        // start: firstDayCurrentMonth,
        end: endOfWeek(endOfMonth(firstDayCurrentMonth), { locale: fr })
    })
    // console.log(employee.weekDayList)

    // Je m'occupe des slots
    // console.log("slots", slots)

    // Ici je récupère les slots du mois en cours, avec les jours non travaillé qui ne sont pas là.
    const currentMonthDates = getFormattedCurrentMonthDates(slots, newDays);
    // Les jours offs de l'employe
    const formattedDayOffDates = getFormattedDayOffDates(employee.dayOffList);
    // On retire les jours off du tableau de slots du mois.
    const filteredCurrentMonthDates = currentMonthDates.filter((date) => !formattedDayOffDates.includes(date));


    // console.log("employee", employee.service);



    function countSlotsForDay(date: Date, slots: SlotsProps[]) {
        const formattedDate = format(date, "yyyy-MM-dd", { locale: fr });
        const slot = slots[formattedDate];

        if (slot) {
            // Utilisez `as` pour indiquer le type attendu
            return (Object.values(slot) as any[]).reduce((count, hourArray) => count + hourArray.length, 0);
        }

        return 0; // Aucun slot trouvé pour la date donnée
    }




    function nextMonth() {
        let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
        setCurrentMonth(format(firstDayNextMonth, 'MMMM-yyyy'))
    }
    function previousMonth() {
        let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
        setCurrentMonth(format(firstDayNextMonth, 'MMMM-yyyy'))
    }

    return (
        <div>
            <TitleStep
                title='Choisissez un jour'
            />
            <div className="flex items-center">
                <h2 className="flex-auto text-sm font-semibold text-gray-900 capitalize">
                    {format(firstDayCurrentMonth, 'MMMM yyyy', { locale: fr })}
                </h2>
                <button
                    onClick={previousMonth}
                    type="button"
                    className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
                >
                    <span className="sr-only">Previous month</span>
                    <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                </button>
                <button
                    onClick={nextMonth}
                    type="button"
                    className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
                >
                    <span className="sr-only">Next month</span>
                    <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                </button>
            </div>
            <div className="mt-10 grid grid-cols-7 text-center text-xs leading-6 text-gray-500">
                <div>Lun</div>
                <div>Mar</div>
                <div>Mer</div>
                <div>Jeu</div>
                <div>Ven</div>
                <div>Sam</div>
                <div>Dim</div>
            </div>
            <div className="mt-2 grid grid-cols-7 text-sm ">
                {newDays.map((day, dayIdx) => (
                    <div key={day.toString()}
                        className={classNames(
                            dayIdx === 0 && colStartClasses[getDay(day)],
                            'py-2 rounded-full relative')
                        }>
                        <button
                            type="button"
                            onClick={() => {
                                setSelectedDay(day)
                                setDaySelected(format(day, "yyyy-MM-dd"))
                                setCurrentStep(currentStep + 1)
                            }}
                            disabled={day < today || !filteredCurrentMonthDates.includes(format(day, 'yyyy-MM-dd')) && !isToday(day) || countSlotsForDay(day, slots) == 0}
                            style={{
                                backgroundColor: isEqual(day, selectedDay) && isToday(day) ? service.color : undefined,
                                // background: isEqual(day, selectedDay) && isToday(day) ? `linear-gradient(0deg, transparent 50%, ${service.color} 50%), linear-gradient(0deg, orange 50%, transparent 50%)` : undefined,
                                // background:`linear-gradient(0deg, transparent 50%, transparent 50%), linear-gradient(0deg, orange 50%, transparent 50%)`,

                                color: !isEqual(day, selectedDay) && isToday(day) ? service.color : undefined,
                            }}
                            className={classNames(
                                isEqual(day, selectedDay) && 'text-white',
                                // !isEqual(day, selectedDay) && isToday(day) && 'text-indigo-600',
                                !isEqual(day, selectedDay) && !isToday(day) && isSameMonth(day, firstDayCurrentMonth) && 'text-gray-900',
                                !isEqual(day, selectedDay) && !isToday(day) && !isSameMonth(day, today) && 'text-gray-400',
                                // isEqual(day, selectedDay) && isToday(day) && `bg-[${color.toLowerCase()}]`,
                                isEqual(day, selectedDay) && !isToday(day) && 'bg-gray-900',
                                !isEqual(day, selectedDay) && 'hover:bg-gray-200',
                                (filteredCurrentMonthDates.includes(format(day, 'yyyy-MM-dd')) && !isEqual(day, selectedDay)) && 'bg-gray-50',
                                (isEqual(day, selectedDay) || isToday(day)) && 'font-semibold',
                                'mx-auto flex h-8 w-8 items-center justify-center rounded-full disabled:text-gray-300 disabled:hover:bg-white'
                            )}
                        >
                            <div className="relative">
                                <time dateTime={format(day, "yyyy-MM-dd")}>{format(day, 'd')}</time>

                               
                                {countSlotsForDay(day, slots) === 0 && (
                                    <span
                                        className='absolute right-1/2 translate-y-1/2 translate-x-1/2 bottom-0 p-1 rounded-full text-xs text-gray-300'>
                                             {/* Si le jour a 0 créneau, qu'il est dans les jours offs, et qu'il n'apparait pas dans la liste des jours travaillé de l'employé alors il est fermé */}
                                        {(formattedDayOffDates.includes(format(day, 'yyyy-MM-dd')) || !employee.weekDayList.some((dayOff) => dayOff.dayIndex === getDay(day))) ? (
                                            <>Fermé</>
                                        ) : (isAfter(day, today) ? (
                                            <>Complet</>
                                        ) : '')}
                                    </span>
                                )}



                            </div>

                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

let colStartClasses = [
    'col-start-0',
    'col-start-1',
    'col-start-2',
    'col-start-3',
    'col-start-4',
    'col-start-5',
    'col-start-6',
    // 'col-start-7'
]








