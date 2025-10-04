import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "../../mongodb";
import Recipe from "@/models/Recipe";
import { getNutritionInfo } from "@/app/api/(recipe)/getNutritionInfo";
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
  servings: z.number().int().min(1),
  ingredients: z.array(z.object({ name: z.string(), quantity: z.string() })),
  instructions: z.array(z.string()),
  image: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    console.log("Attempting authentication for recipe creation...");
    const authData = await auth(req);
    if (!authData) {
      console.log("Authentication failed for recipe creation");
      return NextResponse.json(
        { error: "Authentication required. Please log in again." },
        { status: 401 }
      );
    }

    console.log("Authentication successful for user:", authData.userId);

    const contentType = req.headers.get("content-type");
    let parsedFields;
    let imageFile: File | null = null;
    let body: {
      name?: string;
      type?: string;
      meal?: string;
      time?: string;
      difficulty?: string;
      season?: string;
      occasion?: string;
      dietaryType?: string;
      servings?: number;
      ingredients?: Array<{ name: string; quantity: string }>;
      instructions?: string[];
      image?: string;
    } | null = null;

    if (contentType && contentType.includes("multipart/form-data")) {
      const formData = await req.formData();

      const getField = (key: string): string => {
        const value = formData.get(key);
        return value instanceof File ? "" : value?.toString() || "";
      };

      const servingsValue = getField("servings");
      const servingsNumber = parseInt(servingsValue);

      if (isNaN(servingsNumber) || servingsNumber < 1) {
        console.error("Invalid servings value:", servingsValue);
        return NextResponse.json(
          { error: "Servings must be a valid positive number" },
          { status: 400 }
        );
      }

      let ingredients: Array<{ name: string; quantity: string }> = [];
      let instructions: string[] = [];

      try {
        ingredients = JSON.parse(getField("ingredients") || "[]");
        if (!Array.isArray(ingredients)) {
          throw new Error("Ingredients must be an array");
        }
      } catch (error) {
        console.error("Invalid ingredients format:", error);
        return NextResponse.json(
          { error: "Invalid ingredients format" },
          { status: 400 }
        );
      }

      try {
        instructions = JSON.parse(getField("instructions") || "[]");
        if (!Array.isArray(instructions)) {
          throw new Error("Instructions must be an array");
        }
      } catch (error) {
        console.error("Invalid instructions format:", error);
        return NextResponse.json(
          { error: "Invalid instructions format" },
          { status: 400 }
        );
      }

      parsedFields = {
        name: getField("name"),
        type: getField("type"),
        meal: getField("meal"),
        time: getField("time"),
        difficulty: getField("difficulty"),
        season: getField("season"),
        occasion: getField("occasion"),
        dietaryType: getField("dietaryType"),
        servings: servingsNumber,
        ingredients: ingredients,
        instructions: instructions,
      };

      imageFile = formData.get("image") as File | null;
    } else {
      body = await req.json();
      parsedFields = {
        name: body?.name,
        type: body?.type,
        meal: body?.meal,
        time: body?.time,
        difficulty: body?.difficulty,
        season: body?.season,
        occasion: body?.occasion,
        dietaryType: body?.dietaryType,
        servings: body?.servings,
        ingredients: body?.ingredients || [],
        instructions: body?.instructions || [],
      };
    }

    const bodyData = reqSchema.safeParse(parsedFields);
    if (!bodyData.success) {
      console.error("Validation error:", bodyData.error.format());
      console.error("Parsed fields:", parsedFields);
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

    if (contentType && contentType.includes("multipart/form-data")) {
      if (imageFile && imageFile.size > 0) {
        const buffer = await imageFile.arrayBuffer();
        const mimeType = imageFile.type || "image/png";
        imageBase64 = `data:${mimeType};base64,${Buffer.from(buffer).toString(
          "base64"
        )}`;
      }
    } else {
      if (body && body.image && typeof body.image === "string") {
        imageBase64 = body.image;
      }
    }

    let totalCalories = 0;
    let totalENERC_KCAL = 0;
    let totalPROCNT_KCAL = 0;
    let totalFAT_KCAL = 0;
    let totalCHOCDF_KCAL = 0;
    const ingredientsWithNutrition: Array<{
      name: string;
      quantity: string;
      nutrition?: {
        calories?: number;
        protein?: number;
        carbs?: number;
        fat?: number;
        [key: string]: unknown;
      };
    }> = [];

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
