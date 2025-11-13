import { useSearchParams } from "react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";

interface Props {
  totalPages: number;
}

export const CustomPagination = ({ totalPages }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const queryPage = searchParams.get("page") || "1";
  const parsedPage = isNaN(+queryPage) ? 1 : +queryPage;
  const page = Math.min(Math.max(parsedPage, 1), totalPages);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;

    searchParams.set("page", page.toString());

    setSearchParams(searchParams);
  };

  if (totalPages <= 1) return null;

  const buildPaginationItems = (
    currentPage: number,
    total: number,
    siblingCount = 1
  ): (number | "dots")[] => {
    const totalPageNumbers = siblingCount * 2 + 5;

    if (total <= totalPageNumbers) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 2);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, total - 1);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < total - 1;

    const firstPage = 1;
    const lastPage = total;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);
      return [...leftRange, "dots", lastPage];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount;
      const start = total - rightItemCount + 1;
      const rightRange = Array.from({ length: rightItemCount }, (_, i) => start + i);
      return [firstPage, "dots", ...rightRange];
    }

    const middleRange = Array.from(
      { length: rightSiblingIndex - leftSiblingIndex + 1 },
      (_, i) => leftSiblingIndex + i
    );

    return [firstPage, "dots", ...middleRange, "dots", lastPage];
  };

  const paginationItems = buildPaginationItems(page, totalPages);

  return (
    <div className="flex items-center justify-center space-x-2 text-primary-foreground">
      <Button
        title="Previous page"
        variant="outline"
        size="sm"
        disabled={page === 1}
        onClick={() => handlePageChange(page - 1)}
      >
        <ChevronLeft className="font-bold" />
      </Button>

      {paginationItems.map((item, index) => {
        if (item === "dots") {
          return (
            <Button key={`dots-${index}`} variant="outline" size="sm" disabled>
              ...
            </Button>
          );
        }

        return (
          <Button
            key={item}
            variant={page === item ? "default" : "outline"}
            size="sm"
            onClick={() => handlePageChange(item)}
          >
            {item}
          </Button>
        );
      })}

      <Button
        title="Next page"
        variant="outline"
        size="sm"
        disabled={page === totalPages}
        onClick={() => handlePageChange(page + 1)}
      >
        <ChevronRight className="h-4 w-4 font-bold" />
      </Button>
    </div>
  );
};
