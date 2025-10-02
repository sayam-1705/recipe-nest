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
              width: `${Math.random() * 60 + 20}px`,
              height: `${Math.random() * 60 + 20}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.8}s`,
              animationDuration: `${4 + Math.random() * 4}s`,
            }}
          />
        ))}

        <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-8 bg-white/30 rounded-full animate-bounce opacity-60"
              style={{
                left: `${i * 10}px`,
                animationDelay: `${i * 0.3}s`,
                animationDuration: "2s",
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 text-center max-w-md mx-auto px-6">
        <div className="relative mb-8">
          <div className="w-32 h-32 mx-auto relative">
            <div className="w-28 h-20 bg-secondary-green-dark rounded-b-full absolute bottom-0 left-1/2 transform -translate-x-1/2 shadow-lg">
              <div className="w-24 h-4 bg-secondary-green-medium rounded-full absolute -top-2 left-1/2 transform -translate-x-1/2"></div>
              <div className="w-3 h-6 bg-secondary-green-medium rounded-full absolute -left-1 top-2"></div>
              <div className="w-3 h-6 bg-secondary-green-medium rounded-full absolute -right-1 top-2"></div>
            </div>

            <div className="w-24 h-8 bg-secondary-green-light rounded-full absolute top-4 left-1/2 transform -translate-x-1/2 shadow-md animate-subtle-pulse">
              <div className="w-4 h-4 bg-primary-orange rounded-full absolute -top-2 left-1/2 transform -translate-x-1/2"></div>
            </div>

            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-6 bg-white/60 rounded-full animate-bounce"
                  style={{
                    left: `${(i - 1.5) * 6}px`,
                    animationDelay: `${i * 0.2}s`,
                    animationDuration: "1.5s",
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {showChef && (
          <div className="mb-6 animate-fade-in-up">
            <div className="text-6xl animate-bounce-horizontal">👨‍🍳</div>
          </div>
        )}

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-secondary-green-dark mb-2 animate-fade-in">
            RecipeNest
          </h1>
          <p className="text-lg text-secondary-green-medium font-medium bg-gradient-to-r from-secondary-green-medium via-primary-orange to-secondary-green-medium bg-clip-text text-transparent animate-shimmer">
            {loadingText}
          </p>
        </div>

        <div className="w-full bg-white/50 rounded-full h-3 mb-6 overflow-hidden shadow-inner">
          <div
            className="bg-gradient-to-r from-primary-orange to-primary-orange-hover h-full rounded-full transition-all duration-500 ease-out relative"
            style={{ width: `${Math.min(progress, 100)}%` }}
          >
            <div className="absolute inset-0 bg-white/30 animate-shimmer bg-gradient-to-r from-transparent via-white to-transparent bg-200"></div>
          </div>
        </div>

        <div className="flex justify-center space-x-8 mb-6">
          <div
            className="text-2xl animate-bounce-horizontal"
            style={{ animationDelay: "0s" }}
          >
            🥄
          </div>
          <div
            className="text-2xl animate-bounce-horizontal"
            style={{ animationDelay: "0.3s" }}
          >
            🍳
          </div>
          <div
            className="text-2xl animate-bounce-horizontal"
            style={{ animationDelay: "0.6s" }}
          >
            🔪
          </div>
        </div>

        <div className="text-sm text-secondary-green-medium/80 animate-fade-in">
          <p className="italic">
            💡 Tip: Fresh ingredients make all the difference!
          </p>
        </div>
      </div>

      <div className="absolute bottom-10 left-10 text-4xl animate-gentle-float opacity-60">
        🥕
      </div>
      <div
        className="absolute top-20 right-10 text-3xl animate-gentle-float opacity-60"
        style={{ animationDelay: "1s" }}
      >
        🍅
      </div>
      <div
        className="absolute bottom-20 right-20 text-2xl animate-gentle-float opacity-60"
        style={{ animationDelay: "2s" }}
      >
        🧄
      </div>
      <div
        className="absolute top-1/2 left-10 text-3xl animate-gentle-float opacity-60"
        style={{ animationDelay: "0.5s" }}
      >
        🌿
      </div>
    </div>
  );
};

export default Loading;
