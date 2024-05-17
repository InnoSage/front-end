import { Button, Input, Menu, Text } from "@mantine/core";
import { IconFilter } from "@tabler/icons-react";
import { AttributeType } from "@/function/table/type";
import { ChangeEvent, useState } from "react";
import { IconCaretRight } from "@tabler/icons-react";
import FilterItem from "@/component/view/control/filter-item";

type ControlFilterProps = {
    attributes: {
        id: number,
        name: string,
        type: AttributeType
    }[]
};

export default function ControlFilter({ attributes }: Readonly<ControlFilterProps>) {
    const [ filterSearch, setFilterSearch ] = useState("");
    const [ currentShownAttributes, setCurrentShownAttributes ] = useState(attributes);

    const onFilterSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;

        setCurrentShownAttributes(attributes.filter((a) => a.name.includes(value)));
        setFilterSearch(value);
    };

    return <Menu>
        <Menu.Target>
            <Button variant="filled" mr="xs" leftSection={ <IconFilter size={ 14 } /> }>필터 추가</Button>
        </Menu.Target>
        <Menu.Dropdown>
            <Input
                variant="unstyled" px="xs" placeholder="필터 기준 검색"
                value={ filterSearch } onChange={ onFilterSearchChange }
            />

            <Menu.Divider />
            {
                currentShownAttributes.map((attribute, i) =>
                    <Menu.Item key={ i } rightSection={ <IconCaretRight size={ 14 } /> }>
                        <FilterItem id={ attribute.id } name={ attribute.name } type={ attribute.type } />
                    </Menu.Item>)
            }
        </Menu.Dropdown>
    </Menu>;
}
