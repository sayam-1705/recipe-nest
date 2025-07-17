"use client";

import React, { useState, useEffect } from "react";
import Input from "./Input";
import Select from "./Select";

interface FormData {
  name: string;
  type: string;
  meal: string;
  time: string;
  difficulty: string;
  season: string;
  occasion: string;
  dietaryType: string;
  servings: number;
  ingredients: { name: string; quantity: string }[];
  instructions: string[];
  image: string;
}

interface RecipeFormProps {
  initialData?: Partial<FormData>;
  onFormDataChange?: (data: FormData) => void;
  onSubmit?: (data: FormData) => void;
  submitButtonText?: string;
  isSubmitting?: boolean;
  staticData?: {
    dietaryTypes: string[];
    types: string[];
    meals: string[];
    difficulties: string[];
    seasons: string[];
    occasions: string[];
  };
}

const RecipeForm = ({
  initialData,
  onFormDataChange,
  onSubmit,
  submitButtonText = "Submit Recipe",
  isSubmitting = false,
  staticData = {
    dietaryTypes: ["Vegetarian", "Non-Vegetarian", "Vegan"],
    types: ["Appetizer", "Main Course", "Dessert", "Snack", "Beverage"],
    meals: ["Breakfast", "Lunch", "Dinner", "Snack"],
    difficulties: ["Easy", "Medium", "Hard"],
    seasons: ["Spring", "Summer", "Fall", "Winter", "All Seasons"],
    occasions: ["Everyday", "Party", "Holiday", "Special", "Quick Meal"],
  },
}: RecipeFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    name: initialData?.name || "",
    type: initialData?.type || "",
    meal: initialData?.meal || "",
    time: initialData?.time || "",
    difficulty: initialData?.difficulty || "",
    season: initialData?.season || "",
    occasion: initialData?.occasion || "",
    dietaryType: initialData?.dietaryType || "",
    servings: initialData?.servings || 1,
    ingredients: initialData?.ingredients || [{ name: "", quantity: "" }],
    instructions: initialData?.instructions || [""],
    image: initialData?.image || "",
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [animationClass, setAnimationClass] = useState("animate-fadeIn");

  // Simplified form data change handler
  useEffect(() => {
    if (onFormDataChange) {
      onFormDataChange(formData);
    }
  }, [formData, onFormDataChange]);

  // Enhanced animation handler for step transitions
  const handleStepChange = (step: number) => {
    setAnimationClass("opacity-0 translate-y-8");
    setTimeout(() => {
      setCurrentStep(step);
      setAnimationClass("opacity-100 translate-y-0");
    }, 150);
  };

  const handleInputChange = (field: keyof FormData, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleIngredientChange = (
    index: number,
    field: "name" | "quantity",
    value: string
  ) => {
    const newIngredients = [...formData.ingredients];
    newIngredients[index] = { ...newIngredients[index], [field]: value };
    setFormData((prev) => ({ ...prev, ingredients: newIngredients }));
  };

  const addIngredient = () => {
    setFormData((prev) => ({
      ...prev,
      ingredients: [...prev.ingredients, { name: "", quantity: "" }],
    }));
  };

  const removeIngredient = (index: number) => {
    if (formData.ingredients.length > 1) {
      const newIngredients = formData.ingredients.filter((_, i) => i !== index);
      setFormData((prev) => ({ ...prev, ingredients: newIngredients }));
    }
  };

  const handleInstructionChange = (index: number, value: string) => {
    const newInstructions = [...formData.instructions];
    newInstructions[index] = value;
    setFormData((prev) => ({ ...prev, instructions: newInstructions }));
  };

  const addInstruction = () => {
    setFormData((prev) => ({
      ...prev,
      instructions: [...prev.instructions, ""],
    }));
  };

  const removeInstruction = (index: number) => {
    if (formData.instructions.length > 1) {
      const newInstructions = formData.instructions.filter(
        (_, i) => i !== index
      );
      setFormData((prev) => ({ ...prev, instructions: newInstructions }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Final Form Data:", formData);
    if (onSubmit) {
      onSubmit(formData);
    }
  };

  const renderStep1 = () => (
    <div className={`space-y-8 transition-all duration-300 ${animationClass}`}>
      <div className="text-center mb-12">
        <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary-orange to-primary-orange-dark text-neutral-100 rounded-full flex items-center justify-center text-3xl font-bold mb-6 shadow-lg animate-subtle-pulse">
          👨‍🍳
        </div>
        <h2 className="text-3xl font-bold text-neutral-800 mb-3">
          Recipe Essentials
        </h2>
        <p className="text-neutral-600 text-lg">
          Let&apos;s capture the heart of your culinary creation
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Input
          label="Recipe Name"
          name="name"
          value={formData.name}
          onChange={(value) => handleInputChange("name", value as string)}
          placeholder="What's your delicious creation called?"
        />

        <Select
          label="Dietary Preference"
          name="dietaryType"
          value={formData.dietaryType}
          onChange={(value) => handleInputChange("dietaryType", value)}
          options={staticData.dietaryTypes}
          placeholder="Choose dietary type"
        />

        <Select
          label="Recipe Category"
          name="type"
          value={formData.type}
          onChange={(value) => handleInputChange("type", value)}
          options={staticData.types}
          placeholder="Select category"
        />

        <Select
          label="Perfect For"
          name="meal"
          value={formData.meal}
          onChange={(value) => handleInputChange("meal", value)}
          options={staticData.meals}
          placeholder="When to enjoy?"
        />
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className={`space-y-8 transition-all duration-300 ${animationClass}`}>
      <div className="text-center mb-12">
        <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary-orange to-primary-orange-dark text-neutral-100 rounded-full flex items-center justify-center text-3xl font-bold mb-6 shadow-lg animate-subtle-pulse">
          ⭐
        </div>
        <h2 className="text-3xl font-bold text-neutral-800 mb-3">
          Recipe Characteristics
        </h2>
        <p className="text-neutral-600 text-lg">
          Define the personality of your dish
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Input
          label="Cooking Duration"
          name="time"
          value={formData.time}
          onChange={(value) => handleInputChange("time", value as string)}
          placeholder="How long does it take? (e.g., 30 minutes)"
        />

        <Select
          label="Skill Level"
          name="difficulty"
          value={formData.difficulty}
          onChange={(value) => handleInputChange("difficulty", value)}
          options={staticData.difficulties}
          placeholder="How challenging is it?"
        />

        <Select
          label="Best Season"
          name="season"
          value={formData.season}
          onChange={(value) => handleInputChange("season", value)}
          options={staticData.seasons}
          placeholder="When is it perfect?"
        />

        <Select
          label="Special Occasion"
          name="occasion"
          value={formData.occasion}
          onChange={(value) => handleInputChange("occasion", value)}
          options={staticData.occasions}
          placeholder="What&apos;s the vibe?"
        />
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className={`space-y-8 transition-all duration-300 ${animationClass}`}>
      <div className="text-center mb-12">
        <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary-orange to-primary-orange-dark text-neutral-100 rounded-full flex items-center justify-center text-3xl font-bold mb-6 shadow-lg animate-subtle-pulse">
          🍽️
        </div>
        <h2 className="text-3xl font-bold text-neutral-800 mb-3">
          Ingredients & Portions
        </h2>
        <p className="text-neutral-600 text-lg">
          The building blocks of your masterpiece
        </p>
      </div>

      <div className="space-y-8">
        <div className="bg-neutral-50 rounded-2xl p-6 border-2 border-neutral-200 hover:border-primary-orange-light transition-all duration-300 shadow-sm hover:shadow-md">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-orange to-primary-orange-dark text-neutral-100 rounded-full flex items-center justify-center text-lg font-bold shadow-md">
              👥
            </div>
            <div className="space-y-2">
              <label
                htmlFor="servings"
                className="block text-sm font-semibold text-neutral-700 uppercase tracking-wide"
              >
                Serves How Many?
              </label>
              <input
                id="servings"
                name="servings"
                type="number"
                min="1"
                value={formData.servings}
                onChange={(e) =>
                  handleInputChange("servings", parseInt(e.target.value))
                }
                className="w-24 px-4 py-3 rounded-xl border-2 border-neutral-200 focus:outline-none focus:ring-0 focus:border-primary-orange focus:shadow-none outline-none transition-all duration-300 ease-out hover:border-primary-orange-light hover:shadow-md bg-neutral-50 shadow-sm text-center font-semibold active:border-primary-orange active:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-neutral-800 flex items-center gap-2">
              <span className="text-primary-orange">🥄</span>
              Ingredients List
            </h3>
            <button
              type="button"
              onClick={addIngredient}
              className="flex items-center justify-center gap-3 px-6 py-3 bg-gradient-to-r from-primary-orange to-primary-orange-dark text-neutral-100 rounded-xl hover:from-primary-orange-dark hover:to-primary-orange-dark transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
            >
              <span className="w-5 h-5 flex items-center justify-center text-2xl font-medium">
                +
              </span>
              <span>Add Ingredient</span>
            </button>
          </div>

          {formData.ingredients.map((ingredient, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-6 bg-neutral-white rounded-2xl border-2 border-neutral-200 hover:border-primary-orange-light transition-all duration-300 shadow-sm hover:shadow-md transform"
            >
              <div className="flex-1">
                <input
                  type="text"
                  name={`ingredient-name-${index}`}
                  value={ingredient.name}
                  onChange={(e) =>
                    handleIngredientChange(index, "name", e.target.value)
                  }
                  className="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 focus:outline-none focus:ring-0 focus:border-primary-orange focus:shadow-none outline-none transition-all duration-300 ease-out hover:border-primary-orange-light hover:shadow-md bg-neutral-white shadow-sm active:border-primary-orange active:outline-none"
                  placeholder="What ingredient?"
                />
              </div>
              <div className="flex-1">
                <input
                  type="text"
                  name={`ingredient-quantity-${index}`}
                  value={ingredient.quantity}
                  onChange={(e) =>
                    handleIngredientChange(index, "quantity", e.target.value)
                  }
                  className="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 focus:outline-none focus:ring-0 focus:border-primary-orange focus:shadow-none outline-none transition-all duration-300 ease-out hover:border-primary-orange-light hover:shadow-md bg-neutral-white shadow-sm active:border-primary-orange active:outline-none"
                  placeholder="How much? (e.g., 1 cup, 2 tbsp)"
                />
              </div>
              {formData.ingredients.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeIngredient(index)}
                  className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition-all duration-300 hover:scale-110"
                >
                  <span className="w-5 h-5 flex items-center justify-center text-lg font-bold">
                    ×
                  </span>
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className={`space-y-8 transition-all duration-300 ${animationClass}`}>
      <div className="text-center mb-12">
        <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary-orange to-primary-orange-dark text-neutral-100 rounded-full flex items-center justify-center text-3xl font-bold mb-6 shadow-lg">
          📖
        </div>
        <h2 className="text-3xl font-bold text-neutral-800 mb-3">
          Recipe Instructions
        </h2>
        <p className="text-neutral-600 text-lg">
          Guide others through your culinary journey
        </p>
      </div>

      <div className="space-y-8">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-neutral-800 flex items-center gap-2">
              <span className="text-primary-orange">📝</span>
              Step-by-Step Guide
            </h3>
            <button
              type="button"
              onClick={addInstruction}
              className="flex items-center justify-center gap-3 px-6 py-3 bg-gradient-to-r from-primary-orange to-primary-orange-dark text-neutral-100 rounded-xl hover:from-primary-orange-dark hover:to-primary-orange-dark transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
            >
              <span className="w-5 h-5 flex items-center justify-center text-2xl font-medium">
                +
              </span>
              <span>Add Step</span>
            </button>
          </div>

          {formData.instructions.map((instruction, index) => (
            <div
              key={index}
              className="flex items-start gap-4 p-6 bg-neutral-white rounded-2xl border-2 border-neutral-200 hover:border-primary-orange-light transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-[1.02]"
            >
              <span className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-primary-orange to-primary-orange-dark text-neutral-100 rounded-full flex items-center justify-center text-sm font-bold shadow-md">
                {index + 1}
              </span>
              <div className="flex-1">
                <textarea
                  name={`instruction-${index}`}
                  value={instruction}
                  onChange={(e) =>
                    handleInstructionChange(index, e.target.value)
                  }
                  className="w-full px-4 py-4 rounded-xl border-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-orange-500 focus:shadow-none outline-none transition-all duration-300 ease-out hover:border-orange-300 hover:shadow-md bg-white shadow-sm resize-none active:border-orange-500 active:outline-none"
                  rows={3}
                  placeholder="Describe this step clearly and concisely..."
                />
              </div>
              {formData.instructions.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeInstruction(index)}
                  className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition-all duration-300 hover:scale-110"
                >
                  <span className="w-5 h-5 flex items-center justify-center text-lg font-bold">
                    ×
                  </span>
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl p-6 border-2 border-gray-100 hover:border-orange-200 transition-all duration-300 shadow-sm hover:shadow-md">
          <label
            htmlFor="image"
            className="block text-sm font-semibold text-gray-700 uppercase tracking-wide mb-4"
          >
            Recipe Image
          </label>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-full flex items-center justify-center text-lg font-bold shadow-md">
              📷
            </div>
            <input
              id="image"
              name="image"
              type="url"
              value={formData.image}
              onChange={(e) => handleInputChange("image", e.target.value)}
              className="flex-1 px-4 py-4 rounded-xl border-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-orange-500 focus:shadow-none outline-none transition-all duration-300 ease-out hover:border-orange-300 hover:shadow-md bg-white shadow-sm active:border-orange-500 active:outline-none"
              placeholder="Share a beautiful photo URL of your dish"
            />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl p-12 border border-orange-100">
          {/* Enhanced Progress Bar */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              {[1, 2, 3, 4].map((step) => (
                <div
                  key={step}
                  className={`relative rounded-full flex items-center justify-center px-5 py-3 text-base font-bold transition-all duration-500 ${
                    step <= currentStep
                      ? "bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-lg scale-110"
                      : "bg-gray-200 text-gray-500 scale-100"
                  }`}
                >
                  {step}
                  {step <= currentStep && (
                    <div className="absolute inset-0 rounded-full bg-orange-500 opacity-25"></div>
                  )}
                </div>
              ))}
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-orange-500 to-orange-600 h-3 rounded-full transition-all duration-700 ease-out shadow-sm"
                style={{ width: `${(currentStep / 4) * 100}%` }}
              />
            </div>
            <div className="flex justify-between text-sm text-gray-500 mt-2 font-semibold">
              <span>Basics</span>
              <span>Details</span>
              <span>Ingredients</span>
              <span>Instructions</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-12">
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}
            {currentStep === 4 && renderStep4()}

            {/* Enhanced Navigation Buttons */}
            <div className="flex justify-between pt-12 border-t-2 border-orange-100">
              <button
                type="button"
                onClick={() => handleStepChange(currentStep - 1)}
                disabled={currentStep === 1}
                className={`flex justify-center items-center gap-4 px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform ${
                  currentStep === 1
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300 hover:scale-105 shadow-md"
                }`}
              >
                <span>←</span>
                <span>Previous</span>
              </button>

              {currentStep < 4 ? (
                <button
                  type="button"
                  onClick={() => handleStepChange(currentStep + 1)}
                  className="flex justify-center items-center gap-4 px-8 py-4 rounded-xl font-semibold transition-all duration-300 bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <span>Next</span>
                  <span>→</span>
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-10 py-4 rounded-xl font-semibold  transition-all duration-300 transform ${
                    isSubmitting
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 hover:scale-105 shadow-lg hover:shadow-xl"
                  } text-white`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Processing...
                    </span>
                  ) : (
                    `✨ ${submitButtonText}`
                  )}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RecipeForm;
