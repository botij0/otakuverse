import { AwardIcon, Search, SunSnow, Users } from "lucide-react";

import { useIsMobile } from "@/hooks/useIsMobile";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Link } from "react-router";

export function NavMenuCustom() {
  const isMobile = useIsMobile();

  return (
    <NavigationMenu viewport={isMobile}>
      <NavigationMenuList className="flex-wrap lg:gap-x-10">
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link to="/">Home</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem className="hidden md:block">
          <NavigationMenuTrigger>Anime</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[200px] gap-2">
              <li>
                <NavigationMenuLink asChild>
                  <Link to="/anime/top" className="flex-row items-center gap-2">
                    <AwardIcon />
                    Top Anime
                  </Link>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <Link to="#" className="flex-row items-center gap-2">
                    <SunSnow />
                    Seasonal Animes
                  </Link>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <Link to="#" className="flex-row items-center gap-2">
                    <Search />
                    Search Anime
                  </Link>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <Link to="#" className="flex-row items-center gap-2">
                    <Users />
                    Recomendations
                  </Link>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem className="hidden md:block">
          <NavigationMenuTrigger>Manga</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[200px] gap-2">
              <li>
                <NavigationMenuLink asChild>
                  <Link to="#" className="flex-row items-center gap-2">
                    <AwardIcon />
                    Top Manga
                  </Link>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <Link to="#" className="flex-row items-center gap-2">
                    <Search />
                    Search Manga
                  </Link>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <Link to="#" className="flex-row items-center gap-2">
                    <Users />
                    Recomendations
                  </Link>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem className="hidden md:block">
          <NavigationMenuTrigger>Characters</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[200px] gap-2">
              <li>
                <NavigationMenuLink asChild>
                  <Link to="#" className="flex-row items-center gap-2">
                    <AwardIcon />
                    Top Characters
                  </Link>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <Link to="#" className="flex-row items-center gap-2">
                    <Search />
                    Search Character
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
