"use client";

import { useSheetStore } from "@/store/sheet";
import { Badge, Flex, ScrollArea } from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import deleteFilter from "@/component/view/control/filter/filter-delete.action";
import { useUserStore } from "@/store/user";

export default function FilterDisplay() {
    const sheet = useSheetStore((s) => s);
    const user = useUserStore((s) => s);
    return <Flex h="100%" align="center">
        <ScrollArea>
            {
                sheet.filters?.map((filter, i) => {
                    const attribute = sheet.attributes.find((attr) => attr.id === filter.targetAttributeId);
                    const str = `${attribute?.name} ${filter.filterType} ${filter.keyword}`;
                    return <Badge
                        key={ i } size="lg" radius="xs" mx="0.1rem" variant="outline" rightSection={ <IconX size={ 14 } /> }
                        onClick={ async () => {
                            const result = await deleteFilter(sheet.sheetId, filter.id, user.token);

                            if (result) {
                                sheet.removeFilter(filter.id);
                            }
                        } }
                    >
                        {str}
                    </Badge>;
                })
            }
        </ScrollArea>
    </Flex>;

}
