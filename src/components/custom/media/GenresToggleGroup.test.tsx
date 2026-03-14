import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { GenresToggleGroup } from "./GenresToggleGroup";
import { MemoryRouter } from "react-router";
import type { PropsWithChildren } from "react";

vi.mock("../ui/button", () => ({
  Button: ({ children, ...props }: PropsWithChildren) => (
    <button {...props}>{children}</button>
  ),
}));

const renderWithRouter = (component: React.ReactElement, initialEntries?: string[]) => {
  return render(<MemoryRouter initialEntries={initialEntries}>{component}</MemoryRouter>);
};

const genres = ["Action", "Adventure", "Fantasy", "Romance", "Comedy"];

describe("GenresToggleGroup", () => {
  test("should render component with default values", () => {
    renderWithRouter(<GenresToggleGroup />);

    genres.forEach((genre) => {
      const btnGenre = screen.getByText(genre);
      expect(btnGenre).toBeDefined();
      expect(btnGenre.getAttribute("data-state")).toBe("off");
      expect(btnGenre.getAttribute("aria-pressed")).toBe("false");
    });
  });

  test("should search by genre when a btn is clicked", () => {
    renderWithRouter(<GenresToggleGroup />);

    const actionBtn = screen.getByText(genres[0]);
    const romanceBtn = screen.getByText(genres[3]);
    fireEvent.click(actionBtn);
    fireEvent.click(romanceBtn);

    expect(actionBtn.getAttribute("data-state")).toBe("on");
    expect(actionBtn.getAttribute("aria-pressed")).toBe("true");
    expect(romanceBtn.getAttribute("data-state")).toBe("on");
    expect(romanceBtn.getAttribute("aria-pressed")).toBe("true");
  });

  test("Toggle should be active depending on genres search params", () => {
    renderWithRouter(<GenresToggleGroup />, ["/?genres=fantasy,adventure"]);

    const adventureBtn = screen.getByText(genres[1]);
    const fantasyBtn = screen.getByText(genres[2]);

    expect(adventureBtn.getAttribute("data-state")).toBe("on");
    expect(adventureBtn.getAttribute("aria-pressed")).toBe("true");
    expect(fantasyBtn.getAttribute("data-state")).toBe("on");
    expect(fantasyBtn.getAttribute("aria-pressed")).toBe("true");
  });
});
