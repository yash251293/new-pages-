"use client"

import type React from "react" // Kept for clarity, though Suspense also implies React
import { Suspense } from "react" // Added for Suspense boundary

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle2, SparklesIcon, BuildingIcon, BriefcaseIcon, UsersIcon, StarIcon } from "lucide-react"
import { OnboardingStepper } from "@/components/onboarding-stepper"
import { useSearchParams, useRouter } from "next/navigation"
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

// Helper functions for completion status (can be moved to a utils file if shared)
const isEmailVerified = (user: any): boolean => {
  if (!user) return false;
  return !!user.profile || !!user.company_name || !!user.full_name; // Proxy
};

const isProfileComplete = (user: any, userType: string | undefined): boolean => {
  if (!user || !userType) return false;
  const profile = user.profile;
  if (userType === 'individual') {
    return !!(user.full_name && (profile?.location || profile?.professional_title || profile?.bio));
  }
  if (userType === 'company') {
    return !!(user.company_name && (profile?.location || profile?.company_type || profile?.bio));
  }
  return false;
};

const isPreferencesComplete = (user: any, userType: string | undefined): boolean => {
  if (!user?.profile || !userType) return false;
  const profile = user.profile;
  if (userType === 'individual') {
    return !!(profile.job_status || (profile.desired_roles && profile.desired_roles.length > 0) || profile.work_arrangement || profile.experience_level_preference);
  }
  if (userType === 'company') {
    return !!(profile.hiring_status || (profile.hiring_roles && profile.hiring_roles.length > 0));
  }
  return false;
};

const isCultureComplete = (user: any, userType: string | undefined): boolean => {
  if (userType !== 'individual' || !user?.profile) return false;
  const profile = user.profile;
  return !!(profile.ideal_next_job_description || (profile.culture_preferences && profile.culture_preferences.length > 0));
};

const isResumeComplete = (user: any, userType: string | undefined): boolean => {
  if (userType !== 'individual' || !user?.profile) return false;
  return !!user.profile.resume_file_path;
};

const stepCompletionCheckers: Record<string, (user: any, userType: string | undefined) => boolean> = {
  "/auth/onboarding/verify-email": isEmailVerified,
  "/auth/onboarding/profile": isProfileComplete,
  "/auth/onboarding/preferences": isPreferencesComplete,
  "/auth/onboarding/culture": isCultureComplete,
  "/auth/onboarding/resume": isResumeComplete,
};

function OnboardingDonePageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user, isLoading: isAuthLoading } = useAuth();
  const queryUserType = searchParams.get('type');

  const localIndividualSteps = [
    { name: "Verify Email", href: "/auth/onboarding/verify-email", shortName: "Email" },
    { name: "Profile", href: "/auth/onboarding/profile", shortName: "Profile" },
    { name: "Preferences", href: "/auth/onboarding/preferences", shortName: "Preferences" },
    { name: "Culture", href: "/auth/onboarding/culture", shortName: "Work Culture" },
    { name: "Resume/CV", href: "/auth/onboarding/resume", shortName: "Resume" },
  ];

  const localCompanySteps = [
    { name: "Verify Email", href: "/auth/onboarding/verify-email", shortName: "Email" },
    { name: "Company Profile", href: "/auth/onboarding/profile", shortName: "Company Info" },
    { name: "Preferences", href: "/auth/onboarding/preferences", shortName: "Hiring Preferences" },
  ];

  if (isAuthLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading user data...</div>;
  }

  const finalUserType = user?.user_type || queryUserType || 'individual';

  if (!user) {
    toast.error("User data not available. Redirecting to login.");
    if (typeof window !== 'undefined') {
        router.push('/auth/login');
    }
    return <div className="min-h-screen flex items-center justify-center">User data not available. Please try logging in again.</div>;
  }

  const currentStepsData = finalUserType === 'company' ? localCompanySteps : localIndividualSteps;
  const totalDataSteps = currentStepsData.length;

  let trulyCompletedDataSteps = 0;
  const stepCompletionStatus: Array<{ name: string; shortName: string; href: string; isComplete: boolean }> = [];

  currentStepsData.forEach(step => {
    const checker = stepCompletionCheckers[step.href];
    let isComplete = false;
    if (checker) {
      isComplete = checker(user, finalUserType);
    }
    if (isComplete) {
      trulyCompletedDataSteps++;
    }
    stepCompletionStatus.push({ ...step, isComplete });
  });

  const newCompletionPercentage = totalDataSteps > 0 ? Math.round((trulyCompletedDataSteps / totalDataSteps) * 100) : 0;

  return (
    <div className="min-h-screen bg-brand-bg-light-gray py-8">
      <OnboardingStepper />

      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg border border-gray-100">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-lg mb-6">
            <CheckCircle2 className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-brand-text-dark mb-3">
            {finalUserType === 'company' ? 'Company' : 'Professional'} Profile Setup Complete!
          </h1>
          <p className="text-brand-text-medium leading-relaxed">
            {finalUserType === 'company'
              ? "Great start! Your basic company profile is ready, but let's make it stand out with detailed information that will help you attract top talent."
              : "Great start! Your basic profile is ready, but let's make it stand out with detailed information that will help you find amazing opportunities."
            }
          </p>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-xl border border-blue-200 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-brand-text-dark">Profile Completion Status</h2>
            <span className="text-2xl font-bold text-black">{newCompletionPercentage}%</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {stepCompletionStatus.map(step => (
              <div className="flex items-center space-x-3" key={step.href}>
                {step.isComplete ? (
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                ) : (
                  <div className="w-5 h-5 bg-gray-200 rounded-full flex-shrink-0" />
                )}
                <span className={`text-sm font-medium ${step.isComplete ? 'text-brand-text-dark' : 'text-gray-400'}`}>
                  {step.shortName}
                </span>
              </div>
            ))}
          </div>

          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className="h-3 bg-gradient-to-r from-black to-green-500 rounded-full transition-all duration-700 ease-out"
              style={{ width: `${newCompletionPercentage}%` }}
            />
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold text-brand-text-dark mb-6 flex items-center">
            <SparklesIcon className="w-5 h-5 text-black mr-2" />
            {finalUserType === 'company'
              ? 'Complete Your Company Profile to Attract Top Talent'
              : 'Complete Your Professional Profile to Find Amazing Opportunities'
            }
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {finalUserType === 'company' ? (
              <>
                <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                  <div className="flex items-center space-x-3 mb-2">
                    <BuildingIcon className="w-5 h-5 text-gray-400" />
                    <span className="font-medium text-brand-text-dark">Company Overview</span>
                  </div>
                  <p className="text-sm text-brand-text-medium">Add your company's mission, vision, and values</p>
                </div>

                <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                  <div className="flex items-center space-x-3 mb-2">
                    <BriefcaseIcon className="w-5 h-5 text-gray-400" />
                    <span className="font-medium text-brand-text-dark">Open Positions</span>
                  </div>
                  <p className="text-sm text-brand-text-medium">List your current job openings and requirements</p>
                </div>

                <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                  <div className="flex items-center space-x-3 mb-2">
                    <UsersIcon className="w-5 h-5 text-gray-400" />
                    <span className="font-medium text-brand-text-dark">Team & Culture</span>
                  </div>
                  <p className="text-sm text-brand-text-medium">Showcase your team and company culture</p>
                </div>

                <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                  <div className="flex items-center space-x-3 mb-2">
                    <StarIcon className="w-5 h-5 text-gray-400" />
                    <span className="font-medium text-brand-text-dark">Benefits & Perks</span>
                  </div>
                  <p className="text-sm text-brand-text-medium">Highlight your employee benefits and perks</p>
                </div>
              </>
            ) : (
              <>
                <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                  <div className="flex items-center space-x-3 mb-2">
                    <BriefcaseIcon className="w-5 h-5 text-gray-400" />
                    <span className="font-medium text-brand-text-dark">Work Experience</span>
                  </div>
                  <p className="text-sm text-brand-text-medium">Add your professional experience and achievements</p>
                </div>

                <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                  <div className="flex items-center space-x-3 mb-2">
                    <StarIcon className="w-5 h-5 text-gray-400" />
                    <span className="font-medium text-brand-text-dark">Skills & Education</span>
                  </div>
                  <p className="text-sm text-brand-text-medium">Showcase your skills and educational background</p>
                </div>

                <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                  <div className="flex items-center space-x-3 mb-2">
                    <UsersIcon className="w-5 h-5 text-gray-400" />
                    <span className="font-medium text-brand-text-dark">Professional Bio</span>
                  </div>
                  <p className="text-sm text-brand-text-medium">Tell your professional story and aspirations</p>
                </div>

                <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                  <div className="flex items-center space-x-3 mb-2">
                    <BuildingIcon className="w-5 h-5 text-gray-400" />
                    <span className="font-medium text-brand-text-dark">Portfolio & Projects</span>
                  </div>
                  <p className="text-sm text-brand-text-medium">Display your best work and projects</p>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="bg-gradient-to-r from-black to-gray-800 p-6 rounded-xl text-white text-center mb-6">
          <h3 className="text-lg font-semibold mb-2">
            {finalUserType === 'company' ? 'Ready to attract top talent?' : 'Ready to find your dream job?'}
          </h3>
          <p className="text-blue-100 mb-4">
            {finalUserType === 'company'
              ? 'Complete company profiles receive 5x more applications from qualified candidates.'
              : 'Complete profiles get 3x more interview invitations from top companies.'
            }
          </p>
          <Button
            className="w-full bg-black hover:bg-gray-900 text-white py-4 text-lg font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
            asChild
          >
            <Link href={`/auth/onboarding/profile?type=${finalUserType}`}>
              <SparklesIcon className="w-6 h-6 mr-3" />
              {finalUserType === 'company' ? 'Complete Your Company Profile' : 'Complete Your Professional Profile'}
            </Link>
          </Button>
        </div>

        <div className="text-center">
          <Button
            variant="outline"
            className="border-brand-border text-brand-text-medium hover:bg-brand-bg-light-gray font-medium"
            asChild
          >
            <Link href="/feed">Skip for now, go to Dashboard</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default function OnboardingDonePage() {
  return (
    <Suspense fallback={<div>Loading onboarding completion...</div>}>
      <OnboardingDonePageContent />
    </Suspense>
  );
}