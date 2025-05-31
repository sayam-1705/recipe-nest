import axios from "axios";

export const getNutritionInfo = async (ingredient: string[]) => {
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
};
