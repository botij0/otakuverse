export interface CharacterDetailsResponse {
  data: CharacterDetails;
}

export interface CharacterDetails {
  mal_id: number;
  images: DataImages;
  name: string;
  name_kanji: string;
  nicknames: string[];
  favorites: number;
  about: string;
  anime: AnimeElement[];
  manga: Manga[];
  voices: Voice[];
}

export interface AnimeElement {
  role: string;
  anime: MediaClass;
}

export interface Manga {
  role: string;
  manga: MediaClass;
}

export interface MediaClass {
  mal_id: number;
  images: DataImages;
  title: string;
}

export interface Image {
  image_url: string;
  small_image_url: string;
  large_image_url: string;
}

export interface DataImages {
  jpg: Jpg;
  webp: Webp;
}

export interface Jpg {
  image_url: string;
  small_image_url: string;
  large_image_url: string;
}

export interface Webp {
  image_url: string;
  small_image_url: string;
  large_image_url: string;
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
