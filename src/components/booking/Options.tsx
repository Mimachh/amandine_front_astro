import React, { useEffect, useState } from 'react'
import type { ExtrasProps, StateExtraObject } from '../types/ServiceTypes'

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Switch } from "@/components/ui/switch"
import { Input } from '../ui/input';
import { Minus, Plus } from 'lucide-react';
import { Separator } from '../ui/separator';
import TitleStep from './TitleStep';
import { Button } from "@/components/ui/button"

interface OptionsProps {
  options: ExtrasProps[];
  stateExtra: StateExtraObject;
  setStateExtra: React.Dispatch<React.SetStateAction<StateExtraObject>>;
  color: string;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  currentStep: number;
}
export default function Options(props: OptionsProps) {
  const { options, stateExtra, setStateExtra, color, currentStep, setCurrentStep } = props;

  const handleSwitchChange = (optionId: string, checked: boolean, price: number) => {
    setStateExtra((prev) => {
      if (checked) {
        return {
          ...prev,
          [optionId]: {
            quantity: prev[optionId]?.quantity || 0,
            switch: checked,
            price: price, // Ajouter le prix dans le state
          },
        };
      } else {
        // If switch is turned off, omit the option from the state
        const { [optionId]: removed, ...rest } = prev;
        return rest;
      }
    });
  };

  const handleQuantityChange = (optionId: string, value: number, maxQuantity?: number) => {


    // Assurez-vous que la valeur est dans la plage autorisée (entre 0 et maxQuantity)
    const clampedValue = Math.min(Math.max(value, 0), maxQuantity);

    setStateExtra((prev) => ({
      ...prev,
      [optionId]: {
        ...prev[optionId],
        quantity: clampedValue,
      },
    }));
  };
  return (
    <>
      {options.length > 0 ? (
        <TitleStep
          title='Quelles extras souhaitez vous?'
          divClasses='pb-0 text-gray-800'
        />) : (
        <p className='flex items-center justify-center h-14 '>Aucune option disponible sur cette prestation</p>
      )}

      {options &&
        options.map((option, index) => (
          <div key={option.id} className='text-gray-800'>
            <FormField
              name={`${option.name}-${option.id}`}
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5 max-w-sm">
                    <FormLabel className="text-base">{option.name}</FormLabel>
                    <FormDescription>
                      {option.description} + {option.price}€
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                    className='text-gray-100'
                      style={{
                        backgroundColor: stateExtra[option.id]?.switch ? color : ""
                      }}
                      checked={stateExtra[option.id]?.switch || false}
                      onCheckedChange={(checked) => {
                        field.onChange(checked);
                        handleSwitchChange(option.id, checked, option.price);
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            {stateExtra[option.id]?.switch && (
              <FormItem
                className="text-center flex flex-row items-center justify-between rounded-lg border p-4 mt-4">
                <FormLabel>Quantité</FormLabel>
                <FormControl>
                  <div className="flex items-center ">
                    <button
                      type="button"
                      className="border h-10 px-3 py-2 rounded-l-md"
                      onClick={() => {
                        const currentValue = stateExtra[option.id]?.quantity;
                        handleQuantityChange(option.id, Math.max(currentValue - 1, 0), option.maxQuantity);
                      }}
                    >
                      <Minus
                        style={{
                          color: color
                        }}
                        className='w-4 h-4'
                      />
                    </button>
                    <div>
                      <Input
                        className="bg-white rounded-none border-x-0 pr-0 text-center w-24 focus:ring-none focus-visible:ring-0 focus-visible:ring-offset-0"
                        type="number"
                        readOnly
                        step={1}
                        min={0}
                        max={option.maxQuantity}
                        value={stateExtra[option.id]?.quantity || 0}
                        onChange={(e) => {
                          const value = parseInt(e.target.value, 10);
                          handleQuantityChange(option.id, value);
                        }}
                      />
                    </div>
                    <button
                      type="button"
                      className="border h-10 px-3 py-2 rounded-r-md"
                      onClick={() => {
                        const currentValue = stateExtra[option.id]?.quantity;
                        handleQuantityChange(option.id, currentValue + 1, option.maxQuantity);
                      }}
                    >
                      <Plus
                        style={{
                          color: color
                        }}
                        className='w-4 h-4'
                      />
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            {index < options.length - 1 &&
              <Separator
                style={{
                  backgroundColor: color
                }}
                className='mt-8 w-1/2 mx-auto' />
            }
          </div>
        ))}
        <Button
        type="button"
        onClick={() => {
          setCurrentStep(currentStep + 1)
        }}
        className="rounded-sm"
        style={{
          backgroundColor: color
        }}
        >Suivant</Button>
    </>
  )
}
