"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Logo } from "@/components/logo"; // Logo from backup, not in new UI form
import { EyeIcon, EyeOffIcon, CalendarIcon, ChromeIcon } from "lucide-react"; // Added ChromeIcon from backup
import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { registerUser, loginUser } from "@/lib/api";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";

// Zod schema: Merging fields from backup and new UI, and logic from backup
const formSchema = z.object({
  user_type: z.enum(["individual", "company"]),
  full_name: z.string().optional(),
  company_name: z.string().optional(),
  industry: z.string().optional(),
  company_size: z.string().optional(),
  // Fields from new-signup-page.tsx that were missing in backup's schema
  gender: z.string().optional(),
  birth_date: z.string().optional(),
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
  confirmPassword: z.string(), // From backup
}).refine(data => {
    if (data.user_type === 'individual' && !data.full_name?.trim()) return false;
    return true;
}, { message: "Full name is required for individual users.", path: ["full_name"] })
.refine(data => {
    if (data.user_type === 'company' && !data.company_name?.trim()) return false;
    return true;
}, { message: "Company name is required for company users.", path: ["company_name"] })
.refine(data => { // Conditionally require gender and birth_date for individuals
    if (data.user_type === 'individual' && !data.gender) return false;
    return true;
}, { message: "Gender is required for individual users.", path: ["gender"] })
.refine(data => {
    if (data.user_type === 'individual' && !data.birth_date) return false;
    return true;
}, { message: "Date of Birth is required for individual users.", path: ["birth_date"] })
.refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match.", path: ["confirmPassword"],
});

type SignUpFormValues = z.infer<typeof formSchema>;

// This is the main content component, combining UI from new page and logic from old.
// I've renamed it from SignUpContent (backup) / SignUpPage (new UI) to avoid confusion.
function SignUpFormLogicContainer() {
  console.log("LOG: SignUpFormLogicContainer rendering..."); // Log 1

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const initialUserTypeForm = searchParams.get("type") === 'company' ? 'company' : 'individual';
  console.log("LOG: initialUserTypeForm from URL:", initialUserTypeForm); // Log 2

  const { login } = useAuth(); // From backup

  const { control, register, handleSubmit, watch, formState: { errors }, setValue, trigger } = useForm<SignUpFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      user_type: initialUserTypeForm,
      email: "",
      password: "",
      confirmPassword: "", // From backup
      full_name: "",
      company_name: "",
      industry: "",
      company_size: "",
      gender: "", // New field
      birth_date: "", // New field
    }
  });

  const userType = watch("user_type");
  console.log("LOG: userType from watch (initial/every render):", userType); // Log 3

  // This useEffect is ONLY for logging the userType when it changes.
  useEffect(() => {
    console.log("LOG: userType in useEffect (after RHF state change):", userType); // Log 5
  }, [userType]);

  // useEffect to sync initialUserType from URL to form state (from backup, slightly adapted)
  // This was identified as potentially problematic before, but the backup had it.
  // Let's ensure it only sets if different and doesn't cause loops.
  // The defaultValues should handle the very first init. This effect handles if searchParams load late or change.
  useEffect(() => {
    if (initialUserTypeForm && initialUserTypeForm !== userType) {
        console.log(`LOG: Effect - initialUserTypeForm (${initialUserTypeForm}) differs from userType (${userType}). Setting value.`);
        setValue("user_type", initialUserTypeForm);
        // No trigger here, as setValue itself should lead to watch update.
    }
  }, [initialUserTypeForm, userType, setValue]);


  const onSubmit: SubmitHandler<SignUpFormValues> = async (data) => {
    console.log("LOG: onSubmit called with data:", data); // Log 6
    setIsLoading(true);
    const { confirmPassword, ...apiData } = data;

    if (apiData.user_type === 'individual') {
      delete apiData.company_name;
      delete apiData.industry;
      delete apiData.company_size;
    } else {
      delete apiData.full_name;
      // Also remove gender and birth_date if it's a company
      delete apiData.gender;
      delete apiData.birth_date;
    }

    try {
      const response = await registerUser(apiData);
      console.log("Registration successful:", response);
      try {
        const loginResponse = await loginUser({ email: apiData.email, password: apiData.password });
        if (loginResponse && loginResponse.token && loginResponse.user) {
          login(loginResponse.token, loginResponse.user);
          toast.success("Registration successful! Redirecting to onboarding...");
          router.push(`/auth/onboarding/verify-email?type=${apiData.user_type}`);
        } else {
          toast.error("Registration successful, but auto-login failed. Please log in manually.");
          router.push('/auth/login');
        }
      } catch (loginError: any) {
        console.error("Auto-login after registration failed:", loginError);
        toast.error("Registration successful, but auto-login failed. Please log in manually: " + (loginError.data?.message || loginError.message));
        router.push('/auth/login');
      }
    } catch (error: any) {
      console.error("Registration failed:", error);
      const errorMessage = error.data?.message || error.message || "An unexpected error occurred.";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUserTypeChange = (newUserType: 'company' | 'individual') => {
    console.log("LOG: handleUserTypeChange called with:", newUserType); // Log 4
    setValue("user_type", newUserType, { shouldValidate: true, shouldDirty: true });
    // trigger("user_type"); // Likely redundant when shouldValidate: true is used with setValue
  };

  // JSX structure from new-signup-page.tsx, with RHF integration
  return (
      <div className="flex w-full max-w-6xl mx-auto rounded-2xl shadow-xl overflow-hidden border">
        <div className="w-1/2 flex-col items-center justify-center bg-[#FFFCF6] p-12 hidden md:flex">
          <Image
            src="/imagex.png"
            alt="Decorative Abstract Pattern"
            width={400}
            height={400}
            className="mb-10"
            priority
          />
          <h2 className="text-3xl font-black text-brand-text-dark text-left w-full mb-2" style={{fontFamily: 'Inter, sans-serif'}}>
            Where Connections Spark Opportunities
          </h2>
          <p className="text-lg text-brand-text-medium text-left w-full" style={{fontFamily: 'Inter, sans-serif'}}>
            Real roles. Real startups.
          </p>
        </div>
        <div className="w-full md:w-1/2 flex flex-col justify-center bg-white p-8 sm:p-12 min-h-full">
          <div className="mb-8 text-center">
            <span className="text-2xl font-black" style={{fontFamily: 'Lora, serif', color: '#000000'}}>100</span>
            <span className="text-2xl font-black ml-1" style={{fontFamily: 'Lora, serif', color: '#0056B3'}}>Networks</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-brand-text-dark mb-8 text-center" style={{fontFamily: 'Inter, sans-serif'}}>Create Account</h1>

          <div className="flex justify-center space-x-2 sm:space-x-4 mb-6">
            <Button
              type="button"
              onClick={() => handleUserTypeChange('company')}
              variant={userType === 'company' ? 'default' : 'outline'}
              className={`px-4 py-2 sm:px-6 sm:py-2 rounded-lg font-medium ${
                userType === 'company'
                  ? 'bg-brand-blue text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              For Company
            </Button>
            <Button
              type="button"
              onClick={() => handleUserTypeChange('individual')}
              variant={userType === 'individual' ? 'default' : 'outline'}
              className={`px-4 py-2 sm:px-6 sm:py-2 rounded-lg font-medium ${
                userType === 'individual'
                  ? 'bg-brand-blue text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              For Individual
            </Button>
          </div>
          {errors.user_type && <p className="text-red-500 text-xs mt-1">{errors.user_type.message}</p>}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
            {userType === 'company' ? (
              <>
                <div>
                  <Label htmlFor="companyName" className="text-base font-semibold text-brand-text-medium">Company Name</Label>
                  <Input
                    id="companyName"
                    type="text"
                    placeholder="Enter your company name"
                    {...register("company_name")}
                    className="mt-2 bg-brand-bg-input border-brand-border placeholder-brand-text-light focus:border-brand-blue focus:ring-1 focus:ring-brand-blue py-3 sm:py-4 px-3 sm:px-4 text-base sm:text-lg font-bold"
                  />
                  {errors.company_name && <p className="text-red-500 text-xs mt-1">{errors.company_name.message}</p>}
                </div>
                <div>
                  <Label htmlFor="industry" className="text-base font-semibold text-brand-text-medium">Industry <span className="text-xs text-gray-500">(Optional)</span></Label>
                  <Input
                    id="industry"
                    type="text"
                    placeholder="e.g., Technology, Healthcare, Finance"
                    {...register("industry")}
                    className="mt-2 bg-brand-bg-input border-brand-border placeholder-brand-text-light focus:border-brand-blue focus:ring-1 focus:ring-brand-blue py-3 sm:py-4 px-3 sm:px-4 text-base sm:text-lg font-bold"
                  />
                   {errors.industry && <p className="text-red-500 text-xs mt-1">{errors.industry.message}</p>}
                </div>
                <div>
                  <Label htmlFor="companySize" className="text-base font-semibold text-brand-text-medium">Company Size <span className="text-xs text-gray-500">(Optional)</span></Label>
                  <Input
                    id="companySize"
                    type="text"
                    placeholder="Number of employees"
                    {...register("company_size")}
                    className="mt-2 bg-brand-bg-input border-brand-border placeholder-brand-text-light focus:border-brand-blue focus:ring-1 focus:ring-brand-blue py-3 sm:py-4 px-3 sm:px-4 text-base sm:text-lg font-bold"
                  />
                  {errors.company_size && <p className="text-red-500 text-xs mt-1">{errors.company_size.message}</p>}
                </div>
              </>
            ) : (
              <>
                <div>
                  <Label htmlFor="fullName" className="text-base font-semibold text-brand-text-medium">Full Name</Label>
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="Name"
                    {...register("full_name")}
                    className="mt-2 bg-brand-bg-input border-brand-border placeholder-brand-text-light focus:border-brand-blue focus:ring-1 focus:ring-brand-blue py-3 sm:py-4 px-3 sm:px-4 text-base sm:text-lg font-bold"
                  />
                  {errors.full_name && <p className="text-red-500 text-xs mt-1">{errors.full_name.message}</p>}
                </div>
                <div> {/* Gender field from new UI */}
                  <Label htmlFor="gender" className="text-base font-semibold text-brand-text-medium">
                    Gender <span className="text-red-500">*</span>
                  </Label>
                  <Controller
                    name="gender"
                    control={control}
                    // rules={{ required: userType === 'individual' ? "Gender is required" : false }} // Validation handled by Zod refine
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value || ""}>
                        <SelectTrigger className="mt-2 bg-brand-bg-input border-brand-border placeholder-brand-text-light focus:border-brand-blue focus:ring-1 focus:ring-brand-blue py-3 sm:py-4 px-3 sm:px-4 text-base sm:text-lg font-bold text-left">
                          <SelectValue placeholder="Select your gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender.message}</p>}
                </div>
                <div> {/* Date of Birth field from new UI */}
                  <Label htmlFor="birth_date" className="text-base font-semibold text-brand-text-medium">
                    Date of Birth <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      id="birth_date"
                      type="date"
                      {...register("birth_date"
                        // { required: userType === 'individual' ? "Date of Birth is required" : false } // Validation handled by Zod refine
                      )}
                      className="mt-2 bg-brand-bg-input border-brand-border placeholder-brand-text-light focus:border-brand-blue focus:ring-1 focus:ring-brand-blue py-3 sm:py-4 px-3 sm:px-4 pr-12 text-base sm:text-lg font-bold"
                      style={{ colorScheme: 'light', WebkitAppearance: 'none', MozAppearance: 'textfield' }}
                      onFocus={(e) => e.target.showPicker?.()}
                    />
                    <CalendarIcon className="absolute right-4 top-1/2 transform -translate-y-1/2 mt-1 h-5 w-5 text-brand-text-medium pointer-events-none" />
                  </div>
                  {errors.birth_date && <p className="text-red-500 text-xs mt-1">{errors.birth_date.message}</p>}
                </div>
              </>
            )}
            <div>
              <Label htmlFor="email" className="text-base font-semibold text-brand-text-medium">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="example@gmail.com"
                {...register("email")}
                className="mt-2 bg-brand-bg-input border-brand-border placeholder-brand-text-light focus:border-brand-blue focus:ring-1 focus:ring-brand-blue py-3 sm:py-4 px-3 sm:px-4 text-base sm:text-lg font-bold"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>
            <div>
              <Label htmlFor="password" className="text-base font-semibold text-brand-text-medium">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••••"
                  {...register("password")}
                  className="mt-2 bg-brand-bg-input border-brand-border placeholder-brand-text-light focus:border-brand-blue focus:ring-1 focus:ring-brand-blue py-3 sm:py-4 px-3 sm:px-4 text-base sm:text-lg font-bold"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 px-4 flex items-center text-brand-text-medium hover:text-brand-blue"
                >
                  {showPassword ? <EyeOffIcon className="h-6 w-6" /> : <EyeIcon className="h-6 w-6" />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
            </div>
             <div> {/* Confirm Password from backup */}
              <Label htmlFor="confirmPassword" className="text-base font-semibold text-brand-text-medium">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••••"
                {...register("confirmPassword")}
                className="mt-2 bg-brand-bg-input border-brand-border placeholder-brand-text-light focus:border-brand-blue focus:ring-1 focus:ring-brand-blue py-3 sm:py-4 px-3 sm:px-4 text-base sm:text-lg font-bold"
              />
              {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>}
            </div>
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-black hover:bg-brand-text-dark text-white py-3 sm:py-4 font-bold text-base sm:text-lg rounded-lg mt-2 shadow-md"
            >
              {isLoading ? "Signing up..." : "Sign Up"}
            </Button>
          </form>

          <div className="flex items-center my-6">
            <hr className="flex-grow border-brand-border" />
            <span className="mx-4 text-base text-brand-text-medium font-medium">or Sign up with</span>
            <hr className="flex-grow border-brand-border" />
          </div>

          <div className="flex gap-4 sm:gap-8 mb-6 justify-center">
            {/* Social login buttons from new UI - TODO: Implement handlers */}
            <button type="button" className="hover:opacity-70 transition-opacity cursor-pointer">
              <svg className="w-10 h-10 sm:w-12 sm:h-12" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
            </button>
            <button type="button" className="hover:opacity-70 transition-opacity cursor-pointer">
              <svg className="w-10 h-10 sm:w-12 sm:h-12" viewBox="0 0 24 24">
                <path fill="#0077B5" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </button>
          </div>

          <div className="mt-6 sm:mt-8 text-center">
            <span className="text-sm sm:text-base font-bold text-brand-text-dark">Already have an account? </span>
            <Link href="/auth/login" className="font-bold text-brand-blue underline ml-1 text-sm sm:text-base">Log in</Link>
          </div>
        </div>
      </div>
  );
}

// Main export wrapped in Suspense
export default function SignUpPage() {
  console.log("SignUpPage (wrapper) rendering NOW..."); // Log for the main page export
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <Suspense fallback={<div className="text-center p-10 font-semibold">Loading signup form...</div>}>
        <SignUpFormLogicContainer />
      </Suspense>
    </div>
  );
}