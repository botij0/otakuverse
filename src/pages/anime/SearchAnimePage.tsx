import { useSearchParams } from "react-router";

import Hero from "@/components/custom/Hero";
import MediaGrid from "@/components/custom/MediaGrid";
import { useSearchAnime } from "@/hooks/useSearchAnime";
import { CustomPagination } from "@/components/custom/CustomPagination";

export const SearchAnimePage = () => {
  const [searchParams] = useSearchParams();
  const { data: animeData, isLoading: isLoadingAnime, error } = useSearchAnime();

  const query = searchParams.get("query") || null;
  if (isLoadingAnime) {
    return (
      <>
        <Hero showSearchBar={true} />

        <main className="container mx-auto px-4">
          <MediaGrid loading={true} />
        </main>
      </>
    );
  }

  const animesList = animeData && !error ? animeData.data : [];

  return (
    <>
      <Hero showSearchBar={true} />

      <main className="container mx-auto px-4">
        {query && animeData && (
          <>
            <MediaGrid media={animesList} loading={false} title={`Anime ('${query}')`} />
            <CustomPagination totalPages={animeData!.pagination.last_visible_page} />
          </>
        )}
      </main>
    </>
  );
};
