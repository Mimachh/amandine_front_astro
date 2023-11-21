export interface ServiceProps {
  aggregatedPrice?: boolean;
  bringingAnyone?: boolean;
  category?: string | null;
  categoryId?: number;
  color?: string;
  coupons?: any[]; // Si vous connaissez la structure exacte des coupons, vous pouvez remplacer any[]
  customPricing?: string;
  deposit?: number;
  depositPayment?: string;
  depositPerPerson?: boolean;
  description?: string;
  duration?: number;
  extras?: ExtrasProps[]; // Remplacez any[] si vous connaissez la structure exacte des extras
  fullPayment?: boolean;
  gallery?: any[]; // Remplacez any[] si vous connaissez la structure exacte de la galerie
  id?: string;
  limitPerCustomer?: string;
  mandatoryExtra?: boolean;
  maxCapacity?: number;
  maxExtraPeople?: number | null;
  minCapacity?: number;
  minSelectedExtras?: number | null;
  name?: string;
  pictureFullPath?: string | null;
  pictureThumbPath?: string | null;
  position?: number;
  price?: number;
  priority?: string;
  recurringCycle?: string;
  recurringPayment?: number;
  recurringSub?: string;
  settings?: string;
  show?: boolean;
  status?: string;
  timeAfter?: number;
  timeBefore?: number | null;
  translations?: any | null;
}

export interface ExtrasProps {
  id: string;
  aggregatedPrice: boolean;
  description: string;
  duration: number;
  maxQuantity: number;
  name: string;
  position: number;
  price: number;
  serviceId?: string;
}

export interface ExtrasPropsForm {
  id: string;
  quantity: number;
  price: number;
  switch: boolean;
}


export interface StateExtraObject {
 [key: string]: StateExtra;
}


export interface StateExtra {
  quantity: number;
  switch: boolean;
  price: number;
}

// { [key: string]: { quantity: number; switch: boolean, price: number } }
