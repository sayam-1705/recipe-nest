import { dbConnect } from "../../mongodb";
import Recipe from "@/models/Recipe";
import { apiResponse } from "@/utils/api";

export async function GET() {
  try {
    await dbConnect();
    const recipes = await Recipe.find();
    return apiResponse.success({ recipes });
  } catch {
    return apiResponse.error("Failed to fetch recipes");
  }
}
