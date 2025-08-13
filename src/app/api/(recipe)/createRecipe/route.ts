import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "../../mongodb";
import Recipe from "@/models/Recipe";
import { getNutritionInfo } from "../getNutritionInfo";
import { z } from "zod";
import { auth } from "@/app/api/auth";

const reqSchema = z.object({
  name: z.string().min(1),
  type: z.string().min(1),
  meal: z.string().min(1),
  time: z.string().min(1),
  difficulty: z.string().min(1),
  season: z.string().min(1),
  occasion: z.string().min(1),
  dietaryType: z.enum(["Vegetarian", "Non-Vegetarian", "Vegan"]),
  servings: z.coerce.number().min(1),
  ingredients: z.array(z.object({ name: z.string(), quantity: z.string() })),
  instructions: z.array(z.string()),
  image: z.string().optional(),
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

    // For App Router, we handle FormData directly
    const formData = await req.formData();

    const getField = (key: string): string => {
      const value = formData.get(key);
      return value instanceof File ? "" : value?.toString() || "";
    };

    const parsedFields = {
      name: getField("name"),
      type: getField("type"),
      meal: getField("meal"),
      time: getField("time"),
      difficulty: getField("difficulty"),
      season: getField("season"),
      occasion: getField("occasion"),
      dietaryType: getField("dietaryType"),
      servings: getField("servings"),
      ingredients: JSON.parse(getField("ingredients") || "[]"),
      instructions: JSON.parse(getField("instructions") || "[]"),
    };

    const bodyData = reqSchema.safeParse(parsedFields);
    if (!bodyData.success) {
      return NextResponse.json(
        { error: bodyData.error.format() },
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
    } = bodyData.data;

    let imageBase64 = "";
    const imageFile = formData.get("image") as File | null;

    if (imageFile && imageFile.size > 0) {
      const buffer = await imageFile.arrayBuffer();
      const mimeType = imageFile.type || "image/png";
      imageBase64 = `data:${mimeType};base64,${Buffer.from(buffer).toString(
        "base64"
      )}`;
    }

    // Nutrition logic
    let totalCalories = 0;
    let totalENERC_KCAL = 0;
    let totalPROCNT_KCAL = 0;
    let totalFAT_KCAL = 0;
    let totalCHOCDF_KCAL = 0;
    const ingredientsWithNutrition: any[] = [];

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
      image: imageBase64,
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
    console.error(error);
    return NextResponse.json(
      { error: "An error occurred while creating the recipe" },
      { status: 500 }
    );
  }
}
