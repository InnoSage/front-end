"use server";

import { getNote as apiGetNote } from "@/function/api/note";

export default async function getNote(dealId: number, noteId: number, token: string) {
    const res = await apiGetNote(dealId, noteId, token);
    if (!res.success) return;

    return res.value.noteBody;
}
