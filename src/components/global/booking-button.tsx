import { useCustomModal } from '@/hooks/useCustomModal';
import React, { useEffect } from 'react'
import CustomModal from './custom-modal';
import { Button } from '../ui/button';
import { CalendarDays } from 'lucide-react';
import MultiStep from '../forms/MultiStep';
import { observeReservationButton } from '@/lib/observer';

const BookingButton = () => {
  const setOpen = useCustomModal.use.onOpen();
  const setDisplayTitle = useCustomModal.use.setDisplayTitle();


  useEffect(() => {
    observeReservationButton();
  }, []);

  return (
    <div>
      <CustomModal
        title="Réservez votre prestation"
        subheading="Où souhaitez-vous réaliser votre prestation ?"
        modalContainer="max-w-3xl"
      >
        <MultiStep />
      </CustomModal>

      <Button
        id='reservation_button'
        onClick={() => {
          setOpen();
          setDisplayTitle(true)
        }}
        className="font-montserrat rounded-sm bg-primary/80 px-12 xl:px-14 h-12 xl:h-14 transition-colors ease
          text-white text-sm xl:text-md font-semibold shadow-sm flex items-center gap-3
          hover:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        <CalendarDays className="w-5 xl:w-7 h-5 xl:h-7" />
        Je réserve une prestation
      </Button>
    </div>
  )
}

export default BookingButton