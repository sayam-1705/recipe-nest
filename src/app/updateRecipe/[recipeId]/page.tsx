"use client";

import RecipeForm from "@/components/recipeForm/RecipeForm";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { useRecipeOwnership } from "@/hooks/useProtectedRoute";
import React, { use, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/utils/api";
import { AxiosError } from "axios";

const useGetRecipeById = (recipeId: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: ["recipes", "byId", recipeId],
    queryFn: async (): Promise<Recipe> => {
      const response = await apiClient.get(`/getRecipeById/${recipeId}`);
      return response.data.recipe;
    },
    enabled: enabled && !!recipeId,
  });
};

const useUpdateRecipe = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      recipeId,
      recipeData,
    }: {
      recipeId: string;
      recipeData: UpdateRecipeData;
    }): Promise<Recipe> => {
      const response = await apiClient.put(
        `/updateRecipe/${recipeId}`,
        recipeData
      );
      return response.data.recipe;
    },
    onSuccess: (updatedRecipe, variables) => {
      queryClient.setQueryData(
        ["recipes", "byId", variables.recipeId],
        updatedRecipe
      );
      queryClient.invalidateQueries({ queryKey: ["recipes"] });
      if (updatedRecipe.userId) {
        queryClient.invalidateQueries({
          queryKey: ["recipes", "byUserId", updatedRecipe.userId],
        });
      }
    },
    onError: (error: AxiosError) => {
      console.error(
        "Failed to update recipe:",
        error.response?.data || error.message
      );
    },
  });
};

const UpdateRecipe = ({ params }: UpdateRecipeProps) => {
  const resolvedParams = use(params);
  const router = useRouter();

  const {
    data: recipe,
    isLoading: loading,
    error,
    isError,
  } = useGetRecipeById(resolvedParams.recipeId, !!resolvedParams.recipeId);

  const canAccess = useRecipeOwnership(recipe?.userId);

  const updateRecipeMutation = useUpdateRecipe();

  const staticFormData = {
    dietaryTypes: [
      "Vegetarian",
      "Non-Vegetarian",
      "Vegan",
      "Gluten-Free",
      "Dairy-Free",
    ],
    types: [
      "Appetizer",
      "Main Course",
      "Dessert",
      "Snack",
      "Beverage",
      "Salad",
      "Soup",
    ],
    meals: ["Breakfast", "Lunch", "Dinner", "Snack", "Brunch"],
    difficulties: ["Easy", "Medium", "Hard", "Expert"],
    seasons: ["Spring", "Summer", "Fall", "Winter", "All Seasons"],
    occasions: [
      "Everyday",
      "Party",
      "Holiday",
      "Special",
      "Quick Meal",
      "Date Night",
      "Family Gathering",
    ],
  };

  const handleFormDataChange = useCallback((data: unknown) => {
    console.log("Updated form data:", data);
  }, []);

  const handleUpdateRecipe = useCallback(
    async (formData: {
      name: string;
      type: string;
      meal: string;
      time: string;
      difficulty: string;
      season: string;
      occasion: string;
      dietaryType: string;
      servings: number;
      ingredients: Array<{ name: string; quantity: string }>;
      instructions: string[];
      image: File | string | null;
    }) => {
      try {
        let imageData = recipe?.image;

        if (formData.image && formData.image instanceof File) {
          const arrayBuffer = await formData.image.arrayBuffer();
          const uint8Array = new Uint8Array(arrayBuffer);
          const binaryString = uint8Array.reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ""
          );
          const base64String = btoa(binaryString);
          const mimeType = formData.image.type || "image/png";
          imageData = `data:${mimeType};base64,${base64String}`;
        } else if (formData.image && typeof formData.image === "string") {
          imageData = formData.image;
        }

        const updateData = {
          name: formData.name,
          type: formData.type,
          meal: formData.meal,
          time: formData.time,
          difficulty: formData.difficulty,
          season: formData.season,
          occasion: formData.occasion,
          dietaryType: formData.dietaryType,
          servings: formData.servings,
          ingredients: formData.ingredients,
          instructions: formData.instructions,
          image: imageData,
        };

        await updateRecipeMutation.mutateAsync({
          recipeId: resolvedParams.recipeId,
          recipeData: updateData,
        });

        console.log("Recipe updated successfully");
        alert("Recipe updated successfully!");

        router.push(`/showRecipe/${resolvedParams.recipeId}`);
      } catch (error) {
        console.error("Error updating recipe:", error);
        alert("An error occurred while updating the recipe");
      }
    },
    [recipe?.image, resolvedParams.recipeId, router, updateRecipeMutation]
  );

  if (recipe && canAccess === false) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center">
          <div className="text-center">
            <div className="text-red-500 text-4xl mb-4">🚫</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Access Denied
            </h2>
            <p className="text-gray-600 mb-6">
              You can only edit your own recipes.
            </p>
            <button
              onClick={() => router.push("/profile")}
              className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              Go to Profile
            </button>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  if (loading) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading recipe...</p>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  if (isError) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center">
          <div className="text-center">
            <div className="text-red-500 text-xl mb-4">⚠️</div>
            <p className="text-gray-600 mb-4">
              Error:{" "}
              {error instanceof Error ? error.message : "Failed to load recipe"}
            </p>
            <button
              onClick={() => router.back()}
              className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              Go Back
            </button>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  if (!recipe) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center">
          <div className="text-center">
            <div className="text-gray-500 text-xl mb-4">🔍</div>
            <p className="text-gray-600 mb-4">Recipe not found</p>
            <button
              onClick={() => router.back()}
              className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              Go Back
            </button>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  console.log("Current recipe state:", recipe);

  return (
    <ProtectedRoute>
      <div>
        <RecipeForm
          initialData={recipe}
          staticData={staticFormData}
          onFormDataChange={handleFormDataChange}
          onSubmit={handleUpdateRecipe}
          submitButtonText="Update Recipe"
          isSubmitting={updateRecipeMutation.isPending}
        />
      </div>
    </ProtectedRoute>
  );
};

export default UpdateRecipe;
