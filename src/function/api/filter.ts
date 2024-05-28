import { getApiUrl } from "@/config/api";
import axios, { AxiosError } from "axios";
import { ApiError, BaseApiResponse } from "@/function/api/base";

function filterUrl(sheetId: number) {
    return getApiUrl() + `/sheet/${sheetId}/filter`;
}

export interface AddFilterData {
    filterId: number
}

export type AddFilterResponse = BaseApiResponse<AddFilterData>;

export async function addFilter(
    sheetId: number, attributeId: number, operator: string, value: string, token: string
) {
    try {
        const response = await axios.post(filterUrl(sheetId),
            {
                targetAttributeId: attributeId,
                filterType: operator,
                keyword: value
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        const body = response.data as AddFilterResponse;

        if (!body.isSuccess) {
            return { success: false, error: new ApiError(body) } as const;
        }

        return { success: true, value: body.data } as const;
    } catch (e) {
        return { success: false, error: e as AxiosError } as const;
    }
}

function deleteFilterUrl(sheetId: number, filterId: number) {
    return getApiUrl() + `/sheet/${sheetId}/filter/${filterId}`;
}

export async function deleteFilter(sheetId: number, filterId: number, token: string) {
    try {
        const response = await axios.delete(deleteFilterUrl(sheetId, filterId), {
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
