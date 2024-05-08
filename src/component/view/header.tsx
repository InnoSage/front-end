"use client";

import { ChangeEvent, FocusEvent, KeyboardEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useDisclosure, useFocusWithin } from "@mantine/hooks";
import { Button, Flex, Input, Modal } from "@mantine/core";
import { IconEdit } from "@tabler/icons-react";

type ViewHeaderProps = {
    name: string,
    id: number
};

export default function ViewHeader({ name }: Readonly<ViewHeaderProps>) {
    const router = useRouter();
    const [ currentName, setName ] = useState(name);
    const { ref, focused } = useFocusWithin();
    const [ isDeleteOpened, { open, close } ] = useDisclosure(false);
    const [ isDeletable, setIsDeletable ] = useState(false);

    const onNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setName(value);
    };

    const onNameKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" || e.key === "Escape") {
            e.currentTarget.blur();
        }
    };

    const onNameBlur = (e: FocusEvent<HTMLInputElement>) => {
        // TODO: Update global state with the new name for navigation
        // TODO: Update actual value within API
    };

    const deleteSheet = () => {
        // TODO: Delete sheet
        router.push("/app");
    };

    return <Flex w="100%" h="100%" align="center">
        <Input ref={ ref } w="30rem" variant={ focused ? "filled" : "unstyled" } leftSection={ <IconEdit size={ 16 } /> }
            placeholder={ currentName } value={ currentName }
            onChange={ onNameChange } onKeyDown={ onNameKeyDown } onBlur={ onNameBlur }
        />

        <Modal opened={ isDeleteOpened } onClose={ close } centered title="시트 삭제">
            정말로 "{currentName}" 시트를 삭제하시겠습니까? <br />
            삭제하시려면 "{currentName}"을 입력해주세요.

            <Input my="xs" placeholder={ currentName }
                error={ isDeletable ? undefined : "입력하신 이름이 일치하지 않습니다." }
                onChange={ (e) => setIsDeletable(e.target.value === currentName) }
            />

            <Flex justify="flex-end">
                <Button color="gray" variant="outline" mx="xs" onClick={ () => {
                    close();
                    setIsDeletable(false);
                } }
                >취소</Button>
                <Button color="red" disabled={ !isDeletable } onClick={ deleteSheet }>삭제</Button>
            </Flex>
        </Modal>

        <Button variant="outline" mx="xs" w="6rem" color="red" onClick={ open }>시트 삭제</Button>
    </Flex>;
}
