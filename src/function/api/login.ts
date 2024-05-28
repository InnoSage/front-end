import { getApiUrl } from "@/config/api";
import axios, { AxiosError } from "axios";
import { ApiError, BaseApiResponse } from "@/function/api/base";
import { Result } from "@/function/fp/result";

function loginUrl() {
    return getApiUrl() + "/users/login";
}

export interface LoginData {
    userId: number,
    username: string,
    accessToken: string,
    refreshToken: string
}

export type LoginResponse = BaseApiResponse<LoginData>;

export async function login(email: string, password: string): Promise<Result<LoginData>> {
    try {
        const response = await axios.post(loginUrl(), { email, password });
        const body = response.data as LoginResponse;

        if (!body.isSuccess) {
            return { success: false, error: new ApiError(body) };
        }

        return { success: true, value: body.data };
    } catch (e) {
        return { success: false, error: e as AxiosError };
    }
}

function reissueUrl() {
    return getApiUrl() + "/users/reissue";
}

export interface ReissueData {
    accessToken: string,
    refreshToken: string
}

export type ReissueResponse = BaseApiResponse<ReissueData>;

export async function reissue(refreshToken: string) {
    try {
        const response = await axios.post(reissueUrl(), { refreshToken });
        const body = response.data as ReissueResponse;

        if (!body.isSuccess) {
            return { success: false, error: new ApiError(body) };
        }

        return { success: true, value: body.data };
    } catch (e) {
        return { success: false, error: e as AxiosError };
    }
}
