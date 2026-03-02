import { dbConnect } from "@/app/api/mongodb";
import Recipe from "@/models/Recipe";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    await dbConnect();
    const { userId } = await params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json({ error: "Invalid user ID format" }, { status: 400 });
    }

    const recipes = await Recipe.find({ userId });
    return NextResponse.json({ recipes: recipes || [] });
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return NextResponse.json({ error: "Failed to fetch recipes" }, { status: 500 });
  }
}
