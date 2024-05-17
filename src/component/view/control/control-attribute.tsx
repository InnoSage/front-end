import { Button, ComboboxItem, Flex, Input, Modal, Select, TagsInput } from "@mantine/core";
import { IconPlus, IconTablePlus } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { ReactNode, useState } from "react";
import { AttributeType, AttributeTypeMap, getAttributeType } from "@/function/table/type";
import { CurrencyMap } from "@/function/currency";

type ControlAttributeProps = {};

export default function ControlAttribute({}: Readonly<ControlAttributeProps>) {
    const [ attributeOpened, { open, close } ] = useDisclosure(false);
    const [ attributeName, setAttributeName ] = useState("");

    const [ rawSelectedType, setRawSelectedType ] = useState("");
    const onSelectedTypeChange = (_: string | null, { value }: ComboboxItem) => {
        setRawSelectedType(value);
    };

    // when attribute type is CURRENCY
    const [ rawCurrency, setRawCurrency ] = useState("");
    const currencySelect = <Select
        label="통화단위" searchable
        data={ Object.keys(CurrencyMap).map((k) => {
            const { code, symbol } = CurrencyMap[k as keyof typeof CurrencyMap];
            return { value: code, label: `${code} (${symbol})` };
        }) }
        onChange={ (_, { value }) => setRawCurrency(value) }
    />;

    // when attribute type is SELECT or MULTISELECT
    const [ options, setOptions ] = useState<string[]>([]);
    const optionAdd = <TagsInput
        label="옵션" placeholder="이곳에 옵션을 입력해 주세요."
        data={ [] } value={ options } onChange={ setOptions }
    />;

    const addAttribute = () => {

        const type = getAttributeType(rawSelectedType);


        close();
    };

    return <>
        <Modal opened={ attributeOpened } onClose={ close } title="속성 추가" centered>
            <Input.Wrapper>
                속성명
                <Input value={ attributeName } onChange={ (e) => setAttributeName(e.target.value) } />
            </Input.Wrapper>

            <Select
                label="속성 유형"
                data={ [ "텍스트", "숫자", "통화", "날짜", "선택", "다중선택", "체크박스", "유저" ] }
                onChange={ onSelectedTypeChange }
            />

            {
                (() => {
                    const actualType = getAttributeType(rawSelectedType);
                    switch (actualType) {
                        case "CURRENCY":
                            return currencySelect;
                        case "SELECT":
                        case "MULTISELECT":
                            return optionAdd;
                    }
                })()
            }

            <Flex justify="flex-end">
                <Button size="sm" mt="sm" variant="filled" leftSection={ <IconPlus size={ 14 } /> }
                    onClick={ addAttribute }
                >추가</Button>
            </Flex>

        </Modal>
        <Button variant="filled" mr="xs" leftSection={ <IconTablePlus size={ 14 } /> } onClick={ open }>속성 추가</Button>
    </>;
}
