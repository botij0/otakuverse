import type { Images, Pagination } from "./media";

export interface RecomendationsResponse {
  pagination: Pagination;
  data: Recomendation[];
}

export interface Recomendation {
  mal_id: string;
  entry: RecomendationEntry[];
  content: string;
  date: Date;
  user: User;
}

export interface RecomendationEntry {
  mal_id: number;
  url: string;
  images: Images;
  title: string;
}

export interface User {
  url: string;
  username: string;
}
