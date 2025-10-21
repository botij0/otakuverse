// import { CustomPagination } from "@/components/custom/CustomPagination";
import Hero from "@/components/custom/Hero";
import MediaGrid from "@/components/custom/MediaGrid";
import { topAnimeMock } from "@/mocks/top.anime.mock";
import { useSearchParams } from "react-router";

const sortedAnimes = topAnimeMock.data.sort((a, b) => a.rank - b.rank).slice(0, 10);

export const SearchPage = () => {
  const [searchParams] = useSearchParams();

  const query = searchParams.get("query") || null;
  return (
    <>
      <Hero showSearchBar={true} />

      <main className="container mx-auto px-4">
        {query && <MediaGrid media={sortedAnimes || []} loading={false} title={query} />}
      </main>
    </>
  );
};
