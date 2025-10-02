import { MetadataRoute } from 'next';

const API_BASE_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

const fetchWithErrorHandling = async (
  url: string,
  options: RequestInit = {},
  fallbackValue: Recipe[] = []
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
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 
                 (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');
  
  const now = new Date();
  
  const staticPages = [
    { url: baseUrl, priority: 1, changeFrequency: 'daily' as const },
    { url: `${baseUrl}/login`, priority: 0.5, changeFrequency: 'monthly' as const },
    { url: `${baseUrl}/signup`, priority: 0.5, changeFrequency: 'monthly' as const },
  ].map(page => ({ ...page, lastModified: now }));

  const recipes = await serverApi.getAllRecipes();
  const recipePages = recipes.map((recipe) => ({
    url: `${baseUrl}/showRecipe/${recipe._id}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [...staticPages, ...recipePages];
}
