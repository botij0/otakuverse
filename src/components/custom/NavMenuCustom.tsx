import { Link } from "react-router";
import { AwardIcon, Search, SunSnow, Users } from "lucide-react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export function NavMenuCustom() {
  return (
    <NavigationMenu>
      <NavigationMenuList className="text-white gap-x-5">
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link to="/">Home</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Anime</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[200px] gap-4 py-4 px-3">
              <li>
                <NavigationMenuLink asChild>
                  <Link to="#" className="flex items-center gap-2">
                    <AwardIcon />
                    Top Anime
                  </Link>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <Link to="#" className="flex items-center gap-2">
                    <SunSnow />
                    Seasonal Animes
                  </Link>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <Link to="#" className="flex items-center gap-2">
                    <Search />
                    Search Anime
                  </Link>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <Link to="#" className="flex items-center gap-2">
                    <Users />
                    Recomendations
                  </Link>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Manga</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[200px] gap-4 py-4 px-3">
              <li>
                <NavigationMenuLink asChild>
                  <Link to="#" className="flex items-center gap-2">
                    <AwardIcon />
                    Top Manga
                  </Link>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <Link to="#" className="flex items-center gap-2">
                    <Search />
                    Search Manga
                  </Link>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <Link to="#" className="flex items-center gap-2">
                    <Users />
                    Recomendations
                  </Link>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Characters</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[200px] gap-4 py-4 px-3">
              <li>
                <NavigationMenuLink asChild>
                  <Link to="#" className="flex items-center gap-2">
                    <AwardIcon />
                    Top Characters
                  </Link>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <Link to="#" className="flex items-center gap-2">
                    <Search />
                    Search Characters
                  </Link>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
