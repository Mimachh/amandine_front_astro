import{j as e,b as n}from"./utils.a8e16240.js";import{r as t}from"./index.14e20f1c.js";import{B as h,L as g,d as f,a as j,C as y,b as N,h as b}from"./BookingForm.13c07d89.js";import"./createLucideIcon.d78cd3cd.js";import"./index.0f6ca84b.js";function C(){const[d,i]=t.useState([]),[c,o]=t.useState(!1),[m,l]=t.useState(!0),[x,p]=t.useState(""),u=s=>{o(!0),p(s)};return t.useEffect(()=>{(async()=>{l(!0);const a="https://www.reservation-back.amandine-nails.fr/wp-admin/admin-ajax.php?action=wpamelia_api&call=/api/v1/";try{const r=await N.get(`${a}services`,{headers:b});i(r.data.data.services),l(!1)}catch(r){console.error("Erreur lors de la récupération des services:",r)}})()},[]),e.jsxs(e.Fragment,{children:[e.jsx(h,{open:c,setOpen:o,serviceId:x}),e.jsx("div",{className:"py-24 sm:py-24 bg-white",id:"services",children:e.jsxs("div",{className:"mx-auto max-w-7xl px-6 text-center lg:px-8 ",children:[e.jsxs("div",{className:"mx-auto max-w-2xl prose lg:prose-xl",children:[e.jsx("h2",{className:"font-mclaren text-3xl font-bold tracking-tight text-primary sm:text-5xl",children:"Mes prestations"}),e.jsx("p",{className:"mt-4 text-[14px] md:text-[17px] leading-8 text-gray-400 ",children:"Découvrez ma gamme de prestations conçues pour sublimer votre beauté. Réservez votre prestation en ligne en quelques clics."})]}),m?e.jsx("div",{className:"mt-[120px]",children:e.jsx(g,{})}):e.jsx("ul",{role:"list",className:"mx-auto mt-12 grid max-w-2xl grid-cols-1 gap-6 sm:grid-cols-2 lg:mx-auto lg:max-w-6xl lg:grid-cols-3 lg:gap-8",children:d.filter(s=>s.show).map(s=>e.jsxs("li",{className:"rounded-2xl shadow  bg-secondary dark:bg-secondary-foreground px-2 py-5 border-t-[3px] flex flex-col flex-1",style:{border:`0.5px solid ${s.color}`,borderTop:`3px solid ${s.color}`,backgroundColor:`${s.color}45`},children:[e.jsx("img",{style:{borderBottom:`7px solid ${s.color}`,borderTop:`7px solid ${s.color}`},className:"mx-auto h-48 w-48 rounded-full md:h-36 md:w-36 object-cover aspect-auto",src:s.pictureFullPath,alt:s.name}),e.jsxs("div",{className:"px-4",children:[e.jsx("h3",{className:"font-federicka mt-6 text-lg md:text-xl font-semibold leading-7 tracking-tight text-accent-foreground md:flex md:justify-start",style:{color:`${s.color}`},children:s.name}),e.jsxs("p",{className:"my-4 text-md leading-6 text-muted-foreground dark:text-muted md:flex md:justify-start",children:[f(s.duration),"min - à partir de"," ",s.price," €"]}),e.jsx("div",{className:"",children:n&&n.map(a=>e.jsxs("p",{className:"text-sm leading-8 text-muted-foreground dark:text-muted  gap-1 items-center flex justify-center md:justify-start",children:[e.jsx(j,{className:"w-5 h-5",style:{color:`${s.color}`}}),a.title]},a.id))})]}),e.jsxs("ul",{role:"list",className:"mt-5 grid grid-cols-2 divide-x divide-accent-foreground dark:divide-background",children:[e.jsx("li",{className:"flex justify-center",children:e.jsxs("button",{type:"button",style:{color:`${s.color}`},className:"text-accent-foreground hover:text-primary dark:hover:text-accent transition-colors ease",children:[e.jsx("span",{className:"sr-only",children:"Calendrier de réservation"}),e.jsx(y,{onClick:()=>{u(s.id)}})]})}),e.jsx("li",{className:"flex justify-center",children:e.jsxs("a",{href:`/mes-prestations/${s.name}`,className:"text-neutral-600 underline text-xs hover:text-primary dark:text-background dark:hover:text-primary transition-colors ease",children:[e.jsx("span",{className:"sr-only",children:"Voir les galeries"}),"En savoir plus"]})})]}),e.jsx("script",{type:"application/ld+json",children:`
                    {
                      "@context": "https://schema.org",
                      "@type": "Service",
                      "name": "${s.name}",
                      "description": "${s.description}",
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
                        "price": "${s.price}",
                        "priceCurrency": "EUR",
                        "availability": "https://schema.org/InStock"
                      }
                    }
                  `})]},s.id))})]})})]})}export{C as default};
