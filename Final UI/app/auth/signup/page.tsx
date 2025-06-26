"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/logo";
import { ChromeIcon, EyeIcon, EyeOffIcon, CalendarIcon } from "lucide-react"; // Added CalendarIcon
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"; // Added Select components
import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { registerUser, loginUser, loginWithGoogleAPI } from "@/lib/api"; // Added loginWithGoogleAPI
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth"; // Firebase auth imports
import { app as firebaseApp } from "@/lib/firebase"; // Firebase app instance

// Zod schema (remains the same)
const formSchema = z.object({
  user_type: z.enum(["individual", "company"]),
  full_name: z.string().optional(),
  company_name: z.string().optional(),
  industry: z.string().optional(),
  company_size: z.string().optional(),
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
  confirmPassword: z.string(),
  gender: z.string().optional(), // Added gender
  dateOfBirth: z.string().optional(), // Added dateOfBirth
}).refine(data => {
    if (data.user_type === 'individual') {
      if (!data.full_name?.trim()) {
        return false;
      }
    }
    return true;
}, {
    message: "Full name is required for individual users.",
    path: ["full_name"],
}).refine(data => {
    if (data.user_type === 'individual') {
      if (!data.gender?.trim()) {
        return false;
      }
    }
    return true;
}, {
    message: "Gender is required.",
    path: ["gender"],
}).refine(data => {
    if (data.user_type === 'individual') {
      if (!data.dateOfBirth?.trim()) {
        return false;
      }
    }
    return true;
}, {
    message: "Date of Birth is required.",
    path: ["dateOfBirth"],
}).refine(data => {
    if (data.user_type === 'company' && !data.company_name?.trim()) {
        return false;
    }
    return true;
}, {
    message: "Company name is required for company users.",
    path: ["company_name"],
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match.",
  path: ["confirmPassword"],
});

type SignUpFormValues = z.infer<typeof formSchema>;

// CREATE THIS NEW COMPONENT TO WRAP THE LOGIC USING useSearchParams
function SignUpContent() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // For main form submission
  const [isSocialLoading, setIsSocialLoading] = useState(false); // For social sign-in

  const router = useRouter();
  const searchParams = useSearchParams(); // useSearchParams is now safely inside a component rendered within Suspense
  const initialUserType = searchParams.get("type") === 'company' ? 'company' : 'individual';
  const { login } = useAuth();

  const { register, handleSubmit, watch, formState: { errors }, setValue, trigger } = useForm<SignUpFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      user_type: initialUserType,
      email: "",
      password: "",
      confirmPassword: "",
      full_name: "",
      company_name: "",
      industry: "",
      company_size: "",
      gender: "",
      dateOfBirth: "",
    }
  });

  const userType = watch("user_type");

  useEffect(() => {
    setValue("user_type", initialUserType);
  }, [initialUserType, setValue]);

  const onSubmit: SubmitHandler<SignUpFormValues> = async (data) => {
    setIsLoading(true);

    const { confirmPassword, ...restOfData } = data;
    let apiData: Partial<SignUpFormValues> = { ...restOfData };

    if (apiData.user_type === 'individual') {
        delete apiData.company_name;
        delete apiData.industry;
        delete apiData.company_size;
    } else { // company
        delete apiData.full_name;
        delete apiData.gender;
        delete apiData.dateOfBirth;
    }
    console.log("Data being sent to API:", apiData); // Log data before sending

    try {
      const response = await registerUser(apiData as SignUpFormValues); // Cast as SignUpFormValues, ensure all required fields are present or handle optionality in API
      console.log("Registration successful:", response);

      try {
        const loginResponse = await loginUser({ email: apiData.email, password: apiData.password });
        if (loginResponse && loginResponse.token && loginResponse.user) {
          login(loginResponse.token, loginResponse.user);
          toast.success("Registration successful! Redirecting to onboarding...");
          router.push('/auth/onboarding/verify-email');
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
      const errorMessage = error.data?.message || error.message || "An unexpected error occurred during registration.";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsSocialLoading(true);
    try {
      const auth = getAuth(firebaseApp);
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      if (user) {
        const idToken = await user.getIdToken();
        const backendResponse = await loginWithGoogleAPI(idToken);

        if (backendResponse && backendResponse.token && backendResponse.user) {
          login(backendResponse.token, backendResponse.user);
          toast.success("Signed in with Google successfully! Redirecting...");
          // Determine user_type from backendResponse to redirect correctly
          const userTypeFromResponse = backendResponse.user.user_type || 'individual'; // default if not present
          // Check if profile is complete, this is a simplified check.
          // A more robust check would involve fetching the full profile or having a flag from the backend.
          const isProfileComplete = backendResponse.user.profile && Object.keys(backendResponse.user.profile).length > 0;


          if (isProfileComplete) {
             router.push(userTypeFromResponse === 'company' ? '/company-dashboard' : '/feed');
          } else {
             // Redirect to the first step of onboarding, verify-email is usually a good start
             router.push('/auth/onboarding/verify-email');
          }

        } else {
          toast.error("Google Sign-In succeeded but failed to log in to our server. Please try again.");
        }
      } else {
        toast.error("Failed to get user information from Google. Please try again.");
      }
    } catch (error: any) {
      console.error("Google Sign-In Error:", error);
      // Handle specific Firebase errors
      if (error.code === 'auth/popup-closed-by-user') {
        toast.info("Google Sign-In cancelled.");
      } else if (error.code === 'auth/cancelled-popup-request') {
        // Can happen if multiple popups are triggered
        toast.info("Google Sign-In request cancelled.");
      } else if (error.code === 'auth/popup-blocked') {
        toast.error("Google Sign-In popup was blocked. Please enable popups for this site.");
      }
      // Handle backend API errors if they are structured with error.data.message
      else if (error.data && error.data.message) {
        toast.error(`Google Sign-In failed: ${error.data.message}`);
      }
      // Generic error
      else {
        toast.error("An error occurred during Google Sign-In. Please try again.");
      }
    } finally {
      setIsSocialLoading(false);
    }
  };

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
          <span className="text-2xl font-black text-brand-text-dark" style={{fontFamily: 'Inter, sans-serif'}}>100</span>
          <span className="text-2xl font-black text-brand-blue ml-1" style={{fontFamily: 'Inter, sans-serif'}}>Networks</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-brand-text-dark mb-6 text-center" style={{fontFamily: 'Inter, sans-serif'}}>Create Account</h1>

        <div className="flex justify-center space-x-2 sm:space-x-4 mb-6">
          <Button
            onClick={() => { setValue("user_type", "company"); trigger("user_type"); }}
            variant={userType === 'company' ? 'default' : 'outline'}
            className={`px-4 py-2 sm:px-6 sm:py-2 rounded-lg font-medium ${userType === 'company' ? 'bg-brand-blue text-white' : 'text-gray-600 hover:bg-gray-200'}`}
          >
            For Company
          </Button>
          <Button
            onClick={() => { setValue("user_type", "individual"); trigger("user_type"); }}
            variant={userType === 'individual' ? 'default' : 'outline'}
            className={`px-4 py-2 sm:px-6 sm:py-2 rounded-lg font-medium ${userType === 'individual' ? 'bg-brand-blue text-white' : 'text-gray-600 hover:bg-gray-200'}`}
          >
            For Individual
          </Button>
        </div>
        {errors.user_type && <p className="text-red-500 text-xs mt-1">{errors.user_type.message}</p>}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Conditional Fields for individual/company */}
          {userType === 'individual' && (
            <>
              <div>
                <Label htmlFor="fullName" className="text-sm font-semibold text-brand-text-medium">Full Name</Label>
                <Input id="fullName" type="text" placeholder="Your Name" {...register("full_name")} className="mt-1 bg-brand-bg-input border-brand-border placeholder-brand-text-light focus:border-brand-blue focus:ring-1 focus:ring-brand-blue py-3 px-3 text-base"/>
                {errors.full_name && <p className="text-red-500 text-xs mt-1">{errors.full_name.message}</p>}
              </div>
              <div>
                <Label htmlFor="gender" className="text-sm font-semibold text-brand-text-medium">
                  Gender <span className="text-red-500">*</span>
                </Label>
                <Select onValueChange={(value) => setValue("gender", value)} defaultValue={watch("gender")}>
                  <SelectTrigger className="mt-1 bg-brand-bg-input border-brand-border placeholder-brand-text-light focus:border-brand-blue focus:ring-1 focus:ring-brand-blue py-3 px-3 text-base">
                    <SelectValue placeholder="Select your gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                    <SelectItem value="prefer_not_to_say">Prefer not to say</SelectItem>
                  </SelectContent>
                </Select>
                {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender.message}</p>}
              </div>
              <div>
                <Label htmlFor="dateOfBirth" className="text-sm font-semibold text-brand-text-medium">
                  Date of Birth <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Input
                    id="dateOfBirth"
                    type="date"
                    {...register("dateOfBirth")}
                    className="mt-1 bg-brand-bg-input border-brand-border placeholder-brand-text-light focus:border-brand-blue focus:ring-1 focus:ring-brand-blue py-3 px-3 pr-10 text-base"
                    style={{ colorScheme: 'light' }}
                    onFocus={(e) => e.target.showPicker?.()}
                  />
                  <CalendarIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 mt-0.5 h-5 w-5 text-brand-text-medium pointer-events-none" />
                </div>
                {errors.dateOfBirth && <p className="text-red-500 text-xs mt-1">{errors.dateOfBirth.message}</p>}
              </div>
            </>
          )}
          {userType === 'company' && (
            <>
              <div>
                <Label htmlFor="companyName" className="text-sm font-semibold text-brand-text-medium">Company Name</Label>
                <Input id="companyName" type="text" placeholder="Your Company Name" {...register("company_name")} className="mt-1 bg-brand-bg-input border-brand-border placeholder-brand-text-light focus:border-brand-blue focus:ring-1 focus:ring-brand-blue py-3 px-3 text-base"/>
                {errors.company_name && <p className="text-red-500 text-xs mt-1">{errors.company_name.message}</p>}
              </div>
              <div>
                <Label htmlFor="industry" className="text-sm font-semibold text-brand-text-medium">Industry (Optional)</Label>
                <Input id="industry" type="text" placeholder="e.g., Technology, Healthcare" {...register("industry")} className="mt-1 bg-brand-bg-input border-brand-border placeholder-brand-text-light focus:border-brand-blue focus:ring-1 focus:ring-brand-blue py-3 px-3 text-base"/>
              </div>
              <div>
                <Label htmlFor="companySize" className="text-sm font-semibold text-brand-text-medium">Company Size (Optional)</Label>
                <Input id="companySize" type="text" placeholder="e.g., 1-10 employees" {...register("company_size")} className="mt-1 bg-brand-bg-input border-brand-border placeholder-brand-text-light focus:border-brand-blue focus:ring-1 focus:ring-brand-blue py-3 px-3 text-base"/>
              </div>
            </>
          )}
          {/* Email, Password, Confirm Password fields */}
          <div>
            <Label htmlFor="email" className="text-sm font-semibold text-brand-text-medium">Email</Label>
            <Input id="email" type="email" placeholder="example@gmail.com" {...register("email")} className="mt-1 bg-brand-bg-input border-brand-border placeholder-brand-text-light focus:border-brand-blue focus:ring-1 focus:ring-brand-blue py-3 px-3 text-base"/>
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>
          <div>
            <Label htmlFor="password" className="text-sm font-semibold text-brand-text-medium">Password</Label>
            <div className="relative">
              <Input id="password" type={showPassword ? 'text' : 'password'} placeholder="••••••••••" {...register("password")} className="mt-1 bg-brand-bg-input border-brand-border placeholder-brand-text-light focus:border-brand-blue focus:ring-1 focus:ring-brand-blue py-3 px-3 text-base"/>
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 px-3 flex items-center text-brand-text-medium hover:text-brand-blue">
                {showPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          </div>
          <div>
            <Label htmlFor="confirmPassword" className="text-sm font-semibold text-brand-text-medium">Confirm Password</Label>
            <Input id="confirmPassword" type={showPassword ? 'text' : 'password'} placeholder="••••••••••" {...register("confirmPassword")} className="mt-1 bg-brand-bg-input border-brand-border placeholder-brand-text-light focus:border-brand-blue focus:ring-1 focus:ring-brand-blue py-3 px-3 text-base"/>
            {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>}
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-black hover:bg-brand-text-dark text-white py-3 font-bold text-base rounded-lg mt-2 shadow-md"
          >
            {isLoading ? "Signing up..." : "Sign Up"}
          </Button>
        </form>

        {/* Social Login Buttons UI */}
        <div className="flex items-center my-6">
          <hr className="flex-grow border-brand-border" />
          <span className="mx-4 text-sm text-brand-text-medium font-medium">or Sign up with</span>
          <hr className="flex-grow border-brand-border" />
        </div>

        <div className="flex gap-x-4 sm:gap-x-8 mb-6 justify-center">
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={isSocialLoading || isLoading} // Disable if main form is also loading
            className="hover:opacity-70 transition-opacity cursor-pointer p-2 border border-gray-300 rounded-lg flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Sign up with Google"
          >
            {isSocialLoading ? <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-gray-900"></div> : (
            <svg className="w-6 h-6 sm:w-8 sm:h-8" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            )}
          </button>
          <button
            type="button"
            onClick={() => toast.info("LinkedIn Sign-Up coming soon!")} // Placeholder action
            disabled={isSocialLoading || isLoading} // Disable if main form is also loading
            className="hover:opacity-70 transition-opacity cursor-pointer p-2 border border-gray-300 rounded-lg flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Sign up with LinkedIn"
          >
            {/* Basic visual cue for loading, could be a spinner too */}
            {isSocialLoading ? <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:h-8 border-b-2 border-gray-700"></div> : (
            <svg className="w-6 h-6 sm:w-8 sm:h-8" viewBox="0 0 24 24">
              <path fill="#0077B5" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            )}
          </button>
        </div>

        <div className="mt-6 text-center"> {/* Ensure this is mt-6 or adjusted as needed */}
          <span className="text-sm font-bold text-brand-text-dark">Already have an account? </span>
          <Link href="/auth/login" className="font-bold text-brand-blue underline ml-1 text-sm">Log in</Link>
        </div>
      </div>
    </div>
  );
}

// WRAP THE SignUpContent IN Suspense IN THE MAIN EXPORT
export default function SignUpPageWrapper() { // RENAME SignUpPage to SignUpPageWrapper
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <Suspense fallback={<div>Loading signup form...</div>}>
        <SignUpContent />
      </Suspense>
    </div>
  );
}