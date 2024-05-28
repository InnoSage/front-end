"use client";

import { ActionIcon, Burger, Button, Flex, Menu, Modal, Title } from "@mantine/core";
import { IconArrowLeft, IconTrash } from "@tabler/icons-react";
import Link from "next/link";
import { useDisclosure } from "@mantine/hooks";

type NotePageHeaderProps = {
    sheetId: number,
    companyName: string
};

export default function NotePageHeader({ sheetId, companyName }: Readonly<NotePageHeaderProps>) {
    const [ burgerMenuOpened, burgerMenuControl ] = useDisclosure(false);
    const [ deleteModalOpened, deleteModalControl ] = useDisclosure(false);

    return <Flex align="center">
        <ActionIcon
            variant="light"
            component={ Link } href={ `/app/view/deal/${sheetId}` }
        >
            <IconArrowLeft size={ 14 } />
        </ActionIcon>
        <Title mx="sm" order={ 2 } w={ `${companyName.length * 2}rem` }>{companyName}</Title>
        <Menu opened={ burgerMenuOpened } onClose={ burgerMenuControl.close } position="bottom-end">
            <Menu.Target>
                <Flex align="center" justify="flex-end" w="90%">
                    <Burger size="sm" opened={ burgerMenuOpened } onClick={ burgerMenuControl.toggle } />
                </Flex>
            </Menu.Target>
            <Menu.Dropdown>
                <Menu.Item leftSection={ <IconTrash size={ 16 } /> } color="red" onClick={ deleteModalControl.open }>
                    삭제하기
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
        <Modal
            opened={ deleteModalOpened } onClose={ deleteModalControl.close }
            title="거래 내역 삭제" centered
        >
            정말로 거래 내역을 삭제하시겠습니까?
            <Flex justify="flex-end" mt="xs">
                <Button variant="outline" color="gray" mr="xs" onClick={ deleteModalControl.close }>취소</Button>
                <Button color="red">삭제</Button>
            </Flex>
        </Modal>

    </Flex>;

}
