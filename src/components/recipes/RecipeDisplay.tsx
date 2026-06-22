"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Frown, BadgeCheck, Flame, Check, Clock, BarChart3, Utensils, Zap, PlayCircle, ShoppingBag, ShieldCheck, Dumbbell, Droplets, Wheat } from "lucide-react";


interface RecipeDisplayProps {
  recipeId: string;
}

const RecipeDisplay = ({ recipeId }: RecipeDisplayProps) => {
  const router = useRouter();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const recipeResponse = await fetch(`/api/getRecipeById/${recipeId}`);
        if (!recipeResponse.ok) throw new Error("Recipe not found");
        const recipeData = await recipeResponse.json();
        const fetchedRecipe = recipeData.recipe;
        setRecipe(fetchedRecipe);

        if (fetchedRecipe?.userId) {
          const userResponse = await fetch(`/api/getUserById/${fetchedRecipe.userId}`);
          if (userResponse.ok) {
            const userJson = await userResponse.json();
            setUserData(userJson.user);
          }
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [recipeId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background-light dark:bg-background-dark flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <p className="text-slate-500 dark:text-slate-400 font-black uppercase tracking-widest animate-pulse">Refining Flavors...</p>
        </div>
      </div>
    );
  }

  if (error || !recipe) {
    return (
      <div className="min-h-screen bg-background-light dark:bg-background-dark flex items-center justify-center p-4 sm:p-6">
        <div className="glass-panel p-6 sm:p-8 md:p-12 rounded-2xl sm:rounded-[2rem] md:rounded-[2.5rem] text-center max-w-md w-full">
          <Frown className="w-16 h-16 text-rose-500 mb-6 mx-auto" />
          <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-4">Recipe Not Found</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-8 font-medium">
            {error || "The recipe you are looking for has been moved or deleted."}
          </p>
          <button 
            onClick={() => router.push("/search")}
            className="w-full py-4 bg-primary text-white font-black rounded-2xl shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
          >
            Back to Discovery
          </button>
        </div>
      </div>
    );
  }

  const nutrition = recipe.nutritionPerServing;
  const calories = nutrition?.calories || nutrition?.ENERC_KCAL || 0;
  const protein = nutrition?.PROCNT_KCAL ? `${Math.round(nutrition.PROCNT_KCAL)}g` : "—";
  const fats = nutrition?.FAT_KCAL ? `${Math.round(nutrition.FAT_KCAL)}g` : "—";
  const carbs = nutrition?.CHOCDF_KCAL ? `${Math.round(nutrition.CHOCDF_KCAL)}g` : "—";

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark transition-colors duration-500 font-sans selection:bg-primary selection:text-white text-slate-800 dark:text-slate-100 relative">
      {/* Background Gradients */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-orange-200/20 dark:bg-orange-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-blue-100/30 dark:bg-blue-900/10 rounded-full blur-[120px]"></div>
      </div>

      <main className="pt-20 sm:pt-24 lg:pt-36 pb-8 sm:pb-12 md:pb-16">
        {/* Main Content Grid */}
        <div className="max-w-[1800px] mx-auto px-3 sm:px-4 lg:px-8 space-y-6 sm:space-y-8 lg:space-y-12 animate-fade-in-up">
          
          {/* Top Section: Hero & Essential Info */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8 lg:min-h-[600px]">
            
            {/* Hero Image Section */}
            <div className="lg:col-span-7 relative h-[250px] xs:h-[300px] sm:h-[350px] md:h-[400px] lg:h-auto rounded-2xl sm:rounded-[2rem] lg:rounded-[3rem] overflow-hidden shadow-2xl group transition-all duration-700">
              <Image 
                alt={recipe.name} 
                src={recipe.image} 
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent"></div>
              
              {/* Image Overlays */}
              <div className="absolute top-6 left-6 flex flex-col gap-2 scale-90 lg:scale-100 origin-top-left">
                <span className="bg-white/20 backdrop-blur-md border border-white/30 text-white px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest flex items-center gap-2">
                  <BadgeCheck className="w-4 h-4" /> {recipe.dietaryType}
                </span>
                <span className="bg-orange-500/80 backdrop-blur-md border border-orange-400/30 text-white px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest flex items-center gap-2 shadow-[0_0_20px_rgba(249,115,22,0.4)]">
                  <Flame className="w-4 h-4" /> {recipe.difficulty}
                </span>
              </div>

              <div className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10 lg:hidden">
                <h1 className="text-xl xs:text-2xl sm:text-3xl font-black text-white leading-tight mb-2 pr-6 sm:pr-10">{recipe.name}</h1>
                <p className="text-white/80 font-bold flex items-center gap-2">
                  By {userData?.name || "Culinary Artist"}
                </p>
              </div>
            </div>

            {/* Recipe Quick Info Card */}
            <div className="lg:col-span-5 flex flex-col">
              <div className="glass-panel p-5 sm:p-6 md:p-8 lg:p-12 rounded-2xl sm:rounded-[2rem] lg:rounded-[3rem] h-full flex flex-col shadow-glass relative overflow-hidden group">
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-[100px] pointer-events-none group-hover:bg-primary/20 transition-all duration-700"></div>
                
                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-4 sm:mb-6 lg:mb-8">
                    <span className="text-primary font-black text-xs uppercase tracking-[0.3em] flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_rgba(249,115,22,1)]"></span>
                      {recipe.type} • {recipe.meal}
                    </span>
                  </div>

                  <h1 className="hidden lg:block text-3xl lg:text-5xl xl:text-6xl font-black text-slate-900 dark:text-white leading-[1.1] mb-6 sm:mb-8 tracking-tighter">
                    {recipe.name}
                  </h1>

                  <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8 md:mb-10 pb-6 sm:pb-8 md:pb-10 border-b border-slate-100 dark:border-white/5">
                    <div className="relative cursor-pointer group/author">
                      <Image 
                        alt="Author" 
                        className="w-14 h-14 lg:w-16 lg:h-16 rounded-full border-2 border-white dark:border-slate-700 shadow-md group-hover/author:border-primary transition-all duration-300"
                        src={userData?.picture || `https://ui-avatars.com/api/?name=${userData?.name || "User"}&background=random`} 
                        width={64}
                        height={64}
                        unoptimized
                      />
                      <div className="absolute -bottom-1 -right-1 bg-blue-500 text-white p-0.5 lg:p-1 rounded-full border-2 border-white dark:border-slate-800">
                        <Check className="w-3 h-3 lg:w-3.5 lg:h-3.5" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-slate-900 dark:text-white font-black lg:text-lg">{userData?.name || "Culinary Artist"}</p>
                      <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">{recipe.type} Specialist</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8 md:mb-10">
                    {[
                      { label: "Time", value: recipe.time, icon: Clock, bg: "orange" },
                      { label: "Level", value: recipe.difficulty, icon: BarChart3, bg: "blue" },
                      { label: "Serves", value: `${recipe.servings} People`, icon: Utensils, bg: "green" },
                      { label: "Calories", value: calories ? `${calories} kcal` : "N/A", icon: Zap, bg: "purple" }
                    ].map((stat, idx) => (
                        <div key={idx} className="glass-card p-3 sm:p-4 rounded-2xl sm:rounded-3xl flex items-center gap-2 sm:gap-3 lg:gap-4 border-white/60 dark:border-white/10 hover:scale-[1.02] transition-transform">
                          <div className={`w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-xl sm:rounded-2xl bg-${stat.bg}-50 dark:bg-${stat.bg}-900/30 text-${stat.bg}-600 dark:text-${stat.bg}-400 flex items-center justify-center border border-${stat.bg}-100 dark:border-${stat.bg}-800/50 shrink-0`}>
                          <stat.icon className="w-5 h-5 lg:w-[22px] lg:h-[22px]" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[9px] lg:text-[10px] text-slate-500 font-black uppercase tracking-widest truncate">{stat.label}</p>
                          <p className="text-slate-800 dark:text-slate-100 font-black tracking-tight text-sm lg:text-base truncate">{stat.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col gap-4 mt-auto pt-6">
                    <button 
                      onClick={() => {
                        const stepsEl = document.getElementById("preparation-steps");
                        stepsEl?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="w-full py-5 lg:py-6 bg-slate-900 dark:bg-primary text-white font-black rounded-[1.5rem] shadow-xl shadow-slate-900/10 dark:shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 text-base lg:text-lg uppercase tracking-widest group"
                    >
                      <PlayCircle className="w-6 h-6 group-hover:rotate-12 transition-transform" /> Start Cooking
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section Grid: Ingredients, Steps, Nutrition */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8 lg:items-start">
            
            {/* Ingredients Column */}
            <div className="lg:col-span-3 lg:sticky lg:top-32">
              <div className="glass-panel p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-[2rem] md:rounded-[2.5rem] shadow-glass relative overflow-hidden">
                <div className="flex justify-between items-center mb-6 sm:mb-8 md:mb-10">
                  <h2 className="text-xl lg:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-3">
                    <ShoppingBag className="w-8 h-8 text-primary" /> 
                    Ingredients
                  </h2>
                  <span className="text-[10px] font-black bg-primary/10 text-primary px-3 py-1.5 rounded-full border border-primary/20 uppercase tracking-widest">{recipe.ingredients.length} items</span>
                </div>
                
                <div className="space-y-4 max-h-[70vh] lg:max-h-[800px] overflow-y-auto scrollbar-hide">
                  {recipe.ingredients.map((ing, idx) => (
                    <div key={idx} className="glass-card p-3 sm:p-4 md:p-5 rounded-2xl sm:rounded-3xl flex items-center gap-3 sm:gap-4 group cursor-pointer border-white/60 dark:border-white/5 hover:border-primary/50 transition-all duration-300">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-xl sm:rounded-2xl bg-white dark:bg-slate-800 flex items-center justify-center shadow-sm p-1 border border-slate-100 dark:border-white/5 shrink-0 transition-transform group-hover:scale-110">
                        <Image 
                          alt={ing.name} 
                          src={`https://ui-avatars.com/api/?name=${ing.name}&background=f1f5f9&color=64748b&bold=true`} 
                          width={56} 
                          height={56}
                          className="rounded-xl"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-black text-slate-900 dark:text-white truncate group-hover:text-primary transition-colors">{ing.name}</p>
                        <p className="text-[11px] text-slate-500 font-bold uppercase tracking-wider mt-0.5">{ing.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Steps Column */}
            <div id="preparation-steps" className="lg:col-span-6">
              <div className="glass-panel p-4 sm:p-6 md:p-8 lg:p-12 rounded-2xl sm:rounded-[2rem] md:rounded-[2.5rem] shadow-glass relative">
                <div className="flex justify-between items-center mb-6 sm:mb-8 md:mb-12">
                  <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white tracking-tighter">Preparation</h2>
                  <span className="text-[10px] font-black bg-primary/10 text-primary px-3 py-1.5 rounded-full border border-primary/20 uppercase tracking-widest">{recipe.instructions.length} Steps</span>
                </div>

                <div className="relative space-y-6 sm:space-y-8 md:space-y-12">
                  {/* Visual Vertical Line */}
                  <div className="absolute left-[-12px] top-6 bottom-6 w-0.5 bg-gradient-to-b from-primary via-slate-200 dark:via-white/10 to-transparent lg:left-[-15px]"></div>
                  
                  {recipe.instructions.map((step, idx) => (
                    <div key={idx} className="relative pl-10 group">
                      <div className={`absolute left-[-22px] top-0 w-5 h-5 lg:left-[-26px] lg:w-6 lg:h-6 rounded-full border-4 border-white dark:border-background-dark z-10 shadow-lg transition-all duration-500 ${idx === 0 ? "bg-primary shadow-[0_0_15px_rgba(249,115,22,0.8)]" : "bg-slate-200 dark:bg-slate-800 group-hover:bg-primary group-hover:shadow-[0_0_15px_rgba(249,115,22,0.6)]"}`}></div>
                      
                      <div className={`glass-card p-4 sm:p-6 md:p-8 lg:p-10 rounded-2xl sm:rounded-[2rem] md:rounded-[2.5rem] border-white/60 dark:border-white/5 transition-all duration-500 overflow-hidden relative ${idx !== 0 ? "opacity-70 grayscale-[0.2] hover:opacity-100 hover:grayscale-0" : ""}`}>
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-slate-100 dark:bg-white/5 rounded-full blur-[40px] pointer-events-none group-hover:bg-primary/5 transition-colors"></div>
                        
                        <div className="flex justify-between items-start mb-3 sm:mb-4 md:mb-6">
                          <h3 className="font-black text-xl lg:text-2xl text-slate-900 dark:text-white tracking-tight">
                            {(idx + 1).toString().padStart(2, '0')}. Step
                          </h3>
                        </div>
                        
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-bold text-base lg:text-lg">
                          {step}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Nutrition Column */}
            <div className="lg:col-span-3 lg:sticky lg:top-32">
              <div className="glass-panel p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-[2rem] md:rounded-[2.5rem] shadow-glass flex flex-col items-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-green-500/5 rounded-full blur-[60px] pointer-events-none"></div>
                
                <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white mb-6 sm:mb-8 md:mb-12 self-start flex items-center gap-3">
                  <ShieldCheck className="w-8 h-8 text-green-500" />
                  Nutrition
                </h2>

                {/* Circular Progress (Calories) */}
                <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 mb-6 sm:mb-8 md:mb-12 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle className="stroke-slate-100 dark:stroke-slate-800" cx="50" cy="50" fill="none" r="44" strokeWidth="8"></circle>
                    <circle 
                      className="stroke-primary dark:stroke-primary opacity-90 transition-all duration-1000 ease-out" 
                      cx="50" cy="50" fill="none" r="44" strokeWidth="8" 
                      strokeLinecap="round"
                      strokeDasharray="276.46"
                      strokeDashoffset={calories ? Math.max(0, 276.46 - (276.46 * Math.min(Number(calories) / 800, 1))) : 276.46}
                      style={{ filter: "drop-shadow(0 0 8px rgba(249, 115, 22, 0.4))" }}
                    ></circle>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tighter">
                      {calories || "—"}
                    </span>
                    <span className="text-[10px] text-slate-400 font-black uppercase tracking-[0.3em] mt-1 pl-1">kcal</span>
                  </div>
                </div>

                {/* Linear Progress Stats */}
                <div className="w-full space-y-5">
                  {[
                    { label: "Protein", value: protein, color: "green", icon: Dumbbell },
                    { label: "Fats", value: fats, color: "yellow", icon: Droplets },
                    { label: "Carbs", value: carbs, color: "blue", icon: Wheat }
                  ].map((stat, i) => (
                    <div key={i} className="bg-white/40 dark:bg-white/5 border border-white/60 dark:border-white/5 p-3 sm:p-4 md:p-5 rounded-2xl sm:rounded-3xl flex items-center justify-between group hover:border-primary/30 transition-all">
                      <div className="flex items-center gap-4">
                        <div className={`bg-${stat.color}-500/10 p-3 rounded-2xl text-${stat.color}-600 dark:text-${stat.color}-400 group-hover:scale-110 transition-transform`}>
                          <stat.icon className="w-5 h-5 lg:w-[22px] lg:h-[22px]" />
                        </div>
                        <div>
                          <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">{stat.label}</p>
                          <p className="text-slate-900 dark:text-white font-black text-lg">{stat.value}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <p className="mt-10 text-[10px] text-slate-400 dark:text-slate-500 text-center leading-relaxed font-bold uppercase tracking-widest px-4">
                  Nutritional values per serving based on recipe data
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RecipeDisplay;
