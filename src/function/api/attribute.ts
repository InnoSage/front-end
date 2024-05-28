import { getApiUrl } from "@/config/api";
import axios, { AxiosError } from "axios";
import { ApiError, BaseApiResponse } from "@/function/api/base";
import { AttributeType } from "@/function/table/type";

function attributeUrl(sheetId: number) {
    return getApiUrl() + `/sheet/${sheetId}/attributes`;
}

export interface AddAttributeProps {
    dataType: AttributeType,
    name: string,
    description?: string,
    data: Record<string, any>
}

export interface AddAttributeData {
    dataType: AttributeType,
    name: string,
    description?: string,
    data: unknown,
    attributeId: number
}

export type AddAttributeResponse = BaseApiResponse<AddAttributeData>;

export async function addAttribute(sheetId: number, token: string, props: AddAttributeProps) {
    try {
        const response = await axios.post(attributeUrl(sheetId),
            props,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        const body = response.data as AddAttributeResponse;

        if (!body.isSuccess) {
            return { success: false, error: new ApiError(body) } as const;
        }

        return { success: true, value: body.data } as const;
    } catch (e) {
        return { success: false, error: e as AxiosError } as const;
    }
}

function attributeEditUrl(sheetId: number, attributeId: number) {
    return getApiUrl() + `/sheet/${sheetId}/attributes/${attributeId}`;
}

export async function editAttribute(sheetId: number, attributeId: number, token: string, props: AddAttributeProps) {
    try {
        const response = await axios.patch(attributeEditUrl(sheetId, attributeId),
            props,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        const body = response.data as AddAttributeResponse;

        if (!body.isSuccess) {
            return { success: false, error: new ApiError(body) } as const;
        }

        return { success: true, value: body.data } as const;
    } catch (e) {
        return { success: false, error: e as AxiosError } as const;
    }
}

export async function deleteAttribute(sheetId: number, attributeId: number, token: string) {
    try {
        const response = await axios.delete(attributeEditUrl(sheetId, attributeId),
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
