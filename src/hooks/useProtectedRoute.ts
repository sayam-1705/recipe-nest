'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated, getUser } from '@/utils/auth';

interface UseProtectedRouteOptions {
  redirectTo?: string;
  redirectDelay?: number;
}

interface User {
  _id?: string;
  id?: string;
  email?: string;
  name?: string;
}

interface AuthState {
  isLoading: boolean;
  isAuthenticated: boolean;
  user: User | null;
}

export const useProtectedRoute = ({
  redirectTo = '/login',
  redirectDelay = 0,
}: UseProtectedRouteOptions = {}): AuthState => {
  const router = useRouter();
  const [authState, setAuthState] = useState<AuthState>({
    isLoading: true,
    isAuthenticated: false,
    user: null,
  });

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const authenticated = isAuthenticated();
        const user = getUser();

        if (!authenticated || !user) {
          // Add delay if specified (useful for better UX)
          if (redirectDelay > 0) {
            setTimeout(() => {
              router.push(redirectTo);
            }, redirectDelay);
          } else {
            router.push(redirectTo);
          }
          
          setAuthState({
            isLoading: false,
            isAuthenticated: false,
            user: null,
          });
          return;
        }

        setAuthState({
          isLoading: false,
          isAuthenticated: true,
          user,
        });
      } catch (error) {
        console.error('Auth check failed:', error);
        setAuthState({
          isLoading: false,
          isAuthenticated: false,
          user: null,
        });
        router.push(redirectTo);
      }
    };

    checkAuth();
  }, [router, redirectTo, redirectDelay]);

  return authState;
};

// Hook specifically for checking if user can access a recipe (owns it)
export const useRecipeOwnership = (recipeUserId?: string) => {
  const [canAccess, setCanAccess] = useState<boolean | null>(null);

  useEffect(() => {
    const checkOwnership = () => {
      const user = getUser();
      if (!user || !recipeUserId) {
        setCanAccess(false);
        return;
      }

      // Check if current user is the owner of the recipe
      setCanAccess(user._id === recipeUserId || user.id === recipeUserId);
    };

    checkOwnership();
  }, [recipeUserId]);

  return canAccess;
};
