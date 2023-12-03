import React from 'react'

import { Button } from "@/components/ui/button"
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import { Input } from "@/components/ui/input"
import TitleStep from './TitleStep';
import { Textarea } from '../ui/textarea'
import { Checkbox } from '../ui/checkbox';


interface InformationsProps {
    control: any;
}

export default function Informations(props: InformationsProps) {
    const { control } = props;
    return (
        <>
            <TitleStep
                title='Informations supplémentaires'
                titleClasses='text-gray-800'
            />
            <div className='grid grid-cols-2 gap-3 text-gray-800'>
                <FormField
                    control={control}
                    name="nom"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nom *</FormLabel>
                            <FormControl>
                                <Input
                                    className="focus-visible:ring-offset-0 focus-visible:ring-0 bg-white"
                                    placeholder="Votre nom" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="prenom"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Prénom *</FormLabel>
                            <FormControl>
                                <Input
                                    className="focus-visible:ring-offset-0 focus-visible:ring-0 bg-white"
                                    placeholder="Votre prénom" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email *</FormLabel>
                            <FormControl>
                                <Input
                                    type='email'
                                    className="focus-visible:ring-offset-0 focus-visible:ring-0 bg-white"
                                    placeholder="Votre mail" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="telephone"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Téléphone *</FormLabel>
                            <FormControl>
                                <Input
                                    className="focus-visible:ring-offset-0 focus-visible:ring-0 bg-white"
                                    placeholder="Votre téléphone" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

            </div>
            <FormField
                control={control}
                name="notes"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel className='text-gray-800'>Notes supplémentaires</FormLabel>
                        <FormControl>
                            <Textarea
                                placeholder="Une allergie ? Un besoin particulier?"
                                className="resize-none focus-visible:ring-offset-0 focus-visible:ring-0 bg-white"
                                {...field}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={control}
                name="terms"
                render={({ field }) => (
                    <FormItem className="">
                        <div className='flex flex-row items-start space-x-3 space-y-0 '>
                            <FormControl>
                                <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    className='rounded-[5px]'
                                />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                                <FormLabel>
                                    J'accepte les <a className='text-blue-400 underline' href="/conditions">conditions d'utilisation</a>.
                                </FormLabel>
                            </div>
                        </div>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </>
    )
}
