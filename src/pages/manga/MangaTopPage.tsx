import { getMangaTopAction } from "@/actions/get-manga-top.action";
import { CustomPagination } from "@/components/custom/CustomPagination";
import MediaGrid from "@/components/custom/MediaGrid";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";

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

  if (isLoading) {
    return (
      <>
        <main className="container mx-auto px-4">
          <MediaGrid loading={true} />
        </main>
      </>
    );
  }

  const animeList = mangaData && !error ? mangaData.data : [];

  return (
    <main className="container mx-auto px-4">
      <MediaGrid media={animeList} loading={isLoading} title={"Top Anime"} />
      <CustomPagination totalPages={mangaData!.pagination.last_visible_page} />
    </main>
  );
};
