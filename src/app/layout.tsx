import type { ReactNode } from "react";
import { defaultMetadata } from "@/config/metadata";

export const metadata = defaultMetadata;

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
    return (
        <html lang="ko">
            <body>
                {children}
            </body>
        </html>
    );
}
