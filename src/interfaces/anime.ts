import type { TopMediaResponse, Media, Demographic } from "./media";

export interface AnimeListResponse extends TopMediaResponse {
  data: Anime[];
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
}

export interface Aired {
  from: string;
  to?: string | null;
  string: string;
}

type Season = "fall" | "spring" | "summer" | "winter";
