"use client";

import RecipeForm from "@/components/recipes/RecipeForm";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getAuthToken } from "@/lib/auth";
import { RECIPE_FORM_OPTIONS } from "@/lib/constants";
import { fileToBase64 } from "@/lib/imageUtils";

const CreateRecipe = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const createRecipeMutation = useMutation({
    mutationFn: async (recipeData: CreateRecipeData): Promise<Recipe> => {
      const token = getAuthToken();
      if (!token)
        throw new Error("Authentication token expired. Please log in again.");

      const response = await fetch("/api/createRecipe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(recipeData),
      });
      if (!response.ok) throw new Error("Failed to create recipe");
      const data = await response.json();
      return data.recipe;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recipes"] });
      router.push("/");
    },
  });

  const handleCreateRecipe = async (formData: RecipeFormData) => {
    let imageData = "";
    if (formData.image instanceof File) {
      imageData = await fileToBase64(formData.image);
    }

    await createRecipeMutation.mutateAsync({
      name: formData.name,
      type: formData.type,
      meal: formData.meal,
      time: String(formData.time),
      difficulty: formData.difficulty,
      season: formData.season,
      occasion: formData.occasion,
      dietaryType: formData.dietaryType,
      servings: Number(formData.servings),
      ingredients: formData.ingredients,
      instructions: formData.instructions,
      image: imageData,
    });
  };

  return (
    <ProtectedRoute>
      <div>
        <RecipeForm
          staticData={RECIPE_FORM_OPTIONS}
          onSubmit={handleCreateRecipe}
          submitButtonText="Create Recipe"
          isSubmitting={createRecipeMutation.isPending}
        />
      </div>
    </ProtectedRoute>
  );
};

export default CreateRecipe;
