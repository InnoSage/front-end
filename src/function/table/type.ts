import { CurrencyMap } from "@/function/currency";
import { ReactNode } from "react";

export type AttributeType = "TEXT" | "NUMBER" | "CURRENCY" | "DATE" | "SELECT" | "MULTISELECT" | "CHECKBOX" | "USER";

export const AttributeTypeMap: Record<AttributeType, string> = {
    TEXT: "텍스트",
    NUMBER: "숫자",
    CURRENCY: "통화",
    DATE: "날짜",
    SELECT: "선택",
    MULTISELECT: "다중선택",
    CHECKBOX: "체크박스",
    USER: "유저"
};

export function getAttributeType(s: string): AttributeType | undefined {
    for (const key of Object.keys(AttributeTypeMap)) {
        if (AttributeTypeMap[key as AttributeType] == s) {
            return key as AttributeType;
        }
    }
}

export function getAttributeName(s: AttributeType): string {
    return AttributeTypeMap[s];
}

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
