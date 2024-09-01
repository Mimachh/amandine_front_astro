
import { create } from "zustand";

interface useCustomModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    title: string;
    setTitle: (title: string) => void;
    subtitle: string;
    setSubtitle: (subtitle: string) => void;
    displayTitle: boolean;
    setDisplayTitle : (displayTitle: boolean) => void;
    isPrestaAlreadyChoose: boolean;
    setIsPrestaAlreadyChoose: (isPrestaAlreadyChoose: boolean) => void;
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


export const useCustomModal = createSelectors(create<useCustomModalStore>(
    (set) => ({
        isOpen: false,
        onOpen: () => {
            set({ isOpen: true });
        },
        onClose: () => {
            set({ isOpen: false });
        },
        title: "",
        setTitle: (title: string) => set({ title }),
        subtitle: "",
        setSubtitle: (subtitle: string) => set({ subtitle }),
        displayTitle: true,
        setDisplayTitle: (displayTitle: boolean) => set({ displayTitle }),
        isPrestaAlreadyChoose: false,
        setIsPrestaAlreadyChoose: (isPrestaAlreadyChoose: boolean) => set({ isPrestaAlreadyChoose })
    })
));