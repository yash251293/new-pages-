"use client";

import React, { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation'; // Corrected import for App Router

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, isLoading, token } = useAuth(); // token can also be checked if preferred
  const router = useRouter();

  useEffect(() => {
    // Wait until initial loading is done and then check for user
    if (!isLoading && !user) {
      // console.log("ProtectedRoute: No user, redirecting to login.");
      router.push('/auth/login');
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    // You can replace this with a more sophisticated loading spinner/component
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading authentication state...</p>
        {/* Example of a simple spinner:
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
        */}
      </div>
    );
  }

  // If there's a user, render the children (the protected content)
  if (user) {
    return <>{children}</>;
  }

  // If not loading and no user, router.push should have been called.
  // Return null or a loading indicator while redirecting to prevent flash of content.
  // Or, if router.push is guaranteed to cause an immediate unmount/rerender,
  // this might not be strictly necessary, but it's safer.
  return (
    <div className="flex items-center justify-center h-screen">
      <p>Redirecting to login...</p>
    </div>
  );
};

export default ProtectedRoute;
