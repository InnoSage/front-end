import { getOrganizations } from "@/function/api/organization";
import { getToken } from "@/function/token/get";
import { notFound } from "next/navigation";
import OrganizationClientPage from "@/app/(app)/app/organization/page.client";
import { Container } from "@mantine/core";

async function fetchOrganizations(token: string) {
    return getOrganizations(token);
}

export default async function OrganizationPage() {
    const token = getToken();

    if (!token || token == "") {
        notFound();
    }

    const organizationResult = await fetchOrganizations(token);
    if (!organizationResult.success) {
        notFound();
    }

    const organizations = organizationResult.value;

    return <>
        <Container fluid>
            <h1>조직 선택 및 관리</h1>
            <OrganizationClientPage organizations={ organizations } />
        </Container>
    </>;
}
