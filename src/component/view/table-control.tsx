"use client";

import { Button, Flex, Menu } from "@mantine/core";
import { IconFilter } from "@tabler/icons-react";
import ControlDeal from "@/component/view/control/control-deal";
import ControlAttribute from "@/component/view/control/control-attribute";
import ControlFilter from "@/component/view/control/control-filter";

type TableControlProps = {};

export default function TableControl({}: Readonly<TableControlProps>) {

    return <Flex w="100%" h="100%" align="center">
        <ControlDeal companies={ [ "회사1", "회사2", "회사3" ] } />
        <ControlAttribute />
        <ControlFilter attributes={ [ { name: "a1", id: 1, type: "TEXT" },
            { name: "a2", id: 2, type: "NUMBER" },
            { name: "a3", id: 3, type: "CURRENCY" },
            { name: "a4", id: 4, type: "DATE" },
            { name: "a5", id: 5, type: "SELECT" },
            { name: "a6", id: 6, type: "MULTISELECT" },
            { name: "a7", id: 7, type: "CHECKBOX" } ] }
        />
        <Flex flex={ 1 } />
    </Flex>;
}
