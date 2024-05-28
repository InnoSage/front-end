import { getApiUrl } from "@/config/api";
import axios, { AxiosError } from "axios";
import { ApiError, BaseApiResponse } from "@/function/api/base";

function noteUrl(dealId: number) {
    return getApiUrl() + `/deals/${dealId}/notes`;
}


export interface GetNotesData {
    noteId: number,
    title: string
}

export type GetNotesResponse = BaseApiResponse<GetNotesData[]>;

export async function getNotes(dealId: number, token: string) {
    try {
        const response = await axios.get(noteUrl(dealId), {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const res = response.data as GetNotesResponse;

        if (!res.isSuccess) {
            return { success: false, error: new ApiError(res) } as const;
        }

        return { success: true, value: res.data } as const;
    } catch (e) {
        return { success: false, error: e as AxiosError } as const;
    }
}

function getNoteUrl(dealId: number, noteId: number) {
    return getApiUrl() + `/deals/${dealId}/notes/${noteId}`;
}

export interface GetNoteData {
    noteTitle: string,
    noteBody: string
}

export type GetNoteResponse = BaseApiResponse<GetNoteData>;

export async function getNote(dealId: number, noteId: number, token: string) {
    try {
        const response = await axios.get(getNoteUrl(dealId, noteId), {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const res = response.data as GetNoteResponse;

        if (!res.isSuccess) {
            return { success: false, error: new ApiError(res) } as const;
        }

        return { success: true, value: res.data } as const;
    } catch (e) {
        return { success: false, error: e as AxiosError } as const;
    }
}

export async function newNote(dealId: number, title: string, body: string, token: string) {
    try {
        const response = await axios.post(noteUrl(dealId), {
            title, body
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const res = response.data as BaseApiResponse<{ noteId: number }>;

        if (!res.isSuccess) {
            return { success: false, error: new ApiError(res) } as const;
        }

        return { success: true, value: res.data } as const;
    } catch (e) {
        return { success: false, error: e as AxiosError } as const;
    }
}

export async function deleteNote(dealId: number, noteId: number, token: string) {
    try {
        const response = await axios.delete(getNoteUrl(dealId, noteId), {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const res = response.data as BaseApiResponse<unknown>;

        if (!res.isSuccess) {
            return { success: false, error: new ApiError(res) } as const;
        }

        return { success: true } as const;
    } catch (e) {
        return { success: false, error: e as AxiosError } as const;
    }
}
