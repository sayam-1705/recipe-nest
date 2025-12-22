"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import NavLink from "./NavLink";
import AuthLinks from "./AuthLinks";
import MobileNavLink from "./MobileNavLink";
import SearchBar from "./SearchBar";

const useCurrentUser = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const handleStorageChange = () => {
      queryClient.invalidateQueries({ queryKey: ["auth", "me"] });
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("authChange", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("authChange", handleStorageChange);
    };
  }, [queryClient]);

  return useQuery({
    queryKey: ["auth", "me"],
    queryFn: () => {
      if (typeof window !== "undefined") {
        try {
          const userData = localStorage.getItem("user");
          const token = localStorage.getItem("authToken");
          if (!token || !userData) return null;
          return JSON.parse(userData);
        } catch (error) {
          console.error("Error parsing user data:", error);
          localStorage.removeItem("user");
          localStorage.removeItem("authToken");
          return null;
        }
      }
      return null;
    },
    staleTime: 0,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });
};

export default function FuturisticNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { data: user } = useCurrentUser();
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node) &&
        isMobileMenuOpen
      ) {
        closeMobileMenu();
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "glassmorphism-dark backdrop-blur-xl shadow-[0_0_30px_rgba(0,240,255,0.2)]"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <Link
              className="flex items-center gap-3 group transition-all duration-300 hover:scale-105 z-60"
              href="/"
              onClick={closeMobileMenu}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-neon-blue to-neon-purple blur-lg opacity-70 group-hover:opacity-100 transition-opacity"></div>
                <svg
                  className="relative w-10 h-10 sm:w-12 sm:h-12 transition-transform duration-500 group-hover:rotate-12"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2L2 7L12 12L22 7L12 2Z"
                    fill="url(#gradient1)"
                    className="group-hover:animate-float-3d"
                  />
                  <path
                    d="M2 17L12 22L22 17"
                    stroke="url(#gradient2)"
                    strokeWidth="2"
                    className="group-hover:animate-neon-pulse"
                  />
                  <defs>
                    <linearGradient id="gradient1" x1="2" y1="2" x2="22" y2="12">
                      <stop offset="0%" stopColor="#00F0FF" />
                      <stop offset="100%" stopColor="#B026FF" />
                    </linearGradient>
                    <linearGradient id="gradient2" x1="2" y1="17" x2="22" y2="22">
                      <stop offset="0%" stopColor="#B026FF" />
                      <stop offset="100%" stopColor="#FF006E" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <span className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink bg-clip-text text-transparent animate-neon-pulse">
                RecipeNest
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              <NavLink href="/">
                Home
              </NavLink>
              <NavLink href="/search">
                Search
              </NavLink>
              {user && (
                <>
                  <NavLink href="/profile">
                    Profile
                  </NavLink>
                  <NavLink href="/createRecipe">
                    Create
                  </NavLink>
                </>
              )}
            </div>

            {/* Search Bar */}
            <div className="hidden md:block">
              <SearchBar />
            </div>

            {/* Auth Links */}
            <div className="hidden lg:flex items-center gap-4">
              <AuthLinks isMobile={false} onNavigate={closeMobileMenu} />
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden relative w-10 h-10 rounded-lg glassmorphism border border-neon-blue/30 flex items-center justify-center hover:border-neon-purple/50 transition-all"
              aria-label="Toggle menu"
            >
              <div className="w-6 flex flex-col gap-1.5">
                <span
                  className={`block h-0.5 bg-gradient-to-r from-neon-blue to-neon-purple rounded transition-all duration-300 ${
                    isMobileMenuOpen ? "rotate-45 translate-y-2" : ""
                  }`}
                />
                <span
                  className={`block h-0.5 bg-gradient-to-r from-neon-purple to-neon-pink rounded transition-all duration-300 ${
                    isMobileMenuOpen ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`block h-0.5 bg-gradient-to-r from-neon-pink to-neon-blue rounded transition-all duration-300 ${
                    isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        ref={mobileMenuRef}
        className={`fixed top-20 right-0 w-72 h-[calc(100vh-5rem)] lg:hidden z-40 transition-transform duration-500 ease-out ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="glassmorphism-dark h-full p-6 border-l border-neon-blue/30 shadow-[0_0_50px_rgba(0,240,255,0.3)]">
          <div className="flex flex-col gap-6">
            {/* Mobile Search */}
            <div className="md:hidden mb-4">
              <SearchBar />
            </div>

            {/* Mobile Nav Links */}
            <div className="flex flex-col gap-4">
              <MobileNavLink href="/" onClick={closeMobileMenu}>
                Home
              </MobileNavLink>
              <MobileNavLink href="/search" onClick={closeMobileMenu}>
                Search
              </MobileNavLink>
              {user && (
                <>
                  <MobileNavLink
                    href="/profile"
                    onClick={closeMobileMenu}
                  >
                    Profile
                  </MobileNavLink>
                  <MobileNavLink
                    href="/createRecipe"
                    onClick={closeMobileMenu}
                  >
                    Create Recipe
                  </MobileNavLink>
                </>
              )}
            </div>

            {/* Mobile Auth Links */}
            <div className="mt-auto pt-6 border-t border-neon-purple/30">
              <AuthLinks isMobile={true} onNavigate={closeMobileMenu} />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm lg:hidden z-30"
          onClick={closeMobileMenu}
        />
      )}
    </>
  );
}
