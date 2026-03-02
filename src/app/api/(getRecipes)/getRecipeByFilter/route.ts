import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "../../mongodb";
import Recipe from "@/models/Recipe";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();
    const query: Record<string, unknown> = {};

    Object.entries(body).forEach(([key, value]) => {
      if (value && typeof value === "string" && key !== "ingredients") {
        query[key] = { $regex: value, $options: "i" };
      }
    });

    if (body.ingredients && Array.isArray(body.ingredients)) {
      const names = body.ingredients.map((ing: { name?: string }) => ing.name).filter(Boolean);
      if (names.length > 0) {
        query.ingredients = { $elemMatch: { name: { $in: names } } };
      }
    }

    const recipes = await Recipe.find(query);
    return NextResponse.json({ recipes });
  } catch (error) {
    console.error("Filter recipes error:", error);
    return NextResponse.json({ error: "Failed to filter recipes" }, { status: 500 });
  }
}
