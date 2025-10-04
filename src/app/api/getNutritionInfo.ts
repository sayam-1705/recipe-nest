import axios from "axios";

export const getNutritionInfo = async (ingredient: string[]) => {
  try {
    if (!process.env.EDAMAM_API_KEY || !process.env.EDAMAM_APP_ID) {
      throw new Error("Edamam API credentials are not configured");
    }

    const response = await axios.get(
      "https://api.edamam.com/api/nutrition-data",
      {
        params: {
          app_key: process.env.EDAMAM_API_KEY,
          app_id: process.env.EDAMAM_APP_ID,
          ingr: ingredient.join(" "),
        },
      }
    );

    if (response.status !== 200) {
      throw new Error(`Failed to fetch nutrition data: ${response.statusText}`);
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching nutrition information:", error);
    throw new Error("Failed to retrieve nutrition information");
  }
};
