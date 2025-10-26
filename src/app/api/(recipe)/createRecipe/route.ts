import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "../../mongodb";
import Recipe from "@/models/Recipe";
import { getNutritionInfo } from "@/app/api/getNutritionInfo";
import { auth } from "@/app/api/auth";

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
    } = body;

    if (
      !name ||
      !type ||
      !meal ||
      !time ||
      !difficulty ||
      !season ||
      !occasion ||
      !dietaryType ||
      !servings ||
      !ingredients ||
      !instructions
    ) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Calculate nutrition
    let totalCalories = 0;
    let totalENERC_KCAL = 0;
    let totalPROCNT_KCAL = 0;
    let totalFAT_KCAL = 0;
    let totalCHOCDF_KCAL = 0;
    const ingredientsWithNutrition = [];

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
      dietaryType,
      servings,
      ingredients: ingredientsWithNutrition,
      nutritionPerServing,
      instructions,
      image: image || "",
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
      { error: "Failed to create recipe" },
      { status: 500 }
    );
  }
}
