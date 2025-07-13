import recipeData from "@/mock/recipe.json";
import usersData from "@/mock/users.json";
import Image from "next/image";
import Link from "next/link";

interface User {
  name: string;
  email: string;
}

const RecipeCard = async () => {
  const recipe: Recipe = recipeData.recipes[0];

  console.log(recipe.userId);

  // Use mock user data directly for now to avoid API issues
  const userData: User | null =
    usersData.users.find((user) => user._id === recipe.userId) || null;

  console.log("userData", userData);

  return (
    <div className="group flex flex-col w-80 bg-white shadow-sm hover:shadow-md transition-all duration-500 ease-out rounded-2xl overflow-hidden border border-gray-100 animate-fade-in-up hover:animate-gentle-float">
      {/* Recipe Image */}
      <div className="relative overflow-hidden rounded-t-2xl">
        <Image
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          src={recipe.image}
          alt={recipe.name}
          height={192}
          width={320}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
      {/* Recipe Content */}
      <div className="p-5 flex-1 flex flex-col">
        {/* Author Info */}
        <div className="flex items-center gap-3 mb-4 animate-fade-in-up delay-200">
          <div className="w-9 h-9 bg-gradient-to-br from-color-orange to-orange-500 rounded-full flex items-center justify-center shadow-sm">
            <span className="text-white font-semibold text-sm">
              {userData?.name?.charAt(0) || "U"}
            </span>
          </div>
          <p className="text-sm text-gray-600 font-medium tracking-wide">
            {userData?.name || "Unknown User"}
          </p>
        </div>

        {/* Recipe Name */}
        <h3 className="text-xl font-bold text-gray-800 mb-4 line-clamp-2 animate-fade-in-up delay-400">
          {recipe.name}
        </h3>

        {/* View Recipe Button */}
        <Link
          href={`/showRecipe/${recipe._id}`}
          className="mt-auto inline-flex items-center justify-center px-5 py-3 bg-gradient-to-r from-color-orange to-orange-500 text-white font-semibold rounded-xl hover:from-orange-600 hover:to-orange-700 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 text-sm animate-fade-in-up delay-600 hover:animate-shimmer"
        >
          View Recipe
          <svg
            className="w-4 h-4 ml-2 transition-transform duration-300 hover:translate-x-1"
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
        </Link>
      </div>
    </div>
  );
};

export default RecipeCard;
