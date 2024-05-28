"use client";

import ApplicationNavbarViewListSection from "@/component/app-nav/view-list-section";
import ApplicationNavbarViewListItem from "@/component/app-nav/view-list-item";
import { useState } from "react";
import { List } from "@mantine/core";
import { useSheetListStore } from "@/store/sheet-list";
import { useDisclosure } from "@mantine/hooks";
import { useUserStore } from "@/store/user";
import addNewSheet from "@/component/app-nav/new-sheet.action";
import NewSheetModal from "@/component/new-sheet-modal";

export default function ApplicationNavbarViewList() {
    const userStore = useUserStore((s) => s);
    const sheetListStore = useSheetListStore((s) => s);
    const [ opened, { open, close } ] = useDisclosure(false);
    const [ sheetName, setSheetName ] = useState("");

    const onAddClick = async () => {
        const result = await addNewSheet(userStore.token, userStore.currentOrganizationId, sheetName);
        sheetListStore.setSheetList(result);
        close();
    };

    return <>
        <ApplicationNavbarViewListSection name="투자 내역" addTooltip="새로운 투자 내역 시트 생성" onAddClick={ open }>
            <List w="100%" px="sm" size="sm">
                {
                    sheetListStore.sheets.map((s) => ({
                        name: s.sheetName, href: `/app/view/deal/${s.sheetId}`
                    })).map((view, i) => <ApplicationNavbarViewListItem key={ i } { ...view } />)
                }
            </List>
        </ApplicationNavbarViewListSection>
        <NewSheetModal opened={ opened } close={ close } />
    </>;
}

