import { Anchor, Container, Text, Title } from "@mantine/core";
import Link from "next/link";
import SignUpForm from "@/component/signup/form";
import { SignupStoreProvider } from "@/store/signup";

export default function SignUpPage() {
    return <>
        <SignupStoreProvider>
            <Container size={ 420 } my={ 80 }>
                <Title ta="center">회원가입</Title>
                <Text c="dimmed" size="sm" ta="center" mt={ 5 }>
                    이미 계정이 있으신가요?&nbsp;
                    <Anchor size="sm" component={ Link } href="/login">
                        로그인
                    </Anchor>
                </Text>
                <SignUpForm />
            </Container>
        </SignupStoreProvider>
    </>;
}
