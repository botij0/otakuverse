import { useSearchParams } from "react-router";

import Hero from "@/components/custom/Hero";
import MediaGrid from "@/components/custom/MediaGrid";
import { useSearchManga } from "@/hooks/useSearchManga";
import { CustomPagination } from "@/components/custom/CustomPagination";

export const SearchMangaPage = () => {
  const [searchParams] = useSearchParams();
  const { data: mangaData, isLoading, error } = useSearchManga();

  const query = searchParams.get("query") || null;
  if (isLoading) {
    return (
      <>
        <Hero showSearchBar={true} />

        <main className="container mx-auto px-4">
          <MediaGrid loading={true} />
        </main>
      </>
    );
  }

  const mangaList = mangaData && !error ? mangaData.data : [];

  return (
    <>
      <Hero showSearchBar={true} />

      <main className="container mx-auto px-4">
        {query && (
          <>
            <MediaGrid media={mangaList} loading={false} title={`Manga ('${query}')`} />
            <CustomPagination totalPages={mangaData!.pagination.last_visible_page} />
          </>
        )}
      </main>
    </>
  );
};
