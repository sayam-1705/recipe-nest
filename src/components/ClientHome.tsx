"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import HomeHero from "./home/HomeHero";
import DiscoverySection from "./home/DiscoverySection";
import WorkflowSection from "./home/WorkflowSection";
import ErrorBoundary from "@/components/common/ErrorBoundary";

const useGetAllRecipes = () => {
  return useQuery({
    queryKey: ["recipes"],
    queryFn: async (): Promise<Recipe[]> => {
      const response = await fetch("/api/getAllRecipes", {
        cache: "no-store",
      });
      if (!response.ok) throw new Error("Failed to fetch recipes");
      const data = await response.json();
      return data.recipes;
    },
  });
};

const useGetRecipesByWeather = (
  lat?: number,
  lon?: number,
  enabled: boolean = false
) => {
  return useQuery({
    queryKey: ["recipes", "byWeather", lat, lon],
    queryFn: async (): Promise<{
      recipes: Recipe[];
      weather: WeatherInfo;
      searchStrategy?: string;
      totalRecipes?: number;
    }> => {
      const response = await fetch("/api/getRecipeBasedOnWeather", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lat, lon }),
        cache: "no-store",
      });
      if (!response.ok) throw new Error("Failed to fetch weather recipes");
      return response.json();
    },
    enabled: enabled && lat !== undefined && lon !== undefined,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
};

export default function ClientHome() {
  const [mounted, setMounted] = useState(false);
  const [coordinates, setCoordinates] = useState<{ lat: number; lon: number } | null>(null);
  const { data: recipes = [] } = useGetAllRecipes();

  const { data: weatherData, isLoading: weatherLoading } = useGetRecipesByWeather(
    coordinates?.lat,
    coordinates?.lon,
    !!coordinates
  );

  useEffect(() => {
    setMounted(true);

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoordinates({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        () => {
          console.log("Geolocation permission denied, using general recipes");
        },
        { timeout: 10000, maximumAge: 300000 }
      );
    }
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-slate-600 dark:text-slate-400 font-medium">Loading RecipeNest...</p>
        </div>
      </div>
    );
  }

  // Prefer weather-recommended recipe, fall back to first general recipe
  const weatherRecipes = weatherData?.recipes;
  const featuredRecipe = weatherRecipes && weatherRecipes.length > 0
    ? weatherRecipes[0]
    : recipes.length > 0 ? recipes[0] : undefined;

  return (
    <div className="w-full bg-background-light dark:bg-background-dark min-h-screen font-sans selection:bg-primary selection:text-white">
      <ErrorBoundary>
        <main>
          <HomeHero
            featuredRecipe={featuredRecipe}
            weatherInfo={weatherData?.weather}
            weatherLoading={weatherLoading && !!coordinates}
          />
          <DiscoverySection recipes={recipes} />
          <WorkflowSection />
        </main>
      </ErrorBoundary>
    </div>
  );
}
