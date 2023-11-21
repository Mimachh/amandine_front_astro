import { Fragment, useRef, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import axios from 'axios';
import { headers } from '@/helper/AmeliaCall';
import Loader from '../Loader';
import { Button } from '../ui/button';
import { X } from 'lucide-react';
import Calendar from './Calendar';
import { Separator } from "@/components/ui/separator"
import { format, startOfToday } from "date-fns"
import type { SlotsProps } from '../types/CalendarTypes';
import type { UserProps } from '../types/UserTypes';
import { durationFormatter } from '@/helper/formattedDates';
import Creneaux from './Creneaux';
import type { ServiceProps } from '../types/ServiceTypes';
import Tabulation from './Tabulation';



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

  // POUR CONSERVER LE CRENEAUX SELECTIONNE
  const [selectedSlotIndex, setSelectedSlotIndex] = useState<number | null>(null);
  // Les states que je vais réutiliser dans mon form
  const [daySelected, setDaySelected] = useState<string>(null);
  const [hourSelected, setHourSelected] = useState<string>(null);

  const [selectedDaySlots, setSelectedDaySlots] = useState<SlotsProps>({});

  const [slots, setSlots] = useState<SlotsProps[]>([]);
  const [employee, setEmployee] = useState<UserProps>();
  const [occupiedSlots, setOccupiedSlots] = useState<SlotsProps[]>([]);
  const [slotSelectedOccupied, setSlotSelectedOccupied] = useState<SlotsProps>({});

  const [busyness, setBusyness] = useState();

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {

      const ameliaURL = import.meta.env.PUBLIC_AMELIA_URL;
      const employeeID = import.meta.env.PUBLIC_EMPLOYEE_ID;
      const today = startOfToday();
      const formattedToday = format(today, "yyyy-MM-dd");

      setLoading(true);
      const urlSuffixService = `services/${serviceId}`;
      const urlSuffixSlots = `slots&serviceId=${serviceId}&startDateTime=${formattedToday}&duration=3600&providerIds=1&persons=1&excludeAppointmentId=null&timeAfter&timeBefore`;
      const urlSuffixEmployee = `users/providers/${employeeID}`



      const signal = controller.signal;

      try {
        const responseService = await axios.get(`${ameliaURL}${urlSuffixService}`, {
          headers: headers,
          signal: signal,
        });

        setService(responseService.data.data.service);


        const responseSlots = await axios.get(`${ameliaURL}${urlSuffixSlots}`, {
          headers: headers,
          signal: signal,
        });

        const responseEmployee = await axios.get(`${ameliaURL}${urlSuffixEmployee}`, {
          headers: headers,
          signal: signal,
        });


        const responseSettings = await axios.get(`${ameliaURL}entities&types=settings,resources`, {
          headers: headers,
          signal: signal,
        });


        setOccupiedSlots(responseSlots.data.data.occupied);
        console.log("occupied", responseSlots.data.data.occupied);
        // console.log("service", responseSettings);
        // console.log("employe", responseEmployee.data.data.user);
        // console.log(responseSlots.data.data.slots)
        setEmployee(responseEmployee.data.data.user);
        setSlots(responseSlots.data.data.slots);
        // console.log("busyness", responseSlots.data.data.busyness);
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
      setCurrentStep(1);
      setDaySelected(null)
      fetchData();
    }



    // Cleanup function to abort the fetch if the component is unmounted
    return () => {
      controller.abort();
    };
  }, [open, serviceId]);

  useEffect(() => {
    // Fonction pour obtenir les créneaux horaires associés à la date sélectionnée
    const getSlotsForSelectedDay = () => {
      // Vérifiez si daySelected est défini et existe dans le tableau de données
      if (daySelected && slots.hasOwnProperty(daySelected)) {
        // Récupérez les créneaux horaires associés à la date sélectionnée
        const slotsSelected = slots[daySelected];

        // Récupérez également les créneaux occupés associés à la date sélectionnée
        setSlotSelectedOccupied(occupiedSlots[daySelected]);
        setSelectedDaySlots(slotsSelected);
        return { slotsSelected, slotSelectedOccupied };
      }
      // Si la date sélectionnée n'existe pas dans le tableau de données, retournez un objet vide
      setSelectedDaySlots(null);
      return { slotsSelected: null, slotSelectedOccupied: null };
    };

    // Utilisation de la fonction pour obtenir les créneaux horaires associés à la date sélectionnée
    // const { slotsSelected, slotSelectedOccupied } = getSlotsForSelectedDay();
    getSlotsForSelectedDay()
    // Faites ce que vous devez avec slotsSelected et slotSelectedOccupied
    // ...

  }, [daySelected, slots]);

  console.log(hourSelected, "hourselected")
  // Tabulation
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-[500]" initialFocus={cancelButtonRef} onClose={setOpen}>
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
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
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
                className="relative transform overflow-hidden outline-primary rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg md:max-w-xl sm:p-6">
                {loading ? (
                  <Loader />
                ) : (
                  <>
                    <div className='fixed top-0 right-0 p-1'>
                      <Button
                        onClick={() => {
                          setOpen(false)
                          setDaySelected(null)
                        }}
                        className='px-2 py-2'
                        variant='secondary'
                        size='xs'><X className='w-4 h-4' />
                      </Button>
                    </div>

                    <div>
                      <div className="mt-1 text-start sm:mt-2">
                        <div className=' h-fit flex items-center gap-2'>
                          <img
                            className='w-16 h-full object-cover aspect-auto rounded-md'
                            src={service.pictureThumbPath} alt={service.name} />
                          <div>
                            <Dialog.Title as="h3" className="text-base md:text-lg font-semibold leading-6 text-gray-900">
                              Réservation : <span style={{ color: service.color }}>{service.name}</span>
                            </Dialog.Title>
                            <p className="text-[12px] md:text-[14px] text-gray-500 max-w-xs md:max-w-none">
                              {service.description}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="py-2">
                        <p className='text-[15px] text-gray-500'
                        >
                          <span className="underline">Durée :</span> <span
                            style={{ color: service.color }}
                          >{durationFormatter(service.duration)}min</span> - <span className="underline"> A partir de:</span> &nbsp;<span style={{ color: service.color }}>{service.price}€</span> - Paiement sur place</p>
                      </div>
                      {/* <p className='font-semibold text-gray-800 text-[18px] pt-1 pb-1'>Choisissez le jour de votre rendez-vous</p> */}

                      <Separator className="my-2" />

                      <Tabulation
                        setCurrentStep={setCurrentStep}
                        currentStep={currentStep}
                        setSelectedSlotIndex={setSelectedSlotIndex}
                        color={service.color}
                      />

                      <Separator className="my-2" />

                      <form action="">
                        {currentStep === 1 && (
                          <Calendar
                            service={service}
                            slots={slots}
                            employee={employee}
                            setCurrentStep={setCurrentStep}
                            currentStep={currentStep}
                            setDaySelected={setDaySelected}
                          />
                        )}

                        {currentStep === 2 && (
                          // CRENEAUX
                          <Creneaux
                            selectedDaySlots={selectedDaySlots}
                            duration={service.duration}
                            color={service.color}
                            setHourSelected={setHourSelected}
                            setCurrentStep={setCurrentStep}
                            currentStep={currentStep}
                            selectedSlotIndex={selectedSlotIndex}
                            setSelectedSlotIndex={setSelectedSlotIndex}
                          />
                        )}

                        {currentStep === 3 && (
                          // INFORMATION
                          <div>3</div>
                        )}

                        {currentStep === 4 && (
                          // CONFIRMATION
                          <div>4</div>
                        )}
                      </form>
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
