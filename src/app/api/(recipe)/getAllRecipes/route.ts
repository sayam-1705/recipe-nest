import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "../../mongodb";
import Recipe from "@/models/Recipe";

export async function GET(req: NextRequest) {
  await dbConnect();

  const recipes = await Recipe.find();

  return NextResponse.json({ recipes }, { status: 200 });
}
