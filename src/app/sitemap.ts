import { MetadataRoute } from 'next';
import { serverApi } from '@/lib/server-api';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 
                 (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');
  
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/login`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/signup`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];

  try {
    // Dynamic recipe pages
    const recipes = await serverApi.getAllRecipes();
    const recipePages: MetadataRoute.Sitemap = recipes.map((recipe) => ({
      url: `${baseUrl}/showRecipe/${recipe._id}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    }));

    return [...staticPages, ...recipePages];
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return staticPages;
  }
}
