import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/app/api/mongodb";
import { calculateNutrition } from "@/app/api/calculateNutrition";
import Recipe from "@/models/Recipe";
import mongoose from "mongoose";
import { auth } from "@/app/api/auth";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ recipeId: string }> }
) {
  try {
    await dbConnect();

    const authData = await auth(req);
    if (!authData) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    const { name, type, meal, time, difficulty, season, occasion, dietaryType, servings, ingredients, instructions, image } = await req.json();

    if (!name || !type || !meal || !time || !difficulty || !season || !occasion || !dietaryType || !servings || !ingredients || !instructions) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const { recipeId } = await params;

    if (!mongoose.Types.ObjectId.isValid(recipeId)) {
      return NextResponse.json({ error: "Invalid recipe ID format" }, { status: 400 });
    }

    const existingRecipe = await Recipe.findById(recipeId);
    if (!existingRecipe) {
      return NextResponse.json({ error: "Recipe not found" }, { status: 404 });
    }

    if (existingRecipe.userId.toString() !== authData.userId) {
      return NextResponse.json({ error: "You can only update your own recipes" }, { status: 403 });
    }

    const { ingredientsWithNutrition, nutritionPerServing } = await calculateNutrition(ingredients, servings);

    const updatedRecipe = await Recipe.findByIdAndUpdate(
      recipeId,
      {
        name, type, meal, time, difficulty, season, occasion, dietaryType, servings,
        ingredients: ingredientsWithNutrition,
        nutritionPerServing,
        instructions,
        image: image || "",
      },
      { new: true }
    );

    return NextResponse.json({ message: "Recipe updated successfully", recipe: updatedRecipe });
  } catch (error) {
    console.error("Update recipe error:", error);
    return NextResponse.json({ error: "Failed to update recipe" }, { status: 500 });
  }
}
