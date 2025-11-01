export const genresDict = {
    action: 1,
    adventure: 2,
    comedy: 4,
    mystery: 7,
    drama: 8,
    fantasy: 10,
    horror: 14,
    romance: 22,
    "sci-fi": 24,
    sports: 30,
    "slice of life": 36,
    suspense: 41,
    "award winning": 46,
};

export const getGenresIdsByGenresString = (genres: string): string => {
    const genresList = genres.split(",").map((g) => g.trim().toLowerCase());
    const ids: number[] = [];

    genresList.forEach((genre) => {
        const genreId = genresDict[genre as keyof typeof genresDict];
        if (genreId !== undefined) {
            ids.push(genreId);
        }
    });

    return ids.join(",");
};
