"use client";

import Image from "next/image";
import Link from "next/link";

interface HomeHeroProps {
  featuredRecipe?: Recipe;
  weatherInfo?: WeatherInfo;
  weatherLoading?: boolean;
}

// Map weather descriptions to icons
const getWeatherIcon = (description?: string): string => {
  if (!description) return "partly_cloudy_day";
  const desc = description.toLowerCase();
  if (desc.includes("clear") || desc.includes("sun")) return "sunny";
  if (desc.includes("cloud")) return "cloud";
  if (desc.includes("rain") || desc.includes("drizzle")) return "rainy";
  if (desc.includes("snow") || desc.includes("blizzard")) return "ac_unit";
  if (desc.includes("thunder") || desc.includes("storm")) return "thunderstorm";
  if (desc.includes("fog") || desc.includes("mist") || desc.includes("haze"))
    return "foggy";
  return "partly_cloudy_day";
};

export default function HomeHero({
  featuredRecipe,
  weatherInfo,
  weatherLoading,
}: HomeHeroProps) {
  return (
    <header className="relative pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6 overflow-hidden min-h-screen flex items-center justify-center">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image
          alt="Gourmet Background"
          fill
          className="object-cover opacity-80 dark:opacity-20 scale-105 origin-center"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCI7lbyqJy0lHxGK22eMNbiSAx-lpErd2gekD7M3NjjeXTRBCl0YqqT2M6ndNFXugnKKWyXokrG8Fif0fAUFCaNrPVut_SMrwWsv8uvP07vLpnZcvBXBr-WNxTbRBnR1aqrfbUOJxknVljevguknqKB6npc8j31R6WnBGmTuUajpj-i5pby0BMpNctpwBbaG32-ShIAZ7CxWrZeWH-bWDoobDsXd_hv9LNv_WLI8DSQVHGE2We0AAPxKxkzeYm_UYzjpLVOTriJ3ixf"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background-light/90 via-background-light/95 to-background-light dark:from-background-dark/95 dark:via-background-dark/98 dark:to-background-dark"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
        {/* Left Content */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-5 sm:space-y-6 md:space-y-8">
          <div className="inline-flex items-center gap-2 sm:gap-3 px-3 py-1.5 sm:px-4 sm:py-2 md:px-6 md:py-3 rounded-full bg-white/80 dark:bg-slate-800/60 text-slate-900 dark:text-white text-[10px] sm:text-xs md:text-sm font-bold backdrop-blur-md border border-slate-200 dark:border-slate-700 shadow-sm">
            {weatherLoading ? (
              <>
                <div className="animate-spin rounded-full h-3 w-3 md:h-4 md:w-4 border-2 border-primary border-t-transparent"></div>
                FINDING RECIPES FOR YOUR WEATHER...
              </>
            ) : weatherInfo ? (
              <>
                <span className="material-symbols-outlined text-base md:text-lg text-primary fill-1">
                  {getWeatherIcon(weatherInfo.description)}
                </span>
                <span>
                  {weatherInfo.place} — {weatherInfo.temperature}°C,{" "}
                  {weatherInfo.description}
                </span>
              </>
            ) : (
              <>
                <span className="relative flex h-2 w-2 md:h-3 md:w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 md:h-3 md:w-3 bg-orange-500"></span>
                </span>
                NEXT-GEN CULINARY PLATFORM
              </>
            )}
          </div>

          <h1 className="font-display font-bold text-3xl xs:text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl leading-[1.1] md:leading-[0.9] text-slate-900 dark:text-white tracking-tight">
            CULINARY <br className="hidden lg:block" />
            <span className="text-gradient italic">INNOVATION</span>{" "}
            <br className="hidden lg:block" />
            AWAITS
          </h1>

          <p className="text-sm sm:text-base md:text-xl lg:text-2xl text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed font-light">
            Join the future of gastronomy. AI-powered pairings, holographic
            previews, and a global chef network.
          </p>

          <div className="flex flex-wrap justify-center lg:justify-start gap-3 sm:gap-4 md:gap-6 w-full">
            <Link
              href="/search"
              className="inline-flex items-center justify-center gap-2 sm:gap-3 px-6 py-3 sm:px-8 sm:py-4 md:px-12 md:py-6 bg-gradient-to-r from-primary to-secondary text-white rounded-2xl font-bold shadow-glow hover:shadow-2xl transition-all text-sm sm:text-base md:text-xl"
            >
              Start Cooking
              <span className="material-symbols-outlined font-bold text-lg md:text-2xl">
                arrow_forward
              </span>
            </Link>
            <Link
              href="#workflow"
              className="inline-flex items-center justify-center gap-2 sm:gap-3 px-6 py-3 sm:px-8 sm:py-4 md:px-12 md:py-6 bg-white/40 dark:bg-slate-800/40 hover:bg-white/60 dark:hover:bg-slate-700/60 text-slate-900 dark:text-white rounded-2xl font-bold backdrop-blur-md border border-white/40 dark:border-white/10 transition-all text-sm sm:text-base md:text-xl"
            >
              <span className="material-symbols-outlined text-primary text-2xl md:text-3xl">
                play_circle
              </span>
              Watch Demo
            </Link>
          </div>
        </div>

        {/* Right Content - Featured Recipe Card */}
        <div className="relative flex justify-center lg:justify-end animate-float">
          <div className="absolute inset-0 bg-orange-500/10 rounded-full blur-[120px] -z-10 transform scale-125"></div>
          <div className="glass-panel p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-[2.5rem] md:rounded-[3rem] w-full max-w-sm md:max-w-md shadow-xl dark:shadow-black/40 border-t border-white/60 dark:border-white/10 relative text-left">
            <div className="flex justify-between items-center mb-4 sm:mb-6">
              <span className="px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] md:text-xs font-black uppercase tracking-widest">
                {weatherInfo ? "Recommended for You" : "Masterpiece of the Day"}
              </span>
              {weatherInfo && (
                <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-[10px] md:text-xs font-bold flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm fill-1">
                    {getWeatherIcon(weatherInfo.description)}
                  </span>
                  {weatherInfo.temperature}°C
                </span>
              )}
            </div>

            <div className="relative aspect-square rounded-xl sm:rounded-[2rem] md:rounded-[2.5rem] overflow-hidden mb-4 sm:mb-6 md:mb-8 shadow-2xl">
              <Image
                alt={featuredRecipe?.name || "Featured Recipe"}
                fill
                className="object-cover"
                src={
                  featuredRecipe?.image ||
                  "https://lh3.googleusercontent.com/aida-public/AB6AXuAX6UL7aFiHkGVjd7xHVkvXDz_artVB3HP7zVD1zczxOxuXzMWv59ftQrKqXOvz95vWBcfI3ZZwQw8HQRnUJ_EWoHnZnxpLj5MtJZ_Uy_lLlkkYfVNqcIttObCpWcLgjX9DiXMJJ-1XQQMKTz0amSbtFdrntjGk5ht6gYmCEl5AuHcHbVF9h2IKK0BEPJyEbJAnHIFvCMNm6M4Pu02jDnPzXFetEqKhtjtN920JeUTWxNcNZV-9YSpYrj0_xPK8P5DUP9kegn_tGGO-"
                }
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-white">
                <div>
                  <p className="text-[10px] md:text-xs font-bold opacity-80 uppercase mb-1">
                    Difficulty
                  </p>
                  <p className="text-base md:text-lg font-bold">
                    {featuredRecipe?.difficulty || "Medium"}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] md:text-xs font-bold opacity-80 uppercase mb-1">
                    Prep
                  </p>
                  <p className="text-base md:text-lg font-bold">
                    {featuredRecipe?.time || "30 min"}
                  </p>
                </div>
              </div>
            </div>

            <h3 className="font-display font-bold text-xl sm:text-2xl md:text-4xl text-slate-900 dark:text-white mb-3 sm:mb-4">
              {featuredRecipe?.name || "Discover a Recipe"}
            </h3>
            <p className="text-xs sm:text-sm md:text-base text-slate-500 dark:text-slate-400 mb-4 sm:mb-6 md:mb-8 leading-relaxed line-clamp-2">
              {featuredRecipe
                ? `${featuredRecipe.type} • ${featuredRecipe.meal} • ${featuredRecipe.season}`
                : "Enable location to get weather-based recipe recommendations tailored just for you."}
            </p>

            <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-700 pt-4 sm:pt-6 md:pt-8">
              <div className="flex items-center gap-3 md:gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-primary text-xl md:text-2xl">
                    {featuredRecipe?.dietaryType?.toLowerCase().includes("veg")
                      ? "eco"
                      : "restaurant"}
                  </span>
                </div>
                <div>
                  <p className="text-xs md:text-sm font-bold text-slate-900 dark:text-white leading-tight">
                    {featuredRecipe?.dietaryType || "All Diets"}
                  </p>
                  <p className="text-[10px] md:text-xs text-slate-500 font-semibold uppercase tracking-tighter">
                    {featuredRecipe?.servings
                      ? `${featuredRecipe.servings} Servings`
                      : "Recipe"}
                  </p>
                </div>
              </div>
              <Link
                href={
                  featuredRecipe ? `/showRecipe/${featuredRecipe._id}` : "#"
                }
                className="px-6 py-2 md:px-8 md:py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl text-sm md:text-base font-bold hover:scale-105 transition-transform"
              >
                View Recipe
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        .fill-1 {
          font-variation-settings: "FILL" 1;
        }
      `}</style>
    </header>
  );
}
