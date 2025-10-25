import Hero from "@/components/custom/Hero";
import MediaGrid from "@/components/custom/MediaGrid";
import { topAnimeMock } from "@/mocks/top.anime.mock";
import { topMangaMock } from "@/mocks/top.manga.mock";

const sortedAnimes = topAnimeMock.data.sort((a, b) => a.rank - b.rank);
const sortedMangas = topMangaMock.data.sort((a, b) => a.rank - b.rank);

export const HomePage = () => {
  return (
    <>
      <Hero />

      <main className="container mx-auto px-4">
        <MediaGrid
          media={sortedAnimes.slice(0, 10) || []}
          loading={false}
          title={"Top 10 Anime"}
        />

        <MediaGrid
          media={sortedMangas.slice(0, 10) || []}
          loading={false}
          title={"Top 10 Manga"}
        />
      </main>
    </>
  );
};
