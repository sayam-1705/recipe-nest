"use client";

import Image from "next/image";
import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { useGetRecipesByWeather, useGetRecipesByWeatherMutation } from "@/queries";

interface WeatherInfo {
  temperature: number;
  place: string;
  description: string;
  details: string;
  humidity: number;
  windSpeed: number;
  cloudCover: number;
  recommendedType: string;
  recommendedMeal: string;
  recommendedDifficulty: string;
  season: string;
}

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();

  const [coordinates, setCoordinates] = useState<{ lat: number; lon: number } | null>(null);
  const [weatherInfo, setWeatherInfo] = useState<WeatherInfo | null>(null);
  const hasInitialized = useRef(false);

  // Use the query hook for initial data fetching
  const { data: weatherData, isLoading: isLoadingWeather, error } = useGetRecipesByWeather(
    coordinates?.lat, 
    coordinates?.lon, 
    !!coordinates
  );

  // Use mutation for manual refreshes
  const weatherRecipesMutation = useGetRecipesByWeatherMutation();

  const recipeData = weatherData?.recipes || [];
  const totalSlides = Array.isArray(recipeData) ? recipeData.length : 0;

  // Get coordinates on mount
  useEffect(() => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCoordinates({ lat: latitude, lon: longitude });
        },
        (error) => {
          console.error("Error getting location:", error);
          // Fallback: use London coordinates
          setCoordinates({ lat: 51.5074, lon: -0.1278 });
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      // Fallback: use London coordinates
      setCoordinates({ lat: 51.5074, lon: -0.1278 });
    }
  }, []);

  // Update weather info when data changes
  useEffect(() => {
    if (weatherData?.weather) {
      setWeatherInfo(weatherData.weather);
    }
  }, [weatherData]);

  const refreshWeatherRecipes = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCoordinates({ lat: latitude, lon: longitude });
          setCurrentIndex(0); // Reset carousel to first slide
        },
        (error) => {
          console.error("Error getting location for refresh:", error);
          // Fallback: use London coordinates
          setCoordinates({ lat: 51.5074, lon: -0.1278 });
          setCurrentIndex(0);
        }
      );
    }
  };

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === totalSlides - 1 ? 0 : prevIndex + 1
    );
  }, [totalSlides]);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? totalSlides - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <div
      className="relative w-full bg-gradient-to-br from-gray-50 to-gray-100"
      id="home"
    >
      {/* Weather Information Banner */}
      {weatherInfo && (
        <div className="bg-gradient-to-r from-blue-500 to-teal-500 text-white py-2 px-4 text-center text-sm relative">
          <span className="font-medium">
            Weather in {weatherInfo.place}: {weatherInfo.temperature}°C, {weatherInfo.description}
          </span>
          <span className="ml-4 opacity-80">
            Recipes recommended for {weatherInfo.recommendedType} • {weatherInfo.recommendedMeal}
          </span>
          <button
            onClick={refreshWeatherRecipes}
            disabled={isLoadingWeather}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 flex items-center gap-1"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            {isLoadingWeather ? 'Updating...' : 'Refresh'}
          </button>
        </div>
      )}
      
      {isLoadingWeather ? (
        <div className="relative h-[500px] overflow-hidden rounded-2xl shadow-2xl bg-primary-orange-bg flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-orange mx-auto mb-4"></div>
            <p className="text-secondary-green-dark text-lg font-medium">
              Finding recipes perfect for your weather...
            </p>
          </div>
        </div>
      ) : !Array.isArray(recipeData) || recipeData.length === 0 ? (
        <div className="relative h-[500px] overflow-hidden rounded-2xl shadow-2xl bg-primary-orange-bg flex items-center justify-center">
          <div className="text-center">
            <p className="text-secondary-green-dark text-xl font-medium mb-2">
              No recipes found for current weather conditions
            </p>
            <p className="text-gray-600">
              Try allowing location access or check back later
            </p>
          </div>
        </div>
      ) : (
        <div className="relative h-[500px] overflow-hidden rounded-2xl shadow-2xl bg-primary-orange-bg transition-shadow duration-500 hover:shadow-3xl">
        <div
          className="h-[500px] flex transition-transform duration-1000 ease-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {Array.isArray(recipeData) && recipeData.map((recipe: Recipe, index) => (
            <div key={index} className="w-full h-full flex-shrink-0 pl-24">
              <div className="w-full h-full flex items-center">
                <div className="flex flex-col justify-center z-10 pr-8 max-w-xl">
                  <div className="transform transition-all duration-700 ease-out animate-fade-in-up delay-400">
                    <h3 className="text-6xl font-bold mb-6 text-secondary-green-dark bg-clip-text leading-tight transition-all duration-500 hover:scale-105 break-words">
                      {recipe.name}
                    </h3>
                    <button
                      onClick={() => router.push(`/showRecipe/${recipe._id}`)}
                      className="relative text-xl text-color-dark-green font-medium transition-all duration-300 hover:text-primary-orange after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary-orange after:transition-all after:duration-300 hover:after:w-full transform hover:scale-105 hover:translate-x-1"
                    >
                      View Recipe
                    </button>
                  </div>
                </div>

                <div className="w-2/3 h-[500px] relative overflow-hidden rounded-l-2xl shadow-xl animate-fade-in-up delay-600">
                  <Image
                    src={recipe.image}
                    alt={recipe.name}
                    fill
                    className="object-cover hover:scale-110 transition-transform duration-700 ease-out"
                    priority={index === 0}
                  />
                  <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-black/20 transition-opacity duration-500 hover:opacity-75"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="absolute bottom-4 left-1/4 transform -translate-x-1/2 flex space-x-2 z-20 animate-fade-in-up delay-1000">
          {Array.from({ length: totalSlides }).map((_, dotIndex) => (
            <button
              key={dotIndex}
              onClick={() => goToSlide(dotIndex)}
              className={`w-8 h-1 rounded-full transition-all duration-300 transform hover:scale-110 ${
                dotIndex === currentIndex
                  ? "bg-primary-orange scale-125 shadow-lg"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to slide ${dotIndex + 1}`}
            />
          ))}
        </div>

        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-neutral-white/90 backdrop-blur-sm hover:bg-neutral-white text-neutral-800 p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl z-20 animate-fade-in-up delay-500 hover:-translate-x-0.5"
          aria-label="Previous slide"
        >
          <svg
            className="w-6 h-6 transition-transform duration-200 hover:-translate-x-0.5"
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
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-neutral-white/90 backdrop-blur-sm hover:bg-neutral-white text-neutral-800 p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl z-20 animate-fade-in-up delay-500 hover:translate-x-0.5"
          aria-label="Next slide"
        >
          <svg
            className="w-6 h-6 transition-transform duration-200 hover:translate-x-0.5"
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
      </div>
      )}
    </div>
  );
};

export default Carousel;
