import { MemoryRouter } from "react-router";
import { renderHook, waitFor } from "@testing-library/react";
import type { PropsWithChildren } from "react";
import { describe, expect, test, vi } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { useSearchManga } from "./useSearchManga";
import { getSearchMangaAction } from "@/actions/get-manga.actions";
import type { MangaListResponse } from "@/interfaces/manga";

vi.mock("@/actions/get-manga.actions", () => ({
  getSearchMangaAction: vi.fn(),
}));

const mockGetSearchMangaAction = vi.mocked(getSearchMangaAction);

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

describe("useSearchManga", () => {
  test("should return the initial state (isLoading)", () => {
    const { result } = renderHook(() => useSearchManga(), {
      wrapper: customProvider(),
    });

    expect(result.current.isLoading).toBe(true);
    expect(result.current.isError).toBe(false);
    expect(result.current.data).toBe(undefined);
    expect(result.current.data).toBeUndefined();
  });

  test("should return success state with data when API call succeeds", async () => {
    const mockMangaData = {} as MangaListResponse;

    mockGetSearchMangaAction.mockResolvedValue(mockMangaData);

    const { result } = renderHook(() => useSearchManga(), {
      wrapper: customProvider(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.isError).toBe(false);
    expect(mockGetSearchMangaAction).toHaveBeenCalled();
  });

  test("should return error state when API call fails", async () => {
    const mockError = new Error("Failed to fetch summary");
    mockGetSearchMangaAction.mockRejectedValue(mockError);

    const { result } = renderHook(() => useSearchManga(), {
      wrapper: customProvider(),
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error).toBeDefined();
    expect(result.current.isLoading).toBe(false);
    expect(mockGetSearchMangaAction).toHaveBeenCalled();
    expect(result.current.error?.message).toBe("Failed to fetch summary");
  });
});
