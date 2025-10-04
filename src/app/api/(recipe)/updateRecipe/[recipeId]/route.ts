import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/app/api/mongodb";
import { z } from "zod";
import { getNutritionInfo } from "@/app/api/getNutritionInfo";
import Recipe from "@/models/Recipe";
import mongoose from "mongoose";
import { auth } from "@/app/api/auth";

const reqSchema = z.object({
  name: z.string().min(1, "Name is required"),
  type: z.string().min(1, "Type is required"),
  meal: z.string().min(1, "Meal is required"),
  time: z.string().min(1, "Time is required"),
  difficulty: z.string().min(1, "Difficulty is required"),
  season: z.string().min(1, "Season is required"),
  occasion: z.string().min(1, "Occasion is required"),
  dietaryType: z.enum(["Vegetarian", "Non-Vegetarian", "Vegan"], {
    required_error: "Dietary type is required",
  }),
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

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ recipeId: string }> }
) {
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

    const { recipeId } = await params;

    if (!mongoose.Types.ObjectId.isValid(recipeId)) {
      return NextResponse.json(
        { error: "Invalid recipe ID format" },
        { status: 400 }
      );
    }

    const {
      name,
      type,
      meal,
      time,
      difficulty,
      season,
      occasion,
      dietaryType,
      servings,
      ingredients,
      instructions,
      image,
    } = bodyData.data;

    const existingRecipe = await Recipe.findById(recipeId);
    if (!existingRecipe) {
      return NextResponse.json({ error: "Recipe not found" }, { status: 404 });
    }

    if (existingRecipe.userId.toString() !== authData.userId) {
      return NextResponse.json(
        { error: "You can only update your own recipes" },
        { status: 403 }
      );
    }

    let totalCalories = 0;
    let totalENERC_KCAL = 0;
    let totalPROCNT_KCAL = 0;
    let totalFAT_KCAL = 0;
    let totalCHOCDF_KCAL = 0;
    const ingredientsWithNutrition: Ingredient[] = [];

    for (const ingredient of ingredients) {
      if (ingredient?.name && ingredient?.quantity) {
        const nutritionData = await getNutritionInfo([
          ingredient.quantity,
          ingredient.name,
        ]);

        totalCalories += nutritionData.calories;
        totalENERC_KCAL += nutritionData.totalNutrientsKCal.ENERC_KCAL.quantity;
        totalPROCNT_KCAL +=
          nutritionData.totalNutrientsKCal.PROCNT_KCAL.quantity;
        totalFAT_KCAL += nutritionData.totalNutrientsKCal.FAT_KCAL.quantity;
        totalCHOCDF_KCAL +=
          nutritionData.totalNutrientsKCal.CHOCDF_KCAL.quantity;

        ingredientsWithNutrition.push({
          name: ingredient.name,
          quantity: ingredient.quantity,
          nutrition: nutritionData,
        });
      }
    }

    const nutritionPerServing = {
      calories: Number((totalCalories / servings).toFixed(2)),
      ENERC_KCAL: Number((totalENERC_KCAL / servings).toFixed(2)),
      PROCNT_KCAL: Number((totalPROCNT_KCAL / servings).toFixed(2)),
      FAT_KCAL: Number((totalFAT_KCAL / servings).toFixed(2)),
      CHOCDF_KCAL: Number((totalCHOCDF_KCAL / servings).toFixed(2)),
    };

    const updatedRecipe = await Recipe.findByIdAndUpdate(
      recipeId,
      {
        name,
        type,
        meal,
        time,
        difficulty,
        season,
        occasion,
        dietaryType,
        servings,
        ingredients: ingredientsWithNutrition,
        nutritionPerServing,
        instructions,
        image,
      },
      { new: true }
    );

    return NextResponse.json(
      {
        message: "Recipe updated successfully",
        recipe: updatedRecipe,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Update recipe error:", error);
    return NextResponse.json(
      { error: "An error occurred while updating the recipe" },
      { status: 500 }
    );
  }
}
