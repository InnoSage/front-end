import { createStore } from "zustand/vanilla";

export type SheetListState = {
    sheets: {
        sheetId: number,
        sheetName: string
    }[]
};

export type SheetListAction = {
    setSheetList: (sheets: SheetListState["sheets"])=> void,
    addSheet: (sheet: SheetListState["sheets"][0])=> void,
    deleteSheet: (sheetId: number)=> void,
    changeName: (sheetId: number, sheetName: string)=> void
};

export type SheetListStore = SheetListState & SheetListAction;

export const defaultSheetListState: SheetListState = {
    sheets: []
};

export const createSheetListStore = (initialState: SheetListState = defaultSheetListState) =>
    createStore<SheetListStore>()(
        (set) => ({
            ...initialState,
            setSheetList: (sheets) => set({ sheets }),
            addSheet: (sheet) => set((state) => {
                const newList = state.sheets;
                newList.push(sheet);
                return {
                    sheets: newList
                };
            }),
            deleteSheet: (sheetId) => set((state) => {
                return {
                    sheets: state.sheets.filter((s) => s.sheetId !== sheetId)
                };
            }),
            changeName: (sheetId, sheetName) => set((state) => {
                const i = state.sheets.findIndex((s) => s.sheetId === sheetId);
                const newList = state.sheets;
                newList[i].sheetName = sheetName;
                return {
                    sheets: newList
                };
            })
        })
    );
