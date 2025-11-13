import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { CustomPagination } from "./CustomPagination";
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

describe("CustomPagination", () => {
  test("should render component with default values", () => {
    renderWithRouter(<CustomPagination totalPages={6} />);

    expect(screen.getByTitle("Previous page")).toBeDefined();
    expect(screen.getByTitle("Next page")).toBeDefined();

    expect(screen.getByText("1")).toBeDefined();
    expect(screen.getByText("2")).toBeDefined();
    expect(screen.getByText("3")).toBeDefined();
    expect(screen.getByText("4")).toBeDefined();
    expect(screen.getByText("5")).toBeDefined();
    expect(screen.getByText("6")).toBeDefined();
  });

  test("should disabled previous button when page is 1", () => {
    renderWithRouter(<CustomPagination totalPages={5} />);
    const previousButton = screen.getByTitle("Previous page");
    expect(previousButton.getAttributeNames()).toContain("disabled");
  });

  test("should disabled next button when we are in the last page", () => {
    renderWithRouter(<CustomPagination totalPages={5} />, ["/?page=5"]);
    const nextButton = screen.getByTitle("Next page");

    expect(nextButton.getAttributeNames()).toContain("disabled");
  });

  test("should disabled button 3 when we are in page 3", () => {
    renderWithRouter(<CustomPagination totalPages={10} />, ["/?page=3"]);
    const button2 = screen.getByText("2");
    const button3 = screen.getByText("3");

    expect(button2.getAttribute("variant")).toBe("outline");
    expect(button3.getAttribute("variant")).toBe("default");
  });

  test("should change page when click on number button", () => {
    renderWithRouter(<CustomPagination totalPages={5} />, ["/?page=3"]);

    const button2 = screen.getByText("2");
    const button3 = screen.getByText("3");
    expect(button2.getAttribute("variant")).toBe("outline");
    expect(button3.getAttribute("variant")).toBe("default");

    fireEvent.click(button2);

    expect(button2.getAttribute("variant")).toBe("default");
    expect(button3.getAttribute("variant")).toBe("outline");
  });

  test("should not show dots when total pages is 7 or less", () => {
    renderWithRouter(<CustomPagination totalPages={7} />);

    // Should show all pages without dots
    for (let i = 1; i <= 7; i++) {
      expect(screen.getByText(i.toString())).toBeDefined();
    }

    // Should not have any dots
    expect(screen.queryByText("...")).toBeNull();
  });

  test("should show dots on the right when current page is near the beginning", () => {
    renderWithRouter(<CustomPagination totalPages={10} />, ["/?page=2"]);

    // Should show dots on the right
    expect(screen.getByText("...")).toBeDefined();

    // Should show first few pages and last page
    expect(screen.getByText("1")).toBeDefined();
    expect(screen.getByText("2")).toBeDefined();
    expect(screen.getByText("3")).toBeDefined();
    expect(screen.getByText("4")).toBeDefined();
    expect(screen.getByText("10")).toBeDefined();
  });

  test("should show dots on the left when current page is near the end", () => {
    renderWithRouter(<CustomPagination totalPages={10} />, ["/?page=9"]);

    // Should show dots on the left
    expect(screen.getByText("...")).toBeDefined();

    // Should show first page and last few pages
    expect(screen.getByText("1")).toBeDefined();
    expect(screen.getByText("7")).toBeDefined();
    expect(screen.getByText("8")).toBeDefined();
    expect(screen.getByText("9")).toBeDefined();
    expect(screen.getByText("10")).toBeDefined();
  });

  test("should show dots on both sides when current page is in the middle", () => {
    renderWithRouter(<CustomPagination totalPages={15} />, ["/?page=8"]);

    // Should show dots on both sides
    const dotsElements = screen.getAllByText("...");
    expect(dotsElements).toHaveLength(2);

    // Should show first page, some middle pages, and last page
    expect(screen.getByText("1")).toBeDefined();
    expect(screen.getByText("7")).toBeDefined();
    expect(screen.getByText("8")).toBeDefined();
    expect(screen.getByText("9")).toBeDefined();
    expect(screen.getByText("15")).toBeDefined();
  });

  test("should have dots as disabled buttons", () => {
    renderWithRouter(<CustomPagination totalPages={10} />, ["/?page=2"]);

    const dotsButton = screen.getByText("...");
    expect(dotsButton.getAttributeNames()).toContain("disabled");
    expect(dotsButton.getAttribute("variant")).toBe("outline");

    // Click on dots should not change anything since it's disabled
    fireEvent.click(dotsButton);

    // Page should still be 2 (current page button should still be active)
    const page2Button = screen.getByText("2");
    expect(page2Button.getAttribute("variant")).toBe("default");
  });
});
