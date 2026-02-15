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

  const animesList = (animeData && !errorAnime) ? animeData.data : null;
  const mangaList = (mangaData && !errorManga) ? mangaData.data : null;

  return (
    <>
      <Hero showSearchBar={true} />

      <main className="container mx-auto px-4">
        {query && (
          <>
            <MediaGrid
              media={animesList?.slice(0, 10)}
              loading={isLoadingAnime}
              title={`Anime ('${query}')`}
            />
          </>
        )}

        {query && (
          <>
            <MediaGrid
              media={mangaList?.slice(0, 10)}
              loading={isLoadingManga}
              title={`Manga ('${query}')`}
            />
          </>
        )}
      </main>
    </>
  );
};
