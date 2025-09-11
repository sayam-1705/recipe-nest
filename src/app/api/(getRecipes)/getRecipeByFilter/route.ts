import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "../../mongodb";
import { z } from "zod";
import Recipe from "@/models/Recipe";

const reqSchema = z.object({
  name: z.string().optional(),
  type: z.string().optional(),
  meal: z.string().optional(),
  time: z.string().optional(),
  difficulty: z.string().optional(),
  season: z.string().optional(),
  occasion: z.string().optional(),
  dietaryType: z.string().optional(),
  ingredients: z
    .array(
      z.object({
        name: z.string().optional(),
      })
    )
    .optional(),
});

export async function POST(req: NextRequest) {
  try {
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
      dietaryType,
      ingredients,
    } = bodyData.data;

    const query: Record<string, unknown> = {};

    if (name) query.name = { $regex: name, $options: "i" };
    if (type) query.type = type;
    if (meal) query.meal = meal;
    if (time) query.time = time;
    if (difficulty) query.difficulty = difficulty;
    if (season) query.season = season;
    if (occasion) query.occasion = occasion;
    if (dietaryType) query.dietaryType = dietaryType;
    if (ingredients && ingredients.length > 0) {
      query.ingredients = {
        $elemMatch: {
          name: { $in: ingredients.map((ingredient) => ingredient.name) },
        },
      };
    }

    const recipes = await Recipe.find(query);

    return NextResponse.json({ recipes }, { status: 200 });
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
