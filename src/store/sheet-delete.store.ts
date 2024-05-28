import { createStore } from "zustand/vanilla";

export type SheetDeleteState = {
    withModal: boolean
};

export type SheetDeleteAction = {
    setWithModal: (withModal: boolean)=> void
};

export type SheetDeleteStore = SheetDeleteState & SheetDeleteAction;

export const defaultSheetState: SheetDeleteState = {
    withModal: true
};

export const createSheetDeleteStore = (initialState: SheetDeleteState = defaultSheetState) =>
    createStore<SheetDeleteStore>()(
        (set) => ({
            ...initialState,
            setWithModal: (withModal) => set({ withModal })
        })
    );
