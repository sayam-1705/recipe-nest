import mongoose from "mongoose";
import Image from "next/image";
import recipeData from "@/mock/recipe.json";
import userData from "@/mock/users.json";
import NutritionChart from "@/components/nutritionChart/NutritionChart";

const ShowRecipe = async ({
  params,
}: {
  params: Promise<{ recipeId: mongoose.Types.ObjectId }>;
}) => {
  const { recipeId } = await params;

  const recipe = recipeData.recipes.find((r) => r._id === recipeId.toString());

  if (!recipe) {
    return <div>Recipe not found</div>;
  }

  const user = userData.users.find((u) => u._id === recipe.userId);

  if (!user) {
    return <div>User not found</div>;
  }

  const recipeWithDate = {
    ...recipe,
    createdAt: new Date().toISOString(),
  };

  console.log("Recipe Data:", recipeWithDate);
  console.log("User Data:", user);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div className="flex justify-center items-center animate-fade-in-up">
            <div className="relative group overflow-hidden rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-700 ease-out">
              <Image
                className="transition-all duration-700 group-hover:scale-110 filter brightness-100 group-hover:brightness-110"
                src={recipeWithDate.image}
                alt="Recipe Image"
                width={600}
                height={600}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
            </div>
          </div>

          <div className="flex flex-col justify-center space-y-8 p-8 animate-fade-in-up delay-200">
            <div className="space-y-6">
              <h1 className="text-5xl font-medium text-gray-900 leading-tight animate-fade-in-up delay-300 tracking-tight">
                {recipeWithDate.name}
              </h1>

              <div className="flex items-center justify-between animate-fade-in-up delay-400">
                <div className="flex items-center space-x-4 group cursor-pointer hover:scale-105 transition-transform duration-300">
                  <div className="w-14 h-14 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white font-medium text-xl shadow-lg group-hover:shadow-xl transition-all duration-300">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-gray-800 font-medium text-lg group-hover:text-orange-600 transition-colors duration-300">
                      By {user.name}
                    </p>
                    <p className="text-gray-500 text-sm">
                      {new Date(recipeWithDate.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6 animate-fade-in-up delay-500">
              <div className="flex flex-wrap gap-3">
                <span className="px-6 py-3 bg-slate-50 text-slate-700 rounded-full text-sm font-medium border border-slate-200 hover:bg-slate-100 hover:scale-105 transform transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="16px"
                    viewBox="0 -960 960 960"
                    width="16px"
                    fill="currentColor"
                  >
                    <path d="M280-120v-80h160v-124q-49-11-87.5-41.5T296-442q-75-9-125.5-65.5T120-640v-40q0-33 23.5-56.5T200-760h80v-80h400v80h80q33 0 56.5 23.5T840-680v40q0 76-50.5 132.5T664-442q-18 46-56.5 76.5T520-324v124h160v80H280Zm0-408v-152h-80v40q0 38 22 68.5t58 43.5Zm200 128q50 0 85-35t35-85v-240H360v240q0 50 35 85t85 35Zm200-128q36-13 58-43.5t22-68.5v-40h-80v152Zm-200-52Z" />
                  </svg>
                  {recipeWithDate.type}
                </span>
                <span className="px-6 py-3 bg-emerald-50 text-emerald-700 rounded-full text-sm font-medium border border-emerald-200 hover:bg-emerald-100 hover:scale-105 transform transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="16px"
                    viewBox="0 -960 960 960"
                    width="16px"
                    fill="currentColor"
                  >
                    <path d="M280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM246-720l96 200h280l110-200H246Zm-38-80h590q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130l38 80Zm134 280h280-280Z" />
                  </svg>
                  {recipeWithDate.meal}
                </span>
                <span className="px-6 py-3 bg-amber-50 text-amber-700 rounded-full text-sm font-medium border border-amber-200 hover:bg-amber-100 hover:scale-105 transform transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="16px"
                    viewBox="0 -960 960 960"
                    width="16px"
                    fill="currentColor"
                  >
                    <path d="m612-292 56-56-148-148v-184h-80v216l172 172ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-400Zm0 320q133 0 226.5-93.5T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160Z" />
                  </svg>
                  {recipeWithDate.time}
                </span>
                <span className="px-6 py-3 bg-red-50 text-red-700 rounded-full text-sm font-medium border border-red-200 hover:bg-red-100 hover:scale-105 transform transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="16px"
                    viewBox="0 -960 960 960"
                    width="16px"
                    fill="currentColor"
                  >
                    <path d="M320-240h320v-80H320v80Zm0-160h320v-80H320v80ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z" />
                  </svg>
                  {recipeWithDate.difficulty}
                </span>
                <span className="px-6 py-3 bg-teal-50 text-teal-700 rounded-full text-sm font-medium border border-teal-200 hover:bg-teal-100 hover:scale-105 transform transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="16px"
                    viewBox="0 -960 960 960"
                    width="16px"
                    fill="currentColor"
                  >
                    <path d="M440-760v-160h80v160h-80Zm266 110-55-55 112-115 56 57-113 113Zm54 210v-80h160v80H760ZM440-40v-160h80v160h-80ZM254-650 142-763l56-57 113 113-57 57Zm508 508L650-254l55-56 113 113-56 55ZM40-440v-80h160v80H40Zm157 300-56-57 112-112 29 27 29 28-114 114Zm283-100q-100 0-170-70t-70-170q0-100 70-170t170-70q100 0 170 70t70 170q0 100-70 170t-170 70Z" />
                  </svg>
                  {recipeWithDate.season}
                </span>
                <span className="px-6 py-3 bg-purple-50 text-purple-700 rounded-full text-sm font-medium border border-purple-200 hover:bg-purple-100 hover:scale-105 transform transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="16px"
                    viewBox="0 -960 960 960"
                    width="16px"
                    fill="currentColor"
                  >
                    <path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-197q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm-40-82v-78q-33 0-56.5-23.5T360-320v-40L168-552q-3 18-5.5 36t-2.5 36q0 121 79.5 212T440-162Zm276-102q20-22 36-47.5t26.5-53q10.5-27.5 16-56.5t5.5-59q0-98-54.5-179T600-776v16q0 33-23.5 56.5T520-680h-80v80q0 17-11.5 28.5T400-560h-80v80h240q17 0 28.5 11.5T600-440v120h40q26 0 47 15.5t29 40.5Z" />
                  </svg>
                  {recipeWithDate.occasion}
                </span>
                <span className="px-6 py-3 bg-green-50 text-green-700 rounded-full text-sm font-medium border border-green-200 hover:bg-green-100 hover:scale-105 transform transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="16px"
                    viewBox="0 -960 960 960"
                    width="16px"
                    fill="currentColor"
                  >
                    <path d="M440-501Zm0 381L313-234q-72-65-123.5-116t-85-96q-33.5-45-49-87T40-621q0-94 63-156.5T260-840q52 0 99 22t81 62q34-40 81-62t99-22q94 0 156.5 62.5T840-621q0 46-15.5 88T775-446q-33.5 45-85 96T567-234L440-120Zm0-79q66-60 113-110t79.5-86q32.5-36 46-69t13.5-58q0-62-42.5-105T544-760q-51 0-90 31.5T403-650h-46q-12-77-51-108.5T216-790q-62 0-105 43t-43 105q0 25 13.5 58t46 69q32.5 36 79.5 86T320-319q66 60 120 119Z" />
                  </svg>
                  {recipeWithDate.dietaryType}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg p-10 mb-12 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 animate-fade-in-up delay-600 border border-gray-100">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-4xl font-light text-gray-800 flex items-center gap-4 tracking-wide">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="32px"
                viewBox="0 -960 960 960"
                width="32px"
                fill="#6B7280"
                className="transition-colors duration-300"
              >
                <path d="M222-200 80-342l56-56 85 85 170-170 56 57-225 226Zm0-320L80-662l56-56 85 85 170-170 56 57-225 226Zm298 240v-80h360v80H520Zm0-320v-80h360v80H520Z" />
              </svg>
              Ingredients
            </h2>
            <div className="text-xl font-medium text-gray-600 bg-gray-50 px-6 py-3 rounded-full border border-gray-200 shadow-sm">
              Servings: {recipeWithDate.servings}
            </div>
          </div>

          <div className="grid grid-cols-6 gap-4">
            {recipeWithDate.ingredients.map((ingr, idx) => (
              <div
                className="group bg-gradient-to-br from-white to-gray-50 p-6 rounded-2xl border border-gray-100 hover:border-orange-200 hover:shadow-lg transition-all duration-500 cursor-pointer hover:-translate-y-1 animate-fade-in-up"
                key={idx}
                style={{ animationDelay: `${0.7 + idx * 0.1}s` }}
              >
                <div className="text-center space-y-3">
                  <div className="text-lg font-semibold text-orange-600 group-hover:text-orange-700 transition-colors duration-300">
                    {ingr.quantity}
                  </div>
                  <div className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors duration-300 font-medium">
                    {ingr.name}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg p-10 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 animate-fade-in-up delay-800 border border-gray-100">
            <h2 className="text-4xl font-light text-gray-800 mb-10 flex items-center gap-4 tracking-wide">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="32px"
                viewBox="0 -960 960 960"
                width="32px"
                fill="#6B7280"
                className="transition-colors duration-300"
              >
                <path d="M640-160v-280h160v280H640Zm-240 0v-640h160v640H400Zm-240 0v-440h160v440H160Z" />
              </svg>
              Nutrition Info
            </h2>
            <div className="transform transition-transform duration-500">
              <NutritionChart
                nutritionData={recipeWithDate.nutritionPerServing}
              />
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg p-10 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 animate-fade-in-up delay-900 border border-gray-100">
            <h2 className="text-4xl font-light text-gray-800 mb-10 flex items-center gap-4 tracking-wide">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="32px"
                viewBox="0 -960 960 960"
                width="32px"
                fill="#6B7280"
                className="transition-colors duration-300"
              >
                <path d="M200-200h560v-367L567-760H200v560Zm0 80q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h400l240 240v400q0 33-23.5 56.5T760-120H200Zm80-160h400v-80H280v80Zm0-160h400v-80H280v80Zm0-160h280v-80H280v80Zm-80 400v-560 560Z" />
              </svg>
              Cooking Directions
            </h2>
            <div className="space-y-6">
              {recipeWithDate.instructions.map((instruction, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-r from-gray-50 to-white border border-gray-100 hover:border-orange-200 hover:shadow-md transition-all duration-300 animate-fade-in-up"
                  style={{ animationDelay: `${1 + idx * 0.1}s` }}
                >
                  <div className="flex-shrink-0 w-8 h-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-sm font-medium">
                    {idx + 1}
                  </div>
                  <p className="text-gray-700 leading-relaxed hover:text-gray-900 transition-colors duration-300 font-medium">
                    {instruction}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowRecipe;
