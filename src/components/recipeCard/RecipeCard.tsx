"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useGetUserById, useDeleteRecipe } from "@/queries";

const RecipeCard = ({
  isModified = false,
  recipe,
}: {
  isModified?: boolean;
  recipe: Recipe;
}) => {
  const router = useRouter();

  // Fetch user data using React Query
  const { data: userData } = useGetUserById(recipe.userId, !!recipe.userId);

  // Delete recipe mutation
  const deleteRecipeMutation = useDeleteRecipe();

  const editRecipeHandler = () => {
    router.push(`/updateRecipe/${recipe._id}`);
  };

  const deleteRecipeHandler = async () => {
    if (window.confirm("Are you sure you want to delete this recipe?")) {
      try {
        await deleteRecipeMutation.mutateAsync(recipe._id);
        router.push("/profile");
      } catch (error) {
        console.error("Error deleting recipe:", error);
        alert("Failed to delete recipe. Please try again.");
      }
    }
  };

  return (
    <div className="recipe-card group flex flex-col w-80 bg-neutral-white shadow-sm hover:shadow-md transition-all duration-500 ease-smooth rounded-2xl overflow-hidden border border-neutral-200 animate-fade-in-up">
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
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3 animate-fade-in-up delay-200">
            <div className="w-9 h-9 bg-gradient-to-br from-primary-orange to-primary-orange-hover rounded-full flex items-center justify-center shadow-sm">
              <span className="text-neutral-white font-semibold text-sm">
                {userData?.name?.charAt(0) || "U"}
              </span>
            </div>
            <p className="text-sm text-gray-600 font-medium tracking-wide">
              {userData?.name || "Loading..."}
            </p>
          </div>
          {isModified && (
            <div className="flex items-center gap-1 animate-fade-in-left delay-300">
              {/* Edit Button */}
              <button
                className="group/edit relative p-2 rounded-lg transition-all duration-300 hover:scale-110 hover:-translate-y-0.5"
                onClick={editRecipeHandler}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="20px"
                  viewBox="0 -960 960 960"
                  width="20px"
                  className="fill-gray-500 group-hover/edit:fill-orange-500 transition-colors duration-300"
                >
                  <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
                </svg>
              </button>

              {/* Delete Button */}
              <button
                className="group/delete relative p-2 rounded-lg transition-all duration-300 hover:scale-110 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={deleteRecipeHandler}
                disabled={deleteRecipeMutation.isPending}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="20px"
                  viewBox="0 -960 960 960"
                  width="20px"
                  className="fill-gray-500 group-hover/delete:fill-red-500 transition-colors duration-300"
                >
                  <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                </svg>
              </button>
            </div>
          )}
        </div>

        {/* Recipe Name */}
        <h3 className="text-xl font-bold text-gray-800 mb-4 text-clamp-2 animate-fade-in-up delay-400">
          {recipe.name}
        </h3>

        {/* View Recipe Button */}
        <button
          onClick={() => router.push(`/showRecipe/${recipe._id}`)}
          className="mt-auto inline-flex items-center justify-center px-5 py-3 bg-gradient-to-r from-primary-orange to-primary-orange-hover text-neutral-white font-semibold rounded-xl hover:from-primary-orange-hover hover:to-primary-orange hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 text-sm animate-fade-in-up delay-600"
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
        </button>
      </div>
    </div>
  );
};

export default RecipeCard;
