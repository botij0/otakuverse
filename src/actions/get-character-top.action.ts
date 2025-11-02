import { jikanApi } from "@/api/jikanApi";
import type { CharacterListResponse } from "@/interfaces/character.list.response";

interface Options {
    page: number;
}

export const getCharacterTopAction = async (
    options: Options
): Promise<CharacterListResponse> => {
    const { page } = options;

    const { data } = await jikanApi.get<CharacterListResponse>(
        "/top/characters",
        {
            params: {
                page: page,
            },
        }
    );

    return data;
};
