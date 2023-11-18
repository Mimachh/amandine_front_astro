import React, { useState, useEffect } from 'react'


import { CalendarDays, Search } from 'lucide-react'
import axios from 'axios'
import Booking from "@/components/booking/Booking"
import Loader from '@/components/Loader'
import { headers } from '@/helper/AmeliaCall'

export interface ServiceProps {
  aggregatedPrice: boolean;
  bringingAnyone: boolean;
  category: string | null;
  categoryId: number;
  color: string;
  coupons: any[]; // Si vous connaissez la structure exacte des coupons, vous pouvez remplacer any[]
  customPricing: string;
  deposit: number;
  depositPayment: string;
  depositPerPerson: boolean;
  description: string;
  duration: number;
  extras: any[]; // Remplacez any[] si vous connaissez la structure exacte des extras
  fullPayment: boolean;
  gallery: any[]; // Remplacez any[] si vous connaissez la structure exacte de la galerie
  id: number;
  limitPerCustomer: string;
  mandatoryExtra: boolean;
  maxCapacity: number;
  maxExtraPeople: number | null;
  minCapacity: number;
  minSelectedExtras: number | null;
  name: string;
  pictureFullPath: string | null;
  pictureThumbPath: string | null;
  position: number;
  price: number;
  priority: string;
  recurringCycle: string;
  recurringPayment: number;
  recurringSub: string;
  settings: string;
  show: boolean;
  status: string;
  timeAfter: number;
  timeBefore: number | null;
  translations: any | null;
}

export default function Services() {

  const [services, setServices] = useState<ServiceProps[]>([]);

  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [serviceId, setServiceId] = useState('');
  const [color, setColor] = useState("");
  



  const handleModal = (id: string, color: string) => {
    setIsOpen(true);
    setColor(color)
    setServiceId(id)
  }

  // Appelez la fonction fetchData au chargement de la page
  useEffect(() => {
 
    const fetchData = async () => {
      setLoading(true);
      const ameliaURL = import.meta.env.PUBLIC_AMELIA_URL;
   try {
     const response = await axios.get(`${ameliaURL}services`, {
       headers: headers,
     });
     setServices(response.data.data.services)
     setLoading(false)
   } catch (error) {
     console.error('Erreur lors de la récupération des services:', error);
   }
 };

    fetchData();
  }, []);

  return (
    <>
      <Booking
        open={isOpen}
        setOpen={setIsOpen}
        borderColor={color}
        serviceId={serviceId}
      />
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 text-center lg:px-8 ">
          <div className="mx-auto max-w-2xl prose lg:prose-xl">
            <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-5xl">Mes prestations</h2>
            <p className="mt-4 text-[14px] md:text-[17px] leading-8 text-gray-400 ">
              Découvrez ma gamme de prestations conçues pour sublimer votre beauté. Explorez chaque service en détail, de la réservation facile en ligne à la visualisation de la galerie pour avoir un aperçu de mon savoir-faire. Choisissez l'option qui correspond le mieux à vos besoins, et offrez-vous une expérience beauté personnalisée et mémorable. Votre satisfaction est ma priorité, à chaque étape de votre parcours beauté !
            </p>
          </div>

          <ul
            role="list"
            className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-6 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-8"
          >
            {loading ? (
              <Loader

              />
            ) : (services.filter(service => service.show).map((service) => (
              <li key={service.id}
                className={`rounded-2xl  bg-secondary dark:bg-primary px-8 py-10 border-t-[3px]`}
                style={{ borderTop: `3px solid ${service.color}` }}
                >
                <img className="mx-auto h-48 w-48 rounded-full md:h-56 md:w-56 object-cover aspect-auto" src={service.pictureFullPath} alt={service.name} />
                <h3 className="mt-6 text-base font-semibold leading-7 tracking-tight text-accent-foreground">{service.name}</h3>
                <p className="text-sm leading-6 text-muted-foreground dark:text-muted">{service.price} €</p>
                <ul role="list" className="mt-8 grid grid-cols-2 divide-x divide-accent-foreground">
                  <li className="flex justify-center">
                    <button type='button' className="text-accent-foreground hover:text-primary dark:hover:text-accent transition-colors ease">
                      <span className="sr-only">Calendrier de réservation</span>
                      <CalendarDays
                        onClick={() => {
                          handleModal(service.id, service.color)
                        }}
                      />
                    </button>
                  </li>
                  <li className="flex justify-center">
                    <a href="" className="text-accent-foreground hover:text-primary dark:hover:text-accent transition-colors ease">
                      <span className="sr-only">Voir les galeries</span>
                      <Search
                      />
                    </a>
                  </li>
                </ul>
              </li>
            )))}
          </ul>
        </div>
      </div>
    </>
  )
}
