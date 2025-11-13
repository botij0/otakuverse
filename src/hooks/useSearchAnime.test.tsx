import { MemoryRouter } from "react-router";
import { renderHook, waitFor } from "@testing-library/react";
import type { PropsWithChildren } from "react";
import { describe, expect, test, vi } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { useSearchAnime } from "@/hooks/useSearchAnime";
import { getSearchAnimeAction } from "@/actions/get-anime.actions";
import type { AnimeListResponse } from "@/interfaces/anime";

vi.mock("@/actions/get-anime.actions", () => ({
  getSearchAnimeAction: vi.fn(),
}));

const mockGetSearchAnimeAction = vi.mocked(getSearchAnimeAction);

const customProvider = (initialEntries: string[] = ["/"]) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return ({ children }: PropsWithChildren) => (
    <MemoryRouter initialEntries={initialEntries}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </MemoryRouter>
  );
};

describe("useSearchAnime", () => {
  test("should return the initial state (isLoading)", () => {
    const { result } = renderHook(() => useSearchAnime(), {
      wrapper: customProvider(),
    });

    expect(result.current.isLoading).toBe(true);
    expect(result.current.isError).toBe(false);
    expect(result.current.data).toBe(undefined);
    expect(result.current.data).toBeUndefined();
  });

  test("should return success state with data when API call succeeds", async () => {
    const mockSummaryData = {} as AnimeListResponse;

    mockGetSearchAnimeAction.mockResolvedValue(mockSummaryData);

    const { result } = renderHook(() => useSearchAnime(), {
      wrapper: customProvider(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.isError).toBe(false);
    expect(mockGetSearchAnimeAction).toHaveBeenCalled();
  });

  test("should return error state when API call fails", async () => {
    const mockError = new Error("Failed to fetch summary");
    mockGetSearchAnimeAction.mockRejectedValue(mockError);

    const { result } = renderHook(() => useSearchAnime(), {
      wrapper: customProvider(),
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error).toBeDefined();
    expect(result.current.isLoading).toBe(false);
    expect(mockGetSearchAnimeAction).toHaveBeenCalled();
    expect(result.current.error?.message).toBe("Failed to fetch summary");
  });
});
