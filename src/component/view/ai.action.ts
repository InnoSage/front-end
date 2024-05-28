"use server";

import { getAiQuestion as apiGetAiQuestion } from "@/function/api/ai";

export async function getAiQuestion(organizationId: number, sheetId: number, question: string, token: string) {
    const result = await apiGetAiQuestion(organizationId, sheetId, question, token);

    if (!result.success) return "__ERROR__";

    return result.value.summarization;
}
