"use server";

import {
    deleteValue as apiDeleteValue,
    editValue as apiEditValue,
    newValue as apiNewValue
} from "@/function/api/value";

export async function editValue(
    sheetId: number, dealId: number, attributeId: number, value: unknown, token: string
) {
    const result = await apiEditValue(sheetId, dealId, attributeId, value, token);
    return result.success;
}

export async function newValue(
    sheetId: number, dealId: number, attributeId: number, value: unknown, token: string
) {
    const result = await apiNewValue(sheetId, dealId, attributeId, value, token);
    return result.success;
}

export async function deleteValue(
    sheetId: number, dealId: number, attributeId: number, token: string
) {
    const result = await apiDeleteValue(sheetId, dealId, attributeId, token);
    return result.success;
}
