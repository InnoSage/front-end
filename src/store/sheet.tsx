"use client";

import { createContext, type ReactNode, useContext, useRef } from "react";
import { type StoreApi, useStore } from "zustand";
import { Sheet } from "@/function/table/type";
import { createSheetStore, SheetStore } from "@/store/sheet.store";

export const SheetStoreContext = createContext<StoreApi<SheetStore> | null>(null,);

export type SheetStoreProviderProps = {
    children: ReactNode,
    sheet?: Sheet
};

export function SheetStoreProvider({ children, sheet }: Readonly<SheetStoreProviderProps>) {
    const storeRef = useRef<StoreApi<SheetStore>>();

    if (!storeRef.current) {
        if (sheet) {
            storeRef.current = createSheetStore({ ...sheet });
        } else {
            storeRef.current = createSheetStore();
        }

    }

    return <SheetStoreContext.Provider value={ storeRef.current }>
        {children}
    </SheetStoreContext.Provider>;
}

export const useSheetStore = <T,>(selector: (store: SheetStore)=> T,) => {
    const context = useContext(SheetStoreContext);

    if (!context) {
        throw new Error("useSheetStore must be used within a SheetStoreProvider");
    }

    return useStore(context, selector);
};
