import { getApiUrl } from "@/config/api";
import axios, { AxiosError } from "axios";
import { ApiError, BaseApiResponse } from "@/function/api/base";

function codeUrl() {
    return getApiUrl() + "/users/email/code";
}

export type SendCodeResponse = BaseApiResponse<null>;

export async function sendCode(email: string) {
    try {
        const response = await axios.post(codeUrl(), { email });
        const body = response.data as SendCodeResponse;

        if (!body.isSuccess) {
            return { success: false, error: new ApiError(body) };
        }

        return { success: true, value: body.data };
    } catch (e) {
        return { success: false, error: e as AxiosError };
    }
}

function verifyUrl() {
    return getApiUrl() + "/users/email/verify";
}

export async function verifyCode(email: string, code: string) {
    try {
        const response = await axios.post(verifyUrl(), { email, code });
        const body = response.data as SendCodeResponse;

        if (!body.isSuccess) {
            return { success: false, error: new ApiError(body) };
        }

        return { success: true, value: body.data };
    } catch (e) {
        return { success: false, error: e as AxiosError };
    }
}

function signUpUrl() {
    return getApiUrl() + "/users/register";
}

export async function signUp(email: string, username: string, password: string, phoneNumber: string) {
    try {
        const response = await axios.post(signUpUrl(), {
            email, userName: username, password, phoneNumber
        });
        const body = response.data as SendCodeResponse;

        if (!body.isSuccess) {
            return { success: false, error: new ApiError(body) };
        }

        return { success: true, value: body.data };
    } catch (e) {
        return { success: false, error: e as AxiosError };
    }
}
