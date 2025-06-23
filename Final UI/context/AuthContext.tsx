"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { getCurrentUser } from '@/lib/api'; // Import the API function

// UserProfile interface based on the user_profiles table and GET /api/users/me response
interface UserProfile {
  location?: string | null;
  professional_title?: string | null;
  years_of_experience?: string | null;
  job_function?: string | null;
  key_skills?: string | null;
  education_level?: string | null;
  field_of_study?: string | null;
  institution?: string | null;
  linkedin_url?: string | null;
  website_url?: string | null;
  bio?: string | null;
  company_type?: string | null;
  tech_stack?: string | null;
  profile_created_at?: string | null;
  profile_updated_at?: string | null;
}

// Updated User interface to match the backend's GET /api/users/me response
interface User {
  id: string | number; // Assuming user.id from backend is number (SERIAL in users, but UUID was considered) - check consistency
  email: string;
  user_type: 'individual' | 'company';
  full_name?: string | null;
  company_name?: string | null;
  industry?: string | null;
  company_size?: string | null;
  user_created_at?: string | null; // Alias for users.created_at
  user_updated_at?: string | null; // Alias for users.updated_at
  profile?: UserProfile | null; // Nested profile data
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (newToken: string, userData: User) => void;
  logout: () => void;
  setIsLoading: (loading: boolean) => void;
  refetchUser: () => Promise<void>; // New function
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true); // Start true for initial auth check

  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = localStorage.getItem('authToken');
      if (storedToken) {
        try {
          // console.log("Found token, attempting to get current user:", storedToken);
          // Pass the token to getCurrentUser
          const userData = await getCurrentUser(storedToken);
          if (userData) {
            // console.log("User data received:", userData);
            // The login function will set user, token, localStorage, and isLoading to false
            login(storedToken, userData);
          } else {
            // This case might indicate an issue with getCurrentUser response or token validity not caught by API error
            // console.log("No user data received, logging out.");
            logout(); // Clears token from localStorage and context, sets isLoading to false
          }
        } catch (error) {
          // console.error("Failed to fetch user with stored token:", error);
          logout(); // Token is invalid or expired, or API error
        }
      } else {
        // console.log("No token found in localStorage.");
        setIsLoading(false); // No token, so not loading user data
      }
    };

    initializeAuth();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array ensures this runs only once on mount

  const refetchUser = async () => {
    if (!token) {
      // console.log("refetchUser: No token, cannot refetch.");
      return;
    }
    setIsLoading(true);
    try {
      // console.log("refetchUser: Attempting to get current user with token:", token);
      const userData = await getCurrentUser(token);
      if (userData) {
        // console.log("refetchUser: User data received:", userData);
        setUser(userData);
      } else {
        // console.log("refetchUser: No user data received from API, logging out.");
        logout();
      }
    } catch (error) {
      // console.error("refetchUser: Failed to fetch user:", error);
      logout();
    } finally {
      setIsLoading(false);
    }
  };

  const login = (newToken: string, userData: User) => {
    // console.log("AuthContext: login called", { newToken, userData });
    localStorage.setItem('authToken', newToken);
    setToken(newToken);
    setUser(userData);
    setIsLoading(false);
  };

  const logout = () => {
    // console.log("AuthContext: logout called");
    localStorage.removeItem('authToken');
    setToken(null);
    setUser(null);
    setIsLoading(false);
    // Optional: redirect to login or home page.
    // This is often better handled by routing logic consuming the context.
  };

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, logout, setIsLoading, refetchUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
