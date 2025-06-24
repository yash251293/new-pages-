"use client";

import type React from "react";
import { usePathname } from 'next/navigation';
import HeaderWrapper from "@/components/header-wrapper";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { Toaster } from 'sonner';
import { useState, useEffect } from 'react'; // Import useState and useEffect

export default function AppShell({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = usePathname(); // Can be null during SSR when used in a Client Component rendered by a Server Component
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    // Fallback rendering for SSR/prerender or before client hydration
    // This ensures pathname-dependent logic doesn't run with a potentially null pathname on server
    return (
      <>
        <div className="flex flex-col min-h-screen bg-background">
          {/* Minimal or no header during SSR to avoid pathname issues */}
          <main className="flex-1 px-4 py-3">{children}</main>
        </div>
        <Toaster richColors position="top-right" />
      </>
    );
  }

  // Client-side only logic from here, pathname is reliable
  const publicPaths = [
    '/auth/login',
    '/auth/signup',
    // Add other public paths like '/auth/forgot-password' if they exist
  ];
  // pathname could still be null if navigation hasn't fully initialized, use optional chaining
  const isPublicPath = publicPaths.some(path => pathname?.startsWith(path)) || pathname?.startsWith('/auth/onboarding');

  const isMarketingOrPublicPage = pathname === '/' || pathname?.startsWith('/(landing)');

  const pageContent = (
    <div className="flex flex-col min-h-screen bg-background">
      {!isPublicPath && !isMarketingOrPublicPage && <HeaderWrapper />}
      <main className="flex-1 px-4 py-3">{children}</main>
    </div>
  );

  return (
    <>
      {isPublicPath || isMarketingOrPublicPage ? pageContent : <ProtectedRoute>{pageContent}</ProtectedRoute>}
      <Toaster richColors position="top-right" />
    </>
  );
}
