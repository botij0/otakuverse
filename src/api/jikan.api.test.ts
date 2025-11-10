import { describe, expect, test } from "vitest";
import { jikanApi } from "./jikan.api";

describe("jikanAPi", () => {
  test("Should be configured correctly", () => {
    expect(jikanApi.defaults.baseURL).toBe("https://api.jikan.moe/v4");
  });
});
