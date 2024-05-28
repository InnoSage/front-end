"use client";

import { useEffect } from "react";
import reissueToken from "@/component/token-reissue.action";
import { useRouter } from "next/navigation";

type TokenRefresherProps = {
    refreshToken: string,
    to: string
};

export default function TokenRefresher({ refreshToken, to }: Readonly<TokenRefresherProps>) {
    const router = useRouter();
    const refresh = async () => {
        await reissueToken(refreshToken);
    };

    useEffect(() => {
        refresh()
            .then(() => {
                router.push(to);
            })
            .catch(() => {
                router.push("/");
            });
    }, []);

    return <></>;
}
