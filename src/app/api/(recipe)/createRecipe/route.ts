import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "../../mongodb";
import { z } from "zod";
import { getNutritionInfo } from "../GetNutritionInfo";
import { Ingredient } from "../IngredientType";
import Recipe from "@/models/Recipe";

const reqSchema = z.object({
  name: z.string().min(1, "Name is required"),
  type: z.string().min(1, "Type is required"),
  meal: z.string().min(1, "Meal is required"),
  time: z.string().min(1, "Time is required"),
  difficulty: z.string().min(1, "Difficulty is required"),
  season: z.string().min(1, "Season is required"),
  occasion: z.string().min(1, "Occasion is required"),
  servings: z.number().min(1, "Servings must be at least 1"),
  ingredients: z.array(
    z.object({
      name: z.string().min(1, "Ingredient name is required"),
      quantity: z.string().min(1, "Ingredient quantity is required"),
    })
  ),
  instructions: z.array(z.string().min(1, "Instruction is required")),
  image: z.string().url("Image must be a valid URL"),
});

export async function POST(req: NextRequest) {
  await dbConnect();

  const body = await req.json();

  const bodyData = reqSchema.safeParse(body);
  if (!bodyData.success) {
    return NextResponse.json({ error: bodyData.error }, { status: 400 });
  }

  const {
    name,
    type,
    meal,
    time,
    difficulty,
    season,
    occasion,
    servings,
    ingredients,
    instructions,
    image,
  } = bodyData.data;

  let totalCalories = 0;
  let totalENERC_KCAL = 0;
  let totalPROCNT_KCAL = 0;
  let totalFAT_KCAL = 0;
  let totalCHOCDF_KCAL = 0;
  const ingredientsWithNutrition: Ingredient[] = [];

  for (const ingredient of ingredients) {
    const nutritionData = await getNutritionInfo([
      ingredient.quantity,
      ingredient.name,
    ]);

    totalCalories += nutritionData.calories;
    totalENERC_KCAL += nutritionData.totalNutrientsKCal.ENERC_KCAL.quantity;
    totalPROCNT_KCAL += nutritionData.totalNutrientsKCal.PROCNT_KCAL.quantity;
    totalFAT_KCAL += nutritionData.totalNutrientsKCal.FAT_KCAL.quantity;
    totalCHOCDF_KCAL += nutritionData.totalNutrientsKCal.CHOCDF_KCAL.quantity;

    ingredientsWithNutrition.push({
      ...ingredient,
      nutrition: nutritionData,
    });
  }

  const nutritionPerServing = {
    calories: totalCalories / servings,
    ENERC_KCAL: totalENERC_KCAL / servings,
    PROCNT_KCAL: totalPROCNT_KCAL / servings,
    FAT_KCAL: totalFAT_KCAL / servings,
    CHOCDF_KCAL: totalCHOCDF_KCAL / servings,
  };

  const newRecipe = new Recipe({
    name,
    type,
    meal,
    time,
    difficulty,
    season,
    occasion,
    servings,
    ingredients: ingredientsWithNutrition,
    nutritionPerServing,
    instructions,
    image,
  });
  await newRecipe.save();

  return NextResponse.json(
    {
      message: "Recipe created successfully",
      recipe: newRecipe,
    },
    { status: 201 }
  );
}
