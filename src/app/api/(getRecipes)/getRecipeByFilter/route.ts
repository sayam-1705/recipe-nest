import { NextRequest } from "next/server";
import { dbConnect } from "../../mongodb";
import { z } from "zod";
import Recipe from "@/models/Recipe";
import { apiResponse } from "@/utils/api";

const reqSchema = z.object({
  name: z.string().optional(),
  type: z.string().optional(),
  meal: z.string().optional(),
  time: z.string().optional(),
  difficulty: z.string().optional(),
  season: z.string().optional(),
  occasion: z.string().optional(),
  dietaryType: z.string().optional(),
  ingredients: z.array(z.object({ name: z.string().optional() })).optional(),
});

const buildRegexFilter = (key: string, value?: string) => 
  value ? { [key]: { $regex: value, $options: "i" } } : {};

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const body = await req.json();
    const result = reqSchema.safeParse(body);
    
    if (!result.success) {
      return apiResponse.badRequest("Invalid filter parameters");
    }

    const { ingredients, ...filters } = result.data;
    
    const query = {
      ...Object.entries(filters).reduce((acc, [key, value]) => ({
        ...acc,
        ...buildRegexFilter(key, value)
      }), {}),
      ...(ingredients?.length && {
        ingredients: {
          $elemMatch: {
            name: { $in: ingredients.map(ing => ing.name).filter(Boolean) }
          }
        }
      })
    };

    const recipes = await Recipe.find(query);
    return apiResponse.success({ recipes });
  } catch {
    return apiResponse.error("Failed to filter recipes");
  }
}
