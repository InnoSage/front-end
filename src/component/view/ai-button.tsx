"use client";

import { ActionIcon, Affix, Modal, Popover, Text, Input, Flex, Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconGhost } from "@tabler/icons-react";
import { ChangeEvent, useState } from "react";

export default function SheetAiButton() {
    const [ tooltipOpened, tooltipControl ] = useDisclosure(false);
    const [ modalOpened, modalControl ] = useDisclosure(false);
    const [ command, setCommand ] = useState("");

    const onCommandChange = (e: ChangeEvent<HTMLInputElement>) => {
        setCommand(e.target.value);
    };

    const onAiCommand = () => {

    };

    return <>
        <Affix position={ { bottom: 20, right: 20 } }>
            <Popover opened={ tooltipOpened } position="top-end" withArrow>
                <Popover.Target>
                    <ActionIcon
                        variant="filled" size={ 40 }
                        onMouseEnter={ tooltipControl.open } onMouseLeave={ tooltipControl.close }
                        onClick={ modalControl.open }
                    >
                        <IconGhost stroke={ 1.5 } />
                    </ActionIcon>
                </Popover.Target>
                <Popover.Dropdown>
                    <Text>AI 기능 이용해보기</Text>
                </Popover.Dropdown>
            </Popover>
        </Affix>
        <Modal opened={ modalOpened } onClose={ modalControl.close } title="AI에게 명령하기" centered>
            <Text>다음과 같이 AI에게 명령을 내려주세요.</Text>
            <Text c="dimmed" size="sm">예시: 회사 이름이 A인 거래 목록을 보여줘.</Text>
            <Input mt="xs" placeholder="이곳에 명령을 입력해주세요." value={ command } onChange={ onCommandChange } />
            <Flex justify="flex-end" mt="xs">
                <Button onClick={ onAiCommand }>명령 전송</Button>
            </Flex>
        </Modal>
    </>;
}
