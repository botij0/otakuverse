import type { TopMediaResponse, Media } from "./media.list.response";

export interface TopMangaResponse extends TopMediaResponse {
  data: Manga[];
}

export interface Manga extends Media {
  chapters: number | null;
  volumes: number | null;
  publishing: boolean;
  published: Published;
  authors: Author[];
}

export interface Author {
  mal_id: number;
  type: AuthorType;
  name: string;
  url: string;
}

type AuthorType = "manga" | "people";

export interface Published {
  from: string;
  to: string | null;
  string: string;
}
