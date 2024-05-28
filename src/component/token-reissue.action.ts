"use server";

import { reissue } from "@/function/api/login";
import { setRefreshToken, setToken } from "@/function/token/set";
import { deleteAllCookies } from "@/function/cookie/delete";

export default async function reissueToken(refreshToken: string) {
    const result = await reissue(refreshToken);
    if (!result.success) {
        await deleteAllCookies();
        throw new Error();
    }

    await setToken(result.value!.accessToken);
    await setRefreshToken(result.value!.refreshToken);
}
