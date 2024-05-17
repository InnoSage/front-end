"use client";

import { Organization } from "@/function/api/organization";
import { Card, Center, Container, Grid, Text } from "@mantine/core";
import OrganizationCard from "@/component/organization/organization-card";
import NewOrganizationCard from "@/component/organization/new-organization-card";

type OrganizationClientPageProps = {
    organizations?: Organization[]
};

export default function OrganizationClientPage({ organizations }: Readonly<OrganizationClientPageProps>) {
    const gridSpan = { base: 12, sm: 6, md: 4, lg: 3 };
    return <Grid>
        {organizations?.map((o, i) =>
            <Grid.Col key={ i } span={ gridSpan }>
                <OrganizationCard organizationName={ o.organizationName } organizationId={ o.organizationId } />
            </Grid.Col>)}
        <Grid.Col span={ gridSpan }>
            <NewOrganizationCard />
        </Grid.Col>
    </Grid>;
}
