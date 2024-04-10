import "@mantine/core/styles.css";
import React from "react";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { theme } from "@/config/theme";
import { defaultMetadata } from "@/config/metadata";
import LandingMantineLayout from "@/component/landing-mantine-layout";

export const metadata = defaultMetadata;

export default function LandingLayout({ children }: { children: any }) {
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
                <MantineProvider theme={ theme }>
                    <LandingMantineLayout>
                        {children}
                    </LandingMantineLayout>
                </MantineProvider>
            </body>
        </html>
    );
}
