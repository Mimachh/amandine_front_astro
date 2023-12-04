import React, { useState, useEffect } from 'react'
import { CalendarDays, Check, Search } from 'lucide-react'
import axios from 'axios'
import Booking from "@/components/booking/BookingForm"
import Loader from '@/components/Loader'
import { headers } from '@/helper/AmeliaCall'
import type { ServiceProps } from '@/components/types/ServiceTypes'
import { durationFormatter } from '@/helper/formattedDates'
import { bonusSupplementaires } from '@/lib/utils'


export default function Services() {

  const [services, setServices] = useState<ServiceProps[]>([]);

  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [serviceId, setServiceId] = useState('');


  const handleModal = (id: string) => {
    setIsOpen(true);
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

  // console.log({services})
  return (
    <>
      <Booking
        open={isOpen}
        setOpen={setIsOpen}
        serviceId={serviceId}
      />
      <div className="py-24 sm:py-32" id='services'>
        <div className="mx-auto max-w-7xl px-6 text-center lg:px-8 ">
          <div className="mx-auto max-w-2xl prose lg:prose-xl">
            <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-5xl">Mes prestations</h2>
            <p className="mt-4 text-[14px] md:text-[17px] leading-8 text-gray-400 ">
              Découvrez ma gamme de prestations conçues pour sublimer votre beauté. Explorez chaque service en détail, de la réservation facile en ligne à la visualisation de la galerie pour avoir un aperçu de mon savoir-faire. Choisissez l'option qui correspond le mieux à vos besoins, et offrez-vous une expérience beauté personnalisée et mémorable. Votre satisfaction est ma priorité, à chaque étape de votre parcours beauté !
            </p>
          </div>


          {loading ? (
            <div className='mt-[120px]'>
              <Loader />
            </div>
          ) : (
            <ul
              role="list"
              className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-6 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-8"
            >
              {services.filter(service => service.show).map((service) => (
                <li key={service.id}
                  className={`rounded-2xl  bg-secondary dark:bg-secondary-foreground px-8 py-5 border-t-[3px]`}
                  style={{ borderTop: `3px solid ${service.color}` }}
                >
                  <img
                    style={{
                      borderBottom: `7px solid ${service.color}`,
                      borderTop: `7px solid ${service.color}`,
                    }}
                    className="mx-auto h-48 w-48 rounded-full md:h-56 md:w-56 object-cover aspect-auto" src={service.pictureFullPath} alt={service.name} />
                  <div className=''>
                    <h3 className="mt-6 text-lg md:text-xl font-semibold leading-7 tracking-tight text-accent-foreground md:flex md:justify-start"
                      style={{ color: `${service.color}` }}
                    >{service.name}</h3>
                    <p className="text-sm leading-6 text-muted-foreground dark:text-muted md:flex md:justify-start"
                    >{durationFormatter(service.duration)}min - à partir de {service.price} €</p>

                    {bonusSupplementaires && bonusSupplementaires.map((bonus) => (
                      <p
                        key={bonus.id}
                        className="text-sm leading-6 text-muted-foreground dark:text-muted  gap-1 items-center flex justify-center md:justify-start">
                        <Check className='w-5 h-5'
                          style={{ color: `${service.color}` }}
                        />
                        {bonus.title}
                      </p>
                    ))}
                  </div>

                  <ul role="list" className="mt-5 grid grid-cols-2 divide-x divide-accent-foreground dark:divide-background"
                  >
                    <li className="flex justify-center">
                      <button type='button'
                        style={{ color: `${service.color}` }}
                        className="text-accent-foreground hover:text-primary dark:hover:text-accent transition-colors ease">
                        <span className="sr-only">Calendrier de réservation</span>
                        <CalendarDays
                          onClick={() => {
                            handleModal(service.id)
                          }}
                        />
                      </button>
                    </li>
                    <li className="flex justify-center">
                      <a href={`/mes-prestations/${service.name}`} className="text-accent-foreground hover:text-primary dark:text-background dark:hover:text-primary transition-colors ease">
                        <span className="sr-only">Voir les galeries</span>
                        <Search
                        />
                      </a>
                    </li>
                  </ul>
                  <script type="application/ld+json">
                  {`
                    {
                      "@context": "https://schema.org",
                      "@type": "Service",
                      "name": "${service.name}",
                      "description": "${service.description}",
                      "provider": {
                        "@type": "LocalBusiness",
                        "name": "Amandine Nails",
                        "address": {
                          "@type": "PostalAddress",
                          "streetAddress": "4 rue du Fourneau",
                          "addressLocality": "Laigné en Belin",
                          "postalCode": "72220",
                          "addressCountry": "Sarthe Le Mans France"
                        }
                      },
                      "offers": {
                        "@type": "Offer",
                        "price": "${service.price}",
                        "priceCurrency": "EUR",
                        "availability": "https://schema.org/InStock"
                      }
                    }
                  `}
                </script>
                </li>
              ))}

            </ul>
          )}

        </div>
      </div>
    </>
  )
}


