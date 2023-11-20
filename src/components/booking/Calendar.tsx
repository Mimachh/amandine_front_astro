import { Fragment, useState } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import { Menu, Transition } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline'
import { add, eachDayOfInterval, endOfMonth, endOfWeek, format, getDay, isEqual, isSameDay, isSameMonth, isToday, isWithinInterval, parse, parseISO, startOfMonth, startOfToday, startOfWeek } from "date-fns"
import { fr } from 'date-fns/locale';
import type { ServiceProps } from '../sections/main/Services'
import type { SlotsProps, UserProps, dayOffListArray } from './Booking'



function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

interface CalendarProps {
    service: ServiceProps;
    slots: SlotsProps[];
    employee: UserProps;
}
export default function Calendar(props: CalendarProps) {



    const { service, slots, employee } = props;



    const today = startOfToday();
    const [selectedDay, setSelectedDay] = useState(today)
    const [currentMonth, setCurrentMonth] = useState(format(today, 'MMMM-yyyy'))
    let firstDayCurrentMonth = parse(currentMonth, 'MMMM-yyyy', new Date());
    const newDays = eachDayOfInterval({
        start: startOfWeek(firstDayCurrentMonth, { locale: fr }),
        // start: firstDayCurrentMonth,
        end: endOfWeek(endOfMonth(firstDayCurrentMonth), { locale: fr })
    })


    // Je m'occupe des slots
    // console.log("slots", slots)

    // Ici je récupère les slots du mois en cours, avec les jours non travaillé qui ne sont pas là.
    const currentMonthDates = getFormattedCurrentMonthDates(slots, newDays);
    // Les jours offs de l'employe
    const formattedDayOffDates = getFormattedDayOffDates(employee.dayOffList);
    // On retire les jours off du tableau de slots du mois.
    const filteredCurrentMonthDates = currentMonthDates.filter((date) => !formattedDayOffDates.includes(date));


    // console.log("employee", employee.service);



    // function countSlotsForDay(date, slots) {
    //     const formattedDate = format(date, "yyyy-MM-dd", { locale: fr });
    //     const slot = slots[formattedDate];

    //     if (slot) {
    //         // Retournez la longueur du tableau d'objets dans le slot
    //         return Object.values(slot).reduce((count, hourArray) => count + hourArray.length, 0);
    //     }

    //     return 0; // Aucun slot trouvé pour la date donnée
    // }




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
                            }}
                            disabled={day < today || !filteredCurrentMonthDates.includes(format(day, 'yyyy-MM-dd')) && !isToday(day)}
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
                                {/* <span className="absolute top-0 right-0 p-1 bg-gray-600 rounded-full text-white">
                                    {countSlotsForDay(day, slots)}
                                </span> */}
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



export function getFormattedDayOffDates(dayOffList: dayOffListArray[]): string[] {
    const dayOffDates: string[] = [];

    dayOffList.forEach((dayOff) => {
        const startDate = parseISO(dayOff.startDate);
        const endDate = parseISO(dayOff.endDate);

        const datesInInterval = eachDayOfInterval({ start: startDate, end: endDate });
        const formattedDates = datesInInterval.map((date) => format(date, "yyyy-MM-dd", { locale: fr }));
        dayOffDates.push(...formattedDates);
    });

    return dayOffDates;
}




export function getFormattedCurrentMonthDates(slots: Record<string, any>, newDays: Date[]): string[] {
    return Object.keys(slots)
        .map((dateString) => parseISO(dateString))
        .filter((date) => newDays.some((day) => isSameDay(day, date)))
        .map((formattedDate) => format(formattedDate, "yyyy-MM-dd", { locale: fr }));
}




