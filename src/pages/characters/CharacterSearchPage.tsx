import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";

import Hero from "@/components/custom/Hero";
import MediaGrid from "@/components/custom/MediaGrid";
import characterBanner from "@/assets/characters_banner.webp";
import { CustomPagination } from "@/components/custom/CustomPagination";
import { getSearchCharacterAction } from "@/actions/get-search-media.action";

export const CharacterSearchPage = () => {
  const [searchParams] = useSearchParams();

  const query = searchParams.get("query") || undefined;
  const page = Number(searchParams.get("page")) || 1;

  const { data, isLoading, error } = useQuery({
    queryKey: ["characterSearch", { query, page }],
    queryFn: () =>
      getSearchCharacterAction({
        query,
        page,
      }),
    staleTime: 1000 * 60 * 5,
  });

  const mangaList = data && !error ? data.data : [];

  return (
    <>
      <Hero showSearchBar={true} hideGenres={true} img={characterBanner} />

      <main className="container mx-auto px-4">
        {query && (
          <>
            <MediaGrid
              media={mangaList}
              loading={isLoading}
              title={"Character Search Results"}
            />
            {data && <CustomPagination totalPages={data!.pagination.last_visible_page} />}
          </>
        )}
      </main>
    </>
  );
};
