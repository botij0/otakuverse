import { useSearchParams } from "react-router";

import Hero from "@/components/custom/Hero";
import MediaGrid from "@/components/custom/media/MediaGrid";
import mangaBanner from "@/assets/manga_banner.webp";
import { useSearchManga } from "@/hooks/useSearchManga";
import { CustomPagination } from "@/components/custom/CustomPagination";

export const SearchMangaPage = () => {
  const [searchParams] = useSearchParams();
  const { data: mangaData, isLoading, error } = useSearchManga();

  const query = searchParams.get("query") || null;
  const genres = searchParams.get("genres") || null;

  const mangaList = (mangaData && !error) ? mangaData.data : [];

  return (
    <>
      <Hero showSearchBar={true} img={mangaBanner} />

      <main className="mx-auto max-w-7xl px-4 min-h-[calc(100dvh-600px)]">
        {(query || genres) && (
          <>
            <MediaGrid
              media={mangaList}
              loading={isLoading}
              title={"Manga Search Results"}
            />
            {mangaData?.pagination && (
              <CustomPagination totalPages={mangaData!.pagination.last_visible_page} />
            )}
          </>
        )}
        {!query && (
          <div className="text-center py-20">
            <h2 className="text-3xl font-title tracking-tight mb-4 text-foreground">
              Manga Search
            </h2>
            <p className="text-muted-foreground text-lg">
              Search for a manga by name.
            </p>
          </div>
        )}
      </main>
    </>
  );
};
