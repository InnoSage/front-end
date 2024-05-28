"use client";

import { useRouter } from "next/navigation";
import { ActionIcon, Badge, Button, Checkbox, Flex, Group, Modal, Text } from "@mantine/core";
import { useDisclosure, useHover } from "@mantine/hooks";
import { CustomCellEditorProps, CustomCellRendererProps } from "@ag-grid-community/react";
import { IconTrash } from "@tabler/icons-react";
import deleteDeal from "@/component/view/table-cell/delete-deal.action";
import { useUserStore } from "@/store/user";
import { useSheetStore } from "@/store/sheet";
import { useState } from "react";
import { useSheetDeleteStore } from "@/store/sheet-delete";


interface CompanyCellRendererProps extends CustomCellRendererProps {
    sheetId: number
}

export function CompanyCellRenderer({ value, node, sheetId }: CompanyCellRendererProps) {
    const router = useRouter();
    const deleteStore = useSheetDeleteStore((s) => s);
    const [ withoutModal, setWithoutModal ] = useState(!deleteStore.withModal);
    const [ deleteModal, deleteModalControl ] = useDisclosure(false);
    const user = useUserStore((s) => s);
    const sheet = useSheetStore((s) => s);
    const { ref, hovered } = useHover();
    const all = useHover();

    const id = node.data.id as number;

    const onDeleteDeal = async () => {
        if (withoutModal) {
            deleteStore.setWithModal(false);
        }
        const result = await deleteDeal(sheetId, id, user.token);
        if (result) {
            sheet.removeDeal(id);
        }
        deleteModalControl.close();
    };

    const deleteOnClick = async () => {
        if (deleteStore.withModal) {
            deleteModalControl.open();
        } else {
            await onDeleteDeal();
        }
    };

    return <>
        <Flex align="center" justify="space-between" ref={ all.ref }>
            <Group>
                {
                    all.hovered
                        ? <ActionIcon size="xs" color="red" variant="outline" mx={ 1 } onClick={ deleteOnClick }>
                            <IconTrash size={ 12 } />
                        </ActionIcon>
                        : null
                }
                {value}
            </Group>

            <Badge
                w="4.1rem"
                ml="xs" variant={ hovered ? "filled" : "outline" } ref={ ref }
                onClick={ () => router.push(`/app/view/deal/${sheetId}/note/${id}`) }
            >
                노트 보기
            </Badge>
        </Flex>
        <Modal title="거래 내역 삭제" centered
            opened={ deleteModal } onClose={ deleteModalControl.close }
        >
            <Text size="sm">정말로 본 "{value}"와의 거래 내역을 삭제하시겠습니까?</Text>
            <Flex mt="xs" justify="space-between" align="center">
                <Checkbox label="다시 묻지 않기"
                    checked={ withoutModal } onChange={ (e) => {
                        if (e.currentTarget.checked) {
                            setWithoutModal(true);
                        } else {
                            setWithoutModal(false);
                        }
                    } }
                />
                <Group>
                    <Button variant="outline" color="gray" onClick={ deleteModalControl.close }>취소</Button>
                    <Button color="red" onClick={ onDeleteDeal }>삭제</Button>
                </Group>

            </Flex>
        </Modal>
    </>;
}

interface CompanyCellEditorProps extends CustomCellEditorProps {

}

export function CompanyCellEditor({}: Readonly<CompanyCellEditorProps>) {

}
