"use client";

import RecipeForm from "@/components/recipeForm/RecipeForm";
import React, { useState, useEffect, use, useCallback } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

interface UpdateRecipeProps {
  params: Promise<{
    recipeId: string;
  }>;
}

const UpdateRecipe = ({ params }: UpdateRecipeProps) => {
  const resolvedParams = use(params);
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  // Static data for form options
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

  // Fetch recipe data from static JSON file
  useEffect(() => {
    const fetchRecipeData = async () => {
      try {
        setLoading(true);

        // Find the recipe by ID from the API
        const response = await axios.get(`/api/getRecipeById/${resolvedParams.recipeId}`);
        const foundRecipe = response.data.recipe; // The API returns { recipe: ... }
        
        if (!foundRecipe) {
          setError("Recipe not found");
          return;
        }
        
        console.log("Fetched recipe data:", foundRecipe);
        setRecipe(foundRecipe);
      } catch (err) {
        console.error("Error fetching recipe:", err);
        setError(err instanceof Error ? err.message : "Failed to fetch recipe");
      } finally {
        setLoading(false);
      }
    };

    if (resolvedParams.recipeId) {
      fetchRecipeData();
    }
  }, [resolvedParams.recipeId]);

  const handleFormDataChange = useCallback((data: any) => {
    console.log("Updated form data:", data);
    // Remove the setState call that was causing infinite re-renders
    // The form manages its own state, we don't need to sync it back to recipe
  }, []);

  const handleUpdateRecipe = useCallback(async (formData: any) => {
    try {
      setIsSubmitting(true);

      // Handle image data - keep existing or convert new file
      let imageData = recipe?.image; // Keep existing image by default

      // If a new image file is provided, convert it to base64
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
      } else if (formData.image && typeof formData.image === 'string') {
        // If existing image is being kept (string), use it
        imageData = formData.image;
      }

      // Create JSON payload for update
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

      const response = await axios.put(
        `/api/updateRecipe/${resolvedParams.recipeId}`,
        updateData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      );

      console.log("Recipe updated successfully:", response.data);
      alert("Recipe updated successfully!");

      // Redirect to the recipe details page or home
      router.push(`/showRecipe/${resolvedParams.recipeId}`);
    } catch (error) {
      console.error("Error updating recipe:", error);
      alert("An error occurred while updating the recipe");
    } finally {
      setIsSubmitting(false);
    }
  }, [recipe?.image, resolvedParams.recipeId, router]);
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading recipe...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">⚠️</div>
          <p className="text-gray-600 mb-4">Error: {error}</p>
          <button
            onClick={() => router.back()}
            className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!recipe) {
    return (
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
    );
  }

  console.log("Current recipe state:", recipe);
  
  return (
    <div>
      {recipe && (
        <RecipeForm
          initialData={recipe}
          staticData={staticFormData}
          onFormDataChange={handleFormDataChange}
          onSubmit={handleUpdateRecipe}
          submitButtonText="Update Recipe"
          isSubmitting={isSubmitting}
        />
      )}
    </div>
  );
};

export default UpdateRecipe;
