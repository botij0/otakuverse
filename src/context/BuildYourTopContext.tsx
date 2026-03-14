/* eslint-disable react-refresh/only-export-components */
import type { Anime } from "@/interfaces/anime";
import type { Manga } from "@/interfaces/manga";
import { createContext, useEffect, useState } from "react";

interface BuildYourTopContextProps {
  animeTopList: Record<number, Anime>;
  mangaTopList: Record<number, Manga>;
  addAnimeToTopList: (position: number, anime: Anime) => void;
  addMangaToTopList: (position: number, anime: Manga) => void;
  removeAnimeFromTopList: (position: number) => void;
  removeMangaFromTopList: (position: number) => void;
}

export const BuildYourTopContext = createContext<BuildYourTopContextProps>({} as BuildYourTopContextProps);

export const getAnimeTopListFromLocalStorage = (): Record<number, Anime> => {
  const saved = localStorage.getItem('animeTopList');
  return saved ? JSON.parse(saved) : {};
}

export const getMangaTopListFromLocalStorage = (): Record<number, Manga> => {
  const saved = localStorage.getItem('mangaTopList');
  return saved ? JSON.parse(saved) : {};
}

export const BuildYourTopProvider = ({ children }: { children: React.ReactNode }) => {
  const [animeTopList, setAnimeTopList] = useState<Record<number, Anime>>(getAnimeTopListFromLocalStorage());
  const [mangaTopList, setMangaTopList] = useState<Record<number, Manga>>(getMangaTopListFromLocalStorage());


  const addAnimeToTopList = (position: number, anime: Anime) => {
    setAnimeTopList(prev => ({ ...prev, [position]: anime }));
  }

  const addMangaToTopList = (position: number, manga: Manga) => {
    setMangaTopList(prev => ({ ...prev, [position]: manga }))
  }

  const removeAnimeFromTopList = (position: number) => {
    setAnimeTopList(prev => {
      const newTopList = { ...prev };
      delete newTopList[position];
      return newTopList;
    });
  }

  const removeMangaFromTopList = (position: number) => {
    setMangaTopList(prev => {
      const newTopList = { ...prev };
      delete newTopList[position];
      return newTopList;
    })
  }

  useEffect(() => {
    localStorage.setItem('animeTopList', JSON.stringify(animeTopList));
  }, [animeTopList]);

  useEffect(() => {
    localStorage.setItem('mangaTopList', JSON.stringify(mangaTopList));
  }, [mangaTopList]);

  return (
    <BuildYourTopContext.Provider
      value={{
        animeTopList,
        mangaTopList,
        addAnimeToTopList,
        removeAnimeFromTopList,
        removeMangaFromTopList,
        addMangaToTopList
      }}>
      {children}
    </BuildYourTopContext.Provider>
  );
}