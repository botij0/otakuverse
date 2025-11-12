import { beforeEach, describe, expect, test } from "vitest";
import AxiosMockAdapter from "axios-mock-adapter";

import { jikanApi } from "@/api/jikan.api";
import {
  getMangaDetailsAction,
  getMangaRecommendationsAction,
  getMangaTopAction,
  getSearchMangaAction,
} from "./get-manga.actions";

describe("Get Manga Actions", () => {
  const jikanMock = new AxiosMockAdapter(jikanApi);

  beforeEach(() => {
    jikanMock.reset();
  });

  describe("Get Manga Details", () => {
    test("Should return empty data if id is not a number", async () => {
      const mangaDetails = await getMangaDetailsAction(+"aaaa");
      expect(mangaDetails).toStrictEqual({});
    });
  });

  describe("Get Search Manga", () => {
    test("Should return empty data if not query and genres provided", async () => {
      const options = {
        page: 1,
        limit: 1,
      };
      const mangaSearch = await getSearchMangaAction(options);
      expect(mangaSearch).toStrictEqual({});
    });

    test("should have been called with the correct params", async () => {
      jikanMock.onGet("/manga").reply(200, { data: [] });
      const options = {
        page: 1,
        limit: 1,
        genres: "romance,drama,action",
        query: "naruto",
      };
      await getSearchMangaAction(options);
      const params = jikanMock.history.get[0].params;
      expect(params).toStrictEqual({
        page: 1,
        limit: 1,
        order_by: "rank",
        genres: "22,8,1",
        q: "naruto",
      });
    });
  });

  describe("Get Manga Top", () => {
    test("should have been called with the correct params", async () => {
      jikanMock.onGet("/top/manga").reply(200, { data: [] });
      const options = {
        page: +"asdfasdf",
      };
      await getMangaTopAction(options);
      const params = jikanMock.history.get[0].params;
      expect(params).toStrictEqual({
        page: 1,
      });
    });
  });

  describe("Get Manga Recommendations", () => {
    test("should have been called with the correct params", async () => {
      jikanMock.onGet("/recommendations/manga").reply(200, { data: [] });
      const options = {
        page: +"asdfasdf",
      };
      await getMangaRecommendationsAction(options);
      const params = jikanMock.history.get[0].params;
      expect(params).toStrictEqual({
        page: 1,
      });
    });
  });
});
