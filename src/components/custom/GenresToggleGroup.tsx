import { BookmarkIcon, HeartIcon, StarIcon } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export const GenresToggleGroup = () => {
  return (
    <ToggleGroup type="multiple" variant="outline" size="lg">
      <ToggleGroupItem
        value="star"
        aria-label="Toggle star"
        className="data-[state=on]:bg-primary-on data-[state=on]:*:[svg]:fill-accent data-[state=on]:*:[svg]:stroke-accent"
      >
        <StarIcon />
        Star
      </ToggleGroupItem>
      <ToggleGroupItem
        value="heart"
        aria-label="Toggle heart"
        className="data-[state=on]:bg-primary-on data-[state=on]:*:[svg]:fill-accent data-[state=on]:*:[svg]:stroke-accent"
      >
        <HeartIcon />
        Heart
      </ToggleGroupItem>
      <ToggleGroupItem
        value="bookmark"
        aria-label="Toggle bookmark"
        className="data-[state=on]:bg-primary-on data-[state=on]:*:[svg]:fill-accent data-[state=on]:*:[svg]:stroke-accent"
      >
        <BookmarkIcon />
        Bookmark
      </ToggleGroupItem>
    </ToggleGroup>
  );
};
