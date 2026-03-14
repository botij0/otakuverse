import type { Anime } from "@/interfaces/anime";
import type { Manga } from "@/interfaces/manga";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const splitIntoParagraphs = (text: string, nParagraphs: number = 3): string[] => {
  const sentences = text
    .split(/(?<=\.)\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  const paragraphs: string[] = [];
  for (let i = 0; i < sentences.length; i += nParagraphs) {
    const group = sentences.slice(i, i + nParagraphs).join(" ");
    paragraphs.push(group);
  }

  return paragraphs;
};

const getProxiedImageUrl = (url: string): string => {
  try {
    const parsed = new URL(url);
    if (parsed.hostname === "myanimelist.net") return `/mal-image${parsed.pathname}`;
    if (parsed.hostname === "cdn.myanimelist.net")
      return `/mal-cdn-image${parsed.pathname}`;
  } catch {
    /* return original url */
  }
  return url;
};

export async function fetchImageAsDataUrl(url: string): Promise<string> {
  const response = await fetch(getProxiedImageUrl(url));
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

export const getInitialListSize = (topList: Record<number, Anime | Manga>) => {
  const maxPosition = Math.max(...Object.keys(topList).map(Number));
  if (maxPosition <= 10) return 10;
  else if (maxPosition <= 15) return 15;
  else return 20;
};

export const getPodiumCardStyles = (pos: number) => {
  if (pos === 1) return "border-yellow-500 shadow-yellow-500/20";
  if (pos === 2) return "border-slate-400 shadow-slate-400/20";
  if (pos === 3) return "border-amber-600 shadow-amber-600/20";
  if (pos >= 4 && pos <= 10) return "border-stone-500 shadow-stone-500/20";
  if (pos >= 11 && pos <= 15) return "border-stone-600 shadow-stone-600/20";
};

export const getPodiumBadgeStyles = (pos: number) => {
  if (pos === 1)
    return "bg-gradient-to-br from-yellow-500 to-yellow-700 text-white shadow-yellow-500/50 ring-2 ring-yellow-400";
  if (pos === 2)
    return "bg-gradient-to-br from-slate-400 to-slate-600 text-white shadow-slate-400/50 ring-2 ring-slate-300";
  if (pos === 3)
    return "bg-gradient-to-br from-amber-500 to-amber-700 text-white shadow-amber-700/50 ring-2 ring-amber-500";
  if (pos >= 4 && pos <= 10)
    return "bg-gradient-to-br from-stone-400 to-stone-600 text-stone-200 shadow-stone-500/50 ring-2 ring-stone-400";
  if (pos >= 11 && pos <= 15)
    return "bg-gradient-to-br from-stone-500 to-stone-700 text-stone-200 shadow-stone-600/50 ring-2 ring-stone-500";
  return "bg-gradient-to-br from-stone-600 to-stone-800 text-stone-300 shadow-stone-700/50 ring-2 ring-stone-600";
};
