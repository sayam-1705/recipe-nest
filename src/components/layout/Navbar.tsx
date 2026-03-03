"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { isAuthenticated, getUser } from "@/lib/auth";

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    
    // Check auth
    if (isAuthenticated()) {
      setUser(getUser());
    }

    // Initialize dark mode from localStorage or system preference
    const stored = localStorage.getItem("theme");
    if (stored === "dark" || (!stored && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      document.documentElement.classList.add("dark");
      setIsDarkMode(true);
    } else {
      document.documentElement.classList.remove("dark");
      setIsDarkMode(false);
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const toggleDarkMode = () => {
    const next = !isDarkMode;
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
    setIsDarkMode(next);
  };

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Recipes", href: "/search", icon: "search" },
    { label: "Create", href: "/createRecipe", icon: "add_circle", protected: true },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? "py-2" : "py-3 md:py-4"
    }`}>
      <div className="glass-nav mx-auto max-w-7xl px-3 sm:px-4 md:px-8 py-2.5 sm:py-3 flex items-center justify-between rounded-full mt-2 md:mt-4 border border-white/20 shadow-glass">
        {/* Logo */}
        <Link href="/" className="flex items-center hover:opacity-90 transition-opacity">
          <Image
            src="/logos/logo-with-text-name.png"
            alt="RecipeNest"
            width={220}
            height={64}
            priority
            className="h-9 sm:h-10 md:h-12 w-auto"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-1 bg-slate-100/50 dark:bg-slate-800/50 p-1 rounded-full border border-slate-200/50 dark:border-slate-700/50 backdrop-blur-sm">
          {navLinks.map((link) => (
            (!link.protected || user) && (
              <Link 
                key={link.href}
                href={link.href} 
                className={`px-6 py-2 rounded-full text-sm transition-all flex items-center gap-2 group ${
                  pathname === link.href 
                    ? "bg-white dark:bg-slate-700 shadow-sm font-bold text-primary dark:text-white" 
                    : "font-semibold text-slate-600 dark:text-slate-300 hover:bg-white/50 dark:hover:bg-slate-600/50"
                }`}
              >
                {link.icon && (
                  <span className={`material-symbols-outlined text-[18px] transition-colors ${
                    pathname === link.href ? "text-primary" : "text-slate-400 group-hover:text-primary"
                  }`}>
                    {link.icon}
                  </span>
                )}
                {link.label}
              </Link>
            )
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2 md:gap-4">
          <button 
            aria-label="Toggle theme"
            onClick={toggleDarkMode}
            className="w-8 h-8 sm:w-9 sm:h-9 md:w-11 md:h-11 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 flex items-center justify-center transition-all text-slate-600 dark:text-accent-neon shadow-sm"
          >
            <span className="material-symbols-outlined text-lg md:text-xl !block dark:!hidden">dark_mode</span>
            <span className="material-symbols-outlined text-lg md:text-xl !hidden dark:!block">light_mode</span>
          </button>
          
          {user ? (
            <Link href="/profile" className="relative group">
              <Image 
                src={user.picture || "https://lh3.googleusercontent.com/a/default-user"} 
                alt="User Profile" 
                width={44} 
                height={44} 
                className="w-8 h-8 sm:w-9 sm:h-9 md:w-11 md:h-11 rounded-full border-2 border-white dark:border-slate-700 shadow-sm object-cover group-hover:border-primary transition-colors"
              />
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-slate-900 rounded-full"></div>
            </Link>
          ) : (
            <Link 
              href="/signup" 
              className="px-3 py-1.5 sm:px-5 sm:py-2 md:px-6 md:py-2.5 bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-200 text-white dark:text-slate-900 rounded-full text-[10px] sm:text-xs md:text-sm font-bold transition-all shadow-glow dark:shadow-glow-neon"
            >
              Sign Up
            </Link>
          )}

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-900 dark:text-white"
          >
            <span className="material-symbols-outlined">{isMobileMenuOpen ? "close" : "menu"}</span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden mx-4 mt-2 p-4 glass-nav rounded-3xl border border-white/20 shadow-2xl animate-in slide-in-from-top-5">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              (!link.protected || user) && (
                <Link 
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 p-3 rounded-2xl transition-all ${
                    pathname === link.href 
                      ? "bg-primary/10 text-primary font-bold" 
                      : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                >
                  <span className="material-symbols-outlined">{link.icon || "circle"}</span>
                  {link.label}
                </Link>
              )
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
