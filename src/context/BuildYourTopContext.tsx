/* eslint-disable react-refresh/only-export-components */
import type { Anime } from "@/interfaces/anime";
import { createContext, useEffect, useState } from "react";

interface BuildYourTopContextProps {
  animeTopList: Record<number, Anime>;
  addAnimeToTopList: (position: number, anime: Anime) => void;
  removeAnimeFromTopList: (position: number) => void;
}

export const BuildYourTopContext = createContext<BuildYourTopContextProps>({} as BuildYourTopContextProps);

export const getAnimeTopListFromLocalStorage = (): Record<number, Anime> => {
  const saved = localStorage.getItem('animeTopList');
  return saved ? JSON.parse(saved) : {};
}

export const BuildYourTopProvider = ({ children }: { children: React.ReactNode }) => {
  const [animeTopList, setAnimeTopList] = useState<Record<number, Anime>>(getAnimeTopListFromLocalStorage());

  const addAnimeToTopList = (position: number, anime: Anime) => {
    setAnimeTopList(prev => ({ ...prev, [position]: anime }));
  }

  const removeAnimeFromTopList = (position: number) => {
    setAnimeTopList(prev => {
      const newTopList = { ...prev };
      delete newTopList[position];
      return newTopList;
    });
  }

  useEffect(() => {
    localStorage.setItem('animeTopList', JSON.stringify(animeTopList));
  }, [animeTopList]);

  return (
    <BuildYourTopContext.Provider
      value={{
        animeTopList,
        addAnimeToTopList,
        removeAnimeFromTopList,
      }}>
      {children}
    </BuildYourTopContext.Provider>
  );
}