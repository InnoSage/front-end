"use client";

import { ChangeEvent, FocusEvent, KeyboardEvent, useState } from "react";
import { useFocusWithin } from "@mantine/hooks";
import { Flex, Input } from "@mantine/core";
import { IconEdit } from "@tabler/icons-react";
import { useSheetStore } from "@/store/sheet";
import { useSheetListStore } from "@/store/sheet-list";
import setSheetName from "@/component/view/set-sheet-name.action";
import { useUserStore } from "@/store/user";

export default function ViewHeader() {
    const sheet = useSheetStore((s) => s);
    const user = useUserStore((s) => s);
    const sheetList = useSheetListStore((s) => s);
    const [ currentName, setName ] = useState(sheet.sheetName);
    const { ref, focused } = useFocusWithin();

    const onNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setName(value);
    };

    const onNameKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" || e.key === "Escape") {
            e.currentTarget.blur();
        }
    };

    const onNameBlur = async (e: FocusEvent<HTMLInputElement>) => {
        const success = await setSheetName(
            user.token, user.currentOrganizationId, sheet.sheetId, currentName
        );
        if (success) {
            sheet.setSheetName(currentName);
            sheetList.changeName(sheet.sheetId, currentName);
        }
    };

    return <Flex w="100%" h="100%" align="center">
        <Input ref={ ref } w="100%" variant={ focused ? "filled" : "unstyled" } leftSection={ <IconEdit size={ 16 } /> }
            placeholder={ currentName } value={ currentName }
            onChange={ onNameChange } onKeyDown={ onNameKeyDown } onBlur={ onNameBlur }
        />
    </Flex>;
}
