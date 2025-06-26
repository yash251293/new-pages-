"use client"

import { OnboardingStepperWrapper } from "@/components/onboarding-stepper-wrapper"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MailCheck, Smartphone } from "lucide-react"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { useSearchParams } from "next/navigation"

export default function VerifyEmailPage() {
  const searchParams = useSearchParams()
  const userType = searchParams.get('type') || 'individual'
  const [method, setMethod] = useState<'email' | 'phone'>('email')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')
  const [otpSent, setOtpSent] = useState(false)
  const [verified, setVerified] = useState(false)

  return (
    <div className="min-h-screen bg-brand-bg-light-gray py-4 sm:py-8 px-4">
      <OnboardingStepperWrapper />
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
          <Link href={`/onboarding/profile?type=${userType}`}>Skip</Link>
        </Button>
        
        <div className="flex justify-center mb-4 sm:mb-6 mt-12 sm:mt-16">
          <button
            className={`flex items-center px-3 sm:px-4 py-2 rounded-l-lg border border-gray-200 font-medium text-sm sm:text-base ${method === 'email' ? 'bg-black text-white' : 'bg-white text-black'}`}
            onClick={() => setMethod('email')}
          >
            <MailCheck className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" /> <span className="hidden sm:inline">Email</span><span className="sm:hidden">Email</span>
          </button>
          <button
            className={`flex items-center px-3 sm:px-4 py-2 rounded-r-lg border-t border-b border-r border-gray-200 font-medium text-sm sm:text-base ${method === 'phone' ? 'bg-black text-white' : 'bg-white text-black'}`}
            onClick={() => setMethod('phone')}
          >
            <Smartphone className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" /> <span className="hidden sm:inline">Phone</span><span className="sm:hidden">Phone</span>
          </button>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-brand-text-dark mb-3 sm:mb-4">Verify Your {method === 'email' ? 'Email' : 'Phone Number'}</h1>
        <p className="text-sm sm:text-base text-brand-text-medium mb-4 sm:mb-6 px-2">
          Enter your {method === 'email' ? 'email address' : 'phone number'} to receive a one-time password (OTP).
        </p>
        <form className="space-y-4 sm:space-y-6" onSubmit={e => { e.preventDefault(); setOtpSent(true); }}>
          {method === 'email' ? (
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="mb-2 py-3 sm:py-4 px-3 sm:px-4 text-base"
              required
            />
          ) : (
            <Input
              type="tel"
              placeholder="Enter your phone number"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              className="mb-2 py-3 sm:py-4 px-3 sm:px-4 text-base"
              required
            />
          )}
          <Button type="submit" className="w-full bg-black hover:bg-gray-900 text-white font-medium py-3 sm:py-4 text-sm sm:text-base">
            {otpSent ? 'Resend OTP' : 'Send OTP'}
          </Button>
        </form>
        {otpSent && !verified && (
          <div className="mt-6 sm:mt-8">
            <p className="mb-3 sm:mb-4 text-sm sm:text-base text-brand-text-medium px-2">Enter the 6-digit OTP sent to your {method === 'email' ? 'email' : 'phone'}.</p>
            <InputOTP maxLength={6} value={otp} onChange={setOtp} className="mx-auto gap-2 sm:gap-3" containerClassName="justify-center mb-4" >
              <InputOTPGroup>
                {[...Array(6)].map((_, i) => (
                  <InputOTPSlot key={i} index={i} className="w-10 h-10 sm:w-12 sm:h-12 text-base sm:text-lg" />
                ))}
              </InputOTPGroup>
            </InputOTP>
            <Button
              className="w-full bg-black hover:bg-gray-900 text-white font-medium mt-4 py-3 sm:py-4 text-sm sm:text-base"
              onClick={() => setVerified(true)}
              disabled={otp.length !== 6}
            >
              Verify OTP
            </Button>
          </div>
        )}
        {verified && (
          <div className="mt-6 sm:mt-8">
            <p className="mb-3 sm:mb-4 text-green-700 font-medium text-sm sm:text-base px-2">Your {method === 'email' ? 'email' : 'phone number'} has been verified!</p>
            <Button asChild className="w-full bg-black hover:bg-gray-900 text-white font-medium py-3 sm:py-4 text-sm sm:text-base">
              <Link href={`/onboarding/profile?type=${userType}`}>Continue</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
