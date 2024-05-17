import "@mantine/core/styles.css";
import React from "react";
import { notFound, redirect } from "next/navigation";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { theme } from "@/config/theme";
import { defaultMetadata } from "@/config/metadata";
import ApplicationMantineLayout from "@/component/app-mantine-layout";
import {
    getCurrentOrgId,
    getCurrentOrgName,
    getRefreshToken,
    getToken,
    getUserId,
    getUsername
} from "@/function/token/get";
import { UserStoreProvider } from "@/store/user";
import { SheetListStoreProvider } from "@/store/sheet-list";
import { getSheetList } from "@/function/api/sheet";

export const metadata = defaultMetadata;

async function fetchSheetList(token: string, organizationId: number) {
    return getSheetList(organizationId, token);
}

export default async function ApplicationLayout({ children }: { children: any }) {
    const token = getToken();
    const refreshToken = getRefreshToken();
    const username = getUsername();
    const userId = Number(getUserId());
    const currentOrganizationId = Number(getCurrentOrgId());
    const currentOrganizationName = getCurrentOrgName();

    if (!token || !refreshToken || !username || !userId) {
        redirect("/");
    }

    let sheetList: { sheetId: number, sheetName: string }[] | undefined;
    if (currentOrganizationId != -1) {
        const sheetListResult = await fetchSheetList(token, currentOrganizationId);
        if (!sheetListResult.success) {
            return notFound();
        }
        sheetList = sheetListResult.value?.sheets;
    }

    return (
        <html lang="ko">
            <head>
                <ColorSchemeScript />
                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
                />
            </head>
            <body>
                <UserStoreProvider initialState={ {
                    token, refreshToken, username, userId, currentOrganizationName, currentOrganizationId
                } }
                >
                    <SheetListStoreProvider sheetList={ sheetList }>
                        <MantineProvider theme={ theme } defaultColorScheme="auto">
                            <ApplicationMantineLayout>
                                {children}
                            </ApplicationMantineLayout>
                        </MantineProvider>
                    </SheetListStoreProvider>
                </UserStoreProvider>
            </body>
        </html>
    );
}
