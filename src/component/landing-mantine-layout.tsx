import { AppShell, AppShellHeader, AppShellMain } from "@mantine/core";
import type { ReactNode } from "react";
import LandingHeader from "@/component/landing-header";

export default function LandingMantineLayout({ children }: Readonly<{ children: ReactNode }>) {
    return (
        <AppShell
            header={ { height: 60 } }
        >
            <AppShellHeader mb="xl">
                <LandingHeader />
            </AppShellHeader>
            <AppShellMain>
                {children}
            </AppShellMain>
        </AppShell>
    );
}
