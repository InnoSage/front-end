import type { Metadata } from "next";

const defaultMetadata: Metadata = {
    title: "SERVICE NAME HERE",
    description: "SERVICE DESCRIPTION HERE",
    openGraph: {
        title: "SERVICE NAME WITH CATCHPHRASE HERE",
        siteName: "SERVICE NAME HERE",
        description: "SERVICE DESCRIPTION HERE",
        url: "SERVICE URL HERE",
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

