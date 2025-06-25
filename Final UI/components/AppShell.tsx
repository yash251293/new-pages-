"use client";

import type React from "react";
import { usePathname } from 'next/navigation';
import HeaderWrapper from "@/components/header-wrapper";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { Toaster } from 'sonner';

export default function AppShell({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = usePathname();
  const publicPaths = [
    '/auth/login',
    '/auth/signup',
    '/privacy-policy',
    '/terms',
    // Add other public paths like '/auth/forgot-password' if they exist
  ];
  // Treat onboarding paths as public or semi-public depending on exact auth flow
  // For this example, if user is on any /auth/onboarding path, it's considered public-like access
  // meaning ProtectedRoute won't gate it directly, but individual onboarding pages might have checks.
  const isPublicPath = publicPaths.some(path => pathname.startsWith(path)) || pathname.startsWith('/auth/onboarding');

  // Landing page check - assuming '/' is the main landing page and might have a different layout
  // or should not be wrapped by the general app's ProtectedRoute.
  // This check might need refinement based on actual landing page routes (e.g. /app/(landing)/page.tsx)
  // If your landing page is at `/` and uses a different layout (e.g. `(landing)` group),
  // this specific AppShell might not even wrap it if `RootLayout` is structured carefully with route groups.
  // For now, if it's the absolute root or specific other landing paths, treat as public.
  const isMarketingOrPublicPage = pathname === '/' || pathname.startsWith('/(landing)');


  const pageContent = (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Conditionally render HeaderWrapper:
          - Not on public auth paths (login, signup, onboarding)
          - Not on marketing/landing pages that might have their own distinct header */}
      {!isPublicPath && !isMarketingOrPublicPage && <HeaderWrapper />}
      <main className="flex-1 px-4 py-3">{children}</main>
    </div>
  );

  // If the path is a public auth path (login, signup, onboarding) or a marketing page, render content directly.
  // Otherwise, wrap the content with ProtectedRoute.
  return (
    <>
      {isPublicPath || isMarketingOrPublicPage ? pageContent : <ProtectedRoute>{pageContent}</ProtectedRoute>}
      <Toaster richColors position="top-right" />
    </>
  );
}
