import { Card, Flex, useComputedColorScheme } from "@mantine/core";

type SheetAiChatProps = {
    message: string,
    isReceived: boolean
};

export default function SheetAiChat({ message, isReceived }: Readonly<SheetAiChatProps>) {
    const isDark = useComputedColorScheme() == "dark";
    return <>
        <Flex w="100%" px="xs" justify={ isReceived ? "flex-start" : "flex-end" }>
            <Card maw="80%" mt="xs" bg={ isReceived ? "gray.8" : "quota-green.9" }>
                {message}
            </Card>
        </Flex>

    </>;
}
