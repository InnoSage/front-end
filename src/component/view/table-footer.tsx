import { Container, Flex, Text } from "@mantine/core";

type TableFooterProps = {
    selectedRows: number,
    total: number
};

export default function TableFooter({ selectedRows, total }: Readonly<TableFooterProps>) {
    return <Container fluid h="100%" w="100%">
        <Flex w="100%" h="100%" align="center">
            <Text size="sm" mr="xs">{selectedRows}개 선택됨</Text>
            <Text size="sm" mx="xs">총 {total}항목</Text>
        </Flex>

    </Container>;
}
