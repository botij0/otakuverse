import { jikanApi } from "@/api/jikanApi";
import type {
  CharacterDetails,
  CharacterDetailsResponse,
  PersonalData,
} from "@/interfaces/character.details.response";

export const getCharacterDetailsAction = async (
  id: string
): Promise<CharacterDetails> => {
  const { data } = await jikanApi.get<CharacterDetailsResponse>(`/characters/${id}/full`);
  data.data.personalData = parseCharacterInfo(data.data.about);
  return data.data;
};

function parseCharacterInfo(text: string): PersonalData {
  const normalize = (str: string) => str.replace(/\s+/g, " ").trim();

  // AGE (tomamos el primer número que aparezca)
  const ageMatch = text.match(/Age:\s*([0-9]+)/i);
  const age = ageMatch ? Number(ageMatch[1]) : null;

  // BIRTHDATE / BIRTHDAY
  const birthMatch = text.match(/Birth(?:date|day):\s*([A-Za-z]+\s+\d{1,2})/i);
  const birthDate = birthMatch ? normalize(birthMatch[1]) : null;

  // HEIGHT (tomamos primer número en cm, ignorando pies/pulgadas)
  const heightMatch = text.match(/Height:\s*([0-9]+)[–-]?[0-9]*\s*cm/i);
  const height = heightMatch ? Number(heightMatch[1]) : null;

  // WEIGHT (kg)
  const weightMatch = text.match(/Weight:\s*([0-9]+)[–-]?[0-9]*\s*kg/i);
  const weight = weightMatch ? Number(weightMatch[1]) : null;

  // BLOOD TYPE
  const bloodMatch = text.match(/Blood\s*Type:\s*([ABO]{1,2}[+-]?)/i);
  const bloodType = bloodMatch ? bloodMatch[1].toUpperCase() : null;

  // OCCUPATION (tomamos lo que sigue a "Occupation:" hasta la coma)
  const jobMatch = text.match(/Occupation:\s*([^,]+)/i);
  const occupation = jobMatch ? normalize(jobMatch[1]) : null;

  return {
    age,
    birthDate,
    height,
    weight,
    bloodType,
    occupation,
  };
}
