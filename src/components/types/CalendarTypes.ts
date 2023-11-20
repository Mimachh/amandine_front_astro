import type { ServiceProps } from "./ServiceTypes";
import type { UserProps } from "./UserTypes";

export type InnerArray = any[];

export interface SlotsProps {
  [date: string]: {
    [hour: string]: InnerArray;
  };
}


export interface dayOffListArray {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  repeat: number;
}


export interface CalendarProps {
  service: ServiceProps;
  slots: SlotsProps[];
  employee: UserProps;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>
  currentStep: number;
  setDaySelected: (value: string) => void;
}