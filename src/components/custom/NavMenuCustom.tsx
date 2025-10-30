import {
  AwardIcon,
  CircleCheckIcon,
  CircleHelpIcon,
  CircleIcon,
  Search,
  SunSnow,
  Users,
} from "lucide-react";

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
      <NavigationMenuList className="flex-wrap">
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <a href="/home">Home</a>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem className="hidden md:block">
          <NavigationMenuTrigger>Anime</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[200px] gap-2">
              <li>
                <NavigationMenuLink asChild>
                  <a href="#" className="flex-row items-center gap-2">
                    <AwardIcon />
                    Top Anime
                  </a>
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
            <ul className="grid w-[200px] gap-4">
              <li>
                <NavigationMenuLink asChild>
                  <a href="#" className="flex-row items-center gap-2">
                    <CircleHelpIcon />
                    Backlog
                  </a>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <a href="#" className="flex-row items-center gap-2">
                    <CircleIcon />
                    To Do
                  </a>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <a href="#" className="flex-row items-center gap-2">
                    <CircleCheckIcon />
                    Done
                  </a>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem className="hidden md:block">
          <NavigationMenuTrigger>Characters</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[200px] gap-4">
              <li>
                <NavigationMenuLink asChild>
                  <a href="#" className="flex-row items-center gap-2">
                    <CircleHelpIcon />
                    Backlog
                  </a>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <a href="#" className="flex-row items-center gap-2">
                    <CircleIcon />
                    To Do
                  </a>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <a href="#" className="flex-row items-center gap-2">
                    <CircleCheckIcon />
                    Done
                  </a>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
