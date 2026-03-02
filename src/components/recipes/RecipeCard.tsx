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
      picture?: string;
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

  const handleCardClick = () => {
    router.push(`/showRecipe/${recipe._id}`);
  };

  const editRecipeHandler = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/updateRecipe/${recipe._id}`);
  };

  const deleteRecipeHandler = (e: React.MouseEvent) => {
    e.stopPropagation();
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
      <div 
        onClick={handleCardClick}
        className="glass-card rounded-2xl sm:rounded-[2rem] md:rounded-[2.5rem] p-3 sm:p-4 group cursor-pointer relative"
      >
        <div className="relative aspect-[4/5] rounded-xl sm:rounded-[1.5rem] md:rounded-[2rem] overflow-hidden mb-3 sm:mb-4 md:mb-6">
          <Image
            src={recipe.image}
            alt={recipe.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60"></div>
          
          {/* Top Indicators */}
          <div className="absolute top-3 left-3 right-3 sm:top-4 sm:left-4 sm:right-4 flex justify-between items-start">
            <div className="px-3 py-1 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-full flex items-center gap-1 shadow-lg">
              <span className="material-symbols-outlined text-primary text-base">schedule</span>
              <span className="text-xs font-black text-slate-900 dark:text-white">{recipe.time || "30 min"}</span>
            </div>

            {isModified && (
              <div className="flex gap-2">
                <button
                  onClick={editRecipeHandler}
                  className="w-10 h-10 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md rounded-full flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-primary-stitch transition-all shadow-xl"
                >
                  <span className="material-symbols-outlined text-lg">edit</span>
                </button>
                <button
                  onClick={deleteRecipeHandler}
                  className="w-10 h-10 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md rounded-full flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-rose-500 transition-all shadow-xl"
                  disabled={deleteRecipeMutation.isPending}
                >
                  <span className="material-symbols-outlined text-lg">delete</span>
                </button>
              </div>
            )}
          </div>

          <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 px-2.5 py-1 sm:px-3 sm:py-1 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-full shadow-lg">
            <span className="text-xs font-black text-slate-900 dark:text-white">{recipe.difficulty || "Medium"}</span>
          </div>
        </div>

        <div className="px-1 sm:px-2">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-0.5 rounded-full bg-primary-stitch/10 text-primary-stitch text-[10px] font-black uppercase">
              {recipe.type || "Recipe"}
            </span>
            <span className="text-slate-400 text-xs font-bold">• {recipe.dietaryType || "Any"}</span>
          </div>
          <h3 className="text-base sm:text-lg md:text-xl font-extrabold text-slate-900 dark:text-white mb-1 sm:mb-2 line-clamp-1 group-hover:text-primary-stitch transition-colors">
            {recipe.name}
          </h3>
          
          <div className="flex items-center justify-between mt-3 sm:mt-4 md:mt-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary-stitch to-orange-400 flex items-center justify-center shadow-lg ring-2 ring-primary-stitch/20 overflow-hidden">
                {userData?.picture ? (
                  <Image src={userData.picture} alt={userData.name} width={32} height={32} className="object-cover" />
                ) : (
                  <span className="text-white font-bold text-xs">
                    {userData?.name?.charAt(0) || "U"}
                  </span>
                )}
              </div>
              <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
                {userData?.name || "Loading..."}
              </span>
            </div>
            <span className="material-symbols-outlined text-slate-300 group-hover:text-primary-stitch transition-all group-hover:translate-x-1">
              arrow_forward
            </span>
          </div>
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
