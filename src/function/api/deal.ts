import axios, { AxiosError } from "axios";
import { ApiError, BaseApiResponse } from "@/function/api/base";
import { AttributeType } from "@/function/table/type";
import { getApiUrl } from "@/config/api";

function dealUrl(sheetId: number, dealId: number) {
    return getApiUrl() + `/sheet/${sheetId}/deals/${dealId}`;
}

export interface GetDealData {
    companyId: number,
    companyName: string,
    contents: {
        attributeId: number,
        attributeName: string,
        dataType: AttributeType,
        value: unknown
    }[],
    notes: {
        noteTitle: string,
        noteBody: string
    }[]
}

export type GetDealResponse = BaseApiResponse<GetDealData>;

export async function getDeal(sheetId: number, dealId: number, token: string) {
    try {
        const response = await axios.get(dealUrl(sheetId, dealId), {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const body = response.data as GetDealResponse;

        if (!body.isSuccess) {
            return { success: false, error: new ApiError(body) } as const;
        }

        return { success: true, value: body.data } as const;
    } catch (e) {
        return { success: false, error: e as AxiosError } as const;
    }
}


function addDealUrl(sheetId: number) {
    return getApiUrl() + `/sheet/${sheetId}/deals`;
}

export interface AddDealData {
    dealId: number
}

export type AddDealResponse = BaseApiResponse<AddDealData>;

export async function addDeal(sheetId: number, companyId: number, token: string) {
    try {
        const response = await axios.post(addDealUrl(sheetId),
            { companyId: companyId },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        const body = response.data as AddDealResponse;

        if (!body.isSuccess) {
            return { success: false, error: new ApiError(body) } as const;
        }

        return { success: true, value: body.data } as const;
    } catch (e) {
        return { success: false, error: e as AxiosError } as const;
    }
}

export async function deleteDeal(sheetId: number, dealId: number, token: string) {
    try {
        const response = await axios.delete(dealUrl(sheetId, dealId),
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
