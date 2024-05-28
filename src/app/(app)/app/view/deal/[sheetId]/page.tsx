import { notFound } from "next/navigation";
import { Sheet, SheetAttribute } from "@/function/table/type";
import SheetIdClientPage from "@/app/(app)/app/view/deal/[sheetId]/page.client";
import { getCurrentOrgId, getToken } from "@/function/token/get";
import { getSheet, GetSheetData } from "@/function/api/sheet";
import { SheetStoreProvider } from "@/store/sheet";
import { SheetDeleteStoreProvider } from "@/store/sheet-delete";

type DealIdPageProps = {
    params: {
        sheetId: string
    }
};

function convertSheet(sheet: GetSheetData): Sheet {
    return {
        sheetId: sheet.sheetId,
        sheetName: sheet.sheetName,
        deals: sheet.deals?.map((d) => ({
            id: d.dealId,
            companyId: d.companyId,
            values: d.contents?.map((c) => ({
                attributeId: c.attributeId,
                value: c.value
            }))
        })) ?? [],
        attributes: sheet.attributes?.map((a) => ({
            id: a.attributeId,
            name: a.attributeName,
            dataType: a.dataType,
            data: a.data
        } as SheetAttribute)) ?? [],
        companies: sheet.companies.companies?.map((c) => ({
            id: c.companyId,
            name: c.companyName
        })) ?? [],
        filters: sheet.filters?.map((f) => ({
            id: f.filterId,
            targetAttributeId: f.targetAttributeId,
            keyword: f.keyword,
            filterType: f.filterType
        })) ?? []
    };
}

async function fetchSheet(organizationId: number, sheetId: number, token: string): Promise<Sheet> {
    const result = await getSheet(token, organizationId, sheetId);

    if (!result.success) {
        return notFound();
    }

    return convertSheet(result.value);
}

export default async function SheetIdPage({ params }: Readonly<DealIdPageProps>) {
    const sheetId = Number(params.sheetId);
    const organizationId = Number(getCurrentOrgId());
    const token = getToken();

    if (isNaN(sheetId)) {
        return notFound();
    }

    const sheet = await fetchSheet(organizationId, sheetId, token);

    return <>
        <SheetStoreProvider sheet={ sheet }>
            <SheetDeleteStoreProvider>
                <SheetIdClientPage />
            </SheetDeleteStoreProvider>
        </SheetStoreProvider>
    </>;
}
