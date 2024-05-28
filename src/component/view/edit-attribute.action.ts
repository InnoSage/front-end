"use server";

import {
    AddAttributeProps,
    deleteAttribute as apiDeleteAttribute,
    editAttribute as apiEditAttribute
} from "@/function/api/attribute";
import { deleteOption, editOption } from "@/function/api/option";

export async function editAttribute(
    sheetId: number, attributeId: number, token: string, props: AddAttributeProps
) {
    const result = await apiEditAttribute(sheetId, attributeId, token, props);
    return result.success;
}

export async function deleteAttribute(sheetId: number, attributeId: number, token: string) {
    const result = await apiDeleteAttribute(sheetId, attributeId, token);
    return result.success;
}

export async function deleteAttributeOption(sheetId: number, attributeId: number, optionId: number, token: string) {
    const result = await deleteOption(sheetId, attributeId, optionId, token);
    return result.success;
}

export async function editAttributeOptionName(
    sheetId: number, attributeId: number, optionId: number, name: string, token: string
) {
    const result = await editOption(sheetId, attributeId, optionId, name, token);
    return result.success;
}
