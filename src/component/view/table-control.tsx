"use client";

import { Flex } from "@mantine/core";
import ControlDeal from "@/component/view/control/control-deal";
import ControlAttribute from "@/component/view/control/control-attribute";
import ControlFilter from "@/component/view/control/control-filter";
import ControlDelete from "@/component/view/control/control-delete";
import FilterDisplay from "@/component/view/control/filter/filter-display";

type TableControlProps = {};

export default function TableControl({}: Readonly<TableControlProps>) {

    return <Flex w="100%" h="100%" align="center">
        <Flex h="100%" w="38rem" align="center">
            <ControlDeal companies={ [ "회사1", "회사2", "회사3" ] } />
            <ControlAttribute />
            <ControlFilter />
        </Flex>
        <Flex h="100%" w="100%" align="center" justify="space-between">
            <FilterDisplay />
            <ControlDelete />
        </Flex>

    </Flex>;
}
