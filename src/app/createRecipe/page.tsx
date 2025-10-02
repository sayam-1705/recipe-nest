'use client';

import RecipeForm from "@/components/recipeForm/RecipeForm";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import React from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/utils/api";
import { AxiosError } from "axios";

// Recipe Mutation
const useCreateRecipe = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (recipeData: CreateRecipeData): Promise<Recipe> => {
      const response = await apiClient.post('/createRecipe', recipeData);
      return response.data.recipe;
    },
    onSuccess: (newRecipe) => {
      // Invalidate and refetch related queries
      queryClient.invalidateQueries({ queryKey: ['recipes'] });
      if (newRecipe.userId) {
        queryClient.invalidateQueries({ 
          queryKey: ['recipes', 'byUserId', newRecipe.userId] 
        });
      }
    },
    onError: (error: AxiosError) => {
      console.error('Failed to create recipe:', error.response?.data || error.message);
    },
  });
};

const CreateRecipe = () => {
  const router = useRouter();
  const createRecipeMutation = useCreateRecipe();

  // Static data for form options
  const staticFormData = {
    dietaryTypes: ["Vegetarian", "Non-Vegetarian", "Vegan", "Gluten-Free", "Dairy-Free"],
    types: ["Appetizer", "Main Course", "Dessert", "Snack", "Beverage", "Salad", "Soup"],
    meals: ["Breakfast", "Lunch", "Dinner", "Snack", "Brunch"],
    difficulties: ["Easy", "Medium", "Hard", "Expert"],
    seasons: ["Spring", "Summer", "Fall", "Winter", "All Seasons"],
    occasions: ["Everyday", "Party", "Holiday", "Special", "Quick Meal", "Date Night", "Family Gathering"],
  };

  const handleFormDataChange = (data: unknown) => {
    // Optional: Handle form data changes if needed
    console.log('Form data changed:', data);
  };

  const handleCreateRecipe = async (formData: {
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
    image: string | File | null;
  }) => {
    try {
      // Handle image conversion to base64 if needed
      let imageData = '';
      
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

      const recipeData = {
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
      console.log("Recipe created successfully");
      
      // Redirect to home page or recipe list
      router.push('/');
      
    } catch (error) {
      console.error('Error creating recipe:', error);
    }
  };

  return (
    <ProtectedRoute>
      <div>
        <RecipeForm 
          staticData={staticFormData}
          onFormDataChange={handleFormDataChange}
          onSubmit={handleCreateRecipe}
          submitButtonText="Create Recipe"
          isSubmitting={createRecipeMutation.isPending}
        />
      </div>
    </ProtectedRoute>
  );
};

export default CreateRecipe;
