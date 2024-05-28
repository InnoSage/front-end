"use client";

import { Card, Center, Text, useComputedColorScheme } from "@mantine/core";
import { useHover } from "@mantine/hooks";
import { useRouter } from "next/navigation";

type DashboardSheetListCardProps = {
    sheetName: string,
    sheetId: number
};

export default function DashboardSheetListCard({ sheetName, sheetId }: Readonly<DashboardSheetListCardProps>) {
    const router = useRouter();
    const { hovered, ref } = useHover();
    const isDark = useComputedColorScheme() == "dark";

    return <Card
        ref={ ref }
        bg={ isDark
            ? (hovered ? "dark.5" : "dark.6")
            : (hovered ? "dark.1" : "white") }
        withBorder={ !isDark }
        h="100%"
        onClick={ () => router.push(`/app/view/deal/${sheetId}`) }
    >
        <Center h="100%" w="100%">
            <Text size="sm">{sheetName}</Text>
        </Center>

    </Card>;
}
