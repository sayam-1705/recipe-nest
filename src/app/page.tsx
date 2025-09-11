import { Metadata } from "next";
import About from "@/components/about/About";
import Carousel from "@/components/carousel/Carousel";
import Footer from "@/components/footer/Footer";
import HowItWorks from "@/components/howItWorks/HowItWorks";
import Menu from "@/components/menu/Menu";
import { serverApi } from "@/lib/server-api";
import ErrorBoundary from "@/components/common/ErrorBoundary";

export const metadata: Metadata = {
  title: "RecipeNest - Discover Amazing Recipes",
  description: "Discover and share amazing recipes with RecipeNest. Find recipes based on weather, dietary preferences, and more from our community of food enthusiasts.",
  openGraph: {
    title: "RecipeNest - Discover Amazing Recipes",
    description: "Discover and share amazing recipes with RecipeNest.",
    type: "website",
  },
};

export const revalidate = 300; // Revalidate every 5 minutes

export default async function Home() {
  // Fetch initial data for SSR
  const initialRecipes = await serverApi.getAllRecipes();

  return (
    <>
      <ErrorBoundary>
        <Carousel />
      </ErrorBoundary>
      
      <ErrorBoundary>
        <HowItWorks />
      </ErrorBoundary>
      
      <ErrorBoundary>
        <Menu initialRecipes={initialRecipes} />
      </ErrorBoundary>
      
      <ErrorBoundary>
        <About />
      </ErrorBoundary>
      
      <ErrorBoundary>
        <Footer />
      </ErrorBoundary>
    </>
  );
}
