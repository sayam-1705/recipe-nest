import { MetadataRoute } from "next";
import { dbConnect } from "./api/mongodb";
import Recipe from "@/models/Recipe";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl =
    process.env.NEXT_PUBLIC_APP_URL ||
    (process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000");

  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/login`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/signup`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  try {
    await dbConnect();
    const recipes = await Recipe.find({}, { _id: 1 }).lean();

    const recipePages: MetadataRoute.Sitemap = recipes.map((recipe) => ({
      url: `${baseUrl}/showRecipe/${recipe._id}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    }));

    return [...staticPages, ...recipePages];
  } catch (error) {
    console.error("Sitemap generation error:", error);
    return staticPages;
  }
}
