"use client";

import { useMemo, useRef, useState } from "react";
import { useComputedColorScheme } from "@mantine/core";
import { AgGridReact } from "@ag-grid-community/react";
import { CellValueChangedEvent, ModuleRegistry, SelectionChangedEvent } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import "@ag-grid-community/styles/ag-grid.css";
import "./grid-theme.css";
import { useSheetStore } from "@/store/sheet";
import { sheetToTable } from "@/function/table/deal";
import { deleteValue, editValue, newValue } from "@/component/view/set-value.action";
import { useUserStore } from "@/store/user";
import CustomHeader from "@/component/view/table-header";

interface IRow {
    make: string,
    model: string,
    price: number,
    electric: boolean
}

ModuleRegistry.registerModules([ ClientSideRowModelModule ]);

export default function Table<T extends Record<string, any>>() {
    const sheet = useSheetStore((s) => s);
    const user = useUserStore((s) => s);
    const table = sheetToTable(sheet, sheet.sheetId);
    const tableRef = useRef<AgGridReact>(null);
    const colorScheme = useComputedColorScheme();
    const [ selectedRows, setSelectedRows ] = useState<Array<any>>([]);

    const onSelectionChanged = (e: SelectionChangedEvent) => {
        setSelectedRows(e.api.getSelectedRows().map((r) => r.id));
    };

    const onValueChanged = async (e: CellValueChangedEvent) => {
        const columnId = e.column.getColId();

        let value = e.data[columnId];
        const dealId = e.data["id"];

        const dealIdx = sheet.deals.findIndex((d) => d.id == Number(dealId));
        if (dealIdx == -1) return e.api.undoCellEditing();

        const attrIdx = sheet.deals[dealIdx].values.findIndex((v) => v.attributeId == Number(columnId));

        const type = sheet.attributes.find((a) => a.id == Number(columnId))?.dataType;
        if (!type) return e.api.undoCellEditing();

        if (type == "SELECT") value = [ value ];
        if (type == "DATE" && value) {

            // WHAT HAPPENED HERE... WHY AG GRID DATE EDITOR GIVE US YESTERDAY DATE...
            const d = new Date((new Date(value).valueOf()) + (1000 * 60 * 60 * 24));
            value = d.toISOString().split("T")[0];
        }
        const newDeal = sheet.deals;

        if (value == null || value == "" || value?.length == 0) {     // when delete value
            const result = await deleteValue(sheet.sheetId, dealId, Number(columnId), user.token);
            if (!result) return e.api.undoCellEditing();

            newDeal[dealIdx].values = newDeal[dealIdx].values.filter((v) => v.attributeId != Number(columnId));
        } else if (attrIdx == -1) {     // when new value
            const result = await newValue(sheet.sheetId, dealId, Number(columnId), value, user.token);
            if (!result) return e.api.undoCellEditing();


            if (type == "DATE") {
                newDeal[dealIdx].values.push({
                    attributeId: Number(columnId),
                    value: new Date(value)
                });
            } else {
                newDeal[dealIdx].values.push({
                    attributeId: Number(columnId),
                    value: value
                });
            }

            sheet.setDeals(newDeal);
        } else {    // when change value
            const result = await editValue(sheet.sheetId, dealId, Number(columnId), value, user.token);
            if (!result) return e.api.undoCellEditing();

            if (type == "DATE") {
                newDeal[dealIdx].values[attrIdx].value = new Date(value);
            } else {
                newDeal[dealIdx].values[attrIdx].value = value;
            }

            sheet.setDeals(newDeal);
        }
    };

    const components = useMemo<{
        [p: string]: any
    }>(() => {
        return {
            agColumnHeader: CustomHeader
        };
    }, []);

    return <>
        <div className={ colorScheme == "light" ? "ag-theme-light" : "ag-theme-dark" }
            style={ { width: "100%", height: "100%" } }
        >
            <div style={ { width: "100%", height: "100%" } }>
                <AgGridReact
                    ref={ tableRef }
                    columnDefs={ table.attributes }
                    rowData={ table.data }
                    rowSelection="multiple"
                    maintainColumnOrder={ true }
                    suppressRowClickSelection={ true }
                    reactiveCustomComponents={ true }
                    undoRedoCellEditing={ true }
                    undoRedoCellEditingLimit={ 5 }
                    components={ components }
                    onSelectionChanged={ onSelectionChanged }
                    onCellValueChanged={ onValueChanged }
                    onSortChanged={ (e) => e.api.refreshCells() }
                />
            </div>
        </div>
    </>;
}
