"use server";

import { deleteDeal as apiDeleteDeal } from "@/function/api/deal";

export default async function deleteDeal(sheetId: number, dealId: number, token: string) {
    const result = await apiDeleteDeal(sheetId, dealId, token);
    return result.success;
}
