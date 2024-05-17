import { getCurrentOrgId, getCurrentOrgName, getUsername } from "@/function/token/get";
import { redirect } from "next/navigation";
import { Button, Container, Grid, Group, Space, Text, Title } from "@mantine/core";
import { IconUsers } from "@tabler/icons-react";
import DashboardSheetList from "@/component/dashboard-sheets";
import Link from "next/link";

export default async function ApplicationMainPage() {
    const currentOrganizationId = Number(getCurrentOrgId());
    const username = getUsername();
    const orgName = getCurrentOrgName();

    if (currentOrganizationId == -1) {
        redirect("/app/organization");
    }

    return <>
        <Container fluid mt="md">
            <Title order={ 1 }>'{username}'님 BRAND_NAME에 오신것을 환영합니다!</Title>

            <Space h="xl" />

            <Text size="xl" fw={ 700 } my="xs">현재 '{orgName}' 조직으로 로그인 중입니다.</Text>
            <Button
                leftSection={ <IconUsers size={ 16 } /> }
                size="lg" variant="outline" my="xs"
                component={ Link } href="/app/organization"
            >
                조직 선택 / 관리로 가기
            </Button>

            <Space h="xl" />

            <Text size="xl" fw={ 700 } my="xs">조직 '{orgName}'의 투자 내역 시트 목록</Text>
            <Grid w="100%">
                <DashboardSheetList />
            </Grid>

        </Container>
    </>;
}
