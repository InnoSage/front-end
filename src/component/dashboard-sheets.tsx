"use client";

import { useSheetListStore } from "@/store/sheet-list";
import { Button, Grid, Text } from "@mantine/core";
import DashboardSheetListCard from "@/component/dashboard-sheets-card";
import NewSheetModal from "@/component/new-sheet-modal";
import { useDisclosure } from "@mantine/hooks";

export default function DashboardSheetList() {
    const sheetListStore = useSheetListStore((s) => s);
    const [ opened, { open, close } ] = useDisclosure(false);

    if (sheetListStore.sheets.length < 1) {
        return <>
            <Text size="md" mx="xs">시트가 없습니다.</Text>
            <Button size="xs" variant="outline" onClick={ open }>새 시트 만들기</Button>
            <NewSheetModal opened={ opened } close={ close } />
        </>;
    } else {
        return <>
            {
                sheetListStore.sheets.map((sheet, i) =>
                    <Grid.Col
                        key={ i } span={ { base: 12, sm: 6, md: 4, lg: 3 } }
                    >
                        <DashboardSheetListCard sheetName={ sheet.sheetName } sheetId={ sheet.sheetId } />
                    </Grid.Col>)
            }
        </>;
    }
}
