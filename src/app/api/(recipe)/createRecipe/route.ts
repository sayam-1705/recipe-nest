import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "../../mongodb";
import { z } from "zod";
import { getNutritionInfo } from "../getNutritionInfo";
import { Ingredient } from "../ingredientType";
import Recipe from "@/models/Recipe";
import { auth } from "@/app/api/auth";

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
  try {
    await dbConnect();

    const authData = await auth(req);
    if (!authData) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

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
      calories: Number((totalCalories / servings).toFixed(2)),
      ENERC_KCAL: Number((totalENERC_KCAL / servings).toFixed(2)),
      PROCNT_KCAL: Number((totalPROCNT_KCAL / servings).toFixed(2)),
      FAT_KCAL: Number((totalFAT_KCAL / servings).toFixed(2)),
      CHOCDF_KCAL: Number((totalCHOCDF_KCAL / servings).toFixed(2)),
    };

    const newRecipe = new Recipe({
      userId: authData.userId,
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
  } catch (error) {
    console.error("Create recipe error:", error);
    return NextResponse.json(
      { error: "An error occurred while creating the recipe" },
      { status: 500 }
    );
  }
}
