"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Input from "./Input";
import Select from "./Select";

const RecipeForm: React.FC<RecipeFormProps> = ({
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
}) => {
  const [formData, setFormData] = useState<RecipeFormData>({
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
    image: initialData?.image || null,
  });

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [animationClass, setAnimationClass] =
    useState<string>("animate-fadeIn");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialData && initialData.name) {
      console.log("Setting form data from initialData:", initialData);
      setFormData({
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
        image: initialData?.image || null,
      });
    }
  }, [
    initialData,
    initialData?.name,
    initialData?._id,
    initialData?.type,
    initialData?.meal,
    initialData?.time,
    initialData?.difficulty,
    initialData?.season,
    initialData?.occasion,
    initialData?.dietaryType,
    initialData?.servings,
    initialData?.ingredients,
    initialData?.instructions,
    initialData?.image,
  ]);

  useEffect(() => {
    if (onFormDataChange) {
      onFormDataChange(formData);
    }
  }, [formData, onFormDataChange]);

  const handleStepChange = (step: number) => {
    if (
      step === 2 &&
      (!formData.name ||
        !formData.dietaryType ||
        !formData.type ||
        !formData.meal)
    ) {
      setError("Please complete all fields in Recipe Essentials.");
      return;
    }

    if (
      step === 3 &&
      (!formData.time ||
        !formData.difficulty ||
        !formData.season ||
        !formData.occasion)
    ) {
      setError("Please complete all fields in Recipe Characteristics.");
      return;
    }

    if (
      step === 4 &&
      (formData.servings < 1 ||
        formData.ingredients.some(
          (ingredient) => !ingredient.name || !ingredient.quantity
        ))
    ) {
      setError(
        "Please ensure all ingredients and instructions are filled out."
      );
      return;
    }

    setError(null);
    setAnimationClass("opacity-0 translate-y-8");
    setTimeout(() => {
      setCurrentStep(step);
      setAnimationClass("opacity-100 translate-y-0");
    }, 150);
  };

  const handleInputChange = (
    field: keyof RecipeFormData,
    value: string | number
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({
        ...prev,
        image: e.target.files![0],
      }));
    }
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

    if (
      (formData.instructions.length <= 1 && formData.instructions[0] === "") ||
      !formData.image
    ) {
      setError(
        "Please provide more detailed cooking instructions and an image."
      );
      return;
    }

    setError(null);

    if (onSubmit) {
      onSubmit(formData);
    }
  };

  const renderStep1 = () => (
    <div className={`space-y-6 sm:space-y-8 transition-all duration-300 ${animationClass}`}>
      <div className="text-center mb-8 sm:mb-10 md:mb-12">
        <div className="mx-auto w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-primary-orange to-primary-orange-dark text-neutral-100 rounded-full flex items-center justify-center text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 shadow-lg animate-subtle-pulse">
          👨‍🍳
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-800 mb-2 sm:mb-3">
          Recipe Essentials
        </h2>
        <p className="text-neutral-600 text-sm sm:text-base md:text-lg px-4">
          Let&apos;s capture the heart of your culinary creation
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
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
    <div className={`space-y-6 sm:space-y-8 transition-all duration-300 ${animationClass}`}>
      <div className="text-center mb-8 sm:mb-10 md:mb-12">
        <div className="mx-auto w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-primary-orange to-primary-orange-dark text-neutral-100 rounded-full flex items-center justify-center text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 shadow-lg animate-subtle-pulse">
          ⭐
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-800 mb-2 sm:mb-3">
          Recipe Characteristics
        </h2>
        <p className="text-neutral-600 text-sm sm:text-base md:text-lg px-4">
          Define the personality of your dish
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
        <Input
          label="Cooking Duration"
          type="number"
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
          placeholder="What's the vibe?"
        />
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className={`space-y-6 sm:space-y-8 transition-all duration-300 ${animationClass}`}>
      <div className="text-center mb-8 sm:mb-10 md:mb-12">
        <div className="mx-auto w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-primary-orange to-primary-orange-dark text-neutral-100 rounded-full flex items-center justify-center text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 shadow-lg animate-subtle-pulse">
          🍽️
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-800 mb-2 sm:mb-3">
          Ingredients & Portions
        </h2>
        <p className="text-neutral-600 text-sm sm:text-base md:text-lg px-4">
          The building blocks of your masterpiece
        </p>
      </div>

      <div className="space-y-6 sm:space-y-8">
        <div className="bg-neutral-50 rounded-2xl p-4 sm:p-6 border-2 border-neutral-200 hover:border-primary-orange-light transition-all duration-300 shadow-sm hover:shadow-md">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-4">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-primary-orange to-primary-orange-dark text-neutral-100 rounded-full flex items-center justify-center text-sm sm:text-lg font-bold shadow-md">
              👥
            </div>
            <div className="space-y-2">
              <label
                htmlFor="servings"
                className="block text-xs sm:text-sm font-semibold text-neutral-700 uppercase tracking-wide"
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
                className="w-20 sm:w-24 px-3 sm:px-4 py-2 sm:py-3 rounded-xl border-2 border-neutral-200 focus:outline-none focus:ring-0 focus:border-primary-orange focus:shadow-none outline-none transition-all duration-300 ease-out hover:border-primary-orange-light hover:shadow-md bg-neutral-50 shadow-sm text-center text-sm sm:text-base font-semibold active:border-primary-orange active:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4 sm:space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0">
            <h3 className="text-lg sm:text-xl font-bold text-neutral-800 flex items-center gap-2">
              <span className="text-primary-orange">🥄</span>
              Ingredients List
            </h3>
            <button
              type="button"
              onClick={addIngredient}
              className="flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-primary-orange to-primary-orange-dark text-neutral-100 rounded-xl hover:from-primary-orange-dark hover:to-primary-orange-dark transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 text-sm sm:text-base"
            >
              <span className="w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center text-lg sm:text-2xl font-medium">
                +
              </span>
              <span>Add Ingredient</span>
            </button>
          </div>

          {formData.ingredients.map((ingredient, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 p-4 sm:p-6 bg-neutral-white rounded-2xl border-2 border-neutral-200 hover:border-primary-orange-light transition-all duration-300 shadow-sm hover:shadow-md transform"
            >
              <div className="flex-1">
                <input
                  type="text"
                  name={`ingredient-name-${index}`}
                  value={ingredient.name}
                  onChange={(e) =>
                    handleIngredientChange(index, "name", e.target.value)
                  }
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border-2 border-neutral-200 focus:outline-none focus:ring-0 focus:border-primary-orange focus:shadow-none outline-none transition-all duration-300 ease-out hover:border-primary-orange-light hover:shadow-md bg-neutral-white shadow-sm active:border-primary-orange active:outline-none text-sm sm:text-base"
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
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border-2 border-neutral-200 focus:outline-none focus:ring-0 focus:border-primary-orange focus:shadow-none outline-none transition-all duration-300 ease-out hover:border-primary-orange-light hover:shadow-md bg-neutral-white shadow-sm active:border-primary-orange active:outline-none text-sm sm:text-base"
                  placeholder="How much? (e.g., 1 cup, 2 tbsp)"
                />
              </div>
              {formData.ingredients.length > 1 && (
                <div className="flex justify-end sm:block">
                  <button
                    type="button"
                    onClick={() => removeIngredient(index)}
                    className="p-2 sm:p-3 text-red-500 hover:bg-red-50 rounded-xl transition-all duration-300 hover:scale-110"
                  >
                    <span className="w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center text-base sm:text-lg font-bold">
                      ×
                    </span>
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className={`space-y-6 sm:space-y-8 transition-all duration-300 ${animationClass}`}>
      <div className="text-center mb-8 sm:mb-10 md:mb-12">
        <div className="mx-auto w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-primary-orange to-primary-orange-dark text-neutral-100 rounded-full flex items-center justify-center text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 shadow-lg">
          📖
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-800 mb-2 sm:mb-3">
          Recipe Instructions
        </h2>
        <p className="text-neutral-600 text-sm sm:text-base md:text-lg px-4">
          Guide others through your culinary journey
        </p>
      </div>

      <div className="space-y-6 sm:space-y-8">
        <div className="space-y-4 sm:space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0">
            <h3 className="text-lg sm:text-xl font-bold text-neutral-800 flex items-center gap-2">
              <span className="text-primary-orange">📝</span>
              Step-by-Step Guide
            </h3>
            <button
              type="button"
              onClick={addInstruction}
              className="flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-primary-orange to-primary-orange-dark text-neutral-100 rounded-xl hover:from-primary-orange-dark hover:to-primary-orange-dark transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 text-sm sm:text-base"
            >
              <span className="w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center text-lg sm:text-2xl font-medium">
                +
              </span>
              <span>Add Step</span>
            </button>
          </div>

          {formData.instructions.map((instruction, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 p-4 sm:p-6 bg-neutral-white rounded-2xl border-2 border-neutral-200 hover:border-primary-orange-light transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-[1.02]"
            >
              <span className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-primary-orange to-primary-orange-dark text-neutral-100 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold shadow-md">
                {index + 1}
              </span>
              <div className="flex-1 w-full">
                <textarea
                  name={`instruction-${index}`}
                  value={instruction}
                  onChange={(e) =>
                    handleInstructionChange(index, e.target.value)
                  }
                  className="w-full px-3 sm:px-4 py-3 sm:py-4 rounded-xl border-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-orange-500 focus:shadow-none outline-none transition-all duration-300 ease-out hover:border-orange-300 hover:shadow-md bg-white shadow-sm resize-none active:border-orange-500 active:outline-none text-sm sm:text-base"
                  rows={3}
                  placeholder="Describe this step clearly and concisely..."
                />
              </div>
              {formData.instructions.length > 1 && (
                <div className="flex justify-end sm:block w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => removeInstruction(index)}
                    className="p-2 sm:p-3 text-red-500 hover:bg-red-50 rounded-xl transition-all duration-300 hover:scale-110"
                  >
                    <span className="w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center text-base sm:text-lg font-bold">
                      ×
                    </span>
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl p-4 sm:p-6 border-2 border-gray-100 hover:border-orange-200 transition-all duration-300 shadow-sm hover:shadow-md">
          <label
            htmlFor="image"
            className="block text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3 sm:mb-4"
          >
            Recipe Image
          </label>

          {formData.image && typeof formData.image === "string" && (
            <div className="mb-3 sm:mb-4">
              <p className="text-xs sm:text-sm text-gray-600 mb-2">Current image:</p>
              <Image
                width={128}
                height={128}
                src={formData.image}
                alt={formData.name || "Recipe Image"}
                className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-lg border-2 border-gray-200"
              />
              <p className="text-xs text-gray-500 mt-1">
                Upload a new image to replace this one
              </p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-full flex items-center justify-center text-sm sm:text-lg font-bold shadow-md">
              📷
            </div>
            <input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="flex-1 w-full px-3 sm:px-4 py-3 sm:py-4 rounded-xl border-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-orange-500 focus:shadow-none outline-none transition-all duration-300 ease-out hover:border-orange-300 hover:shadow-md bg-white shadow-sm active:border-orange-500 active:outline-none text-sm sm:text-base"
              placeholder="Share a beautiful photo of your dish"
            />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100 py-6 sm:py-8 md:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 md:p-12 border border-orange-100">
          <div className="mb-8 sm:mb-10 md:mb-12">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              {[1, 2, 3, 4].map((step) => (
                <div
                  key={step}
                  className={`relative rounded-full flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-sm sm:text-base md:text-lg font-bold transition-all duration-500 ${
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
            <div className="w-full bg-gray-200 rounded-full h-2 sm:h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-orange-500 to-orange-600 h-2 sm:h-3 rounded-full transition-all duration-700 ease-out shadow-sm"
                style={{ width: `${(currentStep / 4) * 100}%` }}
              />
            </div>
            <div className="flex justify-between text-xs sm:text-sm text-gray-500 mt-1 sm:mt-2 font-semibold">
              <span className="hidden sm:inline">Basics</span>
              <span className="hidden sm:inline">Details</span>
              <span className="hidden sm:inline">Ingredients</span>
              <span className="hidden sm:inline">Instructions</span>
              <span className="sm:hidden">1</span>
              <span className="sm:hidden">2</span>
              <span className="sm:hidden">3</span>
              <span className="sm:hidden">4</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8 sm:space-y-10">
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}
            {currentStep === 4 && renderStep4()}

            <div className="flex flex-col items-center">
              {error && (
                <p className="text-red-500 w-full text-center pb-6 sm:pb-8 md:pb-10 text-sm sm:text-base px-4">{error}</p>
              )}
              <div className="flex flex-col sm:flex-row justify-between pt-6 sm:pt-8 md:pt-10 border-t-2 border-orange-100 w-full gap-4 sm:gap-0">
                <button
                  type="button"
                  onClick={() => handleStepChange(currentStep - 1)}
                  disabled={currentStep === 1}
                  className={`flex justify-center items-center gap-2 sm:gap-4 px-4 sm:px-6 md:px-8 py-3 sm:py-4 rounded-xl font-semibold transition-all duration-300 transform text-sm sm:text-base ${
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
                    className="flex justify-center items-center gap-2 sm:gap-4 px-4 sm:px-6 md:px-8 py-3 sm:py-4 rounded-xl font-semibold transition-all duration-300 bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 shadow-lg hover:shadow-xl transform hover:scale-105 text-sm sm:text-base"
                  >
                    <span>Next</span>
                    <span>→</span>
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`px-6 sm:px-8 md:px-10 py-3 sm:py-4 rounded-xl font-semibold transition-all duration-300 transform text-sm sm:text-base ${
                      isSubmitting
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 hover:scale-105 shadow-lg hover:shadow-xl"
                    } text-white`}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Processing...
                      </span>
                    ) : (
                      `✨ ${submitButtonText}`
                    )}
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RecipeForm;
