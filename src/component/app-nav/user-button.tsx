"use client";

import { Button, Flex, Group, Menu, Modal, rem, Text, UnstyledButton } from "@mantine/core";
import { IconChevronRight, IconLogout, IconUsers } from "@tabler/icons-react";
import classes from "./user-button.module.css";
import { useUserStore } from "@/store/user";
import { useDisclosure } from "@mantine/hooks";
import logout from "@/component/app-nav/logout.action";
import Link from "next/link";

export default function UserButton() {
    const { username, currentOrganizationName } = useUserStore((state) => state);

    const [ opened, { open, close } ] = useDisclosure(false);

    const onLogoutClick = async () => {
        await logout();
    };

    return <>
        <Menu position="right-end">
            <Menu.Target>
                <UnstyledButton className={ classes.user } w="100%">
                    <Group w="100%" px="xs" justify="">
                        <div style={ { flex: 1 } }>
                            <Text size="sm">
                                {username}
                            </Text>
                            <Text c="dimmed" size="xs">
                                {currentOrganizationName == "" || !currentOrganizationName ? "현재 선택된 조직이 없습니다." : currentOrganizationName}
                            </Text>
                        </div>

                        <IconChevronRight style={ { width: rem(14), height: rem(14) } } stroke={ 1.5 } />
                    </Group>
                </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown>
                <Menu.Item href="/app/organization" component={ Link } leftSection={ <IconUsers size={ 14 } /> }>
                    조직 선택 / 관리
                </Menu.Item>
                <Menu.Item leftSection={ <IconLogout size={ 14 } /> } onClick={ open }>
                    로그아웃
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
        <Modal opened={ opened } onClose={ close } title="로그아웃" centered>
            <Text>정말로 로그아웃 하시겠습니까?</Text>
            <Flex justify="flex-end" mt="sm">
                <Button variant="outline" color="gray" mr="xs" onClick={ close }>취소</Button>
                <Button color="red" onClick={ onLogoutClick }>로그아웃</Button>
            </Flex>
        </Modal>
    </>;
}
