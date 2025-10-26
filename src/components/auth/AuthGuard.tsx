"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

const useCurrentUser = () => {
  return useQuery({
    queryKey: ["auth", "me"],
    queryFn: () => {
      if (typeof window !== "undefined") {
        try {
          const userData = localStorage.getItem("user");
          const token = localStorage.getItem("authToken");

          if (!token) {
            return null;
          }

          if (!userData) {
            localStorage.removeItem("authToken");
            return null;
          }

          return JSON.parse(userData);
        } catch (error) {
          console.error("Error parsing user data from localStorage:", error);
          localStorage.removeItem("user");
          localStorage.removeItem("authToken");
          return null;
        }
      }
      return null;
    },
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
};

const AuthGuard: React.FC<{
  children: React.ReactNode;
  fallback?: React.ReactNode;
  requireAuth?: boolean;
}> = ({ children, fallback = null, requireAuth = true }) => {
  const { data: user, isLoading } = useCurrentUser();
  const router = useRouter();

  if (isLoading) {
    return (
      fallback || (
        <div className="flex items-center justify-center p-4">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-orange-500"></div>
        </div>
      )
    );
  }

  if (requireAuth && !user) {
    return (
      fallback || (
        <div className="text-center p-4">
          <p className="text-gray-600 mb-4">
            Please log in to view this content.
          </p>
          <button
            onClick={() => router.push("/login")}
            className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
          >
            Login
          </button>
        </div>
      )
    );
  }

  return <>{children}</>;
};

export default AuthGuard;
