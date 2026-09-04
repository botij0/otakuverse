import { createSearchMediaHook } from "@/hooks/createSearchMediaHook";
import { getSearchAnimeAction } from "@/actions/get-anime.actions";

export const useSearchAnime = createSearchMediaHook(getSearchAnimeAction, "animeSearch");
