import { jikanApi } from "@/api/jikanApi";
import type {
  CharacterDetails,
  CharacterDetailsResponse,
} from "@/interfaces/character.details.response";

export const getCharacterDetailsAction = async (
  id: string
): Promise<CharacterDetails> => {
  const { data } = await jikanApi.get<CharacterDetailsResponse>(`/characters/${id}/full`);
  return data.data;
};
