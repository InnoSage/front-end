"use server";

import { deleteNote as apiDeleteNote } from "@/function/api/note";

export default async function deleteNote(dealId: number, noteId: number, token: string) {
    const result = await apiDeleteNote(dealId, noteId, token);
    return result.success;
}
