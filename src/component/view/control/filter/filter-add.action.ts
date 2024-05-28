"use server";

import { addFilter as apiAddFilter } from "@/function/api/filter";

export default async function addFilter(
    sheetId: number, attributeId: number, operator: string, value: string, token: string
) {
    const result = await apiAddFilter(sheetId, attributeId, operator, value, token);

    if (result.success) return result.value.filterId;

    return -1;
}
