"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { CheckIcon, UserIcon, HeartIcon, SettingsIcon, FileTextIcon, SparklesIcon, BuildingIcon } from "lucide-react"
import { useState } from "react"
import { useAuth } from "@/context/AuthContext";

const individualSteps = [
  {
    name: "Verify Email",
    href: "/auth/onboarding/verify-email",
    shortName: "Email",
    icon: SparklesIcon,
    description: "Confirm your account"
  },
  {
    name: "Profile",
    href: "/auth/onboarding/profile",
    shortName: "Profile",
    icon: UserIcon,
    description: "Basic information"
  },
  {
    name: "Preferences",
    href: "/auth/onboarding/preferences",
    shortName: "Preferences",
    icon: SettingsIcon,
    description: "Job preferences"
  },
  {
    name: "Culture",
    href: "/auth/onboarding/culture",
    shortName: "Culture",
    icon: HeartIcon,
    description: "Work culture fit"
  },
  {
    name: "Resume/CV",
    href: "/auth/onboarding/resume",
    shortName: "Resume",
    icon: FileTextIcon,
    description: "Upload documents"
  },
  {
    name: "Complete",
    href: "/auth/onboarding/done",
    shortName: "Done",
    icon: CheckIcon,
    description: "All set!"
  },
]

const companySteps = [
  {
    name: "Verify Email",
    href: "/auth/onboarding/verify-email",
    shortName: "Email",
    icon: SparklesIcon,
    description: "Confirm your account"
  },
  {
    name: "Company Profile",
    href: "/auth/onboarding/profile",
    shortName: "Profile",
    icon: BuildingIcon,
    description: "Company information"
  },
  {
    name: "Preferences",
    href: "/auth/onboarding/preferences",
    shortName: "Preferences",
    icon: SettingsIcon,
    description: "Hiring preferences"
  },
  {
    name: "Complete",
    href: "/auth/onboarding/done",
    shortName: "Done",
    icon: CheckIcon,
    description: "All set!"
  },
]

// Helper functions to check step completion based on user data

// Proxy for email verification - adapt if user.is_email_verified becomes available
const isEmailVerified = (user: any): boolean => {
  if (!user) return false;
  // If a specific flag exists (ideal), use it.
  // if (typeof user.is_email_verified === 'boolean') return user.is_email_verified;

  // Fallback: Assume verified if profile has started or other data exists.
  // This is a weak proxy and should be replaced by a backend flag.
  return !!user.profile || !!user.company_name || !!user.full_name;
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

// Map step names/hrefs to completion functions
const stepCompletionCheckers: Record<string, (user: any, userType: string | undefined) => boolean> = {
  "/auth/onboarding/verify-email": isEmailVerified,
  "/auth/onboarding/profile": isProfileComplete,
  "/auth/onboarding/preferences": isPreferencesComplete,
  "/auth/onboarding/culture": isCultureComplete,
  "/auth/onboarding/resume": isResumeComplete,
};

export function OnboardingStepper() {
  const pathname = usePathname();
  const { user, isLoading: isAuthLoading } = useAuth();
  console.log("OnboardingStepper user from useAuth:", JSON.stringify(user, null, 2));
  const userType = user?.user_type;

  if (isAuthLoading) {
    return <div>Loading authentication details...</div>; // Or a skeleton loader
  }

  if (!userType) {
    console.warn("OnboardingStepper: userType is undefined. User may not be properly loaded or authenticated.");
    return <div>Error: User type not determined. Please ensure you are logged in.</div>;
  }

  const stepsData = userType === 'company' ? companySteps : individualSteps;
  const totalDataSteps = stepsData.length - 1; // Exclude the "Complete" step (last step)

  let trulyCompletedDataSteps = 0;
  const dataStepCompletionStates: boolean[] = [];

  // First, calculate completion for all actual data steps
  stepsData.forEach((step, idx) => {
    if (idx < totalDataSteps) { // Only iterate through data steps
      const checker = stepCompletionCheckers[step.href];
      let isComplete = false;
      if (checker) {
        isComplete = checker(user, userType);
      }
      dataStepCompletionStates.push(isComplete);
      if (isComplete) {
        trulyCompletedDataSteps++;
      }
    }
  });

  // Then, determine the status of each step (including the "Complete" step)
  const stepStatuses = stepsData.map((step, idx) => {
    if (idx < totalDataSteps) { // For data steps
      if (dataStepCompletionStates[idx]) return "complete";
      // A data step can be "current" if it's not complete AND its path matches.
      // Also, it should only be "current" if the previous step is complete (or it's the first data step).
      const isPreviousCompleteOrFirstDataStep = idx === 0 || (idx > 0 && dataStepCompletionStates[idx - 1]);
      if (pathname.startsWith(step.href) && isPreviousCompleteOrFirstDataStep) return "current";
      return "upcoming";
    } else { // For the "Complete" step (idx === totalDataSteps)
      if (trulyCompletedDataSteps === totalDataSteps) return "complete";
      // The "Complete" step can only be "current" if its path matches AND all data steps are complete.
      const allDataStepsVerifiedComplete = dataStepCompletionStates.every(s => s); // Double check this condition
      if (pathname.startsWith(step.href) && allDataStepsVerifiedComplete) return "current";
      return "upcoming";
    }
  });

  const progressPercentage = totalDataSteps > 0 ? (trulyCompletedDataSteps / totalDataSteps) * 100 : 0;

  return (
    <div className="w-full max-w-3xl mx-auto px-4 mb-12">
      {/* Progress Bar with Dots */}
      <div className="relative flex items-center justify-between mb-2">
        {/* Progress Line - this is a visual effect and doesn't use progressPercentage directly for filling */}
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 bg-gray-200 z-0" />
        {/* Actual progress fill based on truly completed steps */}
        <div
          className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 bg-black z-0 transition-all duration-300"
          style={{ width: `${progressPercentage}%` }}
        />
        {stepsData.map((step, idx) => {
          const status = stepStatuses[idx];
          return (
            <div key={step.name} className="flex-1 flex flex-col items-center">
              <Link
                href={step.href} // Link remains, navigation should ideally be controlled by submit actions
                className={cn(
                  "relative z-10 flex flex-col items-center group",
                  "focus:outline-none",
                   (status !== "complete" && status !== "current" && stepStatuses[idx-1] !== "complete" && idx > 0 && step.href !== "/auth/onboarding/verify-email") ? "pointer-events-none" : "" // Disable click on upcoming steps if previous not complete
                )}
                aria-current={status === "current" ? "step" : undefined}
              >
                <div className={cn(
                  "flex items-center justify-center w-7 h-7 rounded-full border-2 transition-all duration-200",
                  status === "complete"
                    ? "bg-black border-black text-white"
                    : status === "current"
                      ? "bg-white border-black text-black"
                      : "bg-white border-gray-300 text-gray-400"
                )}>
                  {status === "complete" ? <CheckIcon className="w-4 h-4" /> : <span className={cn("font-bold text-base", status === "current" ? "text-black" : "text-gray-400")}>{idx + 1}</span>}
                </div>
              </Link>
            </div>
          );
        })}
      </div>
      {/* Step Names */}
      <div className="flex mt-1">
        {stepsData.map((step, idx) => (
          <div key={step.name} className="flex-1 flex flex-col items-center">
            <span
              className={cn(
                "text-xs font-medium text-center",
                stepStatuses[idx] === "complete" || stepStatuses[idx] === "current" ? "text-black" : "text-gray-400"
              )}
            >
              {step.shortName}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
