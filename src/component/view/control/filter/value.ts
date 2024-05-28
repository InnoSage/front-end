import { AttributeType } from "@/function/table/type";

export type InputType = "TEXT" | "NUMBER" | "DATE" | "SELECT" | "COMPANY" | "USER";

export const ValueInputMap: Record<AttributeType | "COMPANY", InputType> = {
    TEXT: "TEXT",
    NUMBER: "NUMBER",
    DATE: "DATE",
    SELECT: "SELECT",
    CURRENCY: "NUMBER",
    MULTISELECT: "SELECT",
    CHECKBOX: "TEXT",
    COMPANY: "COMPANY",
    USER: "USER"
};
