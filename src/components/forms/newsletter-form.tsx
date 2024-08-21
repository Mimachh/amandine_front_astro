"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ArrowRightIcon } from "lucide-react";

const NewsletterForm = () => {

  const [loading, setLoading] = useState(false)



  const newsletterFormSchema = z.object({
    email: z.string().email("Veuillez entrer une adresse e-mail valide."),
  })

  const newsletterForm = useForm<z.infer<typeof newsletterFormSchema>>({
    resolver: zodResolver(newsletterFormSchema),
    defaultValues: {
      email: "",
    },
  })

  function onSubmit(values: z.infer<typeof newsletterFormSchema>) {
    setLoading(true);

    const apiUrl = `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-json/custom-newsletter-subs/v1/submit`;
    try {
      axios.post(apiUrl, {
        email: values.email,
      })
        .then(response => {
          console.log('Réponse de l\'API:', response.data.message);
          // showNotification('Nous vous avons bien inscrit sur notre newsletter, merci !', 'success', 'Inscription réussie !');
          newsletterForm.reset()
        })
        .catch(error => {
          console.error('Erreur lors de la requête POST:', error.response.data.message);
          // showNotification(error.response.data.message, 'error', 'Erreur');
        })
        .finally(() => {
          setLoading(false);
        });

    } catch (error) {
      console.error('Erreur lors de la requête POST:', error);
      setLoading(false);
    }
  }

  return (
    <Form {...newsletterForm}>
      <form className="max-w-sm mx-auto pt-4 pb-12"
        onSubmit={newsletterForm.handleSubmit(onSubmit)}
      >
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
                          block w-full h-[40px] rounded-2xl border border-muted-foreground bg-background py-4 pl-6 pr-20 text-base/6 text-accent-foreground ring-4 ring-transparent transition placeholder:text-neutral-500 focus:border-background focus:outline-none focus:ring-muted"
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
                <FormMessage className="text-white text-center" />
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  )
}

export default NewsletterForm