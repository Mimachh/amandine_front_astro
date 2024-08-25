import { useCustomModal } from '@/hooks/useCustomModal';
import React, { useEffect } from 'react'
import CustomModal from './custom-modal';
import { Button } from '../ui/button';
import { CalendarDays } from 'lucide-react';
import MultiStep from '../forms/MultiStep';
import { observeReservationButton } from '@/lib/observer';

const BookingButton = () => {
  const setOpen = useCustomModal.use.onOpen();

  // multi step
  // 1 . select localization
  // 2 . result if a domicile = contact / if en salon : step 3
  // 3 . select type of presta
  // 4 . classic form 
  useEffect(() => {
    observeReservationButton();
  }, []);
  return (
    <div>
      <CustomModal
        title="Modifier la section"
        subheading="Loream ipsum"
        modalContainer="max-w-3xl"
      >
        <MultiStep />
      </CustomModal>

        <Button
        id='reservation_button'
        onClick={setOpen}
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