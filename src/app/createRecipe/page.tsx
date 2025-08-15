'use client';

import RecipeForm from "@/components/recipeForm/RecipeForm";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const CreateRecipe = () => {
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

  const handleFormDataChange = (data: any) => {
    // Optional: Handle form data changes if needed
    console.log('Form data changed:', data);
  };

  const handleCreateRecipe = async (formData: any) => {
    try {
      setIsSubmitting(true);
      
      // Create FormData object for file upload
      const data = new FormData();
      data.append("name", formData.name);
      data.append("type", formData.type);
      data.append("meal", formData.meal);
      data.append("time", formData.time);
      data.append("difficulty", formData.difficulty);
      data.append("season", formData.season);
      data.append("occasion", formData.occasion);
      data.append("dietaryType", formData.dietaryType);
      data.append("servings", String(formData.servings));
      data.append("ingredients", JSON.stringify(formData.ingredients));
      data.append("instructions", JSON.stringify(formData.instructions));
      if (formData.image) {
        data.append("image", formData.image as File);
      }

      const response = await axios.post("/api/createRecipe", data, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `${localStorage.getItem("token")}`,
        },
      });

      console.log("Recipe created successfully:", response.data);
      alert('Recipe created successfully!');
      
      // Redirect to home page or recipe list
      router.push('/');
      
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
