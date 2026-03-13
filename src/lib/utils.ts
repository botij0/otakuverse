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
