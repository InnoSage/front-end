import classes from "@/app/(landing)/landing.module.css";
import { Button, Container, Group, Image, Mark, Text, Title } from "@mantine/core";
import { IconArrowRight } from "@tabler/icons-react";
import image from "@/app/(landing)/landing.svg";
import LandingClientPage from "@/app/(landing)/page.client";
import Link from "next/link";

export default function LandingPage() {
    return <>
        <Container size="md">
            <div className={ classes.inner }>
                <div className={ classes.content }>
                    <Title className={ classes.title }>
                        InnoSheet
                    </Title>
                    <Title c="dimmed" order={ 3 }>[이노시트]</Title>
                    <Text c="dimmed" mt="md">
                        <Mark color="quota-green.5">AI 어시스턴트</Mark>와 함께하는
                        <Mark color="quota-green.5">동적 속성</Mark> 기반의 투자 내역 관리 플랫폼
                    </Text>
                    <LandingClientPage />
                    <Group mt={ 30 }>
                        <Button radius="xl" size="md" className={ classes.control }
                            rightSection={ <IconArrowRight size={ 18 } /> }
                            component={ Link } href="/signup"
                        >
                            시작하기
                        </Button>
                    </Group>
                </div>
                <Image src={ image.src } className={ classes.image } />
            </div>
        </Container>
    </>;
}
