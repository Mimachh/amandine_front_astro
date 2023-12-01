import{r as c}from"./index.8e848da3.js";import{c as E,j as N,a as P}from"./utils.24dec797.js";import{r as k}from"./index.52e8a673.js";var j={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};const A=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),Z=(e,n)=>{const t=c.forwardRef(({color:r="currentColor",size:o=24,strokeWidth:s=2,absoluteStrokeWidth:i,children:a,...l},u)=>c.createElement("svg",{ref:u,...j,width:o,height:o,stroke:r,strokeWidth:i?Number(s)*24/Number(o):s,className:`lucide lucide-${A(e)}`,...l},[...n.map(([v,d])=>c.createElement(v,d)),...(Array.isArray(a)?a:[a])||[]]));return t.displayName=`${e}`,t};function $(){return $=Object.assign?Object.assign.bind():function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])}return e},$.apply(this,arguments)}function V(e,n){typeof e=="function"?e(n):e!=null&&(e.current=n)}function S(...e){return n=>e.forEach(t=>V(t,n))}function H(...e){return c.useCallback(S(...e),e)}const g=c.forwardRef((e,n)=>{const{children:t,...r}=e,o=c.Children.toArray(t),s=o.find(z);if(s){const i=s.props.children,a=o.map(l=>l===s?c.Children.count(i)>1?c.Children.only(null):c.isValidElement(i)?i.props.children:null:l);return c.createElement(x,$({},r,{ref:n}),c.isValidElement(i)?c.cloneElement(i,void 0,a):null)}return c.createElement(x,$({},r,{ref:n}),t)});g.displayName="Slot";const x=c.forwardRef((e,n)=>{const{children:t,...r}=e;return c.isValidElement(t)?c.cloneElement(t,{...R(r,t.props),ref:n?S(n,t.ref):t.ref}):c.Children.count(t)>1?c.Children.only(null):null});x.displayName="SlotClone";const O=({children:e})=>c.createElement(c.Fragment,null,e);function z(e){return c.isValidElement(e)&&e.type===O}function R(e,n){const t={...n};for(const r in n){const o=e[r],s=n[r];/^on[A-Z]/.test(r)?o&&s?t[r]=(...a)=>{s(...a),o(...a)}:o&&(t[r]=o):r==="style"?t[r]={...o,...s}:r==="className"&&(t[r]=[o,s].filter(Boolean).join(" "))}return{...e,...t}}const y=e=>typeof e=="boolean"?"".concat(e):e===0?"0":e,C=E,B=(e,n)=>t=>{var r;if(n?.variants==null)return C(e,t?.class,t?.className);const{variants:o,defaultVariants:s}=n,i=Object.keys(o).map(u=>{const v=t?.[u],d=s?.[u];if(v===null)return null;const f=y(v)||y(d);return o[u][f]}),a=t&&Object.entries(t).reduce((u,v)=>{let[d,f]=v;return f===void 0||(u[d]=f),u},{}),l=n==null||(r=n.compoundVariants)===null||r===void 0?void 0:r.reduce((u,v)=>{let{class:d,className:f,...h}=v;return Object.entries(h).every(b=>{let[p,m]=b;return Array.isArray(m)?m.includes({...s,...a}[p]):{...s,...a}[p]===m})?[...u,d,f]:u},[]);return C(e,i,l,t?.class,t?.className)},_=B("inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",{variants:{variant:{default:"bg-primary text-primary-foreground hover:bg-primary/90",destructive:"bg-destructive text-destructive-foreground hover:bg-destructive/90",outline:"border border-input bg-background hover:bg-accent hover:text-accent-foreground",secondary:"bg-secondary text-secondary-foreground hover:bg-secondary/80",ghost:"hover:bg-accent hover:text-accent-foreground",link:"text-primary underline-offset-4 hover:underline"},size:{default:"h-10 px-4 py-2",sm:"h-9 rounded-md px-3",lg:"h-11 rounded-md px-8",xs:"h-7 rounded-sm px-3",icon:"h-10 w-10"}},defaultVariants:{variant:"default",size:"default"}}),L=c.forwardRef(({className:e,variant:n,size:t,asChild:r=!1,...o},s)=>{const i=r?g:"button";return N.jsx(i,{className:P(_({variant:n,size:t,className:e})),ref:s,...o})});L.displayName="Button";const M=["a","button","div","form","h2","h3","img","input","label","li","nav","ol","p","span","svg","ul"],I=M.reduce((e,n)=>{const t=c.forwardRef((r,o)=>{const{asChild:s,...i}=r,a=s?g:n;return c.useEffect(()=>{window[Symbol.for("radix-ui")]=!0},[]),c.createElement(a,$({},i,{ref:o}))});return t.displayName=`Primitive.${n}`,{...e,[n]:t}},{});function q(e,n){e&&k.flushSync(()=>e.dispatchEvent(n))}function G(e,n,{checkForDefaultPrevented:t=!0}={}){return function(o){if(e?.(o),t===!1||!o.defaultPrevented)return n?.(o)}}function J(e,n=[]){let t=[];function r(s,i){const a=c.createContext(i),l=t.length;t=[...t,i];function u(d){const{scope:f,children:h,...b}=d,p=f?.[e][l]||a,m=c.useMemo(()=>b,Object.values(b));return c.createElement(p.Provider,{value:m},h)}function v(d,f){const h=f?.[e][l]||a,b=c.useContext(h);if(b)return b;if(i!==void 0)return i;throw new Error(`\`${d}\` must be used within \`${s}\``)}return u.displayName=s+"Provider",[u,v]}const o=()=>{const s=t.map(i=>c.createContext(i));return function(a){const l=a?.[e]||s;return c.useMemo(()=>({[`__scope${e}`]:{...a,[e]:l}}),[a,l])}};return o.scopeName=e,[r,T(o,...n)]}function T(...e){const n=e[0];if(e.length===1)return n;const t=()=>{const r=e.map(o=>({useScope:o(),scopeName:o.scopeName}));return function(s){const i=r.reduce((a,{useScope:l,scopeName:u})=>{const d=l(s)[`__scope${u}`];return{...a,...d}},{});return c.useMemo(()=>({[`__scope${n.scopeName}`]:i}),[i])}};return t.scopeName=n.scopeName,t}function w(e){const n=c.useRef(e);return c.useEffect(()=>{n.current=e}),c.useMemo(()=>(...t)=>{var r;return(r=n.current)===null||r===void 0?void 0:r.call(n,...t)},[])}function Q({prop:e,defaultProp:n,onChange:t=()=>{}}){const[r,o]=W({defaultProp:n,onChange:t}),s=e!==void 0,i=s?e:r,a=w(t),l=c.useCallback(u=>{if(s){const d=typeof u=="function"?u(e):u;d!==e&&a(d)}else o(u)},[s,e,o,a]);return[i,l]}function W({defaultProp:e,onChange:n}){const t=c.useState(e),[r]=t,o=c.useRef(r),s=w(n);return c.useEffect(()=>{o.current!==r&&(s(r),o.current=r)},[r,o,s]),t}const D=globalThis?.document?c.useLayoutEffect:()=>{};function X(e){const[n,t]=c.useState(void 0);return D(()=>{if(e){t({width:e.offsetWidth,height:e.offsetHeight});const r=new ResizeObserver(o=>{if(!Array.isArray(o)||!o.length)return;const s=o[0];let i,a;if("borderBoxSize"in s){const l=s.borderBoxSize,u=Array.isArray(l)?l[0]:l;i=u.inlineSize,a=u.blockSize}else i=e.offsetWidth,a=e.offsetHeight;t({width:i,height:a})});return r.observe(e,{box:"border-box"}),()=>r.unobserve(e)}else t(void 0)},[e]),n}export{J as $,L as B,$ as _,H as a,g as b,Z as c,w as d,I as e,G as f,q as g,D as h,X as i,Q as j,S as k,B as l};
