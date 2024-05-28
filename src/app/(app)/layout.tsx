import "@mantine/core/styles.css";
import React from "react";
import { redirect } from "next/navigation";
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
import { headers } from "next/headers";
import TokenRefresher from "@/component/token-refresher";

export const metadata = defaultMetadata;

async function fetchSheetList(token: string, organizationId: number) {
    return getSheetList(organizationId, token);
}

export default async function ApplicationLayout({ children }: { children: any }) {
    const header = headers();
    const path = header.get("x-url-path");
    const token = getToken();
    const refreshToken = getRefreshToken();
    const username = getUsername();
    const userId = Number(getUserId());
    const currentOrganizationId = Number(getCurrentOrgId());
    const currentOrganizationName = getCurrentOrgName();
    let isTokenExpired = false;

    if (!token || !refreshToken || !username || !userId) {
        redirect("/");
    }

    let sheetList: { sheetId: number, sheetName: string }[] | undefined;
    if (currentOrganizationId != -1) {
        const sheetListResult = await fetchSheetList(token, currentOrganizationId);
        if (!sheetListResult.success) {
            isTokenExpired = true;
        }
        sheetList = sheetListResult.value?.sheets;
    }

    if (isTokenExpired) {
        return <>
            <TokenRefresher refreshToken={ refreshToken } to={ path as string } />
        </>;
    }

    return (
        <html lang="ko">
            <head>
                <ColorSchemeScript suppressHydrationWarning />
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
