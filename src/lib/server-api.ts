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
  ingredients: Array<{
    name: string;
    quantity: string;
    nutrition?: {
      calories?: number;
      protein?: number;
      carbs?: number;
      fat?: number;
      [key: string]: unknown;
    };
  }>;
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

// Get the base URL for API calls
function getBaseUrl() {
  // In Vercel, use VERCEL_URL for internal API calls during build
  if (process.env.VERCEL_URL && process.env.VERCEL_ENV !== 'development') {
    return `https://${process.env.VERCEL_URL}`;
  }
  
  // Use the public URL if available
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL;
  }
  
  // Fallback to localhost for development
  return 'http://localhost:3000';
}

const API_BASE_URL = getBaseUrl();

// Server-side API functions for SSR
export const serverApi = {
  async getAllRecipes(): Promise<Recipe[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/getAllRecipes`, {
        cache: 'force-cache',
        next: { revalidate: 300 }, // Revalidate every 5 minutes
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch recipes: ${response.status}`);
      }
      
      const data = await response.json();
      return data.recipes || [];
    } catch (error) {
      console.error('Error fetching all recipes:', error);
      return [];
    }
  },

  async getRecipeById(recipeId: string): Promise<Recipe | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/getRecipeById/${recipeId}`, {
        cache: 'force-cache',
        next: { revalidate: 300 }, // Revalidate every 5 minutes
      });
      
      if (!response.ok) {
        if (response.status === 404) return null;
        throw new Error(`Failed to fetch recipe: ${response.status}`);
      }
      
      const data = await response.json();
      return data.recipe || null;
    } catch (error) {
      console.error(`Error fetching recipe ${recipeId}:`, error);
      return null;
    }
  },

  async getRecipesByUserId(userId: string): Promise<Recipe[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/getRecipeByUserId/${userId}`, {
        cache: 'no-store', // User-specific data should not be cached
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch user recipes: ${response.status}`);
      }
      
      const data = await response.json();
      return data.recipes || [];
    } catch (error) {
      console.error(`Error fetching recipes for user ${userId}:`, error);
      return [];
    }
  },

  async getRecipesByFilter(filter: Record<string, string>): Promise<Recipe[]> {
    try {
      const params = new URLSearchParams();
      Object.entries(filter).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });
      
      const response = await fetch(`${API_BASE_URL}/api/getRecipeByFilter?${params.toString()}`, {
        cache: 'force-cache',
        next: { revalidate: 300 },
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch filtered recipes: ${response.status}`);
      }
      
      const data = await response.json();
      return data.recipes || [];
    } catch (error) {
      console.error('Error fetching filtered recipes:', error);
      return [];
    }
  },
};

// Utility function to generate static params for dynamic routes
export async function generateRecipeStaticParams(): Promise<{ recipeId: string }[]> {
  try {
    const recipes = await serverApi.getAllRecipes();
    return recipes.map((recipe) => ({
      recipeId: recipe._id,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

// JSON-LD structured data for SEO
export function generateRecipeJsonLd(recipe: Recipe) {
  return {
    "@context": "https://schema.org/",
    "@type": "Recipe",
    "name": recipe.name,
    "image": recipe.image,
    "description": `A delicious ${recipe.type} recipe perfect for ${recipe.meal}`,
    "recipeCategory": recipe.type,
    "recipeCuisine": recipe.dietaryType,
    "prepTime": recipe.time,
    "recipeYield": `${recipe.servings} servings`,
    "difficulty": recipe.difficulty,
    "recipeIngredient": recipe.ingredients.map((ing: { quantity: string; name: string }) => `${ing.quantity} ${ing.name}`),
    "recipeInstructions": recipe.instructions.map((instruction: string, index: number) => ({
      "@type": "HowToStep",
      "name": `Step ${index + 1}`,
      "text": instruction,
    })),
    ...(recipe.nutritionPerServing && {
      "nutrition": {
        "@type": "NutritionInformation",
        "calories": recipe.nutritionPerServing.calories || recipe.nutritionPerServing.ENERC_KCAL,
        "proteinContent": recipe.nutritionPerServing.PROCNT_KCAL,
        "fatContent": recipe.nutritionPerServing.FAT_KCAL,
        "carbohydrateContent": recipe.nutritionPerServing.CHOCDF_KCAL,
      }
    }),
  };
}

export default serverApi;
