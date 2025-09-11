'use client';

import React from 'react';
import { useCurrentUser } from '@/queries';
import { useRouter } from 'next/navigation';

interface AuthGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  requireAuth?: boolean;
}

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
