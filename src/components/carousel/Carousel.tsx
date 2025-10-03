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
      setFinalRecipes(weatherData.recipes.slice(0, 5));
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
        <div className="bg-gradient-to-r from-blue-500 to-teal-500 text-white py-2 px-4 text-center text-xs sm:text-sm md:text-base">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-0">
            <span className="text-center">
              {weatherData.weather.place}: {weatherData.weather.temperature}°C,{" "}
              {weatherData.weather.description}
            </span>
            {weatherData.recipes && weatherData.recipes.length > 0 ? (
              <span className="sm:ml-4 opacity-80 text-center">
                Showing {weatherData.recipes.length} weather-specific recipes
              </span>
            ) : (
              <span className="sm:ml-4 opacity-80 text-center">
                No weather-specific recipes found, showing all recipes
              </span>
            )}
          </div>
        </div>
      )}

      {isLoading ? (
        <div className="h-[350px] xs:h-[380px] sm:h-[420px] md:h-[500px] lg:h-[500px] xl:h-[500px] flex items-center justify-center bg-primary-orange-bg">
          <div className="text-center px-4">
            <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-b-2 border-primary-orange mx-auto mb-4"></div>
            <p className="text-secondary-green-dark text-base sm:text-lg font-medium">
              Loading recipes...
            </p>
          </div>
        </div>
      ) : recipes.length === 0 ? (
        <div className="h-[350px] xs:h-[380px] sm:h-[420px] md:h-[500px] lg:h-[500px] xl:h-[500px] flex items-center justify-center bg-primary-orange-bg">
          <div className="text-center px-4">
            <p className="text-secondary-green-dark text-lg sm:text-xl font-medium mb-2">
              No recipes available
            </p>
            <p className="text-gray-600 text-sm sm:text-base">
              Please try again later.
            </p>
          </div>
        </div>
      ) : (
        <div className="relative h-[350px] xs:h-[380px] sm:h-[420px] md:h-[500px] lg:h-[500px] xl:h-[500px] overflow-hidden shadow-2xl bg-primary-orange-bg">
          <div
            className="h-full flex transition-transform duration-1000"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {recipes.map((recipe, index) => (
              <div key={recipe._id} className="w-full h-full flex-shrink-0">
                <div className="w-full h-full flex flex-col md:flex-row items-center justify-center px-4 sm:px-6 md:px-16 lg:px-20 xl:px-24">
                  <div className="flex flex-col justify-center z-10 text-center md:text-left max-md:pt-4 md:pr-8 max-w-xl order-2 md:order-1 px-4 md:px-8 lg:px-12">
                    <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-4 md:mb-6 text-secondary-green-dark leading-tight">
                      {recipe.name}
                    </h3>
                    <button
                      onClick={() => router.push(`/showRecipe/${recipe._id}`)}
                      className="text-sm sm:text-base md:text-lg lg:text-xl text-color-dark-green font-medium transition-all duration-300 hover:text-primary-orange inline-block bg-white/80 hover:bg-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg"
                    >
                      View Recipe
                    </button>
                  </div>
                  <div className="w-full md:w-2/3 h-[200px] xs:h-[220px] sm:h-[250px] md:h-[400px] lg:h-[400px] xl:h-[400px] overflow-hidden rounded-lg sm:rounded-xl md:rounded-l-2xl order-1 md:order-2 px-12 md:px-0">
                    <Image
                      src={recipe.image}
                      alt={recipe.name}
                      width={800}
                      height={400}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-110 rounded-lg"
                      priority={index === 0}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {totalSlides > 1 && (
            <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-1 sm:space-x-2">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-4 sm:w-6 md:w-8 h-1 rounded-full transition-all duration-300 ${
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
                className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-2 sm:p-3 md:p-4 rounded-full shadow-lg transition-all duration-300"
              >
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
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
                className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-2 sm:p-3 md:p-4 rounded-full shadow-lg transition-all duration-300"
              >
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
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
