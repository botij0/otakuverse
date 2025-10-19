export interface TopMangaResponse {
  pagination: Pagination;
  data: Manga[];
}

export interface Manga {
  mal_id: number;
  url: string;
  images: { [key: string]: Image };
  title: string;
  title_english: null | string;
  title_japanese: string;
  type: MangaType;
  chapters: number | null;
  volumes: number | null;
  status: Status;
  publishing: boolean;
  published: Published;
  score: number;
  scored: number;
  scored_by: number;
  rank: number;
  popularity: number;
  members: number;
  favorites: number;
  synopsis: string;
  authors: Author[];
  genres: Author[];
  themes: Author[];
  demographics: Author[];
}

export interface Author {
  mal_id: number;
  type: AuthorType;
  name: string;
  url: string;
}

type AuthorType = "manga" | "people";

export interface Image {
  image_url: string;
  small_image_url: string;
  large_image_url: string;
}

export interface Published {
  from: string;
  to: string | null;
  string: string;
}

export interface Prop {
  from: From;
  to: From;
}

export interface From {
  day: number | null;
  month: number | null;
  year: number | null;
}

type Status = "Finished" | "On Hiatus" | "Publishing";

type MangaType = "Light Novel" | "Manga" | "Manhwa" | "Novel";

export interface Pagination {
  last_visible_page: number;
  has_next_page: boolean;
  current_page: number;
  items: Items;
}

export interface Items {
  count: number;
  total: number;
  per_page: number;
}
