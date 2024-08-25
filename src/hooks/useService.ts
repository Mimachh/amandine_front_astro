
import type { ServiceProps } from "@/components/types/ServiceTypes";
import { create } from "zustand";

interface useServiceStore {
    serviceId: string;
    setServiceId: (id: string) => void;

    service: ServiceProps;
    setService: (service: ServiceProps) => void;

    loading: boolean;
    setLoading: (loading: boolean) => void;

    // une fonction pour fetch la data

}

import type { StoreApi, UseBoundStore } from 'zustand'

type WithSelectors<S> = S extends { getState: () => infer T }
  ? S & { use: { [K in keyof T]: () => T[K] } }
  : never

const createSelectors = <S extends UseBoundStore<StoreApi<object>>>(
  _store: S,
) => {
  let store = _store as WithSelectors<typeof _store>
  store.use = {}
  for (let k of Object.keys(store.getState())) {
    ;(store.use as any)[k] = () => store((s) => s[k as keyof typeof s])
  }

  return store
}


export const useService = createSelectors(create<useServiceStore>(
    (set) => ({
        serviceId: "",
        setServiceId: (id: string) => set((state) => ({ ...state, serviceId: id })),

        service: {} as ServiceProps,

        setService: (service: ServiceProps) => {
            set((state) => ({ ...state, service: service }));
        },

        loading: true,
        setLoading: (loading: boolean) => set({ loading }),
    })
));