'use client';

import RecipeForm from "@/components/recipeForm/RecipeForm";
import React, { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import recipeData from "@/mock/recipe.json";

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
    dietaryTypes: ["Vegetarian", "Non-Vegetarian", "Vegan", "Gluten-Free", "Dairy-Free"],
    types: ["Appetizer", "Main Course", "Dessert", "Snack", "Beverage", "Salad", "Soup"],
    meals: ["Breakfast", "Lunch", "Dinner", "Snack", "Brunch"],
    difficulties: ["Easy", "Medium", "Hard", "Expert"],
    seasons: ["Spring", "Summer", "Fall", "Winter", "All Seasons"],
    occasions: ["Everyday", "Party", "Holiday", "Special", "Quick Meal", "Date Night", "Family Gathering"],
  };

  // Fetch recipe data from static JSON file
  useEffect(() => {
    const fetchRecipeData = () => {
      try {
        setLoading(true);
        
        // Find the recipe by ID from the static JSON data
        const foundRecipe = recipeData.recipes.find(
          (recipe: Recipe) => recipe._id === resolvedParams.recipeId
        );
        
        if (!foundRecipe) {
          setError('Recipe not found');
          return;
        }
        
        setRecipe(foundRecipe);
      } catch (err) {
        console.error('Error fetching recipe:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch recipe');
      } finally {
        setLoading(false);
      }
    };

    if (resolvedParams.recipeId) {
      fetchRecipeData();
    }
  }, [resolvedParams.recipeId]);

  const handleFormDataChange = (data: Partial<Recipe>) => {
    console.log('Updated form data:', data);
  };

  const handleUpdateRecipe = async (formData: Partial<Recipe>) => {
    try {
      setIsSubmitting(true);
      
      // Log the complete form data to console
      console.log('=== RECIPE UPDATE SUBMISSION ===');
      console.log('Recipe ID:', resolvedParams.recipeId);
      console.log('Updated Form Data:', JSON.stringify(formData, null, 2));
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      alert('Recipe updated successfully! Check console for form data.');
      // Optionally redirect
      // router.push(`/showRecipe/${resolvedParams.recipeId}`);
      
    } catch (error) {
      console.error('Error updating recipe:', error);
      alert('An error occurred while updating the recipe');
    } finally {
      setIsSubmitting(false);
    }
  };

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

  return (
    <div>
      <RecipeForm 
        initialData={recipe}
        staticData={staticFormData}
        onFormDataChange={handleFormDataChange}
        onSubmit={handleUpdateRecipe}
        submitButtonText="Update Recipe"
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default UpdateRecipe;
