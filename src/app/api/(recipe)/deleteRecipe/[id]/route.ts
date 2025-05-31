import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/app/api/mongodb";
import Recipe from "@/models/Recipe";
import mongoose from "mongoose";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await dbConnect();

  const { id } = await params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json(
      { error: "Invalid recipe ID format" },
      { status: 400 }
    );
  }

  const existingRecipe = await Recipe.findById(id);
  if (!existingRecipe) {
    return NextResponse.json({ error: "Recipe not found" }, { status: 404 });
  }

  await Recipe.deleteOne({ _id: id });

  return NextResponse.json(
    { message: "Recipe deleted successfully" },
    { status: 200 }
  );
}
