import { useSearchParams } from "react-router";

import Hero from "@/components/custom/Hero";
import MediaGrid from "@/components/custom/MediaGrid";
import { useSearchAnime } from "@/hooks/useSearchAnime";
import { useSearchManga } from "@/hooks/useSearchManga";

export const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const {
    data: animeData,
    isLoading: isLoadingAnime,
    error: errorAnime,
  } = useSearchAnime();
  const {
    data: mangaData,
    isLoading: isLoadingManga,
    error: errorManga,
  } = useSearchManga();

  const query = searchParams.get("query") || null;

  const animesList = animeData && !errorAnime ? animeData.data : [];
  const mangaList = mangaData && !errorManga ? mangaData.data : [];

  return (
    <>
      <Hero showSearchBar={true} />

      <main className="container mx-auto px-4">
        {query && (
          <>
            <MediaGrid
              media={animesList}
              loading={isLoadingAnime}
              title={`Anime ('${query}')`}
            />
          </>
        )}

        {query && (
          <>
            <MediaGrid
              media={mangaList}
              loading={isLoadingManga}
              title={`Manga ('${query}')`}
            />
          </>
        )}
      </main>
    </>
  );
};
