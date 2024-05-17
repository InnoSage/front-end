"use server";

import { login } from "@/function/api/login";
import {
    setAutoLogin,
    setCurrentOrgId,
    setCurrentOrgName,
    setRefreshToken,
    setToken,
    setUserId,
    setUsername
} from "@/function/token/set";
import { redirect } from "next/navigation";

export default async function loginOnSuccess(email: string, password: string) {
    const loginResult = await login(email, password);
    if (!loginResult.success) {
        redirect("/login");
    }

    const user = loginResult.value;
    await setToken(user.accessToken);
    await setRefreshToken(user.refreshToken);
    await setUsername(user.username);
    await setUserId(String(user.userId));
    await setCurrentOrgId("-1");
    await setCurrentOrgName("");

    redirect("/app");
}
