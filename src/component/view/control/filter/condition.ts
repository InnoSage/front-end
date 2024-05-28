import { AttributeType } from "@/function/table/type";

type BaseFilterCondition = "IS" | "IS_NOT" | "CONTAINS";

export type TextFilterCondition = BaseFilterCondition;
export type NumberFilterCondition = BaseFilterCondition;
export type DateFilterCondition = BaseFilterCondition;
export type SelectFilterCondition = BaseFilterCondition;
export type CurrencyFilterCondition = BaseFilterCondition;
export type MultiselectFilterCondition = BaseFilterCondition;
export type CheckboxFilterCondition = BaseFilterCondition;
export type UserFilterCondition = BaseFilterCondition;
export type CompanyFilterCondition = BaseFilterCondition;

export type FilterCondition = TextFilterCondition | NumberFilterCondition
    | DateFilterCondition | SelectFilterCondition
    | CurrencyFilterCondition | MultiselectFilterCondition
    | CheckboxFilterCondition | UserFilterCondition
    | CompanyFilterCondition;

const BaseFilterConditionName: Record<BaseFilterCondition, string> = {
    IS: "다음과 같은 경우",
    IS_NOT: "다음과 다른 경우",
    CONTAINS: "다음을 포함하는 경우"
};

export const NameFilterConditionName: Record<TextFilterCondition, string> = {
    ...BaseFilterConditionName
};

export const NumberFilterConditionName: Record<NumberFilterCondition, string> = {
    ...BaseFilterConditionName
};

export const DateFilterConditionName: Record<DateFilterCondition, string> = {
    ...BaseFilterConditionName
};

export const SelectFilterConditionName: Record<SelectFilterCondition, string> = {
    ...BaseFilterConditionName
};

export const CurrencyFilterConditionName: Record<CurrencyFilterCondition, string> = {
    ...BaseFilterConditionName
};

export const MultiselectFilterConditionName: Record<MultiselectFilterCondition, string> = {
    ...BaseFilterConditionName
};

export const CheckboxFilterConditionName: Record<CheckboxFilterCondition, string> = {
    ...BaseFilterConditionName
};

export const UserFilterConditionName: Record<UserFilterCondition, string> = {
    ...BaseFilterConditionName
};

export const CompanyFilterConditionName: Record<CompanyFilterCondition, string> = {
    ...BaseFilterConditionName
};

export const FilterConditionName: Record<FilterCondition, string> = {
    ...NameFilterConditionName,
    ...NumberFilterConditionName,
    ...DateFilterConditionName,
    ...SelectFilterConditionName,
    ...CurrencyFilterConditionName,
    ...MultiselectFilterConditionName,
    ...CheckboxFilterConditionName,
    ...UserFilterConditionName,
    ...CompanyFilterConditionName
};

export const FilterConditionNameMap: Record<AttributeType | "COMPANY", typeof FilterConditionName> = {
    TEXT: NameFilterConditionName,
    NUMBER: NumberFilterConditionName,
    DATE: DateFilterConditionName,
    SELECT: SelectFilterConditionName,
    CURRENCY: CurrencyFilterConditionName,
    MULTISELECT: MultiselectFilterConditionName,
    CHECKBOX: CheckboxFilterConditionName,
    USER: UserFilterConditionName,
    COMPANY: CompanyFilterConditionName
};
