"use client"

import { Button } from "@/components/ui/button"
import { UploadCloudIcon } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { OnboardingStepperWrapper } from "@/components/onboarding-stepper-wrapper"

export default function ResumePage() {
  const searchParams = useSearchParams()
  const userType = searchParams.get('type') || 'individual'

  return (
    <div className="min-h-screen bg-brand-bg-light-gray py-4 sm:py-8 px-4">
      <OnboardingStepperWrapper />
      <div className="max-w-2xl mx-auto bg-white p-4 sm:p-6 lg:p-8 rounded-lg shadow-md text-center relative">
        <Button
          className="absolute top-2 left-2 sm:top-4 sm:left-4 border-2 border-primary-navy bg-transparent text-primary-navy hover:bg-primary-navy hover:text-white focus:bg-primary-navy focus:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-navy rounded-xl font-subheading text-sm sm:text-base px-3 sm:px-4 py-1 sm:py-2"
          asChild
        >
          <Link href="/dashboard">Skip to Explore</Link>
        </Button>

        <Button
          className="absolute top-2 right-2 sm:top-4 sm:right-4 border-2 border-primary-navy bg-transparent text-primary-navy hover:bg-primary-navy hover:text-white focus:bg-primary-navy focus:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-navy rounded-xl font-subheading text-sm sm:text-base px-3 sm:px-4 py-1 sm:py-2"
          asChild
        >
          <Link href={`/onboarding/done?type=${userType}`}>Skip</Link>
        </Button>

        <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-brand-text-dark mb-2 sm:mb-3 lg:mb-4 mt-8 sm:mt-4 px-20 sm:px-28">Upload your resume, CV, or portfolio</h1>
        <p className="text-sm sm:text-base text-brand-text-medium mb-6 sm:mb-8 px-2 sm:px-0">
          Showcase your work by uploading a resume, CV, or portfolio to complete your profile.
        </p>

        <div className="text-center mt-12 sm:mt-16 mb-6 sm:mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-black to-gray-800 rounded-2xl shadow-lg mb-4 sm:mb-6">
            <UploadCloudIcon className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          </div>
        </div>

        <div className="border-2 border-dashed border-brand-border rounded-lg p-6 sm:p-10 lg:p-16 mb-4 sm:mb-6">
          <p className="text-xs sm:text-sm text-brand-text-medium mb-3 sm:mb-4 px-2 sm:px-0 leading-relaxed">
            Upload your resume, CV, or portfolio as a .pdf, .doc, .docx, .rtf, .wp or .txt file
          </p>
          <Button className="bg-black hover:bg-gray-900 text-white font-medium text-xs sm:text-sm px-4 sm:px-6 py-2 sm:py-3 min-h-[40px] sm:min-h-[44px]">
            Upload File
          </Button>
        </div>

        <Button
          className="w-full bg-black hover:bg-gray-900 text-white font-medium text-sm sm:text-base px-4 sm:px-6 py-3 sm:py-4 min-h-[44px] sm:min-h-[48px] rounded-lg"
          asChild
        >
          <Link href={`/onboarding/done?type=${userType}`}>Continue</Link>
        </Button>
      </div>
    </div>
  )
}
