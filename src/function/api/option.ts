import { getApiUrl } from "@/config/api";
import axios, { AxiosError } from "axios";
import { ApiError, BaseApiResponse } from "@/function/api/base";

function optionUrl(sheetId: number, attributeId: number) {
    return getApiUrl() + `/sheet/${sheetId}/attributes/${attributeId}/options`;
}

export interface AddOptionData {
    optionId: number
}

export type AddOptionResponse = BaseApiResponse<AddOptionData>;

export async function addOption(sheetId: number, attributeId: number, name: string, token: string) {
    try {
        const response = await axios.post(optionUrl(sheetId, attributeId),
            { name },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        const body = response.data as AddOptionResponse;

        if (!body.isSuccess) {
            return { success: false, error: new ApiError(body) } as const;
        }

        return { success: true, value: body.data } as const;
    } catch (e) {
        return { success: false, error: e as AxiosError } as const;
    }
}


function editOptionUrl(sheetId: number, attributeId: number, optionId: number) {
    return getApiUrl() + `/sheet/${sheetId}/attributes/${attributeId}/options/${optionId}`;
}

export async function deleteOption(sheetId: number, attributeId: number, optionId: number, token: string) {
    try {
        const response = await axios.delete(editOptionUrl(sheetId, attributeId, optionId),
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        const body = response.data as BaseApiResponse<unknown>;

        if (!body.isSuccess) {
            return { success: false, error: new ApiError(body) } as const;
        }

        return { success: true, value: body.data } as const;
    } catch (e) {
        return { success: false, error: e as AxiosError } as const;
    }
}


export async function editOption(
    sheetId: number, attributeId: number, optionId: number, name: string, token: string
) {
    try {
        const response = await axios.patch(editOptionUrl(sheetId, attributeId, optionId),
            { name },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        const body = response.data as BaseApiResponse<unknown>;

        if (!body.isSuccess) {
            return { success: false, error: new ApiError(body) } as const;
        }

        return { success: true, value: body.data } as const;
    } catch (e) {
        return { success: false, error: e as AxiosError } as const;
    }
}
