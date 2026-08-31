"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import RecipeCard from "@/components/recipes/RecipeCard";
import ErrorDisplay from "@/components/common/ErrorDisplay";
import AdvancedFilters from "../../components/recipes/AdvancedFilters";
import { Suspense, useState, useEffect } from "react";
import { Search, Beef, UtensilsCrossed, Leaf, Heart, Cake, Sparkles, Frown } from "lucide-react";

function SearchResults() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const urlQuery = searchParams.get("q") || "";
  const [searchInput, setSearchInput] = useState(urlQuery);
  const [searchQuery, setSearchQuery] = useState(urlQuery);
  const [additionalFilters, setAdditionalFilters] = useState<FilterOptions>({});

  useEffect(() => {
    setSearchInput(urlQuery);
    setSearchQuery(urlQuery);
  }, [urlQuery]);

  const {
    data: recipes = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["search", searchQuery, additionalFilters],
    queryFn: async (): Promise<Recipe[]> => {
      if (!searchQuery.trim() && Object.keys(additionalFilters).length === 0)
        return [];

      const response = await fetch("/api/getRecipeByFilter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: searchQuery,
          ...additionalFilters,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to search recipes");
      }

      const data = await response.json();
      return data.recipes || [];
    },
    enabled: !!searchQuery.trim() || Object.keys(additionalFilters).length > 0,
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setSearchQuery(searchInput.trim());
      router.push(`/search?q=${encodeURIComponent(searchInput.trim())}`, {
        scroll: false,
      });
    }
  };

  const handleFilter = (filters: FilterOptions) => {
    setAdditionalFilters(filters);
  };

  const hasSearched =
    searchQuery.trim() || Object.keys(additionalFilters).length > 0;

  return (
    <div className="relative min-h-screen bg-background-light dark:bg-background-dark text-slate-900 dark:text-white transition-colors duration-500 overflow-x-hidden">
      {/* Background Orbs */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-primary-stitch/10 rounded-full blur-[100px] dark:bg-primary-stitch/5"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-orange-400/10 rounded-full blur-[80px] dark:bg-orange-600/5"></div>
      </div>

      <div className="relative z-10 pt-4 sm:pt-8 md:pt-12 pb-16 sm:pb-24 md:pb-32 px-3 xs:px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto">
        {/* Search Header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-stitch/10 border border-primary-stitch/20 text-primary-stitch text-[10px] font-black uppercase tracking-widest mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-stitch opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-stitch"></span>
            </span>
            Explore Flavors
          </div>
          <h1 className="text-2xl xs:text-3xl sm:text-5xl lg:text-7xl font-black tracking-tight leading-[1.1] mb-4 sm:mb-6">
            Find Your Next <br />
            <span className="text-gradient">Masterpiece</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 max-w-xl mx-auto leading-relaxed font-medium">
            Unlock curated collection of premium recipes tailored to your taste. Discovery meets world-class culinary expertise.
          </p>
        </div>

        {/* Search Input Section */}
        <div className="max-w-4xl mx-auto mb-8 sm:mb-12 md:mb-16 px-0 sm:px-2 relative">
          <form
            onSubmit={handleSearch}
            className="glass-panel rounded-3xl p-2 sm:p-3 flex flex-col sm:flex-row gap-2 shadow-2xl shadow-primary-stitch/5"
          >
            <div className="flex-1 relative flex items-center bg-white/50 dark:bg-slate-800/40 rounded-2xl px-4 py-3 border border-white/60 dark:border-white/5 focus-within:ring-2 focus-within:ring-primary-stitch/30 transition-all">
              <Search className="w-6 h-6 text-slate-400 mr-3" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search recipes, ingredients..."
                className="w-full bg-transparent border-none p-0 focus:ring-0 text-base sm:text-lg font-medium text-slate-900 dark:text-white placeholder-slate-400"
              />
              <div className="hidden md:flex items-center gap-1.5 px-2 py-0.5 bg-slate-100 dark:bg-slate-700 rounded text-slate-400 text-[10px] font-bold border border-slate-200 dark:border-slate-600">
                <span>⌘</span>
                <span>K</span>
              </div>
            </div>
            <div className="flex gap-2">
              <AdvancedFilters
                onFilter={handleFilter}
                initialFilters={additionalFilters}
              />
              <button
                type="submit"
                className="flex-1 sm:flex-none px-8 py-3 rounded-2xl bg-slate-900 dark:bg-primary-stitch text-white font-bold hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-primary-stitch/20"
              >
                Search
              </button>
            </div>
          </form>

          {/* Popular/Trending Tags */}
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest py-2 mr-2">
              Popular:
            </span>
            {["Chicken", "Pasta", "Vegan", "Healthy", "Dessert"].map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => {
                  setSearchInput(tag);
                  setSearchQuery(tag);
                  router.push(`/search?q=${encodeURIComponent(tag)}`, {
                    scroll: false,
                  });
                }}
                className="px-4 py-1.5 rounded-full glass-card text-[11px] font-bold text-slate-600 dark:text-slate-400 hover:text-primary-stitch hover:border-primary-stitch transition-colors flex items-center gap-1.5"
              >
                {(() => {
                  const tagIconMap: Record<string, React.ComponentType<{className?: string}>> = {
                    Chicken: Beef,
                    Pasta: UtensilsCrossed,
                    Vegan: Leaf,
                    Healthy: Heart,
                    Dessert: Cake,
                  };
                  const TagIcon = tagIconMap[tag] || Sparkles;
                  return <TagIcon className="w-3.5 h-3.5" />;
                })()}
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Results Metadata */}
        <div className="mb-6 sm:mb-8 md:mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4 border-b border-slate-200 dark:border-white/10 pb-4 sm:pb-6 transition-all">
          <div className="flex items-center gap-4">
            <div className="w-1 h-8 bg-primary-stitch rounded-full"></div>
            <div>
              <h2 className="text-xl xs:text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                {hasSearched ? "Search Results" : "Curated For You"}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">
                {isLoading
                  ? "Searching exceptional recipes..."
                  : `${recipes.length} exceptional recipe${
                      recipes.length !== 1 ? "s" : ""
                    } found`}
              </p>
            </div>
          </div>
        </div>

        {/* Dynamic Content */}
        {!hasSearched && !isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {/* Recommendation placeholders or static featured content could go here */}
            <div className="col-span-full py-10 sm:py-20 text-center glass-card rounded-[2.5rem]">
              <Sparkles className="w-14 h-14 sm:w-16 sm:h-16 text-primary-stitch/20 mb-4 mx-auto" />
              <h3 className="text-xl sm:text-2xl font-bold text-slate-400 mb-2 px-4">
                Ready to find your next masterpiece?
              </h3>
              <p className="text-sm sm:text-base text-slate-400/60 max-w-xs mx-auto px-4">
                Start searching above or explore one of the popular categories.
              </p>
            </div>
          </div>
        ) : isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="glass-card rounded-[2.5rem] p-4 bg-white/20 dark:bg-white/5 animate-pulse"
              >
                <div className="aspect-[4/5] rounded-[2rem] bg-slate-200 dark:bg-slate-800 mb-6"></div>
                <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/2 mb-3"></div>
                <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="glass-panel rounded-[2.5rem] p-10 sm:p-20 text-center border-rose-500/20">
            <ErrorDisplay
              title="Search Failed"
              message="We couldn't complete your search. Please try again."
              onRetry={() => refetch()}
              variant="error"
            />
          </div>
        ) : recipes.length === 0 ? (
          <div className="glass-panel rounded-[2.5rem] p-10 sm:p-20 text-center">
            <Frown className="w-16 h-16 text-slate-300 dark:text-slate-700 mb-6 mx-auto" />
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-3">
              No recipes found
            </h3>
            <p className="text-sm sm:text-base text-slate-500 max-w-xs mx-auto leading-relaxed">
              We couldn&apos;t find any recipes matching your search criteria.
              Try adjusting your filters.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {recipes.map((recipe: Recipe) => (
              <RecipeCard key={recipe._id} recipe={recipe} />
            ))}
          </div>
        )}      </div>
      
      {/* Footer Gradient Over */}
      <div className="pointer-events-none fixed bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background-light dark:from-background-dark to-transparent z-40"></div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background-light dark:bg-background-dark py-4 xs:py-6 sm:py-8 px-3 xs:px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center py-8 xs:py-12 sm:py-16">
              <div className="animate-spin rounded-full h-12 w-12 xs:h-14 xs:w-14 sm:h-16 sm:w-16 border-b-4 border-primary-orange mx-auto mb-3 xs:mb-4"></div>
              <p className="text-sm xs:text-base text-slate-600 dark:text-slate-400 font-medium">
                Loading search page...
              </p>
            </div>
          </div>
        </div>
      }
    >
      <SearchResults />
    </Suspense>
  );
}
