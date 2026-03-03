import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "../../mongodb";
import Recipe from "@/models/Recipe";
import { calculateNutrition } from "@/app/api/calculateNutrition";
import { auth } from "@/app/api/auth";

export async function POST(req: NextRequest) {
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

    const { ingredientsWithNutrition, nutritionPerServing } = await calculateNutrition(ingredients, servings);

    const newRecipe = new Recipe({
      userId: authData.userId,
      name, type, meal, time, difficulty, season, occasion, dietaryType, servings,
      ingredients: ingredientsWithNutrition,
      nutritionPerServing,
      instructions,
      image: image || "",
    });

    await newRecipe.save();

    return NextResponse.json({ message: "Recipe created successfully", recipe: newRecipe }, { status: 201 });
  } catch (error) {
    console.error("Create recipe error:", error);
    return NextResponse.json({ error: "Failed to create recipe" }, { status: 500 });
  }
}
