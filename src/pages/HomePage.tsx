import MediaGrid from "@/components/custom/MediaGrid";
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
        <MediaGrid media={topMangaMock.data || []} loading={false} title={"Top Manga"} />

        <CustomPagination totalPages={totalPages} />
      </main>
    </>
  );
};
