"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function logout() {
    const cookie = cookies();
    cookie.getAll().map((c) => cookie.delete(c.name));

    redirect("/");
}
