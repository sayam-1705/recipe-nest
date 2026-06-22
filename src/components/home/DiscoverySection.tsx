"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Clock, ArrowRight } from "lucide-react";

interface DiscoverySectionProps {
  recipes: Recipe[];
}

export default function DiscoverySection({ recipes }: DiscoverySectionProps) {
  return (
    <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 relative bg-white dark:bg-slate-900/30 overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 sm:mb-12 md:mb-16 gap-6 sm:gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-12 h-1 bg-primary rounded-full"></span>
              <span className="text-primary font-black uppercase tracking-[0.2em] text-[10px] md:text-sm">Dynamic Discovery</span>
            </div>
            <h2 className="font-display font-bold text-2xl xs:text-3xl sm:text-4xl md:text-6xl lg:text-7xl text-slate-900 dark:text-white leading-tight">
              TRENDING <br className="hidden md:block lg:hidden"/> COLLECTIONS
            </h2>
          </div>
          <div className="flex gap-4">
            <button className="w-12 h-12 md:w-16 md:h-16 rounded-full border-2 border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-400 hover:bg-slate-900 dark:hover:bg-white hover:text-white dark:hover:text-slate-900 transition-all">
              <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
            </button>
            <button className="w-12 h-12 md:w-16 md:h-16 rounded-full border-2 border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-400 hover:bg-slate-900 dark:hover:bg-white hover:text-white dark:hover:text-slate-900 transition-all">
              <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-10">
          {recipes.length > 0 ? (
            recipes.slice(0, 3).map((recipe, index) => (
              <div key={recipe._id} className="group">
                <div className="glass-panel p-4 sm:p-5 md:p-6 rounded-2xl sm:rounded-[2rem] md:rounded-[2.5rem] h-full flex flex-col hover:shadow-2xl transition-all duration-500 border border-white/40 dark:border-white/10">
                  <div className="relative aspect-[4/5] rounded-xl sm:rounded-[1.5rem] md:rounded-[2rem] overflow-hidden mb-4 sm:mb-6 md:mb-8">
                    <Image 
                      alt={recipe.name} 
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700" 
                      src={recipe.image} 
                    />
                    {index === 0 && (
                      <div className="absolute top-6 left-6 glass-panel px-4 py-2 rounded-full flex items-center gap-2 border border-white/60">
                        <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
                        <span className="text-[10px] font-black uppercase tracking-wider text-slate-900 dark:text-white">Trending Now</span>
                      </div>
                    )}
                  </div>
                  <h3 className="font-display font-bold text-lg sm:text-xl md:text-3xl text-slate-900 dark:text-white mb-2 sm:mb-4 leading-tight">
                    {recipe.name}
                  </h3>
                  <p className="text-xs sm:text-sm md:text-base text-slate-500 dark:text-slate-400 mb-4 sm:mb-6 md:mb-8 line-clamp-2">
                    {recipe.type} - {recipe.meal}
                  </p>
                  <div className="mt-auto flex items-center justify-between pt-6 border-t border-slate-100 dark:border-slate-700">
                    <span className="flex items-center gap-2 text-xs md:text-sm font-bold text-slate-500 uppercase tracking-tighter">
                      <Clock className="w-5 h-5 text-primary" /> 
                      {recipe.time}
                    </span>
                    <Link 
                      href={`/showRecipe/${recipe._id}`}
                      className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center hover:scale-110 transition-transform shadow-lg shadow-orange-500/20"
                    >
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            // Skeleton / Placeholder UI could go here
            <div className="col-span-full py-20 text-center text-slate-400 bg-slate-50 dark:bg-slate-800/20 rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-slate-700">
              <p className="text-xl">Discovering new flavors...</p>
            </div>
          )}
        </div>
        
        <div className="mt-8 sm:mt-12 md:mt-16 flex justify-center">
          <Link href="/search" className="px-10 py-4 rounded-full border-2 border-slate-200 dark:border-slate-700 text-sm md:text-base font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-900 dark:hover:bg-white hover:text-white dark:hover:text-slate-900 transition-all">
            View All Collections
          </Link>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl z-0"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl z-0"></div>
    </section>
  );
}
