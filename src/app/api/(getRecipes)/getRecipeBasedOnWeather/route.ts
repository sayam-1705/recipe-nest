import { NextRequest, NextResponse } from "next/server";
import { getWeatherResponse } from "./getWeatherResponse";
import { dbConnect } from "../../mongodb";
import Recipe from "@/models/Recipe";

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

    console.log(`Fetching weather data for lat: ${lat}, lon: ${lon}`);

    const weatherResponse = await getWeatherResponse(Number(lat), Number(lon));
    const {
      temperature,
      place,
      weatherDescription,
      weatherDetails,
      humidity,
      windSpeed,
      clouds,
    } = weatherResponse;

    console.log(
      `Weather data received: ${temperature}°C, ${weatherDescription} in ${place}`
    );

    const type = getRecipeTypeFromWeather(
      temperature,
      weatherDescription,
      weatherDetails
    );
    const meal = getMealByCurrentTime();
    const difficulty = getDifficultyFromWeather(
      temperature,
      weatherDescription
    );
    const season = getSeasonFromWeather(temperature, humidity);

    console.log(
      `Recipe recommendations: type=${type}, meal=${meal}, difficulty=${difficulty}, season=${season}`
    );

    let recipes: Recipe[] = [];
    let searchStrategy = "exact";

    const exactQuery = {
      ...(type && buildRegexFilter("type", type)),
      ...(meal && buildRegexFilter("meal", meal)),
      ...(difficulty && buildRegexFilter("difficulty", difficulty)),
      ...(season && buildRegexFilter("season", season)),
    };
    recipes = await Recipe.find(exactQuery).limit(20);
    console.log(
      `Strategy 1 - Found ${recipes.length} recipes with exact criteria`
    );

    if (recipes.length < 5) {
      console.log("Trying flexible OR strategy...");
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
      console.log(
        `Strategy 2 - Total: ${recipes.length} recipes with flexible criteria`
      );
    }

    if (recipes.length < 3) {
      console.log("Trying broad search...");
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
      console.log(
        `Strategy 3 - Total: ${recipes.length} recipes with broad criteria`
      );
    }

    if (recipes.length === 0) {
      console.log("Getting random recipes as fallback...");
      searchStrategy = "random";
      recipes = await Recipe.aggregate([{ $sample: { size: 10 } }]);
      console.log(`Strategy 4 - Found ${recipes.length} random recipes`);
    }

    return NextResponse.json({
      recipes: recipes,
      weather: {
        temperature: temperature,
        place,
        description: weatherDescription,
        details: weatherDetails,
        humidity,
        windSpeed,
        cloudCover: clouds,
        recommendedType: type,
        recommendedMeal: meal,
        recommendedDifficulty: difficulty,
        season,
      },
      searchStrategy: searchStrategy,
      totalRecipes: recipes.length,
    });
  } catch (error) {
    console.error("Error fetching recipes based on weather:", error);

    if (error instanceof Error) {
      if (error.message.includes("weather")) {
        return NextResponse.json(
          {
            error:
              "Failed to fetch weather data. Please check your coordinates and try again.",
          },
          { status: 500 }
        );
      } else if (
        error.message.includes("MongoDB") ||
        error.message.includes("database")
      ) {
        return NextResponse.json(
          { error: "Database connection error. Please try again later." },
          { status: 500 }
        );
      }
    }

    return NextResponse.json(
      { error: "Failed to fetch recipes based on weather. Please try again." },
      { status: 500 }
    );
  }
}
