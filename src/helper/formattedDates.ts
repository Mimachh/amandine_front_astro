import type { dayOffListArray } from "@/components/types/CalendarTypes";
import { eachDayOfInterval, format, isSameDay, parseISO } from "date-fns";
import { fr } from "date-fns/locale";

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


export function durationFormatter(duration: number) {
    return duration / 60;
}



export function formatTimeForStore(timeString: string) {
    const [hours, minutes] = timeString.split("h");
    return `${hours}:${minutes}`;
}

export function formatDateTimeForStore(dateTimeString: string) {
    const [datePart, timePart] = dateTimeString.split(" ");
    const [startTime] = timePart.split("-");
    const formattedStartTime = formatTimeForStore(startTime);
    return `${datePart} ${formattedStartTime}`;
}