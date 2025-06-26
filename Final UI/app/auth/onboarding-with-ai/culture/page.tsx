"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { CheckCircle, HeartIcon, UsersIcon, BrainCircuitIcon } from "lucide-react"
import Link from "next/link"
import { OnboardingStepperWrapper } from "@/components/onboarding-stepper-wrapper"
import { useSearchParams } from "next/navigation"
import { AIFormField } from "@/components/ai-form-field"

interface ToggleChipProps {
  id: string
  label: string
  isSelected: boolean
  onToggle: (id: string) => void
}

const ToggleChip: React.FC<ToggleChipProps> = ({ id, label, isSelected, onToggle }) => (
  <button
    type="button"
    onClick={() => onToggle(id)}
    className={cn(
      "px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm border rounded-full transition-all duration-200 flex items-center font-medium text-center",
      isSelected
        ? "bg-black text-white border-black shadow-md scale-105"
        : "bg-white text-brand-text-medium border-brand-border hover:border-black hover:text-black hover:shadow-sm",
    )}
  >
    {isSelected && <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />}
    {label}
  </button>
)

interface ImportanceButtonGroupProps {
  selectedValue: string
  onSelect: (value: string) => void
}

const ImportanceButtonGroup: React.FC<ImportanceButtonGroupProps> = ({ selectedValue, onSelect }) => (
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
    {[
      { value: "Very important", color: "green", label: "Very Important" },
      { value: "Important", color: "yellow", label: "Somewhat Important" },
      { value: "Not important", color: "gray", label: "Not Important" }
    ].map((option) => (
      <button
        key={option.value}
        type="button"
        onClick={() => onSelect(option.value)}
        className={cn(
          "px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-medium border rounded-lg transition-all duration-200 text-center",
          selectedValue === option.value
            ? option.color === "green"
              ? "bg-green-100 text-green-700 border-green-300 shadow-md"
              : option.color === "yellow"
              ? "bg-yellow-100 text-yellow-700 border-yellow-300 shadow-md"
              : "bg-gray-100 text-gray-700 border-gray-300 shadow-md"
            : "bg-white text-brand-text-medium border-brand-border hover:border-gray-400 hover:shadow-sm",
        )}
      >
        {option.label}
      </button>
    ))}
  </div>
)

export default function CulturePage() {
  const searchParams = useSearchParams()
  const userType = searchParams.get('type') || 'individual'
  
  const culturePrefsInitial = [
    { id: "say-in-work", label: "Having autonomy in how I work", selected: true },
    { id: "growth-opportunities", label: "Continuous learning opportunities", selected: true },
    { id: "learn-from-team", label: "Working with experienced professionals", selected: false },
    { id: "good-trajectory", label: "Being part of growing organizations", selected: false },
    { id: "say-in-direction", label: "Contributing to strategic decisions", selected: false },
    { id: "mentorship", label: "Access to guidance and mentorship", selected: false },
    { id: "learn-new-things", label: "Variety and new challenges", selected: true },
    { id: "challenging-problems", label: "Working on complex, meaningful projects", selected: true },
    { id: "diverse-team", label: "Collaborating with diverse perspectives", selected: false },
    { id: "work-life-balance", label: "Healthy work-life balance", selected: false },
    { id: "innovative-environment", label: "Creative and innovative environment", selected: false },
    { id: "social-impact", label: "Making a positive impact", selected: false },
    { id: "flexible-schedule", label: "Flexible working hours", selected: false },
    { id: "long-term-relationships", label: "Building long-term client relationships", selected: false },
    { id: "financial-stability", label: "Consistent and reliable income", selected: false },
    { id: "recognition", label: "Recognition for quality work", selected: false },
  ]
  const [culturePrefs, setCulturePrefs] = useState(culturePrefsInitial)
  const [remotePolicyImportance, setRemotePolicyImportance] = useState("Not important")
  const [quietOfficeImportance, setQuietOfficeImportance] = useState("Not important")
  const [nextJobDescription, setNextJobDescription] = useState("")

  const toggleCulturePref = (id: string) => {
    setCulturePrefs((prefs) => prefs.map((p) => (p.id === id ? { ...p, selected: !p.selected } : p)))
  }

  return (
    <div className="min-h-screen bg-brand-bg-light-gray py-4 sm:py-8 px-4">
      <OnboardingStepperWrapper />
      
      <div className="max-w-3xl mx-auto bg-white p-4 sm:p-6 lg:p-8 rounded-xl shadow-lg border border-gray-100 relative">
        {/* Skip to Explore Button - Left Side */}
        <Button
          className="absolute top-2 left-2 sm:top-4 sm:left-4 border-2 border-primary-navy bg-transparent text-primary-navy hover:bg-primary-navy hover:text-white focus:bg-primary-navy focus:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-navy rounded-xl font-subheading text-sm sm:text-base px-3 sm:px-4 py-1 sm:py-2"
          asChild
        >
          <Link href="/dashboard">Skip to Explore</Link>
        </Button>

        {/* Skip Button - Right Side */}
        <Button
          className="absolute top-2 right-2 sm:top-4 sm:right-4 border-2 border-primary-navy bg-transparent text-primary-navy hover:bg-primary-navy hover:text-white focus:bg-primary-navy focus:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-navy rounded-xl font-subheading text-sm sm:text-base px-3 sm:px-4 py-1 sm:py-2"
          asChild
        >
          <Link href={`/onboarding/resume?type=${userType}`}>Skip</Link>
        </Button>

        <div className="text-center mb-6 sm:mb-8 mt-12 sm:mt-16">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-brand-text-dark mb-2 sm:mb-3 px-2">What motivates you at work?</h1>
          <p className="text-sm sm:text-base text-brand-text-medium leading-relaxed px-2">
            Tell us about your ideal work environment and preferences to find opportunities that align with your values.
          </p>
        </div>
        
        <form className="space-y-6 sm:space-y-8 lg:space-y-10">
          <div className="space-y-3 sm:space-y-4 lg:space-y-5">
            <div className="flex items-center space-x-2 mb-3 sm:mb-4">
              <HeartIcon className="h-4 w-4 sm:h-5 sm:w-5 text-black" />
              <Label className="text-sm sm:text-base font-semibold text-brand-text-dark">
                What are you looking for in your next opportunity?
              </Label>
            </div>
            <p className="text-xs sm:text-sm text-brand-text-medium mb-3 sm:mb-4">
              Select all the factors that are important to you. This helps us match you with opportunities that share your priorities.
            </p>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {culturePrefs.map((pref) => (
                <ToggleChip
                  key={pref.id}
                  id={pref.id}
                  label={pref.label}
                  isSelected={pref.selected}
                  onToggle={toggleCulturePref}
                />
              ))}
            </div>
          </div>

          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center space-x-2 mb-2">
              <UsersIcon className="h-4 w-4 sm:h-5 sm:w-5 text-black" />
              <Label className="text-sm sm:text-base font-semibold text-brand-text-dark">
                How important is remote work flexibility to you?
              </Label>
            </div>
            <p className="text-xs sm:text-sm text-brand-text-medium mb-2 sm:mb-3">
              This helps us understand your preferred work arrangement and match you accordingly.
            </p>
            <ImportanceButtonGroup selectedValue={remotePolicyImportance} onSelect={setRemotePolicyImportance} />
          </div>

          <div className="space-y-3 sm:space-y-4">
            <Label className="block text-sm sm:text-base font-semibold text-brand-text-dark">
              How important is having a quiet, focused work environment?
            </Label>
            <p className="text-xs sm:text-sm text-brand-text-medium mb-2 sm:mb-3">
              Some people thrive in collaborative, bustling environments while others prefer quiet, focused spaces.
            </p>
            <ImportanceButtonGroup selectedValue={quietOfficeImportance} onSelect={setQuietOfficeImportance} />
          </div>

          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center space-x-2 mb-2">
              <BrainCircuitIcon className="h-4 w-4 sm:h-5 sm:w-5 text-black" />
              <Label htmlFor="nextJobDescription" className="text-sm sm:text-base font-semibold text-brand-text-dark">
                Describe your ideal next opportunity <span className="text-brand-red">*</span>
              </Label>
            </div>
            <div className="bg-blue-50 p-3 sm:p-4 rounded-lg border border-blue-200 mb-3 sm:mb-4">
              <p className="text-xs sm:text-sm text-blue-700">
                <strong>💡 Tip:</strong> Clients and employers read this first! Be specific about what excites you, 
                what impact you want to make, and what kind of environment helps you do your best work.
              </p>
            </div>
            <AIFormField
              aiProps={{
                fieldType: 'textarea',
                fieldName: 'Ideal Next Opportunity',
                placeholder: 'I\'m looking for opportunities where I can...',
                value: nextJobDescription,
                onChange: (value) => setNextJobDescription(value as string),
                context: {
                  userType: userType as 'individual' | 'company',
                  existingContent: nextJobDescription
                }
              }}
            >
              <Textarea
                id="nextJobDescription"
                value={nextJobDescription}
                onChange={(e) => setNextJobDescription(e.target.value)}
                placeholder="I'm looking for opportunities where I can..."
                maxLength={300}
                className="bg-brand-bg-input border-brand-border min-h-[100px] sm:min-h-[120px] focus:border-black focus:ring-2 focus:ring-black/20 text-sm sm:text-base"
              />
            </AIFormField>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-xs gap-1 sm:gap-0">
              <p className="text-brand-text-medium">
                Be authentic and specific - this is your chance to stand out!
              </p>
              <p className={cn(
                "font-medium",
                nextJobDescription.length > 250 ? "text-amber-600" : "text-brand-text-light"
              )}>
                {nextJobDescription.length} / 300
              </p>
            </div>
          </div>

          <div className="flex items-start sm:items-center p-3 sm:p-4 bg-green-50 border border-green-200 rounded-lg text-xs sm:text-sm text-green-700">
            <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-green-600 flex-shrink-0 mt-0.5 sm:mt-0" />
            <span>
              <strong>Almost there!</strong> Complete your profile and start connecting with opportunities that match your values.
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 sm:pt-6">
            <Button
              type="button"
              variant="outline"
              className="flex-1 border-2 border-gray-300 bg-transparent text-gray-700 hover:bg-gray-50 focus:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 rounded-xl font-medium py-3 sm:py-4 text-sm sm:text-base"
              asChild
            >
              <Link href={`/onboarding/preferences?type=${userType}`}>← Back to Preferences</Link>
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-black hover:bg-gray-900 text-white font-medium rounded-xl py-3 sm:py-4 text-sm sm:text-base shadow-md hover:shadow-lg transition-all duration-200"
              asChild
            >
              <Link href={`/onboarding/resume?type=${userType}`}>Complete Profile Setup →</Link>
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
