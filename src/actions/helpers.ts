import { jikanApi } from "@/api/jikan.api";
import { getGenresIdsByGenresString } from "@/interfaces/genres";

/** Ensures a valid page number, defaulting to 1 on NaN. */
export const normalizePage = (page: number): number => (isNaN(page) ? 1 : page);

type ListResponse = { data: unknown };

/**
 * Factory for simple paginated list endpoints (top, seasonal, recommendations).
 * The returned action takes `{ page }`, normalizes it, and returns the response.
 */
export const createPaginatedAction =
  <TResponse extends ListResponse>(endpoint: string) =>
  async (options: { page: number }): Promise<TResponse> => {
    const { data } = await jikanApi.get<TResponse>(endpoint, {
      params: { page: normalizePage(options.page) },
    });
    return data;
  };

/**
 * Factory for media search endpoints (`/anime`, `/manga`) that accept query,
 * genres and pagination. Returns an empty object when neither query nor
 * genres are provided, matching the previous per-file behavior.
 */
export const createSearchMediaAction =
  <TResponse extends ListResponse>(endpoint: string) =>
  async (options: {
    query?: string;
    genres?: string;
    page: number;
    limit: number;
  }): Promise<TResponse> => {
    const { query, limit, genres } = options;
    let { page } = options;

    page = normalizePage(page);

    if (!query && !genres) return {} as TResponse;

    const genreIds = genres ? getGenresIdsByGenresString(genres) : null;

    const { data } = await jikanApi.get<TResponse>(endpoint, {
      params: {
        q: query,
        page,
        order_by: "rank",
        limit,
        genres: genreIds,
      },
    });

    return data;
  };

/** Simple paginated search for endpoints without genre support (characters). */
export const createSearchAction =
  <TResponse extends ListResponse>(endpoint: string) =>
  async (options: { query?: string; page: number }): Promise<TResponse> => {
    if (!options.query) return {} as TResponse;

    const { data } = await jikanApi.get<TResponse>(endpoint, {
      params: {
        q: options.query,
        page: normalizePage(options.page),
      },
    });

    return data;
  };
