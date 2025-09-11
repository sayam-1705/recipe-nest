import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { getWeatherResponse } from "./getWeatherResponse";
import { dbConnect } from "../../mongodb";

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
    const {
      temperature,
      place,
      weatherDescription,
      weatherDetails,
      humidity,
      windSpeed,
      clouds,
    } = weatherResponse;

    // Determine recipe type based on weather condition
    let type = "";
    // Rain conditions suggest warm, comforting foods
    if (
      weatherDescription.toLowerCase().includes("rain") ||
      weatherDetails.toLowerCase().includes("rain") ||
      weatherDescription.toLowerCase().includes("drizzle")
    ) {
      type = "soup"; // Comfort food for rainy days
    }
    // Hot weather suggests cool, refreshing foods
    else if (temperature > 30) {
      type = "beverage"; // Cold drinks for very hot days
    }
    // Warm weather suggests light foods
    else if (temperature > 25) {
      type = "salad"; // Light food for hot days
    }
    // Cold weather suggests hearty, warming foods
    else if (temperature < 5) {
      type = "stew"; // Warm, hearty food for very cold days
    }
    // Cool weather suggests warming foods
    else if (temperature < 10) {
      type = "soup"; // Warm food for cold days
    }
    // Moderate temperature with clear skies - good for outdoor activities
    else if (
      weatherDescription.toLowerCase().includes("clear") ||
      weatherDescription.toLowerCase().includes("sun")
    ) {
      type = "main course"; // Good weather for proper meals
    }
    // Cloudy but mild weather - good for comfort foods
    else if (
      weatherDescription.toLowerCase().includes("cloud") &&
      temperature > 15
    ) {
      type = "bread & bakery"; // Baking is nice on cloudy days
    }
    // Special cases for certain weathers
    else if (
      weatherDescription.toLowerCase().includes("fog") ||
      weatherDescription.toLowerCase().includes("mist")
    ) {
      type = "dessert"; // Sweet comfort for gloomy weather
    } else if (weatherDescription.toLowerCase().includes("snow")) {
      type = "hot beverage"; // Warm drinks for snowy days
    }
    // For humid conditions
    else if (humidity > 80) {
      type = "appetizer"; // Light starters for humid weather
    }
    // For windy conditions
    else if (windSpeed > 20) {
      type = "side dish"; // Simpler foods for windy days
    }
    // Default option
    else {
      type = "snack"; // Default for moderate weather
    }

    // Get current hour to determine meal time
    const currentHour = new Date().getHours();
    let meal = "";
    if (currentHour >= 8 && currentHour < 11) {
      meal = "breakfast";
    } else if (currentHour >= 11 && currentHour < 16) {
      meal = "lunch";
    } else if (currentHour >= 16 && currentHour < 20) {
      meal = "tea time";
    } else if (currentHour >= 20 && currentHour < 23) {
      meal = "dinner";
    } else if (currentHour >= 23 && currentHour < 1) {
      meal = "supper";
    } else {
      meal = "late-night";
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
      difficulty = "easy"; // Simple comfort food for bad weather
    } else {
      difficulty = "medium";
    }

    // Better season determination
    let season = "";
    // Base season determination on temperature
    let baseSeason = "";
    if (temperature < 5) {
      baseSeason = "winter";
    } else if (temperature >= 5 && temperature < 15) {
      baseSeason = "spring";
    } else if (temperature >= 15 && temperature < 25) {
      baseSeason = "summer";
    } else {
      baseSeason = "autumn";
    }

    // Adjust season based on humidity
    if (humidity > 80) {
      // High humidity makes it feel more like summer/rainy season
      if (temperature > 10) {
        season = "summer";
      } else {
        season = baseSeason; // Keep winter for cold temperatures
      }
    } else if (humidity < 30) {
      // Very dry conditions
      if (temperature > 20) {
        season = "summer"; // Hot and dry stays summer
      } else if (temperature > 10) {
        season = "spring"; // Mild and dry feels like spring
      } else {
        season = "winter"; // Cold and dry feels like winter
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

    const recipesResponse = await axios.post(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/getRecipeByFilter`,
      filterParams
    );

    return NextResponse.json({
      recipes: recipesResponse.data.recipes,
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
    });
  } catch (error) {
    console.error("Error fetching recipes based on weather:", error);
    return NextResponse.json(
      { error: "Failed to fetch recipes based on weather." },
      { status: 500 }
    );
  }
}
