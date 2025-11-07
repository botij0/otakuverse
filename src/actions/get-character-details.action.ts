import { jikanApi } from "@/api/jikanApi";
import type {
    CharacterDetails,
    CharacterDetailsResponse,
    PersonalData,
} from "@/interfaces/character.details.response";

export const getCharacterDetailsAction = async (
    id: string
): Promise<CharacterDetails> => {
    const { data } = await jikanApi.get<CharacterDetailsResponse>(
        `/characters/${id}/full`
    );
    data.data.personalData = parseCharacterInfo(data.data.about);
    data.data.about = extractDescription(data.data.about);
    return data.data;
};

function parseCharacterInfo(text: string): PersonalData {
    const normalize = (str: string) => str.replace(/\s+/g, " ").trim();

    // AGE (tomamos el primer número que aparezca)
    const ageMatch = text.match(/Age:\s*([0-9]+)/i);
    const age = ageMatch ? Number(ageMatch[1]) : null;

    // BIRTHDATE / BIRTHDAY
    const birthMatch = text.match(
        /Birth(?:date|day):\s*([A-Za-z]+\s+\d{1,2})/i
    );
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

function extractDescription(raw: string): string {
    let text = raw;

    // Lista de campos típicos que queremos eliminar
    const fields = [
        "Age",
        "Birthdate",
        "Birthday",
        "Height",
        "Weight",
        "Blood Type",
        "Blood type",
        "Blood",
        "Occupation",
        "Affiliations",
        "Affiliation",
        "Position",
        "Devil fruit",
        "Nen Type",
        "Equipment",
        "Abilities",
        "Eye Color",
        "Graduation rank",
        "Zodiac sign",
        "Likes",
        "Dislikes",
        "Hair color",
        "Eyes",
        "Hair",
        "Favorite food",
        "Bounty",
        "Clan",
        "Grade",
        "Planet of Origin",
        "Race",
        "Location",
        "Level",
        "Nationality",
        "Type",
    ];

    // Regex que captura: Campo: valor (hasta coma o salto de línea)
    const pattern = new RegExp(
        `(?:${fields.join("|")}):\\s*([^\\.\\n]+)(?=\\.|\\n|$)`,
        "gi"
    );

    // Elimina cada coincidencia
    text = text.replace(pattern, "");

    // También quita comas dobles y espacios sobrantes
    text = text.replace(/\s{2,}/g, " ").trim();
    text = text.replace(/^[,.\s]+/, "");

    return text.trim();
}
