"use client";

import { ListItem, Text, UnstyledButton, useComputedColorScheme } from "@mantine/core";
import { useHover } from "@mantine/hooks";
import Link from "next/link";

type ApplicationNavbarViewListItemProps = {
    name: string,
    href: string
};

export default function ApplicationNavbarViewListItem(
    { name, href }: Readonly<ApplicationNavbarViewListItemProps>
) {
    const colorScheme = useComputedColorScheme();
    const { hovered, ref } = useHover();

    return <>
        <ListItem w="100%" c={
            hovered
                ? (colorScheme == "dark" ? "dark.2" : "dark.2")
                : (colorScheme == "dark" ? "gray.5" : "dark")
        }
        >
            <UnstyledButton component="div" ref={ ref }>
                <Text size="sm" w="11rem" lineClamp={ 1 } component={ Link } href={ href }>
                    {name}
                </Text>
            </UnstyledButton></ListItem>
    </>;
}
