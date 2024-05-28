import { Text } from "@mantine/core";
import Link from "next/link";

type LogoProps = {
    href?: string
};

const BRAND_NAME = "InnoSheet";

export default function Logo({ href }: Readonly<LogoProps>) {
    if (href) {
        return <Text component={ Link } href={ href } size="lg" fw={ 500 } c="primary">
            {BRAND_NAME}
        </Text>;
    }

    return <Text size="lg" fw={ 500 } c="primary">{BRAND_NAME}</Text>;
}
