"use client";

import ApplicationNavbarViewListSection from "@/component/app-nav/view-list-section";
import ApplicationNavbarViewListItem from "@/component/app-nav/view-list-item";
import { MouseEventHandler } from "react";
import { List } from "@mantine/core";


type ApplicationNavbarViewListProps = {};

const companyViewList = [
    { name: "전체 회사 목록", href: "/app/view/company/1" },
    { name: "IT 회사", href: "/app/view/company/2" },
    { name: "전체 회사 목록만 남길수도 있음", href: "/app/view/company/3" }
];

const dealViewList = [
    { name: "전체 투자 목록", href: "/app/view/deal/1" },
    { name: "투자액", href: "/app/view/deal/2" },
    { name: "투자 단계", href: "/app/view/deal/3" },
    { name: "IT 업계 투자", href: "/app/view/deal/4" },
    { name: "긴 이름은 아래처럼 됩니다", href: "/app/view/deal/1" },
    { name: "가나다라마바사아자차카타파하가나다라마바사", href: "/app/view/deal/2" },
    { name: "asdfasdfasdfsadfasdfasdfasdfasdfsadfasdfasdfasdf", href: "/app/view/deal/3" },
    { name: "IT 업계 투자", href: "/app/view/deal/4" },
    { name: "전체 투자 목록", href: "/app/view/deal/1" },
    { name: "투자액", href: "/app/view/deal/2" },
    { name: "투자 단계", href: "/app/view/deal/3" },
    { name: "IT 업계 투자", href: "/app/view/deal/4" },
    { name: "전체 투자 목록", href: "/app/view/deal/1" },
    { name: "투자액", href: "/app/view/deal/2" },
    { name: "투자 단계", href: "/app/view/deal/3" },
    { name: "IT 업계 투자", href: "/app/view/deal/4" },
    { name: "전체 투자 목록", href: "/app/view/deal/1" },
    { name: "투자액", href: "/app/view/deal/2" },
    { name: "투자 단계", href: "/app/view/deal/3" },
    { name: "IT 업계 투자", href: "/app/view/deal/4" }
];

export default function ApplicationNavbarViewList(
    {}: Readonly<ApplicationNavbarViewListProps>
) {
    const onAddCompanyClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    };

    const onAddDealClick: MouseEventHandler<HTMLButtonElement> = (e) => {

    };

    return <>
        <ApplicationNavbarViewListSection name="회사/조직" addTooltip="새로운 회사/조직 시트 생성" onAddClick={ onAddCompanyClick }>
            <List px="sm" size="sm">
                {companyViewList.map((view, i) => <ApplicationNavbarViewListItem key={ i } { ...view } />)}
            </List>
        </ApplicationNavbarViewListSection>
        <ApplicationNavbarViewListSection name="투자 내역" addTooltip="새로운 투자 내역 시트 생성" onAddClick={ onAddDealClick }>
            <List w="100%" px="sm" size="sm">
                {dealViewList.map((view, i) => <ApplicationNavbarViewListItem key={ i } { ...view } />)}
            </List>
        </ApplicationNavbarViewListSection>
    </>;
}

