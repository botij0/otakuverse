import type { TopMediaResponse, Media, Demographic } from "./media";

export interface AnimeListResponse extends TopMediaResponse {
  data: Anime[];
}

export interface AnimeDetailsResponse {
  data: Anime;
}

export interface Anime extends Media {
  source: string;
  episodes: number;
  airing: boolean;
  aired: Aired;
  duration: string;
  season: Season | null;
  year?: number | null;
  studios: Demographic[];
  relations: Relation[];
  theme: Theme;
  streaming: Platform[];
}

export interface Aired {
  from: string;
  to?: string | null;
  string: string;
}

type Season = "fall" | "spring" | "summer" | "winter";

export interface Relation {
  relation: string;
  entry: RelationEntry[];
}

export interface RelationEntry {
  mal_id: number;
  type: string;
  name: string;
}

export interface Platform {
  name: string;
  url: string;
}

export interface Theme {
  openings: string[];
  endings: string[];
}
