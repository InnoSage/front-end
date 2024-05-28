"use server";

import { deleteSheet as apiDeleteSheet } from "@/function/api/sheet";

export default async function deleteSheet(organizationId: number, sheetId: number, token: string) {
    const result = await apiDeleteSheet(organizationId, sheetId, token);

    return result.success;
}
