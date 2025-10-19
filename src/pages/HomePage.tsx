import AnimeGrid from "@/components/custom/AnimeGrid";
import { CustomPagination } from "@/components/custom/CustomPagination";
import Hero from "@/components/custom/Hero";
import { topAnimeMock } from "@/mocks/top.anime.mock";
import { topMangaMock } from "@/mocks/top.manga.mock";
import { useSearchParams } from "react-router";

const animesPerPage = 15;
const totalPages = Math.ceil(topAnimeMock.data.length / animesPerPage);

export const HomePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = searchParams.get("page") ?? "1";
  const category = searchParams.get("category") ?? "anime";
  const gender = searchParams.get("gender") ?? "";

  return (
    <>
      <Hero onSearch={(query) => console.log("Searching for:", query)} />

      <main className="container mx-auto px-4">
        <AnimeGrid
          animes={topAnimeMock.data || []}
          loading={false}
          title={"Top Anime"}
          mangas={topMangaMock.data}
        />

        <CustomPagination totalPages={totalPages} />
      </main>
    </>
  );
};
