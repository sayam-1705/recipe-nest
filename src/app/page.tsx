import { Metadata } from "next";
import About from "@/components/about/About";
import Carousel from "@/components/carousel/Carousel";
import Footer from "@/components/footer/Footer";
import HowItWorks from "@/components/howItWorks/HowItWorks";
import Menu from "@/components/menu/Menu";
import ErrorBoundary from "@/components/common/ErrorBoundary";

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

export const metadata: Metadata = {
  title: "RecipeNest - Discover Amazing Recipes",
  description:
    "Discover and share amazing recipes with RecipeNest. Find recipes based on weather, dietary preferences, and more from our community of food enthusiasts.",
  openGraph: {
    title: "RecipeNest - Discover Amazing Recipes",
    description: "Discover and share amazing recipes with RecipeNest.",
    type: "website",
  },
};

export const revalidate = 300;

export default async function Home() {
  const initialRecipes = await serverApi.getAllRecipes();

  const components = [
    <Carousel key="carousel" />,
    <HowItWorks key="howItWorks" />,
    <Menu key="menu" initialRecipes={initialRecipes} />,
    <About key="about" />,
    <Footer key="footer" />,
  ];

  return (
    <div className="w-full overflow-x-hidden">
      <ErrorBoundary>
        <div className="min-w-[320px] max-w-[1920px] mx-auto">
          {components}
        </div>
      </ErrorBoundary>
    </div>
  );
}
