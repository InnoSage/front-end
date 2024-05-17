"use client";

import { createContext, type ReactNode, useContext, useRef } from "react";
import { type StoreApi, useStore } from "zustand";
import { createSignupStore, SignupState, SignupStore } from "@/store/signup.store";

export const SignupStoreContext = createContext<StoreApi<SignupStore> | null>(null,);

export type SignupStoreProviderProps = {
    children: ReactNode,
    initialState?: SignupState
};

export function SignupStoreProvider({ children, initialState }: Readonly<SignupStoreProviderProps>) {
    const storeRef = useRef<StoreApi<SignupStore>>();

    if (!storeRef.current) {
        if (initialState) {
            storeRef.current = createSignupStore(initialState);
        } else {
            storeRef.current = createSignupStore();
        }
    }

    return <SignupStoreContext.Provider value={ storeRef.current }>
        {children}
    </SignupStoreContext.Provider>;
}

export const useSignupStore = <T,>(selector: (store: SignupStore)=> T,) => {
    const context = useContext(SignupStoreContext);

    if (!context) {
        throw new Error("useSignupStore must be used within a SignupStoreProvider");
    }

    return useStore(context, selector);
};
