import axios from "axios";
import mongoose from "mongoose";
import Image from "next/image";

const ShowRecipe = async ({
  params,
}: {
  params: Promise<{ recipeId: mongoose.Types.ObjectId }>;
}) => {
  const { recipeId } = await params;

  const recipe = await axios.get(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/getRecipeById/${recipeId}`
  );

  const recipeData = recipe?.data?.recipe;
  console.log("Recipe Data:", recipeData);

  const user = await axios.get(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/getUserById/${recipeData.userId}`
  );

  const userData = user?.data?.user;

  console.log("User Data:", userData);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-6xl mx-auto p-6">
        {/* Main Recipe Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Image Section */}
            <div className="relative h-80 md:h-96 bg-gradient-to-br from-gray-200 to-gray-300 overflow-hidden group">
              <Image
                src={recipeData.image}
                alt={recipeData.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
            </div>

            {/* Recipe Info Section */}
            <div className="p-8 space-y-6">
              <div className="space-y-4">
                <h1 className="text-4xl font-bold text-gray-800 leading-tight animate-fade-in">
                  {recipeData.name}
                </h1>
                
                {/* Author and Date */}
                <div className="flex items-center justify-between">
                  <div className="relative inline-block group">
                    <div className="text-gray-600 cursor-pointer hover:text-blue-600 transition-all duration-300 flex items-center space-x-2">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                        {userData.name.charAt(0).toUpperCase()}
                      </div>
                      <span>By {userData.name}</span>
                    </div>
                    <div className="absolute left-0 top-full mt-2 bg-gray-900 text-white text-sm rounded-xl px-4 py-3 opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap z-20 shadow-2xl transform translate-y-2 group-hover:translate-y-0">
                      <div className="font-semibold">{userData.name}</div>
                      <div className="text-gray-300 text-xs">{userData.email}</div>
                      <div className="absolute -top-1 left-4 w-2 h-2 bg-gray-900 transform rotate-45"></div>
                    </div>
                  </div>
                  <div className="text-gray-500 text-sm bg-gray-100 px-3 py-1 rounded-full">
                    {new Date(recipeData.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>

              {/* Recipe Tags */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Recipe Details</h3>
                <div className="flex flex-wrap gap-3">
                  <span className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium border border-blue-200 hover:bg-blue-100 transition-colors duration-200 hover:scale-105 transform">
                    {recipeData.type}
                  </span>
                  <span className="px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm font-medium border border-green-200 hover:bg-green-100 transition-colors duration-200 hover:scale-105 transform">
                    {recipeData.meal}
                  </span>
                  <span className="px-4 py-2 bg-purple-50 text-purple-700 rounded-full text-sm font-medium border border-purple-200 hover:bg-purple-100 transition-colors duration-200 hover:scale-105 transform">
                    {recipeData.time}
                  </span>
                  <span className="px-4 py-2 bg-orange-50 text-orange-700 rounded-full text-sm font-medium border border-orange-200 hover:bg-orange-100 transition-colors duration-200 hover:scale-105 transform">
                    {recipeData.difficulty}
                  </span>
                  <span className="px-4 py-2 bg-pink-50 text-pink-700 rounded-full text-sm font-medium border border-pink-200 hover:bg-pink-100 transition-colors duration-200 hover:scale-105 transform">
                    {recipeData.season}
                  </span>
                  <span className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full text-sm font-medium border border-indigo-200 hover:bg-indigo-100 transition-colors duration-200 hover:scale-105 transform">
                    {recipeData.occasion}
                  </span>
                  <span className="px-4 py-2 bg-gray-50 text-gray-700 rounded-full text-sm font-medium border border-gray-200 hover:bg-gray-100 transition-colors duration-200 hover:scale-105 transform">
                    {recipeData.servings} servings
                  </span>
                </div>
              </div>

              {/* Nutrition Information */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Nutrition per serving</h3>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                  <div className="bg-gradient-to-br from-red-50 to-red-100 p-4 rounded-xl border border-red-200 hover:shadow-md transition-all duration-300">
                    <div className="text-xs text-red-600 font-medium uppercase tracking-wide">Calories</div>
                    <div className="text-2xl font-bold text-red-700">{recipeData.nutritionPerServing.calories}</div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200 hover:shadow-md transition-all duration-300">
                    <div className="text-xs text-blue-600 font-medium uppercase tracking-wide">Energy</div>
                    <div className="text-2xl font-bold text-blue-700">{recipeData.nutritionPerServing.ENERC_KCAL}</div>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl border border-green-200 hover:shadow-md transition-all duration-300">
                    <div className="text-xs text-green-600 font-medium uppercase tracking-wide">Protein</div>
                    <div className="text-2xl font-bold text-green-700">{recipeData.nutritionPerServing.PROCNT_KCAL}g</div>
                  </div>
                  <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-4 rounded-xl border border-yellow-200 hover:shadow-md transition-all duration-300">
                    <div className="text-xs text-yellow-600 font-medium uppercase tracking-wide">Fat</div>
                    <div className="text-2xl font-bold text-yellow-700">{recipeData.nutritionPerServing.FAT_KCAL}g</div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl border border-purple-200 hover:shadow-md transition-all duration-300">
                    <div className="text-xs text-purple-600 font-medium uppercase tracking-wide">Carbs</div>
                    <div className="text-2xl font-bold text-purple-700">{recipeData.nutritionPerServing.CHOCDF_KCAL}g</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Ingredients and Instructions */}
        <div className="grid md:grid-cols-2 gap-8 mt-8">
          {/* Ingredients */}
          <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <div className="w-8 h-8 bg-green-500 rounded-full mr-3 flex items-center justify-center">
                <span className="text-white text-sm">🥬</span>
              </div>
              Ingredients
            </h2>
            <ul className="space-y-3">
              {recipeData.ingredients.map((ingredient: Ingredient, index: number) => (
                <li key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200 group">
                  <span className="font-medium text-gray-800 group-hover:text-gray-900">{ingredient.name}</span>
                  <span className="text-gray-600 bg-white px-3 py-1 rounded-full text-sm font-medium shadow-sm">
                    {ingredient.quantity}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Instructions */}
          <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <div className="w-8 h-8 bg-blue-500 rounded-full mr-3 flex items-center justify-center">
                <span className="text-white text-sm">📝</span>
              </div>
              Instructions
            </h2>
            <ol className="space-y-4">
              {recipeData.instructions.map((instruction: string, index: number) => (
                <li key={index} className="flex group">
                  <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4 group-hover:scale-110 transition-transform duration-200">
                    {index + 1}
                  </div>
                  <p className="text-gray-700 leading-relaxed group-hover:text-gray-900 transition-colors duration-200">
                    {instruction}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowRecipe;
