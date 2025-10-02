import { dbConnect } from "@/app/api/mongodb";
import Recipe from "@/models/Recipe";
import { NextRequest } from "next/server";
import { apiResponse } from "@/utils/api";
import { validate } from "@/utils/auth";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ recipeId: string }> }
) {
  try {
    await dbConnect();
    const { recipeId } = await params;

    if (!validate.objectId(recipeId)) {
      return apiResponse.badRequest("Invalid recipe ID format");
    }

    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
      return apiResponse.notFound("Recipe");
    }

    return apiResponse.success({ recipe });
  } catch {
    return apiResponse.error("Failed to fetch recipe");
  }
}
