'use client';

import RecipeForm from "@/components/recipeForm/RecipeForm";
import React, { useState } from "react";

const CreateRecipe = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Static data for form options
  const staticFormData = {
    dietaryTypes: ["Vegetarian", "Non-Vegetarian", "Vegan", "Gluten-Free", "Dairy-Free"],
    types: ["Appetizer", "Main Course", "Dessert", "Snack", "Beverage", "Salad", "Soup"],
    meals: ["Breakfast", "Lunch", "Dinner", "Snack", "Brunch"],
    difficulties: ["Easy", "Medium", "Hard", "Expert"],
    seasons: ["Spring", "Summer", "Fall", "Winter", "All Seasons"],
    occasions: ["Everyday", "Party", "Holiday", "Special", "Quick Meal", "Date Night", "Family Gathering"],
  };

  const handleFormDataChange = (data: Partial<Recipe>) => {
    // Optional: Handle form data changes if needed
    console.log('Form data changed:', data);
  };

  const handleCreateRecipe = async (formData: Partial<Recipe>) => {
    try {
      setIsSubmitting(true);
      
      // Log the complete form data to console
      console.log('=== RECIPE FORM SUBMISSION ===');
      console.log('Form Data:', JSON.stringify(formData, null, 2));
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      alert('Recipe created successfully! Check console for form data.');
      // Optionally redirect or reset form
      // router.push('/');
      
    } catch (error) {
      console.error('Error creating recipe:', error);
      alert('An error occurred while creating the recipe');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <RecipeForm 
        staticData={staticFormData}
        onFormDataChange={handleFormDataChange}
        onSubmit={handleCreateRecipe}
        submitButtonText="Create Recipe"
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default CreateRecipe;
