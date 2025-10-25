import { useSearchParams } from "react-router";

import Hero from "@/components/custom/Hero";
import MediaGrid from "@/components/custom/MediaGrid";
import { useSearchMedia } from "@/hooks/useSearchMedia";
import { CustomPagination } from "@/components/custom/CustomPagination";

export const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const { data } = useSearchMedia();

  const query = searchParams.get("query") || null;
  if (!data) {
    return (
      <>
        <Hero showSearchBar={true} />

        <main className="container mx-auto px-4">
          <MediaGrid loading={true} />
        </main>
      </>
    );
  }
  const media = data!.data;

  return (
    <>
      <Hero showSearchBar={true} />

      <main className="container mx-auto px-4">
        {query && data && (
          <>
            <MediaGrid media={media} loading={false} title={query} />
            <CustomPagination totalPages={data!.pagination.last_visible_page} />
          </>
        )}
      </main>
    </>
  );
};
