"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAuthToken } from "@/lib/auth";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import AlertDialog from "@/components/common/AlertDialog";

const useGetUserById = (userId: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: ["users", "byId", userId],
    queryFn: async (): Promise<{
      name: string;
      email: string;
      _id: string;
    }> => {
      const response = await fetch(`/api/getUserById/${userId}`);
      if (!response.ok) throw new Error("Failed to fetch user");
      const data = await response.json();
      return data.user;
    },
    enabled: enabled && !!userId,
  });
};

const useDeleteRecipe = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (recipeId: string): Promise<void> => {
      const token = getAuthToken();
      if (!token)
        throw new Error("Authentication token expired. Please log in again.");

      const response = await fetch(`/api/deleteRecipe/${recipeId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error("Failed to delete recipe");
    },
    onSuccess: (_, recipeId) => {
      queryClient.removeQueries({ queryKey: ["recipes", "byId", recipeId] });
      queryClient.invalidateQueries({ queryKey: ["recipes"] });
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === "recipes",
      });
    },
  });
};

const RecipeCard = ({
  isModified = false,
  recipe,
}: {
  isModified?: boolean;
  recipe: Recipe;
}) => {
  const router = useRouter();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  const { data: userData } = useGetUserById(recipe.userId, !!recipe.userId);

  const deleteRecipeMutation = useDeleteRecipe();

  const editRecipeHandler = () => {
    router.push(`/updateRecipe/${recipe._id}`);
  };

  const deleteRecipeHandler = () => {
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    setShowDeleteConfirm(false);
    try {
      await deleteRecipeMutation.mutateAsync(recipe._id);
      router.push("/profile");
    } catch (error) {
      console.error("Error deleting recipe:", error);
      setShowErrorAlert(true);
    }
  };

  return (
    <>
      <div className="group flex flex-col w-full max-w-xs sm:max-w-sm md:max-w-md lg:w-80 bg-neutral-white shadow-sm transition-all duration-300 ease-smooth transform-gpu focus-within:ring-2 focus-within:ring-primary-orange focus-within:ring-offset-2 rounded-xl sm:rounded-2xl overflow-hidden border border-neutral-200 animate-fade-in-up">
        <div className="relative overflow-hidden rounded-t-xl sm:rounded-t-2xl">
          <Image
            className="w-full h-40 sm:h-44 md:h-48 object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            src={recipe.image}
            alt={recipe.name}
            height={192}
            width={320}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
        <div className="p-3 sm:p-4 md:p-5 flex-1 flex flex-col">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="flex items-center gap-2 sm:gap-3 animate-fade-in-up delay-200">
              <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 bg-gradient-to-br from-primary-orange to-primary-orange-hover rounded-full flex items-center justify-center shadow-sm">
                <span className="text-neutral-white font-semibold text-xs sm:text-sm">
                  {userData?.name?.charAt(0) || "U"}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 font-medium tracking-wide text-clamp-1">
                {userData?.name || "Loading..."}
              </p>
            </div>
            {isModified && (
              <div className="flex items-center gap-1 animate-fade-in-left delay-300">
                <button
                  className="group/edit relative p-1.5 sm:p-2 rounded-lg transition-all duration-300 hover:scale-110 hover:-translate-y-0.5"
                  onClick={editRecipeHandler}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="16px"
                    viewBox="0 -960 960 960"
                    width="16px"
                    className="fill-gray-500 group-hover/edit:fill-orange-500 transition-colors duration-300 sm:w-5 sm:h-5"
                  >
                    <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
                  </svg>
                </button>

                <button
                  className="group/delete relative p-1.5 sm:p-2 rounded-lg transition-all duration-300 hover:scale-110 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={deleteRecipeHandler}
                  disabled={deleteRecipeMutation.isPending}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="16px"
                    viewBox="0 -960 960 960"
                    width="16px"
                    className="fill-gray-500 group-hover/delete:fill-red-500 transition-colors duration-300 sm:w-5 sm:h-5"
                  >
                    <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                  </svg>
                </button>
              </div>
            )}
          </div>

          <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-800 mb-3 sm:mb-4 text-clamp-2 animate-fade-in-up delay-400 leading-tight">
            {recipe.name}
          </h3>

          <button
            onClick={() => router.push(`/showRecipe/${recipe._id}`)}
            className="mt-auto inline-flex items-center justify-center px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3 bg-gradient-to-r from-primary-orange to-primary-orange-hover text-neutral-white font-semibold rounded-lg sm:rounded-xl hover:from-primary-orange-hover hover:to-primary-orange hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 text-xs sm:text-sm animate-fade-in-up delay-600"
          >
            View Recipe
            <svg
              className="w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-2 transition-transform duration-300 hover:translate-x-1"
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

      <ConfirmDialog
        isOpen={showDeleteConfirm}
        title="Delete Recipe"
        message="Are you sure you want to delete this recipe? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
        onConfirm={confirmDelete}
        onCancel={() => setShowDeleteConfirm(false)}
      />

      <AlertDialog
        isOpen={showErrorAlert}
        title="Error"
        message="Failed to delete recipe. Please try again."
        type="error"
        onClose={() => setShowErrorAlert(false)}
      />
    </>
  );
};

export default RecipeCard;
