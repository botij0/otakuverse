import { Bomb, HeartIcon, Kayak, Laugh, WandSparkles } from "lucide-react";
import { useSearchParams } from "react-router";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export const GenresToggleGroup = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentGenres = searchParams.get("genres")?.split(",").filter(Boolean) || [];

  const handleGenresChange = (selectedGenres: string[]) => {
    const newGenres = selectedGenres.filter(Boolean);
    const newSearchParams = new URLSearchParams(searchParams);

    if (newGenres.length > 0) {
      newSearchParams.set("genres", newGenres.join(","));
    } else {
      newSearchParams.delete("genres");
    }

    setSearchParams(newSearchParams);
  };

  return (
    <ToggleGroup
      type="multiple"
      variant="outline"
      size="lg"
      value={currentGenres}
      onValueChange={handleGenresChange}
    >
      <ToggleGroupItem
        value="action"
        aria-label="Toggle action"
        className="data-[state=on]:bg-primary-on data-[state=on]:*:[svg]:fill-accent data-[state=on]:*:[svg]:stroke-accent"
      >
        <Bomb />
        Action
      </ToggleGroupItem>
      <ToggleGroupItem
        value="adventure"
        aria-label="Toggle adventure"
        className="data-[state=on]:bg-primary-on data-[state=on]:*:[svg]:fill-accent data-[state=on]:*:[svg]:stroke-accent"
      >
        <Kayak />
        Adventure
      </ToggleGroupItem>
      <ToggleGroupItem
        value="fantasy"
        aria-label="Toggle fantasy"
        className="data-[state=on]:bg-primary-on data-[state=on]:*:[svg]:fill-accent data-[state=on]:*:[svg]:stroke-accent"
      >
        <WandSparkles />
        Fantasy
      </ToggleGroupItem>
      <ToggleGroupItem
        value="romance"
        aria-label="Toggle romance"
        className="data-[state=on]:bg-primary-on data-[state=on]:*:[svg]:fill-accent data-[state=on]:*:[svg]:stroke-accent"
      >
        <HeartIcon />
        Romance
      </ToggleGroupItem>
      <ToggleGroupItem
        value="comedy"
        aria-label="Toggle comedy"
        className="data-[state=on]:bg-primary-on data-[state=on]:*:[svg]:fill-accent data-[state=on]:*:[svg]:stroke-primary-on"
      >
        <Laugh />
        Comedy
      </ToggleGroupItem>
    </ToggleGroup>
  );
};
