import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";

import MediaGrid from "@/components/custom/MediaGrid";
import { CustomPagination } from "@/components/custom/CustomPagination";
import { getCharacterTopAction } from "@/actions/get-character-top.action";

export const CharacterTopPage = () => {
  const [searchParams] = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;

  const { data, isLoading, error } = useQuery({
    queryKey: ["characterTop", { page }],
    queryFn: () =>
      getCharacterTopAction({
        page,
      }),
    staleTime: 1000 * 60 * 5,
  });

  const characterList = data && !error ? data.data : [];

  return (
    <main className="container mx-auto px-4">
      <MediaGrid media={characterList} loading={isLoading} title={"Top Characters"} />
      {data && <CustomPagination totalPages={data.pagination.last_visible_page} />}
    </main>
  );
};
