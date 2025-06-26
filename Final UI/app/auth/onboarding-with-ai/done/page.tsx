"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle2, SparklesIcon, BuildingIcon, BriefcaseIcon, UsersIcon, StarIcon } from "lucide-react"
import { OnboardingStepperWrapper } from "@/components/onboarding-stepper-wrapper"
import { useSearchParams } from "next/navigation"

export default function OnboardingDonePage() {
  const searchParams = useSearchParams()
  const userType = searchParams.get('type') || 'company'

  return (
    <div className="min-h-screen bg-brand-bg-light-gray py-4 sm:py-8 px-4">
      <OnboardingStepperWrapper />
      
      <div className="max-w-3xl mx-auto bg-white p-4 sm:p-6 lg:p-8 rounded-xl shadow-lg border border-gray-100">
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-18 sm:h-18 lg:w-20 lg:h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-lg mb-4 sm:mb-6">
            <CheckCircle2 className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 text-white" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-brand-text-dark mb-3 sm:mb-4">🎉 Profile Complete!</h1>
          <p className="text-sm sm:text-base text-brand-text-medium mb-6 sm:mb-8 px-2 sm:px-0">
            Welcome to the platform! Your profile is ready and you can now start exploring opportunities.
          </p>
        </div>

        {/* Progress Overview */}
        <div className="bg-gradient-to-r from-blue-50 to-green-50 p-4 sm:p-6 rounded-xl border border-blue-200 mb-6 sm:mb-8">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h2 className="text-base sm:text-lg font-semibold text-brand-text-dark">Profile Completion Status</h2>
            <span className="text-xl sm:text-2xl font-bold text-black">35%</span>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
            {userType === 'company' ? (
              <>
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0" />
                  <span className="text-xs sm:text-sm text-brand-text-dark font-medium">Company Information</span>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0" />
                  <span className="text-xs sm:text-sm text-brand-text-dark font-medium">Hiring Preferences</span>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0" />
                  <span className="text-xs sm:text-sm text-brand-text-dark font-medium">Company Culture</span>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0" />
                  <span className="text-xs sm:text-sm text-brand-text-dark font-medium">Personal Information</span>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0" />
                  <span className="text-xs sm:text-sm text-brand-text-dark font-medium">Job Preferences</span>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0" />
                  <span className="text-xs sm:text-sm text-brand-text-dark font-medium">Work Culture</span>
                </div>
              </>
            )}
          </div>

          <div className="w-full bg-gray-200 rounded-full h-2 sm:h-3 overflow-hidden">
            <div className="h-2 sm:h-3 bg-gradient-to-r from-black to-green-500 rounded-full transition-all duration-700 ease-out w-[35%]" />
          </div>
        </div>

        {/* What's Missing */}
        <div className="mb-6 sm:mb-8">
          <h2 className="text-lg sm:text-xl font-semibold text-brand-text-dark mb-4 sm:mb-6 flex items-center">
            <SparklesIcon className="w-4 h-4 sm:w-5 sm:h-5 text-black mr-2 flex-shrink-0" />
            <span className="text-sm sm:text-base lg:text-lg leading-tight">
              {userType === 'company' 
                ? 'Complete Your Company Profile to Attract Top Talent'
                : 'Complete Your Professional Profile to Find Amazing Opportunities'
              }
            </span>
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {userType === 'company' ? (
              <>
                <div className="p-3 sm:p-4 border border-gray-200 rounded-lg bg-gray-50">
                  <div className="flex items-center space-x-2 sm:space-x-3 mb-2">
                    <BuildingIcon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" />
                    <span className="font-medium text-brand-text-dark text-sm sm:text-base">Company Overview</span>
                  </div>
                  <p className="text-xs sm:text-sm text-brand-text-medium">Add your company's mission, vision, and values</p>
                </div>
                
                <div className="p-3 sm:p-4 border border-gray-200 rounded-lg bg-gray-50">
                  <div className="flex items-center space-x-2 sm:space-x-3 mb-2">
                    <BriefcaseIcon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" />
                    <span className="font-medium text-brand-text-dark text-sm sm:text-base">Open Positions</span>
                  </div>
                  <p className="text-xs sm:text-sm text-brand-text-medium">List your current job openings and requirements</p>
                </div>
                
                <div className="p-3 sm:p-4 border border-gray-200 rounded-lg bg-gray-50">
                  <div className="flex items-center space-x-2 sm:space-x-3 mb-2">
                    <UsersIcon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" />
                    <span className="font-medium text-brand-text-dark text-sm sm:text-base">Team & Culture</span>
                  </div>
                  <p className="text-xs sm:text-sm text-brand-text-medium">Showcase your team and company culture</p>
                </div>
                
                <div className="p-3 sm:p-4 border border-gray-200 rounded-lg bg-gray-50">
                  <div className="flex items-center space-x-2 sm:space-x-3 mb-2">
                    <StarIcon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" />
                    <span className="font-medium text-brand-text-dark text-sm sm:text-base">Benefits & Perks</span>
                  </div>
                  <p className="text-xs sm:text-sm text-brand-text-medium">Highlight your employee benefits and perks</p>
                </div>
              </>
            ) : (
              <>
                <div className="p-3 sm:p-4 border border-gray-200 rounded-lg bg-gray-50">
                  <div className="flex items-center space-x-2 sm:space-x-3 mb-2">
                    <BriefcaseIcon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" />
                    <span className="font-medium text-brand-text-dark text-sm sm:text-base">Work Experience</span>
                  </div>
                  <p className="text-xs sm:text-sm text-brand-text-medium">Add your professional experience and achievements</p>
                </div>
                
                <div className="p-3 sm:p-4 border border-gray-200 rounded-lg bg-gray-50">
                  <div className="flex items-center space-x-2 sm:space-x-3 mb-2">
                    <StarIcon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" />
                    <span className="font-medium text-brand-text-dark text-sm sm:text-base">Skills & Education</span>
                  </div>
                  <p className="text-xs sm:text-sm text-brand-text-medium">Showcase your skills and educational background</p>
                </div>
                
                <div className="p-3 sm:p-4 border border-gray-200 rounded-lg bg-gray-50">
                  <div className="flex items-center space-x-2 sm:space-x-3 mb-2">
                    <UsersIcon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" />
                    <span className="font-medium text-brand-text-dark text-sm sm:text-base">Professional Bio</span>
                  </div>
                  <p className="text-xs sm:text-sm text-brand-text-medium">Tell your professional story and aspirations</p>
                </div>
                
                <div className="p-3 sm:p-4 border border-gray-200 rounded-lg bg-gray-50">
                  <div className="flex items-center space-x-2 sm:space-x-3 mb-2">
                    <BuildingIcon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" />
                    <span className="font-medium text-brand-text-dark text-sm sm:text-base">Portfolio & Projects</span>
                  </div>
                  <p className="text-xs sm:text-sm text-brand-text-medium">Display your best work and projects</p>
                </div>
              </>
            )}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-black to-gray-800 p-4 sm:p-6 rounded-xl text-white text-center mb-4 sm:mb-6">
          <h3 className="text-base sm:text-lg font-semibold mb-2">
            {userType === 'company' ? 'Ready to attract top talent?' : 'Ready to find your dream job?'}
          </h3>
          <p className="text-blue-100 mb-4 text-sm sm:text-base px-2 sm:px-0">
            {userType === 'company' 
              ? 'Complete company profiles receive 5x more applications from qualified candidates.'
              : 'Complete profiles get 3x more interview invitations from top companies.'
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Button
              className="flex-1 bg-white hover:bg-gray-100 text-black py-3 px-4 sm:px-6 rounded-lg font-medium text-sm sm:text-base transition-all duration-200 shadow-md hover:shadow-lg min-h-[44px] sm:min-h-[48px]"
              asChild
            >
              <Link href={`/profile/complete?type=${userType}`}>Complete Detailed Profile</Link>
            </Button>
            <Button 
              variant="outline" 
              className="flex-1 border-white text-white hover:bg-white hover:text-black py-3 px-4 sm:px-6 rounded-lg font-medium text-sm sm:text-base transition-all duration-200 min-h-[44px] sm:min-h-[48px]"
              asChild
            >
              <Link href="/dashboard">Explore Opportunities</Link>
            </Button>
          </div>
        </div>

        {/* Skip Option */}
        <div className="text-center">
          <Button
            variant="outline"
            className="border-brand-border text-brand-text-medium hover:bg-brand-bg-light-gray font-medium text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3 min-h-[40px] sm:min-h-[44px]"
            asChild
          >
            <Link href="/dashboard">Skip for now, go to Dashboard</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
