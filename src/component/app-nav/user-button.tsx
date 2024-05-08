import { Group, rem, Text, UnstyledButton } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import classes from "./user-button.module.css";

type UserButtonProps = {
    username: string,
    organization: string
};

export default function UserButton({ username, organization }: Readonly<UserButtonProps>) {
    return <UnstyledButton className={ classes.user } w="100%">
        <Group w="100%" px="xs" justify="">
            <div style={ { flex: 1 } }>
                <Text size="sm">
                    {username}
                </Text>
                <Text c="dimmed" size="xs">
                    {organization}
                </Text>
            </div>

            <IconChevronRight style={ { width: rem(14), height: rem(14) } } stroke={ 1.5 } />
        </Group>
    </UnstyledButton>;
}
