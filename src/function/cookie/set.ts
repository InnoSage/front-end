"use server";

import { cookies } from "next/headers";

export async function setCookie(key: string, value: string, expires = undefined) {
    const store = cookies();

    store.set({
        name: key, value,
        path: "/",
        httpOnly: true,
        secure: true,
        expires
    });
}
