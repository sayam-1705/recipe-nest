import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "../../mongodb";
import Recipe from "@/models/Recipe";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();

    const query: Record<string, unknown> = {};

    // Build regex filters
    Object.entries(body).forEach(([key, value]) => {
      if (value && typeof value === "string" && key !== "ingredients") {
        query[key] = { $regex: value, $options: "i" };
      }
    });

    // Handle ingredients filter
    if (body.ingredients && Array.isArray(body.ingredients)) {
      const ingredientNames = body.ingredients
        .map((ing: { name?: string }) => ing.name)
        .filter(Boolean);

      if (ingredientNames.length > 0) {
        query.ingredients = {
          $elemMatch: { name: { $in: ingredientNames } },
        };
      }
    }

    const recipes = await Recipe.find(query);
    return NextResponse.json({ recipes });
  } catch (error) {
    console.error("Filter recipes error:", error);
    return NextResponse.json(
      { error: "Failed to filter recipes" },
      { status: 500 }
    );
  }
}
