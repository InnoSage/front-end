"use server";

import { addOrganization } from "@/function/api/organization";

export default async function addNewOrganization(token: string, name: string) {
    const result = await addOrganization(token, name);
    return result.success;
}
