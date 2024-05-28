import { notFound } from "next/navigation";
import { getDeal } from "@/function/api/deal";
import { getToken } from "@/function/token/get";
import { Container, Divider } from "@mantine/core";
import NotePageHeader from "@/component/note/header";
import NotePageBody from "@/component/note/body";
import { getNotes } from "@/function/api/note";

async function fetchDeal(sheetId: number, dealId: number, token: string) {
    return getDeal(sheetId, dealId, token);
}

async function fetchNotes(dealId: number, token: string) {
    return getNotes(dealId, token);
}

type NotePageProps = {
    params: { dealId: number, sheetId: number }
};

export default async function NotePage({ params }: Readonly<NotePageProps>) {
    const dealId = Number(params.dealId);
    const sheetId = Number(params.sheetId);
    const token = getToken();

    if (isNaN(dealId) || isNaN(sheetId)) return notFound();

    const dealResult = await fetchDeal(sheetId, dealId, token);
    const notesResult = await fetchNotes(dealId, token);

    if (!dealResult.success) return notFound();
    if (!notesResult.success) return notFound();

    const deal = dealResult.value!;

    return <Container fluid mt="sm">
        <NotePageHeader sheetId={ sheetId } companyName={ deal.companyName } />
        <Divider my="sm" />
        <NotePageBody dealId={ dealId } notes={ notesResult.value } attributes={ deal.contents } />
    </Container>;
}
