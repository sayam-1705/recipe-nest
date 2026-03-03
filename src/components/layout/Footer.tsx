"use client";

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full py-8 sm:py-10 md:py-12 px-4 sm:px-6 md:px-12 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 transition-colors duration-500">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 sm:gap-10 md:gap-12">
        {/* Brand */}
        <div className="col-span-1 md:col-span-2 space-y-6 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start">
            <Image
              src="/logos/logo-with-text-name.png"
              alt="RecipeNest"
              width={260}
              height={80}
              className="h-12 sm:h-14 w-auto"
            />
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base md:text-lg leading-relaxed max-w-md mx-auto md:mx-0">
            Elevate your culinary journey with premium recipes, seasonal inspirations, and professional chef insights.
          </p>
        </div>

        {/* Quick Links */}
        <div className="text-center md:text-left">
          <h4 className="font-bold text-slate-900 dark:text-white mb-6 uppercase tracking-widest text-sm">Explore</h4>
          <ul className="space-y-4 text-slate-500 dark:text-slate-400 font-medium">
            <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
            <li><Link href="/search" className="hover:text-primary transition-colors">Recipes</Link></li>
            <li><Link href="/createRecipe" className="hover:text-primary transition-colors">Create Recipe</Link></li>
          </ul>
        </div>

        {/* Social / Info */}
        <div className="text-center md:text-left">
          <h4 className="font-bold text-slate-900 dark:text-white mb-6 uppercase tracking-widest text-sm">Legal</h4>
          <ul className="space-y-4 text-slate-500 dark:text-slate-400 font-medium">
            <li><Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link></li>
            <li><Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
            <li><Link href="#" className="hover:text-primary transition-colors">Cookie Policy</Link></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-8 sm:mt-12 md:mt-16 pt-6 sm:pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 sm:gap-6">
        <p className="text-slate-400 dark:text-slate-600 text-sm font-medium">
          © 2026 RecipeNest. Handcrafted for food enthusiasts.
        </p>
        <div className="flex gap-6">
          <Link href="#" className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-primary hover:text-white transition-all">
            <span className="material-symbols-outlined text-xl">share</span>
          </Link>
          <Link href="#" className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-primary hover:text-white transition-all">
            <span className="material-symbols-outlined text-xl">public</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
