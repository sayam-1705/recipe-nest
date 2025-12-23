"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";

const NutritionChart = dynamic(
  () => import("@/components/nutritionChart/NutritionChart"),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-48 sm:h-56 md:h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-neon-blue"></div>
      </div>
    ),
  }
);

interface RecipeDisplayProps {
  recipeId: string;
}

const RecipeDisplay = ({ recipeId }: RecipeDisplayProps) => {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const recipeResponse = await fetch(`/api/getRecipeById/${recipeId}`);
        if (!recipeResponse.ok) {
          throw new Error("Recipe not found");
        }
        const recipeData = await recipeResponse.json();
        const fetchedRecipe = recipeData.recipe;
        setRecipe(fetchedRecipe);

        if (fetchedRecipe?.userId) {
          const userResponse = await fetch(
            `/api/getUserById/${fetchedRecipe.userId}`
          );
          if (userResponse.ok) {
            const userData = await userResponse.json();
            setUserData(userData.user);
          } else {
            console.warn(`User with ID ${fetchedRecipe.userId} not found`);
          }
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [recipeId]);

  if (loading) {
    return (
      <div className="min-h-screen glassmorphism-dark flex items-center justify-center relative overflow-hidden">
        <div className="absolute top-20 right-10 w-64 h-64 bg-gradient-to-br from-neon-blue/10 to-neon-purple/10 rounded-full blur-3xl animate-float-3d pointer-events-none"></div>
        <div className="text-center relative z-10">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-neon-blue mx-auto mb-4 shadow-[0_0_20px_rgba(0,240,255,0.5)]"></div>
          <p className="text-white text-lg font-medium neon-text">Loading recipe...</p>
          <p className="text-gray-300 text-sm mt-2">
            Fetching recipe and creator details
          </p>
        </div>
      </div>
    );
  }

  if (error || !recipe) {
    return (
      <div className="min-h-screen glassmorphism-dark flex items-center justify-center relative overflow-hidden">
        <div className="absolute bottom-20 left-10 w-64 h-64 bg-gradient-to-br from-neon-pink/10 to-red-600/10 rounded-full blur-3xl animate-float-3d delay-500 pointer-events-none"></div>
        <div className="text-center relative z-10 glassmorphism border border-neon-pink/30 rounded-2xl p-8 shadow-[0_0_30px_rgba(255,0,110,0.2)]">
          <div className="text-4xl mb-4 animate-neon-pulse">😞</div>
          <p className="text-white text-lg font-medium mb-2">Recipe not found</p>
          <p className="text-gray-300 text-sm">
            {error || "The recipe you are looking for does not exist"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <article className="min-h-screen glassmorphism-dark relative overflow-hidden">
      {/* Animated gradient orbs */}
      <div className="absolute top-20 right-10 w-96 h-96 bg-gradient-to-br from-neon-blue/10 to-neon-purple/10 rounded-full blur-3xl animate-float-3d pointer-events-none"></div>
      <div className="absolute bottom-40 left-10 w-96 h-96 bg-gradient-to-br from-neon-pink/10 to-neon-orange/10 rounded-full blur-3xl animate-float-3d delay-500 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-12 relative z-10">
        <header className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 mb-10 sm:mb-12 md:mb-16">
          <div className="flex justify-center items-center animate-fade-in-up order-2 lg:order-1">
            <div className="relative group overflow-hidden rounded-2xl shadow-[0_0_40px_rgba(0,240,255,0.3)] hover:shadow-[0_0_60px_rgba(0,240,255,0.5)] transition-all duration-700 ease-out w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl aspect-square border border-neon-blue/30">
              <Image
                className="transition-all duration-700 group-hover:scale-110 filter brightness-100 group-hover:brightness-110 w-full h-full object-cover"
                src={recipe.image}
                alt={recipe.name}
                width={600}
                height={600}
                priority
                sizes="(max-width: 640px) 320px, (max-width: 768px) 384px, (max-width: 1024px) 448px, (max-width: 1280px) 512px, 576px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cyber-dark/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
            </div>
          </div>

          <div className="flex flex-col justify-center space-y-6 sm:space-y-8 p-4 sm:p-6 md:p-8 animate-fade-in-up delay-200 order-1 lg:order-2">
            <div className="space-y-4 sm:space-y-6">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium text-white leading-tight animate-fade-in-up delay-300 tracking-tight bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink bg-clip-text text-transparent">
                {recipe.name}
              </h1>

              {userData?.name && (
                <div className="flex flex-col sm:flex-row sm:items-center justify-between animate-fade-in-up delay-400 gap-4 sm:gap-0">
                  <div className="flex items-center space-x-3 sm:space-x-4 group cursor-pointer hover:scale-105 transition-transform duration-300">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-gradient-to-br from-neon-blue to-neon-purple rounded-full flex items-center justify-center text-white font-medium text-sm sm:text-base md:text-xl shadow-[0_0_20px_rgba(0,240,255,0.5)] group-hover:shadow-[0_0_30px_rgba(0,240,255,0.7)] transition-all duration-300">
                      {userData.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-white font-medium text-base sm:text-lg group-hover:text-neon-blue transition-colors duration-300">
                        By {userData.name}
                      </p>
                      <p className="text-gray-400 text-xs sm:text-sm">
                        {new Date().toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <RecipeTags recipe={recipe} />
          </div>
        </header>

        <IngredientsSection recipe={recipe} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10">
          <NutritionSection recipe={recipe} />
          <InstructionsSection recipe={recipe} />
        </div>
      </div>
    </article>
  );
};

const RecipeTags = ({ recipe }: { recipe: Recipe }) => (
  <div className="space-y-4 sm:space-y-6 animate-fade-in-up delay-500">
    <div className="flex flex-wrap gap-2 sm:gap-3">
      <TagBadge icon="🏆" label={recipe.type} color="slate" />
      <TagBadge icon="🍽️" label={recipe.meal} color="emerald" />
      <TagBadge icon="⏰" label={recipe.time} color="amber" />
      <TagBadge icon="📊" label={recipe.difficulty} color="red" />
      <TagBadge icon="☀️" label={recipe.season} color="teal" />
      <TagBadge icon="🌟" label={recipe.occasion} color="purple" />
      <TagBadge icon="🥗" label={recipe.dietaryType} color="green" />
    </div>
  </div>
);

const TagBadge = ({
  icon,
  label,
  color,
}: {
  icon: string;
  label: string;
  color: string;
}) => {
  const colorMap: { [key: string]: string } = {
    slate: "glassmorphism border-neon-blue/40 text-neon-blue",
    emerald: "glassmorphism border-neon-green/40 text-neon-green",
    amber: "glassmorphism border-neon-yellow/40 text-neon-yellow",
    red: "glassmorphism border-neon-pink/40 text-neon-pink",
    teal: "glassmorphism border-neon-blue/40 text-neon-blue",
    purple: "glassmorphism border-neon-purple/40 text-neon-purple",
    green: "glassmorphism border-neon-green/40 text-neon-green",
  };

  return (
    <span
      className={`px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 ${colorMap[color] || colorMap.slate} rounded-full text-xs sm:text-sm font-medium hover:scale-105 transform transition-all duration-300 cursor-pointer shadow-sm hover:shadow-[0_0_15px_rgba(0,240,255,0.3)] flex items-center gap-1 sm:gap-2`}
    >
      <span className="text-xs sm:text-sm">{icon}</span>
      <span className="whitespace-nowrap">{label}</span>
    </span>
  );
};

const IngredientsSection = ({ recipe }: { recipe: Recipe }) => (
  <section className="glassmorphism border border-neon-blue/30 rounded-2xl sm:rounded-3xl shadow-[0_0_30px_rgba(0,240,255,0.2)] p-4 sm:p-6 md:p-8 lg:p-10 mb-8 sm:mb-10 md:mb-12 hover:shadow-[0_0_40px_rgba(0,240,255,0.3)] transition-all duration-500 transform hover:-translate-y-1 animate-fade-in-up delay-600">
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 md:mb-10 gap-3 sm:gap-4">
      <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-white flex items-center gap-2 sm:gap-3 md:gap-4 tracking-wide">
        <span className="text-lg sm:text-xl md:text-2xl">🥘</span>
        Ingredients
      </h2>
      <div className="text-sm sm:text-base md:text-lg lg:text-xl font-medium text-white glassmorphism-dark px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 md:py-3 rounded-full border border-neon-purple/40 shadow-sm">
        Servings: {recipe.servings}
      </div>
    </div>

    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
      {recipe.ingredients.map((ingredient, idx) => (
        <div
          className="group glassmorphism-dark p-3 sm:p-4 md:p-5 lg:p-6 rounded-xl sm:rounded-2xl border border-neon-blue/20 hover:border-neon-purple/40 hover:shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-all duration-500 cursor-pointer hover:-translate-y-1 animate-fade-in-up"
          key={idx}
          style={{ animationDelay: `${0.7 + idx * 0.05}s` }}
        >
          <div className="text-center space-y-2 sm:space-y-3">
            <div className="text-sm sm:text-base md:text-lg font-semibold text-neon-blue group-hover:text-neon-purple transition-colors duration-300">
              {ingredient.quantity}
            </div>
            <div className="text-xs sm:text-sm text-gray-300 group-hover:text-white transition-colors duration-300 font-medium line-clamp-2">
              {ingredient.name}
            </div>
          </div>
        </div>
      ))}
    </div>
  </section>
);

const NutritionSection = ({ recipe }: { recipe: Recipe }) => {
  const nutritionData = recipe.nutritionPerServing
    ? {
        calories:
          recipe.nutritionPerServing.calories ||
          recipe.nutritionPerServing.ENERC_KCAL ||
          0,
        ENERC_KCAL:
          recipe.nutritionPerServing.ENERC_KCAL ||
          recipe.nutritionPerServing.calories ||
          0,
        PROCNT_KCAL: recipe.nutritionPerServing.PROCNT_KCAL || 0,
        FAT_KCAL: recipe.nutritionPerServing.FAT_KCAL || 0,
        CHOCDF_KCAL: recipe.nutritionPerServing.CHOCDF_KCAL || 0,
      }
    : {
        calories: 0,
        ENERC_KCAL: 0,
        PROCNT_KCAL: 0,
        FAT_KCAL: 0,
        CHOCDF_KCAL: 0,
      };

  return (
    <section className="glassmorphism border border-neon-purple/30 rounded-2xl sm:rounded-3xl shadow-[0_0_30px_rgba(176,38,255,0.2)] p-4 sm:p-6 md:p-8 lg:p-10 hover:shadow-[0_0_40px_rgba(176,38,255,0.3)] transition-all duration-500 transform hover:-translate-y-1 animate-fade-in-up delay-800">
      <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-white mb-4 sm:mb-6 md:mb-8 lg:mb-10 flex items-center gap-2 sm:gap-3 md:gap-4 tracking-wide">
        <span className="text-lg sm:text-xl md:text-2xl">📊</span>
        Nutrition Info
      </h2>
      <div className="transform transition-transform duration-500">
        {recipe.nutritionPerServing ? (
          <NutritionChart nutritionData={nutritionData} />
        ) : (
          <div className="flex items-center justify-center h-48 sm:h-56 md:h-64 glassmorphism-dark rounded-2xl border-2 border-dashed border-neon-purple/40">
            <div className="text-center p-4">
              <div className="text-2xl sm:text-3xl md:text-4xl mb-3 sm:mb-4">
                📊
              </div>
              <p className="text-gray-300 text-sm sm:text-base md:text-lg font-medium">
                Nutrition information not available
              </p>
              <p className="text-gray-400 text-xs sm:text-sm mt-1 sm:mt-2">
                Nutrition data will be calculated when available
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

const InstructionsSection = ({ recipe }: { recipe: Recipe }) => (
  <section className="glassmorphism border border-neon-pink/30 rounded-2xl sm:rounded-3xl shadow-[0_0_30px_rgba(255,0,110,0.2)] p-4 sm:p-6 md:p-8 lg:p-10 hover:shadow-[0_0_40px_rgba(255,0,110,0.3)] transition-all duration-500 transform hover:-translate-y-1 animate-fade-in-up delay-900">
    <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-white mb-4 sm:mb-6 md:mb-8 lg:mb-10 flex items-center gap-2 sm:gap-3 md:gap-4 tracking-wide">
      <span className="text-lg sm:text-xl md:text-2xl">📝</span>
      Instructions
    </h2>
    <div className="space-y-4 sm:space-y-6">
      {recipe.instructions.map((instruction, idx) => (
        <div
          key={idx}
          className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl glassmorphism-dark border border-neon-blue/20 hover:border-neon-purple/40 hover:shadow-[0_0_15px_rgba(0,240,255,0.3)] transition-all duration-300 animate-fade-in-up"
          style={{ animationDelay: `${1 + idx * 0.05}s` }}
        >
          <div className="flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-gradient-to-br from-neon-blue to-neon-purple text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-medium shadow-[0_0_10px_rgba(0,240,255,0.5)]">
            {idx + 1}
          </div>
          <p className="text-gray-300 leading-relaxed hover:text-white transition-colors duration-300 font-medium text-sm sm:text-base">
            {instruction}
          </p>
        </div>
      ))}
    </div>
  </section>
);

export default RecipeDisplay;
