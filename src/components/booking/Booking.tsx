import { Fragment, useRef, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import axios from 'axios';
import { headers } from '@/helper/AmeliaCall';
import Loader from '../Loader';
import { Button } from '../ui/button';
import { X } from 'lucide-react';
import type { ServiceProps } from '../sections/main/Services';
import Calendar from './Calendar';
// import { CheckIcon } from '@heroicons/react/24/outline'

interface BookingModalProps {
  open: boolean | false;
  setOpen: (value: boolean) => void;
  serviceId: string | null;
}



export default function Booking(props: BookingModalProps) {
  const { open, setOpen, serviceId } = props;
  const [loading, setLoading] = useState(true)
  const cancelButtonRef = useRef(null)


  const [service, setService] = useState<ServiceProps>({});

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      setLoading(true);
      const urlSuffixService = `services/${serviceId}`;
      const urlSuffixSlots = `slots&serviceId=${serviceId}&serviceDuration=3600&providerIds=1&persons=1&excludeAppointmentId=null`;
      const ameliaURL = import.meta.env.PUBLIC_AMELIA_URL;

      const signal = controller.signal;

      try {
        const responseService = await axios.get(`${ameliaURL}${urlSuffixService}`, {
          headers: headers,
          signal: signal,
        });

        setService(responseService.data.data.service);
        console.log("service", responseService);

        const responseSlots = await axios.get(`https://www.amandine-server.kmllr.fr/wp-admin/admin-ajax.php?action=wpamelia_api&call=/api/v1/${urlSuffixSlots}`, {
          headers: headers,
          signal: signal,
        });

        console.log("fetch", responseSlots);
        setLoading(false);
      } catch (error) {
        if (error.name === 'AbortError') {
          console.log('Request aborted');
        } else {
          console.error('Error fetching data:', error);
          setLoading(false);
        }
      }
    };

    if (open) {
      fetchData();
    }

    // Cleanup function to abort the fetch if the component is unmounted
    return () => {
      controller.abort();
    };
  }, [open, serviceId]);

  console.log('service', service)

  function durationFormatter(duration: number) {
    return duration / 60;
  }
  return (
    // <div>
    //   - Calendrier de date / On clique sur un jour
    //   - Créneaux qui s'ajout sur le côté.
    // </div>

    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
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
            style={{ background: loading ? "grey" : service.color, opacity: "35%" }}
          />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
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

                className="relative transform overflow-hidden outline-primary rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                {loading ? (
                  <Loader />
                ) : (
                  <>
                    <div className='fixed top-0 right-0 p-3'>
                      <Button
                        onClick={() => setOpen(false)}
                        className='px-2 py-0'
                        size='sm'><X className='w-4 h-4' />
                      </Button>
                    </div>

                    <div>
                      <div className="mt-1 text-start sm:mt-2">
                        <div className=' h-fit flex items-center gap-2'>
                          <img
                            className='w-16 h-full object-cover aspect-auto rounded-md'
                            src={service.pictureThumbPath} alt={service.name} />
                          <div>
                            <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                              Réservation : <span style={{ color: service.color }}>{service.name}</span>
                            </Dialog.Title>
                            <p className="text-[12px] text-gray-500">
                              {service.description}
                            </p>
                            <div>
                              <p className='text-[14px] text-gray-500'
                              >
                                Durée : <span
                                  style={{ color: service.color }}
                                >{durationFormatter(service.duration)}min</span> - A partir de <span style={{ color: service.color }}>{service.price}€</span></p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <p className='font-semibold text-[14px]'>Choisissez le jour de votre rendez-vous</p>
                      <Calendar />
                    </div>
                  </>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )

}
