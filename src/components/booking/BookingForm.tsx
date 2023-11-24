import { Fragment, useRef, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import axios from 'axios';
import { headers } from '@/helper/AmeliaCall';
import Loader from '../Loader.jsx';
import { Button } from '../ui/button.tsx';
import { X } from 'lucide-react';
import Calendar from './Calendar.tsx';
import { Separator } from "@/components/ui/separator"
import { format, startOfToday } from "date-fns"
import type { SlotsProps } from '../types/CalendarTypes.ts';
import type { UserProps } from '../types/UserTypes.ts';
import { durationFormatter, formatDateTimeForStore } from '@/helper/formattedDates';
import Creneaux from './Creneaux.tsx';
import type {BookingProps} from "../types/BookingTypes.ts"
import type { ExtrasProps, StateExtraObject, ServiceProps } from '../types/ServiceTypes.ts';
import Tabulation from './Tabulation.tsx';
import Options from "./Options.tsx"
import Confirmation from './Confirmation.tsx';


import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import {
  Form
} from "@/components/ui/form"
import Informations from './Informations.tsx';
import { getPriceWithOptions } from '@/helper/formattedPrice.ts';
import { transformStateToExtras } from '@/helper/formattedExtras.ts';

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

  // LES EXTRAS
  const [extras, setExtras] = useState<ExtrasProps[]>([]);

  const [stateExtra, setStateExtra] = useState<StateExtraObject>({});
  // Tabulation
  const [currentStep, setCurrentStep] = useState(1);

  const ameliaURL = import.meta.env.PUBLIC_AMELIA_URL;
  const employeeID = import.meta.env.PUBLIC_EMPLOYEE_ID;
  const nombreParResa = import.meta.env.PUBLIC_NOMBRE_PERSON_BOOKING;
  const defaultStatusResa = import.meta.env.PUBLIC_DEFAULT_BOOKING_STATUS
  const [bookingValidated, setBookingValidated] = useState<BookingProps>()


  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {


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
        const responseSlots = await axios.get(`${ameliaURL}${urlSuffixSlots}`, {
          headers: headers,
          signal: signal,
        });
        const responseEmployee = await axios.get(`${ameliaURL}${urlSuffixEmployee}`, {
          headers: headers,
          signal: signal,
        });
        setService(responseService.data.data.service);
        setExtras(responseService.data.data.service.extras)
        setOccupiedSlots(responseSlots.data.data.occupied);
        setEmployee(responseEmployee.data.data.user);
        setSlots(responseSlots.data.data.slots);
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
      setCurrentStep(1);
      setDaySelected(null)
      setStateExtra({})
      form.reset()
    }
    return () => {
      controller.abort();
    };
  }, [open, serviceId]);


  useEffect(() => {
    // Fonction pour obtenir les créneaux horaires associés à la date sélectionnée
    const getSlotsForSelectedDay = () => {
      if (daySelected && slots.hasOwnProperty(daySelected)) {
        const slotsSelected = slots[daySelected];
        setSlotSelectedOccupied(occupiedSlots[daySelected]);
        setSelectedDaySlots(slotsSelected);
        return { slotsSelected, slotSelectedOccupied };
      }
      setSelectedDaySlots(null);
      return { slotsSelected: null, slotSelectedOccupied: null };
    };
    getSlotsForSelectedDay()
  }, [daySelected, slots]);




 

  const formSchema = z.object({
    nom: z.string().min(2).max(50),
    prenom: z.string().min(2).max(50),
    email: z.string().min(5).email(),
    telephone: z.string().min(10).max(10).nullable(),
    notes: z.string().max(60).nullable()
  });


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nom: "",
      prenom: "",
      email: "",
      telephone: "",
      notes: "",
    },
  });


  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    console.log({stateExtra})
      setLoading(true)
      // Je cherche le user via son mail
        // Je vérifie la validité des states, et je les transforme au bon format.
        // if (isValidDaySelected(daySelected) && isValidHourSelected(hourSelected)) {
          const formattedDateTime = formatDateTimeForStore(`${daySelected} ${hourSelected}`);

          try {
            const postBookingUrl = `bookings`
            const postBooking = await axios.post(`${ameliaURL}${postBookingUrl}`, {
              "type": "appointment",
              "bookings": [
                  {
                      "extras": transformStateToExtras(stateExtra),
                      "customFields": {},
                      "deposit": true,
                      "locale": "fr_FR",
                      "utcOffset": null,
                      "persons": 1,
                      "customerId": null,
                      "customer": {
                          "id": null,
                          "firstName": values.prenom,
                          "lastName": values.nom,
                          "email": values.email,
                          "phone": "",
                          "countryPhoneIso": "",
                          "externalId": null
                      },
                      "duration": service.duration
                  }
              ],
              "payment": {
                  "gateway": "onSite",
                  "currency": "USD",
                  "data": {}
              },
              "recaptcha": null,
              "locale": "fr_FR",
              "timeZone": "Europe/Paris",
              "bookingStart": formattedDateTime,
              "notifyParticipants": 1,
              "locationId": 1,
              "providerId": employeeID,
              "serviceId": serviceId,
              "utcOffset": null,
              "recurring": [],
              "package": [],
              "couponCode": null,
              "runInstantPostBookingActions": false
          },
              {
                headers: headers,
              }
            );

            console.log(postBooking)
            setBookingValidated(postBooking.data.data)
            const postBookingID = postBooking.data.data.appointment.id;
            const postBookingPaiementID = postBooking.data.data.paymentId;
            const postBookingCustomerID = postBooking.data.data.booking.customerId;
            try {
              const postBookingNotifcation = await axios.post(`${ameliaURL}bookings/success/${postBookingID}`, {
                "type": "appointment",
                "appointmentStatusChanged": false,
                "recurring": [],
                "packageId": null,
                "customerId": postBookingCustomerID,
                "paymentId": postBookingPaiementID,
                "packageCustomerId": null
              },
              {
                headers: headers,
              });
              console.log(postBookingNotifcation)
            } catch (error) {
              console.log(error)
            }
            setCurrentStep(currentStep + 1)
            setLoading(false)
          } catch (error) {
            console.log(error);
          }
          // Le else de la validité des données
        // } else {
        //   return null;
        // }
    
  }

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
                  <div className='min-h-[250px]'>
                    <Loader />
                  </div>
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
                          >{durationFormatter(service.duration)}min</span> - <span className="underline"> A partir de:</span> &nbsp;<span className="animate-pulse" style={{ color: service.color }}>
                            {getPriceWithOptions(service.price, stateExtra)}€
                          </span> - Paiement sur place</p>
                      </div>
                      {/* <p className='font-semibold text-gray-800 text-[18px] pt-1 pb-1'>Choisissez le jour de votre rendez-vous</p> */}

                      <Separator className="my-2" />

                      <Tabulation
                        setCurrentStep={setCurrentStep}
                        currentStep={currentStep}
                        setSelectedSlotIndex={setSelectedSlotIndex}
                        color={service.color}
                        daySelected={daySelected}
                        hourSelected={hourSelected}
                      />

                      <Separator className="my-2" />
                      <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

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
                              daySelected={daySelected}
                              currentStep={currentStep}
                              selectedSlotIndex={selectedSlotIndex}
                              setSelectedSlotIndex={setSelectedSlotIndex}
                            />
                          )}

                          {currentStep === 3 && (
                            // OPTION
                            <>
                              <Options
                                options={extras}
                                stateExtra={stateExtra}
                                setStateExtra={setStateExtra}
                                color={service.color}
                                setCurrentStep={setCurrentStep}
                                currentStep={currentStep}
                              />
                            </>
                          )}

                          {currentStep === 4 && (
                            // INFORMATIONS
                            <>
                              <Informations
                                control={form.control}
                              />
                              <Button
                                size='lg'
                                style={{
                                  backgroundColor: service.color
                                }}
                                type="submit">Valider</Button>
                            </>

                          )}


                          {currentStep === 5 && (
                            //CONFIRMATION
                            <Confirmation 
                            setOpen={setOpen}
                            color={service.color}
                            bookingValidated={bookingValidated}
                            />
                          )}

                        </form>
                      </Form>
                      <p className="flex items-center gap-2 justify-end mt-4">
                        <span>A payer sur place : </span>
                        <span
                          style={{
                            color: service.color
                          }}
                          className="font-semibold text-xl">{getPriceWithOptions(service.price, stateExtra)}€</span>
                      </p>
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

function isValidDaySelected(daySelected: string) {
  const regex = /^\d{4}-\d{2}-\d{2}$/; // Format attendu : "yyyy-MM-dd"
  return typeof daySelected === 'string' && regex.test(daySelected);
}

// Fonction de vérification pour hourSelected
function isValidHourSelected(hourSelected: string) {
  const regex = /^\d{2}h\d{2}-\d{2}h\d{2}$/; // Format attendu : "HH:mm-HH:mm"
  return typeof hourSelected === 'string' && regex.test(hourSelected);
}



