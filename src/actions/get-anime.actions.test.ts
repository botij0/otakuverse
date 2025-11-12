import { describe, expect, test } from "vitest";

import { getAnimeDetailsAction, getSearchAnimeAction } from "./get-anime.actions";

describe("Get Anime Actions", () => {
  describe("Get Anime Details", () => {
    test("Should return empty data if id is not a number", async () => {
      const animeDetails = await getAnimeDetailsAction(+"aaaa");
      expect(animeDetails).toStrictEqual({});
    });
  });

  describe("Get Search Anime", () => {
    test("Should return empty data if not query and genres provided", async () => {
      const options = {
        page: 1,
        limit: 1,
      };
      const animeSearch = await getSearchAnimeAction(options);
      expect(animeSearch).toStrictEqual({});
    });
  });
});
