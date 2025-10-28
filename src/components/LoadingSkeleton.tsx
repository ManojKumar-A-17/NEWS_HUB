import { Card } from "@/components/ui/card";

export const LoadingSkeleton = () => {
  return (
    <Card className="news-card overflow-hidden">
      <div className="aspect-video skeleton" />
      <div className="p-6 space-y-4">
        <div className="flex gap-2">
          <div className="skeleton h-6 w-20 rounded-full" />
          <div className="skeleton h-6 w-24 rounded-full" />
        </div>
        <div className="skeleton h-7 w-full" />
        <div className="skeleton h-7 w-3/4" />
        <div className="space-y-2">
          <div className="skeleton h-4 w-full" />
          <div className="skeleton h-4 w-full" />
          <div className="skeleton h-4 w-2/3" />
        </div>
        <div className="skeleton h-10 w-full rounded-md" />
      </div>
    </Card>
  );
};

export const LoadingGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <LoadingSkeleton key={i} />
      ))}
    </div>
  );
};
