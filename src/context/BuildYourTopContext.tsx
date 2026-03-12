import type { Anime } from "@/interfaces/anime";
import { createContext, useEffect, useState } from "react";

interface BuildYourTopContextProps {
  topList: Record<number, Anime>;
  addAnimeToTopList: (position: number, anime: Anime) => void;
  removeAnimeFromTopList: (position: number) => void;
}

export const BuildYourTopContext = createContext<BuildYourTopContextProps>({} as BuildYourTopContextProps);

export const getTopListFromLocalStorage = (): Record<number, Anime> => {
  const saved = localStorage.getItem('animeTopList');
  return saved ? JSON.parse(saved) : {};
}

export const BuildYourTopProvider = ({ children }: { children: React.ReactNode }) => {
  const [topList, setTopList] = useState<Record<number, Anime>>(getTopListFromLocalStorage());

  const addAnimeToTopList = (position: number, anime: Anime) => {
    setTopList(prev => ({ ...prev, [position]: anime }));
  }

  const removeAnimeFromTopList = (position: number) => {
    setTopList(prev => {
      const newTopList = { ...prev };
      delete newTopList[position];
      return newTopList;
    });
  }

  useEffect(() => {
    localStorage.setItem('animeTopList', JSON.stringify(topList));
  }, [topList]);

  return (
    <BuildYourTopContext.Provider
      value={{
        topList,
        addAnimeToTopList,
        removeAnimeFromTopList,
      }}>
      {children}
    </BuildYourTopContext.Provider>
  );
}