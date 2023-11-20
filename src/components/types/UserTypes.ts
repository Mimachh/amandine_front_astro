import type { dayOffListArray } from "./CalendarTypes";

export interface UserProps {
    dayOffList?: dayOffListArray[];
    description?: string;
    email: string;
    firstName: string;
    id: string;
    lastName: string;
    pictureFullPath?: string;
    pictureThumbPath?: string;
    status: string;
  
  }