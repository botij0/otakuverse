import { mockAnimeDetails } from "./anime.details.mock";

export const mockAnimeSearch = {
  pagination: {
    last_visible_page: 14,
    has_next_page: true,
    current_page: 1,
    items: {
      count: 1,
      total: 14,
      per_page: 1,
    },
  },
  data: [mockAnimeDetails],
};
