"use client";

import { useEffect, useState } from "react"; // Added useEffect
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { SearchIcon, XIcon, MapPinIcon, BuildingIcon, LinkIcon, BriefcaseIcon, UserIcon, GraduationCapIcon } from "lucide-react"; // Removed UsersIcon as it's not used
import { OnboardingStepper } from "@/components/onboarding-stepper";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler, Controller } from "react-hook-form"; // Added Controller
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { updateUserProfile } from "@/lib/api";

// --- Zod Schema Definitions ---
const commonProfileSchema = z.object({
  location: z.string().optional(), // Simplified for now, was a custom component
  linkedin_url: z.string().url({ message: "Invalid LinkedIn URL, e.g. https://linkedin.com/in/yourprofile" }).optional().or(z.literal('')),
  website_url: z.string().url({ message: "Invalid website URL, e.g. https://example.com" }).optional().or(z.literal('')),
  bio: z.string().max(1000, "Bio should not exceed 1000 characters.").optional(),
});

const individualProfileSchema = commonProfileSchema.extend({
  full_name: z.string().min(1, "Full name is required."), // From users table
  professional_title: z.string().min(1, "Professional title is required.").optional(), // Made optional for now
  years_of_experience: z.string().optional(),
  job_function: z.string().optional(),
  key_skills: z.string().optional(), // Comma-separated
  education_level: z.string().optional(),
  field_of_study: z.string().optional(),
  institution: z.string().optional(),
  industry: z.string().optional(), // Added industry field for individuals
});

const companyProfileSchema = commonProfileSchema.extend({
  company_name: z.string().min(1, "Company name is required."), // From users table
  industry: z.string().optional(), // From users table
  company_size: z.string().optional(), // From users table
  company_type: z.string().optional(),
  tech_stack: z.string().optional(), // Comma-separated
});

type IndividualProfileValues = z.infer<typeof individualProfileSchema>;
type CompanyProfileValues = z.infer<typeof companyProfileSchema>;
type ProfileFormValues = IndividualProfileValues | CompanyProfileValues;


export default function ProfilePage() {
  const { user, token, isLoading: isAuthLoading, refetchUser } = useAuth(); // Hook 1
  const router = useRouter(); // Hook 2

  // Determine userType for schema selection.
  // User object might be initially undefined while isAuthLoading is true.
  const userType = user?.user_type;

  // Define currentSchema based on userType.
  // Provide a fallback to individualProfileSchema if userType is initially undefined.
  // This ensures useForm always receives a valid schema.
  const currentSchema = userType === 'company' ? companyProfileSchema : individualProfileSchema;

  const { register, handleSubmit, control, formState: { errors, isSubmitting }, reset } = useForm<ProfileFormValues>({
    resolver: zodResolver(currentSchema), // currentSchema will be defined
    defaultValues: {
      // Initial default values can be empty or based on a general structure.
      // The useEffect below will populate them once 'user' data is available.
      full_name: "",
      company_name: "",
      industry: "",
      company_size: "",
      location: "",
      linkedin_url: "",
      website_url: "",
      bio: "",
      professional_title: "",
      years_of_experience: "",
      job_function: "",
      key_skills: "",
      education_level: "",
      field_of_study: "",
      institution: "",
      company_type: "",
      tech_stack: "",
    },
  }); // Hook 3

  // useEffect to reset form with user-specific default values when user data changes or becomes available.
  useEffect(() => {
    if (user) { // user object is available
      const userSpecificType = user.user_type; // Use user.user_type directly from the available user object
      const defaultVals = {
        full_name: userSpecificType === 'individual' ? user.full_name || "" : undefined,
        company_name: userSpecificType === 'company' ? user.company_name || "" : undefined,
        industry: userSpecificType === 'company' ? user.industry || "" : undefined,
        company_size: userSpecificType === 'company' ? user.company_size || "" : undefined,
        location: user.profile?.location || "",
        linkedin_url: user.profile?.linkedin_url || "",
        website_url: user.profile?.website_url || "",
        bio: user.profile?.bio || "",
        professional_title: userSpecificType === 'individual' ? user.profile?.professional_title || "" : undefined,
        years_of_experience: userSpecificType === 'individual' ? user.profile?.years_of_experience || "" : undefined,
        job_function: userSpecificType === 'individual' ? user.profile?.job_function || "" : undefined,
        key_skills: userSpecificType === 'individual' ? user.profile?.key_skills || "" : undefined,
        education_level: userSpecificType === 'individual' ? user.profile?.education_level || "" : undefined,
        field_of_study: userSpecificType === 'individual' ? user.profile?.field_of_study || "" : undefined,
        institution: userSpecificType === 'individual' ? user.profile?.institution || "" : undefined,
        company_type: userSpecificType === 'company' ? user.profile?.company_type || "" : undefined,
        tech_stack: userSpecificType === 'company' ? user.profile?.tech_stack || "" : undefined,
      };
      reset(defaultVals);
    }
  }, [user, reset]); // userType (derived from user) is implicitly handled by user dependency. Reset is stable.

  // Conditional returns *after* all hooks have been called.
  if (isAuthLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading authentication details...</div>;
  }

  // If user is not available (e.g. not logged in) or user_type is missing after loading.
  if (!user || !user.user_type) { // Check user.user_type directly
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="mb-4">User not found or user type not determined. Please log in.</p>
        <Button onClick={() => router.push('/auth/login')}>Go to Login</Button>
      </div>
    );
  }

  // The actual userType for rendering the form, derived from the now-guaranteed 'user' object.
  const finalUserType = user.user_type;


  const onSubmit: SubmitHandler<ProfileFormValues> = async (data) => {
    if (!token) {
      toast.error("Authentication token not found. Please log in again.");
      return;
    }
    try {
      // Ensure only relevant fields for the user type are sent
      let payload: any = {};
      if (finalUserType === 'individual') { // Use finalUserType for logic
        const individualData = data as IndividualProfileValues;
        payload = {
          location: individualData.location,
          linkedin_url: individualData.linkedin_url,
          website_url: individualData.website_url,
          bio: individualData.bio,
          full_name: individualData.full_name,
          professional_title: individualData.professional_title,
          years_of_experience: individualData.years_of_experience,
          job_function: individualData.job_function,
          key_skills: individualData.key_skills,
          education_level: individualData.education_level,
          field_of_study: individualData.field_of_study,
          institution: individualData.institution,
        };
      } else { // company
        const companyData = data as CompanyProfileValues;
        payload = {
          location: companyData.location,
          linkedin_url: companyData.linkedin_url,
          website_url: companyData.website_url,
          bio: companyData.bio,
          company_name: companyData.company_name,
          industry: companyData.industry,
          company_size: companyData.company_size,
          company_type: companyData.company_type,
          tech_stack: companyData.tech_stack,
        };
      }

      await updateUserProfile(payload, token); // API call

      // If updateUserProfile is successful, then do these:
      toast.success("Profile updated successfully!");
      await refetchUser(); // Refetch user data to update context
      router.push(`/auth/onboarding/preferences`);

    } catch (error: any) { // This single catch handles errors from payload logic OR updateUserProfile
      toast.error("Failed to update profile: " + (error.data?.message || error.message));
    }
  };

  return (
    <div className="min-h-screen bg-brand-bg-light-gray py-8">
      <OnboardingStepper />
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg border border-gray-100 mb-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-black to-gray-800 rounded-2xl shadow-lg mb-4">
            {finalUserType === 'company' ? ( // Use finalUserType for rendering
              <BuildingIcon className="w-8 h-8 text-white" />
            ) : (
              <UserIcon className="w-8 h-8 text-white" />
            )}
          </div>
          <h1 className="text-3xl font-bold text-brand-text-dark mb-3">
            {finalUserType === 'company' // Use finalUserType for rendering
              ? 'Tell us about your company'
              : 'Tell us about yourself'
            }
          </h1>
          <p className="text-brand-text-medium leading-relaxed">
            {finalUserType === 'company' // Use finalUserType for rendering
              ? 'Share your company details to help us connect you with the right talent and opportunities.'
              : 'Share your professional details to help us match you with amazing opportunities and connections.'
            }
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
          {/* Location Section - Simplified to a single text input for now */}
          <div className="space-y-5">
            <div className="flex items-center space-x-2 mb-3">
              <MapPinIcon className="h-5 w-5 text-black" />
              <Label htmlFor="location" className="text-base font-semibold text-brand-text-dark">
                {finalUserType === 'company' // Use finalUserType for rendering
                  ? 'Where is your company headquartered?'
                  : 'Where are you located?'
                } {/* Optional field, so no red star for now unless schema changes */}
              </Label>
            </div>
            <Input
              id="location"
              placeholder="e.g. San Francisco, CA or Remote"
              {...register("location")}
              className="bg-brand-bg-input border-brand-border placeholder-brand-text-light focus:border-black focus:ring-2 focus:ring-black/20 pl-3"
            />
            {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location.message}</p>}
          </div>

          {/* Bio Section (Common to both) */}
          <div className="border-t border-brand-border pt-8 space-y-6">
            <div className="flex items-center space-x-2 mb-6">
              <UserIcon className="h-5 w-5 text-black" />
              <h2 className="text-xl font-semibold text-brand-text-dark">
                {finalUserType === 'company' ? 'Company Description' : 'Your Bio'} {/* Use finalUserType for rendering */}
              </h2>
            </div>
            <div>
              <Label htmlFor="bio" className="block text-base font-semibold text-brand-text-dark mb-3">
                 {finalUserType === 'company' ? 'Tell us about your company...' : 'Write a short bio...'} {/* Use finalUserType for rendering */}
              </Label>
              <Textarea
                id="bio"
                placeholder={finalUserType === 'company' ? 'Describe your company mission, values, and culture' : 'Share a bit about your professional journey, interests, or what you are looking for'}
                {...register("bio")}
                className="bg-brand-bg-input border-brand-border focus:border-black focus:ring-2 focus:ring-black/20 min-h-[120px]"
              />
              {errors.bio && <p className="text-red-500 text-xs mt-1">{errors.bio.message}</p>}
            </div>
          </div>

          {finalUserType === 'company' ? ( // Use finalUserType for rendering
            // Company Profile Sections
            <>
              {/* Company Details Section */}
              <div className="border-t border-brand-border pt-8 space-y-6">
                <div className="flex items-center space-x-2 mb-6">
                  <BuildingIcon className="h-5 w-5 text-black" />
                  <h2 className="text-xl font-semibold text-brand-text-dark">Company Information</h2>
                </div>
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="company_name" className="block text-base font-semibold text-brand-text-dark mb-3">
                      Company Name <span className="text-brand-red">*</span>
                    </Label>
                    <Input
                      id="company_name"
                      placeholder="Your Company Name"
                      {...register("company_name")}
                      className="mt-1 bg-brand-bg-input border-brand-border placeholder-brand-text-light focus:border-black focus:ring-1 focus:ring-black/20 py-3 px-3 text-base h-12"
                    />
                    {(errors as any).company_name && <p className="text-red-500 text-xs mt-1">{(errors as any).company_name?.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="company_type" className="block text-base font-semibold text-brand-text-dark mb-3">
                      What type of company are you? {/* Optional based on schema */}
                    </Label>
                    <Controller
                      name="company_type"
                      control={control}
                      render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value || ""} >
                          <SelectTrigger className="w-full bg-brand-bg-input border-brand-border focus:border-black focus:ring-2 focus:ring-black/20 h-12">
                            <SelectValue placeholder="Select company type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="startup">🚀 Startup</SelectItem>
                            <SelectItem value="enterprise">🏢 Enterprise</SelectItem>
                            <SelectItem value="agency">🎯 Agency</SelectItem>
                            <SelectItem value="nonprofit">💝 Non-Profit</SelectItem>
                            <SelectItem value="government">🏛️ Government</SelectItem>
                            <SelectItem value="other_company_type">🔧 Other</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {(errors as any).company_type && <p className="text-red-500 text-xs mt-1">{(errors as any).company_type?.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="company_size" className="block text-base font-semibold text-brand-text-dark mb-3">
                      Company Size {/* Optional based on schema, prefilled from users table */}
                    </Label>
                     <Controller
                      name="company_size"
                      control={control}
                      render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value || ""} >
                          <SelectTrigger className="w-full bg-brand-bg-input border-brand-border focus:border-black focus:ring-2 focus:ring-black/20 h-12">
                            <SelectValue placeholder="Select company size" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1-10">👥 1-10 employees</SelectItem>
                            <SelectItem value="11-50">👥 11-50 employees</SelectItem>
                            <SelectItem value="51-200">👥 51-200 employees</SelectItem>
                            <SelectItem value="201-500">👥 201-500 employees</SelectItem>
                            <SelectItem value="501-1000">👥 501-1000 employees</SelectItem>
                            <SelectItem value="1000+">👥 1000+ employees</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {(errors as any).company_size && <p className="text-red-500 text-xs mt-1">{(errors as any).company_size?.message}</p>}
                  </div>
                </div>
              </div>

              {/* Industry & Focus Section */}
              <div className="border-t border-brand-border pt-8 space-y-6">
                <div className="flex items-center space-x-2 mb-6">
                  <BriefcaseIcon className="h-5 w-5 text-black" />
                  <h2 className="text-xl font-semibold text-brand-text-dark">Industry & Focus</h2>
                </div>
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="industry" className="block text-base font-semibold text-brand-text-dark mb-3">
                      Primary Industry {/* Optional based on schema, prefilled from users table */}
                    </Label>
                    <Controller
                      name="industry"
                      control={control}
                      render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value || ""} >
                          <SelectTrigger className="w-full bg-brand-bg-input border-brand-border focus:border-black focus:ring-2 focus:ring-black/20 h-12">
                            <SelectValue placeholder="Select your industry" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="tech">💻 Technology</SelectItem>
                            <SelectItem value="finance">💰 Finance</SelectItem>
                            <SelectItem value="healthcare">🏥 Healthcare</SelectItem>
                            <SelectItem value="education">📚 Education</SelectItem>
                            <SelectItem value="retail">🛍️ Retail</SelectItem>
                            <SelectItem value="manufacturing">🏭 Manufacturing</SelectItem>
                            <SelectItem value="other_industry">🔧 Other</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {(errors as any).industry && <p className="text-red-500 text-xs mt-1">{(errors as any).industry?.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="tech_stack" className="block text-base font-semibold text-brand-text-dark mb-3">
                      Tech Stack (if applicable)
                    </Label>
                    <p className="text-sm text-brand-text-medium mb-4">
                      List the main technologies your company uses. (Comma-separated)
                    </p>
                    <Input
                      id="tech_stack"
                      placeholder="e.g., React, Node.js, Python, AWS"
                      {...register("tech_stack")}
                      className="bg-brand-bg-input border-brand-border focus:border-black focus:ring-2 focus:ring-black/20 h-12"
                    />
                    {(errors as any).tech_stack && <p className="text-red-500 text-xs mt-1">{(errors as any).tech_stack?.message}</p>}
                  </div>
                </div>
              </div>

              {/* Company Links Section */}
              <div className="border-t border-brand-border pt-8 space-y-6">
                <div className="flex items-center space-x-2 mb-6">
                  <LinkIcon className="h-5 w-5 text-black" />
                  <h2 className="text-xl font-semibold text-brand-text-dark">Company Presence</h2>
                </div>
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="website_url" className="block text-base font-semibold text-brand-text-dark mb-2">
                      Company Website
                    </Label>
                    <Input
                      id="website_url"
                      placeholder="https://yourcompany.com"
                      {...register("website_url")}
                      className="bg-brand-bg-input border-brand-border focus:border-black focus:ring-2 focus:ring-black/20 h-12"
                    />
                    {errors.website_url && <p className="text-red-500 text-xs mt-1">{errors.website_url.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="linkedin_url" className="block text-base font-semibold text-brand-text-dark mb-2">
                      LinkedIn Company Page
                    </Label>
                    <Input
                      id="linkedin_url"
                      placeholder="https://linkedin.com/company/yourcompany"
                      {...register("linkedin_url")}
                      className="bg-brand-bg-input border-brand-border focus:border-black focus:ring-2 focus:ring-black/20 h-12"
                    />
                    {errors.linkedin_url && <p className="text-red-500 text-xs mt-1">{errors.linkedin_url.message}</p>}
                  </div>
                </div>
              </div>
            </>
          ) : (
            // Individual Profile Sections
            <>
              {/* Personal Information Section */}
              <div className="border-t border-brand-border pt-8 space-y-6">
                <div className="flex items-center space-x-2 mb-6">
                  <UserIcon className="h-5 w-5 text-black" />
                  <h2 className="text-xl font-semibold text-brand-text-dark">Personal Information</h2>
                </div>

                <div className="space-y-6">
                  <div> {/* Changed from grid for full_name to be full width */}
                    <Label htmlFor="full_name" className="block text-base font-semibold text-brand-text-dark mb-3">
                      Full Name <span className="text-brand-red">*</span>
                    </Label>
                    <Input
                      id="full_name"
                      placeholder="e.g. John Doe"
                      {...register("full_name")}
                      className="bg-brand-bg-input border-brand-border focus:border-black focus:ring-2 focus:ring-black/20 h-12"
                    />
                    {(errors as any).full_name && <p className="text-red-500 text-xs mt-1">{(errors as any).full_name?.message}</p>}
                  </div>

                  <div>
                    <Label htmlFor="professional_title" className="block text-base font-semibold text-brand-text-dark mb-3">
                      Professional Title {/* Optional based on schema */}
                    </Label>
                    <Input
                      id="professional_title"
                      placeholder="e.g. Senior Software Engineer, Product Designer"
                      {...register("professional_title")}
                      className="bg-brand-bg-input border-brand-border focus:border-black focus:ring-2 focus:ring-black/20 h-12"
                    />
                    {(errors as any).professional_title && <p className="text-red-500 text-xs mt-1">{(errors as any).professional_title?.message}</p>}
                  </div>

                  <div>
                    <Label htmlFor="years_of_experience" className="block text-base font-semibold text-brand-text-dark mb-3">
                      Years of Professional Experience {/* Optional based on schema */}
                    </Label>
                    <Controller
                      name="years_of_experience"
                      control={control}
                      render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value || ""}>
                          <SelectTrigger className="w-full bg-brand-bg-input border-brand-border focus:border-black focus:ring-2 focus:ring-black/20 h-12">
                            <SelectValue placeholder="Select your experience level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0-1">🌱 0-1 years (Entry Level)</SelectItem>
                            <SelectItem value="2-3">📈 2-3 years (Junior)</SelectItem>
                            <SelectItem value="4-6">💼 4-6 years (Mid-Level)</SelectItem>
                            <SelectItem value="7-10">🚀 7-10 years (Senior)</SelectItem>
                            <SelectItem value="10+">⭐ 10+ years (Expert/Lead)</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {(errors as any).years_of_experience && <p className="text-red-500 text-xs mt-1">{(errors as any).years_of_experience?.message}</p>}
                  </div>
                </div>
              </div>

              {/* Professional Background Section */}
              <div className="border-t border-brand-border pt-8 space-y-6">
                <div className="flex items-center space-x-2 mb-6">
                  <BriefcaseIcon className="h-5 w-5 text-black" />
                  <h2 className="text-xl font-semibold text-brand-text-dark">Professional Background</h2>
                </div>

                <div className="space-y-6">
                  {/* Primary Industry for individual - using 'industry' from schema, but can rename if needed */}
                  <div>
                    <Label htmlFor="industry" className="block text-base font-semibold text-brand-text-dark mb-3">
                      Primary Industry {/* Optional based on schema */}
                    </Label>
                     <Controller
                      name="industry" // Assuming 'industry' is part of individual schema or added to common
                      control={control}
                      render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value || ""}>
                          <SelectTrigger className="w-full bg-brand-bg-input border-brand-border focus:border-black focus:ring-2 focus:ring-black/20 h-12">
                            <SelectValue placeholder="Select your primary industry" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="tech_individual">💻 Technology</SelectItem>
                            <SelectItem value="finance_individual">💰 Finance & Banking</SelectItem>
                            <SelectItem value="healthcare_individual">🏥 Healthcare</SelectItem>
                            <SelectItem value="education_individual">📚 Education</SelectItem>
                            <SelectItem value="retail_individual">🛍️ Retail & E-commerce</SelectItem>
                            <SelectItem value="manufacturing_individual">🏭 Manufacturing</SelectItem>
                            <SelectItem value="consulting_individual">💡 Consulting</SelectItem>
                            <SelectItem value="media_individual">📺 Media & Entertainment</SelectItem>
                            <SelectItem value="other_industry_individual">🔧 Other</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {(errors as any).industry && <p className="text-red-500 text-xs mt-1">{(errors as any).industry?.message}</p>}
                  </div>

                  <div>
                    <Label htmlFor="job_function" className="block text-base font-semibold text-brand-text-dark mb-3">
                      Job Function {/* Optional based on schema */}
                    </Label>
                    <Controller
                      name="job_function"
                      control={control}
                      render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value || ""}>
                          <SelectTrigger className="w-full bg-brand-bg-input border-brand-border focus:border-black focus:ring-2 focus:ring-black/20 h-12">
                            <SelectValue placeholder="Select your job function" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="engineering">⚙️ Engineering & Development</SelectItem>
                            <SelectItem value="design">🎨 Design & UX</SelectItem>
                            <SelectItem value="product">📱 Product Management</SelectItem>
                            <SelectItem value="marketing">📢 Marketing & Growth</SelectItem>
                            <SelectItem value="sales">💼 Sales & Business Development</SelectItem>
                            <SelectItem value="operations">📋 Operations & Strategy</SelectItem>
                            <SelectItem value="finance_operations">💰 Finance & Accounting</SelectItem> {/* Renamed value to avoid conflict */}
                            <SelectItem value="hr">👥 Human Resources</SelectItem>
                            <SelectItem value="other_job_function">🔧 Other</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {(errors as any).job_function && <p className="text-red-500 text-xs mt-1">{(errors as any).job_function?.message}</p>}
                  </div>

                  <div>
                    <Label htmlFor="key_skills" className="block text-base font-semibold text-brand-text-dark mb-3">
                      Key Skills & Technologies (Comma-separated)
                    </Label>
                    <Input
                      id="key_skills"
                      placeholder="e.g., JavaScript, React, Python, Data Analysis"
                      {...register("key_skills")}
                      className="bg-brand-bg-input border-brand-border focus:border-black focus:ring-2 focus:ring-black/20 h-12"
                    />
                    {(errors as any).key_skills && <p className="text-red-500 text-xs mt-1">{(errors as any).key_skills?.message}</p>}
                  </div>
                </div>
              </div>

              {/* Education Section */}
              <div className="border-t border-brand-border pt-8 space-y-6">
                <div className="flex items-center space-x-2 mb-6">
                  <GraduationCapIcon className="h-5 w-5 text-black" />
                  <h2 className="text-xl font-semibold text-brand-text-dark">Education</h2>
                </div>

                <div className="space-y-6">
                  <div>
                    <Label htmlFor="education_level" className="block text-base font-semibold text-brand-text-dark mb-3">
                      Highest Education Level {/* Optional based on schema */}
                    </Label>
                    <Controller
                      name="education_level"
                      control={control}
                      render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value || ""}>
                          <SelectTrigger className="w-full bg-brand-bg-input border-brand-border focus:border-black focus:ring-2 focus:ring-black/20 h-12">
                            <SelectValue placeholder="Select your education level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="high-school">🏫 High School</SelectItem>
                            <SelectItem value="associates">📜 Associate's Degree</SelectItem>
                            <SelectItem value="bachelors">🎓 Bachelor's Degree</SelectItem>
                            <SelectItem value="masters">🎖️ Master's Degree</SelectItem>
                            <SelectItem value="phd">👨‍🎓 PhD/Doctorate</SelectItem>
                            <SelectItem value="bootcamp">💻 Coding Bootcamp</SelectItem>
                            <SelectItem value="self-taught">📚 Self-Taught</SelectItem>
                            <SelectItem value="other_education">🔧 Other</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {(errors as any).education_level && <p className="text-red-500 text-xs mt-1">{(errors as any).education_level?.message}</p>}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="field_of_study" className="block text-base font-semibold text-brand-text-dark mb-3">
                        Field of Study
                      </Label>
                      <Input
                        id="field_of_study"
                        placeholder="e.g. Computer Science"
                        {...register("field_of_study")}
                        className="bg-brand-bg-input border-brand-border focus:border-black focus:ring-2 focus:ring-black/20 h-12"
                      />
                       {(errors as any).field_of_study && <p className="text-red-500 text-xs mt-1">{(errors as any).field_of_study?.message}</p>}
                    </div>
                    <div>
                      <Label htmlFor="institution" className="block text-base font-semibold text-brand-text-dark mb-3">
                        Institution
                      </Label>
                      <Input
                        id="institution"
                        placeholder="e.g. Stanford University"
                        {...register("institution")}
                        className="bg-brand-bg-input border-brand-border focus:border-black focus:ring-2 focus:ring-black/20 h-12"
                      />
                      {(errors as any).institution && <p className="text-red-500 text-xs mt-1">{(errors as any).institution?.message}</p>}
                    </div>
                  </div>
                </div>
              </div>
              {/* Links section (linkedin_url, website_url) is part of commonProfileSchema and handled by inputs in company section,
                  but should also be available for individuals. Adding them here explicitly for individual users. */}
              <div className="border-t border-brand-border pt-8 space-y-6">
                <div className="flex items-center space-x-2 mb-6">
                  <LinkIcon className="h-5 w-5 text-black" />
                  <h2 className="text-xl font-semibold text-brand-text-dark">Online Presence</h2>
                </div>
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="linkedin_url_individual" className="block text-base font-semibold text-brand-text-dark mb-2">
                      LinkedIn Profile URL
                    </Label>
                    <Input
                      id="linkedin_url_individual"
                      placeholder="https://linkedin.com/in/yourprofile"
                      {...register("linkedin_url")}
                      className="bg-brand-bg-input border-brand-border focus:border-black focus:ring-2 focus:ring-black/20 h-12"
                    />
                    {errors.linkedin_url && <p className="text-red-500 text-xs mt-1">{errors.linkedin_url.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="website_url_individual" className="block text-base font-semibold text-brand-text-dark mb-2">
                      Personal Website/Portfolio
                    </Label>
                    <Input
                      id="website_url_individual"
                      placeholder="https://yourportfolio.com"
                      {...register("website_url")}
                      className="bg-brand-bg-input border-brand-border focus:border-black focus:ring-2 focus:ring-black/20 h-12"
                    />
                    {errors.website_url && <p className="text-red-500 text-xs mt-1">{errors.website_url.message}</p>}
                  </div>
                </div>
              </div>
            </>
          )}

          <div className="pt-6">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-black hover:bg-gray-900 text-white py-3 font-medium text-base rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
            >
              {isSubmitting ? "Saving..." : "Save and Continue to Preferences →"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
