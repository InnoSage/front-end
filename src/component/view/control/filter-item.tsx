import { AttributeType, getAttributeName } from "@/function/table/type";
import { Menu, Text } from "@mantine/core";
import { useState } from "react";
import index from "@/component/view/control/filter";

type FilterItemProps = {
    id: number,
    name: string,
    type: AttributeType
};

export default function FilterItem({ id, name, type }: Readonly<FilterItemProps>) {
    const [ opened, setOpened ] = useState(false);

    const typeName = getAttributeName(type);

    const filter = index[type];


    return <Menu trigger="hover" position="right-start" offset={ 45 }
        opened={ opened } onChange={ setOpened }
    >
        <Menu.Target>
            <Text>{name}</Text>
        </Menu.Target>
        <Menu.Dropdown>
            <Menu.Label>{name} [{typeName}]</Menu.Label>
            <Menu.Divider />
            <Menu.Item>
                {<filter />}
            </Menu.Item>
        </Menu.Dropdown>
    </Menu>;
}
