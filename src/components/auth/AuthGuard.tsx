'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from "@tanstack/react-query";

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

const AuthGuard: React.FC<AuthGuardProps> = ({ 
  children, 
  fallback = null,
  requireAuth = true 
}) => {
  const { data: user, isLoading } = useCurrentUser();
  const router = useRouter();

  // If loading, show loading or fallback
  if (isLoading) {
    return fallback || (
      <div className="flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  // If authentication is required and user is not authenticated
  if (requireAuth && !user) {
    return fallback || (
      <div className="text-center p-4">
        <p className="text-gray-600 mb-4">Please log in to view this content.</p>
        <button
          onClick={() => router.push('/login')}
          className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
        >
          Login
        </button>
      </div>
    );
  }

  // If no authentication required or user is authenticated
  return <>{children}</>;
};

export default AuthGuard;
