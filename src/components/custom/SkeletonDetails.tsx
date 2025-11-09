import { Skeleton } from "../ui/skeleton";

export const SkeletonDetails = () => {
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
};
