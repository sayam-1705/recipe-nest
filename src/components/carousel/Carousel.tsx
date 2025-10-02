"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/utils/api";

const useGetAllRecipes = () => {
  return useQuery({
    queryKey: ["recipes"],
    queryFn: async (): Promise<Recipe[]> => {
      const response = await apiClient.get("/getAllRecipes");
      return response.data.recipes;
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
      const response = await apiClient.post("/getRecipeBasedOnWeather", {
        lat,
        lon,
      });
      return response.data;
    },
    enabled: enabled && lat !== undefined && lon !== undefined,
    staleTime: 10 * 60 * 1000,
  });
};

const Carousel = () => {
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
      console.log(
        `🌤️ Showing ${weatherData.recipes.length} weather-specific recipes`
      );
      setFinalRecipes(weatherData.recipes.slice(0, 5)); // Limit for better UX
    } else if (allRecipes && allRecipes.length > 0) {
      console.log(
        `📚 No weather recipes found, showing ${Math.min(
          allRecipes.length,
          5
        )} general recipes`
      );
      setFinalRecipes(allRecipes.slice(0, 5));
    } else {
      console.log("❌ No recipes available");
      setFinalRecipes([]);
    }
  }, [weatherData?.recipes, allRecipes]);

  const recipes = finalRecipes;
  const isLoading = recipesLoading || (coordinates && weatherLoading);
  const totalSlides = recipes.length;

  useEffect(() => {
    if (coordinates) return;

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoordinates({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        () => {
          setCoordinates({ lat: 22.70317823887959, lon: 88.46529275336827 });
        }
      );
    } else {
      setCoordinates({ lat: 22.70317823887959, lon: 88.46529275336827 });
    }
  }, [coordinates]);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const goToSlide = (index: number) => setCurrentIndex(index);

  useEffect(() => {
    if (totalSlides > 1) {
      const interval = setInterval(nextSlide, 5000);
      return () => clearInterval(interval);
    }
  }, [nextSlide, totalSlides]);

  return (
    <div
      className="relative w-full bg-gradient-to-br from-gray-50 to-gray-100"
      id="home"
    >
      {weatherData?.weather && (
        <div className="bg-gradient-to-r from-blue-500 to-teal-500 text-white py-2 px-4 text-center">
          <span>
            {weatherData.weather.place}: {weatherData.weather.temperature}°C,{" "}
            {weatherData.weather.description}
          </span>
          {weatherData.recipes && weatherData.recipes.length > 0 ? (
            <span className="ml-4 opacity-80">
              Showing {weatherData.recipes.length} weather-specific recipes
            </span>
          ) : (
            <span className="ml-4 opacity-80">
              No weather-specific recipes found, showing all recipes
            </span>
          )}
        </div>
      )}

      {isLoading ? (
        <div className="h-[500px] flex items-center justify-center bg-primary-orange-bg rounded-2xl">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-orange mx-auto mb-4"></div>
            <p className="text-secondary-green-dark text-lg font-medium">
              Loading recipes...
            </p>
          </div>
        </div>
      ) : recipes.length === 0 ? (
        <div className="h-[500px] flex items-center justify-center bg-primary-orange-bg rounded-2xl">
          <div className="text-center">
            <p className="text-secondary-green-dark text-xl font-medium mb-2">
              No recipes available
            </p>
            <p className="text-gray-600">Please try again later.</p>
          </div>
        </div>
      ) : (
        <div className="relative h-[500px] overflow-hidden rounded-2xl shadow-2xl bg-primary-orange-bg">
          <div
            className="h-full flex transition-transform duration-1000"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {recipes.map((recipe, index) => (
              <div
                key={recipe._id}
                className="w-full h-full flex-shrink-0 pl-24"
              >
                <div className="w-full h-full flex items-center">
                  <div className="flex flex-col justify-center z-10 pr-8 max-w-xl">
                    <h3 className="text-6xl font-bold mb-6 text-secondary-green-dark leading-tight text-left">
                      {recipe.name}
                    </h3>
                    <button
                      onClick={() => router.push(`/showRecipe/${recipe._id}`)}
                      className="text-xl text-color-dark-green font-medium transition-all duration-300 hover:text-primary-orange text-left"
                    >
                      View Recipe
                    </button>
                  </div>
                  <div className="w-2/3 h-[500px] relative overflow-hidden rounded-l-2xl">
                    <Image
                      src={recipe.image}
                      alt={recipe.name}
                      fill
                      className="object-cover transition-transform duration-700 hover:scale-110"
                      priority={index === 0}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {totalSlides > 1 && (
            <div className="absolute bottom-4 left-1/4 transform -translate-x-1/2 flex space-x-2">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-8 h-1 rounded-full transition-all duration-300 ${
                    index === currentIndex ? "bg-primary-orange" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          )}

          {totalSlides > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-4 rounded-full shadow-lg transition-all duration-300"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-4 rounded-full shadow-lg transition-all duration-300"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Carousel;
