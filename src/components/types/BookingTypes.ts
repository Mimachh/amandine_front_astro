import type {CustomerProps} from "./CustomerTypes"
import type {ExtrasProps} from "./ExtrasProps"

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
export interface BookingProps {
    booking: Booking;
    utcTime: utcTimeProps[]
}