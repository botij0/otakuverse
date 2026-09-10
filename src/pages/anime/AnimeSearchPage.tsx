import { useSearchParams } from "react-router";

import Hero from "@/components/custom/Hero";
import MediaGrid from "@/components/custom/media/MediaGrid";
import animeBanner from "@/assets/anime_banner.webp";
import { useSearchAnime } from "@/hooks/useSearchAnime";
import { CustomPagination } from "@/components/custom/CustomPagination";

export const SearchAnimePage = () => {
  const [searchParams] = useSearchParams();
  const { data: animeData, isLoading: isLoadingAnime, error } = useSearchAnime();

  const query = searchParams.get("query") || null;
  const genres = searchParams.get("genres") || null;

  const animesList = animeData && !error ? animeData.data : [];

  return (
    <>
      <Hero showSearchBar={true} img={animeBanner} />

      <main className="mx-auto max-w-7xl px-4 min-h-[calc(100dvh-600px)]">
        {(query || genres) && (
          <>
            <MediaGrid
              media={animesList}
              loading={isLoadingAnime}
              title={"Anime Search Results"}
            />
            {animeData?.pagination && (
              <CustomPagination totalPages={animeData!.pagination.last_visible_page} />
            )}
          </>
        )}
        {!query && (
          <div className="text-center py-20">
            <h2 className="text-3xl font-title tracking-tight mb-4 text-foreground">
              Anime Search
            </h2>
            <p className="text-muted-foreground text-lg">
              Search for an anime by name.
            </p>
          </div>
        )}
      </main>
    </>
  );
};
