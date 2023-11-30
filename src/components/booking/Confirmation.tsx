import React, { useEffect, useState } from 'react'
import type { BookingProps } from '../types/BookingTypes';
import { Button } from '../ui/button';
import { headers } from '@/helper/AmeliaCall';
import axios from 'axios';
import Loader from '../Loader';
import TitleStep from './TitleStep';
import { format } from 'date-fns';
import { durationFormatter } from '@/helper/formattedDates';
import { CheckCircle } from 'lucide-react';
interface ConfirmationProps {
  setOpen: (value: boolean) => void;
  bookingValidated: BookingProps;
  color: string;
}

export default function Confirmation(props: ConfirmationProps) {
  const { setOpen, bookingValidated, color } = props;
  const [loading, setLoading] = useState(true)
  const [extrasBookedDetails, setExtrasBookedDetails] = useState([]); // State pour stocker les détails des extras réservés

  const extrasBooked = bookingValidated.booking.extras;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ameliaURL = import.meta.env.PUBLIC_AMELIA_URL;
        const urlSuffixExtra = "extras";

        // Récupérer les détails de tous les extras de la base de données
        const extrasResponse = await axios.get(`${ameliaURL}${urlSuffixExtra}`, {
          headers: headers,
        });

        // console.log(extrasResponse.data.data)
        const allExtras = extrasResponse.data.data.extras; // Supposons que allExtras est un tableau contenant tous les extras de la base de données

        // Filtrer les détails des extras réservés en fonction de leurs IDs
        const extrasBookedDetails = extrasBooked.map((extraBooked) => {
          const extraDetail = allExtras.find((dbExtra) => dbExtra.id === extraBooked.extraId);
          return {
            ...extraBooked,
            name: extraDetail ? extraDetail.name : "N/A", // Supposons que le nom de l'extra est stocké dans la propriété "name"
          };
        });

        setExtrasBookedDetails(extrasBookedDetails);
        setLoading(false)
      } catch (error) {
        console.error('Erreur lors de la récupération des extras :', error);
      }
    };

    fetchData();
  }, [extrasBooked]);

  return (
    <div className='text-gray-800'>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className='flex items-center justify-center gap-4 pt-3 pb-5'>
          <CheckCircle 
          style={{
            color: color
          }}
          className='w-5 h-5'/>
            <TitleStep
            divClasses="p-0"
              title={`Confirmation de réservation pour ${bookingValidated.booking.customer.firstName} ${bookingValidated.booking.customer.lastName}`}
            />
          </div>

          <p>Merci {bookingValidated.booking.customer.firstName} de votre réservation! <br /></p>
          <p>Je vous attends à mon salon le {format(new Date(bookingValidated.utcTime[0].start), 'dd/MM/yyyy à hh:mm')}
          </p>
          <p className='font-semibold mt-6 mb-2'>Informations complémentaires : </p>
          <ul className='space-y-2'>
            <li>Vous recevrer un e-mail de confirmation ainsi qu'un rappel 24h avant le rendez-vous à l'adresse : {bookingValidated.booking.customer.email}</li>
            <li>La prestation d'une durée de {durationFormatter(bookingValidated.booking.duration)}min, sera facturée {bookingValidated.booking.price}€ <small>(+ extras éventuels)</small></li>
          </ul>
          <div className='mt-4'>
            <p className='font-semibold underline'>Adresse du salon :</p>
            <ul>
              <li>4, rue du Fourneau</li>
              <li>72220 LAIGNE EN BELIN</li>
            </ul>
          </div>
          {/* {extrasBookedDetails.map((extra, index) => (
            <div key={index}>
              <p>Extra ID: {extra.extraId}</p>
              <p>Name: {extra.name}</p>
              <p>Quantity: {extra.quantity}</p>
              <p>Price: {extra.price}</p>
            </div>
          ))} */}
          <div className='w-full flex justify-center'>
            <Button
              style={{
                backgroundColor: color
              }}
              type='button'
              className='mt-8 '
              onClick={() => setOpen(false)}
              variant='default'>Continuer</Button>
          </div>

        </>
      )}

    </div>
  )
}

