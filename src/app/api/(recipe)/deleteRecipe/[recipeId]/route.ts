import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/app/api/mongodb";
import Recipe from "@/models/Recipe";
import mongoose from "mongoose";
import { auth } from "@/app/api/auth";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ recipeId: string }> }
) {
  try {
    await dbConnect();

    const authData = await auth(req);
    if (!authData) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const { recipeId } = await params;

    if (!mongoose.Types.ObjectId.isValid(recipeId)) {
      return NextResponse.json(
        { error: "Invalid recipe ID format" },
        { status: 400 }
      );
    }

    const existingRecipe = await Recipe.findById(recipeId);
    if (!existingRecipe) {
      return NextResponse.json({ error: "Recipe not found" }, { status: 404 });
    }

    if (existingRecipe.userId.toString() !== authData.userId) {
      return NextResponse.json(
        { error: "You can only delete your own recipes" },
        { status: 403 }
      );
    }

    await Recipe.deleteOne({ _id: recipeId });

    return NextResponse.json(
      { message: "Recipe deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Delete recipe error:", error);
    return NextResponse.json(
      { error: "An error occurred while deleting the recipe" },
      { status: 500 }
    );
  }
}
