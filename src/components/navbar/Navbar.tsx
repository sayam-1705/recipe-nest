"use client";

import Link from "next/link";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import NavLink from "./NavLink";
import AuthLinks from "./AuthLinks";
import MobileNavLink from "./MobileNavLink";

const useCurrentUser = () => {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: () => {
      try {
        if (typeof window !== "undefined") {
          const userData = localStorage.getItem("user");

          if (!userData) {
            return null;
          }

          return JSON.parse(userData);
        }
      } catch (error) {
        console.error("Error parsing user data from localStorage:", error);
        localStorage.removeItem("user");
        return null;
      }
    },
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
};

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { data: user } = useCurrentUser();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="relative flex justify-between items-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-14 py-3 sm:py-4 md:py-5 bg-neutral-white shadow-sm transition-all duration-500 hover:shadow-md z-50">
        <Link
          className="flex items-center group transition-all duration-300 hover:scale-105 animate-gentle-float z-60"
          href="/"
          onClick={closeMobileMenu}
        >
          <svg
            className="transition-transform duration-500 fill-primary-orange group-hover:rotate-12 w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-12 lg:h-12"
            xmlns="http://www.w3.org/2000/svg"
            height="50px"
            viewBox="0 -960 960 960"
            width="50px"
          >
            <path d="M366.67-406h66.66v-188.67h-66.66V-406Zm-160-53.33q-48-23.67-77.34-68.17Q100-572 100-625q0-73.32 50.83-124.16Q201.67-800 274.94-800q11.73 0 23.55 1.81 11.83 1.81 23.18 4.52l5.33 1.34 2.67-4.67q23.66-40.33 63.66-61.67Q433.33-880 480-880t86.67 21.33q40 21.34 63.66 61.67l2.67 4.67 5.33-1.34q11.34-3 22.98-4.66 11.64-1.67 24.26-1.67 72.76 0 123.6 50.84Q860-698.32 860-625q0 53-29.33 97.5-29.34 44.5-77.34 68.17v216.66H206.67v-216.66Zm320 53.33h66.66v-188.67h-66.66V-406Zm-253.34 96h413.34v-190.33L728-521q30-15 48.33-42.5 18.34-27.5 18.34-60.5 0-46-33.5-77t-79.84-31q-9.66 0-18.66 1.67-9 1.66-18.34 4l-41.66 11.66-29-48q-15.34-25-40.16-37.83-24.82-12.83-53.5-12.83T426.5-800.5q-24.83 12.83-40.17 37.83l-29 48-42.66-11.66q-9.34-2-18.4-3.84-9.06-1.83-18.6-1.83-46.34 0-79.34 31.33-33 31.34-33 77.34 0 33 18.34 60.83Q202-534.67 232-520.33l41.33 20V-310Zm-66.66 67.33h66.66v96h413.34v-96h66.66V-80H206.67v-162.67ZM480-310Z" />
          </svg>
          <span className="font-bold text-base sm:text-lg md:text-xl lg:text-2xl text-secondary-green-dark ml-1 sm:ml-2 transition-all duration-500 group-hover:text-primary-orange shimmer-text">
            RecipeNest
          </span>
        </Link>

        <div className="hidden lg:flex gap-5 xl:gap-7 text-base lg:text-lg font-medium">
          <NavLink href="#home">Home</NavLink>
          <NavLink href="#how-it-works">How it works</NavLink>
          <NavLink href="#menu">Menu</NavLink>
          <NavLink href="#about">About</NavLink>
          <NavLink href="#contact">Contact</NavLink>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-orange z-60"
            aria-label="Toggle mobile menu"
          >
            <div className="space-y-1.5">
              <span className="block w-6 h-0.5 bg-gray-600"></span>
              <span className="block w-6 h-0.5 bg-gray-600"></span>
              <span className="block w-6 h-0.5 bg-gray-600"></span>
            </div>
          </button>

          <div className="relative z-50 flex gap-2 sm:gap-3 md:gap-4 font-medium text-xs sm:text-sm md:text-base animate-fade-in-up delay-800">
            <AuthLinks isMobile={true} />
          </div>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-40 lg:hidden"
          onClick={closeMobileMenu}
        />
      )}

      <div
        className={`fixed top-0 left-0 h-full w-72 sm:w-80 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 lg:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-100">
          <Link
            className="flex items-center group transition-all duration-300"
            href="/"
            onClick={closeMobileMenu}
          >
            <svg
              className="transition-transform duration-500 fill-primary-orange group-hover:rotate-12 w-8 h-8"
              xmlns="http://www.w3.org/2000/svg"
              height="50px"
              viewBox="0 -960 960 960"
              width="50px"
            >
              <path d="M366.67-406h66.66v-188.67h-66.66V-406Zm-160-53.33q-48-23.67-77.34-68.17Q100-572 100-625q0-73.32 50.83-124.16Q201.67-800 274.94-800q11.73 0 23.55 1.81 11.83 1.81 23.18 4.52l5.33 1.34 2.67-4.67q23.66-40.33 63.66-61.67Q433.33-880 480-880t86.67 21.33q40 21.34 63.66 61.67l2.67 4.67 5.33-1.34q11.34-3 22.98-4.66 11.64-1.67 24.26-1.67 72.76 0 123.6 50.84Q860-698.32 860-625q0 53-29.33 97.5-29.34 44.5-77.34 68.17v216.66H206.67v-216.66Zm320 53.33h66.66v-188.67h-66.66V-406Zm-253.34 96h413.34v-190.33L728-521q30-15 48.33-42.5 18.34-27.5 18.34-60.5 0-46-33.5-77t-79.84-31q-9.66 0-18.66 1.67-9 1.66-18.34 4l-41.66 11.66-29-48q-15.34-25-40.16-37.83-24.82-12.83-53.5-12.83T426.5-800.5q-24.83 12.83-40.17 37.83l-29 48-42.66-11.66q-9.34-2-18.4-3.84-9.06-1.83-18.6-1.83-46.34 0-79.34 31.33-33 31.34-33 77.34 0 33 18.34 60.83Q202-534.67 232-520.33l41.33 20V-310Zm-66.66 67.33h66.66v96h413.34v-96h66.66V-80H206.67v-162.67ZM480-310Z" />
            </svg>
            <span className="font-bold text-lg text-secondary-green-dark ml-2 group-hover:text-primary-orange transition-colors duration-300">
              RecipeNest
            </span>
          </Link>

          <button
            onClick={closeMobileMenu}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-orange"
            aria-label="Close mobile menu"
          >
            <svg
              className="w-6 h-6 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="flex flex-col p-4 sm:p-6 space-y-1">
          <MobileNavLink href="#home" onClick={closeMobileMenu}>
            🏠 Home
          </MobileNavLink>
          <MobileNavLink href="#how-it-works" onClick={closeMobileMenu}>
            ⚙️ How it works
          </MobileNavLink>
          <MobileNavLink href="#menu" onClick={closeMobileMenu}>
            🍽️ Menu
          </MobileNavLink>
          <MobileNavLink href="#about" onClick={closeMobileMenu}>
            👥 About
          </MobileNavLink>
          <MobileNavLink href="#contact" onClick={closeMobileMenu}>
            📞 Contact
          </MobileNavLink>

          {!user && (
            <>
              <div className="border-t border-gray-200 my-4"></div>
              <Link
                href="/signup"
                onClick={closeMobileMenu}
                className="flex items-center justify-center px-4 py-3 text-white bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 rounded-lg transition-all duration-200 font-medium text-base"
              >
                📝 Sign Up
              </Link>
            </>
          )}
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 border-t border-gray-100">
          <p className="text-xs text-gray-500 text-center">
            © 2025 RecipeNest. All rights reserved.
          </p>
        </div>
      </div>
    </>
  );
};

export default Navbar;
