import type {
    AttributeType,
    CurrencyAttribute,
    MultiSelectAttribute,
    SelectAttribute,
    SheetAttribute,
    SheetCompany,
    SheetDeal
} from "@/function/table/type";
import { ColDef } from "@ag-grid-community/core";
import { MultiselectCellEditor, MultiselectCellRenderer } from "@/component/view/table-cell/multiselect";
import { CurrencyMap } from "@/function/currency";
import { CurrencyCellRenderer } from "@/component/view/table-cell/currency";
import { SelectCellEditor, SelectCellRenderer } from "@/component/view/table-cell/select";
import { CompanyCellRenderer } from "@/component/view/table-cell/company";
import { px } from "@mantine/core";
import { SheetStore } from "@/store/sheet.store";

function toAttributes(attributes: SheetAttribute[], sheetId: number, companyLength: number) {
    const cols: ColDef[] = [
        {
            colId: "company",
            field: "company",
            headerName: "회사명",
            minWidth: Number(px(`${(companyLength / 2) + 8.5}rem`)),
            suppressMovable: true,
            cellRendererParams: { sheetId },
            cellRenderer: CompanyCellRenderer,
            headerComponentParams: {
                attributeId: -1
            }

            // TODO: ADD COMPANY CELL EDITOR
        }
    ];

    for (const attr of attributes) {
        const col: ColDef = {
            colId: attr.id.toString(),
            field: attr.id.toString(),
            headerName: attr.name,
            editable: true,
            headerComponentParams: {
                dataType: attr.dataType,
                attributeId: attr.id
            },
            minWidth: Number(px(`${(attr.name.length / 2) + 4.5}rem`))
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
                const currency = (attr as CurrencyAttribute)?.data?.currency;
                let symbol: string;
                if (!currency) {
                    symbol = "";
                } else {
                    symbol = CurrencyMap[currency].symbol;
                }
                col.cellRendererParams = { symbol };
                col.cellRenderer = CurrencyCellRenderer;
                col.headerComponentParams = {
                    ...col.headerComponentParams,
                    currency
                };
            },
            SELECT: () => {
                const { options } = (attr as SelectAttribute).data;
                col.cellEditor = SelectCellEditor;
                col.cellEditorParams = { options, attributeId: attr.id };
                col.cellEditorPopup = true;
                col.cellRenderer = SelectCellRenderer;
                col.cellRendererParams = { options };
            },
            MULTISELECT: () => {
                const { options } = (attr as MultiSelectAttribute).data;
                const values = options.map((o) => o.optionId);
                col.cellEditor = MultiselectCellEditor;
                col.cellEditorPopup = true;
                col.cellEditorParams = { values, options, attributeId: attr.id };
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
        AttributeTypeMap[attr.id] = attr.dataType;

        if (attr.dataType == "SELECT" || attr.dataType == "MULTISELECT") {
            AttributeOptionMap[attr.id] = {};
            (attr as (SelectAttribute | MultiSelectAttribute)).data.options.map((o) => {
                AttributeOptionMap[attr.id][o.optionId] = o.optionId.toString();
            });
        }
    });

    const CompanyMap: Record<number, string> = {};
    companies.map((c) => CompanyMap[c.id] = c.name);

    return data.map((d, i) => {
        const value: Record<string, any> = {};

        value["id"] = d.id;
        value["company"] = CompanyMap[d.companyId];

        d.values.map((v) => {
            if (AttributeTypeMap[v.attributeId] == "DATE") {
                value[v.attributeId.toString()] = new Date(v.value as string);
            } else {
                value[v.attributeId.toString()] = v.value;
            }
        });

        return value;
    });
}

export function sheetToTable(sheet: SheetStore, sheetId: number) {
    const companyLength = Math.max(...sheet.companies.map((c) => c.name.length));
    const attributes = toAttributes(sheet.attributes, sheetId, companyLength);
    const data = toData(sheet.attributes, sheet.companies, sheet.getFilteredDeals());

    return { attributes, data };
}
