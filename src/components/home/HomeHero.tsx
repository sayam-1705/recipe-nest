"use client";

import Image from "next/image";
import Link from "next/link";

interface HomeHeroProps {
  featuredRecipe?: Recipe;
}

export default function HomeHero({ featuredRecipe }: HomeHeroProps) {
  return (
    <header className="relative pt-32 pb-20 px-6 overflow-hidden min-h-screen flex items-center justify-center">
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

      <div className="relative z-10 w-full max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        {/* Left Content */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-8">
          <div className="inline-flex items-center gap-3 px-4 py-2 md:px-6 md:py-3 rounded-full bg-white/80 dark:bg-slate-800/60 text-slate-900 dark:text-white text-xs md:text-sm font-bold backdrop-blur-md border border-slate-200 dark:border-slate-700 shadow-sm">
            <span className="relative flex h-2 w-2 md:h-3 md:w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 md:h-3 md:w-3 bg-orange-500"></span>
            </span>
            NEXT-GEN CULINARY PLATFORM
          </div>

          <h1 className="font-display font-bold text-5xl md:text-7xl lg:text-8xl xl:text-9xl leading-[1.1] md:leading-[0.9] text-slate-900 dark:text-white tracking-tight">
            CULINARY <br className="hidden lg:block"/>
            <span className="text-gradient italic">INNOVATION</span> <br className="hidden lg:block"/>
            AWAITS
          </h1>

          <p className="text-lg md:text-xl lg:text-2xl text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed font-light">
            Join the future of gastronomy. AI-powered pairings, holographic previews, and a global chef network.
          </p>

          <div className="flex flex-wrap justify-center lg:justify-start gap-4 md:gap-6 w-full">
            <Link 
              href="/search" 
              className="inline-flex items-center justify-center gap-3 px-8 py-4 md:px-12 md:py-6 bg-gradient-to-r from-primary to-secondary text-white rounded-2xl font-bold shadow-glow hover:shadow-2xl transition-all text-base md:text-xl"
            >
              Start Cooking
              <span className="material-symbols-outlined font-bold text-lg md:text-2xl">arrow_forward</span>
            </Link>
            <Link 
              href="#workflow" 
              className="inline-flex items-center justify-center gap-3 px-8 py-4 md:px-12 md:py-6 bg-white/40 dark:bg-slate-800/40 hover:bg-white/60 dark:hover:bg-slate-700/60 text-slate-900 dark:text-white rounded-2xl font-bold backdrop-blur-md border border-white/40 dark:border-white/10 transition-all text-base md:text-xl"
            >
              <span className="material-symbols-outlined text-primary text-2xl md:text-3xl">play_circle</span>
              Watch Demo
            </Link>
          </div>
        </div>

        {/* Right Content - Featured Recipe Card */}
        <div className="relative flex justify-center lg:justify-end animate-float">
          <div className="absolute inset-0 bg-orange-500/10 rounded-full blur-[120px] -z-10 transform scale-125"></div>
          <div className="glass-panel p-6 md:p-8 rounded-[3rem] w-full max-w-sm md:max-w-md shadow-xl dark:shadow-black/40 border-t border-white/60 dark:border-white/10 relative text-left">
            <div className="flex justify-between items-center mb-6">
              <span className="px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] md:text-xs font-black uppercase tracking-widest">
                Masterpiece of the Day
              </span>
            </div>

            <div className="relative aspect-square rounded-[2rem] md:rounded-[2.5rem] overflow-hidden mb-6 md:mb-8 shadow-2xl">
              <Image 
                alt={featuredRecipe?.name || "Featured Recipe"} 
                fill
                className="object-cover" 
                src={featuredRecipe?.image || "https://lh3.googleusercontent.com/aida-public/AB6AXuAX6UL7aFiHkGVjd7xHVkvXDz_artVB3HP7zVD1zczxOxuXzMWv59ftQrKqXOvz95vWBcfI3ZZwQw8HQRnUJ_EWoHnZnxpLj5MtJZ_Uy_lLlkkYfVNqcIttObCpWcLgjX9DiXMJJ-1XQQMKTz0amSbtFdrntjGk5ht6gYmCEl5AuHcHbVF9h2IKK0BEPJyEbJAnHIFvCMNm6M4Pu02jDnPzXFetEqKhtjtN920JeUTWxNcNZV-9YSpYrj0_xPK8P5DUP9kegn_tGGO-"} 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-white">
                <div>
                  <p className="text-[10px] md:text-xs font-bold opacity-80 uppercase mb-1">Expertise</p>
                  <p className="text-base md:text-lg font-bold">Advanced</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] md:text-xs font-bold opacity-80 uppercase mb-1">Prep</p>
                  <p className="text-base md:text-lg font-bold">45 min</p>
                </div>
              </div>
            </div>

            <h3 className="font-display font-bold text-3xl md:text-4xl text-slate-900 dark:text-white mb-4">
              {featuredRecipe?.name || "Cosmic Saffron Infusion"}
            </h3>
            <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 mb-8 leading-relaxed line-clamp-2">
              {featuredRecipe?.type || "A molecular reinterpretation of the classic Italian risotto using low-temp saffron extraction."}
            </p>

            <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-700 pt-6 md:pt-8">
              <div className="flex items-center gap-3 md:gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-primary flex items-center justify-center text-white shrink-0 overflow-hidden">
                  <Image 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuC-AmOpe2ZDqTOrfLNCgvN3-b89rPILA9DvAjE6Eal40CuWL3zMp3-UQl0uTw2GXiuqtYbIV0t8D5oG-_E7XLY7ppa7lAIa-EInNuAGAzH3bUafnJylfNHhCICKWEQgNFM6Yh08bdrKDY-DpAFZFN4cA45ubkUR9QoRzIBImTOF0jasmDDP6cw2dBtA-m19-FrWcWZ9WaQTomm0kXy9vahNsPLm5LVUX2TTy77iHs_oBc4q1i4PdEvSs2ajnr8BLcLTDU5hiM6dgbJm" 
                    alt="Chef" 
                    width={48} 
                    height={48} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-xs md:text-sm font-bold text-slate-900 dark:text-white leading-tight">Chef Marco V.</p>
                  <p className="text-[10px] md:text-xs text-slate-500 font-semibold uppercase tracking-tighter">3-Star Innovator</p>
                </div>
              </div>
              <Link 
                href={featuredRecipe ? `/showRecipe/${featuredRecipe._id}` : "#"} 
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
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .fill-1 { font-variation-settings: 'FILL' 1; }
      `}</style>
    </header>
  );
}
