import { Bomb, HeartIcon, Kayak, Laugh, WandSparkles } from "lucide-react";
import { useSearchParams } from "react-router";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const genreItems = [
  {
    name: "action",
    icon: <Bomb />,
  },
  {
    name: "adventure",
    icon: <Kayak />,
  },
  {
    name: "fantasy",
    icon: <WandSparkles />,
  },
  {
    name: "Romance",
    icon: <HeartIcon />,
  },
  {
    name: "comedy",
    icon: <Laugh />,
  },
];

function capitalize(str = "") {
  return str[0]?.toUpperCase() + str.slice(1);
}

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
      {genreItems.map((genre) => {
        return (
          <ToggleGroupItem
            value={genre.name}
            aria-label={`Toggle ${genre.name}`}
            className="data-[state=on]:bg-primary-on data-[state=on]:*:[svg]:fill-accent data-[state=on]:*:[svg]:stroke-white data-[state=off]:text-white/40"
          >
            {genre.icon}
            {capitalize(genre.name)}
          </ToggleGroupItem>
        );
      })}
    </ToggleGroup>
  );
};
