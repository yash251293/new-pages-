"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Target, Briefcase, MapPin, DollarSign, Plus, X, Save, Sparkles, TrendingUp, ArrowLeft } from "lucide-react"

export default function CareerInterestsPage() {
  const router = useRouter()
  const [interests, setInterests] = useState({
    jobTitles: [] as string[],
    industries: [] as string[],
    companies: [] as string[],
    skills: [] as string[],
    locations: [] as string[],
    jobTypes: [] as string[],
    experienceLevel: "",
    salaryRange: { min: "", max: "" },
    remotePreference: "",
    workEnvironment: "",
    careerGoals: "",
    availability: "",
  })

  const [newInputs, setNewInputs] = useState({
    jobTitle: "",
    industry: "",
    company: "",
    skill: "",
    location: "",
  })

  const [isLoading, setIsLoading] = useState(false)

  const predefinedOptions = {
    industries: [
      "Technology",
      "Healthcare",
      "Finance",
      "Education",
      "Marketing",
      "Design",
      "Sales",
      "Engineering",
      "Consulting",
      "Media",
      "Non-profit",
      "Government",
      "Retail",
      "Manufacturing",
      "Real Estate",
    ],
    jobTypes: ["Full-time", "Part-time", "Contract", "Freelance", "Internship", "Temporary"],
    skills: [
      "JavaScript",
      "Python",
      "React",
      "Node.js",
      "Data Analysis",
      "Project Management",
      "Digital Marketing",
      "UI/UX Design",
      "Machine Learning",
      "Sales",
      "Leadership",
      "Communication",
    ],
    companies: [
      "Google",
      "Microsoft",
      "Apple",
      "Amazon",
      "Meta",
      "Netflix",
      "Tesla",
      "Spotify",
      "Airbnb",
      "Uber",
      "Stripe",
      "Figma",
    ],
  }

  const addItem = (category: keyof typeof interests, value: string) => {
    if (value.trim()) {
      const currentValue = interests[category]
      if (Array.isArray(currentValue) && !currentValue.includes(value.trim())) {
        setInterests((prev) => ({
          ...prev,
          [category]: [...currentValue, value.trim()],
        }))
      }
    }
  }

  const removeItem = (category: keyof typeof interests, item: string) => {
    const currentValue = interests[category]
    if (Array.isArray(currentValue)) {
      setInterests((prev) => ({
        ...prev,
        [category]: currentValue.filter((i: string) => i !== item),
      }))
    }
  }

  const addFromInput = (category: string) => {
    const inputKey = category as keyof typeof newInputs
    const value = newInputs[inputKey]
    if (value) {
      addItem(category as keyof typeof interests, value)
      setNewInputs((prev) => ({ ...prev, [inputKey]: "" }))
    }
  }

  const handleSave = async () => {
    setIsLoading(true)
    // TODO: Save career interests to backend
    console.log("Saving career interests:", interests)

    setTimeout(() => {
      setIsLoading(false)
      // Show success message or redirect
    }, 1000)
  }

  return (
    <div className="max-w-4xl mx-auto py-4">
      <div className="mb-6">
        <Button 
          variant="ghost" 
          onClick={() => router.push('/explore')}
          className="flex items-center space-x-2 text-slate-600 hover:text-primary-navy hover:bg-slate-50 rounded-xl p-2"
        >
          <ArrowLeft className="h-5 w-5" />
          <span className="font-subheading">Back to Explore</span>
        </Button>
      </div>

      <Tabs defaultValue="preferences" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 h-12 bg-slate-50 rounded-2xl p-1">
          <TabsTrigger 
            value="preferences" 
            className="font-subheading data-[state=active]:bg-primary-navy data-[state=active]:text-white rounded-xl"
          >
            Job Preferences
          </TabsTrigger>
          <TabsTrigger 
            value="interests" 
            className="font-subheading data-[state=active]:bg-primary-navy data-[state=active]:text-white rounded-xl"
          >
            Interests
          </TabsTrigger>
          <TabsTrigger 
            value="goals" 
            className="font-subheading data-[state=active]:bg-primary-navy data-[state=active]:text-white rounded-xl"
          >
            Career Goals
          </TabsTrigger>
        </TabsList>

        <TabsContent value="preferences" className="space-y-6">
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-heading text-primary-navy">
                Job Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label className="text-sm font-subheading font-medium text-primary-navy">Experience Level</Label>
                  <Select
                    value={interests.experienceLevel}
                    onValueChange={(value) => setInterests((prev) => ({ ...prev, experienceLevel: value }))}
                  >
                    <SelectTrigger className="h-12 border-slate-200 focus:border-primary-navy rounded-xl font-subheading">
                      <SelectValue placeholder="Select experience level" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      <SelectItem value="entry" className="font-subheading">Entry Level (0-2 years)</SelectItem>
                      <SelectItem value="mid" className="font-subheading">Mid Level (3-5 years)</SelectItem>
                      <SelectItem value="senior" className="font-subheading">Senior Level (6-10 years)</SelectItem>
                      <SelectItem value="lead" className="font-subheading">Lead/Principal (10+ years)</SelectItem>
                      <SelectItem value="executive" className="font-subheading">Executive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label className="text-sm font-subheading font-medium text-primary-navy">Remote Work Preference</Label>
                  <Select
                    value={interests.remotePreference}
                    onValueChange={(value) => setInterests((prev) => ({ ...prev, remotePreference: value }))}
                  >
                    <SelectTrigger className="h-12 border-slate-200 focus:border-primary-navy rounded-xl font-subheading">
                      <SelectValue placeholder="Select preference" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      <SelectItem value="remote" className="font-subheading">Remote Only</SelectItem>
                      <SelectItem value="hybrid" className="font-subheading">Hybrid</SelectItem>
                      <SelectItem value="onsite" className="font-subheading">On-site Only</SelectItem>
                      <SelectItem value="flexible" className="font-subheading">Flexible</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <Label className="text-sm font-subheading font-medium text-primary-navy">Job Types</Label>
                <div className="flex flex-wrap gap-3">
                  {predefinedOptions.jobTypes.map((type) => (
                    <Badge
                      key={type}
                      variant={interests.jobTypes.includes(type) ? "default" : "outline"}
                      className={`cursor-pointer px-4 py-2 rounded-xl font-subheading transition-all duration-200 ${
                        interests.jobTypes.includes(type) 
                          ? 'bg-primary-navy text-white border-primary-navy hover:bg-primary-navy/90' 
                          : 'border-slate-200 text-slate-600 hover:border-primary-navy hover:text-primary-navy'
                      }`}
                      onClick={() => {
                        if (interests.jobTypes.includes(type)) {
                          removeItem("jobTypes", type)
                        } else {
                          addItem("jobTypes", type)
                        }
                      }}
                    >
                      {type}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <Label className="flex items-center space-x-2 text-sm font-subheading font-medium text-primary-navy">
                  <DollarSign className="h-5 w-5" />
                  <span>Salary Range (Annual)</span>
                </Label>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-sm font-subheading text-slate-500">Minimum</Label>
                    <Input
                      placeholder="$50,000"
                      value={interests.salaryRange.min}
                      onChange={(e) =>
                        setInterests((prev) => ({
                          ...prev,
                          salaryRange: { ...prev.salaryRange, min: e.target.value },
                        }))
                      }
                      className="h-12 border-slate-200 focus:border-primary-navy rounded-xl font-subheading"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-subheading text-slate-500">Maximum</Label>
                    <Input
                      placeholder="$100,000"
                      value={interests.salaryRange.max}
                      onChange={(e) =>
                        setInterests((prev) => ({
                          ...prev,
                          salaryRange: { ...prev.salaryRange, max: e.target.value },
                        }))
                      }
                      className="h-12 border-slate-200 focus:border-primary-navy rounded-xl font-subheading"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Label className="text-sm font-subheading font-medium text-primary-navy">Availability</Label>
                <Select
                  value={interests.availability}
                  onValueChange={(value) => setInterests((prev) => ({ ...prev, availability: value }))}
                >
                  <SelectTrigger className="h-12 border-slate-200 focus:border-primary-navy rounded-xl font-subheading">
                    <SelectValue placeholder="When can you start?" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="immediately" className="font-subheading">Immediately</SelectItem>
                    <SelectItem value="2weeks" className="font-subheading">2 weeks notice</SelectItem>
                    <SelectItem value="1month" className="font-subheading">1 month</SelectItem>
                    <SelectItem value="3months" className="font-subheading">3 months</SelectItem>
                    <SelectItem value="flexible" className="font-subheading">Flexible</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="interests" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-slate-200 shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-heading text-primary-navy">Job Titles</CardTitle>
                <p className="text-sm text-slate-500 font-subheading">Positions you're interested in</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex space-x-3">
                  <Input
                    placeholder="e.g., Software Engineer"
                    value={newInputs.jobTitle}
                    onChange={(e) => setNewInputs((prev) => ({ ...prev, jobTitle: e.target.value }))}
                    onKeyPress={(e) => e.key === "Enter" && addFromInput("jobTitles")}
                    className="h-12 border-slate-200 focus:border-primary-navy rounded-xl font-subheading"
                  />
                  <Button 
                    onClick={() => addFromInput("jobTitles")} 
                    size="icon"
                    className="h-12 w-12 bg-primary-navy hover:bg-primary-navy/90 rounded-xl"
                  >
                    <Plus className="h-5 w-5" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 min-h-[100px] p-4 border border-slate-200 rounded-xl bg-slate-50/50">
                  {interests.jobTitles.map((title, index) => (
                    <Badge key={index} className="flex items-center gap-2 px-3 py-2 bg-primary-navy text-white rounded-lg font-subheading">
                      {title}
                      <X className="h-4 w-4 cursor-pointer hover:text-red-300" onClick={() => removeItem("jobTitles", title)} />
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-200 shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-heading text-primary-navy">Industries</CardTitle>
                <p className="text-sm text-slate-500 font-subheading">Sectors you want to work in</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex space-x-3">
                  <Input
                    placeholder="e.g., Technology"
                    value={newInputs.industry}
                    onChange={(e) => setNewInputs((prev) => ({ ...prev, industry: e.target.value }))}
                    onKeyPress={(e) => e.key === "Enter" && addFromInput("industries")}
                    className="h-12 border-slate-200 focus:border-primary-navy rounded-xl font-subheading"
                  />
                  <Button 
                    onClick={() => addFromInput("industries")} 
                    size="icon"
                    className="h-12 w-12 bg-primary-navy hover:bg-primary-navy/90 rounded-xl"
                  >
                    <Plus className="h-5 w-5" />
                  </Button>
                </div>
                <div className="space-y-3">
                  <Label className="text-sm font-subheading text-slate-500">Popular Industries:</Label>
                  <div className="flex flex-wrap gap-2">
                    {predefinedOptions.industries.map((industry) => (
                      <Badge
                        key={industry}
                        variant="outline"
                        className="cursor-pointer px-3 py-1 text-sm border-slate-200 text-slate-600 hover:border-primary-navy hover:text-primary-navy hover:bg-primary-navy/5 rounded-lg font-subheading transition-all duration-200"
                        onClick={() => addItem("industries", industry)}
                      >
                        + {industry}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 min-h-[60px] p-4 border border-slate-200 rounded-xl bg-slate-50/50">
                  {interests.industries.map((industry, index) => (
                    <Badge key={index} className="flex items-center gap-2 px-3 py-2 bg-primary-navy text-white rounded-lg font-subheading">
                      {industry}
                      <X className="h-4 w-4 cursor-pointer hover:text-red-300" onClick={() => removeItem("industries", industry)} />
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-200 shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-heading text-primary-navy">Companies</CardTitle>
                <p className="text-sm text-slate-500 font-subheading">Organizations you'd like to work for</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex space-x-3">
                  <Input
                    placeholder="e.g., Google"
                    value={newInputs.company}
                    onChange={(e) => setNewInputs((prev) => ({ ...prev, company: e.target.value }))}
                    onKeyPress={(e) => e.key === "Enter" && addFromInput("companies")}
                    className="h-12 border-slate-200 focus:border-primary-navy rounded-xl font-subheading"
                  />
                  <Button 
                    onClick={() => addFromInput("companies")} 
                    size="icon"
                    className="h-12 w-12 bg-primary-navy hover:bg-primary-navy/90 rounded-xl"
                  >
                    <Plus className="h-5 w-5" />
                  </Button>
                </div>
                <div className="space-y-3">
                  <Label className="text-sm font-subheading text-slate-500">Popular Companies:</Label>
                  <div className="flex flex-wrap gap-2">
                    {predefinedOptions.companies.map((company) => (
                      <Badge
                        key={company}
                        variant="outline"
                        className="cursor-pointer px-3 py-1 text-sm border-slate-200 text-slate-600 hover:border-primary-navy hover:text-primary-navy hover:bg-primary-navy/5 rounded-lg font-subheading transition-all duration-200"
                        onClick={() => addItem("companies", company)}
                      >
                        + {company}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 min-h-[60px] p-4 border border-slate-200 rounded-xl bg-slate-50/50">
                  {interests.companies.map((company, index) => (
                    <Badge key={index} className="flex items-center gap-2 px-3 py-2 bg-primary-navy text-white rounded-lg font-subheading">
                      {company}
                      <X className="h-4 w-4 cursor-pointer hover:text-red-300" onClick={() => removeItem("companies", company)} />
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-200 shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-heading text-primary-navy">Locations</CardTitle>
                <p className="text-sm text-slate-500 font-subheading">Where you'd like to work</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex space-x-3">
                  <Input
                    placeholder="e.g., San Francisco, CA"
                    value={newInputs.location}
                    onChange={(e) => setNewInputs((prev) => ({ ...prev, location: e.target.value }))}
                    onKeyPress={(e) => e.key === "Enter" && addFromInput("locations")}
                    className="h-12 border-slate-200 focus:border-primary-navy rounded-xl font-subheading"
                  />
                  <Button 
                    onClick={() => addFromInput("locations")} 
                    size="icon"
                    className="h-12 w-12 bg-primary-navy hover:bg-primary-navy/90 rounded-xl"
                  >
                    <Plus className="h-5 w-5" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 min-h-[100px] p-4 border border-slate-200 rounded-xl bg-slate-50/50">
                  {interests.locations.map((location, index) => (
                    <Badge key={index} className="flex items-center gap-2 px-3 py-2 bg-primary-navy text-white rounded-lg font-subheading">
                      <MapPin className="h-4 w-4" />
                      {location}
                      <X className="h-4 w-4 cursor-pointer hover:text-red-300" onClick={() => removeItem("locations", location)} />
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="goals" className="space-y-6">
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-heading text-primary-navy">
                Career Goals & Aspirations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label className="text-sm font-subheading font-medium text-primary-navy">What are your career goals?</Label>
                <Textarea
                  placeholder="Describe your short-term and long-term career aspirations, what you want to achieve, and how you want to grow professionally..."
                  value={interests.careerGoals}
                  onChange={(e) => setInterests((prev) => ({ ...prev, careerGoals: e.target.value }))}
                  rows={6}
                  className="border-slate-200 focus:border-primary-navy rounded-xl font-subheading resize-none"
                />
              </div>

              <div className="space-y-3">
                <Label className="text-sm font-subheading font-medium text-primary-navy">Work Environment Preference</Label>
                <Select
                  value={interests.workEnvironment}
                  onValueChange={(value) => setInterests((prev) => ({ ...prev, workEnvironment: value }))}
                >
                  <SelectTrigger className="h-12 border-slate-200 focus:border-primary-navy rounded-xl font-subheading">
                    <SelectValue placeholder="Select work environment" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="startup" className="font-subheading">Startup (Fast-paced, innovative)</SelectItem>
                    <SelectItem value="corporate" className="font-subheading">Corporate (Structured, stable)</SelectItem>
                    <SelectItem value="agency" className="font-subheading">Agency (Creative, client-focused)</SelectItem>
                    <SelectItem value="nonprofit" className="font-subheading">Non-profit (Mission-driven)</SelectItem>
                    <SelectItem value="government" className="font-subheading">Government (Public service)</SelectItem>
                    <SelectItem value="freelance" className="font-subheading">Freelance (Independent)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <Label className="text-sm font-subheading font-medium text-primary-navy">Skills You Want to Develop</Label>
                <div className="flex space-x-3">
                  <Input
                    placeholder="e.g., Machine Learning"
                    value={newInputs.skill}
                    onChange={(e) => setNewInputs((prev) => ({ ...prev, skill: e.target.value }))}
                    onKeyPress={(e) => e.key === "Enter" && addFromInput("skills")}
                    className="h-12 border-slate-200 focus:border-primary-navy rounded-xl font-subheading"
                  />
                  <Button 
                    onClick={() => addFromInput("skills")} 
                    size="icon"
                    className="h-12 w-12 bg-primary-navy hover:bg-primary-navy/90 rounded-xl"
                  >
                    <Plus className="h-5 w-5" />
                  </Button>
                </div>
                <div className="space-y-3">
                  <Label className="text-sm font-subheading text-slate-500">Popular Skills:</Label>
                  <div className="flex flex-wrap gap-2">
                    {predefinedOptions.skills.map((skill) => (
                      <Badge
                        key={skill}
                        variant="outline"
                        className="cursor-pointer px-3 py-1 text-sm border-slate-200 text-slate-600 hover:border-primary-navy hover:text-primary-navy hover:bg-primary-navy/5 rounded-lg font-subheading transition-all duration-200"
                        onClick={() => addItem("skills", skill)}
                      >
                        + {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 min-h-[60px] p-4 border border-slate-200 rounded-xl bg-slate-50/50">
                  {interests.skills.map((skill, index) => (
                    <Badge key={index} className="flex items-center gap-2 px-3 py-2 bg-primary-navy text-white rounded-lg font-subheading">
                      {skill}
                      <X className="h-4 w-4 cursor-pointer hover:text-red-300" onClick={() => removeItem("skills", skill)} />
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-center space-x-6 pt-8 pb-4">
        <Button 
          variant="outline"
          className="px-8 py-3 h-12 border-slate-200 text-slate-600 hover:border-primary-navy hover:text-primary-navy rounded-xl font-subheading"
        >
          Cancel
        </Button>
        <Button 
          onClick={handleSave} 
          disabled={isLoading} 
          className="px-12 py-3 h-12 bg-primary-navy hover:bg-primary-navy/90 rounded-xl font-subheading"
        >
          {isLoading ? (
            <div className="flex items-center space-x-3">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Saving Preferences...</span>
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <Save className="h-5 w-5" />
              <span>Save Career Interests</span>
            </div>
          )}
        </Button>
      </div>
    </div>
  )
}
