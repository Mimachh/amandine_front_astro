import { CalendarDays } from 'lucide-react'
import React, { useState } from 'react'
import Booking from '../booking/BookingForm'
import Loader from '../Loader';


interface OpenCalendarProps {
    serviceId: string;
    color: string;
}

export default function OpenCalendar(props: OpenCalendarProps) {

    const { color, serviceId } = props;
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(true);


    return (
        <>
            <Booking
                open={isOpen}
                setOpen={setIsOpen}
                serviceId={serviceId}
            />

            <button
                onClick={() => {
                    setIsOpen(true);
                }}
                disabled={isOpen}
                style={{
                    backgroundColor: color
                }}
                type="submit"
                className="flex disabled:bg-gray-200 w-full gap-3 items-center justify-center rounded-md border text-background hover:opacity-80 transition-all ease border-transparent px-8 py-3 text-base font-medium focus:outline-none focus:ring-2"
            >
                {isOpen ? (
                    <>Chargement...</>
                ) : (
                    <>
                        <CalendarDays />
                        Je réserve !
                    </>
                )}

            </button>
        </>
    )
}
