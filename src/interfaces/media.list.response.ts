export interface TopMediaResponse {
  pagination: Pagination;
  data: Media[];
}

export interface Media {
  mal_id: number;
  url: string;
  images: { [key: string]: Image };
  title: string;
  title_english: null | string;
  title_japanese: string;
  type: MediaType;
  status: Status;
  score: number;
  scored_by: number;
  rank: number;
  popularity: number;
  members: number;
  favorites: number;
  synopsis: string;
  genres: Demographic[];
  themes: Demographic[];
  demographics: Demographic[];
}

export interface Demographic {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}

export interface Image {
  image_url: string;
  small_image_url: string;
  large_image_url: string;
}

type Status = "Finished Airing" | "Airing" | "Finished" | "On Hiatus" | "Publishing";

export type MediaType =
  | "Movie"
  | "OVA"
  | "TV Special"
  | "TV"
  | "Light Novel"
  | "Manga"
  | "Manhwa"
  | "Novel"
  | "One-Shot"
  | "Manhua"
  | "Doujinshi";

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

export const emptyMediaResponse: TopMediaResponse = {
  data: [],
  pagination: {
    last_visible_page: 0,
    has_next_page: false,
    current_page: 1,
    items: {
      count: 0,
      total: 0,
      per_page: 0,
    },
  },
};
