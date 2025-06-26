"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { MapPinIcon, BuildingIcon, LinkIcon, BriefcaseIcon, UserIcon, GraduationCapIcon, SearchIcon, XIcon } from "lucide-react";
import { OnboardingStepper } from "@/components/onboarding-stepper"; // Standard stepper
import Link from "next/link"; // For skip buttons

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { updateUserProfile } from "@/lib/api";

// --- Zod Schema Definitions (from existing functional page) ---
const commonProfileSchema = z.object({
  location: z.string().optional(),
  linkedin_url: z.string().url({ message: "Invalid LinkedIn URL, e.g. https://linkedin.com/in/yourprofile" }).optional().or(z.literal('')),
  website_url: z.string().url({ message: "Invalid website URL, e.g. https://example.com" }).optional().or(z.literal('')),
  // 'bio' will be used for 'Company Description' for companies and 'Your Bio' for individuals
  bio: z.string().max(1000, "Description/Bio should not exceed 1000 characters.").optional(),
});

const individualProfileSchema = commonProfileSchema.extend({
  full_name: z.string().min(1, "Full name is required."),
  professional_title: z.string().min(1, "Professional title is required.").optional(), // Retaining optional from functional
  years_of_experience: z.string().optional(),
  job_function: z.string().optional(),
  key_skills: z.string().optional(), // Comma-separated in standard, will be a textarea
  education_level: z.string().optional(), // This is a select in standard
  field_of_study: z.string().optional(), // This is an input in standard
  institution: z.string().optional(), // This is an input in standard
  industry: z.string().optional(),
});

const companyProfileSchema = commonProfileSchema.extend({
  company_name: z.string().min(1, "Company name is required."),
  industry: z.string().optional(),
  company_size: z.string().optional(),
  company_type: z.string().optional(),
  tech_stack: z.string().optional(), // Comma-separated in standard, will be a textarea
});

type IndividualProfileValues = z.infer<typeof individualProfileSchema>;
type CompanyProfileValues = z.infer<typeof companyProfileSchema>;
type ProfileFormValues = IndividualProfileValues | CompanyProfileValues;


export default function ProfilePage() {
  const { user, token, isLoading: isAuthLoading, refetchUser } = useAuth();
  const router = useRouter();

  const userTypeFromAuth = user?.user_type;
  const currentSchema = userTypeFromAuth === 'company' ? companyProfileSchema : individualProfileSchema;

  const { register, handleSubmit, control, formState: { errors, isSubmitting }, reset } = useForm<ProfileFormValues>({
    resolver: zodResolver(currentSchema),
    defaultValues: {
      full_name: "",
      company_name: "",
      industry: "",
      company_size: "",
      location: "",
      linkedin_url: "",
      website_url: "",
      bio: "", // Used for Company Description or Your Bio
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
  });

  useEffect(() => {
    if (user) {
      const userSpecificType = user.user_type;
      const defaultVals = {
        full_name: userSpecificType === 'individual' ? user.full_name || "" : undefined,
        company_name: userSpecificType === 'company' ? user.company_name || "" : undefined,
        industry: userSpecificType === 'company' ? user.industry || "" : (userSpecificType === 'individual' ? user.profile?.industry || "" : undefined),
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
  }, [user, reset]);

  if (isAuthLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading authentication details...</div>;
  }

  if (!user || !user.user_type) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="mb-4">User not found or user type not determined. Please log in.</p>
        <Button onClick={() => router.push('/auth/login')}>Go to Login</Button>
      </div>
    );
  }

  const finalUserType = user.user_type; // Use this for rendering

  const onSubmit: SubmitHandler<ProfileFormValues> = async (data) => {
    if (!token) {
      toast.error("Authentication token not found. Please log in again.");
      return;
    }
    try {
      let payload: any = {};
      if (finalUserType === 'individual') {
        const individualData = data as IndividualProfileValues;
        payload = {
          location: individualData.location,
          linkedin_url: individualData.linkedin_url,
          website_url: individualData.website_url,
          bio: individualData.bio, // Your Bio
          full_name: individualData.full_name,
          professional_title: individualData.professional_title,
          years_of_experience: individualData.years_of_experience,
          job_function: individualData.job_function,
          key_skills: individualData.key_skills,
          education_level: individualData.education_level,
          field_of_study: individualData.field_of_study,
          institution: individualData.institution,
          industry: individualData.industry,
        };
      } else { // company
        const companyData = data as CompanyProfileValues;
        payload = {
          location: companyData.location,
          linkedin_url: companyData.linkedin_url,
          website_url: companyData.website_url,
          bio: companyData.bio, // Company Description
          company_name: companyData.company_name,
          industry: companyData.industry,
          company_size: companyData.company_size,
          company_type: companyData.company_type,
          tech_stack: companyData.tech_stack,
        };
      }

      await updateUserProfile(payload, token);
      toast.success("Profile updated successfully!");
      await refetchUser();
      router.push(`/auth/onboarding/preferences`);
    } catch (error: any) {
      toast.error("Failed to update profile: " + (error.data?.message || error.message));
    }
  };

  return (
    // Adopted AI version's padding
    <div className="min-h-screen bg-brand-bg-light-gray py-4 sm:py-8 px-4">
      <OnboardingStepper /> {/* Standard Stepper */}
      {/* Adopted AI version's padding and relative class, removed mb-8 */}
      <div className="max-w-3xl mx-auto bg-white p-4 sm:p-6 lg:p-8 rounded-xl shadow-lg border border-gray-100 relative">
        {/* Skip Buttons from AI version */}
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
          {/* Navigate to standard preferences, userType from auth context */}
          <Link href={`/auth/onboarding/preferences`}>Skip</Link>
        </Button>

        {/* Header section styling from AI version */}
        <div className="text-center mb-6 sm:mb-8 mt-12 sm:mt-16">
          <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-black to-gray-800 rounded-2xl shadow-lg mb-3 sm:mb-4">
            {finalUserType === 'company' ? (
              <BuildingIcon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            ) : (
              <UserIcon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            )}
          </div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-brand-text-dark mb-2 sm:mb-3 px-2">
            {finalUserType === 'company'
              ? 'Tell us about your company'
              : 'Tell us about yourself'
            }
          </h1>
          <p className="text-sm sm:text-base text-brand-text-medium leading-relaxed px-2">
            {finalUserType === 'company'
              ? 'Share your company details to help us connect you with the right talent and opportunities.'
              : 'Share your details to help us connect you with the right opportunities and people.'
            }
          </p>
        </div>

        {/* Form spacing from AI version */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 sm:space-y-8 lg:space-y-10">
          {/* Location Section */}
          <div className="space-y-3 sm:space-y-4 lg:space-y-5">
            <div className="flex items-center space-x-2 mb-2 sm:mb-3">
              <MapPinIcon className="h-4 w-4 sm:h-5 sm:w-5 text-black" />
              <Label htmlFor="location" className="text-sm sm:text-base font-semibold text-brand-text-dark">
                {finalUserType === 'company'
                  ? 'Where is your company headquartered?'
                  : 'Where are you located?'
                } <span className="text-brand-red">*</span> {/* Assuming location becomes required, adjust schema if not */}
              </Label>
            </div>
            {/* Location Benefits box from AI version */}
            <div className="bg-gray-50 p-3 sm:p-4 rounded-lg border border-gray-200">
              <p className="text-xs sm:text-sm text-gray-700">
                <strong>💡 Location Benefits:</strong> {finalUserType === 'company'
                  ? 'Your company location helps us match you with local talent and understand your regional market presence.'
                  : 'Your location helps us find relevant job opportunities and connect you with companies in your area.'
                }
              </p>
            </div>
            <Input
              id="location"
              placeholder="e.g. San Francisco, CA or Remote" // Standard placeholder
              {...register("location")}
              // Styling from AI version (general input text/padding)
              className="bg-brand-bg-input border-brand-border placeholder-brand-text-light focus:border-black focus:ring-2 focus:ring-black/20 py-3 sm:py-4 px-3 text-sm sm:text-base"
            />
            {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location.message}</p>}
          </div>

          {/* Bio/Company Description Section (Common field: bio) */}
          {/* Styling adapted from AI version's section structure */}
          <div className="border-t border-brand-border pt-6 sm:pt-8 space-y-4 sm:space-y-6">
            <div className="flex items-center space-x-2 mb-4 sm:mb-6">
              <UserIcon className="h-4 w-4 sm:h-5 sm:w-5 text-black" />
              <h2 className="text-lg sm:text-xl font-semibold text-brand-text-dark">
                {finalUserType === 'company' ? 'Company Description' : 'Your Bio'}
              </h2>
            </div>
            <div>
              <Label htmlFor="bio" className="block text-sm sm:text-base font-semibold text-brand-text-dark mb-2 sm:mb-3">
                 {finalUserType === 'company' ? 'Tell us about your company...' : 'Write a short bio...'}
                 {finalUserType === 'company' && <span className="text-brand-red">*</span>} {/* Assuming company description is required */}
              </Label>
              {/* Helper text from AI version for Company Description */}
              {finalUserType === 'company' && (
                <p className="text-xs sm:text-sm text-brand-text-medium mb-3 sm:mb-4">
                  Tell us about your company's mission, values, and what makes you unique.
                </p>
              )}
              <Textarea
                id="bio" // Used for Company Description or Your Bio
                {...register("bio")}
                placeholder={finalUserType === 'company' ? 'Describe your company...' : 'Share a bit about your professional journey, interests, or what you are looking for'}
                // Styling from AI version's Textarea
                className="bg-brand-bg-input border-brand-border focus:border-black focus:ring-2 focus:ring-black/20 min-h-[100px] sm:min-h-[120px] text-sm sm:text-base"
              />
              {errors.bio && <p className="text-red-500 text-xs mt-1">{errors.bio.message}</p>}
            </div>
          </div>


          {finalUserType === 'company' ? (
            <>
              {/* Company Details Section */}
              <div className="border-t border-brand-border pt-6 sm:pt-8 space-y-4 sm:space-y-6">
                <div className="flex items-center space-x-2 mb-4 sm:mb-6">
                  <BuildingIcon className="h-4 w-4 sm:h-5 sm:w-5 text-black" />
                  <h2 className="text-lg sm:text-xl font-semibold text-brand-text-dark">Company Information</h2>
                </div>
                <div className="space-y-4 sm:space-y-6">
                  <div>
                    <Label htmlFor="company_name" className="block text-sm sm:text-base font-semibold text-brand-text-dark mb-2 sm:mb-3">
                      Company Name <span className="text-brand-red">*</span>
                    </Label>
                    <Input
                      id="company_name"
                      placeholder="Your Company Name"
                      {...register("company_name")}
                      className="bg-brand-bg-input border-brand-border placeholder-brand-text-light focus:border-black focus:ring-1 focus:ring-black/20 py-3 sm:py-4 px-3 text-sm sm:text-base h-11 sm:h-12"
                    />
                    {(errors as any).company_name && <p className="text-red-500 text-xs mt-1">{(errors as any).company_name?.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="company_type" className="block text-sm sm:text-base font-semibold text-brand-text-dark mb-2 sm:mb-3">
                      What type of company are you? <span className="text-brand-red">*</span>
                    </Label>
                    <Controller
                      name="company_type"
                      control={control}
                      render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value || ""}>
                          <SelectTrigger className="w-full bg-brand-bg-input border-brand-border focus:border-black focus:ring-2 focus:ring-black/20 h-11 sm:h-12 text-sm sm:text-base">
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
                    <Label htmlFor="company_size" className="block text-sm sm:text-base font-semibold text-brand-text-dark mb-2 sm:mb-3">
                      Company Size <span className="text-brand-red">*</span>
                    </Label>
                     <Controller
                      name="company_size"
                      control={control}
                      render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value || ""}>
                          <SelectTrigger className="w-full bg-brand-bg-input border-brand-border focus:border-black focus:ring-2 focus:ring-black/20 h-11 sm:h-12 text-sm sm:text-base">
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
              <div className="border-t border-brand-border pt-6 sm:pt-8 space-y-4 sm:space-y-6">
                <div className="flex items-center space-x-2 mb-4 sm:mb-6">
                  <BriefcaseIcon className="h-4 w-4 sm:h-5 sm:w-5 text-black" />
                  <h2 className="text-lg sm:text-xl font-semibold text-brand-text-dark">Industry & Focus</h2>
                </div>
                <div className="space-y-4 sm:space-y-6">
                  <div>
                    <Label htmlFor="industry" className="block text-sm sm:text-base font-semibold text-brand-text-dark mb-2 sm:mb-3">
                      Primary Industry <span className="text-brand-red">*</span>
                    </Label>
                    <Controller
                      name="industry"
                      control={control}
                      render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value || ""}>
                          <SelectTrigger className="w-full bg-brand-bg-input border-brand-border focus:border-black focus:ring-2 focus:ring-black/20 h-11 sm:h-12 text-sm sm:text-base">
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
                    <Label htmlFor="tech_stack" className="block text-sm sm:text-base font-semibold text-brand-text-dark mb-2 sm:mb-3">
                      Tech Stack/Tools <span className="text-brand-red">*</span>
                    </Label>
                    <p className="text-xs sm:text-sm text-brand-text-medium mb-3 sm:mb-4">
                      What technologies, tools, and platforms does your company use?
                    </p>
                    <Textarea
                      id="tech_stack"
                      placeholder="React, Node.js, Python, AWS..."
                      {...register("tech_stack")}
                      className="bg-brand-bg-input border-brand-border focus:border-black focus:ring-2 focus:ring-black/20 min-h-[80px] sm:min-h-[100px] text-sm sm:text-base"
                    />
                    {(errors as any).tech_stack && <p className="text-red-500 text-xs mt-1">{(errors as any).tech_stack?.message}</p>}
                  </div>
                </div>
              </div>

              {/* Company Links Section (using existing functional fields) */}
              <div className="border-t border-brand-border pt-6 sm:pt-8 space-y-4 sm:space-y-6">
                <div className="flex items-center space-x-2 mb-4 sm:mb-6">
                  <LinkIcon className="h-4 w-4 sm:h-5 sm:w-5 text-black" />
                  <h2 className="text-lg sm:text-xl font-semibold text-brand-text-dark">Company Links</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <Label htmlFor="website_url" className="block text-sm sm:text-base font-semibold text-brand-text-dark mb-2 sm:mb-3">
                      Website URL
                    </Label>
                    <Input
                      id="website_url"
                      type="url"
                      placeholder="https://yourcompany.com"
                      {...register("website_url")}
                      className="bg-brand-bg-input border-brand-border focus:border-black focus:ring-2 focus:ring-black/20 py-3 sm:py-4 px-3 text-sm sm:text-base h-11 sm:h-12"
                    />
                     {errors.website_url && <p className="text-red-500 text-xs mt-1">{errors.website_url.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="linkedin_url" className="block text-sm sm:text-base font-semibold text-brand-text-dark mb-2 sm:mb-3">
                      LinkedIn Profile
                    </Label>
                    <Input
                      id="linkedin_url"
                      type="url"
                      placeholder="https://linkedin.com/company/..."
                      {...register("linkedin_url")}
                      className="bg-brand-bg-input border-brand-border focus:border-black focus:ring-2 focus:ring-black/20 py-3 sm:py-4 px-3 text-sm sm:text-base h-11 sm:h-12"
                    />
                    {errors.linkedin_url && <p className="text-red-500 text-xs mt-1">{errors.linkedin_url.message}</p>}
                  </div>
                </div>
              </div>
            </>
          ) : (
            // Individual Profile Sections
            <>
              {/* Personal Details Section */}
              <div className="border-t border-brand-border pt-6 sm:pt-8 space-y-4 sm:space-y-6">
                <div className="flex items-center space-x-2 mb-4 sm:mb-6">
                  <UserIcon className="h-4 w-4 sm:h-5 sm:w-5 text-black" />
                  <h2 className="text-lg sm:text-xl font-semibold text-brand-text-dark">Personal Information</h2>
                </div>
                <div className="space-y-4 sm:space-y-6">
                  <div>
                    <Label htmlFor="full_name" className="block text-sm sm:text-base font-semibold text-brand-text-dark mb-2 sm:mb-3">
                      Full Name <span className="text-brand-red">*</span>
                    </Label>
                    <Input
                      id="full_name"
                      placeholder="e.g. John Doe"
                      {...register("full_name")}
                      className="bg-brand-bg-input border-brand-border focus:border-black focus:ring-2 focus:ring-black/20 py-3 sm:py-4 px-3 text-sm sm:text-base h-11 sm:h-12"
                    />
                    {(errors as any).full_name && <p className="text-red-500 text-xs mt-1">{(errors as any).full_name?.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="professional_title" className="block text-sm sm:text-base font-semibold text-brand-text-dark mb-2 sm:mb-3">
                      Professional Title <span className="text-brand-red">*</span>
                    </Label>
                     <p className="text-xs sm:text-sm text-brand-text-medium mb-3 sm:mb-4">
                      What's your current role or the role you're seeking?
                    </p>
                    <Input
                      id="professional_title"
                      placeholder="Software Developer, Product Manager..."
                      {...register("professional_title")}
                      className="bg-brand-bg-input border-brand-border focus:border-black focus:ring-2 focus:ring-black/20 py-3 sm:py-4 px-3 text-sm sm:text-base h-11 sm:h-12"
                    />
                    {(errors as any).professional_title && <p className="text-red-500 text-xs mt-1">{(errors as any).professional_title?.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="years_of_experience" className="block text-sm sm:text-base font-semibold text-brand-text-dark mb-2 sm:mb-3">
                      Experience Level <span className="text-brand-red">*</span>
                    </Label>
                    <Controller
                        name="years_of_experience" // This is "experienceLevel" in AI UI, but "years_of_experience" in standard schema
                        control={control}
                        render={({ field }) => (
                            <Select onValueChange={field.onChange} value={field.value || ""}>
                            <SelectTrigger className="w-full bg-brand-bg-input border-brand-border focus:border-black focus:ring-2 focus:ring-black/20 h-11 sm:h-12 text-sm sm:text-base">
                                <SelectValue placeholder="Select your experience level" />
                            </SelectTrigger>
                            <SelectContent>
                                {/* Options from AI UI, values mapped to standard where possible or kept if new */}
                                <SelectItem value="student">🎓 Student/Fresh Graduate</SelectItem>
                                <SelectItem value="0-1">🌱 Entry Level (0-2 years)</SelectItem> {/* Matches standard "0-1" */}
                                <SelectItem value="2-3">💼 Mid Level (2-5 years)</SelectItem> {/* Matches standard "2-3" */}
                                <SelectItem value="4-6">🚀 Senior Level (5-10 years)</SelectItem> {/* Matches standard "4-6" */}
                                <SelectItem value="7-10">👑 Lead/Manager (10+ years)</SelectItem> {/* Matches standard "7-10" */}
                                <SelectItem value="10+">🎯 Executive/Director</SelectItem> {/* Matches standard "10+" */}
                            </SelectContent>
                            </Select>
                        )}
                    />
                    {(errors as any).years_of_experience && <p className="text-red-500 text-xs mt-1">{(errors as any).years_of_experience?.message}</p>}
                  </div>
                </div>
              </div>

              {/* Professional Background (Standard) / Skills & Education (AI) Section */}
              <div className="border-t border-brand-border pt-6 sm:pt-8 space-y-4 sm:space-y-6">
                <div className="flex items-center space-x-2 mb-4 sm:mb-6">
                  {/* Icon from AI version */}
                  <GraduationCapIcon className="h-4 w-4 sm:h-5 sm:w-5 text-black" />
                  <h2 className="text-lg sm:text-xl font-semibold text-brand-text-dark">Skills & Background</h2>
                </div>
                <div className="space-y-4 sm:space-y-6">
                  <div>
                    <Label htmlFor="industry" className="block text-sm sm:text-base font-semibold text-brand-text-dark mb-2 sm:mb-3">
                      Primary Industry
                    </Label>
                     <Controller
                      name="industry"
                      control={control}
                      render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value || ""}>
                          <SelectTrigger className="w-full bg-brand-bg-input border-brand-border focus:border-black focus:ring-2 focus:ring-black/20 h-11 sm:h-12 text-sm sm:text-base">
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
                    <Label htmlFor="job_function" className="block text-sm sm:text-base font-semibold text-brand-text-dark mb-2 sm:mb-3">
                      Job Function
                    </Label>
                    <Controller
                      name="job_function"
                      control={control}
                      render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value || ""}>
                          <SelectTrigger className="w-full bg-brand-bg-input border-brand-border focus:border-black focus:ring-2 focus:ring-black/20 h-11 sm:h-12 text-sm sm:text-base">
                            <SelectValue placeholder="Select your job function" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="engineering">⚙️ Engineering & Development</SelectItem>
                            <SelectItem value="design">🎨 Design & UX</SelectItem>
                            <SelectItem value="product">📱 Product Management</SelectItem>
                            <SelectItem value="marketing">📢 Marketing & Growth</SelectItem>
                            <SelectItem value="sales">💼 Sales & Business Development</SelectItem>
                            <SelectItem value="operations">📋 Operations & Strategy</SelectItem>
                            <SelectItem value="finance_operations">💰 Finance & Accounting</SelectItem>
                            <SelectItem value="hr">👥 Human Resources</SelectItem>
                            <SelectItem value="other_job_function">🔧 Other</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {(errors as any).job_function && <p className="text-red-500 text-xs mt-1">{(errors as any).job_function?.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="key_skills" className="block text-sm sm:text-base font-semibold text-brand-text-dark mb-2 sm:mb-3">
                      Key Skills <span className="text-brand-red">*</span>
                    </Label>
                    <p className="text-xs sm:text-sm text-brand-text-medium mb-3 sm:mb-4">
                      List your top skills and technologies. (Comma-separated for now, will improve later)
                    </p>
                    <Textarea
                      id="key_skills"
                      placeholder="JavaScript, React, Python, Project Management..."
                      {...register("key_skills")}
                      className="bg-brand-bg-input border-brand-border focus:border-black focus:ring-2 focus:ring-black/20 min-h-[80px] sm:min-h-[100px] text-sm sm:text-base"
                    />
                    {(errors as any).key_skills && <p className="text-red-500 text-xs mt-1">{(errors as any).key_skills?.message}</p>}
                  </div>
                  {/* Standard Education Section (Highest Level, Field, Institution) */}
                  <div>
                    <Label htmlFor="education_level" className="block text-sm sm:text-base font-semibold text-brand-text-dark mb-2 sm:mb-3">
                      Highest Education Level
                    </Label>
                    <Controller
                      name="education_level"
                      control={control}
                      render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value || ""}>
                          <SelectTrigger className="w-full bg-brand-bg-input border-brand-border focus:border-black focus:ring-2 focus:ring-black/20 h-11 sm:h-12 text-sm sm:text-base">
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
                      <Label htmlFor="field_of_study" className="block text-sm sm:text-base font-semibold text-brand-text-dark mb-2 sm:mb-3">
                        Field of Study
                      </Label>
                      <Input
                        id="field_of_study"
                        placeholder="e.g. Computer Science"
                        {...register("field_of_study")}
                        className="bg-brand-bg-input border-brand-border focus:border-black focus:ring-2 focus:ring-black/20 py-3 sm:py-4 px-3 text-sm sm:text-base h-11 sm:h-12"
                      />
                       {(errors as any).field_of_study && <p className="text-red-500 text-xs mt-1">{(errors as any).field_of_study?.message}</p>}
                    </div>
                    <div>
                      <Label htmlFor="institution" className="block text-sm sm:text-base font-semibold text-brand-text-dark mb-2 sm:mb-3">
                        Institution
                      </Label>
                      <Input
                        id="institution"
                        placeholder="e.g. Stanford University"
                        {...register("institution")}
                        className="bg-brand-bg-input border-brand-border focus:border-black focus:ring-2 focus:ring-black/20 py-3 sm:py-4 px-3 text-sm sm:text-base h-11 sm:h-12"
                      />
                      {(errors as any).institution && <p className="text-red-500 text-xs mt-1">{(errors as any).institution?.message}</p>}
                    </div>
                  </div>
                  {/* New visual-only Education field from AI version */}
                  <div>
                    <Label htmlFor="education_ai" className="block text-sm sm:text-base font-semibold text-brand-text-dark mb-2 sm:mb-3">
                      Education (Additional - Visual Only)
                    </Label>
                    <Input
                      id="education_ai" // Different ID to avoid conflict
                      placeholder="University, Degree, Year (e.g., from AI UI)"
                      className="bg-brand-bg-input border-brand-border focus:border-black focus:ring-2 focus:ring-black/20 py-3 sm:py-4 px-3 text-sm sm:text-base h-11 sm:h-12"
                      // Not registered with react-hook-form
                    />
                  </div>
                </div>
              </div>

              {/* Links Section (combining functional and new visual-only) */}
              <div className="border-t border-brand-border pt-6 sm:pt-8 space-y-4 sm:space-y-6">
                <div className="flex items-center space-x-2 mb-4 sm:mb-6">
                  <LinkIcon className="h-4 w-4 sm:h-5 sm:w-5 text-black" />
                  <h2 className="text-lg sm:text-xl font-semibold text-brand-text-dark">Professional Links</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  {/* Functional LinkedIn URL */}
                  <div>
                    <Label htmlFor="linkedin_url" className="block text-sm sm:text-base font-semibold text-brand-text-dark mb-2 sm:mb-3">
                      LinkedIn Profile URL
                    </Label>
                    <Input
                      id="linkedin_url" // Standard ID
                      type="url"
                      placeholder="https://linkedin.com/in/..."
                      {...register("linkedin_url")}
                      className="bg-brand-bg-input border-brand-border focus:border-black focus:ring-2 focus:ring-black/20 py-3 sm:py-4 px-3 text-sm sm:text-base h-11 sm:h-12"
                    />
                    {errors.linkedin_url && <p className="text-red-500 text-xs mt-1">{errors.linkedin_url.message}</p>}
                  </div>
                  {/* Functional Website URL */}
                  <div>
                    <Label htmlFor="website_url" className="block text-sm sm:text-base font-semibold text-brand-text-dark mb-2 sm:mb-3">
                       Personal Website/Portfolio URL
                    </Label>
                    <Input
                      id="website_url" // Standard ID
                      type="url"
                      placeholder="https://yourportfolio.com"
                      {...register("website_url")}
                      className="bg-brand-bg-input border-brand-border focus:border-black focus:ring-2 focus:ring-black/20 py-3 sm:py-4 px-3 text-sm sm:text-base h-11 sm:h-12"
                    />
                    {errors.website_url && <p className="text-red-500 text-xs mt-1">{errors.website_url.message}</p>}
                  </div>
                   {/* New visual-only Portfolio URL (if different from website_url, or just for UI) */}
                  <div>
                    <Label htmlFor="portfolio_ai" className="block text-sm sm:text-base font-semibold text-brand-text-dark mb-2 sm:mb-3">
                      Portfolio/Website (Additional - Visual Only)
                    </Label>
                    <Input
                      id="portfolio_ai"
                      type="url"
                      placeholder="https://yourportfolio.com (e.g., from AI UI)"
                      className="bg-brand-bg-input border-brand-border focus:border-black focus:ring-2 focus:ring-black/20 py-3 sm:py-4 px-3 text-sm sm:text-base h-11 sm:h-12"
                    />
                  </div>
                  {/* New visual-only GitHub URL */}
                  <div>
                    <Label htmlFor="github_ai" className="block text-sm sm:text-base font-semibold text-brand-text-dark mb-2 sm:mb-3">
                      GitHub Profile (Visual Only)
                    </Label>
                    <Input
                      id="github_ai"
                      type="url"
                      placeholder="https://github.com/... (e.g., from AI UI)"
                      className="bg-brand-bg-input border-brand-border focus:border-black focus:ring-2 focus:ring-black/20 py-3 sm:py-4 px-3 text-sm sm:text-base h-11 sm:h-12"
                    />
                  </div>
                  {/* New visual-only Resume URL */}
                  <div>
                    <Label htmlFor="resume_ai" className="block text-sm sm:text-base font-semibold text-brand-text-dark mb-2 sm:mb-3">
                      Resume URL (Visual Only)
                    </Label>
                    <Input
                      id="resume_ai"
                      type="url"
                      placeholder="https://drive.google.com/... (e.g., from AI UI)"
                      className="bg-brand-bg-input border-brand-border focus:border-black focus:ring-2 focus:ring-black/20 py-3 sm:py-4 px-3 text-sm sm:text-base h-11 sm:h-12"
                    />
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Submit Button Area from AI version */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-6 sm:pt-8 border-t border-brand-border">
            <Button
              type="button" // Changed from submit
              variant="outline"
              className="flex-1 border-2 border-gray-300 bg-transparent text-gray-700 hover:bg-gray-50 focus:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 rounded-xl font-medium py-3 sm:py-4 text-sm sm:text-base"
              asChild
            >
              <Link href="/">← Back to Home</Link>
            </Button>
            <Button
              type="submit" // This is the actual submit button
              disabled={isSubmitting}
              className="flex-1 bg-black hover:bg-gray-900 text-white font-medium rounded-xl py-3 sm:py-4 text-sm sm:text-base"
            >
              {isSubmitting ? "Saving..." : "Continue to Preferences →"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
