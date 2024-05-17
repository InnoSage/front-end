import getCookie from "@/function/cookie/get";
import {
    TOKEN_KEY,
    REFRESH_TOKEN_KEY,
    USERNAME_KEY,
    AUTOLOGIN_KEY,
    USER_ID_KEY,
    CURRENT_ORG_ID_KEY, CURRENT_ORG_NAME_KEY, TOKEN_EXPIRES_KEY, REFRESH_EXPIRES_KEY
} from "@/config/cookie";

export function getToken() {
    return getCookie(TOKEN_KEY) as string;
}

export function getTokenExpires() {
    const raw =  getCookie(TOKEN_EXPIRES_KEY) as string;
    return new Date(raw);
}

export function getRefreshToken() {
    return getCookie(REFRESH_TOKEN_KEY) as string;
}

export function getRefreshTokenExpires() {
    const raw = getCookie(REFRESH_EXPIRES_KEY) as string;
    return new Date(raw);
}

export function getUsername() {
    return getCookie(USERNAME_KEY) as string;
}

export function getUserId() {
    return getCookie(USER_ID_KEY) as string;
}

export function getAutoLogin() {
    return getCookie(AUTOLOGIN_KEY) === "true";
}

export function getCurrentOrgId() {
    return getCookie(CURRENT_ORG_ID_KEY) as string;
}

export function getCurrentOrgName() {
    return getCookie(CURRENT_ORG_NAME_KEY) as string;
}
