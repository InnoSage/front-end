"use client";

import { Button, Flex, Menu } from "@mantine/core";
import { IconFilter } from "@tabler/icons-react";
import ControlDeal from "@/component/view/control-deal";
import ControlAttribute from "@/component/view/control-attribute";

type TableControlProps = {};

export default function TableControl({}: Readonly<TableControlProps>) {

    return <Flex w="100%" h="100%" align="center">
        <ControlDeal companies={ [ "회사1", "회사2", "회사3" ] } />
        <ControlAttribute />

        <Menu>
            <Menu.Target>
                <Button variant="filled" mr="xs" leftSection={ <IconFilter size={ 14 } /> }>필터 추가</Button>
            </Menu.Target>
            <Menu.Dropdown>
                <Menu.Label>필터 추가</Menu.Label>
            </Menu.Dropdown>
        </Menu>

        <Flex flex={ 1 } />
    </Flex>;
}
