"use server";

import { setSheetName as apiSetSheetName } from "@/function/api/sheet";

export default async function setSheetName(token: string, organizationId: number, sheetId: number, name: string) {
    const result = await apiSetSheetName(organizationId, sheetId, name, token);

    return result.success;
}
