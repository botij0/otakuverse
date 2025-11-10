import type { Images, Jpg, MediaLittle, Pagination } from "./media";

export interface CharacterListResponse {
  pagination: Pagination;
  data: Character[];
}

export interface CharacterDetailsResponse {
  data: CharacterDetails;
}

export interface Character {
  mal_id: number;
  images: Images;
  name: string;
  name_kanji: string;
  nicknames: string[];
  favorites: number;
  about: string;
}

export interface CharacterDetails extends Character {
  anime: AnimeElement[];
  manga: Manga[];
  voices: Voice[];
  personalData: PersonalData;
}

export interface AnimeElement {
  role: string;
  anime: MediaLittle;
}

export interface Manga {
  role: string;
  manga: MediaLittle;
}

export interface Voice {
  person: Person;
  language: string;
}

export interface Person {
  mal_id: number;
  images: PersonImages;
  name: string;
}

export interface PersonImages {
  jpg: Jpg;
}

export interface PersonalData {
  age: number | null;
  birthDate: string | null;
  height: number | null; // en cm
  weight: number | null; // en kg
  bloodType: string | null;
  occupation: string | null;
}
