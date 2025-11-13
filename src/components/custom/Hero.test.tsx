import { MemoryRouter } from "react-router";
import { render, screen } from "@testing-library/react";
import type { PropsWithChildren } from "react";
import { describe, expect, test, vi } from "vitest";

import Hero from "./Hero";

vi.mock("../ui/button", () => ({
  Button: ({ children, ...props }: PropsWithChildren) => (
    <button {...props}>{children}</button>
  ),
}));

vi.mock("./GenresToggleGroup", () => ({
  GenresToggleGroup: () => <div data-testid="genre">Genres</div>,
}));

vi.mock("../ui/input", () => ({
  Input: ({ ...props }: PropsWithChildren) => <input {...props} />,
}));

vi.mock("lucide-react", () => ({
  Search: () => <svg data-testid="search-icon" />,
}));

const renderWithRouter = (component: React.ReactElement, initialEntries?: string[]) => {
  return render(<MemoryRouter initialEntries={initialEntries}>{component}</MemoryRouter>);
};

describe("Hero", () => {
  test("should render component without searchbar", () => {
    renderWithRouter(
      <Hero
        title="Title Test"
        subtitle="Subtitle Test"
        description="description test"
        showSearchBar={false}
      />
    );
    const backgroundDiv = screen.getByTestId("backgroundImg");
    expect(backgroundDiv.style.backgroundImage).toContain("hero-banner.jpg");
    expect(screen.getByText("Title Test")).toBeDefined();
    expect(screen.getByText("Subtitle Test")).toBeDefined();
    expect(screen.getByText("description test")).toBeDefined();

    expect(screen.queryByPlaceholderText("Search for anime or manga...")).toBeNull();
    expect(screen.queryByTestId("genre")).toBeNull();
  });

  test("should render component with searchbar and genres", () => {
    renderWithRouter(
      <Hero
        title="Title Test"
        subtitle="Subtitle Test"
        description="description test"
        showSearchBar={true}
        hideGenres={false}
      />
    );

    expect(screen.queryByText("Title Test")).toBeNull();
    expect(screen.queryByText("Subtitle Test")).toBeNull();
    expect(screen.queryByText("description test")).toBeNull();

    const backgroundDiv = screen.getByTestId("backgroundImg");
    expect(backgroundDiv.style.backgroundImage).toContain("hero-banner.jpg");
    expect(screen.queryByPlaceholderText("Search for anime or manga...")).toBeDefined();
    expect(screen.getByTestId("search-icon")).toBeDefined();
    expect(screen.queryByTestId("genre")).toBeDefined();
    expect(screen.getByText("Search")).toBeDefined();
  });

  test("should populate search input with query from URL params", () => {
    renderWithRouter(<Hero showSearchBar={true} />, ["/?query=Dragon Ball"]);

    screen.debug();
    const input = screen.getByPlaceholderText("Search for anime or manga...");
    expect(input.getAttribute("value")).toBe("Dragon Ball");
  });
});
