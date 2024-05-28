import { AppShell, AppShellMain, AppShellNavbar } from "@mantine/core";
import type { ReactNode } from "react";
import ApplicationNavbar from "@/component/app-nav/nav";

type ApplicationMantineLayoutProps = {
    children: ReactNode
};

export default function ApplicationMantineLayout({ children }: Readonly<ApplicationMantineLayoutProps>) {
    return (
        <AppShell
            navbar={ {
                width: 240,
                breakpoint: 0
            } }
        >
            <AppShellNavbar>
                <ApplicationNavbar />
            </AppShellNavbar>
            <AppShellMain>
                {children}
            </AppShellMain>
        </AppShell>
    );
}
