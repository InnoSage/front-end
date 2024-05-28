"use client";

import { Container } from "@mantine/core";
import ViewHeader from "@/component/view/header";
import TableControl from "@/component/view/table-control";
import Table from "@/component/view/table";
import SheetAiButton from "@/component/view/ai-button";
import { sheetToTable } from "@/function/table/deal";
import { useSheetStore } from "@/store/sheet";


export default function SheetIdClientPage() {
    const sheet = useSheetStore((s) => s);
    const table = sheetToTable(sheet, sheet.sheetId);
    return <>
        <Container h="5vh" my="xs" fluid>
            <ViewHeader />
        </Container>

        <Container h="5vh" mb="xs" fluid>
            <TableControl />
        </Container>

        <div style={ { height: "86.5vh", width: "100%" } }>
            <Table />
        </div>

        <SheetAiButton />
    </>;
}
