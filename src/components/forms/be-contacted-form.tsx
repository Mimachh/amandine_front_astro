import React, { useState } from 'react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { toast } from 'sonner';
import axios from 'axios';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Toaster } from '../ui/toaster';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { ExclamationCircleIcon } from '@heroicons/react/20/solid';
import { Checkbox } from '../ui/checkbox';
import { Phone } from 'lucide-react';

const BeContactedForm = () => {
    const [loading, setLoading] = useState(false)



    const newsletterFormSchema = z.object({
        email: z.string().email("Veuillez entrer une adresse e-mail valide."),
        terms: z.boolean().refine(value => value === true, {
            message: "Vous devez accepter les conditions d'utilisation pour vous inscrire à la newsletter.",
        }),
    })

    const newsletterForm = useForm<z.infer<typeof newsletterFormSchema>>({
        resolver: zodResolver(newsletterFormSchema),
        defaultValues: {
            email: "",
            terms: false,
        },
    })

    function onSubmit(values: z.infer<typeof newsletterFormSchema>) {
        setLoading(true);

        const apiUrl = `${import.meta.env.PUBLIC_WORDPRESS_BASE_URL}/wp-json/custom-newsletter-subs/v1/submit`;
        try {
            axios.post(apiUrl, {
                email: values.email,
            })
                .then(response => {
                    // console.log('Réponse de l\'API:', response.data.message);
                    toast.success("Merci de vous être inscrit à notre newsletter !")
                    newsletterForm.reset()
                })
                .catch(error => {
                    // console.error('Erreur lors de la requête POST:', error.response.data.message);
                    if (error.response.data.message === "Cet e-mail est déjà enregistré.") {
                        toast.error("Cet e-mail est déjà enregistré.")
                    } else {
                        toast.error("Une erreur s'est produite lors de l'inscription à la newsletter, veuillez réessayer plus tard.")
                    }
                })
                .finally(() => {
                    setLoading(false);
                });

        } catch (error) {
            // console.error('Erreur lors de la requête POST:', error);
            setLoading(false);
        }
    }

    const watchEmailError = newsletterForm.formState.errors.email
    const watchTermsError = newsletterForm.formState.errors.terms
    return (
        <section className='mt-8'>
            <p className='text-2xl font-montserrat text-center font-bold max-w-[480px] mx-auto'>Les prestation à domicile ne sont pas disponible en ligne pour l'instant.
            </p>
            <p className='text-xl font-semibold font-montserrat text-center my-10'>Vous pouvez :</p>

            <div className='text-center flex items-center gap-4 justify-center'>
               <Phone className='w-10 h-10 text-primary' />
               <p className='text-lg font-montserrat  font-semibold'>M'appeler au <a className='font-montserrat underline font-medium' href="tel:0679296889">06792296889</a></p>
            </div>
            <p className='text-center text-2xl font-semibold font-montserrat my-10
            w-3/4 mx-auto border-b border-primary/60 leading-[0.1rem]
            '><span className='px-[10px] bg-white text-primary font-montserrat font-bold '>OU</span></p>
            <p className='text-center font-montserrat text-lg font-semibold'>Demander à être recontacté en remplissant le formulaire suivant : </p>
            <Form {...newsletterForm}>
                <form className="max-w-sm mx-auto pt-4 pb-12"
                    onSubmit={newsletterForm.handleSubmit(onSubmit)}
                >
                    <Toaster />
                    <div className="relative mt-6 ">
                        <FormField
                            control={newsletterForm.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem className='w-full text-left'>
                                    <FormControl>
                                        <div className='flex items-end gap-2 w-full relative'>
                                            <Input type="email" placeholder="Email" {...field}
                                                className="
                        ring-offset-none ring-offset-none focus-visible:ring-none
                        block w-full h-[40px] rounded-2xl bg-background py-4 pl-6 pr-20 text-base/6 text-accent-foreground ring-4 ring-transparent transition placeholder:text-neutral-500 focus:border-background focus:outline-none focus:ring-muted"
                                            />
                                            <div className="absolute inset-y-1 right-1 flex justify-end">
                                                <Button
                                                    disabled={loading}
                                                    type="submit"
                                                    className=" aspect-square h-full items-center justify-center rounded-xl bg-primary/80 text-muted  hover:bg-primary group/button relative inline-flex  w-7 overflow-hidden  font-medium text-white transition-all duration-300 hover:w-24"
                                                    variant="default"
                                                >
                                                    {loading ? (
                                                        <p>...</p>
                                                    ) : (
                                                        <></>
                                                    )}
                                                </Button>
                                            </div>
                                        </div>

                                    </FormControl>
                                    {watchEmailError && (
                                        <div className="text-destructive bg-background p-2 rounded-md flex items-center gap-2">
                                            <ExclamationCircleIcon className="w-10 h-10" />
                                            <FormMessage />
                                        </div>
                                    )}


                                </FormItem>
                            )}
                        />
                        <FormField
                            control={newsletterForm.control}
                            name="terms"
                            render={({ field }) => (
                                <FormItem className="">
                                    <div className="mt-3 space-x-3 leading-none">
                                        <FormControl>
                                            <Checkbox
                                                className="rounded-[5px] border-white bg-white"
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>

                                        <FormLabel className="text-white">
                                            En vous inscrivant à la newsletter vous acceptez nos <a href="/">condition d'utilisation.</a>
                                        </FormLabel>

                                    </div>
                                    {watchTermsError && (
                                        <div className="text-destructive bg-background p-2 rounded-md flex items-center gap-2">
                                            <ExclamationCircleIcon className="min-w-10 h-10" />
                                            <FormMessage />
                                        </div>
                                    )}
                                </FormItem>
                            )}
                        /> 
                    </div>
                </form>
            </Form>
        </section>
    )
}

export default BeContactedForm