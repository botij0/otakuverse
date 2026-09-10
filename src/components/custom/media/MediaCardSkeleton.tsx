import { Skeleton } from "@/components/ui/skeleton";

const MediaCardSkeleton = () => {
  return (
    <div className="rounded-md">
      <div className="relative aspect-[3/4] overflow-hidden rounded-md">
        <Skeleton className="h-full w-full" />
        <div className="absolute top-2 right-2">
          <Skeleton className="h-6 w-10 rounded-md" />
        </div>
        <div className="absolute top-2 left-2">
          <Skeleton className="h-6 w-10 rounded-md" />
        </div>
      </div>

      <div className="pt-3 flex flex-col min-h-[116px]">
        <Skeleton className="h-5 w-full mb-2" />
        <Skeleton className="h-5 w-2/3 mb-2" />
        <div className="flex items-center gap-2 mb-2">
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-4 w-16" />
        </div>
        <div className="flex items-center gap-2 mt-auto">
          <Skeleton className="h-5 w-16 rounded-md" />
          <Skeleton className="h-5 w-16 rounded-md" />
        </div>
      </div>
    </div>
  );
};

export default MediaCardSkeleton;
