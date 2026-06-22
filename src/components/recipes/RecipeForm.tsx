"use client";

import React, { useState, useEffect } from "react";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import StepProgress from "./StepProgress";
import RecipePreview from "./RecipePreview";
import {
  FileText,
  Utensils,
  Leaf,
  Clock,
  ClipboardList,
  Sun,
  Sparkles,
  Users,
  Plus,
  Trash2,
  Camera,
  AlertCircle,
  ArrowRight,
  Eye,
  Lightbulb,
  ChevronDown,
  BookOpen
} from "lucide-react";

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
  const [error, setError] = useState<string | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  useEffect(() => {
    if (initialData && initialData.name) {
      setFormData((prev) => ({
        ...prev,
        ...initialData,
      }));
    }
  }, [initialData]);

  useEffect(() => {
    if (onFormDataChange) {
      onFormDataChange(formData);
    }
  }, [formData, onFormDataChange]);

  const handleInputChange = (name: string, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleIngredientChange = (index: number, field: "name" | "quantity", value: string) => {
    const updatedIngredients = [...formData.ingredients];
    updatedIngredients[index] = {
      ...updatedIngredients[index],
      [field]: value,
    };
    setFormData((prev) => ({
      ...prev,
      ingredients: updatedIngredients,
    }));
  };

  const addIngredient = () => {
    setFormData((prev) => ({
      ...prev,
      ingredients: [...prev.ingredients, { name: "", quantity: "" }],
    }));
  };

  const removeIngredient = (index: number) => {
    if (formData.ingredients.length > 1) {
      const updatedIngredients = formData.ingredients.filter((_, idx) => idx !== index);
      setFormData((prev) => ({
        ...prev,
        ingredients: updatedIngredients,
      }));
    }
  };

  const handleInstructionChange = (index: number, value: string) => {
    const updatedInstructions = [...formData.instructions];
    updatedInstructions[index] = value;
    setFormData((prev) => ({
      ...prev,
      instructions: updatedInstructions,
    }));
  };

  const addInstruction = () => {
    setFormData((prev) => ({
      ...prev,
      instructions: [...prev.instructions, ""],
    }));
  };

  const removeInstruction = (index: number) => {
    if (formData.instructions.length > 1) {
      const updatedInstructions = formData.instructions.filter((_, idx) => idx !== index);
      setFormData((prev) => ({
        ...prev,
        instructions: updatedInstructions,
      }));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setFormData((prev) => ({
        ...prev,
        image: files[0],
      }));
    }
  };

  const validateStep = (step: number) => {
    setError(null);
    if (step === 1) {
      if (!formData.name.trim()) return "Recipe Title is required.";
      if (!formData.type) return "Category is required.";
      if (!formData.meal) return "Meal type is required.";
      if (!formData.dietaryType) return "Dietary Preference is required.";
    } else if (step === 2) {
      if (!formData.time || Number(formData.time) <= 0) return "Valid Prep Time is required.";
      if (!formData.difficulty) return "Difficulty is required.";
      if (!formData.season) return "Best Season is required.";
      if (!formData.occasion) return "Occasion is required.";
    } else if (step === 3) {
      const emptyIng = formData.ingredients.some(ing => !ing.name.trim() || !ing.quantity.trim());
      if (emptyIng) return "All ingredients must have a name and quantity.";
    }
    return null;
  };

  const handleNext = () => {
    const validationError = validateStep(currentStep);
    if (validationError) {
      setError(validationError);
      return;
    }
    setCurrentStep((prev) => Math.min(prev + 1, 4));
  };

  const handlePrev = () => {
    setError(null);
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const validationError = validateStep(currentStep);
    if (validationError) {
      setError(validationError);
      return;
    }
    if (onSubmit) {
      onSubmit(formData);
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6 animate-fade-in">
            <header className="mb-6">
              <h1 className="text-2xl lg:text-4xl font-display font-bold text-gray-900 dark:text-white leading-tight">Recipe Essentials</h1>
              <p className="text-sm lg:text-base text-gray-500 dark:text-gray-400 mt-1">First, the fundamental details.</p>
            </header>
            <Input 
              label="Recipe Title" 
              name="name" 
              value={formData.name} 
              onChange={(v) => handleInputChange("name", v as string)} 
              icon={FileText}
              charCount={formData.name.length}
              maxChars={60}
              placeholder="e.g. Classic Beef Tacos"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select 
                label="Category" 
                name="type" 
                value={formData.type} 
                onChange={(v) => handleInputChange("type", v)} 
                options={staticData.types} 
                icon={Utensils}
                placeholder="Select category"
              />
              <Select 
                label="Perfect For" 
                name="meal" 
                value={formData.meal} 
                onChange={(v) => handleInputChange("meal", v)} 
                options={staticData.meals} 
                icon={BookOpen}
                placeholder="When to enjoy?"
              />
            </div>
            <Select 
              label="Dietary Preference" 
              name="dietaryType" 
              value={formData.dietaryType} 
              onChange={(v) => handleInputChange("dietaryType", v)} 
              options={staticData.dietaryTypes} 
              icon={Leaf}
              placeholder="Choose dietary type"
            />
          </div>
        );
      case 2:
        return (
          <div className="space-y-6 animate-fade-in">
            <header className="mb-6">
              <h1 className="text-2xl lg:text-4xl font-display font-bold text-gray-900 dark:text-white leading-tight">Recipe Details</h1>
              <p className="text-sm lg:text-base text-gray-500 dark:text-gray-400 mt-1">Define the personality of your dish.</p>
            </header>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input 
                label="Prep Time (mins)" 
                type="number" 
                name="time" 
                value={formData.time} 
                onChange={(v) => handleInputChange("time", v as string)} 
                icon={Clock}
                placeholder="e.g. 30"
              />
              <Select 
                label="Difficulty" 
                name="difficulty" 
                value={formData.difficulty} 
                onChange={(v) => handleInputChange("difficulty", v)} 
                options={staticData.difficulties} 
                icon={ClipboardList}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select 
                label="Best Season" 
                name="season" 
                value={formData.season} 
                onChange={(v) => handleInputChange("season", v)} 
                options={staticData.seasons} 
                icon={Sun}
              />
              <Select 
                label="Occasion" 
                name="occasion" 
                value={formData.occasion} 
                onChange={(v) => handleInputChange("occasion", v)} 
                options={staticData.occasions} 
                icon={Sparkles}
              />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6 animate-fade-in">
            <header className="mb-6">
              <h1 className="text-2xl lg:text-4xl font-display font-bold text-gray-900 dark:text-white leading-tight">Ingredients & Portions</h1>
              <p className="text-sm lg:text-base text-gray-500 dark:text-gray-400 mt-1">The building blocks of your masterpiece.</p>
            </header>
            <Input 
              label="Servings" 
              type="number" 
              name="servings" 
              value={formData.servings} 
              onChange={(v) => handleInputChange("servings", v as number)} 
              icon={Users}
            />
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-gray-900 dark:text-white">Ingredients List</h3>
                <button 
                  type="button" 
                  onClick={addIngredient}
                  className="px-4 py-2 bg-primary-stitch/10 text-primary-stitch rounded-xl font-bold text-xs hover:bg-primary-stitch/20 transition-all flex items-center gap-1"
                >
                  <Plus className="w-4 h-4" /> Add
                </button>
              </div>
              {formData.ingredients.map((ing, idx) => (
                <div key={idx} className="flex gap-2 animate-slide-up" style={{ animationDelay: `${idx * 50}ms` }}>
                  <Input 
                    label="" 
                    placeholder="Ingredient" 
                    value={ing.name} 
                    onChange={(v) => handleIngredientChange(idx, "name", v as string)} 
                    containerClassName="flex-[2]"
                  />
                  <Input 
                    label="" 
                    placeholder="Qty" 
                    value={ing.quantity} 
                    onChange={(v) => handleIngredientChange(idx, "quantity", v as string)} 
                    containerClassName="flex-1"
                  />
                  {formData.ingredients.length > 1 && (
                    <button 
                      type="button" 
                      onClick={() => removeIngredient(idx)}
                      className="p-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-xl transition-all h-[52px] mt-auto"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6 animate-fade-in">
            <header className="mb-6">
              <h1 className="text-2xl lg:text-4xl font-display font-bold text-gray-900 dark:text-white leading-tight">Instructions & Image</h1>
              <p className="text-sm lg:text-base text-gray-500 dark:text-gray-400 mt-1">Guide others through the cooking process.</p>
            </header>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-gray-900 dark:text-white">Cooking Steps</h3>
                <button 
                  type="button" 
                  onClick={addInstruction}
                  className="px-4 py-2 bg-primary-stitch/10 text-primary-stitch rounded-xl font-bold text-xs hover:bg-primary-stitch/20 transition-all flex items-center gap-1"
                >
                  <Plus className="w-4 h-4" /> Add Step
                </button>
              </div>
              {formData.instructions.map((inst, idx) => (
                <div key={idx} className="flex gap-2 items-start animate-slide-up" style={{ animationDelay: `${idx * 50}ms` }}>
                  <div className="w-8 h-8 rounded-full bg-primary-stitch/10 text-primary-stitch flex items-center justify-center font-bold text-xs shrink-0 mt-3">
                    {idx + 1}
                  </div>
                  <Input 
                    label="" 
                    type="textarea"
                    placeholder="Describe this step..." 
                    value={inst} 
                    onChange={(v) => handleInstructionChange(idx, v as string)} 
                    containerClassName="flex-1"
                  />
                  {formData.instructions.length > 1 && (
                    <button 
                      type="button" 
                      onClick={() => removeInstruction(idx)}
                      className="p-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-xl transition-all shrink-0 mt-3"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
            <div className="group space-y-2">
              <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 ml-1 uppercase tracking-wider">Recipe Image</label>
              <div className="relative glass-panel rounded-2xl p-6 border-dashed border-2 border-gray-200 dark:border-gray-700 hover:border-primary-stitch transition-all cursor-pointer">
                <input type="file" onChange={handleImageChange} className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" />
                <div className="flex flex-col items-center gap-2">
                  <Camera className="w-10 h-10 text-gray-400" />
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {formData.image ? (typeof formData.image === 'string' ? "Replace Image" : (formData.image as File).name) : "Upload recipe photo"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark transition-colors duration-300">
      <div className="fixed top-32 left-10 w-64 h-64 bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 -z-10 dark:bg-orange-900/30"></div>
      <div className="fixed bottom-32 right-10 w-64 h-64 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 -z-10 dark:bg-purple-900/30"></div>

      <main className="pt-20 sm:pt-24 md:pt-28 pb-24 sm:pb-28 md:pb-32 lg:pb-12 px-3 sm:px-5 max-w-7xl mx-auto w-full">
        <StepProgress currentStep={currentStep} totalSteps={4} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-12">
          <div className="lg:col-span-12 xl:col-span-7 bg-white/70 dark:bg-black/30 backdrop-blur-xl border border-white dark:border-white/10 rounded-2xl sm:rounded-3xl p-4 sm:p-5 md:p-6 lg:p-10 shadow-glass">
            <form onSubmit={handleSubmit}>
              {renderCurrentStep()}

              {error && (
                <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30 rounded-2xl flex items-center gap-3 text-red-600 dark:text-red-400 animate-shake">
                  <AlertCircle className="w-5 h-5 text-red-500" />
                  <p className="text-sm font-medium">{error}</p>
                </div>
              )}

              <div className="hidden lg:flex items-center justify-between mt-12 pt-8 border-t border-gray-100 dark:border-gray-800">
                <button 
                  type="button" 
                  onClick={handlePrev}
                  disabled={currentStep === 1}
                  className="px-6 py-3 rounded-2xl font-bold text-sm text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all disabled:opacity-30"
                >
                  Previous
                </button>
                <div className="flex gap-4">
                  <button type="button" className="px-6 py-3 rounded-2xl font-bold text-sm text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 transition-all">Save Draft</button>
                  {currentStep < 4 ? (
                    <button 
                      type="button" 
                      onClick={handleNext}
                      className="px-8 py-3 rounded-2xl bg-gradient-to-r from-primary-stitch to-orange-600 text-white font-bold text-sm shadow-glow hover:shadow-glow-hover transition-all flex items-center gap-2"
                    >
                      Next Step <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="px-10 py-3 rounded-2xl bg-gradient-to-r from-green-500 to-green-600 text-white font-bold text-sm shadow-lg hover:bg-green-600 transition-all disabled:opacity-50"
                    >
                      {isSubmitting ? "Submitting..." : `✨ ${submitButtonText}`}
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>

          <div className="hidden xl:block xl:col-span-5 h-full">
            <div className="sticky top-32 space-y-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                  <Eye className="w-4 h-4" /> Live Preview
                </h3>
              </div>
              <RecipePreview formData={formData} />
              
              <div className="p-6 rounded-3xl bg-gradient-to-br from-orange-50 to-white dark:from-gray-800/50 dark:to-gray-900/50 border border-orange-100 dark:border-gray-700 flex items-start gap-4 shadow-sm">
                <div className="p-2.5 bg-orange-100 dark:bg-orange-900/30 rounded-xl text-primary-stitch flex-shrink-0">
                  <Lightbulb className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-base text-gray-900 dark:text-white">Pro Tip</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
                    Recipes with high-quality photos get 40% more engagement. Use natural light for best results!
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="xl:hidden bg-white/50 dark:bg-black/20 backdrop-blur-md rounded-3xl border border-white dark:border-white/10 overflow-hidden shadow-sm lg:col-span-5 xl:col-span-0">
            <button 
              onClick={() => setIsPreviewOpen(!isPreviewOpen)}
              className="w-full flex items-center justify-between p-4 px-6 md:hidden"
            >
               <div className="flex items-center gap-2">
                <Eye className="w-5 h-5 text-primary-stitch" />
                <span className="font-bold text-sm">Live Preview</span>
              </div>
              <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isPreviewOpen ? 'rotate-180' : ''}`} />
            </button>
            <div className={`p-4 md:block ${isPreviewOpen ? 'block' : 'hidden'}`}>
              <RecipePreview formData={formData} />
            </div>
          </div>
        </div>
      </main>

      <footer className="lg:hidden fixed bottom-6 sm:bottom-10 left-3 right-3 sm:left-5 sm:right-5 z-40">
        <div className="glass-panel rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-2xl flex items-center gap-2 sm:gap-3">
          <button type="button" className="flex-1 py-3 sm:py-4 px-2 rounded-lg sm:rounded-xl bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-bold text-[10px] sm:text-xs shadow-sm border border-gray-100 dark:border-gray-800">
            Draft
          </button>
          {currentStep > 1 && (
            <button onClick={handlePrev} className="p-3 sm:p-4 rounded-lg sm:rounded-xl bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 shadow-sm border border-gray-100 dark:border-gray-800">
              ←
            </button>
          )}
          {currentStep < 4 ? (
            <button 
              className="flex-[2] py-3 sm:py-4 px-3 sm:px-4 rounded-lg sm:rounded-xl bg-gradient-to-r from-primary-stitch to-orange-600 text-white font-bold text-xs sm:text-sm shadow-glow flex items-center justify-center gap-2"
              onClick={handleNext}
            >
              Next Step <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button 
              className="flex-[2] py-3 sm:py-4 px-3 sm:px-4 rounded-lg sm:rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white font-bold text-xs sm:text-sm shadow-lg flex items-center justify-center gap-2"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              Finish ✨
            </button>
          )}
        </div>
      </footer>
    </div>
  );
};

export default RecipeForm;
