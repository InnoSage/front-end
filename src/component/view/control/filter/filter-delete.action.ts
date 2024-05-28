"use server";

import { deleteFilter as apiDeleteFilter } from "@/function/api/filter";

export default async function deleteFilter(sheetId: number, filterId: number, token: string) {
    const result = await apiDeleteFilter(sheetId, filterId, token);

    return result.success;
}
