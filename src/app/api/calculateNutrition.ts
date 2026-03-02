import { getNutritionInfo } from "./getNutritionInfo";

interface IngredientInput {
  name: string;
  quantity: string;
}

export async function calculateNutrition(ingredients: IngredientInput[], servings: number) {
  let totalCalories = 0;
  let totalENERC_KCAL = 0;
  let totalPROCNT_KCAL = 0;
  let totalFAT_KCAL = 0;
  let totalCHOCDF_KCAL = 0;
  const ingredientsWithNutrition = [];

  for (const ingredient of ingredients) {
    const nutritionData = await getNutritionInfo([ingredient.quantity, ingredient.name]);

    totalCalories += nutritionData.calories || 0;
    totalENERC_KCAL += nutritionData.totalNutrientsKCal?.ENERC_KCAL?.quantity || 0;
    totalPROCNT_KCAL += nutritionData.totalNutrientsKCal?.PROCNT_KCAL?.quantity || 0;
    totalFAT_KCAL += nutritionData.totalNutrientsKCal?.FAT_KCAL?.quantity || 0;
    totalCHOCDF_KCAL += nutritionData.totalNutrientsKCal?.CHOCDF_KCAL?.quantity || 0;

    ingredientsWithNutrition.push({ ...ingredient, nutrition: nutritionData });
  }

  const nutritionPerServing = {
    calories: Number((totalCalories / servings).toFixed(2)),
    ENERC_KCAL: Number((totalENERC_KCAL / servings).toFixed(2)),
    PROCNT_KCAL: Number((totalPROCNT_KCAL / servings).toFixed(2)),
    FAT_KCAL: Number((totalFAT_KCAL / servings).toFixed(2)),
    CHOCDF_KCAL: Number((totalCHOCDF_KCAL / servings).toFixed(2)),
  };

  return { ingredientsWithNutrition, nutritionPerServing };
}
