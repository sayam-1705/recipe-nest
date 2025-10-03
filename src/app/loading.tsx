"use client";

import { useEffect, useState } from "react";

const Loading = () => {
  const [loadingText, setLoadingText] = useState("Preparing ingredients");
  const [progress, setProgress] = useState(0);
  const [showChef, setShowChef] = useState(false);

  useEffect(() => {
    const loadingSteps = [
      "Preparing ingredients...",
      "Heating the pan...",
      "Mixing the batter...",
      "Seasoning to taste...",
      "Almost ready...",
      "Plating the dish...",
    ];

    const textInterval = setInterval(() => {
      setLoadingText((prev) => {
        const currentIndex = loadingSteps.indexOf(prev);
        const nextIndex = (currentIndex + 1) % loadingSteps.length;
        return loadingSteps[nextIndex];
      });
    }, 1500);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 0;
        return prev + Math.random() * 15;
      });
    }, 300);

    const chefTimer = setTimeout(() => {
      setShowChef(true);
    }, 800);

    return () => {
      clearInterval(textInterval);
      clearInterval(progressInterval);
      clearTimeout(chefTimer);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-cream via-primary-orange-bg to-neutral-cream-light flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className={`absolute bg-white/20 rounded-full animate-gentle-float`}
            style={{
              width: `${Math.random() * 40 + 15}px`,
              height: `${Math.random() * 40 + 15}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.8}s`,
              animationDuration: `${4 + Math.random() * 4}s`,
            }}
          />
        ))}

        <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 hidden sm:block">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-6 sm:w-2 sm:h-8 bg-white/30 rounded-full animate-bounce opacity-60"
              style={{
                left: `${i * (window?.innerWidth >= 640 ? 10 : 6)}px`,
                animationDelay: `${i * 0.3}s`,
                animationDuration: "2s",
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 text-center max-w-xs sm:max-w-md lg:max-w-lg mx-auto px-4 sm:px-6">
        <div className="relative mb-6 sm:mb-8">
          <div className="w-24 h-24 sm:w-32 sm:h-32 lg:w-36 lg:h-36 mx-auto relative">
            <div className="w-20 h-16 sm:w-28 sm:h-20 lg:w-32 lg:h-24 bg-secondary-green-dark rounded-b-full absolute bottom-0 left-1/2 transform -translate-x-1/2 shadow-lg">
              <div className="w-16 h-3 sm:w-24 sm:h-4 lg:w-28 lg:h-5 bg-secondary-green-medium rounded-full absolute -top-1.5 sm:-top-2 lg:-top-2.5 left-1/2 transform -translate-x-1/2"></div>
              <div className="w-2 h-4 sm:w-3 sm:h-6 lg:w-4 lg:h-7 bg-secondary-green-medium rounded-full absolute -left-1 top-1 sm:top-2"></div>
              <div className="w-2 h-4 sm:w-3 sm:h-6 lg:w-4 lg:h-7 bg-secondary-green-medium rounded-full absolute -right-1 top-1 sm:top-2"></div>
            </div>

            <div className="w-18 h-6 sm:w-24 sm:h-8 lg:w-28 lg:h-10 bg-secondary-green-light rounded-full absolute top-3 sm:top-4 lg:top-5 left-1/2 transform -translate-x-1/2 shadow-md animate-subtle-pulse">
              <div className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 bg-primary-orange rounded-full absolute -top-1.5 sm:-top-2 lg:-top-2.5 left-1/2 transform -translate-x-1/2"></div>
            </div>

            <div className="absolute -top-1.5 sm:-top-2 lg:-top-3 left-1/2 transform -translate-x-1/2">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-0.5 h-4 sm:w-1 sm:h-6 lg:w-1.5 lg:h-7 bg-white/60 rounded-full animate-bounce"
                  style={{
                    left: `${
                      (i - 1.5) * (window?.innerWidth >= 640 ? 6 : 4)
                    }px`,
                    animationDelay: `${i * 0.2}s`,
                    animationDuration: "1.5s",
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {showChef && (
          <div className="mb-4 sm:mb-6 animate-fade-in-up">
            <div className="text-4xl sm:text-5xl md:text-6xl animate-bounce-horizontal">
              👨‍🍳
            </div>
          </div>
        )}

        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-secondary-green-dark mb-2 animate-fade-in leading-tight">
            RecipeNest
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-secondary-green-medium font-medium bg-gradient-to-r from-secondary-green-medium via-primary-orange to-secondary-green-medium bg-clip-text text-transparent animate-shimmer px-2">
            {loadingText}
          </p>
        </div>

        <div className="w-full bg-white/50 rounded-full h-2 sm:h-3 md:h-4 mb-4 sm:mb-6 overflow-hidden shadow-inner">
          <div
            className="bg-gradient-to-r from-primary-orange to-primary-orange-hover h-full rounded-full transition-all duration-500 ease-out relative"
            style={{ width: `${Math.min(progress, 100)}%` }}
          >
            <div className="absolute inset-0 bg-white/30 animate-shimmer bg-gradient-to-r from-transparent via-white to-transparent bg-size-200"></div>
          </div>
        </div>

        <div className="flex justify-center space-x-4 sm:space-x-6 md:space-x-8 mb-4 sm:mb-6">
          <div
            className="text-xl sm:text-2xl md:text-3xl animate-bounce-horizontal"
            style={{ animationDelay: "0s" }}
          >
            🥄
          </div>
          <div
            className="text-xl sm:text-2xl md:text-3xl animate-bounce-horizontal"
            style={{ animationDelay: "0.3s" }}
          >
            🍳
          </div>
          <div
            className="text-xl sm:text-2xl md:text-3xl animate-bounce-horizontal"
            style={{ animationDelay: "0.6s" }}
          >
            🔪
          </div>
        </div>

        <div className="text-xs sm:text-sm md:text-base text-secondary-green-medium/80 animate-fade-in px-2">
          <p className="italic leading-relaxed">
            💡 Tip: Fresh ingredients make all the difference!
          </p>
        </div>
      </div>

      <div className="absolute bottom-4 sm:bottom-6 md:bottom-10 left-2 sm:left-4 md:left-10 text-2xl sm:text-3xl md:text-4xl animate-gentle-float opacity-60">
        🥕
      </div>
      <div
        className="absolute top-10 sm:top-16 md:top-20 right-2 sm:right-4 md:right-10 text-xl sm:text-2xl md:text-3xl animate-gentle-float opacity-60"
        style={{ animationDelay: "1s" }}
      >
        🍅
      </div>
      <div
        className="absolute bottom-10 sm:bottom-16 md:bottom-20 right-4 sm:right-8 md:right-20 text-lg sm:text-xl md:text-2xl animate-gentle-float opacity-60"
        style={{ animationDelay: "2s" }}
      >
        🧄
      </div>
      <div
        className="absolute top-1/2 left-2 sm:left-4 md:left-10 text-xl sm:text-2xl md:text-3xl animate-gentle-float opacity-60"
        style={{ animationDelay: "0.5s" }}
      >
        🌿
      </div>
    </div>
  );
};

export default Loading;
