"use client";

import { useEffect, useState } from "react";
import About from "@/components/about/About";
import FuturisticCarousel from "@/components/carousel/FuturisticCarousel";
import FuturisticFooter from "@/components/footer/FuturisticFooter";
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
              <div className="w-20 h-20 border-4 border-neon-blue border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-xl text-neon-blue neon-text">Loading RecipeNest...</p>
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
          <FuturisticCarousel />
          <HowItWorks />
          <Menu />
          <About />
          <FuturisticFooter />
        </div>
      </ErrorBoundary>
    </div>
  );
}
