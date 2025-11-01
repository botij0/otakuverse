import { jikanApi } from "@/api/jikanApi";
import type { MangaListResponse } from "@/interfaces/manga.list.response";

interface Options {
  page: number;
}

export const getMangaTopAction = async (options: Options): Promise<MangaListResponse> => {
  const { page } = options;

  const { data } = await jikanApi.get<MangaListResponse>("/top/manga", {
    params: {
      page: page,
    },
  });

  return data;
};
