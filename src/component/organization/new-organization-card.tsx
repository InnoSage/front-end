"use client";

import { Button, Card, Center, Flex, Input, Modal, Text, useComputedColorScheme } from "@mantine/core";
import { useDisclosure, useHover } from "@mantine/hooks";
import { useState } from "react";
import { useRouter } from "next/navigation";
import addOrganization from "./new-organization.action";
import { useUserStore } from "@/store/user";

export default function NewOrganizationCard() {
    const userStore = useUserStore((s) => s);
    const router = useRouter();

    const { hovered, ref } = useHover();
    const isDark = useComputedColorScheme() == "dark";
    const [ opened, { open, close } ] = useDisclosure(false);
    const [ orgName, setOrgName ] = useState("");

    const onAddClick = async () => {
        const success = await addOrganization(userStore.token, orgName);
        if (success) {
            router.refresh();
            close();
        }
    };

    return <>
        <Card h="7rem" onClick={ open } ref={ ref }
            bg={ isDark
                ? (hovered ? "dark.5" : "dark.6")
                : (hovered ? "dark.1" : "white") }
            withBorder={ !isDark }
        >
            <Center h="100%" w="100%">
                <Text>새 조직 추가하기</Text>
            </Center>
        </Card>
        <Modal opened={ opened } onClose={ close } title="새 조직 추가하기" centered>
            <Input.Wrapper>
                <Input.Label>조직명</Input.Label>
                <Input value={ orgName } onChange={ (e) => setOrgName(e.target.value) } />
            </Input.Wrapper>
            <Flex mt="sm" justify="flex-end">
                <Button variant="outline" color="gray" onClick={ close }>취소</Button>
                <Button ml="xs" onClick={ onAddClick }>추가</Button>
            </Flex>
        </Modal>
    </>;
}
