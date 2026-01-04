"use client";

import MenuCarousel from "../menuCarousel/MenuCarousel";
import { Skeleton } from "../common/Loading";
import ErrorMessage from "../common/Error";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

const Menu = ({ initialRecipes = [] }: MenuProps) => {
  const {
    data: recipes = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["recipes"],
    queryFn: async (): Promise<Recipe[]> => {
      const response = await fetch("/api/getAllRecipes", {
        cache: "no-store",
      });
      if (!response.ok) return [];
      const data = await response.json();
      return data.recipes || [];
    },
    staleTime: 0,
    gcTime: 0,
  });

  const displayRecipes =
    recipes.length > 0 ? recipes : isLoading ? [] : initialRecipes;

  const renderContent = () => {
    if (isLoading && !displayRecipes.length) {
      return (
        <div className="flex items-center justify-center">
          <div className="space-y-4">
            <Skeleton variant="rectangular" height={200} className="w-full" />
            <div className="space-y-2">
              <Skeleton variant="text" className="w-3/4" />
              <Skeleton variant="text" className="w-1/2" />
            </div>
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex items-center justify-center">
          <ErrorMessage
            title="Failed to load recipes"
            message="We couldn't load the recipes. Please try again."
            onAction={() => refetch()}
            variant="error"
            className="max-w-md"
          />
        </div>
      );
    }

    if (!displayRecipes.length) {
      return (
        <div className="flex items-center justify-center">
          <div className="text-center py-12">
            <svg
              className="mx-auto h-16 w-16 text-gray-400 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No recipes found
            </h3>
            <p className="text-gray-600">
              Be the first to share a delicious recipe with our community!
            </p>
          </div>
        </div>
      );
    }

    return (
      <MenuCarousel
        totalCards={displayRecipes.length}
        cardWidth={320}
        recipes={displayRecipes}
      />
    );
  };

  return (
    <section
      className="bg-primary-orange-bg grid grid-cols-1 lg:grid-cols-2 p-4 py-6 sm:p-6 md:p-8 lg:px-10 lg:py-0 xl:px-12 xl:py-0 gap-6 sm:gap-8 md:gap-10 xl:gap-12"
      id="menu"
      role="region"
      aria-labelledby="menu-title"
    >
      <div className="flex flex-col justify-center gap-4 sm:gap-5 md:gap-6 lg:pr-6 xl:pr-10">
        <div className="flex flex-col gap-1 sm:gap-2">
          <h2
            id="menu-title"
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-800 animate-fade-in-up leading-tight"
          >
            Discover Amazing
          </h2>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold animate-fade-in-up leading-tight">
            <span className="text-primary-orange bg-gradient-to-r from-primary-orange to-primary-orange-hover bg-clip-text text-transparent mr-1 sm:mr-2">
              Recipes
            </span>
            <svg
              className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 xl:w-14 xl:h-14 inline-block fill-primary-orange animate-bounce-horizontal transition-transform duration-300"
              xmlns="http://www.w3.org/2000/svg"
              height="40px"
              viewBox="0 -960 960 960"
              width="40px"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M673-446.67H160v-66.66h513l-240-240L480-800l320 320-320 320-47-46.67 240-240Z" />
            </svg>
          </h2>
        </div>

        <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-6 sm:leading-7 md:leading-8 animate-fade-in-up delay-200">
          Explore our curated collection of delicious recipes from talented home
          cooks around the world. Find the perfect dish for any occasion.
        </p>

        <div className="flex gap-3 animate-fade-in-up delay-300">
          <Link
            href="/search"
            className="inline-flex items-center px-4 py-2 sm:px-5 sm:py-2.5 text-sm sm:text-base font-medium text-white bg-primary-orange hover:bg-primary-orange-hover rounded-lg transition-all duration-200 transform hover:scale-105 hover:shadow-lg"
          >
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 mr-2"
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
            Search Recipes
          </Link>
        </div>

        {displayRecipes.length > 0 && (
          <div className="text-xs sm:text-sm text-gray-500 animate-fade-in-up delay-400">
            Showing {displayRecipes.length} recipe
            {displayRecipes.length !== 1 ? "s" : ""}
          </div>
        )}
      </div>

      <div className="min-h-[250px] sm:min-h-[300px] md:min-h-[350px] lg:min-h-[400px]">
        {renderContent()}
      </div>
    </section>
  );
};

export default Menu;
