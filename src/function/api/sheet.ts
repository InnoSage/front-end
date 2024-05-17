import { getApiUrl } from "@/config/api";
import axios, { AxiosError } from "axios";
import { ApiError, BaseApiResponse } from "@/function/api/base";

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
            return { success: false, error: new ApiError(body) };
        }

        return { success: true, value: body.data };
    } catch (e) {
        return { success: false, error: e as AxiosError };
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
            return { success: false, error: new ApiError(body) };
        }

        return { success: true, value: body.data };
    } catch (e) {
        return { success: false, error: e as AxiosError };
    }
}

function sheetUtl(organizationId: number, sheetId: number) {
    return getApiUrl() + "/organizations/";
}
export default async function getSheet(token: string, organizationId: number, sheetId: number) {

}
