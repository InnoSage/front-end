"use client";

import { CustomHeaderProps as AGCustomHeaderProps } from "@ag-grid-community/react";
import { Button, Flex, Menu, Modal, Select, Text, TextInput, UnstyledButton } from "@mantine/core";
import { AttributeType, getAttributeName, MultiSelectAttribute, SelectAttribute } from "@/function/table/type";
import { ReactNode, useState } from "react";
import {
    IconArrowDown,
    IconArrowUp,
    IconCalendar,
    IconCheck,
    IconCheckbox,
    IconChecks,
    IconCurrencyDollar,
    IconEdit,
    IconMenu2,
    IconNumbers,
    IconTrash,
    IconTypography,
    IconUser
} from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { Currencies, CurrencyCode } from "@/function/currency";
import {
    deleteAttribute as deleteAttr,
    deleteAttributeOption,
    editAttribute,
    editAttributeOptionName
} from "@/component/view/edit-attribute.action";
import { useSheetStore } from "@/store/sheet";
import { useUserStore } from "@/store/user";
import hasSpace from "@/function/validation/no-space";

export interface CustomHeaderProps extends AGCustomHeaderProps {
    dataType?: AttributeType,
    attributeId: number,
    currency?: CurrencyCode
}

const IconMap: Record<AttributeType, ReactNode> = {
    TEXT: <IconTypography size={ 14 } />,
    NUMBER: <IconNumbers size={ 14 } />,
    CURRENCY: <IconCurrencyDollar size={ 14 } />,
    SELECT: <IconCheck size={ 14 } />,
    MULTISELECT: <IconChecks size={ 14 } />,
    DATE: <IconCalendar size={ 14 } />,
    CHECKBOX: <IconCheckbox size={ 14 } />,
    USER: <IconUser size={ 14 } />
};

export default function CustomHeader(props: Readonly<CustomHeaderProps>) {
    const sheet = useSheetStore((s) => s);
    const user = useUserStore((s) => s);
    const [ opened, { close, open } ] = useDisclosure(false);
    const width = props.column.getActualWidth();
    const [ sort, setSort ] = useState<"asc" | "desc" | null>(null);

    const [ nameModal, nameModalControl ] = useDisclosure(false);
    const [ currentName, setCurrentName ] = useState(props.displayName);

    const [ currencyModal, currencyModalControl ] = useDisclosure(false);
    const [ selectedCurrency, setSelectedCurrency ] = useState<CurrencyCode>(props.currency ?? "KRW");

    const [ optionModal, optionModalControl ] = useDisclosure(false);
    const [ rawSelectedOption, setRawSelectedOption ] = useState("");
    const [ currentOptionName, setCurrentOptionName ] = useState("");

    const [ deleteModal, deleteModalControl ] = useDisclosure(false);


    const currencyData = (Object.keys(Currencies) as CurrencyCode[]).map((code) => ({
        value: code,
        label: `${code} [${Currencies[code].symbolNative}] - ${Currencies[code].namePluralNative}`
    }));

    const closeCurrency = () => {
        close();
        nameModalControl.close();
        currencyModalControl.close();
        optionModalControl.close();
        deleteModalControl.close();
        setSelectedCurrency(props.currency ?? "KRW");
    };

    const closeName = () => {
        close();
        nameModalControl.close();
        currencyModalControl.close();
        optionModalControl.close();
        deleteModalControl.close();
        setCurrentName(props.displayName);
    };

    const closeDelete = () => {
        close();
        nameModalControl.close();
        currencyModalControl.close();
        optionModalControl.close();
        deleteModalControl.close();
    };

    const closeOption = () => {
        close();
        nameModalControl.close();
        currencyModalControl.close();
        optionModalControl.close();
        deleteModalControl.close();
    };

    const changeName = async () => {
        const editProps = {
            dataType: props.dataType!,
            name: currentName,
            data: {}
        };

        let result: boolean;
        if (props.dataType == "CURRENCY") {
            result = await editAttribute(sheet.sheetId, props.attributeId, user.token, {
                ...editProps,
                data: { currency: props.currency }
            });
        } else if (props.dataType == "SELECT" || props.dataType == "MULTISELECT") {
            result = true;
        } else {
            result = await editAttribute(sheet.sheetId, props.attributeId, user.token, editProps);
        }

        if (result) {
            const newAttributes = sheet.attributes;
            const idx = newAttributes.findIndex((a) => a.id == props.attributeId);
            if (idx != -1) {
                newAttributes[idx].name = currentName;
                sheet.setAttributes(newAttributes);
            }
        }
        closeName();
    };

    const changeCurrency = async () => {
        const result = await editAttribute(sheet.sheetId, props.attributeId, user.token, {
            dataType: props.dataType!,
            name: props.displayName,
            data: { currency: selectedCurrency }
        });

        if (result) {
            const newAttributes = sheet.attributes;
            const idx = newAttributes.findIndex((a) => a.id == props.attributeId);
            if (idx != -1) {
                newAttributes[idx].data = { currency: selectedCurrency };
                sheet.setAttributes(newAttributes);
            }
        }

        closeCurrency();
    };

    const deleteAttribute = async () => {
        const result = await deleteAttr(sheet.sheetId, props.attributeId, user.token);
        if (result) {
            sheet.removeAttribute(props.attributeId);
        }
        closeDelete();
    };

    const onClickForSort = () => {
        if (!sort) {
            setSort("asc");
            props.setSort("asc");
        } else if (sort == "asc") {
            setSort("desc");
            props.setSort("desc");
        } else if (sort == "desc") {
            setSort(null);
            props.setSort(null);
        }
    };

    return <>
        <Flex w="100%" h="100%" align="center" justify="space-between">
            <Flex align="center" onClick={ onClickForSort }>
                <Text size="sm" fw={ 700 }>{props.displayName}</Text>
                &nbsp;
                {props.dataType ? IconMap[props.dataType] : undefined}
                {sort == "asc" ? <IconArrowUp size={ 14 } /> : undefined}
                {sort == "desc" ? <IconArrowDown size={ 14 } /> : undefined}
            </Flex>

            {
                props.dataType
                    ? <Menu width={ width } position="bottom-end" opened={ opened } onClose={ () => {
                        close();
                    } } closeOnItemClick={ false }
                    >
                        <Menu.Target>
                            <UnstyledButton h="100%" onClick={ open }>
                                <Flex h="100%" align="center">
                                    <IconMenu2 size={ 14 } />
                                </Flex>
                            </UnstyledButton>
                        </Menu.Target>

                        <Menu.Dropdown>
                            <Menu.Label>
                                {props.displayName} {props.dataType ? `[${getAttributeName(props.dataType)}]` : ""}
                            </Menu.Label>

                            <Menu.Divider />

                            <Menu.Item leftSection={ <IconEdit size={ 14 } /> } onClick={ () => {
                                close();
                                nameModalControl.open();
                            } }
                            >
                                속성명 수정
                            </Menu.Item>


                            {
                                props.dataType == "CURRENCY"
                                    ? <>
                                        <Menu.Item
                                            leftSection={ <IconCurrencyDollar size={ 14 } /> }
                                            onClick={ () => {
                                                close();
                                                currencyModalControl.open();
                                            } }
                                        >
                                            통화 변경
                                        </Menu.Item>

                                    </>
                                    : null
                            }

                            {
                                props.dataType == "SELECT" || props.dataType == "MULTISELECT"
                                    ? <Menu.Item leftSection={ <IconChecks size={ 14 } /> } onClick={ () => {
                                        close();
                                        optionModalControl.open();
                                    } }
                                    >
                                        옵션 수정
                                    </Menu.Item>
                                    : null
                            }

                            <Menu.Divider />

                            <Menu.Item color="red" leftSection={ <IconTrash size={ 14 } /> }
                                onClick={ () => {
                                    close();
                                    deleteModalControl.open();
                                } }
                            >
                                속성 삭제
                            </Menu.Item>

                        </Menu.Dropdown>
                    </Menu>
                    : null
            }
        </Flex>

        {/* ATTRIBUTE NAME MODAL */}
        <Modal title="속성명 수정" centered opened={ nameModal } onClose={ closeName }>
            <TextInput value={ currentName } placeholder="변경할 속성명을 입력해 주세요."
                onChange={ (e) => setCurrentName(e.target.value) }
            />
            <Flex mt="xs" justify="flex-end">
                <Button variant="outline" color="red" mr="xs" onClick={ closeName }>취소</Button>

                <Button onClick={ changeName }
                    disabled={ !((currentName.length >= 4) && !hasSpace(currentName)) }
                >
                    변경
                </Button>
            </Flex>
        </Modal>

        {/* CURRENCY MODAL */}
        <Modal
            title="통화 변경" centered
            opened={ currencyModal }
            onClose={ closeCurrency }
        >
            <Select data={ currencyData } placeholder="통화를 선택해 주세요." searchable
                value={ selectedCurrency }
                onChange={ (e) => { setSelectedCurrency(e as CurrencyCode); } }
            />
            <Flex mt="xs" justify="flex-end">
                <Button variant="outline" color="red" mr="xs" onClick={ closeCurrency }>취소</Button>
                <Button onClick={ changeCurrency }>변경</Button>
            </Flex>
        </Modal>

        {/* DELETE MODAL */}
        <Modal title="속성 삭제" centered opened={ deleteModal } onClose={ closeDelete }>
            <Text c="red.7">정말로 "{props.displayName}" 속성을 삭제하시겠습니까?</Text>
            <Text c="red.7">해당 속성의 모든 값들도 삭제됩니다.</Text>
            <Flex mt="xs" justify="flex-end">
                <Button variant="outline" color="gray" mr="xs" onClick={ closeDelete }>취소</Button>
                <Button onClick={ deleteAttribute } color="red">삭제</Button>
            </Flex>
        </Modal>

        {/* OPTION MODAL */}
        <Modal opened={ optionModal } onClose={ () => {
            setCurrentOptionName("");
            setRawSelectedOption("");
            closeOption();
        } } title="옵션 수정" centered
        >
            <Select
                label="옵션" placeholder="옵션을 선택해 주세요."
                data={ (sheet.attributes
                    .find((a) => a.id == props.attributeId) as SelectAttribute | MultiSelectAttribute)
                    ?.data?.options?.map((o) => ({
                        label: o.optionName, value: String(o.optionId)
                    })) }
                value={ rawSelectedOption } onChange={ (e, o) => {
                    setRawSelectedOption(o?.value ?? "");
                    setCurrentOptionName(o?.label ?? "");
                } }
            />
            {
                rawSelectedOption && rawSelectedOption != ""
                    ? <>
                        <TextInput mt="xs"
                            label="옵션명 수정"
                            placeholder="옵션명을 입력해 주세요."
                            value={ currentOptionName }
                            onChange={ (e) => setCurrentOptionName(e.target.value) }
                        />
                        <Flex mt="xs" justify="flex-end">
                            <Button variant="outline" color="gray" mr="xs"
                                onClick={ () => {
                                    closeOption();
                                    setCurrentOptionName("");
                                    setRawSelectedOption("");
                                } }
                            >
                                취소
                            </Button>
                            <Button color="red" mr="xs" onClick={ async () => {
                                const result = await deleteAttributeOption(
                                    sheet.sheetId, props.attributeId, Number(rawSelectedOption), user.token
                                );

                                if (result) {
                                    const newAttribute = sheet.attributes;
                                    const idx = newAttribute.findIndex((a) => a.id == props.attributeId);
                                    if (idx != -1) {
                                        const newOptions
                                            = (newAttribute[idx] as SelectAttribute | MultiSelectAttribute)
                                                ?.data?.options
                                                ?.filter((o) => o.optionId != Number(rawSelectedOption));
                                        newAttribute[idx].data = { options: newOptions };
                                        sheet.setAttributes(newAttribute);
                                    }
                                }
                                closeOption();
                            } }
                            >
                                옵션 삭제
                            </Button>
                            <Button onClick={ async () => {
                                const result = await editAttributeOptionName(
                                    sheet.sheetId,
                                    props.attributeId,
                                    Number(rawSelectedOption),
                                    currentOptionName,
                                    user.token
                                );

                                if (result) {
                                    const newAttribute = sheet.attributes;
                                    const idx = newAttribute.findIndex((a) => a.id == props.attributeId);
                                    if (idx != -1) {
                                        const newOptions
                                            = (newAttribute[idx] as SelectAttribute | MultiSelectAttribute)
                                                ?.data?.options;
                                        const optionIdx = newOptions
                                            ?.findIndex((o) => o.optionId == Number(rawSelectedOption));

                                        if (optionIdx && optionIdx != -1) {
                                            newOptions![optionIdx].optionName = currentOptionName;
                                            newAttribute[idx].data = { options: newOptions };
                                            sheet.setAttributes(newAttribute);
                                        }
                                    }
                                }

                                closeOption();
                            } }
                            >
                                이름 수정
                            </Button>
                        </Flex>
                    </>
                    : null
            }
        </Modal>
    </>;
}
