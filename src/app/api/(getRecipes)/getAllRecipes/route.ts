import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "../../mongodb";
import Recipe from "@/models/Recipe";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const recipes = await Recipe.find();

    return NextResponse.json({ recipes }, { status: 200 });
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching recipes" },
      { status: 500 }
    );
  }
}
