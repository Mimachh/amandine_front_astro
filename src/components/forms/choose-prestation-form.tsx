import React, { useEffect, useState } from 'react'
import type { ServiceProps } from '../types/ServiceTypes';
import { getServices } from '@/actions/get-services';
import { durationFormatter } from '@/helper/formattedDates';
import Loader from '../Loader';
import { useService } from '@/hooks/useService';

type Props = {
    redirectAfterLocalisation: () => void;
}
const ChoosePrestationForm = (props: Props) => {
    const { redirectAfterLocalisation } = props
    const [services, setServices] = useState<ServiceProps[]>([]);

    const [loading, setLoading] = useState(true);
    
    const serviceId = useService.use.serviceId()
    const setServiceId = useService.use.setServiceId()

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setServices(await getServices())
            setLoading(false);
        };
        fetchData();
    }, []);

    return (
        <div>
            {loading ? (
                <div><Loader  /></div>
            ) : (
                <div className='flex items-center gap-4'>
                   {services
                .filter((service) => service.show)
                .map((service) => (
                  <li
                    onClick={() => {
                        setServiceId(service.id)
                        redirectAfterLocalisation()
                    }}
                    key={service.id}
                    className={`transition-all duration-150 cursor-pointer hover:scale-105 h-[180px] rounded-2xl shadow  bg-secondary dark:bg-secondary-foreground px-2 py-5 border-t-[3px] flex flex-col flex-1 bg-[${service.color}]`}
                    style={{ border: `0.5px solid ${service.color}`, borderTop: `3px solid ${service.color}`, backgroundColor: `${service.color}1A` }}
                  >
                    <div className="px-4">
                      <h3
                        className="font-mclaren mt-6 text-md font-semibold leading-5 tracking-tight text-accent-foreground md:flex md:justify-start"
                        style={{ color: `${service.color}` }}
                      >
                        {service.name} 
                      </h3>
                      <p className="my-4 text-md leading-6 text-muted-foreground dark:text-muted md:flex md:justify-start">
                        {durationFormatter(service.duration)}min - à partir de{" "}
                        {service.price} €
                      </p>

                      {/* <div className="">
                      {bonusSupplementaires &&
                        bonusSupplementaires.map((bonus) => (
                          <p
                            key={bonus.id}
                            className="text-sm leading-8 text-muted-foreground dark:text-muted  gap-1 items-center flex justify-center md:justify-start"
                          >
                            <Check
                              className="w-5 h-5"
                              style={{ color: `${service.color}` }}
                            />
                            {bonus.title}
                          </p>
                        ))}
                      </div> */}
                    </div>

                    {/* <ul
                      role="list"
                      className="mt-5 grid grid-cols-2 divide-x divide-accent-foreground dark:divide-background"
                    >
                      <li className="flex justify-center">
                        <button
                          type="button"
                          style={{ color: `${service.color}` }}
                          className="text-accent-foreground hover:text-primary dark:hover:text-accent transition-colors ease"
                        >
                          <span className="sr-only">
                            Calendrier de réservation
                          </span>
                          <CalendarDays
                            onClick={() => {
                              handleModal(service.id);
                            }}
                          />
                        </button>
                      </li>
                      <li className="flex justify-center">
                        <a
                          href={`/mes-prestations/${service.name}`}
                          className="text-neutral-600 underline text-xs hover:text-primary dark:text-background dark:hover:text-primary transition-colors ease"
                        >
                          <span className="sr-only">Voir les galeries</span>
                          En savoir plus
                        </a>
                      </li>
                    </ul> */}
                  </li>
                ))}
                </div>
            )}
        </div>
    )
}

export default ChoosePrestationForm