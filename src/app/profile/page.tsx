"use client";

import RecipeCard from "@/components/recipeCard/RecipeCard";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/utils/api";
import { AxiosError } from "axios";

// Recipe Query
const useGetRecipesByUserId = (userId: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: ['recipes', 'byUserId', userId],
    queryFn: async (): Promise<Recipe[]> => {
      const response = await apiClient.get(`/getRecipeByUserId/${userId}`);
      return response.data.recipes;
    },
    enabled: enabled && !!userId,
  });
};

// Custom hook for getting current user data from localStorage
const useCurrentUser = () => {
  return useQuery({
    queryKey: ['auth', 'me'],
    queryFn: () => {
      if (typeof window !== 'undefined') {
        try {
          const userData = localStorage.getItem('user');
          const token = localStorage.getItem('authToken');
          
          // If no token, user is not authenticated
          if (!token) {
            return null;
          }
          
          // If no user data but token exists, clear everything
          if (!userData) {
            localStorage.removeItem('authToken');
            return null;
          }
          
          // Try to parse user data
          return JSON.parse(userData);
        } catch (error) {
          console.error('Error parsing user data from localStorage:', error);
          // Clear corrupted data
          localStorage.removeItem('user');
          localStorage.removeItem('authToken');
          return null;
        }
      }
      return null;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes - allow some staleness but refresh periodically
    retry: false, // Don't retry on error, just return null
  });
};

// User Mutation
const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (email: string): Promise<void> => {
      await apiClient.delete(`/delete/${email}`);
    },
    onSuccess: () => {
      // Clear auth data
      if (typeof window !== 'undefined') {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
      }
      // Clear all queries
      queryClient.clear();
    },
    onError: (error: AxiosError) => {
      console.error('Failed to delete user:', error.response?.data || error.message);
    },
  });
};

const Profile = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Get current user data
  const { data: currentUser } = useCurrentUser();
  const userId = currentUser?.id;

  // Fetch user's recipes
  const {
    data: recipes = [], 
    isLoading: loading, 
    error, 
    isError 
  } = useGetRecipesByUserId(userId, !!userId);

  // Delete user mutation
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
    
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
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
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 p-6">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header Section */}
          <div className="flex items-center justify-between">
            <div className="animate-fade-in-up">
              <div className="text-3xl font-bold text-gray-800 mb-2">
                Hey, {currentUser?.name || 'User'} 👋
              </div>
              <p className="text-gray-600">
                Welcome back to your culinary journey
              </p>
            </div>
            <div className="animate-fade-in-up">
              <button
                className="group relative overflow-hidden bg-gradient-to-r from-gray-600 to-gray-700 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover-lift animate-glow min-w-[200px]"
                onClick={handleLogOut}
              >
                <span className="relative z-10">Sign Out</span>
              </button>
            </div>
          </div>

          {/* Email Input Section */}
          <div className="animate-fade-in delay-100">
            <div className="bg-white rounded-2xl shadow-sm border border-orange-100 p-6 hover-lift">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                className="w-full border-2 border-gray-200 rounded-xl p-4 focus:border-orange-400 focus:ring-0 transition-all duration-300 text-gray-700 placeholder-gray-400"
                type="email"
                name="email"
                placeholder="Enter your email"
                defaultValue={currentUser?.email || ""}
                disabled
              />
            </div>
          </div>

          {/* Recipes Section */}
          <div className="animate-fade-in delay-200">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-800">Your Recipes</h1>
              <div className="text-sm text-gray-500 animate-gentle-float">
                Swipe to explore more
              </div>
            </div>

            <div className="relative">
              {/* Left Arrow */}
              <button
                onClick={scrollLeft}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 backdrop-blur-glass rounded-full shadow-lg p-3 hover:scale-110 transition-all duration-300 opacity-80 hover:opacity-100 hover-lift-subtle"
                aria-label="Previous recipes"
              >
                <svg
                  className="w-6 h-6 text-gray-700"
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

              {/* Recipe Cards Container */}
              <div
                ref={scrollContainerRef}
                className="flex overflow-x-auto scroll-smooth gap-6 py-4 px-2 scrollbar-hide"
              >
                {loading ? (
                  <div className="text-gray-500 text-lg">Loading recipes...</div>
                ) : isError ? (
                  <div className="text-red-500 text-lg">
                    {error instanceof Error ? error.message : "Failed to fetch recipes"}
                  </div>
                ) : recipes.length === 0 ? (
                  <div className="text-gray-500 text-lg">No recipes found.</div>
                ) : (
                  recipes.map((recipe: Recipe, index: number) => (
                    <div
                      key={recipe._id || index}
                      className={`flex-shrink-0 w-80 hover:scale-105 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 animate-scale-in`}
                      style={{
                        animationDelay: `${index * 100}ms`,
                      }}
                    >
                      <RecipeCard isModified={true} recipe={recipe} />
                    </div>
                  ))
                )}
              </div>

              {/* Right Arrow */}
              <button
                onClick={scrollRight}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 backdrop-blur-glass rounded-full shadow-lg p-3 hover:scale-110 transition-all duration-300 opacity-80 hover:opacity-100 hover-lift-subtle"
                aria-label="Next recipes"
              >
                <svg
                  className="w-6 h-6 text-gray-700"
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

          {/* Action Buttons Section */}
          <div className="animate-fade-in delay-300 flex items-center justify-center">
            <button 
              className="group relative overflow-hidden bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover-lift min-w-[200px] disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleDeleteAccount}
              disabled={deleteUserMutation.isPending}
            >
              <span className="relative z-10">
                {deleteUserMutation.isPending ? "Deleting..." : "Delete Account"}
              </span>
            </button>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Profile;
