"use client"

// import { OnboardingStepperWrapper } from "@/components/onboarding-stepper-wrapper" // Incorrect import removed
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MailCheck, Smartphone } from "lucide-react"
import { useState } from "react"
import { Input } from "@/components/ui/input"
// import { OnboardingStepperWrapper } from "@/components/onboarding-stepper-wrapper" // Temporarily removed
import { OnboardingStepper } from "@/components/onboarding-stepper"; // Added existing stepper
import { useSearchParams, useRouter } from "next/navigation" // Added useRouter
import React, { useState, useEffect, Suspense } from "react" // Added React, useEffect, Suspense

import { auth as firebaseAuth } from "@/lib/firebase" // Firebase auth instance
import { RecaptchaVerifier, signInWithPhoneNumber, ConfirmationResult } from "firebase/auth"
import { useAuth } from "@/context/AuthContext"
import { toast } from "sonner"
import { markUserAsVerified } from "@/lib/api" // API function

// Extend window type for recaptchaVerifier
declare global {
  interface Window {
    recaptchaVerifier?: RecaptchaVerifier;
    confirmationResult?: ConfirmationResult;
  }
}

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user, token, refetchUser, isLoading: isAuthLoading } = useAuth(); // Integrated useAuth
  const queryUserType = searchParams.get('type'); // Keep this for initial userType if context is loading

  // State for the component
  const [method, setMethod] = useState<'email' | 'phone'>('phone'); // Default to phone as in current version
  const [email, setEmail] = useState(''); // Existing state
  const [phone, setPhone] = useState(''); // Existing state
  const [otp, setOtp] = useState(''); // Existing state
  const [otpSent, setOtpSent] = useState(false); // Ported state
  const [verified, setVerified] = useState(false); // Ported state

  const [confirmationResultState, setConfirmationResultState] = useState<ConfirmationResult | null>(null); // Ported state
  const [isSendingOtp, setIsSendingOtp] = useState(false); // Ported state
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false); // Ported state

  // pageUserType will be determined later, after hooks
  // const userType = queryUserType || (user?.user_type) || 'individual'; // Logic to determine userType more robustly

  useEffect(() => {
    if (method === 'phone' && typeof window !== 'undefined' && !window.recaptchaVerifier) {
      const recaptchaContainer = document.getElementById('recaptcha-container');
      if (recaptchaContainer) {
        window.recaptchaVerifier = new RecaptchaVerifier(firebaseAuth, 'recaptcha-container', {
          'size': 'invisible',
          'callback': (response: any) => {
            console.log("Recaptcha verified (invisible)", response);
          },
          'expired-callback': () => {
            toast.error("Recaptcha expired. Please try sending OTP again.");
            if (window.recaptchaVerifier) {
              window.recaptchaVerifier.clear();
            }
          }
        });
        window.recaptchaVerifier.render().catch(err => {
          console.error("Recaptcha render error:", err);
          toast.error("Could not render reCAPTCHA. Please ensure you're online and refresh.");
        });
      }
    }
    return () => {
      // Optional cleanup, can be tricky with Firebase
    };
  }, [method]);

  const handleSendOtp = async (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    if (method === 'email') {
      toast.info("Email OTP verification is not implemented in this step."); // Matching current version behavior
      return;
    }

    if (!phone) {
      toast.error("Please enter your phone number.");
      return;
    }
    if (!window.recaptchaVerifier) {
      toast.error("Recaptcha not initialized. Please wait or refresh the page.");
      return;
    }

    setIsSendingOtp(true);
    try {
      const formattedPhoneNumber = phone.startsWith('+') ? phone : `+${phone}`;
      const confirmation = await signInWithPhoneNumber(firebaseAuth, formattedPhoneNumber, window.recaptchaVerifier);
      setConfirmationResultState(confirmation);
      setOtpSent(true);
      toast.success("OTP sent successfully to your phone!");
    } catch (error: any) {
      console.error("Error sending OTP:", error);
      toast.error(`Failed to send OTP: ${error.message}`);
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.render().catch(err => console.error("Recaptcha re-render error:", err));
      }
    } finally {
      setIsSendingOtp(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp || otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP.");
      return;
    }
    if (!confirmationResultState) {
      toast.error("OTP not sent yet or confirmation result is missing.");
      return;
    }
    if (!token) {
      toast.error("Authentication token not found. Please log in.");
      return;
    }

    setIsVerifyingOtp(true);
    try {
      await confirmationResultState.confirm(otp);
      await markUserAsVerified(token);

      setVerified(true);
      toast.success("Phone number verified successfully!");

      if (refetchUser) await refetchUser();

      const finalUserTypeForNav = user?.user_type || queryUserType || 'individual';
      router.push(`/auth/onboarding-with-ai/profile?type=${finalUserTypeForNav}`);

    } catch (error: any) {
      console.error("Error verifying OTP:", error);
      toast.error(`Failed to verify OTP: ${error.message}`);
    } finally {
      setIsVerifyingOtp(false);
    }
  };

  if (isAuthLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading user data...</div>;
  }

  const pageUserType = user?.user_type || queryUserType || 'individual';

  if (!user && !queryUserType) {
    toast.error("User information not available. Redirecting to login.");
    if (typeof window !== 'undefined') {
        router.push('/auth/login');
    }
    return <div className="min-h-screen flex items-center justify-center">Redirecting...</div>;
  }
  const criticalUserType = user?.user_type || pageUserType;


  return (
    <div className="min-h-screen bg-brand-bg-light-gray py-4 sm:py-8 px-4">
      <OnboardingStepper /> {/* Used existing stepper */}
      <div className="max-w-xl mx-auto bg-white p-4 sm:p-6 lg:p-8 rounded-lg shadow-md text-center relative">
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
          {/* Ensure navigation uses criticalUserType and the correct path prefix */}
          <Link href={`/auth/onboarding-with-ai/profile?type=${criticalUserType}`}>Skip</Link>
        </Button>
        
        <div className="flex justify-center mb-4 sm:mb-6 mt-12 sm:mt-16">
          <button
            className={`flex items-center px-3 sm:px-4 py-2 rounded-l-lg border border-gray-200 font-medium text-sm sm:text-base ${method === 'email' ? 'bg-black text-white' : 'bg-white text-black'}`}
            onClick={() => { setMethod('email'); setOtpSent(false); setVerified(false); setOtp(''); }}
          >
            <MailCheck className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" /> <span className="hidden sm:inline">Email</span><span className="sm:hidden">Email</span>
          </button>
          <button
            className={`flex items-center px-3 sm:px-4 py-2 rounded-r-lg border-t border-b border-r border-gray-200 font-medium text-sm sm:text-base ${method === 'phone' ? 'bg-black text-white' : 'bg-white text-black'}`}
            onClick={() => { setMethod('phone'); setOtpSent(false); setVerified(false); setOtp(''); }}
          >
            <Smartphone className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" /> <span className="hidden sm:inline">Phone</span><span className="sm:hidden">Phone</span>
          </button>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-brand-text-dark mb-3 sm:mb-4">Verify Your {method === 'email' ? 'Email' : 'Phone Number'}</h1>
        <p className="text-sm sm:text-base text-brand-text-medium mb-4 sm:mb-6 px-2">
          Enter your {method === 'email' ? 'email address' : 'phone number'} to receive a one-time password (OTP).
        </p>
        <form className="space-y-4 sm:space-y-6" onSubmit={handleSendOtp}>
          {method === 'email' ? (
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="mb-2 py-3 sm:py-4 px-3 sm:px-4 text-base" // Kept new UI styles
              required
              disabled={otpSent || isSendingOtp} // Added disabled state
            />
          ) : (
            <Input
              type="tel"
              placeholder="Enter your phone number (e.g. +14155552671)" // Added example placeholder
              value={phone}
              onChange={e => setPhone(e.target.value)}
              className="mb-2 py-3 sm:py-4 px-3 sm:px-4 text-base" // Kept new UI styles
              required
              disabled={otpSent || isSendingOtp} // Added disabled state
            />
          )}
          {/* reCAPTCHA container must always be present in the DOM for invisible reCAPTCHA */}
          <div id="recaptcha-container" className="my-4 flex justify-center"></div>
          <Button type="submit" className="w-full bg-black hover:bg-gray-900 text-white font-medium py-3 sm:py-4 text-sm sm:text-base" disabled={isSendingOtp || (otpSent && method === 'phone' && !isVerifyingOtp) }>
            {isSendingOtp ? 'Sending OTP...' : (otpSent && method === 'phone' ? 'Resend OTP' : 'Send OTP')}
          </Button>
        </form>

        {otpSent && !verified && method === 'phone' && ( // Only show OTP input for phone if OTP sent and not yet verified
          <div className="mt-6 sm:mt-8">
            <p className="mb-3 sm:mb-4 text-sm sm:text-base text-brand-text-medium px-2">Enter the 6-digit OTP sent to your phone.</p>
            <InputOTP maxLength={6} value={otp} onChange={setOtp} className="mx-auto gap-2 sm:gap-3" containerClassName="justify-center mb-4" >
              <InputOTPGroup>
                {[...Array(6)].map((_, i) => (
                  <InputOTPSlot key={i} index={i} className="w-10 h-10 sm:w-12 sm:h-12 text-base sm:text-lg" />
                ))}
              </InputOTPGroup>
            </InputOTP>
            <Button
              className="w-full bg-black hover:bg-gray-900 text-white font-medium mt-4 py-3 sm:py-4 text-sm sm:text-base"
              onClick={handleVerifyOtp} // Changed to handleVerifyOtp
              disabled={otp.length !== 6 || isVerifyingOtp} // Added isVerifyingOtp to disabled state
            >
              {isVerifyingOtp ? 'Verifying...' : 'Verify OTP'}
            </Button>
          </div>
        )}

        {verified && (
          <div className="mt-6 sm:mt-8">
            <p className="mb-3 sm:mb-4 text-green-700 font-medium text-sm sm:text-base px-2">Your {method === 'email' ? 'email' : 'phone number'} has been verified!</p>
            <Button asChild className="w-full bg-black hover:bg-gray-900 text-white font-medium py-3 sm:py-4 text-sm sm:text-base">
              {/* Ensure navigation uses criticalUserType and the correct path prefix */}
              <Link href={`/auth/onboarding-with-ai/profile?type=${criticalUserType}`}>Continue</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
