import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";

interface UseSearchMediaProps {
  query?: string;
  page?: number;
  limit?: number;
  genres?: string;
  enabled?: boolean;
}

const STALE_TIME_5_MIN = 1000 * 60 * 5;

/**
 * Factory for search hooks that read query/page/limit/genres from URL search
 * params, with optional overrides via props.
 */
export const createSearchMediaHook =
  <TResponse>(
    searchAction: (options: {
      query?: string;
      genres?: string;
      page: number;
      limit: number;
    }) => Promise<TResponse>,
    queryKeyPrefix: string
  ) =>
  (props?: UseSearchMediaProps) => {
    const [searchParams] = useSearchParams();

    const query = props?.query !== undefined ? props.query : (searchParams.get("query") || undefined);
    const page = props?.page !== undefined ? props.page : (Number(searchParams.get("page")) || 1);
    const limit = props?.limit !== undefined ? props.limit : (Number(searchParams.get("limit")) || 25);
    const genres = props?.genres !== undefined ? props.genres : (searchParams.get("genres") || undefined);
    const enabled = props?.enabled !== undefined ? props.enabled : true;

    return useQuery({
      queryKey: [queryKeyPrefix, { query, page, limit, genres }],
      queryFn: () => searchAction({ query, page, limit, genres }),
      staleTime: STALE_TIME_5_MIN,
      enabled,
    });
  };
