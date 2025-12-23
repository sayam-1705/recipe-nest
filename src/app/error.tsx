"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center glassmorphism-dark relative overflow-hidden">
      {/* Animated gradient orbs */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-gradient-to-br from-neon-pink/10 to-red-600/10 rounded-full blur-3xl animate-float-3d pointer-events-none"></div>
      <div className="absolute bottom-20 left-10 w-64 h-64 bg-gradient-to-br from-neon-blue/10 to-neon-purple/10 rounded-full blur-3xl animate-float-3d delay-500 pointer-events-none"></div>
      
      <div className="max-w-md text-center p-8 relative z-10">
        <div className="mb-6">
          <svg
            className="mx-auto h-16 w-16 text-neon-pink animate-neon-pulse"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-white mb-4 bg-gradient-to-r from-neon-pink to-neon-purple bg-clip-text text-transparent">
          Something went wrong!
        </h2>
        <p className="text-gray-300 mb-6">
          We apologize for the inconvenience. Please try again.
        </p>
        <div className="space-y-4">
          <button
            onClick={reset}
            className="w-full bg-gradient-to-r from-neon-blue to-neon-purple hover:from-neon-purple hover:to-neon-pink text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(0,240,255,0.6)] neon-border"
          >
            Try again
          </button>
          <Link
            href="/"
            className="block w-full glassmorphism border border-neon-blue/40 hover:border-neon-purple/60 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(0,240,255,0.4)]"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}
