import getCookie from "@/function/cookie/get";

const TOKEN_KEY = "LOGIN_TOKEN";
const REFRESH_TOKEN_KEY = "REFRESH_TOKEN";
const USERNAME_KEY = "USERNAME";

export function getToken() {
    return getCookie(TOKEN_KEY) as string;
}

export function getRefreshToken() {
    return getCookie(REFRESH_TOKEN_KEY) as string;
}

export function getUsername() {
    return getCookie(USERNAME_KEY) as string;
}
