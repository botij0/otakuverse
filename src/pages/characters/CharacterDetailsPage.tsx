import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import {
  ArrowLeft,
  Briefcase,
  Cake,
  CircleQuestionMark,
  Contact,
  Droplet,
  Ruler,
  Star,
  Weight,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EmptyDetails } from "@/components/custom/EmptyDetails";
import { SkeletonDetails } from "@/components/custom/SkeletonDetails";
import { Card, CardContent } from "@/components/ui/card";
import { splitIntoParagarphs } from "@/lib/utils";
import { getCharacterDetailsAction } from "@/actions/get-character.actions";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export const CharacterDetailsPage = () => {
  const [showFullAbout, setShowFullAbout] = useState(false);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const {
    data: character,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["characterDetails", id],
    queryFn: () => getCharacterDetailsAction(+id!),
    enabled: !!id,
  });

  if (isLoading) {
    return <SkeletonDetails />;
  }

  if (error || !character) {
    return <EmptyDetails />;
  }

  return (
    <main className="container mx-auto px-4 py-8 text-primary-foreground">
      <Button onClick={() => navigate(-1)} className="mb-6 group" variant={"outline"}>
        <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
        Back
      </Button>

      <div className="grid md:grid-cols-4 gap-y-8 md:gap-x-24">
        <div className="space-y-4 max-h-[600px]">
          <div className="overflow-hidden rounded-lg border shadow h-3/5">
            <img
              src={character.images.webp.image_url}
              alt={character.name}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="space-y-3 bg-card border border-border rounded-lg p-4">
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 fill-accent text-accent" />
              <span className="font-semibold text-md">{character.favorites} Users</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Contact className="h-5 w-5 text-accent" />
              <span className="flex items-center">
                {character.personalData.age ? (
                  `${character.personalData.age} years`
                ) : (
                  <CircleQuestionMark className="me-1 h-4 w-4" />
                )}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Cake className="h-5 w-5 text-accent" />
              <span className="flex items-center">
                {character.personalData.birthDate ? (
                  character.personalData.birthDate
                ) : (
                  <CircleQuestionMark className="me-1 h-4 w-4" />
                )}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Ruler className="h-5 w-5 text-accent" />
              <span>
                {character.personalData.height ? (
                  `${character.personalData.height} cm`
                ) : (
                  <CircleQuestionMark className="me-2 h-4 w-4" />
                )}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Weight className="h-5 w-5 text-accent" />
              <span className="flex items-center">
                {character.personalData.weight ? (
                  `${character.personalData.weight} Kg`
                ) : (
                  <CircleQuestionMark className="me-2 h-4 w-4" />
                )}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Droplet className="h-5 w-5 text-accent" />
              <span className="flex items-center">
                {character.personalData.bloodType ? (
                  `${character.personalData.bloodType} type`
                ) : (
                  <CircleQuestionMark className="me-2 h-4 w-4" />
                )}
              </span>
            </div>{" "}
            <div className="flex items-center gap-2 text-sm">
              <Briefcase className="h-5 w-5 text-accent" />
              <span className="flex items-center">
                {character.personalData.occupation ? (
                  `${character.personalData.occupation}`
                ) : (
                  <CircleQuestionMark className="me-2 h-4 w-4" />
                )}
              </span>
            </div>
          </div>
        </div>

        <div className="md:col-span-3 space-y-6">
          <div>
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent font-title">
              {character.name}
            </h1>

            <p className="text-xl text-muted-foreground font-title">
              {character.name_kanji}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {character.nicknames?.map((nick: string, index) => (
              <Badge key={index} variant="default">
                {nick}
              </Badge>
            ))}
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-semibold">About</h2>
            <div className="text-muted-foreground leading-relaxed max-h-[200px] overflow-y-auto">
              {character.about ? (
                <>
                  <div>
                    {showFullAbout
                      ? splitIntoParagarphs(character.about).map((p, i) => (
                          <p key={i} className="mb-4">
                            {p}
                          </p>
                        ))
                      : character.about.length > 400
                      ? `${character.about.substring(0, 400)}...`
                      : character.about}
                  </div>
                  {character.about.length > 400 && (
                    <Button
                      variant="link"
                      className="p-0 h-auto text-accent hover:text-accent/80"
                      onClick={() => setShowFullAbout(!showFullAbout)}
                    >
                      {showFullAbout ? "See less" : "See more"}
                    </Button>
                  )}
                </>
              ) : (
                <p>No info available.</p>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold mb-4">Animes</h2>

            <Carousel
              opts={{
                align: "start",
              }}
              className="mx-10 max-w-5xl"
            >
              <CarouselContent>
                {character.anime.map((anime, index) => (
                  <CarouselItem
                    key={index}
                    className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                    onClick={() => navigate(`/anime/${anime.anime.mal_id}`)}
                  >
                    <div className="p-1">
                      <Card className="group overflow-hidden border-border bg-card hover:border-primary transition-all duration-300 hover:shadow-primary cursor-pointer">
                        <div className="relative aspect-[3/4] overflow-hidden">
                          <img
                            src={anime.anime.images.webp.image_url}
                            alt={anime.anime.title}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                        <CardContent className="flex items-center justify-center py-5">
                          <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                            {anime.anime.title}
                          </h3>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-semibold mb-4">Mangas</h2>

            <Carousel
              opts={{
                align: "start",
              }}
              className="mx-10 max-w-5xl"
            >
              <CarouselContent>
                {character.manga.map((manga, index) => (
                  <CarouselItem
                    key={index}
                    className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                    onClick={() => navigate(`/anime/${manga.manga.mal_id}`)}
                  >
                    <div className="p-1">
                      <Card className="group overflow-hidden border-border bg-card hover:border-primary transition-all duration-300 hover:shadow-primary cursor-pointer">
                        <div className="relative aspect-[3/4] overflow-hidden">
                          <img
                            src={manga.manga.images.webp.image_url}
                            alt={manga.manga.title}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                        <CardContent className="flex items-center justify-center py-5">
                          <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                            {manga.manga.title}
                          </h3>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </div>
      </div>
    </main>
  );
};
