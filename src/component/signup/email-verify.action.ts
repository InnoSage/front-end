"use server";

import { sendCode as apiSendCode, verifyCode as apiVerifyCode } from "@/function/api/signup";

export async function sendCode(email: string) {
    const result = await apiSendCode(email);

    return result.success;
}

export async function verifyCode(email: string, code: string) {
    const result = await apiVerifyCode(email, code);

    return result.success;
}
