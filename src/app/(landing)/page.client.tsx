"use client";

import { List, rem, ThemeIcon } from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";

export default function LandingClientPage() {
    return <List
        mt={ 30 }
        spacing="sm"
        size="sm"
        icon={
            <ThemeIcon size={ 20 } radius="xl">
                <IconCheck style={ { width: rem(12), height: rem(12) } } stroke={ 1.5 } />
            </ThemeIcon>
        }
    >
        <List.Item>
            <b>AI 어시스턴트</b> – AI 어시스턴트에게 데이터 분석을 맡겨보세요.
        </List.Item>
        <List.Item>
            <b>동적 속성 테이블</b> – 원하는대로 투지 내역의 속성을 추가하고 관리해보세요.
        </List.Item>
        <List.Item>
            <b>조직 기반 워크스페이스</b> – 조직에 사람을 추가하고,<br />조직 내부에서 시트를 공유해보세요.
        </List.Item>
    </List>;
}
