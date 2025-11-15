import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import {
  ArrowLeft,
  Star,
  Users,
  LibraryBig,
  TableOfContents,
  BookType,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EmptyDetails } from "@/components/custom/EmptyDetails";
import { SkeletonDetails } from "@/components/custom/SkeletonDetails";
import type { Demographic } from "@/interfaces/media";
import { splitIntoParagarphs } from "@/lib/utils";
import { getMangaDetailsAction } from "@/actions/get-manga.actions";

export const MangaDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const {
    data: manga,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["mangaDetails", id],
    queryFn: () => getMangaDetailsAction(+id!),
    enabled: !!id,
  });

  if (isLoading) {
    return <SkeletonDetails />;
  }

  if (error || !manga) {
    return <EmptyDetails />;
  }

  return (
    <main className="container mx-auto px-4 py-8 text-primary-foreground">
      <Button onClick={() => navigate(-1)} className="mb-6 group" variant={"outline"}>
        <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
        Back
      </Button>

      <div className="grid md:grid-cols-4 gap-y-8 gap-x-1 xl:gap-x-24">
        <div className="space-y-4 grid sm:grid-cols-2 lg:grid-cols-1 col-span-4 lg:col-span-1 gap-x-5 h-fit">
          <div className="overflow-hidden rounded-lg border shadow col-span-4 sm:col-span-3 lg:col-span-1">
            <img
              src={manga.images.webp.large_image_url}
              alt={manga.title}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="space-y-3 bg-card border border-border rounded-lg p-4 col-span-4 sm:col-span-1">
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 fill-accent text-accent" />
              <span className="font-semibold text-lg">
                {manga.score?.toFixed(1) || "N/A"}
              </span>
              <span className="text-sm text-muted-foreground">
                ({manga.scored_by?.toLocaleString()} users)
              </span>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <BookType className="h-4 w-4 text-accent" />
              <span>{manga.type}</span>
            </div>

            {manga.chapters && (
              <div className="flex items-center gap-2 text-sm">
                <TableOfContents className="h-4 w-4 text-accent" />
                <span>{manga.chapters} Chapters</span>
              </div>
            )}

            {manga.volumes && (
              <div className="flex items-center gap-2 text-sm">
                <LibraryBig className="h-4 w-4 text-accent" />
                <span>{manga.volumes} Volumes</span>
              </div>
            )}

            <div className="flex items-center gap-2 text-sm">
              <Users className="h-4 w-4 text-accent" />
              <span>{manga.members?.toLocaleString()} members</span>
            </div>
          </div>
        </div>

        <div className="md:col-span-3 space-y-6">
          <div>
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent font-title">
              {manga.title}
            </h1>
            {manga.title_english && manga.title_english !== manga.title && (
              <p className="text-xl text-muted-foreground font-title">
                {manga.title_english}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-semibold">Synopsis</h2>
            <p className="text-muted-foreground leading-relaxed">
              {splitIntoParagarphs(manga.synopsis).map((p, i) => (
                <p key={i} className="mb-3">
                  {p}
                </p>
              ))}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {manga.genres?.map((genre: Demographic) => (
              <Badge key={genre.mal_id} variant="default">
                {genre.name}
              </Badge>
            ))}
            {manga.themes?.map((theme: Demographic) => (
              <Badge key={theme.mal_id} variant="secondary">
                {theme.name}
              </Badge>
            ))}
          </div>

          <div className="flex flex-wrap gap-y-5 gap-x-10 lg:gap-x-20 bg-card border border-border rounded-lg p-4 w-fit">
            <div>
              <p className="text-sm text-muted-foreground">Status</p>
              <p className="font-semibold">{manga.status}</p>
            </div>
            {manga.demographics?.length > 0 && (
              <div>
                <p className="text-sm text-muted-foreground">Demographic</p>
                <p className="font-semibold">{manga.demographics[0].name}</p>
              </div>
            )}
            {manga.authors?.length > 0 && (
              <div>
                <p className="text-sm text-muted-foreground">Author</p>
                <p className="font-semibold">{manga.authors[0].name}</p>
              </div>
            )}
            {manga.published?.string && (
              <div>
                <p className="text-sm text-muted-foreground">Published</p>
                <p className="font-semibold">{manga.published.string}</p>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-semibold">Background</h2>
            <p className="text-muted-foreground leading-relaxed">
              {splitIntoParagarphs(manga.background, 2).map((p, i) => (
                <p key={i} className="mb-3">
                  {p}
                </p>
              ))}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};
