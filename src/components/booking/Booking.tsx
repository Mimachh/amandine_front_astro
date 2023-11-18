import { Fragment, useRef, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import axios from 'axios';
import { headers } from '@/helper/AmeliaCall';
// import { CheckIcon } from '@heroicons/react/24/outline'

interface BookingModalProps {
  open: boolean | false;
  setOpen: () => void;
  borderColor: string | null;
  serviceId: string | null;
}



export default function Booking(props: BookingModalProps) {
  const { open, setOpen, borderColor, serviceId } = props;
  const [loading, setLoading] = useState(true)
  const cancelButtonRef = useRef(null)


  const [service, setService] = useState([]);

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

  // console.log('service', service)
  // if (loading) {
  //   // Affichez le loader ou effectuez toute autre action pendant le chargement
  // }

  // if (error) {
  //   // Gérez l'erreur si nécessaire
  //   console.error('Erreur lors de la récupération des données:', error);
  // }
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
            style={{ background: borderColor, opacity: "35%"}}
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
                  <div>
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                      {/* <Check className="h-6 w-6 text-green-600" aria-hidden="true" /> */}
                    </div>
                    <div className="mt-3 text-center sm:mt-5">
                      <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                        Payment successful
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius aliquam laudantium explicabo
                          pariatur iste dolorem animi vitae error totam. At sapiente aliquam accusamus facere veritatis.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                      onClick={() => setOpen(false)}
                    >
                      Deactivate
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                      onClick={() => setOpen(false)}
                      ref={cancelButtonRef}
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
  )

}
