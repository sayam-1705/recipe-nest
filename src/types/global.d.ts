export {};

declare global {
  interface AuthData {
    userId: string;
    email: string;
  }

  interface Ingredient {
    name: string;
    quantity: string;
    nutrition?: {
      calories?: number;
      protein?: number;
      carbs?: number;
      fat?: number;
      [key: string]: unknown;
    };
  }

  interface Recipe {
    _id: string;
    userId: string;
    name: string;
    type: string;
    meal: string;
    time: string;
    difficulty: string;
    season: string;
    occasion: string;
    dietaryType: string;
    servings: number;
    ingredients: Ingredient[];
    nutritionPerServing?: {
      calories?: number;
      ENERC_KCAL?: number;
      PROCNT_KCAL?: number;
      FAT_KCAL?: number;
      CHOCDF_KCAL?: number;
      [key: string]: unknown;
    };
    instructions: string[];
    image: string;
  }
}
