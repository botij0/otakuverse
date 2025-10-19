import AnimeGrid from "@/components/custom/AnimeGrid";
import { CustomPagination } from "@/components/custom/CustomPagination";
import Hero from "@/components/custom/Hero";
import { topAnimeMock } from "@/mocks/top.anime.mock";

const animesPerPage = 15;
const totalPages = Math.ceil(topAnimeMock.data.length / animesPerPage);

export const HomePage = () => {
  return (
    <>
      <Hero onSearch={(query) => console.log("Searching for:", query)} />

      <main className="container mx-auto px-4">
        <AnimeGrid animes={topAnimeMock.data || []} loading={false} title={"Top Anime"} />

        <CustomPagination totalPages={totalPages} />
      </main>
    </>
  );
};
