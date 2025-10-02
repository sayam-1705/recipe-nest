import { NextRequest } from "next/server";
import { dbConnect } from "@/app/api/mongodb";
import Recipe from "@/models/Recipe";
import { auth } from "@/app/api/auth";
import { apiResponse } from "@/utils/api";
import { validate } from "@/utils/auth";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ recipeId: string }> }
) {
  try {
    await dbConnect();

    const authData = await auth(req);
    if (!authData) {
      return apiResponse.unauthorized();
    }

    const { recipeId } = await params;

    if (!validate.objectId(recipeId)) {
      return apiResponse.badRequest("Invalid recipe ID format");
    }

    const existingRecipe = await Recipe.findById(recipeId);
    if (!existingRecipe) {
      return apiResponse.notFound("Recipe");
    }

    if (existingRecipe.userId.toString() !== authData.userId) {
      return apiResponse.forbidden("You can only delete your own recipes");
    }

    await Recipe.deleteOne({ _id: recipeId });
    return apiResponse.success({ message: "Recipe deleted successfully" });
  } catch {
    return apiResponse.error("Failed to delete recipe");
  }
}
