"use server";

import { setCurrentOrgId, setCurrentOrgName } from "@/function/token/set";
import { getSheetList } from "@/function/api/sheet";

export default async function selectOrganization(token: string, orgId: number, orgName: string) {
    await setCurrentOrgId(String(orgId));
    await setCurrentOrgName(orgName);
    return await getSheetList(orgId, token);
}
