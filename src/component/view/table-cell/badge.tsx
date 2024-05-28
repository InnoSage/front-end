"use client";

import { CustomCellRendererProps } from "@ag-grid-community/react";
import { Badge } from "@mantine/core";
import { generateColor } from "@/function/random";

export function BadgeCellRenderer(params: CustomCellRendererProps) {
    const { value } = params;
    if (typeof (value) === "undefined") {
        return <></>;
    }

    const color = generateColor(value);

    return <Badge variant="dot" radius="sm" color={ color }>{value}</Badge>;
}
