import { Box, Button, Group } from "@mantine/core";
import Logo from "@/component/logo";
import Link from "next/link";

export default function LandingHeader() {
    return (
        <Box px="xl" h="100%">
            <Group h="100%" justify="space-between">
                <Logo href="/" />
                <Group>
                    <Button component={ Link } href="/login" variant="default">로그인</Button>
                    <Button component={ Link } href="/signup">회원가입</Button>
                </Group>
            </Group>
        </Box>
    );
}
