import { CurrencyMap } from "@/function/currency";

export type AttributeType = "TEXT" | "NUMBER" | "CURRENCY" | "DATE" | "SELECT" | "MULTISELECT" | "CHECKBOX" | "USER";

export interface BaseSheetAttribute {
    attributeId: number,
    attributeName: string,
    dataType: AttributeType
}

export interface SheetSelectAttribute extends BaseSheetAttribute {
    dataType: "SELECT" | "MULTISELECT",
    options: {
        optionId: number,
        value: string
    }[]
}

export interface SheetCurrencyAttribute extends BaseSheetAttribute {
    dataType: "CURRENCY",
    currency: keyof typeof CurrencyMap
}

export interface SheetUserAttribute extends BaseSheetAttribute {
    dataType: "USER",
    users: {
        username: string,
        userEmail: string
    }[]
}

export type SheetAttribute = BaseSheetAttribute | SheetSelectAttribute | SheetCurrencyAttribute | SheetUserAttribute;

export interface SheetFilter {
    targetAttributeId: number,
    operation: string,
    value: any
}

export interface SheetSort {
    targetAttributeId: number,
    order: "ASC" | "DESC"
}

export interface SheetCompany {
    id: number,
    name: string
}

export interface SheetDealValue {
    attributeId: number,
    value: any
}

export interface SheetDeal {
    id: number,
    companyId: number,
    values: SheetDealValue[]
}

export interface Sheet {
    sheetName: string,
    attributes: SheetAttribute[],
    filter: SheetFilter[],
    sort: SheetSort[],
    companies: SheetCompany[],
    deals: SheetDeal[]
}
