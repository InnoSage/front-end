"use server";

import { signUp as apiSignUp } from "@/function/api/signup";

export default async function signUp(email: string, username: string, password: string, phoneNumber: string) {
    const result = await apiSignUp(email, username, password, phoneNumber);

    return result.success;
}
