import type { Metadata } from "next";

const defaultMetadata: Metadata = {
    title: "InnoSheet",
    description: "InnoSheet: AI 어시스턴트와 함께하는 투자 관리 플랫폼",
    openGraph: {
        title: "InnoSheet",
        siteName: "InnoSheet",
        description: "AI 어시스턴트와 함께하는 투자 관리 플랫폼 \"InnoSheet\"",
        url: process.env.SITE_URL ?? "http://localhost:3000",
        type: "website"
    },
    robots: {
        index: true,
        follow: false,
        nocache: false,
        googleBot: {
            index: true,
            follow: false,
            nocache: false
        }
    }
};

export { defaultMetadata };

