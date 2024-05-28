import { createStore } from "zustand/vanilla";
import { Sheet, SheetAttribute, SheetCompany, SheetDeal, SheetFilter } from "@/function/table/type";

export type SheetState = Sheet;

export type SheetAction = {
    setSheet: (sheet: SheetState)=> void,
    setSheetId: (sheetId: number)=> void,
    setSheetName: (sheetName: string)=> void,
    setAttributes: (attributes: SheetAttribute[])=> void,
    setCompanies: (companies: SheetCompany[])=> void,
    setDeals: (deals: SheetDeal[])=> void,
    setFilters: (filters: SheetFilter[])=> void,
    addAttribute: (attribute: SheetAttribute)=> void,
    addCompany: (company: SheetCompany)=> void,
    addDeal: (deal: SheetDeal)=> void,
    addFilter: (filter: SheetFilter)=> void,
    removeAttribute: (attributeId: number)=> void,
    removeCompany: (companyId: number)=> void,
    removeDeal: (dealId: number)=> void,
    removeFilter: (filterId: number)=> void,
    getFilteredDeals: ()=> SheetDeal[]
};

export type SheetStore = SheetState & SheetAction;

export const defaultSheetState: SheetState = {
    sheetId: -1,
    sheetName: "",
    attributes: [],
    companies: [],
    deals: [],
    filters: []
};

export const createSheetStore = (initialState: SheetState = defaultSheetState) =>
    createStore<SheetStore>()(
        (set, get) => ({
            ...initialState,
            setSheet: (sheet) => set({ ...sheet }),
            setSheetId: (sheetId) => set({ sheetId }),
            setSheetName: (sheetName) => set({ sheetName }),
            setAttributes: (attributes) => set({ attributes }),
            setCompanies: (companies) => set({ companies }),
            setDeals: (deals) => set({ deals }),
            setFilters: (filters) => set({ filters }),
            addAttribute: (attribute) => set((state) => {
                const newAttributes = state.attributes;
                newAttributes.push(attribute);
                return { attributes: newAttributes };
            }),
            addCompany: (company) => set((state) => {
                const newCompanies = state.companies;
                newCompanies.push(company);
                return { companies: newCompanies };
            }),
            addDeal: (deal) => set((state) => {
                const newDeals = state.deals;
                newDeals.push(deal);
                return { deals: newDeals };
            }),
            addFilter: (filter) => set((state) => {
                const newFilters = state.filters;
                newFilters.push(filter);
                return { filters: newFilters };
            }),
            removeAttribute: (attributeId) => set((state) => {
                return { attributes: state.attributes.filter((a) => a.id != attributeId) };
            }),
            removeCompany: (companyId) => set((state) => {
                return { companies: state.companies.filter((c) => c.id != companyId) };
            }),
            removeDeal: (dealId) => set((state) => {
                return { deals: state.deals.filter((d) => d.id != dealId) };
            }),
            removeFilter: (filterId) => set((state) => {
                return { filters: state.filters.filter((f) => f.id != filterId) };
            }),
            getFilteredDeals: () => {
                const { deals, filters } = get();
                if (!filters || filters.length == 0) {
                    return deals;
                }

                return deals.filter((deal) => {
                    return filters.map((filter) => {
                        const { targetAttributeId, filterType, keyword } = filter;
                        const targetValue = deal.values.find((v) => v.attributeId == targetAttributeId)?.value;

                        if (targetValue) {
                            if (filterType == "IS") {
                                if (String(targetValue) == keyword) return true;
                            } else if (filterType == "IS_NOT") {
                                if (String(targetValue) != keyword) return true;
                            } else if (filterType == "CONTAINS") {
                                if (String(targetValue).includes(keyword)) return true;
                            }
                        }
                        return false;
                    }).every((v) => v);
                });
            }
        })
    );
