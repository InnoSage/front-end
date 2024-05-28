"use client";

import { useRouter } from "next/navigation";
import { Button, Flex, Input, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { useSheetStore } from "@/store/sheet";
import { useSheetListStore } from "@/store/sheet-list";
import deleteSheet from "@/component/view/control/sheet-delete.action";
import { useUserStore } from "@/store/user";

export default function ControlDelete() {
    const router = useRouter();
    const store = useSheetStore((s) => s);
    const user = useUserStore((s) => s);
    const listStore = useSheetListStore((s) => s);
    const [ isDeleteOpened, { open, close } ] = useDisclosure(false);
    const [ isDeletable, setIsDeletable ] = useState(false);

    const onDeleteSheetClick = async () => {
        const result = await deleteSheet(user.currentOrganizationId, store.sheetId, user.token);

        if (result) {
            listStore.deleteSheet(store.sheetId);
            router.push("/app");
        }
    };
    return <>
        <Modal opened={ isDeleteOpened } onClose={ close } centered title="시트 삭제">
            정말로 "{store.sheetName}" 시트를 삭제하시겠습니까? <br />
            삭제하시려면 "{store.sheetName}"을 입력해주세요.

            <Input my="xs" placeholder={ store.sheetName }
                error={ isDeletable ? undefined : "입력하신 이름이 일치하지 않습니다." }
                onChange={ (e) => setIsDeletable(e.target.value === store.sheetName) }
            />

            <Flex justify="flex-end">
                <Button color="gray" variant="outline" mx="xs" onClick={ () => {
                    close();
                    setIsDeletable(false);
                } }
                >취소</Button>
                <Button color="red" disabled={ !isDeletable } onClick={ onDeleteSheetClick }>삭제</Button>
            </Flex>
        </Modal>

        <Button variant="outline" mx="xs" w="6rem" color="red" onClick={ open }>시트 삭제</Button>
    </>;
}
