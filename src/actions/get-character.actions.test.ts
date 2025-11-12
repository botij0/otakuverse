import { beforeEach, describe, expect, test } from "vitest";
import AxiosMockAdapter from "axios-mock-adapter";

import { jikanApi } from "@/api/jikan.api";
import {
  getCharacterDetailsAction,
  getCharacterTopAction,
  getSearchCharacterAction,
} from "./get-character.actions";
import {
  aboutMock,
  characterDetailsResponseMock,
  personalDataMock,
} from "@/tests/mocks/character.details.mock";

describe("Get Character Actions", () => {
  const jikanMock = new AxiosMockAdapter(jikanApi);

  beforeEach(() => {
    jikanMock.reset();
  });

  describe("Get Character Details", () => {
    test("Should return empty data if id is not a number", async () => {
      const characterDetails = await getCharacterDetailsAction(+"aaaa");
      expect(characterDetails).toStrictEqual({});
    });

    test("Should return correct processed data", async () => {
      jikanMock
        .onGet("/characters/1/full")
        .reply(200, { data: characterDetailsResponseMock });

      const characterDetails = await getCharacterDetailsAction(1);
      expect(characterDetails.about).toStrictEqual(aboutMock);
      expect(characterDetails.personalData).toStrictEqual(personalDataMock);
    });
  });

  describe("Get Search Character", () => {
    test("Should return empty data if not query and genres provided", async () => {
      const options = {
        page: 1,
      };
      const animeSearch = await getSearchCharacterAction(options);
      expect(animeSearch).toStrictEqual({});
    });

    test("should have been called with the correct params", async () => {
      jikanMock.onGet("/characters").reply(200, { data: characterDetailsResponseMock });
      const options = {
        page: 10,
        query: "naruto",
      };
      await getSearchCharacterAction(options);
      const params = jikanMock.history.get[0].params;
      expect(params).toStrictEqual({
        page: 10,
        q: "naruto",
      });
    });
  });

  describe("Get Characters Top", () => {
    test("should have been called with the correct params", async () => {
      jikanMock.onGet("/top/characters").reply(200, { data: [] });
      const options = {
        page: +"asdfasdf",
      };
      await getCharacterTopAction(options);
      const params = jikanMock.history.get[0].params;
      expect(params).toStrictEqual({
        page: 1,
      });
    });
  });
});
