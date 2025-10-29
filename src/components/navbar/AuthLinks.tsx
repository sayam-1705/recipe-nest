"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { getUser, clearAuth } from "@/lib/auth";
import { useQueryClient } from "@tanstack/react-query";

interface AuthLinksProps {
  isMobile?: boolean;
  onNavigate?: () => void;
}

const AuthLinks = ({ isMobile = false, onNavigate }: AuthLinksProps) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const queryClient = useQueryClient();
  const user = getUser();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    clearAuth();
    queryClient.clear();
    window.location.href = "/";
  };

  return (
    <>
      {user ? (
        <>
          <div className="relative" ref={dropdownRef}>
            <button
              className="flex items-center gap-2 sm:gap-3 group relative overflow-hidden"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <span className="hidden sm:block translate-x-[-20px] opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 ease-out text-gray-700 font-medium whitespace-nowrap text-sm sm:text-base">
                {user?.name?.split(" ")[0]}
              </span>
              <div className="relative">
                <span className="bg-orange-400 hover:bg-orange-500 px-2.5 py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-2 rounded-full text-white text-sm sm:text-base md:text-lg font-bold transition-all duration-300 ease-out transform hover:shadow-lg active:scale-95 cursor-pointer select-none flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 md:w-auto md:h-auto">
                  {user?.name?.split(" ")[0]?.charAt(0)?.toUpperCase()}
                </span>
              </div>
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 sm:w-52 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                <Link
                  href="/profile"
                  className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                  onClick={() => {
                    setShowDropdown(false);
                    onNavigate?.();
                  }}
                >
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    Profile
                  </div>
                </Link>
                <Link
                  href="/createRecipe"
                  className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                  onClick={() => {
                    setShowDropdown(false);
                    onNavigate?.();
                  }}
                >
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                    Create Recipe
                  </div>
                </Link>
                <hr className="border-gray-200" />
                <button
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  <div className="flex items-center gap-2">
                    {isLoggingOut ? (
                      <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                      </svg>
                    )}
                    {isLoggingOut ? "Logging out..." : "Logout"}
                  </div>
                </button>
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          <Link
            className="relative border-2 border-secondary-green-light px-2.5 py-1.5 sm:px-3 sm:py-1.5 md:px-4 md:py-2 lg:px-5 lg:py-2 rounded-full font-medium text-secondary-green-light transition-all duration-300 hover:bg-secondary-green-light hover:text-white hover:scale-105 hover:shadow-lg active:scale-95 transform overflow-hidden group text-xs sm:text-sm md:text-base"
            href="/login"
            onClick={onNavigate}
          >
            <span className="relative z-10">Login</span>
            <div className="absolute inset-0 bg-secondary-green-light transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
          </Link>
          {!isMobile && (
            <Link
              className="relative border border-orange-500 px-2.5 py-1.5 sm:px-3 sm:py-1.5 md:px-4 md:py-2 lg:px-5 lg:py-2 rounded-full font-medium bg-gradient-to-r from-orange-500 to-orange-600 text-white transition-all duration-300 hover:from-orange-600 hover:to-orange-700 hover:scale-105 hover:shadow-xl active:scale-95 transform overflow-hidden group text-xs sm:text-sm md:text-base"
              href="/signup"
              onClick={onNavigate}
            >
              <span className="relative z-10">Sign Up</span>
            </Link>
          )}
        </>
      )}
    </>
  );
};

export default AuthLinks;
