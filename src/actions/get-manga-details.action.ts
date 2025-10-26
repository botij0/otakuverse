import { jikanApi } from "@/api/jikanApi";
import type { Manga } from "@/interfaces/manga.list.response";

export const getMangaDetailsAction = async (id: string): Promise<Manga> => {
  const { data } = await jikanApi.get(`/manga/${id}`);
  return data.data;
};
