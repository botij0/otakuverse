import { getCharacterDetailsAction } from "@/actions/get-character-details.action";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Star } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import { useState } from "react";

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
    queryFn: () => getCharacterDetailsAction(id!),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <main className="container mx-auto px-4 py-8">
          <Skeleton className="h-8 w-32 mb-8" />
          <div className="grid md:grid-cols-3 gap-8">
            <Skeleton className="h-[500px]" />
            <div className="md:col-span-2 space-y-4">
              <Skeleton className="h-12 w-3/4" />
              <Skeleton className="h-32 w-full" />
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (error || !character) {
    return (
      <div className="min-h-screen bg-background">
        <main className="container mx-auto px-4 py-20 text-center">
          <p className="text-muted-foreground text-lg">
            Failed to load character details.
          </p>
          <Button onClick={() => navigate(-1)} className="mt-4">
            Go Back
          </Button>
        </main>
      </div>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8 text-primary-foreground">
      <Button onClick={() => navigate(-1)} className="mb-6 group" variant={"outline"}>
        <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
        Back
      </Button>

      <div className="grid md:grid-cols-4 gap-y-8 md:gap-x-24">
        <div className="space-y-4">
          <div className="overflow-hidden rounded-lg border shadow">
            <img
              src={character.images.webp.image_url}
              alt={character.name}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="space-y-3 bg-card border border-border rounded-lg p-4">
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 fill-accent text-accent" />
              <span className="font-semibold text-lg">{character.favorites}</span>
              <span className="text-sm text-muted-foreground">users</span>
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
            <div className="text-muted-foreground leading-relaxed">
              {character.about ? (
                <>
                  <p>
                    {showFullAbout
                      ? character.about
                      : character.about.length > 400
                        ? `${character.about.substring(0, 400)}...`
                        : character.about
                    }
                  </p>
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

          <div className="grid grid-cols-2 gap-4 bg-card border border-border rounded-lg p-4"></div>
        </div>
      </div>
    </main>
  );
};
