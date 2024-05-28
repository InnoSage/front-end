"use server";

import { newNote as apiNewNote } from "@/function/api/note";

export default async function newNote(dealId: number, title: string, body: string, token: string) {
    const res = await apiNewNote(dealId, title, body, token);

    if (res.success) {
        return res.value.noteId;
    }
    return -1;
}
