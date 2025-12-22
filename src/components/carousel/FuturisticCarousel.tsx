"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import ParticleBackground from "../3d/ParticleBackground";

const useGetAllRecipes = () => {
  return useQuery({
    queryKey: ["recipes"],
    queryFn: async (): Promise<Recipe[]> => {
      const response = await fetch("/api/getAllRecipes");
      if (!response.ok) throw new Error("Failed to fetch recipes");
      const data = await response.json();
      return data.recipes;
    },
    staleTime: 5 * 60 * 1000,
  });
};

const useGetRecipesByWeather = (
  lat?: number,
  lon?: number,
  enabled: boolean = true
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
      });
      if (!response.ok) throw new Error("Failed to fetch weather recipes");
      return response.json();
    },
    enabled: enabled && lat !== undefined && lon !== undefined,
    staleTime: 10 * 60 * 1000,
  });
};

export default function FuturisticCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [coordinates, setCoordinates] = useState<{
    lat: number;
    lon: number;
  } | null>(null);
  const [finalRecipes, setFinalRecipes] = useState<Recipe[]>([]);
  const router = useRouter();

  const { data: allRecipes, isLoading: recipesLoading } = useGetAllRecipes();
  const { data: weatherData, isLoading: weatherLoading } =
    useGetRecipesByWeather(coordinates?.lat, coordinates?.lon, !!coordinates);

  useEffect(() => {
    if (weatherData?.recipes && weatherData.recipes.length > 0) {
      setFinalRecipes(weatherData.recipes.slice(0, 5));
    } else if (allRecipes && allRecipes.length > 0) {
      setFinalRecipes(allRecipes.slice(0, 5));
    } else {
      setFinalRecipes([]);
    }
  }, [weatherData?.recipes, allRecipes, weatherData]);

  const recipes = finalRecipes;
  const isLoading = recipesLoading || (coordinates && weatherLoading);
  const totalSlides = recipes.length;

  useEffect(() => {
    if (coordinates) return;
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCoordinates({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      });
    }
  }, [coordinates]);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  useEffect(() => {
    if (totalSlides === 0) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide, totalSlides]);

  const handleViewRecipe = (recipeId: string) => {
    router.push(`/showRecipe/${recipeId}`);
  };

  if (isLoading) {
    return (
      <div className="relative min-h-screen flex items-center justify-center">
        <ParticleBackground />
        <div className="text-center z-10">
          <div className="w-20 h-20 border-4 border-neon-blue border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl text-neon-blue neon-text animate-neon-pulse">
            Loading Recipes...
          </p>
        </div>
      </div>
    );
  }

  if (recipes.length === 0) {
    return (
      <div className="relative min-h-screen flex items-center justify-center">
        <ParticleBackground />
        <div className="text-center z-10">
          <h2 className="text-4xl font-bold text-neon-purple neon-text mb-4">
            No Recipes Found
          </h2>
          <p className="text-gray-400">Start by adding some recipes!</p>
        </div>
      </div>
    );
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-20">
      <ParticleBackground />
      
      {/* Hero Title */}
      <div className="absolute top-32 left-1/2 transform -translate-x-1/2 z-10 text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink bg-clip-text text-transparent animate-slide-in-3d">
          RecipeNest
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 animate-fade-in-up">
          Discover Your Next Culinary Adventure
        </p>
      </div>

      {/* Carousel Container */}
      <div className="container mx-auto px-4 z-10 mt-20">
        <div className="relative max-w-5xl mx-auto">
          {/* Recipe Cards */}
          <div className="relative h-[500px] md:h-[600px] flex items-center justify-center">
            {recipes.map((recipe, index) => {
              const offset = index - currentIndex;
              const isActive = offset === 0;
              
              return (
                <div
                  key={recipe._id}
                  className={`absolute transition-all duration-700 ease-out transform ${
                    isActive
                      ? "scale-100 z-30 opacity-100"
                      : offset === -1 || offset === totalSlides - 1
                      ? "scale-75 -translate-x-[400px] z-10 opacity-50"
                      : offset === 1 || offset === -(totalSlides - 1)
                      ? "scale-75 translate-x-[400px] z-10 opacity-50"
                      : "scale-50 opacity-0 z-0"
                  }`}
                  style={{
                    transform: `
                      translateX(${offset * 400}px) 
                      scale(${isActive ? 1 : 0.75})
                      rotateY(${offset * 15}deg)
                    `,
                  }}
                >
                  <div className="card-futuristic p-8 w-[350px] md:w-[450px] transform-3d hover:scale-105 transition-all duration-300">
                    {/* Recipe Image */}
                    <div className="relative h-64 mb-6 rounded-lg overflow-hidden border-2 border-neon-blue/30">
                      <Image
                        src={recipe.image || "/images/placeholder-recipe.jpg"}
                        alt={recipe.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 350px, 450px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-cyber-dark/90 to-transparent"></div>
                    </div>

                    {/* Recipe Info */}
                    <div className="space-y-4">
                      <h3 className="text-3xl font-bold text-neon-blue neon-text">
                        {recipe.name}
                      </h3>
                      
                      <p className="text-gray-300 text-sm line-clamp-3">
                        {recipe.description}
                      </p>

                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-2 text-neon-purple">
                          <span>⏱️</span>
                          <span>{recipe.cookTime || "30"} min</span>
                        </div>
                        <div className="flex items-center gap-2 text-neon-green">
                          <span>👥</span>
                          <span>{recipe.servings || "4"} servings</span>
                        </div>
                      </div>

                      <button
                        onClick={() => handleViewRecipe(recipe._id)}
                        className="btn-futuristic w-full mt-4"
                      >
                        <span className="relative z-10">View Recipe</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-40 w-12 h-12 rounded-full glassmorphism border border-neon-blue/50 flex items-center justify-center hover:bg-neon-blue/20 transition-all hover-glow"
          >
            <span className="text-2xl text-neon-blue">‹</span>
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-40 w-12 h-12 rounded-full glassmorphism border border-neon-blue/50 flex items-center justify-center hover:bg-neon-blue/20 transition-all hover-glow"
          >
            <span className="text-2xl text-neon-blue">›</span>
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-3 mt-8">
            {recipes.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-neon-blue w-8 shadow-[0_0_10px_rgba(0,240,255,0.8)]"
                    : "bg-gray-600 hover:bg-neon-purple"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Weather Info */}
      {weatherData?.weather && (
        <div className="absolute bottom-10 right-10 glassmorphism-dark px-6 py-4 rounded-lg border border-neon-purple/30 z-10">
          <p className="text-sm text-gray-400 mb-1">Recommended for</p>
          <p className="text-lg font-semibold text-neon-purple">
            {weatherData.weather.description} • {Math.round(weatherData.weather.temp)}°C
          </p>
        </div>
      )}
    </section>
  );
}
