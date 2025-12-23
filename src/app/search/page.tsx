"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import RecipeCard from "@/components/recipeCard/RecipeCard";
import ErrorMessage from "@/components/common/Error";
import AdvancedFilters from "@/components/search/AdvancedFilters";
import { Suspense, useState, useEffect } from "react";

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
    staleTime: 2 * 60 * 1000,
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
    <div className="min-h-screen glassmorphism-dark py-4 xs:py-6 sm:py-8 px-3 xs:px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12">
      <div className="max-w-[1920px] mx-auto w-full relative">
        {/* Animated gradient orbs */}
        <div className="absolute top-20 right-10 w-64 h-64 bg-gradient-to-br from-neon-blue/10 to-neon-purple/10 rounded-full blur-3xl animate-float-3d pointer-events-none"></div>
        <div className="absolute bottom-20 left-10 w-64 h-64 bg-gradient-to-br from-neon-pink/10 to-neon-orange/10 rounded-full blur-3xl animate-float-3d delay-500 pointer-events-none"></div>
        
        {/* Search Header */}
        <div className="mb-4 xs:mb-6 sm:mb-8 relative z-10">
          <h1 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-3 xs:mb-4 sm:mb-6 bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink bg-clip-text text-transparent">
            Search Recipes
          </h1>

          {/* Search Form */}
          <div className="glassmorphism border border-neon-blue/30 rounded-lg shadow-[0_0_30px_rgba(0,240,255,0.2)] p-3 xs:p-4 sm:p-5 md:p-6 mb-4 xs:mb-6">
            <form onSubmit={handleSearch} className="space-y-3 xs:space-y-4">
              <div className="flex flex-col sm:flex-row gap-3 xs:gap-4">
                <div className="flex-1">
                  <label
                    htmlFor="search-input"
                    className="block text-xs xs:text-sm font-medium text-gray-300 mb-1.5 xs:mb-2"
                  >
                    Recipe Name
                  </label>
                  <div className="relative">
                    <input
                      id="search-input"
                      type="text"
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
                      placeholder="Search for recipes by name..."
                      className="w-full px-3 xs:px-4 py-2 xs:py-2.5 sm:py-3 pl-9 xs:pl-10 sm:pl-12 text-sm xs:text-base text-white bg-cyber-dark/50 border border-neon-blue/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-neon-purple focus:border-neon-purple transition-all duration-200 placeholder-gray-500"
                    />
                    <svg
                      className="absolute left-2.5 xs:left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 xs:w-5 xs:h-5 text-neon-blue"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                </div>
                <div className="flex flex-col xs:flex-row items-stretch xs:items-end gap-2 xs:gap-3">
                  <button
                    type="submit"
                    className="w-full xs:w-auto px-4 xs:px-5 sm:px-6 py-2 xs:py-2.5 sm:py-3 text-sm xs:text-base text-white bg-gradient-to-r from-neon-blue to-neon-purple hover:from-neon-purple hover:to-neon-pink rounded-lg transition-all duration-300 font-medium transform hover:scale-105 hover:shadow-[0_0_30px_rgba(0,240,255,0.6)] whitespace-nowrap neon-border"
                  >
                    Search
                  </button>
                  <AdvancedFilters
                    onFilter={handleFilter}
                    initialFilters={additionalFilters}
                  />
                </div>
              </div>

              {/* Active Filters Display */}
              {(searchQuery || Object.keys(additionalFilters).length > 0) && (
                <div className="flex flex-wrap items-center gap-1.5 xs:gap-2 pt-2 xs:pt-3 border-t border-neon-blue/20">
                  <span className="text-xs xs:text-sm font-medium text-gray-300 mb-1 xs:mb-0">
                    Active filters:
                  </span>
                  {searchQuery && (
                    <span className="inline-flex items-center px-2 xs:px-3 py-1 rounded-full text-xs xs:text-sm font-medium glassmorphism border border-neon-blue/40 text-neon-blue">
                      Name: &quot;{searchQuery}&quot;
                      <button
                        type="button"
                        onClick={() => {
                          setSearchInput("");
                          setSearchQuery("");
                          router.push("/search", { scroll: false });
                        }}
                        className="ml-1.5 xs:ml-2 text-base xs:text-lg hover:text-neon-purple"
                      >
                        ×
                      </button>
                    </span>
                  )}
                  {Object.entries(additionalFilters).map(([key, value]) =>
                    value ? (
                      <span
                        key={key}
                        className="inline-flex items-center px-2 xs:px-3 py-1 rounded-full text-xs xs:text-sm font-medium glassmorphism border border-neon-purple/40 text-neon-purple"
                      >
                        {key.charAt(0).toUpperCase() + key.slice(1)}: {value}
                        <button
                          type="button"
                          onClick={() => {
                            const newFilters = { ...additionalFilters };
                            delete newFilters[key as keyof FilterOptions];
                            setAdditionalFilters(newFilters);
                          }}
                          className="ml-1.5 xs:ml-2 text-base xs:text-lg hover:opacity-80"
                        >
                          ×
                        </button>
                      </span>
                    ) : null
                  )}
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Results Section */}
        {!hasSearched ? (
          <div className="relative z-10 text-center py-8 xs:py-12 sm:py-16 glassmorphism border border-neon-blue/30 rounded-lg shadow-[0_0_30px_rgba(0,240,255,0.2)]">
            <svg
              className="mx-auto h-12 w-12 xs:h-16 xs:w-16 sm:h-20 sm:w-20 text-neon-blue mb-3 xs:mb-4 animate-neon-pulse"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <h2 className="text-lg xs:text-xl sm:text-2xl font-bold text-white mb-2">
              Find Your Perfect Recipe
            </h2>
            <p className="text-sm xs:text-base text-gray-300 max-w-md mx-auto px-4">
              Enter a recipe name or use advanced filters to discover delicious
              dishes
            </p>
          </div>
        ) : isLoading ? (
          <div className="relative z-10 text-center py-8 xs:py-12 sm:py-16 glassmorphism border border-neon-blue/30 rounded-lg shadow-[0_0_30px_rgba(0,240,255,0.2)]">
            <div className="animate-spin rounded-full h-12 w-12 xs:h-14 xs:w-14 sm:h-16 sm:w-16 border-b-4 border-neon-blue mx-auto mb-3 xs:mb-4"></div>
            <p className="text-sm xs:text-base text-gray-300 font-medium">
              Searching for recipes...
            </p>
          </div>
        ) : error ? (
          <div className="relative z-10 flex items-center justify-center py-8 xs:py-12 sm:py-16">
            <ErrorMessage
              title="Search Failed"
              message="We couldn't complete your search. Please try again."
              onAction={() => refetch()}
              variant="error"
              className="max-w-md"
            />
          </div>
        ) : recipes.length === 0 ? (
          <div className="relative z-10 text-center py-8 xs:py-12 sm:py-16 glassmorphism border border-neon-purple/30 rounded-lg shadow-[0_0_30px_rgba(176,38,255,0.2)] px-4">
            <svg
              className="mx-auto h-12 w-12 xs:h-14 xs:w-14 sm:h-16 sm:w-16 text-neon-purple mb-3 xs:mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="text-base xs:text-lg font-medium text-white mb-2">
              No recipes found
            </h3>
            <p className="text-sm xs:text-base text-gray-300 mb-2 xs:mb-4">
              We couldn&apos;t find any recipes matching your search criteria
            </p>
            <p className="text-xs xs:text-sm text-gray-400">
              Try adjusting your filters or search with different keywords
            </p>
          </div>
        ) : (
          <>
            <div className="relative z-10 mb-4 xs:mb-5 sm:mb-6 flex items-center justify-between">
              <div className="text-xs xs:text-sm text-gray-300 font-medium">
                Found {recipes.length} recipe{recipes.length !== 1 ? "s" : ""}
              </div>
            </div>
            <div className="relative z-10 grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 gap-3 xs:gap-4 sm:gap-5 md:gap-6">
              {recipes.map((recipe: Recipe) => (
                <RecipeCard key={recipe._id} recipe={recipe} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen glassmorphism-dark py-4 xs:py-6 sm:py-8 px-3 xs:px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center py-8 xs:py-12 sm:py-16">
              <div className="animate-spin rounded-full h-12 w-12 xs:h-14 xs:w-14 sm:h-16 sm:w-16 border-b-4 border-neon-blue mx-auto mb-3 xs:mb-4"></div>
              <p className="text-sm xs:text-base text-gray-300 font-medium">
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
