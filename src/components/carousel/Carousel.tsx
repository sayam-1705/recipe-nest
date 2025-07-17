"use client";

import recipeData from "@/mock/recipe.json";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();
  const totalSlides = recipeData.recipes.length;

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
    <div className="relative w-full bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="relative h-[500px] overflow-hidden rounded-2xl shadow-2xl bg-primary-orange-bg transition-shadow duration-500 hover:shadow-3xl">
        <div
          className="h-[500px] flex transition-transform duration-1000 ease-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {recipeData.recipes.map((recipe, index) => (
            <div
              key={index}
              className="w-full h-full flex-shrink-0 pl-24"
            >
              <div className="w-full h-full relative">
                <div className="h-full flex flex-col justify-center absolute z-10 left-0">
                  <div className="transform transition-all duration-700 ease-out animate-fade-in-up delay-400">
                    <h3 className="text-6xl font-bold mb-6 bg-gradient-to-l from-gray-300 to-secondary-green-dark bg-clip-text text-transparent leading-tight transition-all duration-500 hover:scale-105">
                      {recipe.name}
                    </h3>
                    <button
                      onClick={() =>
                        router.push(`/showRecipe/${recipe.userId}`)
                      }
                      className="relative text-xl text-color-dark-green font-medium transition-all duration-300 hover:text-primary-orange after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary-orange after:transition-all after:duration-300 hover:after:w-full transform hover:scale-105 hover:translate-x-1"
                    >
                      View Recipe
                    </button>
                  </div>
                </div>

                <div className="w-2/3 h-[500px] absolute right-0 overflow-hidden rounded-l-2xl shadow-xl animate-fade-in-up delay-600">
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

        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20 animate-fade-in-up delay-1000">
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
    </div>
  );
};

export default Carousel;
