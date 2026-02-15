import { useSearchParams } from "react-router";

import Hero from "@/components/custom/Hero";
import MediaGrid from "@/components/custom/MediaGrid";
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

      <main className="container mx-auto px-4 min-h-[calc(100vh-600px)]">
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
            <h2 className="text-3xl font-bold mb-8 bg-linear-to-r from-primary to-accent bg-clip-text text-transparent font-title">
              Manga Search Page
            </h2>
            <p className="text-muted-foreground text-lg">
              Search for a manga by name!
            </p>
          </div>
        )}
      </main>
    </>
  );
};
