import { useSearchParams } from "react-router";

import Hero from "@/components/custom/Hero";
import MediaGrid from "@/components/custom/MediaGrid";
import { useSearchMedia } from "@/hooks/useSearchMedia";

export const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const { data } = useSearchMedia();

  const query = searchParams.get("query") || null;

  return (
    <>
      <Hero showSearchBar={true} />

      <main className="container mx-auto px-4">
        {query && <MediaGrid media={data} loading={false} title={query} />}
      </main>
    </>
  );
};
