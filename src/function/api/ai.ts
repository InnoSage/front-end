import { getAiApiUrl } from "@/config/api";
import axios, { AxiosError } from "axios";
import { ApiError, BaseApiResponse } from "@/function/api/base";

function aiUrl() {
    return getAiApiUrl() + "/generate-query";
}

interface RawAiQuestionBody {
    sql_query: string,
    data: Record<string, any>[],
    summarization: string
}

export interface AiQuestionBody {
    sqlQuery: string,
    data: Record<string, any>[],
    summarization: string
}

export async function getAiQuestion(organizationId: number, sheetId: number, question: string, token: string) {

    try {
        const response = await axios.post(aiUrl(),
            {
                organization_id: organizationId,
                sheet_id: sheetId,
                user_question: question
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        const body = response.data as BaseApiResponse<RawAiQuestionBody>;

        if (!body.isSuccess) {
            return { success: false, error: new ApiError(body) } as const;
        }

        const camelized: AiQuestionBody = {
            sqlQuery: body.data.sql_query,
            data: body.data.data,
            summarization: body.data.summarization
        };

        return { success: true, value: camelized } as const;
    } catch (e) {
        return { success: false, error: e as AxiosError } as const;
    }
}

