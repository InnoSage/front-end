"use server";

import { addOption } from "@/function/api/option";

export default async function newOption(sheetId: number, attributeId: number, optionName: string, token: string) {
    const result = await addOption(sheetId, attributeId, optionName, token);

    if (result.success) return result.value.optionId;

    return -1;
}
