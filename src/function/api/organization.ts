import { getApiUrl } from "@/config/api";
import axios, { AxiosError } from "axios";
import { ApiError, BaseApiResponse } from "@/function/api/base";

function organizationUrl() {
    return getApiUrl() + "/organizations";
}

export interface Organization {
    organizationId: number,
    organizationName: string
}

export type OrganizationsData = Organization[];

export type OrganizationsResponse = BaseApiResponse<OrganizationsData>;

export async function getOrganizations(token: string) {
    try {
        const response = await axios.get(organizationUrl(), {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const body = response.data as OrganizationsResponse;

        if (!body.isSuccess) {
            return { success: false, error: new ApiError(body) };
        }

        return { success: true, value: body.data };
    } catch (e) {
        return { success: false, error: e as AxiosError };
    }
}

export async function addOrganization(token: string, name: string) {
    try {
        const response = await axios.post(organizationUrl(), { name }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const body = response.data as BaseApiResponse<unknown>;

        if (!body.isSuccess) {
            return { success: false, error: new ApiError(body) };
        }

        return { success: true, value: body.data };
    } catch (e) {
        return { success: false, error: e as AxiosError };
    }
}
