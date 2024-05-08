"use client";

import { ActionIcon, Group, rem, Text, Tooltip, useComputedColorScheme } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import type { MouseEventHandler, ReactNode } from "react";

type ApplicationNavbarViewListSectionProps = {
    name: string,
    addTooltip: string,
    onAddClick?: MouseEventHandler<HTMLButtonElement>,
    children?: ReactNode
};

export default function ApplicationNavbarViewListSection(
    { name, addTooltip, onAddClick, children }: Readonly<ApplicationNavbarViewListSectionProps>
) {
    const colorScheme = useComputedColorScheme();

    return <Group w="100%" mt="xs" mb="lg" px="xs">
        <Group mb="0" pb="0" px="xs" w="100%" justify="space-between">
            <Text size="xs" fw={ 500 } c="dimmed">
                {name}
            </Text>
            <Tooltip
                label={ addTooltip } withArrow position="right"
                bg={ colorScheme == "dark" ? "dark.5" : "" }
                c={ colorScheme == "dark" ? "gray.3" : "" }
            >
                <ActionIcon variant="default" size={ 18 } onClick={ onAddClick }>
                    <IconPlus style={ { width: rem(12), height: rem(12) } } stroke={ 1.5 } />
                </ActionIcon>
            </Tooltip>
        </Group>
        {children}
    </Group>;
}
