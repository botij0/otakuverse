import { useSearchParams } from "react-router";

import Hero from "@/components/custom/Hero";
import MediaGrid from "@/components/custom/MediaGrid";
import { useSearchAnime } from "@/hooks/useSearchAnime";
// import { CustomPagination } from "@/components/custom/CustomPagination";
import { useSearchManga } from "@/hooks/useSearchManga";

export const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const { data: animeData, isLoading: isLoadingAnime } = useSearchAnime();
  const { data: mangaData, isLoading: isLoadingManga } = useSearchManga();

  const query = searchParams.get("query") || null;
  if (isLoadingAnime || isLoadingManga) {
    return (
      <>
        <Hero showSearchBar={true} />

        <main className="container mx-auto px-4">
          <MediaGrid loading={true} />
        </main>
      </>
    );
  }
  const animesList = animeData!.data;
  const mangaList = mangaData!.data;

  //TODO: Create two new pages one for manga search and another to anime search, each with pagiation.

  return (
    <>
      <Hero showSearchBar={true} />

      <main className="container mx-auto px-4">
        {query && animeData && (
          <>
            <MediaGrid media={animesList} loading={false} title={`Anime ('${query}')`} />
            {/* <CustomPagination totalPages={animeData!.pagination.last_visible_page} /> */}
          </>
        )}

        {query && mangaData && (
          <>
            <MediaGrid media={mangaList} loading={false} title={`Manga ('${query}')`} />
            {/* <CustomPagination totalPages={mangaData!.pagination.last_visible_page} /> */}
          </>
        )}
      </main>
    </>
  );
};
