import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const splitIntoParagarphs = (text: string, nParagraphs: number = 3): string[] => {
  // Divide por punto + espacio y junta frases en grupos de 3
  const sentences = text
    .split(/(?<=\.)\s+/) // divide en cada ". "
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  const paragraphs: string[] = [];
  for (let i = 0; i < sentences.length; i += nParagraphs) {
    const group = sentences.slice(i, i + nParagraphs).join(" ");
    paragraphs.push(group);
  }

  return paragraphs;
};
