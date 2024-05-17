"use client";

import { createContext, type ReactNode, useContext, useRef } from "react";
import { type StoreApi, useStore } from "zustand";
import { createUserStore, UserState, type UserStore } from "@/store/user.store";

export const UserStoreContext = createContext<StoreApi<UserStore> | null>(null,);

export type UserStoreProviderProps = {
    children: ReactNode,
    initialState?: UserState
};

export function UserStoreProvider({ children, initialState }: Readonly<UserStoreProviderProps>) {
    const storeRef = useRef<StoreApi<UserStore>>();

    if (!storeRef.current) {
        if (initialState) {
            storeRef.current = createUserStore(initialState);
        } else {
            storeRef.current = createUserStore();
        }
    }

    return <UserStoreContext.Provider value={ storeRef.current }>
        {children}
    </UserStoreContext.Provider>;
}

export const useUserStore = <T,>(selector: (store: UserStore)=> T,) => {
    const context = useContext(UserStoreContext);

    if (!context) {
        throw new Error("useUserStore must be used within a UserStoreProvider");
    }

    return useStore(context, selector);
};
