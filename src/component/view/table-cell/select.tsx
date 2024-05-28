"use client";

import { useEffect, useRef, useState } from "react";
import { type CustomCellEditorProps, type CustomCellRendererProps } from "@ag-grid-community/react";
import { Combobox, Divider, InputBase, useCombobox } from "@mantine/core";
import { DotColoredBadge } from "@/component/badge";
import { IconCheck } from "@tabler/icons-react";
import { useSheetStore } from "@/store/sheet";
import { useUserStore } from "@/store/user";
import newOption from "@/component/view/table-cell/new-options.action";
import { SelectAttribute } from "@/function/table/type";

export interface SelectCellEditorProps extends CustomCellEditorProps {
    attributeId: number,
    options: {
        optionId: number,
        optionName: string
    }[]
}

export function SelectCellEditor(
    { options, attributeId, value, stopEditing, onValueChange, column }: SelectCellEditorProps
) {
    const sheet = useSheetStore((s) => s);
    const user = useUserStore((s) => s);
    const ref = useRef<HTMLInputElement>(null);
    const [ newOptionInput, setNewOptionInput ] = useState("");
    const combobox = useCombobox({ opened: true });
    const width = column.getActualWidth();

    const isListable = () => typeof (options) != "undefined" && options.length > 0;

    const onOptionSubmit = async (value: string) => {
        if (value != "new") {
            onValueChange(Number(value));
            stopEditing();
        } else {
            const id = await newOption(sheet.sheetId, attributeId, newOptionInput, user.token);
            if (id != -1) {
                const newAttributes = sheet.attributes;
                const attrIdx = newAttributes.findIndex((a) => a.id == attributeId);
                const { options } = (newAttributes[attrIdx] as SelectAttribute).data;
                options?.push({ optionId: id, optionName: newOptionInput });
                newAttributes[attrIdx].data = { options };
                sheet.setAttributes(newAttributes);
            }
        }
    };

    // when AG Grid custom table-cell editor is mounted, it doesn't focus editor component automatically
    // so, we need to focus it manually
    useEffect(() => {
        ref.current?.focus();
    }, []);

    return <Combobox store={ combobox } width={ `${width}px` } onOptionSubmit={ onOptionSubmit }>
        <Combobox.Target>
            <InputBase w={ `${width}px` }
                type="text"
                ref={ ref }
                onChange={ (e) => setNewOptionInput(e.target.value) }
            />
        </Combobox.Target>
        <Combobox.Dropdown>
            <Combobox.Options>
                {
                    isListable()    // render options only options are exist
                        ? options.map((o, i) =>
                            <Combobox.Option key={ i } value={ o.optionId.toString() }>
                                <DotColoredBadge value={ o.optionName } />
                                {
                                    o.optionId == value
                                        ? <IconCheck size={ 12 } style={ { marginLeft: "0.5rem", height: "100%" } } />
                                        : undefined
                                }
                            </Combobox.Option>)
                        : undefined
                }

                {/* Divider when there is options*/}
                {isListable() ? <Divider /> : undefined}

                {/* new option guide */}
                <Combobox.Option value="new" disabled={ newOptionInput.length == 0 }>
                    <DotColoredBadge value={ newOptionInput } /> 추가하기
                </Combobox.Option>
            </Combobox.Options>
        </Combobox.Dropdown>
    </Combobox>;
}

export interface SelectCellRendererProps extends CustomCellRendererProps {
    options: {
        optionId: number,
        optionName: string
    }[]
}

export function SelectCellRenderer({ options, value }: SelectCellRendererProps) {
    if (typeof (value) === "undefined") {
        return <></>;
    }

    const option = options.find((o) => o.optionId == Number(value));

    if (!option) {
        return <></>;
    }

    return <DotColoredBadge value={ option.optionName } />;
}
