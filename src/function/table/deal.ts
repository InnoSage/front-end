import type {
    AttributeType,
    Sheet,
    SheetAttribute,
    SheetCompany,
    SheetCurrencyAttribute,
    SheetDeal,
    SheetSelectAttribute
} from "@/function/table/type";
import { ColDef } from "@ag-grid-community/core";
import { MultiselectCellEditor, MultiselectCellRenderer } from "@/component/view/cell/multiselect";
import { CurrencyMap } from "@/function/currency";
import { CurrencyCellRenderer } from "@/component/view/cell/currency";
import { SelectCellEditor, SelectCellRenderer } from "@/component/view/cell/select";

export type DealAttribute = {
    attributeId: number,
    attributeName: string,
    dataType: AttributeType,
    options?: { optionId: number, value: string }[]
};

function toAttributes(attributes: SheetAttribute[]) {
    const cols: ColDef[] = [
        {
            colId: "num",
            field: "num",
            headerName: "",
            checkboxSelection: true,
            maxWidth: 75, minWidth: 75,
            editable: false,
            headerCheckboxSelection: true,
            valueGetter: "node.rowIndex + 1"
        },
        {
            colId: "company",
            field: "company",
            headerName: "회사명"
        }
    ];

    for (const attr of attributes) {
        const col: ColDef = {
            colId: attr.attributeId.toString(),
            field: attr.attributeId.toString(),
            headerName: attr.attributeName,
            editable: true
        };

        const byType: Partial<Record<AttributeType, ()=> void>> = {
            TEXT: () => {
                col.cellDataType = "text";
            },
            NUMBER: () => {
                col.cellDataType = "number";
            },
            CURRENCY: () => {
                col.cellDataType = "number";
                const { currency } = (attr as SheetCurrencyAttribute);
                const { symbol } = CurrencyMap[currency];
                col.cellRendererParams = { symbol };
                col.cellRenderer = CurrencyCellRenderer;
            },
            SELECT: () => {
                const { options } = (attr as SheetSelectAttribute);
                col.cellEditor = SelectCellEditor;
                col.cellEditorParams = { options };
                col.cellEditorPopup = true;
                col.cellRenderer = SelectCellRenderer;
                col.cellRendererParams = { options };
            },
            MULTISELECT: () => {
                const { options } = (attr as SheetSelectAttribute);
                const values = options.map((o) => o.value);
                col.cellEditor = MultiselectCellEditor;
                col.cellEditorPopup = true;
                col.cellEditorParams = { values, options };
                col.cellRenderer = MultiselectCellRenderer;
                col.cellRendererParams = { options };
            },
            USER: () => {
                // TODO: Implement user custom editor and renderer
            },
            DATE: () => {
                col.cellDataType = "date";
                col.cellEditor = "agDateCellEditor";
            },
            CHECKBOX: () => {
                col.cellDataType = "boolean";
            }
        };

        if (attr.dataType in byType) {
            (byType[attr.dataType] as ()=> void)();
        }

        cols.push(col);
    }

    return cols;
}

function toData(attributes: SheetAttribute[], companies: SheetCompany[], data: SheetDeal[]) {
    const AttributeTypeMap: Record<number, AttributeType> = {};
    const AttributeOptionMap: Record<number, Record<number, string>> = {};
    attributes.map((attr) => {
        AttributeTypeMap[attr.attributeId] = attr.dataType;

        if (attr.dataType == "SELECT" || attr.dataType == "MULTISELECT") {
            AttributeOptionMap[attr.attributeId] = {};
            (attr as SheetSelectAttribute).options.map((o) => {
                AttributeOptionMap[attr.attributeId][o.optionId] = o.value;
            });
        }
    });

    const CompanyMap: Record<number, string> = {};
    companies.map((c) => CompanyMap[c.id] = c.name);

    return data.map((d, i) => {
        const value: Record<string, any> = {};
        d.values.map((v) => {
            if (AttributeTypeMap[v.attributeId] == "DATE") {
                value[v.attributeId.toString()] = new Date(v.value * 1000);
            } else {
                value[v.attributeId.toString()] = v.value;
            }
        });

        value["company"] = CompanyMap[d.companyId];
        value["id"] = d.id;

        return value;
    });
}

export function sheetToTable(sheet: Sheet) {
    const attributes = toAttributes(sheet.attributes);
    const data = toData(sheet.attributes, sheet.companies, sheet.deals);

    return { attributes, data };
}
