"use client";

import RecipeCard from "@/components/recipeCard/RecipeCard";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/utils/api";
import { AxiosError } from "axios";

const useGetRecipesByUserId = (userId: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: ["recipes", "byUserId", userId],
    queryFn: async (): Promise<Recipe[]> => {
      const response = await apiClient.get(`/getRecipeByUserId/${userId}`);
      return response.data.recipes;
    },
    enabled: enabled && !!userId,
  });
};

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

const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (email: string): Promise<void> => {
      await apiClient.delete(`/delete/${email}`);
    },
    onSuccess: () => {
      if (typeof window !== "undefined") {
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
      }
      queryClient.clear();
    },
    onError: (error: AxiosError) => {
      console.error(
        "Failed to delete user:",
        error.response?.data || error.message
      );
    },
  });
};

const Profile = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const { data: currentUser } = useCurrentUser();
  const userId = currentUser?.id;

  const {
    data: recipes = [],
    isLoading: loading,
    error,
    isError,
  } = useGetRecipesByUserId(userId, !!userId);

  const deleteUserMutation = useDeleteUser();

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  const handleLogOut = () => {
    localStorage.clear();
    window.location.replace("/");
  };

  const handleDeleteAccount = async () => {
    if (!currentUser?.email) return;

    if (
      window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      try {
        await deleteUserMutation.mutateAsync(currentUser.email);
        window.location.replace("/");
      } catch (error) {
        console.error("Failed to delete account:", error);
        alert("Failed to delete account. Please try again.");
      }
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-0">
            <div className="animate-fade-in-up">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-1 sm:mb-2">
                Hey, {currentUser?.name || "User"} 👋
              </div>
              <p className="text-sm sm:text-base text-gray-600">
                Welcome back to your culinary journey
              </p>
            </div>
            <div className="animate-fade-in-up">
              <button
                className="group relative overflow-hidden bg-gradient-to-r from-gray-600 to-gray-700 text-white font-semibold px-4 sm:px-6 md:px-8 py-3 sm:py-4 rounded-xl shadow-lg hover-lift animate-glow w-full sm:w-auto sm:min-w-[160px] md:min-w-[200px] text-sm sm:text-base"
                onClick={handleLogOut}
              >
                <span className="relative z-10">Sign Out</span>
              </button>
            </div>
          </div>

          <div className="animate-fade-in delay-100">
            <div className="bg-white rounded-2xl shadow-sm border border-orange-100 p-4 sm:p-6 hover-lift">
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                className="w-full border-2 border-gray-200 rounded-xl p-3 sm:p-4 focus:border-orange-400 focus:ring-0 transition-all duration-300 text-sm sm:text-base text-gray-700 placeholder-gray-400"
                type="email"
                name="email"
                placeholder="Enter your email"
                defaultValue={currentUser?.email || ""}
                disabled
              />
            </div>
          </div>

          <div className="animate-fade-in delay-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-2 sm:gap-0">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800">Your Recipes</h1>
              <div className="text-xs sm:text-sm text-gray-500 animate-gentle-float">
                Swipe to explore more
              </div>
            </div>

            <div className="relative">
              <button
                onClick={scrollLeft}
                className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 z-20 backdrop-blur-glass rounded-full shadow-lg p-2 sm:p-3 hover:scale-110 transition-all duration-300 opacity-80 hover:opacity-100 hover-lift-subtle"
                aria-label="Previous recipes"
              >
                <svg
                  className="w-4 h-4 sm:w-6 sm:h-6 text-gray-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              <div
                ref={scrollContainerRef}
                className="flex overflow-x-auto scroll-smooth gap-3 sm:gap-4 md:gap-6 py-4 px-12 sm:px-16 md:px-20 lg:px-24 scrollbar-hide"
              >
                {loading ? (
                  <div className="text-gray-500 text-sm sm:text-base md:text-lg flex-shrink-0">
                    Loading recipes...
                  </div>
                ) : isError ? (
                  <div className="text-red-500 text-sm sm:text-base md:text-lg flex-shrink-0 max-w-xs sm:max-w-sm">
                    {error instanceof Error
                      ? error.message
                      : "Failed to fetch recipes"}
                  </div>
                ) : recipes.length === 0 ? (
                  <div className="text-gray-500 text-sm sm:text-base md:text-lg flex-shrink-0">No recipes found.</div>
                ) : (
                  recipes.map((recipe: Recipe, index: number) => (
                    <div
                      key={recipe._id || index}
                      className={`flex-shrink-0 w-64 sm:w-72 md:w-80 hover:scale-105 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 animate-scale-in`}
                      style={{
                        animationDelay: `${index * 100}ms`,
                      }}
                    >
                      <RecipeCard isModified={true} recipe={recipe} />
                    </div>
                  ))
                )}
              </div>

              <button
                onClick={scrollRight}
                className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 z-20 backdrop-blur-glass rounded-full shadow-lg p-2 sm:p-3 hover:scale-110 transition-all duration-300 opacity-80 hover:opacity-100 hover-lift-subtle"
                aria-label="Next recipes"
              >
                <svg
                  className="w-4 h-4 sm:w-6 sm:h-6 text-gray-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="animate-fade-in delay-300 flex items-center justify-center px-4">
            <button
              className="group relative overflow-hidden bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold px-4 sm:px-6 md:px-8 py-3 sm:py-4 rounded-xl shadow-lg hover-lift w-full sm:w-auto sm:min-w-[160px] md:min-w-[200px] text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleDeleteAccount}
              disabled={deleteUserMutation.isPending}
            >
              <span className="relative z-10">
                {deleteUserMutation.isPending
                  ? "Deleting..."
                  : "Delete Account"}
              </span>
            </button>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Profile;
