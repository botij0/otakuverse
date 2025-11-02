import { useNavigate, useParams } from "react-router";
import { ArrowLeft, Star, Calendar, Tv, Users, Clock } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { getAnimeDetailsAction } from "@/actions/get-anime-details.action";

export const AnimeDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const {
    data: anime,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["animeDetails", id],
    queryFn: () => getAnimeDetailsAction(id!),
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

  if (error || !anime) {
    return (
      <div className="min-h-screen bg-background">
        <main className="container mx-auto px-4 py-20 text-center">
          <p className="text-muted-foreground text-lg">Failed to load anime details.</p>
          <Button onClick={() => navigate("/")} className="mt-4">
            Go Back Home
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
              src={anime.images.webp.large_image_url}
              alt={anime.title}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="space-y-3 bg-card border border-border rounded-lg p-4">
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 fill-accent text-accent" />
              <span className="font-semibold text-lg">
                {anime.score?.toFixed(1) || "N/A"}
              </span>
              <span className="text-sm text-muted-foreground">
                ({anime.scored_by?.toLocaleString()} users)
              </span>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <Tv className="h-4 w-4 text-accent" />
              <span>{anime.type}</span>
            </div>

            {anime.episodes && (
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-accent" />
                <span>{anime.episodes} Episodes</span>
              </div>
            )}

            {anime.duration && (
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-accent" />
                <span>{anime.duration}</span>
              </div>
            )}

            <div className="flex items-center gap-2 text-sm">
              <Users className="h-4 w-4 text-accent" />
              <span>{anime.members?.toLocaleString()} members</span>
            </div>
          </div>
        </div>

        <div className="md:col-span-3 space-y-6">
          <div>
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent font-title">
              {anime.title}
            </h1>
            {anime.title_english && anime.title_english !== anime.title && (
              <p className="text-xl text-muted-foreground font-title">
                {anime.title_english}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-semibold">Synopsis</h2>
            <p className="text-muted-foreground leading-relaxed">
              {anime.synopsis || "No synopsis available."}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {anime.genres?.map((genre: any) => (
              <Badge key={genre.mal_id} variant="default">
                {genre.name}
              </Badge>
            ))}
            {anime.themes?.map((theme: any) => (
              <Badge key={theme.mal_id} variant="secondary">
                {theme.name}
              </Badge>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4 bg-card border border-border rounded-lg p-4">
            <div>
              <p className="text-sm text-muted-foreground">Status</p>
              <p className="font-semibold">{anime.status}</p>
            </div>
            {anime.aired?.string && (
              <div>
                <p className="text-sm text-muted-foreground">Aired</p>
                <p className="font-semibold">{anime.aired.string}</p>
              </div>
            )}
            {anime.season && (
              <div>
                <p className="text-sm text-muted-foreground">Season</p>
                <p className="font-semibold capitalize">
                  {anime.season} {anime.year}
                </p>
              </div>
            )}
            {anime.studios?.length > 0 && (
              <div>
                <p className="text-sm text-muted-foreground">Studio</p>
                <p className="font-semibold">{anime.studios[0].name}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
