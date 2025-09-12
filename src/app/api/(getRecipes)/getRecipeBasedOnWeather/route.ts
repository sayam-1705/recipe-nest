import { NextRequest, NextResponse } from "next/server";
import { getWeatherResponse } from "./getWeatherResponse";
import { dbConnect } from "../../mongodb";
import Recipe from "@/models/Recipe";

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

    console.log(`Weather data received: ${temperature}°C, ${weatherDescription} in ${place}`);

    // Determine recipe type based on weather condition
    let type = "";
    // Rain conditions suggest warm, comforting foods
    if (
      weatherDescription.toLowerCase().includes("rain") ||
      weatherDetails.toLowerCase().includes("rain") ||
      weatherDescription.toLowerCase().includes("drizzle")
    ) {
      type = "Soup"; // Comfort food for rainy days
    }
    // Hot weather suggests cool, refreshing foods
    else if (temperature > 30) {
      type = "Beverage"; // Cold drinks for very hot days
    }
    // Warm weather suggests light foods
    else if (temperature > 25) {
      type = "Salad"; // Light food for hot days
    }
    // Cold weather suggests hearty, warming foods
    else if (temperature < 5) {
      type = "Stew"; // Warm, hearty food for very cold days
    }
    // Cool weather suggests warming foods
    else if (temperature < 10) {
      type = "Soup"; // Warm food for cold days
    }
    // Moderate temperature with clear skies - good for outdoor activities
    else if (
      weatherDescription.toLowerCase().includes("clear") ||
      weatherDescription.toLowerCase().includes("sun")
    ) {
      type = "Main Course"; // Good weather for proper meals
    }
    // Cloudy but mild weather - good for comfort foods
    else if (
      weatherDescription.toLowerCase().includes("cloud") &&
      temperature > 15
    ) {
      type = "Bread & Bakery"; // Baking is nice on cloudy days
    }
    // Special cases for certain weathers
    else if (
      weatherDescription.toLowerCase().includes("fog") ||
      weatherDescription.toLowerCase().includes("mist")
    ) {
      type = "Dessert"; // Sweet comfort for gloomy weather
    } else if (weatherDescription.toLowerCase().includes("snow")) {
      type = "Beverage"; // Warm drinks for snowy days
    }
    // For humid conditions
    else if (humidity > 80) {
      type = "Appetizer"; // Light starters for humid weather
    }
    // For windy conditions
    else if (windSpeed > 20) {
      type = "Side Dish"; // Simpler foods for windy days
    }
    // Default option
    else {
      type = "Snack"; // Default for moderate weather
    }

    // Get current hour to determine meal time
    const currentHour = new Date().getHours();
    let meal = "";
    if (currentHour >= 8 && currentHour < 11) {
      meal = "Breakfast";
    } else if (currentHour >= 11 && currentHour < 16) {
      meal = "Lunch";
    } else if (currentHour >= 16 && currentHour < 20) {
      meal = "Tea Time";
    } else if (currentHour >= 20 && currentHour < 23) {
      meal = "Dinner";
    } else if (currentHour >= 23 && currentHour < 1) {
      meal = "Supper";
    } else {
      meal = "Late Night";
    }

    // Determine recipe difficulty based on weather conditions
    let difficulty = "";
    if (
      weatherDescription.toLowerCase().includes("clear") &&
      temperature > 20
    ) {
      difficulty = "Hard"; // Nice weather for trying challenging recipes
    } else if (
      weatherDescription.toLowerCase().includes("rain") ||
      weatherDescription.toLowerCase().includes("snow") ||
      temperature < 10
    ) {
      difficulty = "Easy"; // Simple comfort food for bad weather
    } else {
      difficulty = "Medium";
    }

    // Better season determination
    let season = "";
    // Base season determination on temperature
    let baseSeason = "";
    if (temperature < 5) {
      baseSeason = "Winter";
    } else if (temperature >= 5 && temperature < 15) {
      baseSeason = "Spring";
    } else if (temperature >= 15 && temperature < 25) {
      baseSeason = "Summer";
    } else {
      baseSeason = "Autumn";
    }

    // Adjust season based on humidity
    if (humidity > 80) {
      // High humidity makes it feel more like summer/rainy season
      if (temperature > 10) {
        season = "Summer";
      } else {
        season = baseSeason; // Keep winter for cold temperatures
      }
    } else if (humidity < 30) {
      // Very dry conditions
      if (temperature > 20) {
        season = "Summer"; // Hot and dry stays summer
      } else if (temperature > 10) {
        season = "Spring"; // Mild and dry feels like spring
      } else {
        season = "Winter"; // Cold and dry feels like winter
      }
    } else {
      // Moderate humidity, use base temperature season
      season = baseSeason;
    }

    // Create filter object with all determined criteria
    const filterParams = {
      type,
      meal,
      difficulty,
      season,
    };

    // Build MongoDB query with progressive fallback strategy
    let recipes: any[] = [];
    let searchStrategy = "exact";
    
    // Strategy 1: Try with all criteria (AND)
    const exactQuery: Record<string, unknown> = {};
    if (type) exactQuery.type = { $regex: type, $options: "i" };
    if (meal) exactQuery.meal = { $regex: meal, $options: "i" };
    if (difficulty) exactQuery.difficulty = { $regex: difficulty, $options: "i" };
    if (season) exactQuery.season = { $regex: season, $options: "i" };

    recipes = await Recipe.find(exactQuery).limit(20); // Increased limit to 20
    console.log(`Strategy 1 - Found ${recipes.length} recipes with exact criteria: type=${type}, meal=${meal}, difficulty=${difficulty}, season=${season}`);

    // Strategy 2: If few results, try with OR conditions for main criteria
    if (recipes.length < 5) {
      console.log("Few exact matches found, trying OR strategy...");
      searchStrategy = "flexible";
      
      const orConditions = [
        ...(type ? [{ type: { $regex: type, $options: "i" } }] : []),
        ...(season ? [{ season: { $regex: season, $options: "i" } }] : []),
        ...(meal ? [{ meal: { $regex: meal, $options: "i" } }] : []),
      ];
      
      const orQuery: Record<string, unknown> = {
        $or: orConditions
      };
      
      // Add difficulty as a secondary filter if we have OR matches
      if (difficulty && orConditions.length > 0) {
        orQuery.difficulty = { $regex: difficulty, $options: "i" };
      }
      
      const flexibleRecipes = await Recipe.find(orQuery).limit(20);
      console.log(`Strategy 2 - Found ${flexibleRecipes.length} recipes with flexible criteria`);
      
      // Merge results, prioritizing exact matches
      const exactIds = recipes.map(r => r._id.toString());
      const additionalRecipes = flexibleRecipes.filter(r => !exactIds.includes(r._id.toString()));
      recipes = [...recipes, ...additionalRecipes].slice(0, 20);
    }

    // Strategy 3: If still few results, try just type OR season
    if (recipes.length < 3) {
      console.log("Still few matches, trying broader search...");
      searchStrategy = "broad";
      
      const broadQuery: Record<string, unknown> = {
        $or: [
          ...(type ? [{ type: { $regex: type, $options: "i" } }] : []),
          ...(season ? [{ season: { $regex: season, $options: "i" } }] : []),
        ]
      };
      
      const broadRecipes = await Recipe.find(broadQuery).limit(20);
      console.log(`Strategy 3 - Found ${broadRecipes.length} recipes with broad criteria`);
      
      // Merge results, prioritizing more specific matches
      const existingIds = recipes.map(r => r._id.toString());
      const additionalRecipes = broadRecipes.filter(r => !existingIds.includes(r._id.toString()));
      recipes = [...recipes, ...additionalRecipes].slice(0, 20);
    }

    // Strategy 4: If still no results, get random recipes
    if (recipes.length === 0) {
      console.log("No matches found with any criteria, getting random recipes...");
      searchStrategy = "random";
      recipes = await Recipe.aggregate([{ $sample: { size: 10 } }]);
      console.log(`Strategy 4 - Found ${recipes.length} random recipes as fallback`);
    }

    console.log(`Final result: ${recipes.length} recipes using ${searchStrategy} strategy`);

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
    
    // Provide more specific error information
    if (error instanceof Error) {
      if (error.message.includes("weather")) {
        return NextResponse.json(
          { error: "Failed to fetch weather data. Please check your coordinates and try again." },
          { status: 500 }
        );
      } else if (error.message.includes("MongoDB") || error.message.includes("database")) {
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
