import AnimeGrid from "@/components/custom/AnimeGrid";
import Hero from "@/components/custom/Hero";
import { topAnimeMock } from "@/mocks/top.anime.mock";

export const HomePage = () => {
  return (
    <>
      <Hero onSearch={(query) => console.log("Searching for:", query)} />

      <main className="container mx-auto px-4">
        <AnimeGrid animes={topAnimeMock.data || []} loading={false} title={"Top Anime"} />
      </main>
    </>
  );
};
