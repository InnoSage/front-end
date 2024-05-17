"use client";

import { Button, Flex, Input, Modal } from "@mantine/core";
import { useState } from "react";
import addNewSheet from "@/component/app-nav/new-sheet.action";
import { useSheetListStore } from "@/store/sheet-list";
import { useUserStore } from "@/store/user";

type NewSheetModalProps = {
    opened: boolean,
    close: ()=> void
};

export default function NewSheetModal({ opened, close }: Readonly<NewSheetModalProps>) {
    const sheetListStore = useSheetListStore((s) => s);
    const userStore = useUserStore((s) => s);
    const [ sheetName, setSheetName ] = useState("");

    const onAddClick = async () => {
        const result = await addNewSheet(userStore.token, userStore.currentOrganizationId, sheetName);
        sheetListStore.setSheetList(result);
        close();
    };

    return <Modal opened={ opened } onClose={ close } title="새로운 투자 내역 시트 생성" centered>
        <Input.Wrapper>
            <Input.Label>시트 이름</Input.Label>
            <Input placeholder="시트 이름을 입력하세요" value={ sheetName } onChange={ (e) => setSheetName(e.target.value) } />
        </Input.Wrapper>
        <Flex justify="flex-end" mt="xs">
            <Button onClick={ close } variant="outline" color="gray">취소</Button>
            <Button ml="xs" onClick={ onAddClick }>생성</Button>
        </Flex>
    </Modal>;
}
