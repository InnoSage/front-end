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

export type DoLoginActionState = {
    isFirst: boolean,
    isValidUser: boolean
};

export async function doLoginAction(
    prevState: DoLoginActionState,
    formData: FormData
) {
    const email = formData.get("email");
    const password = formData.get("password");
    const autoLogin = formData.get("auto-login");

    if (!email || !password) {
        return {
            isFirst: false,
            isValidUser: false
        };
    }

    const loginResult = await login(`${email}`, `${password}`);

    if (!loginResult.success) {
        return {
            isFirst: false,
            isValidUser: false
        };
    }

    const user = loginResult.value;

    await setToken(user.accessToken);
    await setRefreshToken(user.refreshToken);
    await setUsername(user.username);
    await setUserId(String(user.userId));
    await setAutoLogin(autoLogin === "on");
    await setCurrentOrgId("-1");
    await setCurrentOrgName("");

    return {
        isFirst: false,
        isValidUser: true
    };
}
