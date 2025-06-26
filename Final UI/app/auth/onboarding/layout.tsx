import type React from "react"
import { Logo } from "@/components/logo"

export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-brand-bg-light-gray">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Logo />
        </div>
      </header>
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mt-12">
          {" "}
          {/* Added margin-top to push content below stepper text */}
          {children}
        </div>
      </main>
    </div>
  )
}
