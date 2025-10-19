export interface TopAnimeResponse {
  pagination: Pagination;
  data: Anime[];
}

export interface Anime {
  mal_id: number;
  url: string;
  images: { [key: string]: Image };
  title: string;
  title_english: null | string;
  title_japanese: string;
  type: DatumType;
  source: string;
  episodes: number;
  status: Status;
  airing: boolean;
  aired: Aired;
  duration: string;
  score: number;
  scored_by: number;
  rank: number;
  popularity: number;
  members: number;
  favorites: number;
  synopsis: string;
  season: Season | null;
  year?: number | null;
  studios: Demographic[];
  genres: Demographic[];
  themes: Demographic[];
  demographics: Demographic[];
}

export interface Aired {
  from: string;
  to?: string | null;
  string: string;
}

export interface From {
  day: number | null;
  month: number | null;
  year: number | null;
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

type Season = "fall" | "spring" | "summer" | "winter";

type Status = "Finished Airing" | "Airing";

type DatumType = "Movie" | "OVA" | "TV Special" | "TV";

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
