import { Box, Divider, Flex, Group, ScrollArea } from "@mantine/core";

import Logo from "@/component/logo";
import UserButton from "@/component/app-nav/user-button";
import ApplicationNavbarViewList from "@/component/app-nav/view-list";

export default function ApplicationNavbar() {
    return (
        <Box h="100%" w="100%" p={ 0 } m={ 0 }>
            <Flex h="100%" w="100%" p={ 0 } m={ 0 } display="flex" direction="column">
                <Group px="xs" h="3rem">
                    <Logo href="/app" />
                </Group>

                <Divider />

                <ScrollArea flex="1" display="flex" py="xs" w="100%" scrollbars="y">
                    <ApplicationNavbarViewList />
                </ScrollArea>


                <Divider />

                <Group py="0" my="0" h="3rem">
                    <UserButton />
                </Group>
            </Flex>
        </Box>
    );
}

