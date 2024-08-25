"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ArrowRightIcon } from "lucide-react";
import { Checkbox } from "../ui/checkbox";
import { ExclamationCircleIcon } from "@heroicons/react/20/solid";
import { toast } from "sonner"
import { Toaster } from "../ui/sonner";

const NewsletterForm = () => {

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
          if(error.response.data.message === "Cet e-mail est déjà enregistré.") {
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
                          <>
                            <span className="inline-flex whitespace-nowrap text-xs opacity-0 transition-all duration-200 group-hover/button:-translate-x-2.5 group-hover/button:opacity-100">Je m'inscris</span>
                            <ArrowRightIcon className="w-4 absolute right-1.5" />
                          </>
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
  )
}

export default NewsletterForm