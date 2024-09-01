import { CalendarDays } from 'lucide-react'
import { useService } from '@/hooks/useService';
import CustomModal from '../global/custom-modal';
import MultiStep from '../forms/MultiStep';
import { useCustomModal } from '@/hooks/useCustomModal';

interface OpenCalendarProps {
    serviceId: string;
    color: string;
}

export default function OpenCalendar(props: OpenCalendarProps) {

    const { color, serviceId } = props;

    const setServiceId = useService.use.setServiceId();
    const setOpen = useCustomModal.use.onOpen();
    const isOpen = useCustomModal.use.isOpen();
    const setIsPrestaChoose = useCustomModal.use.setIsPrestaAlreadyChoose();
    const setDisplayTitle = useCustomModal.use.setDisplayTitle();


    const handleModal = (id: string) => {
        setServiceId(id);
        setIsPrestaChoose(true)
        setDisplayTitle(true)
        setOpen()
    };


    return (
        <>
            <CustomModal
                title="Réservez votre prestation"
                subheading="Où souhaitez-vous réaliser votre prestation ?"
                modalContainer="max-w-3xl"
            >
                <MultiStep />
            </CustomModal>
         

            <button
                onClick={() => {
                    handleModal(serviceId);
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
