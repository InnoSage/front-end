"use client";

import {
    ActionIcon,
    Affix,
    Center,
    Divider,
    Flex,
    Loader,
    Popover,
    ScrollArea,
    Text,
    TextInput,
    Tooltip
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconGhost, IconSend } from "@tabler/icons-react";
import { ChangeEvent, KeyboardEvent, ReactNode, useRef, useState } from "react";
import SheetAiChat from "@/component/view/ai-chat";
import { getAiQuestion } from "@/component/view/ai.action";
import { useSheetStore } from "@/store/sheet";
import { useUserStore } from "@/store/user";

export default function SheetAiButton() {
    const sheet = useSheetStore((s) => s);
    const user = useUserStore((s) => s);

    const [ chatOpened, { open, close, toggle } ] = useDisclosure(false);
    const [ tooltipOpened, tooltipControl ] = useDisclosure(false);
    const [ command, setCommand ] = useState("");

    const [ commandLoading, setCommandLoading ] = useState(false);

    const viewport = useRef<HTMLDivElement>(null);

    const [ sendMessages, setSendMessages ] = useState<string[]>([]);
    const [ receivedMessages, setReceivedMessages ] = useState<string[]>([]);

    const onCommandChange = (e: ChangeEvent<HTMLInputElement>) => {
        setCommand(e.target.value);
    };

    const chatScrollToBottom = () => {
        viewport.current!.scrollTo({
            top: viewport.current!.scrollHeight, behavior: "smooth"
        });
    };

    const onCommandSend = async () => {
        setCommandLoading(true);
        setSendMessages([ ...sendMessages, command ]);
        setCommand("");
        setTimeout(chatScrollToBottom, 200);
        const result = await getAiQuestion(user.currentOrganizationId, sheet.sheetId, command, user.token);

        if (result == "__ERROR__") {
            setReceivedMessages([ ...receivedMessages, "AI 서버와 통신 중 오류가 발생했습니다." ]);
        } else {
            setReceivedMessages([ ...receivedMessages, result ]);
        }

        setCommandLoading(false);
        setTimeout(chatScrollToBottom, 200);
    };

    const commandEnterHandler = async (e: KeyboardEvent<HTMLInputElement>) => {
        if (command.length > 4 && e.key == "Enter") {
            await onCommandSend();
        }
    };

    return <>
        <Affix position={ { bottom: 20, right: 20 } }>
            <Popover onClose={ close } opened={ chatOpened }
                position="top-end" withArrow keepMounted
            >
                <Popover.Target>
                    <Tooltip label="AI Assistant" opened={ tooltipOpened }>
                        <ActionIcon
                            variant="filled" size={ 40 }
                            onClick={ () => {
                                toggle();
                                tooltipControl.close();
                            } }
                            onMouseEnter={ () => {
                                if (!chatOpened) tooltipControl.open();
                            } }
                            onMouseLeave={ tooltipControl.close }
                        >
                            <IconGhost stroke={ 1.5 } />
                        </ActionIcon>
                    </Tooltip>
                </Popover.Target>
                <Popover.Dropdown w="25rem">
                    <Center><Text>AI Assistant</Text></Center>
                    <Divider my="xs" />
                    <ScrollArea
                        h="50vh" scrollbarSize="0.3rem"
                        viewportRef={ viewport }
                    >
                        {
                            (() => {
                                const len = Math.max(sendMessages.length, receivedMessages.length);
                                const messages: ReactNode[] = [];
                                for (let i = 0; i < len; i++) {
                                    const send = sendMessages[i];
                                    const received = receivedMessages[i];

                                    if (send) {
                                        messages.push(
                                            <SheetAiChat key={ `s${i}` } isReceived={ false } message={ send } />
                                        );
                                    }

                                    if (received) {
                                        messages.push(
                                            <SheetAiChat key={ `r${i}` } isReceived={ true } message={ received } />
                                        );
                                    }
                                }
                                return messages;
                            })()
                        }
                    </ScrollArea>
                    <Divider my="xs" />
                    <Flex align="center" w="100%" justify="space-between">
                        <TextInput
                            radius="xl"
                            w="85%" placeholder="질문을 입력해주세요."
                            value={ command } onChange={ onCommandChange }
                            onKeyDown={ commandEnterHandler }
                        />
                        <ActionIcon size="lg" radius="xl" onClick={ onCommandSend } disabled={ command.length < 5 }>
                            {
                                commandLoading
                                    ?  <Loader type="dots" size="xs" />
                                    : <IconSend size={ 14 } />
                            }
                        </ActionIcon>
                    </Flex>
                </Popover.Dropdown>
            </Popover>
        </Affix>
    </>;
}
