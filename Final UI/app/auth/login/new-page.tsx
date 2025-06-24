"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Logo } from "@/components/logo"
import { EyeIcon, EyeOffIcon, Phone, Mail } from "lucide-react"
import { useState, useEffect } from "react"
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from "@/components/ui/input-otp"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [loginMethod, setLoginMethod] = useState<'email' | 'phone'>('email')
  const [showOTP, setShowOTP] = useState(false)
  const [otpValue, setOtpValue] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [isOTPSent, setIsOTPSent] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  // Load remembered credentials on component mount
  useEffect(() => {
    const rememberedEmail = localStorage.getItem('rememberedEmail')
    const rememberedPassword = localStorage.getItem('rememberedPassword')
    const wasRemembered = localStorage.getItem('rememberMe') === 'true'
    
    if (wasRemembered && rememberedEmail) {
      setEmail(rememberedEmail)
      setPassword(rememberedPassword || '')
      setRememberMe(true)
    }
  }, [])

  // Handle remember me functionality
  const handleRememberMeChange = (checked: boolean) => {
    setRememberMe(checked)
    if (!checked) {
      // Clear remembered credentials if unchecked
      localStorage.removeItem('rememberedEmail')
      localStorage.removeItem('rememberedPassword')
      localStorage.removeItem('rememberMe')
    }
  }

  // Handle form submission
  const handleEmailLogin = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (rememberMe) {
      // Save credentials to localStorage
      localStorage.setItem('rememberedEmail', email)
      localStorage.setItem('rememberedPassword', password)
      localStorage.setItem('rememberMe', 'true')
    } else {
      // Clear any existing remembered credentials
      localStorage.removeItem('rememberedEmail')
      localStorage.removeItem('rememberedPassword')
      localStorage.removeItem('rememberMe')
    }
    
    // Here you would typically call your login API
    console.log("Logging in with:", { email, password, rememberMe })
  }

  const handleSendOTP = () => {
    if (phoneNumber.length >= 10) {
      setIsOTPSent(true)
      setShowOTP(true)
      // Here you would typically call your OTP API
      console.log("Sending OTP to:", phoneNumber)
    }
  }

  const handleVerifyOTP = () => {
    if (otpValue.length === 6) {
      // Here you would typically verify the OTP with your API
      console.log("Verifying OTP:", otpValue, "for phone:", phoneNumber)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex w-full max-w-6xl mx-auto rounded-2xl shadow-xl overflow-hidden border">
        {/* Left Side - Image and Text */}
        <div className="w-1/2 flex flex-col items-center justify-center bg-[#FFFCF6] p-12">
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
        {/* Right Side - Card */}
        <div className="w-1/2 flex flex-col justify-center bg-white p-12 min-h-full">
          <div className="mb-8 text-center">
            <span className="text-2xl font-black" style={{fontFamily: 'Lora, serif', color: '#000000'}}>100</span>
            <span className="text-2xl font-black" style={{fontFamily: 'Lora, serif', color: '#0056B3'}}>Networks</span>
          </div>
          <h1 className="text-4xl font-black text-brand-text-dark mb-8 text-center" style={{fontFamily: 'Inter, sans-serif'}}>Login</h1>
          
          {/* Login Method Toggle */}
          <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
            <button
              type="button"
              onClick={() => {
                setLoginMethod('email')
                setShowOTP(false)
                setIsOTPSent(false)
                setOtpValue("")
              }}
              className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-md font-medium transition-colors ${
                loginMethod === 'email' 
                  ? 'bg-white text-black shadow-sm' 
                  : 'text-gray-600 hover:text-black'
              }`}
            >
              <Mail className="h-4 w-4" />
              Email
            </button>
            <button
              type="button"
              onClick={() => {
                setLoginMethod('phone')
                setShowOTP(false)
                setIsOTPSent(false)
                setOtpValue("")
              }}
              className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-md font-medium transition-colors ${
                loginMethod === 'phone' 
                  ? 'bg-white text-black shadow-sm' 
                  : 'text-gray-600 hover:text-black'
              }`}
            >
              <Phone className="h-4 w-4" />
              Phone
            </button>
          </div>
          
          <form className="space-y-6" onSubmit={loginMethod === 'email' ? handleEmailLogin : undefined}>
            {loginMethod === 'email' ? (
              // Email Login Form
              <>
                <div>
                  <Label htmlFor="email" className="text-base font-semibold text-brand-text-medium">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="example@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-2 bg-brand-bg-input border-brand-border placeholder-brand-text-light focus:border-brand-blue focus:ring-1 focus:ring-brand-blue py-4 px-4 text-lg font-bold"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="password" className="text-base font-semibold text-brand-text-medium">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="mt-2 bg-brand-bg-input border-brand-border placeholder-brand-text-light focus:border-brand-blue focus:ring-1 focus:ring-brand-blue py-4 px-4 text-lg font-bold"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 px-4 flex items-center text-brand-text-medium hover:text-brand-blue"
                    >
                      {showPassword ? <EyeOffIcon className="h-6 w-6" /> : <EyeIcon className="h-6 w-6" />}
                    </button>
                  </div>
                </div>
                
                {/* Remember Me Checkbox */}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember-me"
                    checked={rememberMe}
                    onCheckedChange={handleRememberMeChange}
                    className="border-brand-border data-[state=checked]:bg-brand-blue data-[state=checked]:border-brand-blue"
                  />
                  <Label
                    htmlFor="remember-me"
                    className="text-sm font-medium text-brand-text-medium cursor-pointer"
                  >
                    Remember me
                  </Label>
                </div>
                
                <Button type="submit" className="w-full bg-black hover:bg-brand-text-dark text-white py-4 font-bold text-lg rounded-lg mt-2 shadow-md">
                  Sign In
                </Button>
              </>
            ) : (
              // Phone Login Form
              <>
                <div>
                  <Label htmlFor="phone" className="text-base font-semibold text-brand-text-medium">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="mt-2 bg-brand-bg-input border-brand-border placeholder-brand-text-light focus:border-brand-blue focus:ring-1 focus:ring-brand-blue py-4 px-4 text-lg font-bold"
                    disabled={isOTPSent}
                  />
                </div>

                {!isOTPSent ? (
                  <Button 
                    type="button"
                    onClick={handleSendOTP}
                    className="w-full bg-black hover:bg-brand-text-dark text-white py-4 font-bold text-lg rounded-lg mt-2 shadow-md"
                  >
                    Send OTP
                  </Button>
                ) : (
                  <>
                    <div>
                      <Label className="text-base font-semibold text-brand-text-medium">Enter OTP</Label>
                      <p className="text-sm text-brand-text-medium mb-3">
                        We've sent a 6-digit code to {phoneNumber}
                      </p>
                      <div className="flex justify-center">
                        <InputOTP 
                          maxLength={6} 
                          value={otpValue} 
                          onChange={(value) => setOtpValue(value)}
                        >
                          <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                          </InputOTPGroup>
                          <InputOTPSeparator />
                          <InputOTPGroup>
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                          </InputOTPGroup>
                        </InputOTP>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button 
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setIsOTPSent(false)
                          setShowOTP(false)
                          setOtpValue("")
                        }}
                        className="flex-1 py-4 font-bold text-lg rounded-lg"
                      >
                        Change Number
                      </Button>
                      <Button 
                        type="button"
                        onClick={handleVerifyOTP}
                        disabled={otpValue.length !== 6}
                        className="flex-1 bg-black hover:bg-brand-text-dark text-white py-4 font-bold text-lg rounded-lg shadow-md disabled:opacity-50"
                      >
                        Verify OTP
                      </Button>
                    </div>

                    <button
                      type="button"
                      onClick={handleSendOTP}
                      className="w-full text-center text-brand-blue hover:underline font-medium"
                    >
                      Resend OTP
                    </button>
                  </>
                )}
              </>
            )}
          </form>

          {/* Social Login Buttons */}
          <div className="flex items-center my-6">
            <hr className="flex-grow border-brand-border" />
            <span className="mx-4 text-base text-brand-text-medium font-medium">or Sign in with</span>
            <hr className="flex-grow border-brand-border" />
          </div>
          
          <div className="flex gap-8 mb-6 justify-center">
            <button className="hover:opacity-70 transition-opacity cursor-pointer">
              <svg className="w-12 h-12" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
            </button>
            <button className="hover:opacity-70 transition-opacity cursor-pointer">
              <svg className="w-12 h-12" viewBox="0 0 24 24">
                <path fill="#0077B5" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </button>
          </div>
          <div className="mt-8 text-center">
            <span className="text-base font-bold text-brand-text-dark">Don&apos;t have an account? </span>
            <Link href="/signup" className="font-bold text-brand-blue underline ml-1">Sign Up</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
