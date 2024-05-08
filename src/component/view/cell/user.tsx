"use client";

import { CustomCellRendererProps } from "@ag-grid-community/react";
import { Badge } from "@mantine/core";

export function UserCellRenderer(params: CustomCellRendererProps) {
    const { value } = params;
    if (typeof (value) === "undefined") {
        return <></>;
    }

    return <Badge variant="outline" radius="sm">{value}</Badge>;
}
