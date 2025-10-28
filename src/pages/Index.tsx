import { useState, useEffect, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { Header } from "@/components/Header";
import { SearchBar } from "@/components/SearchBar";
import { CategoryFilter } from "@/components/CategoryFilter";
import { NewsCard } from "@/components/NewsCard";
import { LoadingGrid } from "@/components/LoadingSkeleton";
import { ErrorState } from "@/components/ErrorState";
import { fetchNews } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CATEGORIES = ["All", "Technology", "Business", "Sports", "Health", "Entertainment", "Science"];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("latest");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [page, setPage] = useState(1);
  const { toast } = useToast();

  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["news", searchQuery, selectedCategory, page, 30],
    queryFn: () => fetchNews(searchQuery, selectedCategory, 30),
    retry: 1,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    setSelectedCategory("All");
    setPage(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleCategoryChange = useCallback((category: string) => {
    setSelectedCategory(category);
    setSearchQuery("latest");
    setPage(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  useEffect(() => {
    if (isError && error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to fetch news";
      
      if (errorMessage.toLowerCase().includes("api key") || errorMessage.toLowerCase().includes("vite_gnews_api_key")) {
        toast({
          title: "API Key Required",
          description: "Create .env and set VITE_GNEWS_API_KEY=your_key (free at gnews.io) then restart dev server.",
          variant: "destructive",
        });
      }
    }
  }, [isError, error, toast]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container py-8 space-y-8">
        {/* Hero Section */}
        <section className="text-center space-y-4 py-8 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Discover the Latest <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">News</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Stay updated with breaking news, trending stories, and insightful articles from around the world
          </p>
        </section>

        {/* Search Bar */}
        <div className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <SearchBar onSearch={handleSearch} initialValue={searchQuery === "latest" ? "" : searchQuery} />
        </div>

        {/* Category Filter */}
        <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <CategoryFilter
            categories={CATEGORIES}
            selectedCategory={selectedCategory}
            onSelectCategory={handleCategoryChange}
          />
        </div>

        {/* Results Info */}
        {!isLoading && !isError && data && (
          <div className="text-center text-sm text-muted-foreground animate-fade-in" style={{ animationDelay: "0.3s" }}>
            Showing {data.articles.length} of {data.totalArticles} articles
          </div>
        )}

        {/* News Grid */}
        {isLoading ? (
          <LoadingGrid />
        ) : isError ? (
          <ErrorState 
            message={error instanceof Error ? error.message : undefined}
            onRetry={() => refetch()} 
          />
        ) : data && data.articles.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in" style={{ animationDelay: "0.4s" }}>
              {data.articles.map((article, index) => (
                <div
                  key={`${article.url}-${index}`}
                  className="animate-fade-in"
                  style={{ animationDelay: `${0.1 * (index % 6)}s` }}
                >
                  <NewsCard article={article} />
                </div>
              ))}
            </div>

            {/* Load More Button - Hidden for now as GNews free tier doesn't support pagination */}
            {/* Keeping this for future enhancement */}
            {false && (
              <div className="flex justify-center pt-8">
                <Button
                  onClick={handleLoadMore}
                  size="lg"
                  variant="outline"
                  className="rounded-full"
                >
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Load More Articles
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12 text-muted-foreground animate-fade-in">
            <p className="text-lg">No articles found. Try a different search or category.</p>
          </div>
        )}
      </main>

      {/* Footer removed per request */}
    </div>
  );
};

export default Index;
