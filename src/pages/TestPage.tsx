import { NavMenuCustom } from "@/components/custom/NavMenuCustom";
import React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const TestPage = () => {
  return (
    <div className="flex mx-auto w-full">
      <NavMenuCustom />
    </div>
  );
};
