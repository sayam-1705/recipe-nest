"use client";

import RecipeForm from "@/components/recipeForm/RecipeForm";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { use, useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getUser } from "@/lib/auth";

const UpdateRecipe = ({
  params,
}: {
  params: Promise<{ recipeId: string }>;
}) => {
  const resolvedParams = use(params);
  const router = useRouter();
  const queryClient = useQueryClient();
  const [canAccess, setCanAccess] = useState<boolean | null>(null);

  const {
    data: recipe,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["recipes", "byId", resolvedParams.recipeId],
    queryFn: async (): Promise<Recipe> => {
      const response = await fetch(
        `/api/getRecipeById/${resolvedParams.recipeId}`
      );
      if (!response.ok) throw new Error("Failed to fetch recipe");
      const data = await response.json();
      return data.recipe;
    },
    enabled: !!resolvedParams.recipeId,
  });

  useEffect(() => {
    if (recipe) {
      const user = getUser();
      const hasAccess =
        user && (user._id === recipe.userId || user.id === recipe.userId);
      setCanAccess(!!hasAccess);
    }
  }, [recipe]);

  const updateRecipeMutation = useMutation({
    mutationFn: async (recipeData: UpdateRecipeData): Promise<Recipe> => {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `/api/updateRecipe/${resolvedParams.recipeId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(recipeData),
        }
      );
      if (!response.ok) throw new Error("Failed to update recipe");
      const data = await response.json();
      return data.recipe;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recipes"] });
      router.push(`/showRecipe/${resolvedParams.recipeId}`);
    },
  });

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

  const handleUpdateRecipe = useCallback(
    async (formData: RecipeFormData) => {
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

        const updateData: UpdateRecipeData = {
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

        await updateRecipeMutation.mutateAsync(updateData);
      } catch (error) {
        console.error("Error updating recipe:", error);
        alert("An error occurred while updating the recipe");
      }
    },
    [recipe?.image, updateRecipeMutation]
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

  if (isLoading) {
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

  if (error) {
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

  return (
    <ProtectedRoute>
      <div>
        <RecipeForm
          initialData={recipe}
          staticData={staticFormData}
          onSubmit={handleUpdateRecipe}
          submitButtonText="Update Recipe"
          isSubmitting={updateRecipeMutation.isPending}
        />
      </div>
    </ProtectedRoute>
  );
};

export default UpdateRecipe;
