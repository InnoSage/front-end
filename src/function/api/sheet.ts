import { getApiUrl } from "@/config/api";
import axios, { AxiosError } from "axios";
import { ApiError, BaseApiResponse } from "@/function/api/base";
import { AttributeType } from "@/function/table/type";

function sheetListUrl(organizationId: number) {
    return getApiUrl() + `/organizations/${organizationId}/sheet`;
}

export interface SheetListData {
    sheets: {
        sheetId: number,
        sheetName: string
    }[]
}
export type SheetListResponse = BaseApiResponse<SheetListData>;

export async function getSheetList(organizationId: number, token: string) {
    try {
        const response = await axios.get(sheetListUrl(organizationId), {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const body = response.data as SheetListResponse;

        if (!body.isSuccess) {
            return { success: false, error: new ApiError(body) } as const;
        }

        return { success: true, value: body.data } as const;
    } catch (e) {
        return { success: false, error: e as AxiosError } as const;
    }
}

function organizationSheetUrl(organizationId: number) {
    return getApiUrl() + `/organizations/${organizationId}/sheet`;
}

export interface AddSheetData {
    name: string
}

export type AddSheetResponse = BaseApiResponse<AddSheetData>;

export async function addSheet(token: string, organizationId: number, name: string) {
    try {
        const response = await axios.post(organizationSheetUrl(organizationId), {
            name
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const body = response.data as AddSheetResponse;

        if (!body.isSuccess) {
            return { success: false, error: new ApiError(body) } as const;
        }

        return { success: true, value: body.data } as const;
    } catch (e) {
        return { success: false, error: e as AxiosError } as const;
    }
}

function sheetUrl(organizationId: number, sheetId: number) {
    return getApiUrl() + `/organizations/${organizationId}/sheet/${sheetId}`;
}

export interface GetSheetData {
    sheetId: number,
    sheetName: string,
    companies: { companies: {
        companyId: number,
        companyName: string
    }[] },
    filters: {
        filterId: number,
        targetAttributeId: number,
        keyword: string,
        filterType: string
    }[],
    attributes: {
        attributeId: number,
        attributeName: string,
        dataType: AttributeType,
        data: unknown
    }[],
    deals: {
        dealId: number,
        companyId: number,
        contents: {
            attributeId: number,
            value: unknown
        }[]
    }[],
    notes: {
        noteTitle: string,
        noteBody: string
    }[],
    createdAt: Date
}

export type GetSheetResponse = BaseApiResponse<GetSheetData>;

export async function getSheet(token: string, organizationId: number, sheetId: number) {
    try {
        const response = await axios.get(sheetUrl(organizationId, sheetId), {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const body = response.data as GetSheetResponse;

        if (!body.isSuccess) {
            return { success: false, error: new ApiError(body) } as const;
        }

        return { success: true, value: body.data } as const;
    } catch (e) {
        return { success: false, error: e as AxiosError } as const;
    }
}

function sheetNameUrl(organizationId: number, sheetId: number) {
    return getApiUrl() + `/organizations/${organizationId}/sheet/${sheetId}/name`;
}

export async function setSheetName(organizationId: number, sheetId: number, name: string, token: string) {
    try {
        const response = await axios.put(sheetNameUrl(organizationId, sheetId),
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

export async function deleteSheet(organizationId: number, sheetId: number, token: string) {
    try {
        const response = await axios.delete(sheetUrl(organizationId, sheetId), {
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
