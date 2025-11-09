import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";

import Hero from "@/components/custom/Hero";
import MediaGrid from "@/components/custom/MediaGrid";
import mangaBanner from "@/assets/manga_banner.webp";
import { CustomPagination } from "@/components/custom/CustomPagination";
import { getMangaTopAction } from "@/actions/get-manga.actions";

export const MangaTopPage = () => {
  const [searchParams] = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;

  const {
    data: mangaData,
    isLoading: isLoading,
    error: error,
  } = useQuery({
    queryKey: ["mangaTop", { page }],
    queryFn: () =>
      getMangaTopAction({
        page,
      }),
    staleTime: 1000 * 60 * 5,
  });

  const mangaList = mangaData && !error ? mangaData.data : [];

  return (
    <>
      <Hero
        title="Top manga"
        description="Updated manga top from myanimelist"
        img={mangaBanner}
      />
      <main className="container mx-auto px-4">
        <MediaGrid media={mangaList} loading={isLoading} />
        {mangaData && (
          <CustomPagination totalPages={mangaData!.pagination.last_visible_page} />
        )}
      </main>
    </>
  );
};
