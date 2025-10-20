import { useParams } from "react-router";

import MediaGrid from "@/components/custom/MediaGrid";
import { topAnimeMock } from "@/mocks/top.anime.mock";
import { topMangaMock } from "@/mocks/top.manga.mock";
import { CustomPagination } from "@/components/custom/CustomPagination";

const animesPerPage = 15;
const totalPages = Math.ceil(topAnimeMock.data.length / animesPerPage);

export const TypePage = () => {
  const { type } = useParams();

  const isAnime = type !== "manga";
  const title = isAnime ? "Top Anime" : "Top Manga";
  const media = isAnime
    ? topAnimeMock.data.sort((a, b) => a.rank - b.rank)
    : topMangaMock.data.sort((a, b) => a.rank - b.rank);

  return (
    <>
      <main className="container mx-auto px-4">
        <MediaGrid media={media || []} loading={false} title={title} />

        <CustomPagination totalPages={totalPages} />
      </main>
    </>
  );
};
