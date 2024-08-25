import { Fragment, useRef, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useSingleBookingModal } from '@/hooks/useSingleBookingModal'
import BookingForm from './BookingForm'
import { useService } from '@/hooks/useService'




const BookingModal = () => {
 
    const cancelButtonRef = useRef(null)
    const isOpen = useSingleBookingModal.use.isOpen()
    const setCloseModal = useSingleBookingModal.use.onClose()
    const setOpenModal = useSingleBookingModal.use.onOpen()
    const loading = useService.use.loading()
    const setLoading = useService.use.setLoading()
    const setService = useService.use.setService()
    const service = useService.use.service()

    const onClose = () => {
        setLoading(true)
        setCloseModal()
        setService(null)
    }
    return (
        <Transition.Root show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-[500]" initialFocus={cancelButtonRef} onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div
                        className={`fixed inset-0 bg-opacity-75 transition-opacity]`}
                        style={{ background: loading ? "grey" : service.color, opacity: "25%" }}
                    />
                </Transition.Child>

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="md:flex min-h-full items-center justify-center md:p-4 text-center sm:items-center ">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel
                                className="relative transform overflow-scroll outline-primary md:rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8  sm:w-full sm:max-w-lg md:max-w-xl md:h-fit h-screen bg-card">
                               
                                <BookingForm open={isOpen} setOpen={setOpenModal} setClose={setCloseModal} />
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default BookingModal