"use client" // For form handling state

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { SearchIcon, XIcon, MapPinIcon, BuildingIcon, LinkIcon, BriefcaseIcon, UsersIcon, UserIcon, GraduationCapIcon } from "lucide-react"
import Link from "next/link"
import { OnboardingStepperWrapper } from "@/components/onboarding-stepper-wrapper"
import { useSearchParams } from "next/navigation"
import { AIFormField } from "@/components/ai-form-field"

export default function ProfilePage() {
  const searchParams = useSearchParams()
  const userType = searchParams.get('type') || 'company'
  const [location, setLocation] = useState("Noida, Uttar Pradesh")
  const [searchLocation, setSearchLocation] = useState("")
  
  // Form state for AI integration
  const [companyDescription, setCompanyDescription] = useState("")
  const [techStack, setTechStack] = useState("")
  const [professionalTitle, setProfessionalTitle] = useState("")
  const [keySkills, setKeySkills] = useState("")

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
          <Link href={`/onboarding/preferences?type=${userType}`}>Skip</Link>
        </Button>

        <div className="text-center mb-6 sm:mb-8 mt-12 sm:mt-16">
          <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-black to-gray-800 rounded-2xl shadow-lg mb-3 sm:mb-4">
            {userType === 'company' ? (
              <BuildingIcon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            ) : (
              <UserIcon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            )}
          </div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-brand-text-dark mb-2 sm:mb-3 px-2">
            {userType === 'company' 
              ? 'Tell us about your company' 
              : 'Tell us about yourself'
            }
          </h1>
          <p className="text-sm sm:text-base text-brand-text-medium leading-relaxed px-2">
            {userType === 'company'
              ? 'Share your company details to help us connect you with the right talent and opportunities.'
              : 'Share your details to help us connect you with the right opportunities and people.'
            }
          </p>
        </div>

        <form className="space-y-6 sm:space-y-8 lg:space-y-10">
          {/* Location Section */}
          <div className="space-y-3 sm:space-y-4 lg:space-y-5">
            <div className="flex items-center space-x-2 mb-2 sm:mb-3">
              <MapPinIcon className="h-4 w-4 sm:h-5 sm:w-5 text-black" />
              <Label htmlFor="location" className="text-sm sm:text-base font-semibold text-brand-text-dark">
                {userType === 'company' 
                  ? 'Where is your company headquartered?' 
                  : 'Where are you located?'
                } <span className="text-brand-red">*</span>
              </Label>
            </div>
            <div className="bg-gray-50 p-3 sm:p-4 rounded-lg border border-gray-200">
              <p className="text-xs sm:text-sm text-gray-700">
                <strong>💡 Location Benefits:</strong> {userType === 'company' 
                  ? 'Your company location helps us match you with local talent and understand your regional market presence.'
                  : 'Your location helps us find relevant job opportunities and connect you with companies in your area.'
                }
              </p>
            </div>
            
            {location && (
              <div className="animate-in slide-in-from-left duration-300">
                <div className="inline-flex items-center bg-gradient-to-r from-black to-gray-800 text-white text-xs sm:text-sm font-medium px-3 sm:px-4 py-2 sm:py-2.5 rounded-full shadow-md">
                  <MapPinIcon className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                  <span className="truncate max-w-[200px] sm:max-w-none">{location}</span>
                  <button
                    type="button"
                    onClick={() => setLocation("")}
                    className="ml-2 text-white hover:bg-white/20 rounded-full p-1 transition-colors"
                  >
                    <XIcon className="h-3 w-3" />
                  </button>
                </div>
              </div>
            )}
            
            <div className="relative">
              <Input
                id="searchLocation"
                type="text"
                placeholder="Search for a city, state, or country"
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                className="bg-brand-bg-input border-brand-border placeholder-brand-text-light focus:border-black focus:ring-2 focus:ring-black/20 pl-9 sm:pl-10 py-3 sm:py-4 text-sm sm:text-base"
              />
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-3 w-3 sm:h-4 sm:w-4 text-brand-text-light" />
            </div>
          </div>

          {userType === 'company' ? (
            // Company Profile Sections
            <>
              {/* Company Details Section */}
              <div className="border-t border-brand-border pt-6 sm:pt-8 space-y-4 sm:space-y-6">
                <div className="flex items-center space-x-2 mb-4 sm:mb-6">
                  <BuildingIcon className="h-4 w-4 sm:h-5 sm:w-5 text-black" />
                  <h2 className="text-lg sm:text-xl font-semibold text-brand-text-dark">Company Information</h2>
                </div>

                <div className="space-y-4 sm:space-y-6">
                  <div>
                    <Label htmlFor="companyType" className="block text-sm sm:text-base font-semibold text-brand-text-dark mb-2 sm:mb-3">
                      What type of company are you? <span className="text-brand-red">*</span>
                    </Label>
                    <Select>
                      <SelectTrigger className="w-full bg-brand-bg-input border-brand-border focus:border-black focus:ring-2 focus:ring-black/20 h-11 sm:h-12 text-sm sm:text-base">
                        <SelectValue placeholder="Select company type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="startup">🚀 Startup</SelectItem>
                        <SelectItem value="enterprise">🏢 Enterprise</SelectItem>
                        <SelectItem value="agency">🎯 Agency</SelectItem>
                        <SelectItem value="nonprofit">💝 Non-Profit</SelectItem>
                        <SelectItem value="government">🏛️ Government</SelectItem>
                        <SelectItem value="other">🔧 Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="companySize" className="block text-sm sm:text-base font-semibold text-brand-text-dark mb-2 sm:mb-3">
                      Company Size <span className="text-brand-red">*</span>
                    </Label>
                    <Select>
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
                  </div>

                  <div>
                    <Label htmlFor="companyDescription" className="block text-sm sm:text-base font-semibold text-brand-text-dark mb-2 sm:mb-3">
                      Company Description <span className="text-brand-red">*</span>
                    </Label>
                    <p className="text-xs sm:text-sm text-brand-text-medium mb-3 sm:mb-4">
                      Tell us about your company's mission, values, and what makes you unique.
                    </p>
                    <AIFormField
                      aiProps={{
                        fieldType: 'textarea',
                        fieldName: 'Company Description',
                        placeholder: 'Describe your company...',
                        value: companyDescription,
                        onChange: (value) => setCompanyDescription(value as string),
                        context: {
                          userType: 'company'
                        }
                      }}
                    >
                      <Textarea
                        id="companyDescription"
                        value={companyDescription}
                        onChange={(e) => setCompanyDescription(e.target.value)}
                        placeholder="Describe your company..."
                        className="bg-brand-bg-input border-brand-border focus:border-black focus:ring-2 focus:ring-black/20 min-h-[100px] sm:min-h-[120px] text-sm sm:text-base"
                      />
                    </AIFormField>
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
                    <Select>
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
                        <SelectItem value="other">🔧 Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="techStack" className="block text-sm sm:text-base font-semibold text-brand-text-dark mb-2 sm:mb-3">
                      Tech Stack/Tools <span className="text-brand-red">*</span>
                    </Label>
                    <p className="text-xs sm:text-sm text-brand-text-medium mb-3 sm:mb-4">
                      What technologies, tools, and platforms does your company use?
                    </p>
                    <AIFormField
                      aiProps={{
                        fieldType: 'textarea',
                        fieldName: 'Tech Stack',
                        placeholder: 'React, Node.js, Python, AWS...',
                        value: techStack,
                        onChange: (value) => setTechStack(value as string),
                        context: {
                          userType: 'company'
                        }
                      }}
                    >
                      <Textarea
                        id="techStack"
                        value={techStack}
                        onChange={(e) => setTechStack(e.target.value)}
                        placeholder="React, Node.js, Python, AWS..."
                        className="bg-brand-bg-input border-brand-border focus:border-black focus:ring-2 focus:ring-black/20 min-h-[80px] sm:min-h-[100px] text-sm sm:text-base"
                      />
                    </AIFormField>
                  </div>
                </div>
              </div>

              {/* Company Links Section */}
              <div className="border-t border-brand-border pt-6 sm:pt-8 space-y-4 sm:space-y-6">
                <div className="flex items-center space-x-2 mb-4 sm:mb-6">
                  <LinkIcon className="h-4 w-4 sm:h-5 sm:w-5 text-black" />
                  <h2 className="text-lg sm:text-xl font-semibold text-brand-text-dark">Company Links</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <Label htmlFor="website" className="block text-sm sm:text-base font-semibold text-brand-text-dark mb-2 sm:mb-3">
                      Website URL
                    </Label>
                    <Input
                      id="website"
                      type="url"
                      placeholder="https://yourcompany.com"
                      className="bg-brand-bg-input border-brand-border focus:border-black focus:ring-2 focus:ring-black/20 py-3 sm:py-4 text-sm sm:text-base"
                    />
                  </div>

                  <div>
                    <Label htmlFor="linkedin" className="block text-sm sm:text-base font-semibold text-brand-text-dark mb-2 sm:mb-3">
                      LinkedIn Profile
                    </Label>
                    <Input
                      id="linkedin"
                      type="url"
                      placeholder="https://linkedin.com/company/..."
                      className="bg-brand-bg-input border-brand-border focus:border-black focus:ring-2 focus:ring-black/20 py-3 sm:py-4 text-sm sm:text-base"
                    />
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
                    <Label htmlFor="professionalTitle" className="block text-sm sm:text-base font-semibold text-brand-text-dark mb-2 sm:mb-3">
                      Professional Title <span className="text-brand-red">*</span>
                    </Label>
                    <p className="text-xs sm:text-sm text-brand-text-medium mb-3 sm:mb-4">
                      What's your current role or the role you're seeking?
                    </p>
                    <AIFormField
                      aiProps={{
                        fieldType: 'input',
                        fieldName: 'Professional Title',
                        placeholder: 'Software Developer, Product Manager...',
                        value: professionalTitle,
                        onChange: (value) => setProfessionalTitle(value as string),
                        context: {
                          userType: 'individual'
                        }
                      }}
                    >
                      <Input
                        id="professionalTitle"
                        value={professionalTitle}
                        onChange={(e) => setProfessionalTitle(e.target.value)}
                        placeholder="Software Developer, Product Manager..."
                        className="bg-brand-bg-input border-brand-border focus:border-black focus:ring-2 focus:ring-black/20 py-3 sm:py-4 text-sm sm:text-base"
                      />
                    </AIFormField>
                  </div>

                  <div>
                    <Label htmlFor="experienceLevel" className="block text-sm sm:text-base font-semibold text-brand-text-dark mb-2 sm:mb-3">
                      Experience Level <span className="text-brand-red">*</span>
                    </Label>
                    <Select>
                      <SelectTrigger className="w-full bg-brand-bg-input border-brand-border focus:border-black focus:ring-2 focus:ring-black/20 h-11 sm:h-12 text-sm sm:text-base">
                        <SelectValue placeholder="Select your experience level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="student">🎓 Student/Fresh Graduate</SelectItem>
                        <SelectItem value="entry">🌱 Entry Level (0-2 years)</SelectItem>
                        <SelectItem value="mid">💼 Mid Level (2-5 years)</SelectItem>
                        <SelectItem value="senior">🚀 Senior Level (5-10 years)</SelectItem>
                        <SelectItem value="lead">👑 Lead/Manager (10+ years)</SelectItem>
                        <SelectItem value="executive">🎯 Executive/Director</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Skills & Education Section */}
              <div className="border-t border-brand-border pt-6 sm:pt-8 space-y-4 sm:space-y-6">
                <div className="flex items-center space-x-2 mb-4 sm:mb-6">
                  <GraduationCapIcon className="h-4 w-4 sm:h-5 sm:w-5 text-black" />
                  <h2 className="text-lg sm:text-xl font-semibold text-brand-text-dark">Skills & Education</h2>
                </div>

                <div className="space-y-4 sm:space-y-6">
                  <div>
                    <Label htmlFor="keySkills" className="block text-sm sm:text-base font-semibold text-brand-text-dark mb-2 sm:mb-3">
                      Key Skills <span className="text-brand-red">*</span>
                    </Label>
                    <p className="text-xs sm:text-sm text-brand-text-medium mb-3 sm:mb-4">
                      List your top skills and technologies.
                    </p>
                    <AIFormField
                      aiProps={{
                        fieldType: 'textarea',
                        fieldName: 'Key Skills',
                        placeholder: 'JavaScript, React, Python, Project Management...',
                        value: keySkills,
                        onChange: (value) => setKeySkills(value as string),
                        context: {
                          userType: 'individual'
                        }
                      }}
                    >
                      <Textarea
                        id="keySkills"
                        value={keySkills}
                        onChange={(e) => setKeySkills(e.target.value)}
                        placeholder="JavaScript, React, Python, Project Management..."
                        className="bg-brand-bg-input border-brand-border focus:border-black focus:ring-2 focus:ring-black/20 min-h-[80px] sm:min-h-[100px] text-sm sm:text-base"
                      />
                    </AIFormField>
                  </div>

                  <div>
                    <Label htmlFor="education" className="block text-sm sm:text-base font-semibold text-brand-text-dark mb-2 sm:mb-3">
                      Education
                    </Label>
                    <Input
                      id="education"
                      placeholder="University, Degree, Year"
                      className="bg-brand-bg-input border-brand-border focus:border-black focus:ring-2 focus:ring-black/20 py-3 sm:py-4 text-sm sm:text-base"
                    />
                  </div>
                </div>
              </div>

              {/* Links Section for Individual */}
              <div className="border-t border-brand-border pt-6 sm:pt-8 space-y-4 sm:space-y-6">
                <div className="flex items-center space-x-2 mb-4 sm:mb-6">
                  <LinkIcon className="h-4 w-4 sm:h-5 sm:w-5 text-black" />
                  <h2 className="text-lg sm:text-xl font-semibold text-brand-text-dark">Professional Links</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <Label htmlFor="portfolio" className="block text-sm sm:text-base font-semibold text-brand-text-dark mb-2 sm:mb-3">
                      Portfolio/Website
                    </Label>
                    <Input
                      id="portfolio"
                      type="url"
                      placeholder="https://yourportfolio.com"
                      className="bg-brand-bg-input border-brand-border focus:border-black focus:ring-2 focus:ring-black/20 py-3 sm:py-4 text-sm sm:text-base"
                    />
                  </div>

                  <div>
                    <Label htmlFor="linkedinProfile" className="block text-sm sm:text-base font-semibold text-brand-text-dark mb-2 sm:mb-3">
                      LinkedIn Profile
                    </Label>
                    <Input
                      id="linkedinProfile"
                      type="url"
                      placeholder="https://linkedin.com/in/..."
                      className="bg-brand-bg-input border-brand-border focus:border-black focus:ring-2 focus:ring-black/20 py-3 sm:py-4 text-sm sm:text-base"
                    />
                  </div>

                  <div>
                    <Label htmlFor="github" className="block text-sm sm:text-base font-semibold text-brand-text-dark mb-2 sm:mb-3">
                      GitHub Profile
                    </Label>
                    <Input
                      id="github"
                      type="url"
                      placeholder="https://github.com/..."
                      className="bg-brand-bg-input border-brand-border focus:border-black focus:ring-2 focus:ring-black/20 py-3 sm:py-4 text-sm sm:text-base"
                    />
                  </div>

                  <div>
                    <Label htmlFor="resume" className="block text-sm sm:text-base font-semibold text-brand-text-dark mb-2 sm:mb-3">
                      Resume URL
                    </Label>
                    <Input
                      id="resume"
                      type="url"
                      placeholder="https://drive.google.com/..."
                      className="bg-brand-bg-input border-brand-border focus:border-black focus:ring-2 focus:ring-black/20 py-3 sm:py-4 text-sm sm:text-base"
                    />
                  </div>
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
              <Link href="/">← Back to Home</Link>
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-black hover:bg-gray-900 text-white font-medium rounded-xl py-3 sm:py-4 text-sm sm:text-base"
              asChild
            >
              <Link href={`/onboarding/preferences?type=${userType}`}>
                Continue to Preferences →
              </Link>
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
