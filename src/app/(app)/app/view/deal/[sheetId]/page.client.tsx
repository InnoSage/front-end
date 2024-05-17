"use client";

import { Container } from "@mantine/core";
import ViewHeader from "@/component/view/header";
import TableControl from "@/component/view/table-control";
import Table from "@/component/view/table";
import SheetAiButton from "@/component/view/ai-button";
import type { Sheet } from "@/function/table/type";
import { sheetToTable } from "@/function/table/deal";

export type SheetIdClientPageProps = {
    sheetId: number,
    sheet: Sheet
};

export default function SheetIdClientPage({ sheetId, sheet }: Readonly<SheetIdClientPageProps>) {
    const table = sheetToTable(sheet);
    return <>
        <Container h="5vh" my="xs" fluid>
            <ViewHeader id={ sheetId } name={ sheet.sheetName } />
        </Container>

        <Container h="5vh" mb="xs" fluid>
            <TableControl />
        </Container>

        <div style={ { height: "88vh", width: "100%" } }>
            <Table
                attributes={ table.attributes }
                data={ table.data }
            />
        </div>

        <SheetAiButton />
    </>;
}
