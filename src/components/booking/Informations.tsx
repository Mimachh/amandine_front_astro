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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { Input } from "@/components/ui/input"
import TitleStep from './TitleStep';
import { Textarea } from '../ui/textarea'


interface InformationsProps {
    control: any;
}

export default function Informations(props: InformationsProps) {
    const { control } = props;
    return (
        <>
            <TitleStep
                title='Informations supplémentaires'
            />
            <div className='grid grid-cols-2 gap-3'>
                <FormField
                    control={control}
                    name="nom"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nom *</FormLabel>
                            <FormControl>
                                <Input
                                    className="focus-visible:ring-offset-0 focus-visible:ring-0"
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
                                    className="focus-visible:ring-offset-0 focus-visible:ring-0"
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
                                    className="focus-visible:ring-offset-0 focus-visible:ring-0"
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
                                    className="focus-visible:ring-offset-0 focus-visible:ring-0"
                                    placeholder="Votre téléphone" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="notes"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Notes supplémentaires</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Tell us a little bit about yourself"
                                    className="resize-none"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="where"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a verified email to display" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent className='z-[5001]'>
                                    <SelectItem value="m@example.com">m@example.com</SelectItem>
                                    <SelectItem value="m@google.com">m@google.com</SelectItem>
                                    <SelectItem value="m@support.com">m@support.com</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
        </>
    )
}
