"use client";

import { useEffect, useState } from "react";
import About from "@/components/about/About";
import Carousel from "@/components/carousel/Carousel";
import Footer from "@/components/footer/Footer";
import HowItWorks from "@/components/howItWorks/HowItWorks";
import Menu from "@/components/menu/Menu";
import ErrorBoundary from "@/components/common/ErrorBoundary";

export default function ClientHome() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full overflow-x-hidden">
        <div className="min-w-[320px] max-w-[1920px] mx-auto">
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-500 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading RecipeNest...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-hidden">
      <ErrorBoundary>
        <div className="min-w-[320px] max-w-[1920px] mx-auto">
          <Carousel />
          <HowItWorks />
          <Menu />
          <About />
          <Footer />
        </div>
      </ErrorBoundary>
    </div>
  );
}
