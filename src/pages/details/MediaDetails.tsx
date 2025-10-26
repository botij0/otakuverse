import { useNavigate, useParams } from "react-router";
import { ArrowLeft, Star, Calendar, Tv, Users, Clock } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { getAnimeDetailsAction } from "@/actions/get-anime-details.action copy";
import { topAnimeMock } from "@/mocks/top.anime.mock";

export const MediaDetails = () => {
  // const { mediaType, id } = useParams<{ mediaType: string; id: string }>();
  const navigate = useNavigate();

  // const {
  //   data: media,
  //   isLoading,
  //   error,
  // } = useQuery({
  //   queryKey: ["media", { mediaType, id }],
  //   queryFn: () => getAnimeDetailsAction(id!),
  //   enabled: !!id,
  // });

  const isLoading = false;
  const error = null;
  const media = topAnimeMock.data[0];

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

  if (error || !media) {
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
    <main className="container mx-auto px-4 py-8">
      <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6 group">
        <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
        Back
      </Button>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="space-y-4">
          <div className="relative aspect-[3/4] overflow-hidden rounded-lg border border-border shadow-glow">
            <img
              src={media.images.webp.large_image_url}
              alt={media.title}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="space-y-3 bg-card border border-border rounded-lg p-4">
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 fill-accent text-accent" />
              <span className="font-semibold text-lg">
                {media.score?.toFixed(1) || "N/A"}
              </span>
              <span className="text-sm text-muted-foreground">
                ({media.scored_by?.toLocaleString()} users)
              </span>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <Tv className="h-4 w-4 text-primary" />
              <span>{media.type}</span>
            </div>

            {media.episodes && (
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-primary" />
                <span>{media.episodes} Episodes</span>
              </div>
            )}

            {media.duration && (
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-primary" />
                <span>{media.duration}</span>
              </div>
            )}

            <div className="flex items-center gap-2 text-sm">
              <Users className="h-4 w-4 text-primary" />
              <span>{media.members?.toLocaleString()} members</span>
            </div>
          </div>
        </div>

        <div className="md:col-span-2 space-y-6">
          <div>
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {media.title}
            </h1>
            {media.title_english && media.title_english !== media.title && (
              <p className="text-xl text-muted-foreground">{media.title_english}</p>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {media.genres?.map((genre: any) => (
              <Badge key={genre.mal_id} variant="secondary">
                {genre.name}
              </Badge>
            ))}
            {media.themes?.map((theme: any) => (
              <Badge key={theme.mal_id} variant="outline">
                {theme.name}
              </Badge>
            ))}
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-semibold">Synopsis</h2>
            <p className="text-muted-foreground leading-relaxed">
              {media.synopsis || "No synopsis available."}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 bg-card border border-border rounded-lg p-4">
            <div>
              <p className="text-sm text-muted-foreground">Status</p>
              <p className="font-semibold">{media.status}</p>
            </div>
            {media.aired?.string && (
              <div>
                <p className="text-sm text-muted-foreground">Aired</p>
                <p className="font-semibold">{media.aired.string}</p>
              </div>
            )}
            {media.season && (
              <div>
                <p className="text-sm text-muted-foreground">Season</p>
                <p className="font-semibold capitalize">
                  {media.season} {media.year}
                </p>
              </div>
            )}
            {media.studios?.length > 0 && (
              <div>
                <p className="text-sm text-muted-foreground">Studio</p>
                <p className="font-semibold">{media.studios[0].name}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
