"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";


interface RecipeDisplayProps {
  recipeId: string;
}

const RecipeDisplay = ({ recipeId }: RecipeDisplayProps) => {
  const router = useRouter();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isThemeDark, setIsThemeDark] = useState(false);

  useEffect(() => {
    // Hide global header for this page to match the Stitch design exactly
    const header = document.querySelector("header");
    if (header) header.style.display = "none";
    
    // Add dark mode class to html for local theme toggle
    if (isThemeDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    return () => {
      if (header) header.style.display = "block";
      document.documentElement.classList.remove("dark");
    };
  }, [isThemeDark]);

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

  const toggleTheme = () => setIsThemeDark(!isThemeDark);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <p className="text-slate-500 font-black uppercase tracking-widest animate-pulse">Refining Flavors...</p>
        </div>
      </div>
    );
  }

  if (error || !recipe) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-6">
        <div className="glass-panel p-12 rounded-[2.5rem] text-center max-w-md w-full">
          <span className="material-symbols-outlined text-6xl text-rose-500 mb-6 block">sentiment_dissatisfied</span>
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

  return (
    <div className={`${isThemeDark ? "dark" : ""}`}>
      <div className="min-h-screen bg-[#f8fafc] dark:bg-[#0B0F19] transition-colors duration-500 font-sans selection:bg-primary selection:text-white text-slate-800 dark:text-slate-100 relative">
        {/* Background Gradients */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
          <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-orange-200/20 dark:bg-orange-600/10 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-blue-100/30 dark:bg-blue-900/10 rounded-full blur-[120px]"></div>
        </div>

        {/* Top Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 glass-nav h-16 lg:h-24 flex items-center border-b border-white/40 dark:border-white/5 transition-all">
          <div className="max-w-[1800px] mx-auto w-full px-4 lg:px-8 flex items-center justify-between">
            <div className="flex items-center gap-2 lg:gap-4 cursor-pointer" onClick={() => router.push("/")}>
              <div className="bg-primary p-1.5 lg:p-2.5 rounded-xl lg:rounded-2xl shadow-lg shadow-primary/20">
                <span className="material-symbols-outlined text-white text-xl lg:text-2xl block">restaurant_menu</span>
              </div>
              <span className="font-black text-lg lg:text-2xl tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400">RecipeNest</span>
            </div>
            
            <div className="hidden lg:flex items-center space-x-1 bg-white/40 dark:bg-slate-800/40 p-1.5 rounded-full border border-white/50 dark:border-white/10 backdrop-blur-md">
              <button onClick={() => router.push("/search")} className="px-6 py-2 rounded-full text-slate-600 dark:text-slate-300 font-bold hover:bg-white dark:hover:bg-slate-700 hover:text-primary transition-all text-sm uppercase tracking-widest">Discover</button>
              <button onClick={() => router.push("/profile")} className="px-6 py-2 rounded-full bg-white dark:bg-slate-700 text-primary dark:text-orange-400 font-black shadow-sm text-sm uppercase tracking-widest">My Recipes</button>
              <button className="px-6 py-2 rounded-full text-slate-600 dark:text-slate-300 font-bold hover:bg-white dark:hover:bg-slate-700 hover:text-primary transition-all text-sm uppercase tracking-widest">Meal Plan</button>
            </div>

            <div className="flex items-center gap-3 lg:gap-6">
              <button onClick={toggleTheme} className="w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center rounded-full bg-slate-100/50 dark:bg-slate-800/50 border border-white/50 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:scale-110 active:scale-90 transition-all">
                <span className="material-symbols-outlined">{isThemeDark ? "light_mode" : "dark_mode"}</span>
              </button>
              <button className="w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center rounded-full bg-slate-100/50 dark:bg-slate-800/50 border border-white/50 dark:border-white/10 text-slate-600 dark:text-slate-400 relative">
                <span className="material-symbols-outlined">notifications</span>
                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-primary rounded-full ring-2 ring-white dark:ring-slate-900"></span>
              </button>
              <div onClick={() => router.push("/profile")} className="w-9 h-9 lg:w-12 lg:h-12 rounded-full overflow-hidden border-2 border-white dark:border-slate-700 shadow-sm cursor-pointer hover:border-primary transition-all">
                <Image 
                  alt="Profile" 
                  className="w-full h-full object-cover" 
                  src={userData?.picture || `https://ui-avatars.com/api/?name=${userData?.name || "User"}&background=random`} 
                  width={48} 
                  height={48} 
                  unoptimized 
                />
              </div>
            </div>
          </div>
        </nav>

        <main className="pt-16 lg:pt-36 pb-32">
          {/* Main Content Grid */}
          <div className="max-w-[1800px] mx-auto px-4 lg:px-8 space-y-8 lg:space-y-12 animate-fade-in-up">
            
            {/* Top Section: Hero & Essential Info */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:min-h-[600px]">
              
              {/* Hero Image Section */}
              <div className="lg:col-span-7 relative h-[400px] lg:h-auto rounded-[2.5rem] lg:rounded-[3rem] overflow-hidden shadow-2xl group transition-all duration-700">
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
                    <span className="material-symbols-outlined text-[18px] fill-1">verified</span> Verified Chef
                  </span>
                  <span className="bg-orange-500/80 backdrop-blur-md border border-orange-400/30 text-white px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest flex items-center gap-2 shadow-[0_0_20px_rgba(249,115,22,0.4)]">
                    <span className="material-symbols-outlined text-[18px] fill-1">whatshot</span> Trending
                  </span>
                </div>

                <button className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 lg:w-24 lg:h-24 bg-white/20 backdrop-blur-xl border border-white/40 rounded-full flex items-center justify-center text-white hover:bg-primary transition-all duration-500 group-hover:scale-110 shadow-xl group/play">
                  <span className="material-symbols-outlined text-4xl lg:text-5xl fill-1 group-hover/play:scale-110 transition-transform">play_arrow</span>
                </button>

                <div className="absolute bottom-10 left-10 lg:hidden">
                  <h1 className="text-3xl font-black text-white leading-tight mb-2 pr-10">{recipe.name}</h1>
                  <p className="text-white/80 font-bold flex items-center gap-2">
                    By {userData?.name || "Culinary Artist"}
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                    Master Chef
                  </p>
                </div>
              </div>

              {/* Recipe Quick Info Card */}
              <div className="lg:col-span-5 flex flex-col">
                <div className="glass-panel p-8 lg:p-12 rounded-[2.5rem] lg:rounded-[3rem] h-full flex flex-col shadow-glass relative overflow-hidden group">
                  <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-[100px] pointer-events-none group-hover:bg-primary/20 transition-all duration-700"></div>
                  
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex justify-between items-start mb-6 lg:mb-8">
                      <span className="text-primary font-black text-xs uppercase tracking-[0.3em] flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_rgba(249,115,22,1)]"></span>
                        {recipe.type} • {recipe.meal}
                      </span>
                      <div className="flex gap-2 lg:gap-3">
                        <button className="w-11 h-11 lg:w-14 lg:h-14 rounded-2xl bg-white/50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-rose-500 transition-all border border-white/60 dark:border-white/10 group/fav">
                          <span className="material-symbols-outlined lg:text-[28px] group-hover/fav:fill-1 transition-all">favorite</span>
                        </button>
                        <button className="w-11 h-11 lg:w-14 lg:h-14 rounded-2xl bg-white/50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-blue-500 transition-all border border-white/60 dark:border-white/10">
                          <span className="material-symbols-outlined lg:text-[28px]">share</span>
                        </button>
                      </div>
                    </div>

                    <h1 className="hidden lg:block text-4xl lg:text-5xl xl:text-6xl font-black text-slate-900 dark:text-white leading-[1.1] mb-8 tracking-tighter">
                      {recipe.name}
                    </h1>

                    <div className="flex items-center gap-4 mb-10 pb-10 border-b border-slate-100 dark:border-white/5">
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
                          <span className="material-symbols-outlined text-[12px] lg:text-[14px] block font-black">check</span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-slate-900 dark:text-white font-black lg:text-lg">{userData?.name || "Culinary Artist"}</p>
                        <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Master Chef • 2.4k Followers</p>
                      </div>
                      <div className="flex flex-col items-end">
                        <div className="flex text-yellow-400 mb-1">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className={`material-symbols-outlined text-[18px] lg:text-[22px] ${i < 4 ? "fill-1" : "text-slate-200 dark:text-slate-700"}`}>star</span>
                          ))}
                        </div>
                        <span className="text-slate-500 text-[10px] font-black uppercase tracking-widest">4.8 (342 Reviews)</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-10">
                      {[
                        { label: "Time", value: recipe.time, icon: "schedule", bg: "orange" },
                        { label: "Level", value: recipe.difficulty, icon: "bar_chart", bg: "blue" },
                        { label: "Serves", value: `${recipe.servings} People`, icon: "restaurant", bg: "green" },
                        { label: "Calories", value: `${recipe.nutritionPerServing?.calories || recipe.nutritionPerServing?.ENERC_KCAL || "485"} kcal`, icon: "local_fire_department", bg: "purple" }
                      ].map((stat, idx) => (
                        <div key={idx} className="glass-card p-4 rounded-3xl flex items-center gap-3 lg:gap-4 border-white/60 dark:border-white/10 hover:scale-[1.02] transition-transform">
                          <div className={`w-10 h-10 lg:w-12 lg:h-12 rounded-2xl bg-${stat.bg}-50 dark:bg-${stat.bg}-900/30 text-${stat.bg}-600 dark:text-${stat.bg}-400 flex items-center justify-center border border-${stat.bg}-100 dark:border-${stat.bg}-800/50 shrink-0`}>
                            <span className="material-symbols-outlined text-[20px] lg:text-[22px]">{stat.icon}</span>
                          </div>
                          <div className="min-w-0">
                            <p className="text-[9px] lg:text-[10px] text-slate-500 font-black uppercase tracking-widest truncate">{stat.label}</p>
                            <p className="text-slate-800 dark:text-slate-100 font-black tracking-tight text-sm lg:text-base truncate">{stat.value}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-col gap-4 mt-auto pt-6">
                      <button className="w-full py-5 lg:py-6 bg-slate-900 dark:bg-primary text-white font-black rounded-[1.5rem] shadow-xl shadow-slate-900/10 dark:shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 text-base lg:text-lg uppercase tracking-widest group">
                        <span className="material-symbols-outlined text-2xl group-hover:rotate-12 transition-transform">play_circle</span> Start Guided Cooking
                      </button>
                      <button className="w-full py-5 lg:py-6 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-black rounded-[1.5rem] border border-slate-200 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all flex items-center justify-center gap-3 text-xs lg:text-sm uppercase tracking-[0.2em]">
                        <span className="material-symbols-outlined">shopping_cart</span> Add Ingredients to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Section Grid: Ingredients, Steps, Nutrition */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:items-start">
              
              {/* Ingredients Column */}
              <div className="lg:col-span-3 lg:sticky lg:top-32">
                <div className="glass-panel p-8 rounded-[2.5rem] shadow-glass relative overflow-hidden">
                  <div className="flex justify-between items-center mb-10">
                    <h2 className="text-xl lg:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-3">
                      <span className="material-symbols-outlined text-primary text-3xl">grocery</span> 
                      Ingredients
                    </h2>
                    <span className="text-[10px] font-black bg-primary/10 text-primary px-3 py-1.5 rounded-full border border-primary/20 uppercase tracking-widest">{recipe.ingredients.length} items</span>
                  </div>
                  
                  <div className="space-y-4 max-h-[70vh] lg:max-h-[800px] overflow-y-auto scrollbar-hide">
                    {recipe.ingredients.map((ing, idx) => (
                      <div key={idx} className="glass-card p-5 rounded-3xl flex items-center gap-4 group cursor-pointer border-white/60 dark:border-white/5 hover:border-primary/50 transition-all duration-300">
                        <div className="w-14 h-14 rounded-2xl bg-white dark:bg-slate-800 flex items-center justify-center shadow-sm p-1 border border-slate-100 dark:border-white/5 shrink-0 transition-transform group-hover:scale-110">
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
                        <span className="material-symbols-outlined text-slate-300 dark:text-slate-700 group-hover:text-primary transition-colors text-2xl">add_circle</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Steps Column */}
              <div className="lg:col-span-6">
                <div className="glass-panel p-8 lg:p-12 rounded-[2.5rem] shadow-glass relative">
                  <div className="flex justify-between items-center mb-12">
                    <h2 className="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white tracking-tighter">Preparation</h2>
                    <button className="text-primary hover:text-primary-hover font-black text-[10px] uppercase tracking-widest flex items-center gap-2 group">
                      Expand Gallery <span className="material-symbols-outlined text-lg group-hover:rotate-12 transition-transform">grid_view</span>
                    </button>
                  </div>

                  <div className="relative space-y-12">
                    {/* Visual Vertical Line */}
                    <div className="absolute left-[-12px] top-6 bottom-6 w-0.5 bg-gradient-to-b from-primary via-slate-200 dark:via-white/10 to-transparent lg:left-[-15px]"></div>
                    
                    {recipe.instructions.map((step, idx) => (
                      <div key={idx} className="relative pl-10 group">
                        <div className={`absolute left-[-22px] top-0 w-5 h-5 lg:left-[-26px] lg:w-6 lg:h-6 rounded-full border-4 border-white dark:border-[#0B0F19] z-10 shadow-lg transition-all duration-500 ${idx === 0 ? "bg-primary shadow-[0_0_15px_rgba(249,115,22,0.8)]" : "bg-slate-200 dark:bg-slate-800 group-hover:bg-primary group-hover:shadow-[0_0_15px_rgba(249,115,22,0.6)]"}`}></div>
                        
                        <div className={`glass-card p-8 lg:p-10 rounded-[2.5rem] border-white/60 dark:border-white/5 transition-all duration-500 overflow-hidden relative ${idx !== 0 ? "opacity-70 grayscale-[0.2] hover:opacity-100 hover:grayscale-0" : ""}`}>
                          <div className="absolute -top-10 -right-10 w-40 h-40 bg-slate-100 dark:bg-white/5 rounded-full blur-[40px] pointer-events-none group-hover:bg-primary/5 transition-colors"></div>
                          
                          <div className="flex justify-between items-start mb-6">
                            <h3 className="font-black text-xl lg:text-2xl text-slate-900 dark:text-white tracking-tight">
                              {(idx + 1).toString().padStart(2, '0')}. Step
                            </h3>
                            <span className="text-[10px] font-black text-primary bg-primary/10 px-4 py-2 rounded-full border border-primary/20 uppercase tracking-widest">
                              {idx === 0 ? "5 Mins" : idx === 1 ? "10 Mins" : "45 Mins"}
                            </span>
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
                <div className="glass-panel p-8 rounded-[2.5rem] shadow-glass flex flex-col items-center relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-green-500/5 rounded-full blur-[60px] pointer-events-none"></div>
                  
                  <h2 className="text-xl font-black text-slate-900 dark:text-white mb-12 self-start flex items-center gap-3">
                    <span className="material-symbols-outlined text-green-500 text-3xl">health_and_safety</span>
                    Nutrition
                  </h2>

                  {/* Circular Progress (Calories) */}
                  <div className="relative w-56 h-56 mb-12 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                      <circle className="stroke-slate-100 dark:stroke-slate-800" cx="50" cy="50" fill="none" r="44" strokeWidth="8"></circle>
                      <circle 
                        className="stroke-primary dark:stroke-primary opacity-90 transition-all duration-1000 ease-out" 
                        cx="50" cy="50" fill="none" r="44" strokeWidth="8" 
                        strokeLinecap="round"
                        strokeDasharray="276.46"
                        strokeDashoffset="66"
                        style={{ filter: "drop-shadow(0 0 8px rgba(249, 115, 22, 0.4))" }}
                      ></circle>
                      <circle 
                        className="stroke-green-500 opacity-90 transition-all duration-1000 ease-out delay-300" 
                        cx="50" cy="50" fill="none" r="34" strokeWidth="6" 
                        strokeLinecap="round"
                        strokeDasharray="213.63"
                        strokeDashoffset="64"
                      ></circle>
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-5xl font-black text-slate-900 dark:text-white tracking-tighter">
                        {recipe.nutritionPerServing?.calories || recipe.nutritionPerServing?.ENERC_KCAL || "485"}
                      </span>
                      <span className="text-[10px] text-slate-400 font-black uppercase tracking-[0.3em] mt-1 pl-1">kcal</span>
                    </div>
                    <div className="absolute -bottom-4 bg-white/90 dark:bg-slate-800/90 backdrop-blur shadow-xl px-5 py-2.5 rounded-2xl text-[10px] font-black text-primary border border-orange-100 dark:border-white/5 uppercase tracking-[0.2em]">
                      76% Daily Goal
                    </div>
                  </div>

                  {/* Linear Progress Stats */}
                  <div className="w-full space-y-5">
                    {[
                      { label: "Protein", value: "42g", percent: "70%", color: "green", icon: "fitness_center" },
                      { label: "Fats", value: "18g", percent: "45%", color: "yellow", icon: "water_drop" },
                      { label: "Carbs", value: "12g", percent: "30%", color: "blue", icon: "grain" }
                    ].map((stat, i) => (
                      <div key={i} className="bg-white/40 dark:bg-white/5 border border-white/60 dark:border-white/5 p-5 rounded-3xl flex items-center justify-between group hover:border-primary/30 transition-all">
                        <div className="flex items-center gap-4">
                          <div className={`bg-${stat.color}-500/10 p-3 rounded-2xl text-${stat.color}-600 dark:text-${stat.color}-400 group-hover:scale-110 transition-transform`}>
                            <span className="material-symbols-outlined text-[20px] lg:text-[22px]">{stat.icon}</span>
                          </div>
                          <div>
                            <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">{stat.label}</p>
                            <p className="text-slate-900 dark:text-white font-black text-lg">{stat.value}</p>
                          </div>
                        </div>
                        <div className="w-16 h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                          <div className={`h-full bg-${stat.color}-500 rounded-full transition-all duration-1000`} style={{ width: stat.percent }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <p className="mt-10 text-[10px] text-slate-400 dark:text-slate-500 text-center leading-relaxed font-bold uppercase tracking-widest px-4">
                    Values based on world culinary standards for curated premium recipes
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Mobile Floating Bottom Nav */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 glass-nav h-24 px-10 flex items-center justify-between border-t border-white/20 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
          <button onClick={() => router.push("/")} className="flex flex-col items-center gap-1.5 text-primary group">
            <span className="material-symbols-outlined text-[28px] fill-1 transition-transform group-active:scale-90">home</span>
            <span className="text-[10px] font-black uppercase tracking-wider">Home</span>
          </button>
          <button onClick={() => router.push("/search")} className="flex flex-col items-center gap-1.5 text-slate-400 group">
            <span className="material-symbols-outlined text-[28px] transition-transform group-active:scale-90">explore</span>
            <span className="text-[10px] font-black uppercase tracking-wider">Discover</span>
          </button>
          <div className="relative -top-8">
            <button onClick={() => router.push("/createRecipe")} className="w-16 h-16 bg-primary text-white rounded-[1.5rem] shadow-[0_10px_30px_rgba(249,115,22,0.4)] flex items-center justify-center active:scale-90 transition-all">
              <span className="material-symbols-outlined text-[36px]">add</span>
            </button>
          </div>
          <button className="flex flex-col items-center gap-1.5 text-slate-400 group">
            <span className="material-symbols-outlined text-[28px] transition-transform group-active:scale-90">calendar_today</span>
            <span className="text-[10px] font-black uppercase tracking-wider">Plan</span>
          </button>
          <button onClick={() => router.push("/profile")} className="flex flex-col items-center gap-1.5 text-slate-400 group">
            <span className="material-symbols-outlined text-[28px] transition-transform group-active:scale-90">person</span>
            <span className="text-[10px] font-black uppercase tracking-wider">Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeDisplay;
