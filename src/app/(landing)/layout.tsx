import "@mantine/core/styles.css";
import React from "react";
import { redirect } from "next/navigation";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { theme } from "@/config/theme";
import { defaultMetadata } from "@/config/metadata";
import LandingMantineLayout from "@/component/landing-mantine-layout";
import { getRefreshToken, getToken, getUserId, getUsername } from "@/function/token/get";

export const metadata = defaultMetadata;

export default function LandingLayout({ children }: { children: any }) {
    const token = getToken();
    const refreshToken = getRefreshToken();
    const username = getUsername();
    const userId = Number(getUserId());

    if (token && refreshToken && username && userId) {
        redirect("/app");
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
                <MantineProvider theme={ theme } defaultColorScheme="auto">
                    <LandingMantineLayout>
                        {children}
                    </LandingMantineLayout>
                </MantineProvider>
            </body>
        </html>
    );
}
