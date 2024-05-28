"use client";

import { createContext, type ReactNode, useContext, useRef } from "react";
import { type StoreApi, useStore } from "zustand";
import { createSheetDeleteStore, SheetDeleteStore } from "@/store/sheet-delete.store";

export const SheetDeleteStoreContext = createContext<StoreApi<SheetDeleteStore> | null>(null,);

export type SheetDeleteStoreProviderProps = {
    children: ReactNode
};

export function SheetDeleteStoreProvider({ children }: Readonly<SheetDeleteStoreProviderProps>) {
    const storeRef = useRef<StoreApi<SheetDeleteStore>>();

    if (!storeRef.current) {
        storeRef.current = createSheetDeleteStore();
    }

    return <SheetDeleteStoreContext.Provider value={ storeRef.current }>
        {children}
    </SheetDeleteStoreContext.Provider>;
}

export const useSheetDeleteStore = <T,>(selector: (store: SheetDeleteStore)=> T,) => {
    const context = useContext(SheetDeleteStoreContext);

    if (!context) {
        throw new Error("useSheetDeleteStore must be used within a SheetDeleteStoreProvider");
    }

    return useStore(context, selector);
};
