"use client";

import { Button, Card, Group, Text, useComputedColorScheme } from "@mantine/core";
import { useUserStore } from "@/store/user";
import selectOrganization from "@/component/organization/select-org.action";
import { useSheetListStore } from "@/store/sheet-list";
import { notFound } from "next/navigation";

type OrganizationCardProps = {
    organizationName: string,
    organizationId: number
};

export default function OrganizationCard(
    { organizationName, organizationId }: Readonly<OrganizationCardProps>
) {
    const isDark = useComputedColorScheme() == "dark";
    const userStore = useUserStore((s) => s);
    const sheetListStore = useSheetListStore((s) => s);
    const selected = userStore.currentOrganizationId == organizationId;

    const onSelectClick = async () => {
        const sheetList = await selectOrganization(userStore.token, organizationId, organizationName);

        if (!sheetList.success) {
            return notFound();
        }
        sheetListStore.setSheetList(sheetList.value!.sheets);
        userStore.setCurrentOrganization(organizationId, organizationName);
    };

    return <Card h="7rem" withBorder={ !isDark }>
        <Text>{organizationName}</Text>
        <Group justify="space-between" mt="sm">
            <Button w="42.5%" color="red" variant="outline">삭제</Button>
            {selected
                ? <Button w="42.5%" disabled>선택됨</Button>
                : <Button w="42.5%" onClick={ onSelectClick }>선택</Button>}

        </Group>

    </Card>;
}
