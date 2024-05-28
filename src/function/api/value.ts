import { getApiUrl } from "@/config/api";
import axios, { AxiosError } from "axios";
import { ApiError, BaseApiResponse } from "@/function/api/base";

function valueUrl(sheetId: number, dealId: number) {
    return getApiUrl() + `/sheet/${sheetId}/deals/${dealId}/contents`;
}

export async function newValue<T>(sheetId: number, dealId: number, attributeId: number, value: T, token: string) {
    try {
        const response = await axios.post(valueUrl(sheetId, dealId),
            { attributeId, value },
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

export async function editValue<T>(sheetId: number, dealId: number, attributeId: number, value: T, token: string) {
    try {
        const response = await axios.patch(valueUrl(sheetId, dealId),
            { attributeId, value },
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

export async function deleteValue(sheetId: number, dealId: number, attributeId: number, token: string) {
    try {
        const response = await axios.delete(valueUrl(sheetId, dealId),
            {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                data: { attributeId }
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
