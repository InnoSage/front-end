"use client";

import { createContext, type ReactNode, useContext, useRef } from "react";
import { type StoreApi, useStore } from "zustand";
import { createSheetListStore, SheetListStore } from "@/store/sheet-list.store";

export const SheetListStoreContext = createContext<StoreApi<SheetListStore> | null>(null,);

export type SheetListStoreProviderProps = {
    children: ReactNode,
    sheetList?: { sheetId: number, sheetName: string }[]
};

export function SheetListStoreProvider({ children, sheetList }: Readonly<SheetListStoreProviderProps>) {
    const storeRef = useRef<StoreApi<SheetListStore>>();

    if (!storeRef.current) {
        if (sheetList) {
            storeRef.current = createSheetListStore({ sheets: sheetList });
        } else {
            storeRef.current = createSheetListStore();
        }

    }

    return <SheetListStoreContext.Provider value={ storeRef.current }>
        {children}
    </SheetListStoreContext.Provider>;
}

export const useSheetListStore = <T,>(selector: (store: SheetListStore)=> T,) => {
    const context = useContext(SheetListStoreContext);

    if (!context) {
        throw new Error("useUserStore must be used within a UserStoreProvider");
    }

    return useStore(context, selector);
};
