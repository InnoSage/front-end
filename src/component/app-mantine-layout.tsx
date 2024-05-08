import { AppShell, AppShellMain, AppShellNavbar } from "@mantine/core";
import type { ReactNode } from "react";
import ApplicationNavbar from "@/component/app-nav/nav";

export default function ApplicationMantineLayout({ children }: Readonly<{ children: ReactNode }>) {
    return (
        <AppShell
            navbar={ {
                width: 240,
                breakpoint: 0
            } }
        >
            <AppShellNavbar>
                <ApplicationNavbar username="username" organization="organization" />
            </AppShellNavbar>
            <AppShellMain>
                {children}
            </AppShellMain>
        </AppShell>
    );
}
