import{j as e}from"./utils.24dec797.js";import{r as s}from"./index.8e848da3.js";import{B as i,C as l}from"./BookingForm.184dbf2d.js";import"./index.bdf2509e.js";import"./index.52e8a673.js";import"./index.e272b91d.js";function f(n){const{color:o,serviceId:a}=n,[r,t]=s.useState(!1);return s.useState(!0),e.jsxs(e.Fragment,{children:[e.jsx(i,{open:r,setOpen:t,serviceId:a}),e.jsx("button",{onClick:()=>{t(!0)},disabled:r,style:{backgroundColor:o},type:"submit",className:"flex disabled:bg-gray-200 w-full gap-3 items-center justify-center rounded-md border text-background hover:opacity-80 transition-all ease border-transparent px-8 py-3 text-base font-medium focus:outline-none focus:ring-2",children:r?e.jsx(e.Fragment,{children:"Chargement..."}):e.jsxs(e.Fragment,{children:[e.jsx(l,{}),"Je réserve !"]})})]})}export{f as default};
