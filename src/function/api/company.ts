import { getApiUrl } from "@/config/api";
import axios, { AxiosError } from "axios";
import { ApiError, BaseApiResponse } from "@/function/api/base";

function companyUrl(sheetId: number) {
    return getApiUrl() + `/sheet/${sheetId}/company`;
}

export interface AddCompanyData {
    companyId: number
}

export type AddCompanyResponse = BaseApiResponse<AddCompanyData>;

export async function addCompany(sheetId: number, name: string, token: string) {
    try {
        const response = await axios.post(companyUrl(sheetId),
            { companyName: name },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

        const body = response.data as AddCompanyResponse;

        if (!body.isSuccess) {
            return { success: false, error: new ApiError(body) } as const;
        }

        return { success: true, value: body.data } as const;
    } catch (e) {
        return { success: false, error: e as AxiosError } as const;
    }
}

export interface GetCompaniesData {
    companies: { companyId: number, companyName: string }[]
}

export type GetCompaniesResponse = BaseApiResponse<GetCompaniesData>;

export async function getCompanies(sheetId: number, token: string) {
    try {
        const response = await axios.get(companyUrl(sheetId), {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const body = response.data as GetCompaniesResponse;

        if (!body.isSuccess) {
            return { success: false, error: new ApiError(body) } as const;
        }

        return { success: true, value: body.data } as const;
    } catch (e) {
        return { success: false, error: e as AxiosError } as const;
    }
}
