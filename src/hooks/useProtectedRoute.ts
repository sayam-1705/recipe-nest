"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated, getUser } from "@/utils/auth";

export const useProtectedRoute = ({
  redirectTo = "/login",
  redirectDelay = 0,
}: UseProtectedRouteOptions = {}): AuthState => {
  const router = useRouter();
  const [authState, setAuthState] = useState<AuthState>({
    isLoading: true,
    isAuthenticated: false,
    user: null,
  });

  useEffect(() => {
    const authenticated = isAuthenticated();
    const user = getUser();

    const isValid = authenticated && !!user;

    if (!isValid) {
      const redirect = () => router.push(redirectTo);
      if (redirectDelay > 0) {
        setTimeout(redirect, redirectDelay);
      } else {
        redirect();
      }
    }

    setAuthState({
      isLoading: false,
      isAuthenticated: isValid,
      user: isValid ? user : null,
    });
  }, [router, redirectTo, redirectDelay]);

  return authState;
};

export const useRecipeOwnership = (recipeUserId?: string) => {
  const [canAccess, setCanAccess] = useState<boolean | null>(null);

  useEffect(() => {
    const user = getUser();
    const hasAccess =
      user &&
      recipeUserId &&
      (user._id === recipeUserId || user.id === recipeUserId);

    setCanAccess(!!hasAccess);
  }, [recipeUserId]);

  return canAccess;
};
