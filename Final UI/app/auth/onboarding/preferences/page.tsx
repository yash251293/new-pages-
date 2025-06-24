"use client" // This must be the very first line

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { useState, Suspense } from "react"
import { XIcon, CheckIcon, DollarSignIcon, BriefcaseIcon, MapPinIcon, BuildingIcon, UsersIcon, UserIcon, TargetIcon } from "lucide-react"
import Link from "next/link" // Make sure Link is actually used if imported
import { OnboardingStepper } from "@/components/onboarding-stepper"
import { useSearchParams } from "next/navigation"

// Imports for react-hook-form, zod, auth, etc.
import { useForm, SubmitHandler, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useAuth } from "@/context/AuthContext"
import { toast } from "sonner"
import { updateUserPreferences } from "@/lib/api"
import { useRouter } from "next/navigation"

// --- Zod Schema Definitions ---
const individualPreferencesSchema = z.object({
  jobStatus: z.string().optional(),
  desiredRoles: z.array(z.string()).optional(),
  workArrangement: z.string().optional(),
  experienceLevel: z.string().optional(),
  salaryExpectationMin: z.preprocess(val => {
    // Ensure val is a string before replacing, then parse
    const parsedVal = typeof val === 'string' ? val.replace(/[^0-9]/g, '') : val;
    const parsed = parseInt(String(parsedVal), 10); // Convert to string before parseInt
    return isNaN(parsed) ? undefined : parsed;
  }, z.number().positive().optional()),
  salaryExpectationMax: z.preprocess(val => {
    // Ensure val is a string before replacing, then parse
    const parsedVal = typeof val === 'string' ? val.replace(/[^0-9]/g, '') : val;
    const parsed = parseInt(String(parsedVal), 10); // Convert to string before parseInt
    return isNaN(parsed) ? undefined : parsed;
  }, z.number().positive().optional()),
  salaryExpectationCurrency: z.string().optional(),
  careerGoals: z.array(z.string()).optional(),
  locations: z.array(z.string()).optional(), // For individual user's preferred locations
});

const companyPreferencesSchema = z.object({
  hiringStatus: z.string().optional(),
  employmentType: z.string().optional(), // Current UI suggests single select. If multi-select, then z.array(z.string())
  roles: z.array(z.string()).optional(), // Roles company is hiring for
  companyLocations: z.array(z.string()).optional(), // Locations company is hiring in (renamed to avoid conflict)
  hiringSalaryMin: z.preprocess(val => {
    // Ensure val is a string before replacing, then parse
    const parsedVal = typeof val === 'string' ? val.replace(/[^0-9]/g, '') : val;
    const parsed = parseInt(String(parsedVal), 10); // Convert to string before parseInt
    return isNaN(parsed) ? undefined : parsed;
  }, z.number().positive().optional()),
  hiringSalaryMax: z.preprocess(val => {
    // Ensure val is a string before replacing, then parse
    const parsedVal = typeof val === 'string' ? val.replace(/[^0-9]/g, '') : val;
    const parsed = parseInt(String(parsedVal), 10); // Convert to string before parseInt
    return isNaN(parsed) ? undefined : parsed;
  }, z.number().positive().optional()),
  hiringSalaryCurrency: z.string().optional(),
});

type PreferencesFormValues = z.infer<typeof individualPreferencesSchema> | z.infer<typeof companyPreferencesSchema>;

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
      "px-4 py-3 text-sm font-medium rounded-lg border transition-all duration-200",
      selectedValue === value
        ? "bg-black text-white border-black shadow-md"
        : "bg-white text-brand-text-dark border-brand-border hover:border-gray-400 hover:shadow-sm",
      className
    )}
  >
    {children}
  </button>
)

function PreferencesContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user, token, refetchUser, isLoading: isAuthLoading } = useAuth();
  const queryUserType = searchParams.get('type') as 'individual' | 'company' | null;

  const [companySalary, setCompanySalary] = useState({ min: "", max: "", currency: "usd" });
  // Individual salary state - this was declared in the original, but only companySalary was used with useState.
  // The individual salary inputs use RHF directly, so this state might be redundant or for future use.
  // const [individualSalary, setIndividualSalary] = useState({ min: "", max: "", currency: "usd" });


  const finalUserType = user?.user_type || queryUserType || 'individual';
  const currentSchema = finalUserType === 'company' ? companyPreferencesSchema : individualPreferencesSchema;

  const { register, handleSubmit, control, formState: { errors, isSubmitting }, watch, setValue } = useForm<PreferencesFormValues>({
    resolver: zodResolver(currentSchema),
    defaultValues: {
      // Common defaults or type-specific ones can be set here or via useEffect
      jobStatus: "actively-looking",
      desiredRoles: ["Software Engineering"],
      workArrangement: "hybrid",
      experienceLevel: "mid-level",
      salaryExpectationCurrency: "usd",
      careerGoals: [],
      locations: ["Noida"], // Default for individual
      hiringStatus: "actively-hiring",
      employmentType: "full-time",
      roles: ["Software Engineering"], // Default for company
      companyLocations: ["Noida"], // Default for company
      hiringSalaryCurrency: "usd",
    },
  });

  if (isAuthLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading user data...</div>;
  }

  if (!user && !queryUserType) {
    toast.error("User information not available. Please ensure you are logged in.");
    if (typeof window !== 'undefined') {
      router.push('/auth/login');
    }
    return <div className="min-h-screen flex items-center justify-center">Redirecting to login...</div>;
  }

  const onSubmit: SubmitHandler<PreferencesFormValues> = async (data) => {
    if (!token) {
      toast.error("Authentication token not found. Please log in again.");
      return;
    }

    let payload: Partial<PreferencesFormValues> = {};
    if (finalUserType === 'individual') {
      // Destructure only relevant fields for individual
      const { hiringStatus, employmentType, roles, companyLocations, hiringSalaryMin, hiringSalaryMax, hiringSalaryCurrency, ...individualData } = data as z.infer<typeof individualPreferencesSchema>;
      payload = {
        jobStatus: individualData.jobStatus,
        desiredRoles: individualData.desiredRoles,
        workArrangement: individualData.workArrangement,
        experienceLevel: individualData.experienceLevel,
        salaryExpectationMin: individualData.salaryExpectationMin,
        salaryExpectationMax: individualData.salaryExpectationMax,
        salaryExpectationCurrency: individualData.salaryExpectationCurrency,
        careerGoals: individualData.careerGoals,
        locations: individualData.locations,
      };
    } else if (finalUserType === 'company') {
      // Destructure only relevant fields for company
      const { jobStatus, desiredRoles, workArrangement, experienceLevel, salaryExpectationMin, salaryExpectationMax, salaryExpectationCurrency, careerGoals, locations, ...companyData } = data as z.infer<typeof companyPreferencesSchema>;
      payload = {
        hiringStatus: companyData.hiringStatus,
        employmentType: companyData.employmentType,
        roles: companyData.roles,
        companyLocations: companyData.companyLocations,
        hiringSalaryMin: companyData.hiringSalaryMin,
        hiringSalaryMax: companyData.hiringSalaryMax,
        hiringSalaryCurrency: companyData.hiringSalaryCurrency,
      };
    }

    // Remove undefined properties from payload
    Object.keys(payload).forEach(key => (payload as any)[key] === undefined && delete (payload as any)[key]);

    try {
      await updateUserPreferences(payload, token);
      toast.success("Preferences saved successfully!");
      await refetchUser(); // Refresh user context data
      if (finalUserType === 'individual') {
        router.push(`/auth/onboarding/culture?type=${finalUserType}`);
      } else {
        router.push(`/auth/onboarding/done?type=${finalUserType}`);
      }
    } catch (error: any) {
      const errorMessage = error.data?.message || error.message || "Server error while updating preferences.";
      toast.error(`Failed to save preferences: ${errorMessage}`);
    }
  };

  return (
    <div className="min-h-screen bg-brand-bg-light-gray py-8">
      <OnboardingStepper />

      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg border border-gray-100">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-brand-text-dark mb-3">
            {finalUserType === 'company'
              ? 'What are you looking to hire?'
              : 'What are your job preferences?'
            }
          </h1>
          <p className="text-brand-text-medium leading-relaxed">
            {finalUserType === 'company'
              ? 'Help us understand your hiring needs to match you with the perfect candidates.'
              : 'Tell us about your career goals and preferences to find the perfect opportunities.'
            }
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
          {finalUserType === 'company' ? (
            <>
              {/* Hiring Status */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2 mb-4">
                  <BuildingIcon className="h-5 w-5 text-black" />
                  <Label className="text-base font-semibold text-brand-text-dark">
                    What's your current hiring status? <span className="text-brand-red">*</span>
                  </Label>
                </div>
                <Controller
                  name="hiringStatus"
                  control={control}
                  render={({ field }) => (
                    <div className="grid grid-cols-1 gap-4">
                      {[
                        { value: "actively-hiring", label: "Actively Hiring", desc: "We have open positions and are actively interviewing candidates." },
                        { value: "planning-to-hire", label: "Planning to Hire", desc: "We'll be hiring soon and want to start building our talent pipeline." },
                        { value: "not-hiring", label: "Not Hiring Right Now", desc: "We're not currently hiring but want to keep our company profile active." },
                      ].map((item) => (
                        <button
                          key={item.value}
                          type="button"
                          onClick={() => field.onChange(item.value)}
                          className={cn(
                            "p-5 border rounded-xl text-left transition-all duration-200",
                            field.value === item.value
                              ? "border-black ring-2 ring-black/20 bg-gray-50 shadow-md"
                              : "border-brand-border hover:border-gray-400 bg-white hover:shadow-sm",
                          )}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <span className="font-semibold text-brand-text-dark block mb-1">{item.label}</span>
                              <p className="text-sm text-brand-text-medium leading-relaxed">{item.desc}</p>
                            </div>
                            {field.value === item.value && (
                              <CheckIcon className="w-5 h-5 text-black flex-shrink-0 mt-0.5" />
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                />
                {(errors as any).hiringStatus && <p className="text-red-500 text-xs mt-1">{(errors as any).hiringStatus.message}</p>}
              </div>

              {/* Employment Type */}
              <div className="space-y-4">
                <Label className="block text-base font-semibold text-brand-text-dark">
                  What type of employment are you offering? <span className="text-brand-red">*</span>
                </Label>
                <p className="text-sm text-brand-text-medium">
                  Select the employment types you're currently hiring for.
                </p>
                <Controller
                  name="employmentType"
                  control={control}
                  render={({ field }) => (
                    <div className="flex flex-wrap gap-3">
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
                          selectedValue={field.value || ""}
                          onSelect={field.onChange}
                        >
                          {type.label}
                        </ToggleButton>
                      ))}
                    </div>
                  )}
                />
                {(errors as any).employmentType && <p className="text-red-500 text-xs mt-1">{(errors as any).employmentType.message}</p>}
              </div>

              {/* Salary Range (Company) */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2 mb-2">
                  <DollarSignIcon className="h-5 w-5 text-black" />
                  <Label htmlFor="salary" className="text-base font-semibold text-brand-text-dark">
                    What's your salary range for these positions?
                  </Label>
                </div>
                <p className="text-sm text-brand-text-medium bg-amber-50 p-3 rounded-lg border border-amber-200">
                  <strong>Note:</strong> This helps us match you with candidates in your budget range
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <DollarSignIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-text-light" />
                    <Input
                      id="minSalary"
                      type="number"
                      placeholder="Min salary"
                      {...register("hiringSalaryMin")}
                      value={companySalary.min} // Controlled by companySalary state
                      onChange={(e) => {
                        setCompanySalary(prev => ({ ...prev, min: e.target.value }));
                        setValue("hiringSalaryMin", parseInt(e.target.value) || undefined, { shouldValidate: true }); // Also update RHF
                      }}
                      className="bg-brand-bg-input border-brand-border pl-9 focus:border-black focus:ring-2 focus:ring-black/20"
                    />
                    {errors.hiringSalaryMin && <p className="text-red-500 text-xs mt-1">{errors.hiringSalaryMin.message}</p>}
                  </div>
                  <div className="relative">
                    <DollarSignIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-text-light" />
                    <Input
                      id="maxSalary"
                      type="number"
                      placeholder="Max salary"
                      {...register("hiringSalaryMax")}
                      value={companySalary.max} // Controlled by companySalary state
                      onChange={(e) => {
                        setCompanySalary(prev => ({ ...prev, max: e.target.value }));
                        setValue("hiringSalaryMax", parseInt(e.target.value) || undefined, { shouldValidate: true }); // Also update RHF
                      }}
                      className="bg-brand-bg-input border-brand-border pl-9 focus:border-black focus:ring-2 focus:ring-black/20"
                    />
                    {errors.hiringSalaryMax && <p className="text-red-500 text-xs mt-1">{errors.hiringSalaryMax.message}</p>}
                  </div>
                </div>
                <Controller
                  name="hiringSalaryCurrency"
                  control={control}
                  defaultValue="usd"
                  render={({ field }) => (
                    <Select
                      value={companySalary.currency} // Controlled by companySalary state
                      onValueChange={(currency) => {
                        setCompanySalary(prev => ({ ...prev, currency }));
                        field.onChange(currency); // Update RHF
                      }}
                    >
                      <SelectTrigger className="w-full bg-brand-bg-input border-brand-border focus:border-black focus:ring-2 focus:ring-black/20">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="usd">USD ($)</SelectItem>
                        <SelectItem value="eur">EUR (€)</SelectItem>
                        <SelectItem value="gbp">GBP (£)</SelectItem>
                        <SelectItem value="inr">INR (₹)</SelectItem>
                        <SelectItem value="cad">CAD ($)</SelectItem>
                        <SelectItem value="aud">AUD ($)</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.hiringSalaryCurrency && <p className="text-red-500 text-xs mt-1">{errors.hiringSalaryCurrency.message}</p>}
              </div>

              {/* Roles Hiring For */}
              <div className="space-y-4">
                <Label className="block text-base font-semibold text-brand-text-dark">
                  Which roles are you hiring for?
                </Label>
                <p className="text-sm text-brand-text-medium">
                  Select all roles you're currently hiring for. We'll match you with relevant candidates.
                </p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {(watch('roles') || []).map((role: string) => (
                    <span
                      key={role}
                      className="inline-flex items-center bg-black text-white text-sm font-medium px-4 py-2 rounded-full"
                    >
                      {role}
                      <button
                        type="button"
                        onClick={() => {
                          const currentRoles = watch('roles') || [];
                          setValue('roles', currentRoles.filter((item: string) => item !== role), { shouldValidate: true });
                        }}
                        className="ml-2 text-white hover:bg-gray-900 rounded-full p-0.5 transition-colors"
                      >
                        <XIcon className="h-3.5 w-3.5" />
                      </button>
                    </span>
                  ))}
                </div>
                <Controller
                  name="roles"
                  control={control}
                  render={({ field }) => (
                    <Select
                      onValueChange={(newRole) => {
                        const currentRoles = field.value || [];
                        if (newRole && !currentRoles.includes(newRole)) {
                          field.onChange([...currentRoles, newRole]);
                        }
                      }}
                    >
                      <SelectTrigger className="w-full bg-brand-bg-input border-brand-border focus:border-black focus:ring-2 focus:ring-black/20">
                        <SelectValue placeholder="Add a role you're hiring for" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Software Engineering">Software Engineering</SelectItem>
                        <SelectItem value="Product Management">Product Management</SelectItem>
                        <SelectItem value="Design & UX">Design & UX</SelectItem>
                        <SelectItem value="Data Science">Data Science & Analytics</SelectItem>
                        <SelectItem value="Marketing">Marketing & Growth</SelectItem>
                        <SelectItem value="Sales">Sales & Business Development</SelectItem>
                        <SelectItem value="Operations">Operations & Strategy</SelectItem>
                        <SelectItem value="Finance">Finance & Accounting</SelectItem>
                        <SelectItem value="Human Resources">Human Resources</SelectItem>
                        <SelectItem value="Customer Success">Customer Success</SelectItem>
                        <SelectItem value="DevOps">DevOps & Infrastructure</SelectItem>
                        <SelectItem value="Quality Assurance">Quality Assurance</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.roles && <p className="text-red-500 text-xs mt-1">{(errors.roles as any).message || (errors.roles as any).root?.message}</p>}
              </div>

              {/* Work Locations (Company) */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2 mb-2">
                  <MapPinIcon className="h-5 w-5 text-black" />
                  <Label className="block text-base font-semibold text-brand-text-dark">
                    Where are these positions located?
                  </Label>
                </div>
                <p className="text-sm text-brand-text-medium">
                  Add all locations where you're hiring. Include remote if you offer it.
                </p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {(watch('companyLocations') || []).map((location: string) => (
                    <span
                      key={location}
                      className="inline-flex items-center bg-gray-100 text-gray-800 text-sm font-medium px-4 py-2 rounded-full"
                    >
                      {location}
                      <button
                        type="button"
                        onClick={() => {
                          const currentCompanyLocations = watch('companyLocations') || [];
                          setValue('companyLocations', currentCompanyLocations.filter((item: string) => item !== location), { shouldValidate: true });
                        }}
                        className="ml-2 text-gray-600 hover:bg-gray-200 rounded-full p-0.5 transition-colors"
                      >
                        <XIcon className="h-3.5 w-3.5" />
                      </button>
                    </span>
                  ))}
                </div>
                <Controller
                  name="companyLocations"
                  control={control}
                  render={({ field }) => (
                    <Select
                      onValueChange={(newLocation) => {
                        const currentCompanyLocations = field.value || [];
                        if (newLocation && !currentCompanyLocations.includes(newLocation)) {
                          field.onChange([...currentCompanyLocations, newLocation]);
                        }
                      }}
                    >
                      <SelectTrigger className="w-full bg-brand-bg-input border-brand-border focus:border-black focus:ring-2 focus:ring-black/20">
                        <SelectValue placeholder="Add a location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Remote">🌍 Remote</SelectItem>
                        <SelectItem value="Hybrid">🏢 Hybrid</SelectItem>
                        <SelectItem value="San Francisco, CA">San Francisco, CA</SelectItem>
                        <SelectItem value="New York, NY">New York, NY</SelectItem>
                        <SelectItem value="Noida, India">Noida, India</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.companyLocations && <p className="text-red-500 text-xs mt-1">{(errors.companyLocations as any).message || (errors.companyLocations as any).root?.message}</p>}
              </div>
            </>
          ) : (
            // Individual Preferences
            <>
              {/* Job Search Status */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2 mb-4">
                  <UserIcon className="h-5 w-5 text-black" />
                  <Label className="text-base font-semibold text-brand-text-dark">
                    What's your current job search status? <span className="text-brand-red">*</span>
                  </Label>
                </div>
                <Controller
                  name="jobStatus"
                  control={control}
                  render={({ field }) => (
                    <div className="grid grid-cols-1 gap-4">
                      {[
                        { value: "actively-looking", label: "Actively Looking", desc: "I'm actively applying and interviewing for new opportunities." },
                        { value: "open-to-opportunities", label: "Open to Opportunities", desc: "I'm not actively searching but open to the right opportunity." },
                        { value: "exploring", label: "Just Exploring", desc: "I'm researching and exploring what's available in the market." },
                      ].map((item) => (
                        <button
                          key={item.value}
                          type="button"
                          onClick={() => field.onChange(item.value)}
                          className={cn(
                            "p-5 border rounded-xl text-left transition-all duration-200",
                            field.value === item.value
                              ? "border-black ring-2 ring-black/20 bg-gray-50 shadow-md"
                              : "border-brand-border hover:border-gray-400 bg-white hover:shadow-sm",
                          )}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <span className="font-semibold text-brand-text-dark block mb-1">{item.label}</span>
                              <p className="text-sm text-brand-text-medium leading-relaxed">{item.desc}</p>
                            </div>
                            {field.value === item.value && (
                              <CheckIcon className="w-5 h-5 text-black flex-shrink-0 mt-0.5" />
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                />
                {errors.jobStatus && <p className="text-red-500 text-xs mt-1">{errors.jobStatus.message}</p>}
              </div>

              {/* Desired Roles (Individual) */}
              <div className="space-y-4">
                <Label className="block text-base font-semibold text-brand-text-dark">
                  What type of roles are you interested in? <span className="text-brand-red">*</span>
                </Label>
                <p className="text-sm text-brand-text-medium">
                  Select all the roles you'd be interested in applying for.
                </p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {(watch('desiredRoles') || []).map((role: string) => (
                    <span
                      key={role}
                      className="inline-flex items-center bg-black text-white text-sm font-medium px-4 py-2 rounded-full"
                    >
                      {role}
                      <button
                        type="button"
                        onClick={() => {
                          const currentDesiredRoles = watch('desiredRoles') || [];
                          setValue('desiredRoles', currentDesiredRoles.filter((item: string) => item !== role), { shouldValidate: true });
                        }}
                        className="ml-2 text-white hover:bg-gray-900 rounded-full p-0.5 transition-colors"
                      >
                        <XIcon className="h-3.5 w-3.5" />
                      </button>
                    </span>
                  ))}
                </div>
                <Controller
                  name="desiredRoles"
                  control={control}
                  render={({ field }) => (
                    <Select
                      onValueChange={(newRole) => {
                        const currentDesiredRoles = field.value || [];
                        if (newRole && !currentDesiredRoles.includes(newRole)) {
                          field.onChange([...currentDesiredRoles, newRole]);
                        }
                      }}
                    >
                      <SelectTrigger className="w-full bg-brand-bg-input border-brand-border focus:border-black focus:ring-2 focus:ring-black/20">
                        <SelectValue placeholder="Add a role you're interested in" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Software Engineering">Software Engineering</SelectItem>
                        <SelectItem value="Frontend Development">Frontend Development</SelectItem>
                        <SelectItem value="Quality Assurance">Quality Assurance</SelectItem>
                        {/* Add other role options here */}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.desiredRoles && <p className="text-red-500 text-xs mt-1">{(errors.desiredRoles as any).message || (errors.desiredRoles as any).root?.message}</p>}
              </div>

              {/* Work Arrangement (Individual) */}
              <div className="space-y-4">
                <Label className="block text-base font-semibold text-brand-text-dark">
                  What's your preferred work arrangement? <span className="text-brand-red">*</span>
                </Label>
                <Controller
                  name="workArrangement"
                  control={control}
                  render={({ field }) => (
                    <div className="flex flex-wrap gap-3">
                      {[
                        { id: "remote", label: "Remote Only" },
                        { id: "hybrid", label: "Hybrid (2-3 days office)" },
                        { id: "in-office", label: "In-Office" },
                        { id: "flexible", label: "Flexible/Open to All" }
                      ].map((arrangement) => (
                        <ToggleButton
                          key={arrangement.id}
                          value={arrangement.id}
                          selectedValue={field.value || ""}
                          onSelect={field.onChange}
                        >
                          {arrangement.label}
                        </ToggleButton>
                      ))}
                    </div>
                  )}
                />
                {errors.workArrangement && <p className="text-red-500 text-xs mt-1">{errors.workArrangement.message}</p>}
              </div>

              {/* Experience Level (Individual) */}
              <div className="space-y-4">
                <Label className="block text-base font-semibold text-brand-text-dark">
                  What level of positions are you targeting? <span className="text-brand-red">*</span>
                </Label>
                <Controller
                  name="experienceLevel"
                  control={control}
                  render={({ field }) => (
                    <div className="flex flex-wrap gap-3">
                      {[
                        { id: "entry-level", label: "Entry Level (0-2 years)" },
                        { id: "mid-level", label: "Mid Level (3-5 years)" },
                        { id: "senior-level", label: "Senior Level (6-8 years)" },
                        { id: "lead-level", label: "Lead Level (9+ years)" },
                        { id: "executive", label: "Executive/C-Level" }
                      ].map((level) => (
                        <ToggleButton
                          key={level.id}
                          value={level.id}
                          selectedValue={field.value || ""}
                          onSelect={field.onChange}
                        >
                          {level.label}
                        </ToggleButton>
                      ))}
                    </div>
                  )}
                />
                {errors.experienceLevel && <p className="text-red-500 text-xs mt-1">{errors.experienceLevel.message}</p>}
              </div>

              {/* Salary Expectations (Individual) */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2 mb-2">
                  <DollarSignIcon className="h-5 w-5 text-black" />
                  <Label className="text-base font-semibold text-brand-text-dark">
                    What are your salary expectations?
                  </Label>
                </div>
                <p className="text-sm text-brand-text-medium bg-blue-50 p-3 rounded-lg border border-blue-200">
                  <strong>💡 Tip:</strong> Being transparent about salary helps match you with roles in your desired range
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <DollarSignIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-text-light" />
                    <Input
                      type="number"
                      placeholder="Min expected"
                      {...register("salaryExpectationMin")}
                      className="bg-brand-bg-input border-brand-border pl-9 focus:border-black focus:ring-2 focus:ring-black/20"
                    />
                    {errors.salaryExpectationMin && <p className="text-red-500 text-xs mt-1">{errors.salaryExpectationMin.message}</p>}
                  </div>
                  <div className="relative">
                    <DollarSignIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-text-light" />
                    <Input
                      type="number"
                      placeholder="Max expected"
                      {...register("salaryExpectationMax")}
                      className="bg-brand-bg-input border-brand-border pl-9 focus:border-black focus:ring-2 focus:ring-black/20"
                    />
                    {errors.salaryExpectationMax && <p className="text-red-500 text-xs mt-1">{errors.salaryExpectationMax.message}</p>}
                  </div>
                </div>
                <Controller
                  name="salaryExpectationCurrency"
                  control={control}
                  defaultValue="usd"
                  render={({ field }) => (
                    <Select value={field.value || "usd"} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full bg-brand-bg-input border-brand-border focus:border-black focus:ring-2 focus:ring-black/20">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="usd">USD ($) - Annual</SelectItem>
                        <SelectItem value="eur">EUR (€) - Annual</SelectItem>
                        <SelectItem value="gbp">GBP (£) - Annual</SelectItem>
                        <SelectItem value="inr">INR (₹) - Annual</SelectItem>
                        <SelectItem value="cad">CAD ($) - Annual</SelectItem>
                        <SelectItem value="aud">AUD ($) - Annual</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.salaryExpectationCurrency && <p className="text-red-500 text-xs mt-1">{errors.salaryExpectationCurrency.message}</p>}
              </div>

              {/* Career Goals (Individual) */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2 mb-2">
                  <TargetIcon className="h-5 w-5 text-black" />
                  <Label className="block text-base font-semibold text-brand-text-dark">
                    What are your career goals?
                  </Label>
                </div>
                <p className="text-sm text-brand-text-medium">
                  Select what matters most to you in your next role.
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    "Career Growth",
                    "Work-Life Balance",
                    "High Compensation",
                    "Learning New Technologies",
                    "Leadership Opportunities",
                    "Startup Environment",
                    "Established Company",
                    "Remote Work",
                    "Impactful Work",
                    "Team Collaboration",
                    "Innovation & Creativity",
                    "Job Security"
                  ].map((goal) => {
                    const currentGoals = watch('careerGoals') || [];
                    const isSelected = currentGoals.includes(goal);
                    return (
                      <button
                        key={goal}
                        type="button"
                        onClick={() => {
                          const updatedGoals = isSelected
                            ? currentGoals.filter(g => g !== goal)
                            : [...currentGoals, goal];
                          setValue('careerGoals', updatedGoals, { shouldValidate: true });
                        }}
                        className={cn(
                          "p-3 text-sm font-medium rounded-lg border transition-all duration-200 text-left",
                          isSelected
                            ? "bg-black text-white border-black"
                            : "bg-white text-brand-text-dark border-brand-border hover:border-gray-400"
                        )}
                      >
                        {goal}
                      </button>
                    );
                  })}
                </div>
                {errors.careerGoals && <p className="text-red-500 text-xs mt-1">{(errors.careerGoals as any).message || (errors.careerGoals as any).root?.message}</p>}
              </div>

              {/* Preferred Locations (Individual) */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2 mb-2">
                  <MapPinIcon className="h-5 w-5 text-black" />
                  <Label className="block text-base font-semibold text-brand-text-dark">
                    Where are you open to working?
                  </Label>
                </div>
                <p className="text-sm text-brand-text-medium">
                  Select all locations you're willing to work in or relocate to.
                </p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {(watch('locations') || []).map((location: string) => (
                    <span
                      key={location}
                      className="inline-flex items-center bg-gray-100 text-gray-800 text-sm font-medium px-4 py-2 rounded-full"
                    >
                      {location}
                      <button
                        type="button"
                        onClick={() => {
                          const currentLocations = watch('locations') || [];
                          setValue('locations', currentLocations.filter((item: string) => item !== location), { shouldValidate: true });
                        }}
                        className="ml-2 text-gray-600 hover:bg-gray-200 rounded-full p-0.5 transition-colors"
                      >
                        <XIcon className="h-3.5 w-3.5" />
                      </button>
                    </span>
                  ))}
                </div>
                <Controller
                  name="locations" // For Individual
                  control={control}
                  render={({ field }) => (
                    <Select
                      onValueChange={(newLocation) => {
                        const currentLocations = field.value || [];
                        if (newLocation && !currentLocations.includes(newLocation)) {
                          field.onChange([...currentLocations, newLocation]);
                        }
                      }}
                    >
                      <SelectTrigger className="w-full bg-brand-bg-input border-brand-border focus:border-black focus:ring-2 focus:ring-black/20">
                        <SelectValue placeholder="Add a preferred location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Remote">🌍 Remote (Anywhere)</SelectItem>
                        <SelectItem value="San Francisco, CA">San Francisco, CA</SelectItem>
                        <SelectItem value="New York, NY">New York, NY</SelectItem>
                        <SelectItem value="Noida, India">Noida, India</SelectItem>
                        {/* Add other location options here */}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.locations && <p className="text-red-500 text-xs mt-1">{(errors.locations as any).message || (errors.locations as any).root?.message}</p>}
              </div>
            </>
          )}

          <div className="pt-6">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-black hover:bg-gray-900 text-white py-3 font-medium text-base rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
            >
              {isSubmitting ? "Saving..." : (finalUserType === 'individual' ? 'Continue to Culture Fit →' : 'Complete Setup →')}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

// Wrap PreferencesContent in a default export component for the page
export default function Page() {
  return (
    <Suspense fallback={<div>Loading preferences...</div>}>
      <PreferencesContent />
    </Suspense>
  );
}