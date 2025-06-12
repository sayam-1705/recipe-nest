import { dbConnect } from "@/app/api/mongodb";
import Recipe from "@/models/Recipe";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "../../auth";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const authData = await auth(req);
    if (!authData) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    if (!mongoose.Types.ObjectId.isValid(authData.userId)) {
      return NextResponse.json(
        { error: "Invalid recipe ID format" },
        { status: 400 }
      );
    }

    const recipes = await Recipe.find({ userId: authData.userId });

    if (!recipes || recipes.length === 0) {
      return NextResponse.json(
        { error: "No recipes found for this user" },
        { status: 404 }
      );
    }

    return NextResponse.json({ recipes }, { status: 200 });
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return NextResponse.json(
      { error: "Failed to fetch recipes" },
      { status: 500 }
    );
  }
}
