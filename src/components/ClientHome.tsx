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

export default function ClientHome() {
  const [mounted, setMounted] = useState(false);
  const { data: recipes = [] } = useGetAllRecipes();

  useEffect(() => {
    setMounted(true);
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

  const featuredRecipe = recipes.length > 0 ? recipes[0] : undefined;

  return (
    <div className="w-full bg-background-light dark:bg-background-dark min-h-screen font-sans selection:bg-primary selection:text-white">
      <ErrorBoundary>
        <main>
          <HomeHero featuredRecipe={featuredRecipe} />
          <DiscoverySection recipes={recipes} />
          <WorkflowSection />
        </main>
      </ErrorBoundary>
    </div>
  );
}
