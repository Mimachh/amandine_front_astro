import{j as e,b as l}from"./utils.24dec797.js";import{r as t}from"./index.8e848da3.js";import{B as h,L as g,d as f,C as j,a as y,h as b}from"./BookingForm.c299d622.js";import{c as v,C as N}from"./index.3dc68583.js";import"./index.52e8a673.js";const k=v("Search",[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["path",{d:"m21 21-4.3-4.3",key:"1qie3q"}]]);function E(){const[n,d]=t.useState([]),[c,o]=t.useState(!1),[m,i]=t.useState(!0),[x,p]=t.useState(""),u=s=>{o(!0),p(s)};return t.useEffect(()=>{(async()=>{i(!0);const a="https://www.reservation-back.amandine-nails.fr/wp-admin/admin-ajax.php?action=wpamelia_api&call=/api/v1/";try{const r=await y.get(`${a}services`,{headers:b});d(r.data.data.services),i(!1)}catch(r){console.error("Erreur lors de la récupération des services:",r)}})()},[]),e.jsxs(e.Fragment,{children:[e.jsx(h,{open:c,setOpen:o,serviceId:x}),e.jsx("div",{className:"py-24 sm:py-32",id:"services",children:e.jsxs("div",{className:"mx-auto max-w-7xl px-6 text-center lg:px-8 ",children:[e.jsxs("div",{className:"mx-auto max-w-2xl prose lg:prose-xl",children:[e.jsx("h2",{className:"text-3xl font-bold tracking-tight text-primary sm:text-5xl",children:"Mes prestations"}),e.jsx("p",{className:"mt-4 text-[14px] md:text-[17px] leading-8 text-gray-400 ",children:"Découvrez ma gamme de prestations conçues pour sublimer votre beauté. Explorez chaque service en détail, de la réservation facile en ligne à la visualisation de la galerie pour avoir un aperçu de mon savoir-faire. Choisissez l'option qui correspond le mieux à vos besoins, et offrez-vous une expérience beauté personnalisée et mémorable. Votre satisfaction est ma priorité, à chaque étape de votre parcours beauté !"})]}),m?e.jsx("div",{className:"mt-[120px]",children:e.jsx(g,{})}):e.jsx("ul",{role:"list",className:"mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-6 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-8",children:n.filter(s=>s.show).map(s=>e.jsxs("li",{className:"rounded-2xl  bg-secondary dark:bg-secondary-foreground px-8 py-5 border-t-[3px]",style:{borderTop:`3px solid ${s.color}`},children:[e.jsx("img",{style:{borderBottom:`7px solid ${s.color}`,borderTop:`7px solid ${s.color}`},className:"mx-auto h-48 w-48 rounded-full md:h-56 md:w-56 object-cover aspect-auto",src:s.pictureFullPath,alt:s.name}),e.jsxs("div",{className:"",children:[e.jsx("h3",{className:"mt-6 text-lg md:text-xl font-semibold leading-7 tracking-tight text-accent-foreground md:flex md:justify-start",style:{color:`${s.color}`},children:s.name}),e.jsxs("p",{className:"text-sm leading-6 text-muted-foreground dark:text-muted md:flex md:justify-start",children:[f(s.duration),"min - à partir de ",s.price," €"]}),l&&l.map(a=>e.jsxs("p",{className:"text-sm leading-6 text-muted-foreground dark:text-muted  gap-1 items-center flex justify-center md:justify-start",children:[e.jsx(N,{className:"w-5 h-5",style:{color:`${s.color}`}}),a.title]},a.id))]}),e.jsxs("ul",{role:"list",className:"mt-5 grid grid-cols-2 divide-x divide-accent-foreground dark:divide-background",children:[e.jsx("li",{className:"flex justify-center",children:e.jsxs("button",{type:"button",style:{color:`${s.color}`},className:"text-accent-foreground hover:text-primary dark:hover:text-accent transition-colors ease",children:[e.jsx("span",{className:"sr-only",children:"Calendrier de réservation"}),e.jsx(j,{onClick:()=>{u(s.id)}})]})}),e.jsx("li",{className:"flex justify-center",children:e.jsxs("a",{href:`/mes-prestations/${s.name}`,className:"text-accent-foreground hover:text-primary dark:text-background dark:hover:text-primary transition-colors ease",children:[e.jsx("span",{className:"sr-only",children:"Voir les galeries"}),e.jsx(k,{})]})})]}),e.jsx("script",{type:"application/ld+json",children:`
                    {
                      "@context": "https://schema.org",
                      "@type": "Service",
                      "name": "${s.name}",
                      "description": "${s.description}",
                      "provider": {
                        "@type": "LocalBusiness",
                        "name": "Amandine Nails"
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
                        "price": "${s.price}",
                        "priceCurrency": "EUR",
                        "availability": "https://schema.org/InStock"
                      }
                    }
                  `})]},s.id))})]})})]})}export{E as default};
