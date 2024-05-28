"use server";

import { addCompany } from "@/function/api/company";
import { addDeal } from "@/function/api/deal";

export async function newDealWithNewCompany(sheetId: number, companyName: string, token: string) {
    const addResult = await addCompany(sheetId, companyName, token);
    if (!addResult.success) return { company: -1, deal: -1 } as const;

    const { companyId } = addResult.value;

    const result = await addDeal(sheetId, companyId, token);

    if (!result.success) return { company: -1, deal: -1 } as const;

    return { company: companyId, deal: result.value.dealId } as const;
}

export async function newDeal(sheetId: number, companyId: number, token: string) {
    const result = await addDeal(sheetId, companyId, token);

    return result.success ? result.value.dealId : -1;
}
