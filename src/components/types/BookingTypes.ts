import type {CustomerProps} from "./CustomerTypes"
import type {ExtrasProps} from "./ExtrasTypes"

export interface Booking {
    customer: CustomerProps;
    duration: number;
    price: number;
    persons: number;
    extras: ExtrasProps[]
}

interface utcTimeProps {
start: string;
end: string;
}

interface BookingAppointmentHours {
    bookingEnd : string;
    bookingStart: string;
}
export interface BookingProps {
    booking: Booking;
    appointment: BookingAppointmentHours;
    utcTime: utcTimeProps[]
}