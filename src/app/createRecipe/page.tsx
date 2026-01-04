"use client";

import RecipeForm from "@/components/recipeForm/RecipeForm";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getAuthToken } from "@/lib/auth";

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

  const handleCreateRecipe = async (formData: RecipeFormData) => {
    try {
      let imageData = "";

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
      }

      const recipeData: CreateRecipeData = {
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
      };

      await createRecipeMutation.mutateAsync(recipeData);
    } catch (error) {
      console.error("Error creating recipe:", error);
    }
  };

  return (
    <ProtectedRoute>
      <div>
        <RecipeForm
          staticData={staticFormData}
          onSubmit={handleCreateRecipe}
          submitButtonText="Create Recipe"
          isSubmitting={createRecipeMutation.isPending}
        />
      </div>
    </ProtectedRoute>
  );
};

export default CreateRecipe;
