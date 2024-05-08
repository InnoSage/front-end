"use client";

import { useEffect, useRef, useState } from "react";
import { type CustomCellEditorProps, type CustomCellRendererProps } from "@ag-grid-community/react";
import { Combobox, Divider, InputBase, useCombobox } from "@mantine/core";
import { DotColoredBadge } from "@/component/badge";
import { IconCheck } from "@tabler/icons-react";

export interface SelectCellEditorProps extends CustomCellEditorProps {
    options: {
        optionId: number,
        value: string
    }[]
}

export function SelectCellEditor({ options, value, stopEditing, onValueChange, column }: SelectCellEditorProps) {
    const ref = useRef<HTMLInputElement>(null);
    const [ newOptionInput, setNewOptionInput ] = useState("");
    const combobox = useCombobox({ opened: true });
    const width = column.getActualWidth();

    const isListable = () => typeof (options) != "undefined" && options.length > 0;

    const onOptionSubmit = (value: string) => {
        if (value != "new") {
            onValueChange(Number(value));
        } else {
            // TODO: Create new option and submit to API
        }
        stopEditing();
    };

    // when AG Grid custom cell editor is mounted, it doesn't focus editor component automatically
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
                                <DotColoredBadge value={ o.value } />
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
        value: string
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

    return <DotColoredBadge value={ option.value } />;
}
