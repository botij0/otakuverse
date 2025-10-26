import { jikanApi } from "@/api/jikanApi";
import type { Anime } from "@/interfaces/anime.list.response";

export const getAnimeDetailsAction = async (id: string): Promise<Anime> => {
  const { data } = await jikanApi.get<Anime>(`/anime/${id}`);
  return data;
};
