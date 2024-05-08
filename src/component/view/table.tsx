"use client";

import { useState } from "react";
import { useComputedColorScheme } from "@mantine/core";
import { AgGridReact } from "@ag-grid-community/react";
import { CellValueChangedEvent, ColDef, ModuleRegistry, SelectionChangedEvent } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import "@ag-grid-community/styles/ag-grid.css";
import "./grid-theme.css";
import TableFooter from "@/component/view/table-footer";


type TableProps<T extends Record<string, any>> = {
    attributes: ColDef[],
    data: T[]
};

interface IRow {
    make: string,
    model: string,
    price: number,
    electric: boolean
}

ModuleRegistry.registerModules([ ClientSideRowModelModule ]);

export default function Table<T extends Record<string, any>>({ attributes, data }: Readonly<TableProps<T>>) {
    const [ columnDefines, setColumnDefines ] = useState<ColDef[]>(attributes);
    const [ rowData, setRowData ] = useState<T[]>(data);
    const colorScheme = useComputedColorScheme();
    const [ selectedRows, setSelectedRows ] = useState<Array<any>>([]);

    const onSelectionChanged = (e: SelectionChangedEvent) => {
        setSelectedRows(e.api.getSelectedRows());
    };

    const onValueChanged = (e: CellValueChangedEvent) => {
        const columnId = e.column.getColId();
        const value = e.data[columnId];
        const dealId = e.data["id"];

        // TODO: Update value to API
    };

    return <>
        <div className={ colorScheme == "light" ? "ag-theme-light" : "ag-theme-dark" }
            style={ { width: "100%", height: "100%" } }
        >
            <div style={ { width: "100%", height: "93%" } }>
                <AgGridReact
                    columnDefs={ columnDefines }
                    rowData={ rowData }
                    rowSelection="multiple"
                    suppressRowClickSelection={ true }
                    reactiveCustomComponents={ true }
                    onSelectionChanged={ onSelectionChanged }
                    onCellValueChanged={ onValueChanged }
                />
            </div>
            <div style={ { width: "100%", height: "5%" } }>
                <TableFooter total={ rowData.length } selectedRows={ selectedRows.length } />
            </div>
        </div>
    </>;
}
