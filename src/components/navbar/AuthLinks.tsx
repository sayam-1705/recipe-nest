"use client";

import { getUser, isAuthenticated } from "@/utils/auth";
import Link from "next/link";

const AuthLinks = () => {
  const user = isAuthenticated() ? getUser() : null;

  return (
    <>
      {isAuthenticated() ? (
        <>
          <Link
            className="flex items-center gap-3 group relative overflow-hidden"
            href="/profile"
          >
            <span className="translate-x-[-20px] opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 ease-out text-gray-700 font-medium whitespace-nowrap">
              {user?.name.split(" ")[0]}
            </span>
            <div className="relative">
              <span className="bg-orange-400 hover:bg-orange-500 px-4 py-2 rounded-full text-white text-lg font-bold transition-all duration-300 ease-out transform  hover:shadow-lg active:scale-95 cursor-pointer select-none inline-block text-center">
                {user?.name.split(" ")[0]?.charAt(0)?.toUpperCase()}
              </span>
            </div>
          </Link>
        </>
      ) : (
        <>
          <Link
            className="relative border-2 border-secondary-green-light px-5 py-2 rounded-full font-medium text-secondary-green-light transition-all duration-300 hover:bg-secondary-green-light hover:text-white hover:scale-105 hover:shadow-lg active:scale-95 transform overflow-hidden group"
            href="/login"
          >
            <span className="relative z-10">Login</span>
            <div className="absolute inset-0 bg-secondary-green-light transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
          </Link>
          <Link
            className="relative border border-orange-500 px-5 py-2 rounded-full font-medium bg-gradient-to-r from-orange-500 to-orange-600 text-white transition-all duration-300 hover:from-orange-600 hover:to-orange-700 hover:scale-105 hover:shadow-xl active:scale-95 transform overflow-hidden group"
            href="/signup"
          >
            <span className="relative z-10">Sign Up</span>
          </Link>
        </>
      )}
    </>
  );
};

export default AuthLinks;
