import { NextRequest, NextResponse } from "next/server";
import { getWeatherResponse } from "./getWeatherResponse";
import { dbConnect } from "../../mongodb";
import Recipe from "@/models/Recipe";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const isRainy = (desc: string, details: string) =>
  ["rain", "drizzle", "shower"].some(
    (term) =>
      desc.toLowerCase().includes(term) || details.toLowerCase().includes(term)
  );

const isClear = (desc: string) =>
  ["clear", "sun"].some((term) => desc.toLowerCase().includes(term));

const isSnowy = (desc: string, details: string) =>
  ["snow", "blizzard"].some(
    (term) =>
      desc.toLowerCase().includes(term) || details.toLowerCase().includes(term)
  );

const getRecipeTypeFromWeather = (
  temp: number,
  desc: string,
  details: string
): string => {
  if (isRainy(desc, details)) return "Soup";
  if (temp > 30) return "Beverage";
  if (temp > 25) return "Salad";
  if (temp < 5) return "Stew";
  if (temp < 10) return "Soup";
  if (isClear(desc)) return "Grilled";
  if (isSnowy(desc, details)) return "Stew";
  return "Main Course";
};

const getMealByCurrentTime = (): string => {
  const hour = new Date().getHours();
  if (hour >= 8 && hour < 11) return "Breakfast";
  if (hour >= 11 && hour < 16) return "Lunch";
  if (hour >= 16 && hour < 20) return "Tea Time";
  if (hour >= 20 && hour < 23) return "Dinner";
  if (hour >= 23 || hour < 1) return "Supper";
  return "Late Night";
};

const getDifficultyFromWeather = (temp: number, desc: string): string => {
  if (isClear(desc) && temp > 20) return "Hard";
  if (isRainy(desc, "") || isSnowy(desc, "") || temp < 10) return "Easy";
  return "Medium";
};

const getSeasonFromWeather = (temp: number, humidity: number): string => {
  let baseSeason = "";
  if (temp < 5) baseSeason = "Winter";
  else if (temp < 15) baseSeason = "Spring";
  else if (temp < 25) baseSeason = "Summer";
  else baseSeason = "Autumn";

  if (humidity > 80) return temp > 10 ? "Summer" : baseSeason;
  if (humidity < 30) {
    if (temp > 20) return "Summer";
    if (temp > 10) return "Spring";
    return "Winter";
  }
  return baseSeason;
};

const buildRegexFilter = (field: string, value: string) => ({
  [field]: { $regex: value, $options: "i" },
});

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const { lat, lon } = await req.json();

    if (!lat || !lon) {
      return NextResponse.json(
        { error: "Latitude and longitude are required." },
        { status: 400 }
      );
    }

    const weatherResponse = await getWeatherResponse(Number(lat), Number(lon));
    const { temperature, place, weatherDescription, weatherDetails, humidity, windSpeed, clouds } = weatherResponse;

    const type = getRecipeTypeFromWeather(temperature, weatherDescription, weatherDetails);
    const meal = getMealByCurrentTime();
    const difficulty = getDifficultyFromWeather(temperature, weatherDescription);
    const season = getSeasonFromWeather(temperature, humidity);

    let recipes: Recipe[] = [];
    let searchStrategy = "exact";

    const exactQuery = {
      ...(type && buildRegexFilter("type", type)),
      ...(meal && buildRegexFilter("meal", meal)),
      ...(difficulty && buildRegexFilter("difficulty", difficulty)),
      ...(season && buildRegexFilter("season", season)),
    };
    recipes = await Recipe.find(exactQuery).limit(20);

    if (recipes.length < 5) {
      searchStrategy = "flexible";

      const orConditions = [
        ...(type ? [buildRegexFilter("type", type)] : []),
        ...(season ? [buildRegexFilter("season", season)] : []),
        ...(meal ? [buildRegexFilter("meal", meal)] : []),
      ];

      const orQuery = {
        ...(orConditions.length > 0 && { $or: orConditions }),
        ...(difficulty &&
          orConditions.length > 0 &&
          buildRegexFilter("difficulty", difficulty)),
      };

      const flexibleRecipes = await Recipe.find(orQuery).limit(20);

      const existingIds = new Set(recipes.map((r) => r._id.toString()));
      const newRecipes = flexibleRecipes.filter(
        (r) => !existingIds.has(r._id.toString())
      );
      recipes = [...recipes, ...newRecipes].slice(0, 20);
    }

    if (recipes.length < 3) {
      searchStrategy = "broad";

      const broadQuery = {
        $or: [
          ...(type ? [buildRegexFilter("type", type)] : []),
          ...(season ? [buildRegexFilter("season", season)] : []),
        ],
      };

      const broadRecipes = await Recipe.find(broadQuery).limit(20);

      const existingIds = new Set(recipes.map((r) => r._id.toString()));
      const newRecipes = broadRecipes.filter(
        (r) => !existingIds.has(r._id.toString())
      );
      recipes = [...recipes, ...newRecipes].slice(0, 20);
    }

    if (recipes.length === 0) {
      searchStrategy = "random";
      recipes = await Recipe.aggregate([{ $sample: { size: 10 } }]);
    }

    return NextResponse.json({
      recipes,
      weather: {
        temperature, place,
        description: weatherDescription,
        details: weatherDetails,
        humidity, windSpeed,
        cloudCover: clouds,
        recommendedType: type,
        recommendedMeal: meal,
        recommendedDifficulty: difficulty,
        season,
      },
      searchStrategy,
      totalRecipes: recipes.length,
    });
  } catch (error) {
    console.error("Weather recipe error:", error);
    return NextResponse.json(
      { error: "Failed to fetch recipes based on weather. Please try again." },
      { status: 500 }
    );
  }
}
