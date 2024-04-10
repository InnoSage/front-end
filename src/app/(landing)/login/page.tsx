import { Anchor, Container, Text, Title } from "@mantine/core";
import Link from "next/link";
import LoginForm from "@/component/login/form";

export default function LoginPage() {
    return (
        <Container size={ 420 } my={ 80 }>
            <Title ta="center">로그인</Title>
            <Text c="dimmed" size="sm" ta="center" mt={ 5 }>
                아직 계정이 없으신가요?&nbsp;
                <Anchor size="sm" component={ Link } href="/signup">
                    회원가입
                </Anchor>
            </Text>
            <LoginForm />
        </Container>
    );
}
