import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const MediaCardSkeleton = () => {
  return (
    <Card className="overflow-hidden border-border bg-card">
      {/* Image Skeleton */}
      <div className="relative aspect-[3/4] overflow-hidden">
        <Skeleton className="h-full w-full" />

        {/* Score/Rank Skeletons (Optional, but adds to the look) */}
        <div className="absolute top-2 right-2">
          <Skeleton className="h-6 w-10 rounded-md" />
        </div>
        <div className="absolute top-2 left-2">
          <Skeleton className="h-6 w-10 rounded-md" />
        </div>
      </div>

      <CardContent className="p-4 flex flex-col h-auto min-h-[140px]">
        {/* Title Skeleton */}
        <Skeleton className="h-5 w-full mb-2" />
        <Skeleton className="h-5 w-2/3 mb-2" />

        {/* Info Skeleton */}
        <div className="flex items-center gap-2 mb-2">
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-4 w-4 rounded-full" />
          <Skeleton className="h-4 w-16" />
        </div>

        {/* Badges Skeleton */}
        <div className="flex items-center gap-2 mt-auto">
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-5 w-16 rounded-full" />
        </div>
      </CardContent>
    </Card>
  );
};

export default MediaCardSkeleton;
