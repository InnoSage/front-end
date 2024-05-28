import { Button, ComboboxItem, Flex, Modal, Select, TagsInput, TextInput } from "@mantine/core";
import { IconPlus, IconTablePlus } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { getAttributeType, SheetAttribute } from "@/function/table/type";
import { CurrencyMap } from "@/function/currency";
import hasSpace from "@/function/validation/no-space";
import { AddAttributeProps } from "@/function/api/attribute";
import { useSheetStore } from "@/store/sheet";
import { useUserStore } from "@/store/user";
import { addAttribute as addAttr } from "./attribute.action";

type ControlAttributeProps = {};

export default function ControlAttribute({}: Readonly<ControlAttributeProps>) {
    const sheet = useSheetStore((s) => s);
    const user = useUserStore((s) => s);
    const [ attributeOpened, { open, close } ] = useDisclosure(false);
    const [ attributeName, setAttributeName ] = useState("");
    const [ attributeDescription, setAttributeDescription ] = useState("");

    const [ rawSelectedType, setRawSelectedType ] = useState("");
    const onSelectedTypeChange = (_: string | null, { value }: ComboboxItem) => {
        setRawSelectedType(value);
    };

    // when attribute type is CURRENCY
    const [ rawCurrency, setRawCurrency ] = useState("");
    const currencySelect = <Select
        label="통화단위" searchable my="sm" required
        data={ Object.keys(CurrencyMap).map((k) => {
            const { code, symbolNative, namePluralNative } = CurrencyMap[k as keyof typeof CurrencyMap];
            return { value: code, label: `${code} [${symbolNative}] - ${namePluralNative}` };
        }) }
        onChange={ (_, { value }) => setRawCurrency(value) }
    />;

    // when attribute type is SELECT or MULTISELECT
    const [ options, setOptions ] = useState<string[]>([]);
    const optionAdd = <TagsInput
        label="옵션" placeholder="이곳에 옵션을 입력해 주세요." my="sm"
        data={ [] } value={ options } onChange={ setOptions }
    />;

    const addAttribute = async () => {
        const type = getAttributeType(rawSelectedType);
        if (!type) return close();

        const props: Partial<AddAttributeProps> = {
            dataType: type,
            name: attributeName,
            description: attributeDescription == "" ? undefined : attributeDescription
        };

        if (type == "CURRENCY") {
            props.data = { currency: rawCurrency };
        } else if (type == "SELECT" || type == "MULTISELECT") {
            props.data = { options };
        }

        const result = await addAttr(sheet.sheetId, user.token, props as AddAttributeProps);

        if (result) {
            sheet.addAttribute({
                id: result.attributeId,
                name: result.name,
                data: result.data,
                dataType: result.dataType
            } as SheetAttribute);

            setAttributeName("");
            setAttributeDescription("");
            setOptions([]);
            setRawCurrency("");
        }

        close();
    };


    const isAttributeNameValid = () => (attributeName.length >= 4) && !hasSpace(attributeName);

    const isAttributeAddable = () => {
        const addable =  (getAttributeType(rawSelectedType) != null)
            && isAttributeNameValid();

        if (getAttributeType(rawSelectedType) == "CURRENCY") {
            return addable && Object.keys(CurrencyMap).includes(rawCurrency);
        }

        return addable;
    };

    return <>
        <Modal opened={ attributeOpened } onClose={ close } title="속성 추가" centered>
            <TextInput
                label="속성명" required my="sm"
                error={ attributeName.length != 0 && !isAttributeNameValid()
                    ? "속성명은 4글자 이상, 공백 미포함이어야 합니다."
                    : "" }
                value={ attributeName } onChange={ (e) => setAttributeName(e.target.value) }
            />

            <TextInput
                label="설명" my="sm"
                value={ attributeDescription } onChange={ (e) => setAttributeDescription(e.target.value) }
            />

            <Select
                label="속성 유형" required
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

            <Flex justify="flex-end" my="sm">
                <Button size="sm" mt="sm" variant="filled" leftSection={ <IconPlus size={ 14 } /> }
                    disabled={ !isAttributeAddable() }
                    onClick={ addAttribute }
                >추가</Button>
            </Flex>

        </Modal>
        <Button variant="filled" mr="xs" leftSection={ <IconTablePlus size={ 14 } /> } onClick={ open }>속성 추가</Button>
    </>;
}
