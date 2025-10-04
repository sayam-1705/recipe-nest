import { Metadata } from "next";
import RecipeDisplay from "@/components/recipe/RecipeDisplay";

const API_BASE_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

const fetchWithErrorHandling = async (
  url: string,
  options: RequestInit = {},
  fallbackValue: Recipe[] | Recipe | null = []
) => {
  try {
    const response = await fetch(`${API_BASE_URL}${url}`, options);

    if (!response.ok) {
      if (response.status === 404 && fallbackValue === null) return null;
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();
    return data.recipes || data.recipe || fallbackValue;
  } catch (error) {
    console.error(`API Error for ${url}:`, error);
    return fallbackValue;
  }
};

const serverApi = {
  getAllRecipes: (): Promise<Recipe[]> =>
    fetchWithErrorHandling("/api/getAllRecipes", {
      cache: "force-cache",
      next: { revalidate: 300 },
    }),

  getRecipeById: (recipeId: string): Promise<Recipe | null> =>
    fetchWithErrorHandling(
      `/api/getRecipeById/${recipeId}`,
      {
        cache: "force-cache",
        next: { revalidate: 300 },
      },
      null
    ),

  getUserById: (userId: string): Promise<User | null> =>
    fetchWithErrorHandling(
      `/api/getUserById/${userId}`,
      {
        cache: "force-cache",
        next: { revalidate: 300 },
      },
      null
    ),
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { recipeId } = await params;
  const recipe = await serverApi.getRecipeById(recipeId);

  if (!recipe) {
    return {
      title: "Recipe Not Found",
    };
  }

  return {
    title: `${recipe.name} - RecipeNest`,
    description: `Learn how to make ${recipe.name}. A delicious ${recipe.type} recipe perfect for ${recipe.meal}. Difficulty: ${recipe.difficulty}`,
    keywords: [
      recipe.name,
      recipe.type,
      recipe.meal,
      recipe.dietaryType,
      "recipe",
      "cooking",
    ],
    openGraph: {
      title: recipe.name,
      description: `A delicious ${recipe.type} recipe perfect for ${recipe.meal}`,
      images: [
        {
          url: recipe.image,
          width: 1200,
          height: 630,
          alt: recipe.name,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: recipe.name,
      description: `A delicious ${recipe.type} recipe perfect for ${recipe.meal}`,
      images: [recipe.image],
    },
  };
}

export async function generateStaticParams() {
  const recipes = await serverApi.getAllRecipes();
  return recipes.slice(0, 50).map((recipe) => ({
    recipeId: recipe._id,
  }));
}

const ShowRecipe = async ({ params }: PageProps) => {
  const { recipeId } = await params;

  return <RecipeDisplay recipeId={recipeId} />;
};

export default ShowRecipe;
