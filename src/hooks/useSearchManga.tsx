import { createSearchMediaHook } from "@/hooks/createSearchMediaHook";
import { getSearchMangaAction } from "@/actions/get-manga.actions";

export const useSearchManga = createSearchMediaHook(getSearchMangaAction, "mangaSearch");
