"use client";

import { CustomCellRendererProps } from "@ag-grid-community/react";

interface CurrencyCellRendererProps extends CustomCellRendererProps {
    symbol: string
}

export function CurrencyCellRenderer(params: CurrencyCellRendererProps) {
    const { symbol, value } = params;

    if (!value) {
        return <></>;
    }

    return `${symbol} ${value}`;
}
