"use client";

import { useEffect, useRef, useState } from "react";
import { type CustomCellEditorProps, type CustomCellRendererProps } from "@ag-grid-community/react";
import { Combobox, Divider, InputBase, useCombobox } from "@mantine/core";
import { DotColoredBadge } from "@/component/badge";
import { IconCheck } from "@tabler/icons-react";

export interface MultiselectCellEditorProps extends CustomCellEditorProps {
    options: { optionId: number, value: string }[]
}

export function MultiselectCellEditor(
    { options, value, stopEditing, column, onValueChange }: MultiselectCellEditorProps
) {
    const ref = useRef<HTMLInputElement>(null);
    const [ newOptionInput, setNewOptionInput ] = useState("");
    const [ selectedValues, setSelectedValues ] = useState<number[]>(value);
    const combobox = useCombobox({ opened: true });
    const width = column.getActualWidth();

    const isListable = () => typeof (options) != "undefined" && options.length > 0;

    const onOptionSubmit = (value: string) => {
        // when new option submitted
        if (value == "new") {
            // TODO: Create new option and submit to API

            return;
        }

        const nValue = Number(value);
        let newValues: number[];

        if (selectedValues.includes(nValue)) {
            // remove value if already exist value selected
            newValues = selectedValues.filter((v: number) => v != nValue);
        } else {
            // add value if not selected value selected
            newValues = selectedValues;
            newValues.push(nValue);
        }

        onValueChange(newValues);
        setSelectedValues(newValues);
    };

    // when AG Grid custom cell editor is mounted, it doesn't focus editor component automatically
    // so, we need to focus it manually
    useEffect(() => {
        ref.current?.focus();
    }, []);

    return <Combobox store={ combobox } width={ `${width}px` } onOptionSubmit={ onOptionSubmit }>
        <Combobox.Target>
            <InputBase
                w={ `${width}px` }
                type="text"
                ref={ ref }
                onChange={ (e) => setNewOptionInput(e.target.value) }
            />
        </Combobox.Target>
        <Combobox.Dropdown>
            <Combobox.Options>
                {
                    isListable()
                        ? options.map((o, i) =>
                            <Combobox.Option key={ i } value={ o.optionId.toString() } active={ true }>
                                <DotColoredBadge value={ o.value } />
                                {
                                    selectedValues.includes(o.optionId)
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

interface MultiselectCellRendererProps extends CustomCellRendererProps {
    options: { optionId: number, value: string }[]
}

export function MultiselectCellRenderer({ value, options }: MultiselectCellRendererProps) {
    return <>
        {
            value.map((v: number, i: number) =>
                <DotColoredBadge key={ i } value={ (options.find((o) => o.optionId == v)?.value) as string } />)
        }
    </>;
}
