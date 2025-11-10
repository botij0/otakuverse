import { beforeEach, describe, expect, test } from "vitest";

import { getAnimeDetailsAction, getSearchAnimeAction } from "./get-anime.actions";
import { mockAnimeDetails } from "@/tests/mocks/anime.details.mock";
import { mockAnimeSearch } from "@/tests/mocks/anime.search.mock";

describe("Get Anime Actions", () => {
  beforeEach(async () => {
    // Wait for 1 second to avoid rate limit
    await new Promise((resolve) => setTimeout(resolve, 1000));
  });

  describe("Get Anime Details", () => {
    test("Should fetch anime data if id exists", async () => {
      const animeDetails = await getAnimeDetailsAction("1");
      expect(animeDetails).toStrictEqual(mockAnimeDetails);
    });

    test("Should return not found if id not exists", async () => {
      const animeDetails = await getAnimeDetailsAction("aaaa").catch((error) => {
        expect(error).toBeDefined();
        expect(error.message).toBe("Request failed with status code 404");
      });
      expect(animeDetails).toBeUndefined();
    });
  });

  describe("Get Search Anime", () => {
    test("Should fetch anime by query if anime name exists", async () => {
      const animeDetails = await getSearchAnimeAction({
        page: 1,
        limit: 1,
        query: "Cowboy Bebop",
      });
      expect(animeDetails).toStrictEqual(mockAnimeSearch);
    });

    test("Should return empty data if not query and genres provided", async () => {
      const options = {
        page: 1,
        limit: 1,
      };
      const animeDetails = await getSearchAnimeAction(options);
      expect(animeDetails).toStrictEqual({});
    });

    test("Should return empty data if anime name does not exist", async () => {
      const options = {
        page: 1,
        limit: 1,
        query: "asdfasdfasdf",
      };
      const animeDetails = await getSearchAnimeAction(options);
      expect(animeDetails).toStrictEqual({
        pagination: {
          last_visible_page: 1,
          has_next_page: false,
          current_page: 1,
          items: {
            count: 0,
            total: 0,
            per_page: 1,
          },
        },
        data: [],
      });
    });
  });
});
