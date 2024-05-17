"use server";

import { setCookie } from "@/function/cookie/set";
import {
    AUTOLOGIN_KEY,
    CURRENT_ORG_ID_KEY, CURRENT_ORG_NAME_KEY, REFRESH_EXPIRES_KEY,
    REFRESH_TOKEN_KEY, TOKEN_EXPIRES_KEY,
    TOKEN_KEY,
    USER_ID_KEY,
    USERNAME_KEY
} from "@/config/cookie";

export async function setToken(token: string, expires = undefined) {
    await setCookie(TOKEN_KEY, token, expires);
}

export async function setTokenExpires(exp: string, expires = undefined) {
    await setCookie(TOKEN_EXPIRES_KEY, exp, expires);
}

export async function setRefreshToken(token: string, expires = undefined) {
    await setCookie(REFRESH_TOKEN_KEY, token, expires);
}

export async function setRefreshTokenExpires(exp: string, expires = undefined) {
    await setCookie(REFRESH_EXPIRES_KEY, exp, expires);
}

export async function setUsername(username: string, expires = undefined) {
    await setCookie(USERNAME_KEY, username, expires);
}

export async function setUserId(id: string, expires = undefined) {
    await setCookie(USER_ID_KEY, id, expires);
}

export async function setAutoLogin(autoLogin: boolean, expires = undefined) {
    await setCookie(AUTOLOGIN_KEY, autoLogin ? "true" : "false", expires);
}

export async function setCurrentOrgId(id: string, expires = undefined) {
    await setCookie(CURRENT_ORG_ID_KEY, id, expires);
}

export async function setCurrentOrgName(name: string, expires = undefined) {
    await setCookie(CURRENT_ORG_NAME_KEY, name, expires);
}
