"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { XIcon, CheckIcon, DollarSignIcon, BriefcaseIcon, MapPinIcon, BuildingIcon, UsersIcon, UserIcon, TargetIcon } from "lucide-react"
import Link from "next/link"
import { OnboardingStepperWrapper } from "@/components/onboarding-stepper-wrapper"
import { useSearchParams } from "next/navigation"

interface ToggleButtonProps {
  value: string
  selectedValue: string
  onSelect: (value: string) => void
  children: React.ReactNode
  className?: string
}

const ToggleButton: React.FC<ToggleButtonProps> = ({ value, selectedValue, onSelect, children, className }) => (
  <button
    type="button"
    onClick={() => onSelect(value)}
    className={cn(
      "px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-medium rounded-lg border transition-all duration-200 text-center",
      selectedValue === value
        ? "bg-black text-white border-black shadow-md"
        : "bg-white text-brand-text-dark border-brand-border hover:border-gray-400 hover:shadow-sm",
      className
    )}
  >
    {children}
  </button>
)

export default function PreferencesPage() {
  const searchParams = useSearchParams()
  const userType = searchParams.get('type') || 'company'
  
  // Company preferences
  const [hiringStatus, setHiringStatus] = useState("actively-hiring")
  const [employmentType, setEmploymentType] = useState("full-time")
  const [roles, setRoles] = useState<string[]>(["Software Engineering"])
  const [locations, setLocations] = useState<string[]>(["Noida"])
  
  // Individual preferences
  const [jobStatus, setJobStatus] = useState("actively-looking")
  const [desiredRoles, setDesiredRoles] = useState<string[]>(["Software Engineering"])
  const [workArrangement, setWorkArrangement] = useState("hybrid")
  const [experienceLevel, setExperienceLevel] = useState("mid-level")
  const [salaryExpectation, setSalaryExpectation] = useState({ min: "", max: "", currency: "usd" })
  const [careerGoals, setCareerGoals] = useState<string[]>([])

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
          <Link href={userType === 'individual' ? `/onboarding/culture?type=${userType}` : `/onboarding/done?type=${userType}`}>Skip</Link>
        </Button>

        <div className="text-center mb-6 sm:mb-8 mt-12 sm:mt-16">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-brand-text-dark mb-2 sm:mb-3 px-2">
            {userType === 'company' 
              ? 'What are you looking to hire?' 
              : 'What are your work preferences?'
            }
          </h1>
          <p className="text-sm sm:text-base text-brand-text-medium leading-relaxed px-2">
            {userType === 'company'
              ? 'Help us understand your hiring needs to match you with the perfect candidates.'
              : 'Tell us about your work preferences to find the perfect opportunities.'
            }
          </p>
        </div>
        
        <form className="space-y-6 sm:space-y-8 lg:space-y-10">
          {userType === 'company' ? (
            // Company Preferences
            <>
              {/* Hiring Status */}
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center space-x-2 mb-3 sm:mb-4">
                  <BuildingIcon className="h-4 w-4 sm:h-5 sm:w-5 text-black" />
                  <Label className="text-sm sm:text-base font-semibold text-brand-text-dark">
                    What's your current hiring status? <span className="text-brand-red">*</span>
                  </Label>
                </div>
                <div className="grid grid-cols-1 gap-3 sm:gap-4">
                  {[
                    {
                      value: "actively-hiring",
                      label: "Actively Hiring",
                      desc: "We have open positions and are actively interviewing candidates.",
                    },
                    {
                      value: "planning-to-hire",
                      label: "Planning to Hire",
                      desc: "We'll be hiring soon and want to start building our talent pipeline.",
                    },
                    {
                      value: "not-hiring",
                      label: "Not Hiring Right Now",
                      desc: "We're not currently hiring but want to keep our company profile active.",
                    },
                  ].map((item) => (
                    <button
                      key={item.value}
                      type="button"
                      onClick={() => setHiringStatus(item.value)}
                      className={cn(
                        "p-4 sm:p-5 border rounded-xl text-left transition-all duration-200",
                        hiringStatus === item.value
                          ? "border-black ring-2 ring-black/20 bg-gray-50 shadow-md"
                          : "border-brand-border hover:border-gray-400 bg-white hover:shadow-sm",
                      )}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <span className="font-semibold text-brand-text-dark block mb-1 text-sm sm:text-base">{item.label}</span>
                          <p className="text-xs sm:text-sm text-brand-text-medium leading-relaxed">{item.desc}</p>
                        </div>
                        {hiringStatus === item.value && (
                          <CheckIcon className="w-4 h-4 sm:w-5 sm:h-5 text-black flex-shrink-0 mt-0.5" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Employment Type */}
              <div className="space-y-3 sm:space-y-4">
                <Label className="block text-sm sm:text-base font-semibold text-brand-text-dark">
                  What type of employment are you offering? <span className="text-brand-red">*</span>
                </Label>
                <p className="text-xs sm:text-sm text-brand-text-medium">
                  Select the employment types you're currently hiring for.
                </p>
                <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 sm:gap-3">
                  {[
                    { id: "full-time", label: "Full-time Position" },
                    { id: "part-time", label: "Part-time Position" },
                    { id: "contract", label: "Contract Work" },
                    { id: "freelance", label: "Freelance Projects" },
                    { id: "intern", label: "Internship" }
                  ].map((type) => (
                    <ToggleButton
                      key={type.id}
                      value={type.id}
                      selectedValue={employmentType}
                      onSelect={setEmploymentType}
                      className="col-span-1"
                    >
                      {type.label}
                    </ToggleButton>
                  ))}
                </div>
              </div>

              {/* Salary Range */}
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center space-x-2 mb-2">
                  <DollarSignIcon className="h-4 w-4 sm:h-5 sm:w-5 text-black" />
                  <Label htmlFor="salary" className="text-sm sm:text-base font-semibold text-brand-text-dark">
                    What's your salary range for these positions?
                  </Label>
                </div>
                <p className="text-xs sm:text-sm text-brand-text-medium bg-amber-50 p-3 rounded-lg border border-amber-200">
                  <strong>Note:</strong> This helps us match you with candidates in your budget range
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="relative">
                    <DollarSignIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-3 w-3 sm:h-4 sm:w-4 text-brand-text-light" />
                    <Input
                      id="minSalary"
                      type="number"
                      placeholder="Min salary"
                      className="bg-brand-bg-input border-brand-border pl-8 sm:pl-9 focus:border-black focus:ring-2 focus:ring-black/20 py-3 sm:py-4 text-sm sm:text-base"
                    />
                  </div>
                  <div className="relative">
                    <DollarSignIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-3 w-3 sm:h-4 sm:w-4 text-brand-text-light" />
                    <Input
                      id="maxSalary"
                      type="number"
                      placeholder="Max salary"
                      className="bg-brand-bg-input border-brand-border pl-8 sm:pl-9 focus:border-black focus:ring-2 focus:ring-black/20 py-3 sm:py-4 text-sm sm:text-base"
                    />
                  </div>
                </div>
                <Select defaultValue="usd">
                  <SelectTrigger className="w-full bg-brand-bg-input border-brand-border focus:border-black focus:ring-2 focus:ring-black/20 h-11 sm:h-12 text-sm sm:text-base">
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="usd">💵 USD - US Dollar</SelectItem>
                    <SelectItem value="eur">💶 EUR - Euro</SelectItem>
                    <SelectItem value="gbp">💷 GBP - British Pound</SelectItem>
                    <SelectItem value="inr">💴 INR - Indian Rupee</SelectItem>
                    <SelectItem value="cad">🍁 CAD - Canadian Dollar</SelectItem>
                    <SelectItem value="aud">🇦🇺 AUD - Australian Dollar</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Roles */}
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center space-x-2 mb-3 sm:mb-4">
                  <BriefcaseIcon className="h-4 w-4 sm:h-5 sm:w-5 text-black" />
                  <Label className="text-sm sm:text-base font-semibold text-brand-text-dark">
                    What roles are you hiring for? <span className="text-brand-red">*</span>
                  </Label>
                </div>
                <p className="text-xs sm:text-sm text-brand-text-medium">
                  Select all the roles you're currently hiring for.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
                  {[
                    "Software Engineering",
                    "Frontend Development",
                    "Backend Development",
                    "Full Stack Development",
                    "Mobile Development",
                    "DevOps/SRE",
                    "Data Science",
                    "Machine Learning",
                    "Product Management",
                    "UI/UX Design",
                    "Quality Assurance",
                    "Project Management",
                    "Marketing",
                    "Sales",
                    "Customer Success",
                    "Human Resources"
                  ].map((role) => (
                    <button
                      key={role}
                      type="button"
                      onClick={() => {
                        if (roles.includes(role)) {
                          setRoles(roles.filter(r => r !== role))
                        } else {
                          setRoles([...roles, role])
                        }
                      }}
                      className={cn(
                        "px-2 sm:px-3 py-2 text-xs sm:text-sm font-medium rounded-lg border transition-all duration-200 text-left",
                        roles.includes(role)
                          ? "bg-black text-white border-black shadow-md"
                          : "bg-white text-brand-text-dark border-brand-border hover:border-gray-400 hover:shadow-sm"
                      )}
                    >
                      {role}
                    </button>
                  ))}
                </div>
              </div>

              {/* Locations */}
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center space-x-2 mb-3 sm:mb-4">
                  <MapPinIcon className="h-4 w-4 sm:h-5 sm:w-5 text-black" />
                  <Label className="text-sm sm:text-base font-semibold text-brand-text-dark">
                    Where are these positions located? <span className="text-brand-red">*</span>
                  </Label>
                </div>
                <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 sm:gap-3">
                  {[
                    "Remote",
                    "Hybrid",
                    "On-site",
                    "Noida",
                    "Delhi",
                    "Bangalore",
                    "Mumbai",
                    "Hyderabad",
                    "Chennai",
                    "Pune"
                  ].map((location) => (
                    <button
                      key={location}
                      type="button"
                      onClick={() => {
                        if (locations.includes(location)) {
                          setLocations(locations.filter(l => l !== location))
                        } else {
                          setLocations([...locations, location])
                        }
                      }}
                      className={cn(
                        "px-2 sm:px-3 py-2 text-xs sm:text-sm font-medium rounded-lg border transition-all duration-200 text-center",
                        locations.includes(location)
                          ? "bg-black text-white border-black shadow-md"
                          : "bg-white text-brand-text-dark border-brand-border hover:border-gray-400 hover:shadow-sm"
                      )}
                    >
                      {location}
                    </button>
                  ))}
                </div>
              </div>
            </>
          ) : (
            // Individual Preferences
            <>
              {/* Job Search Status */}
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center space-x-2 mb-3 sm:mb-4">
                  <UserIcon className="h-4 w-4 sm:h-5 sm:w-5 text-black" />
                  <Label className="text-sm sm:text-base font-semibold text-brand-text-dark">
                    What's your current job search status? <span className="text-brand-red">*</span>
                  </Label>
                </div>
                <div className="grid grid-cols-1 gap-3 sm:gap-4">
                  {[
                    {
                      value: "actively-looking",
                      label: "Actively Looking",
                      desc: "I'm actively applying and interviewing for new positions.",
                    },
                    {
                      value: "casually-browsing",
                      label: "Casually Browsing",
                      desc: "I'm open to opportunities but not actively applying.",
                    },
                    {
                      value: "not-looking",
                      label: "Not Looking",
                      desc: "I'm happy in my current role but want to stay updated.",
                    },
                  ].map((item) => (
                    <button
                      key={item.value}
                      type="button"
                      onClick={() => setJobStatus(item.value)}
                      className={cn(
                        "p-4 sm:p-5 border rounded-xl text-left transition-all duration-200",
                        jobStatus === item.value
                          ? "border-black ring-2 ring-black/20 bg-gray-50 shadow-md"
                          : "border-brand-border hover:border-gray-400 bg-white hover:shadow-sm",
                      )}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <span className="font-semibold text-brand-text-dark block mb-1 text-sm sm:text-base">{item.label}</span>
                          <p className="text-xs sm:text-sm text-brand-text-medium leading-relaxed">{item.desc}</p>
                        </div>
                        {jobStatus === item.value && (
                          <CheckIcon className="w-4 h-4 sm:w-5 sm:h-5 text-black flex-shrink-0 mt-0.5" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Desired Roles */}
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center space-x-2 mb-3 sm:mb-4">
                  <BriefcaseIcon className="h-4 w-4 sm:h-5 sm:w-5 text-black" />
                  <Label className="text-sm sm:text-base font-semibold text-brand-text-dark">
                    What roles are you interested in? <span className="text-brand-red">*</span>
                  </Label>
                </div>
                <p className="text-xs sm:text-sm text-brand-text-medium">
                  Select all the roles that interest you.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
                  {[
                    "Software Engineering",
                    "Frontend Development",
                    "Backend Development",
                    "Full Stack Development",
                    "Mobile Development",
                    "DevOps/SRE",
                    "Data Science",
                    "Machine Learning",
                    "Product Management",
                    "UI/UX Design",
                    "Quality Assurance",
                    "Project Management",
                    "Marketing",
                    "Sales",
                    "Customer Success",
                    "Human Resources"
                  ].map((role) => (
                    <button
                      key={role}
                      type="button"
                      onClick={() => {
                        if (desiredRoles.includes(role)) {
                          setDesiredRoles(desiredRoles.filter(r => r !== role))
                        } else {
                          setDesiredRoles([...desiredRoles, role])
                        }
                      }}
                      className={cn(
                        "px-2 sm:px-3 py-2 text-xs sm:text-sm font-medium rounded-lg border transition-all duration-200 text-left",
                        desiredRoles.includes(role)
                          ? "bg-black text-white border-black shadow-md"
                          : "bg-white text-brand-text-dark border-brand-border hover:border-gray-400 hover:shadow-sm"
                      )}
                    >
                      {role}
                    </button>
                  ))}
                </div>
              </div>

              {/* Work Arrangement */}
              <div className="space-y-3 sm:space-y-4">
                <Label className="block text-sm sm:text-base font-semibold text-brand-text-dark">
                  What's your preferred work arrangement? <span className="text-brand-red">*</span>
                </Label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
                  {[
                    { id: "remote", label: "Remote Only" },
                    { id: "hybrid", label: "Hybrid" },
                    { id: "onsite", label: "On-site Only" }
                  ].map((arrangement) => (
                    <ToggleButton
                      key={arrangement.id}
                      value={arrangement.id}
                      selectedValue={workArrangement}
                      onSelect={setWorkArrangement}
                    >
                      {arrangement.label}
                    </ToggleButton>
                  ))}
                </div>
              </div>

              {/* Salary Expectations */}
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center space-x-2 mb-2">
                  <DollarSignIcon className="h-4 w-4 sm:h-5 sm:w-5 text-black" />
                  <Label className="text-sm sm:text-base font-semibold text-brand-text-dark">
                    What are your salary expectations?
                  </Label>
                </div>
                <p className="text-xs sm:text-sm text-brand-text-medium bg-blue-50 p-3 rounded-lg border border-blue-200">
                  <strong>Note:</strong> This helps us show you relevant opportunities in your expected range
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="relative">
                    <DollarSignIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-3 w-3 sm:h-4 sm:w-4 text-brand-text-light" />
                    <Input
                      type="number"
                      placeholder="Min expected"
                      value={salaryExpectation.min}
                      onChange={(e) => setSalaryExpectation({...salaryExpectation, min: e.target.value})}
                      className="bg-brand-bg-input border-brand-border pl-8 sm:pl-9 focus:border-black focus:ring-2 focus:ring-black/20 py-3 sm:py-4 text-sm sm:text-base"
                    />
                  </div>
                  <div className="relative">
                    <DollarSignIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-3 w-3 sm:h-4 sm:w-4 text-brand-text-light" />
                    <Input
                      type="number"
                      placeholder="Max expected"
                      value={salaryExpectation.max}
                      onChange={(e) => setSalaryExpectation({...salaryExpectation, max: e.target.value})}
                      className="bg-brand-bg-input border-brand-border pl-8 sm:pl-9 focus:border-black focus:ring-2 focus:ring-black/20 py-3 sm:py-4 text-sm sm:text-base"
                    />
                  </div>
                </div>
                <Select value={salaryExpectation.currency} onValueChange={(value) => setSalaryExpectation({...salaryExpectation, currency: value})}>
                  <SelectTrigger className="w-full bg-brand-bg-input border-brand-border focus:border-black focus:ring-2 focus:ring-black/20 h-11 sm:h-12 text-sm sm:text-base">
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="usd">💵 USD - US Dollar</SelectItem>
                    <SelectItem value="eur">💶 EUR - Euro</SelectItem>
                    <SelectItem value="gbp">💷 GBP - British Pound</SelectItem>
                    <SelectItem value="inr">💴 INR - Indian Rupee</SelectItem>
                    <SelectItem value="cad">🍁 CAD - Canadian Dollar</SelectItem>
                    <SelectItem value="aud">🇦🇺 AUD - Australian Dollar</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Career Goals */}
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center space-x-2 mb-3 sm:mb-4">
                  <TargetIcon className="h-4 w-4 sm:h-5 sm:w-5 text-black" />
                  <Label className="text-sm sm:text-base font-semibold text-brand-text-dark">
                    What are your career goals?
                  </Label>
                </div>
                <p className="text-xs sm:text-sm text-brand-text-medium">
                  Select what you're looking for in your next opportunity.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                  {[
                    "Career Growth",
                    "Better Work-Life Balance",
                    "Higher Compensation",
                    "Learning New Technologies",
                    "Leadership Opportunities",
                    "Startup Experience",
                    "Enterprise Experience",
                    "Remote Work",
                    "Flexible Schedule",
                    "Skill Development"
                  ].map((goal) => (
                    <button
                      key={goal}
                      type="button"
                      onClick={() => {
                        if (careerGoals.includes(goal)) {
                          setCareerGoals(careerGoals.filter(g => g !== goal))
                        } else {
                          setCareerGoals([...careerGoals, goal])
                        }
                      }}
                      className={cn(
                        "px-3 py-2 text-xs sm:text-sm font-medium rounded-lg border transition-all duration-200 text-left",
                        careerGoals.includes(goal)
                          ? "bg-black text-white border-black shadow-md"
                          : "bg-white text-brand-text-dark border-brand-border hover:border-gray-400 hover:shadow-sm"
                      )}
                    >
                      {goal}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Continue Button */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-6 sm:pt-8 border-t border-brand-border">
            <Button
              type="button"
              variant="outline"
              className="flex-1 border-2 border-gray-300 bg-transparent text-gray-700 hover:bg-gray-50 focus:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 rounded-xl font-medium py-3 sm:py-4 text-sm sm:text-base"
              asChild
            >
              <Link href={`/onboarding/profile?type=${userType}`}>← Back to Profile</Link>
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-black hover:bg-gray-900 text-white font-medium rounded-xl py-3 sm:py-4 text-sm sm:text-base"
              asChild
            >
              <Link href={userType === 'individual' ? `/onboarding/culture?type=${userType}` : `/onboarding/done?type=${userType}`}>
                {userType === 'individual' ? 'Continue to Culture →' : 'Complete Setup →'}
              </Link>
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
