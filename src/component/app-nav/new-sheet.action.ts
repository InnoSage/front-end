"use server";

import { addSheet, getSheetList } from "@/function/api/sheet";
import { notFound } from "next/navigation";

export default async function addNewSheet(token: string, organizationId: number, sheetName: string) {
    const result = await addSheet(token, organizationId, sheetName);

    if (!result.success) {
        return notFound();
    }

    const listResult = await getSheetList(organizationId, token);
    if (!listResult.success) {
        return notFound();
    }

    return listResult.value!.sheets;
}
