import { CurrencyCode } from "@/function/currency";

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

interface BaseSheetAttribute {
    id: number,
    name: string,
    data: unknown
}

export interface TextAttribute extends BaseSheetAttribute {
    dataType: "TEXT"
}

export interface NumberAttribute extends BaseSheetAttribute {
    dataType: "NUMBER"
}

export interface CurrencyAttribute extends BaseSheetAttribute {
    dataType: "CURRENCY",
    data: {
        currency: CurrencyCode
    }
}

export interface SelectAttribute extends BaseSheetAttribute {
    dataType: "SELECT",
    data: {
        options: {
            optionId: number,
            optionName: string
        }[]
    }
}

export interface MultiSelectAttribute extends BaseSheetAttribute {
    dataType: "MULTISELECT",
    data: {
        options: {
            optionId: number,
            optionName: string
        }[]
    }
}

export interface UserAttribute extends BaseSheetAttribute {
    dataType: "USER",
    data: {
        users: {
            email: string,
            username: string
        }[]
    }
}

export interface CheckboxAttribute extends BaseSheetAttribute {
    dataType: "CHECKBOX"
}

export interface DateAttribute extends BaseSheetAttribute {
    dataType: "DATE"
}

export type SheetAttribute = TextAttribute | NumberAttribute
    | CurrencyAttribute | SelectAttribute
    | MultiSelectAttribute | UserAttribute
    | CheckboxAttribute | DateAttribute;


export interface SheetFilter {
    id: number,
    targetAttributeId: number,
    keyword: string,
    filterType: string
}

export interface SheetCompany {
    id: number,
    name: string
}

export interface SheetDealValue {
    attributeId: number,
    value: unknown
}

export interface SheetDeal {
    id: number,
    companyId: number,
    values: SheetDealValue[]
}

export interface Sheet {
    sheetId: number,
    sheetName: string,
    attributes: SheetAttribute[],
    filters: SheetFilter[],
    companies: SheetCompany[],
    deals: SheetDeal[]
}
