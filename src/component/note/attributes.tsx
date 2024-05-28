import { AttributeType, getAttributeName } from "@/function/table/type";
import { Card, Flex, Text, useComputedColorScheme } from "@mantine/core";

type AttributesProps = {
    attributes: {
        attributeId: number,
        attributeName: string,
        dataType: AttributeType,
        value: unknown
    }[]
};

export default function Attributes({ attributes }: Readonly<AttributesProps>) {
    const isDark = useComputedColorScheme() == "dark";
    return <>
        {
            attributes.map((attribute, i) =>
                <Card px="xl" h="3rem" my="xs" w="100%" key={ i } withBorder={ !isDark }>
                    <Flex h="100%" w="100%" align="center" justify="space-between">
                        <Text>{attribute.attributeName} [{getAttributeName(attribute.dataType)}]</Text>
                        <Text>{attribute.value as string}</Text>
                    </Flex>
                </Card>)
        }
    </>;
}
