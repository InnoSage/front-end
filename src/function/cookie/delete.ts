"use server";

import { cookies } from "next/headers";

export async function deleteCookie(key: string) {
    const cookieStore = cookies();
    cookieStore.delete(key);
}

export async function deleteAllCookies() {
    const cookieStore = cookies();
    cookieStore.getAll().map((cookie) => cookieStore.delete(cookie.name));
}
