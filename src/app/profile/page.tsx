"use client";

import RecipeCard from "@/components/recipes/RecipeCard";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import AlertDialog from "@/components/common/AlertDialog";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { clearAuth, getUser, getAuthToken } from "@/lib/auth";

const Profile = () => {
  const router = useRouter();

  const queryClient = useQueryClient();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const currentUser = getUser();
  const userId = currentUser?.id;

  const {
    data: recipes = [],
    isLoading,
  } = useQuery({
    queryKey: ["recipes", "byUserId", userId],
    queryFn: async (): Promise<Recipe[]> => {
      const response = await fetch(`/api/getRecipeByUserId/${userId}`, {
        cache: "no-store",
      });
      if (!response.ok) throw new Error("Failed to fetch recipes");
      const data = await response.json();
      return data.recipes;
    },
    enabled: !!userId,
    staleTime: 0,
    gcTime: 0,
  });

  const deleteUserMutation = useMutation({
    mutationFn: async (email: string) => {
      const token = getAuthToken();
      if (!token)
        throw new Error("Authentication token expired. Please log in again.");

      const response = await fetch(`/api/delete/${email}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error("Failed to delete user");
    },
    onSuccess: () => {
      clearAuth();
      queryClient.clear();
      window.location.replace("/");
    },
    onError: (error) => {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Failed to delete account. Please try again."
      );
      setShowErrorAlert(true);
    },
  });

  const handleLogOut = () => {
    clearAuth();
    window.location.replace("/");
  };

  const handleDeleteAccount = async () => {
    setShowDeleteConfirm(false);
    if (currentUser?.email) {
      await deleteUserMutation.mutateAsync(currentUser.email);
    }
  };

  return (
    <ProtectedRoute>
      <div className="relative min-h-screen bg-background-light dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-500 overflow-x-hidden">
        {/* Background Blobs */}
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[-10%] left-[-5%] w-[45vw] h-[45vw] bg-orange-100/50 rounded-full blur-[100px] dark:bg-orange-950/20"></div>
          <div className="absolute bottom-[-10%] right-[-5%] w-[40vw] h-[40vw] bg-blue-100/50 rounded-full blur-[90px] dark:bg-indigo-950/20"></div>
        </div>

        <div className="relative z-10 pt-28 pb-32 px-4 sm:px-6 lg:px-12 max-w-[1400px] mx-auto">
          {/* Profile Header */}
          <div className="text-center mb-16">
            <span className="inline-block py-1.5 px-4 rounded-full bg-primary-stitch/10 text-primary-stitch text-xs font-bold uppercase tracking-widest border border-primary-stitch/20 mb-6 transition-all animate-fade-in text-[10px]">
              User Dashboard
            </span>
            <h1 className="text-4xl lg:text-6xl font-black text-slate-900 dark:text-white mb-4 tracking-tight leading-tight">
              Hey, {currentUser?.name || "Chef"} 👋
            </h1>
            <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed">
              Manage your culinary creations and update your profile preferences here.
            </p>
          </div>

          {/* Profile Card Section */}
          <div className="glass-panel rounded-[2.5rem] p-8 lg:p-12 mb-20 flex flex-col lg:flex-row items-center justify-between gap-12 relative overflow-hidden shadow-2xl shadow-primary-stitch/5">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary-stitch/5 rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="flex flex-col lg:flex-row items-center gap-10 text-center lg:text-left z-10 w-full lg:w-auto">
              {/* Avatar */}
              <div className="relative">
                <div className="h-40 w-40 rounded-full bg-gradient-to-br from-primary-stitch to-orange-600 p-1 shadow-2xl shadow-primary-stitch/20 ring-4 ring-white dark:ring-slate-800">
                  <div className="w-full h-full rounded-full bg-white dark:bg-slate-800 flex items-center justify-center overflow-hidden">
                    <span className="text-5xl font-bold bg-gradient-to-br from-primary-stitch to-orange-600 bg-clip-text text-transparent">
                      {(currentUser?.name || "C").charAt(0).toUpperCase()}
                    </span>
                  </div>
                </div>
                <div className="absolute bottom-4 right-4 w-6 h-6 bg-green-500 border-4 border-white dark:border-slate-800 rounded-full shadow-sm"></div>
              </div>

              {/* User Info */}
              <div className="flex flex-col">
                <div className="flex items-center justify-center lg:justify-start gap-3 mb-2">
                  <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                    {currentUser?.name}
                  </h2>
                  <span className="material-symbols-outlined text-blue-500 text-2xl" title="Verified Chef">
                    verified
                  </span>
                </div>
                <p className="text-slate-500 dark:text-slate-400 font-medium text-lg mb-6">
                  {currentUser?.email}
                </p>
                
                {/* Stats Grid */}
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-10">
                  <div className="text-center lg:text-left">
                    <div className="text-3xl font-black text-slate-900 dark:text-white">{recipes.length}</div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-1">Recipes</div>
                  </div>
                  <div className="w-px h-10 bg-slate-200 dark:bg-slate-700 hidden sm:block"></div>
                  <div className="text-center lg:text-left">
                    <div className="text-3xl font-black text-slate-900 dark:text-white">45</div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-1">Followers</div>
                  </div>
                  <div className="w-px h-10 bg-slate-200 dark:bg-slate-700 hidden sm:block"></div>
                  <div className="text-center lg:text-left">
                    <div className="text-3xl font-black text-slate-900 dark:text-white">128</div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-1">Following</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-4 w-full lg:w-64 z-10">
              <button
                className="w-full px-8 py-4 rounded-2xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-black transition-all hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center justify-center gap-3 border border-slate-200 dark:border-white/5 active:scale-95 duration-200"
              >
                <span className="material-symbols-outlined">settings</span>
                Account Settings
              </button>
              <button
                onClick={handleLogOut}
                className="w-full px-8 py-4 rounded-2xl bg-slate-900 dark:bg-primary-stitch text-white font-black shadow-lg shadow-primary-stitch/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 duration-200"
              >
                <span className="material-symbols-outlined">logout</span>
                Sign Out
              </button>
            </div>
          </div>

          {/* Recipes Section */}
          <section>
            <div className="flex items-end justify-between mb-10 pb-6 border-b border-slate-200 dark:border-white/10">
              <div>
                <h2 className="text-3xl font-black text-slate-900 dark:text-white">Your Recipes</h2>
                <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">
                  {isLoading ? "Fetching your curated recipes..." : `Managing ${recipes.length} curated recipe cards`}
                </p>
              </div>
              <button 
                onClick={() => router.push("/createRecipe")}
                className="flex items-center gap-2 text-primary-stitch font-black hover:gap-3 transition-all text-sm uppercase tracking-wider"
              >
                Create New <span className="material-symbols-outlined">add_circle</span>
              </button>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="glass-card h-[450px] rounded-[2.5rem] animate-pulse"></div>
                ))}
              </div>
            ) : recipes.length === 0 ? (
              <div className="col-span-full py-20 text-center glass-card rounded-[2.5rem]">
                <span className="material-symbols-outlined text-6xl text-slate-300 dark:text-slate-700 mb-6 block">
                  soup_kitchen
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-3 px-4">
                  No recipes yet
                </h3>
                <p className="text-sm sm:text-base text-slate-500 max-w-xs mx-auto mb-8 px-4">
                  You haven&apos;t created any recipes yet. Start sharing your culinary magic today!
                </p>
                <button
                  onClick={() => router.push("/createRecipe")}
                  className="px-8 py-3 bg-primary-stitch text-white font-bold rounded-xl shadow-lg shadow-primary-stitch/20 hover:scale-105 active:scale-95 transition-all"
                >
                  Create Your First Recipe
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {recipes.map((recipe: Recipe) => (
                  <RecipeCard key={recipe._id} recipe={recipe} />
                ))}
              </div>
            )}
          </section>

          {/* Delete Account Section */}
          <footer className="mt-32 text-center pb-20">
            <div className="h-px w-full max-w-4xl mx-auto bg-gradient-to-r from-transparent via-slate-200 dark:via-white/10 to-transparent mb-16"></div>
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="group relative px-10 py-4 rounded-full border border-rose-200 dark:border-rose-900/30 text-rose-500 hover:text-white hover:bg-rose-500 transition-all duration-300 font-bold overflow-hidden shadow-sm hover:shadow-rose-500/30 active:scale-90"
            >
              <span className="relative z-10 flex items-center justify-center gap-2 text-sm uppercase tracking-[0.2em]">
                <span className="material-symbols-outlined">delete_forever</span>
                Delete Account
              </span>
            </button>
            
            <div className="mt-16 space-y-2">
              <p className="text-[10px] text-slate-400 font-black tracking-[0.3em] uppercase">
                RecipeNest © 2024 Premium Culinary Network
              </p>
              <div className="flex justify-center gap-6 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                <span className="hover:text-primary-stitch cursor-pointer transition-colors">Privacy</span>
                <span className="hover:text-primary-stitch cursor-pointer transition-colors">Terms</span>
                <span className="hover:text-primary-stitch cursor-pointer transition-colors">Support</span>
              </div>
            </div>
          </footer>
        </div>

        <ConfirmDialog
          isOpen={showDeleteConfirm}
          onCancel={() => setShowDeleteConfirm(false)}
          onConfirm={handleDeleteAccount}
          title="Delete Account"
          message="Are you sure you want to delete your account? This action cannot be undone and all your recipes will be permanently removed."
          type="danger"
          confirmText={deleteUserMutation.isPending ? "Deleting..." : "Delete Account"}
        />

        <AlertDialog
          isOpen={showErrorAlert}
          onClose={() => setShowErrorAlert(false)}
          title="Error"
          message={errorMessage}
          type="error"
        />
      </div>
    </ProtectedRoute>
  );
};

export default Profile;
