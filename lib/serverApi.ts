import { cookies } from "next/headers";

import { serverApi } from "./api";
import { Note, NewNote } from "../types/note";
import { User } from "../types/user";

interface NotesHttpResponse {
  notes: Note[];
  totalPages: number;
}

// Notes

export const getServerNotes = async (
  query: string,
  page: number,
  tag?: string
): Promise<NotesHttpResponse> => {
  const PARAMS = new URLSearchParams({
    ...(query !== "" ? { search: query } : {}),
    ...(tag !== undefined ? { tag } : {}),
    page: page.toString(),
  });
  const cookieStore = await cookies();

  const response = await serverApi.get("/notes", {
    params: PARAMS,
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return response.data;
};

// POST FETCH

export const createServerNote = async (newNote: NewNote): Promise<Note> => {
  const cookieStore = await cookies();
  const response = await serverApi.post("/notes", newNote, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return response.data;
};

// FETCH NOTE BY ID

export const fetchServerNoteById = async (id: string) => {
  const cookieStore = await cookies();
  const response = await serverApi.get(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return response.data;
};

// EDIT PROFILE

export const editProfile = async (data: User) => {
  const res = await serverApi.patch("/users/me", data);
  return res.data;
};
