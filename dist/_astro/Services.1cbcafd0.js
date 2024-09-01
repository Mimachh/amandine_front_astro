import{j as e,b as l}from"./utils.f2607796.js";import{r as s}from"./index.6e000db3.js";import{u as h,a,C as g,M as f,L as y,d as j,b as N,g as b}from"./MultiStep.da291051.js";import{r as v}from"./checkbox.3bb28258.js";import"./createLucideIcon.2771e509.js";import"./index.5ad558da.js";function M(){const[i,d]=s.useState([]),[n,r]=s.useState(!0),c=h.use.setServiceId(),m=a.use.onOpen(),x=a.use.setIsPrestaAlreadyChoose(),p=a.use.setDisplayTitle(),u=t=>{c(t),p(!0),x(!0),m()};return s.useEffect(()=>{(async()=>{r(!0),d(await b()),r(!1)})()},[]),e.jsxs(e.Fragment,{children:[e.jsx(g,{title:"Réservez votre prestation",subheading:"Où souhaitez-vous réaliser votre prestation ?",modalContainer:"max-w-3xl",children:e.jsx(f,{})}),e.jsx("div",{className:"py-24 sm:py-24 bg-white",id:"services",children:e.jsxs("div",{className:"mx-auto max-w-7xl px-6 text-center lg:px-8 ",children:[e.jsxs("div",{className:"mx-auto max-w-2xl prose lg:prose-xl",children:[e.jsx("h2",{className:"font-mclaren text-3xl font-bold tracking-tight text-primary sm:text-5xl",children:"Mes prestations"}),e.jsx("p",{className:"mt-4 text-[14px] md:text-[17px] leading-8 text-gray-400 ",children:"Découvrez ma gamme de prestations conçues pour sublimer votre beauté. Réservez votre prestation en ligne en quelques clics."})]}),n?e.jsx("div",{className:"mt-[120px]",children:e.jsx(y,{})}):e.jsx("ul",{role:"list",className:"mx-auto mt-12 grid max-w-2xl grid-cols-1 gap-6 sm:grid-cols-2 lg:mx-auto lg:max-w-6xl lg:grid-cols-3 lg:gap-8",children:i.filter(t=>t.show).map(t=>e.jsxs("li",{className:"rounded-2xl shadow  bg-secondary dark:bg-secondary-foreground px-2 py-5 border-t-[3px] flex flex-col flex-1",style:{border:`0.5px solid ${t.color}`,borderTop:`3px solid ${t.color}`,backgroundColor:`${t.color}45`},children:[e.jsx("img",{style:{borderBottom:`7px solid ${t.color}`,borderTop:`7px solid ${t.color}`},className:"mx-auto h-48 w-48 rounded-full md:h-36 md:w-36 object-cover aspect-auto",src:t.pictureFullPath,alt:t.name}),e.jsxs("div",{className:"px-4",children:[e.jsx("h3",{className:"font-federicka mt-6 text-lg md:text-xl font-semibold leading-7 tracking-tight text-accent-foreground md:flex md:justify-start",style:{color:`${t.color}`},children:t.name}),e.jsxs("p",{className:"my-4 text-md leading-6 text-muted-foreground dark:text-muted md:flex md:justify-start",children:[j(t.duration),"min - à partir de"," ",t.price," €"]}),e.jsx("div",{className:"",children:l&&l.map(o=>e.jsxs("p",{className:"text-sm leading-8 text-muted-foreground dark:text-muted  gap-1 items-center flex justify-center md:justify-start",children:[e.jsx(v,{className:"w-5 h-5",style:{color:`${t.color}`}}),o.title]},o.id))})]}),e.jsxs("ul",{role:"list",className:"mt-5 grid grid-cols-2 divide-x divide-accent-foreground dark:divide-background",children:[e.jsx("li",{className:"flex justify-center",children:e.jsxs("button",{type:"button",style:{color:`${t.color}`},className:"text-accent-foreground hover:text-primary dark:hover:text-accent transition-colors ease",children:[e.jsx("span",{className:"sr-only",children:"Calendrier de réservation"}),e.jsx(N,{onClick:()=>{u(t.id)}})]})}),e.jsx("li",{className:"flex justify-center",children:e.jsxs("a",{href:`/mes-prestations/${t.name}`,className:"text-neutral-600 underline text-xs hover:text-primary dark:text-background dark:hover:text-primary transition-colors ease",children:[e.jsx("span",{className:"sr-only",children:"Voir les galeries"}),"En savoir plus"]})})]}),e.jsx("script",{type:"application/ld+json",children:`
                    {
                      "@context": "https://schema.org",
                      "@type": "Service",
                      "name": "${t.name}",
                      "description": "${t.description}",
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
                        "price": "${t.price}",
                        "priceCurrency": "EUR",
                        "availability": "https://schema.org/InStock"
                      }
                    }
                  `})]},t.id))})]})})]})}export{M as default};
