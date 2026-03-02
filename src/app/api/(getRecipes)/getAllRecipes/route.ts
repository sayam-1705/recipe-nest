import { NextResponse } from "next/server";
import { dbConnect } from "../../mongodb";
import Recipe from "@/models/Recipe";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await dbConnect();
    const recipes = await Recipe.find().sort({ createdAt: -1 });
    return NextResponse.json({ recipes });
  } catch (error) {
    console.error("Get all recipes error:", error);
    return NextResponse.json({ error: "Failed to fetch recipes" }, { status: 500 });
  }
}
