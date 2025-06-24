import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function PostFreelanceProjectPage() {
  return (
    <div className="w-[65%] mx-auto py-6">
      <div className="flex items-center mb-8">
        <Link href="/jobs/freelance" className="mr-6">
          <Button 
            variant="ghost"
            className="flex items-center space-x-2 text-slate-600 hover:text-primary-navy hover:bg-slate-50 rounded-xl p-3"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="font-subheading">Back to Freelance</span>
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-heading text-primary-navy mb-2">Post a Freelance Project</h1>
          <p className="text-slate-600 font-subheading">Create a project to find the perfect freelancer for your needs</p>
        </div>
      </div>

      <Card className="border-slate-200 shadow-sm">
        <CardHeader className="pb-6">
          <CardTitle className="text-xl font-heading text-primary-navy">Project Details</CardTitle>
          <CardDescription className="text-slate-600 font-subheading">Provide comprehensive information about your project to attract qualified freelancers</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-8">
            <div className="space-y-3">
              <Label htmlFor="title" className="text-sm font-subheading font-medium text-primary-navy">Project Title</Label>
              <Input 
                id="title" 
                placeholder="e.g., 'Mobile App Developer for Fitness Application'" 
                className="h-12 border-slate-200 focus:border-primary-navy rounded-xl font-subheading"
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="category" className="text-sm font-subheading font-medium text-primary-navy">Category</Label>
              <Select>
                <SelectTrigger className="h-12 border-slate-200 focus:border-primary-navy rounded-xl font-subheading">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  <SelectItem value="web" className="font-subheading">Web Development</SelectItem>
                  <SelectItem value="mobile" className="font-subheading">Mobile Development</SelectItem>
                  <SelectItem value="design" className="font-subheading">Design</SelectItem>
                  <SelectItem value="writing" className="font-subheading">Content Writing</SelectItem>
                  <SelectItem value="marketing" className="font-subheading">Marketing</SelectItem>
                  <SelectItem value="data" className="font-subheading">Data Analysis</SelectItem>
                  <SelectItem value="ai" className="font-subheading">AI & Machine Learning</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label htmlFor="description" className="text-sm font-subheading font-medium text-primary-navy">Project Description</Label>
              <Textarea
                id="description"
                placeholder="Describe your project in detail, including goals, requirements, and deliverables..."
                rows={6}
                className="border-slate-200 focus:border-primary-navy rounded-xl font-subheading resize-none"
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="skills" className="text-sm font-subheading font-medium text-primary-navy">Required Skills</Label>
              <Input 
                id="skills" 
                placeholder="e.g., React Native, Firebase, UI/UX, API Integration" 
                className="h-12 border-slate-200 focus:border-primary-navy rounded-xl font-subheading"
              />
              <p className="text-sm text-slate-500 font-subheading">Separate skills with commas</p>
            </div>

            <div className="space-y-4">
              <Label className="text-sm font-subheading font-medium text-primary-navy">Project Budget</Label>
              <RadioGroup defaultValue="fixed" className="space-y-3">
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="fixed" id="fixed" className="border-slate-300" />
                  <Label htmlFor="fixed" className="font-subheading text-slate-700">Fixed Price</Label>
                </div>
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="hourly" id="hourly" className="border-slate-300" />
                  <Label htmlFor="hourly" className="font-subheading text-slate-700">Hourly Rate</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label htmlFor="min-budget" className="text-sm font-subheading font-medium text-primary-navy">Minimum Budget</Label>
                <div className="relative">
                  <span className="absolute left-4 top-4 text-slate-500 font-subheading">$</span>
                  <Input 
                    id="min-budget" 
                    className="h-12 pl-8 border-slate-200 focus:border-primary-navy rounded-xl font-subheading" 
                    placeholder="e.g., 500" 
                  />
                </div>
              </div>
              <div className="space-y-3">
                <Label htmlFor="max-budget" className="text-sm font-subheading font-medium text-primary-navy">Maximum Budget</Label>
                <div className="relative">
                  <span className="absolute left-4 top-4 text-slate-500 font-subheading">$</span>
                  <Input 
                    id="max-budget" 
                    className="h-12 pl-8 border-slate-200 focus:border-primary-navy rounded-xl font-subheading" 
                    placeholder="e.g., 2000" 
                  />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="duration" className="text-sm font-subheading font-medium text-primary-navy">Estimated Duration</Label>
              <Select>
                <SelectTrigger className="h-12 border-slate-200 focus:border-primary-navy rounded-xl font-subheading">
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  <SelectItem value="less-than-week" className="font-subheading">Less than 1 week</SelectItem>
                  <SelectItem value="1-2-weeks" className="font-subheading">1-2 weeks</SelectItem>
                  <SelectItem value="2-4-weeks" className="font-subheading">2-4 weeks</SelectItem>
                  <SelectItem value="1-3-months" className="font-subheading">1-3 months</SelectItem>
                  <SelectItem value="3-6-months" className="font-subheading">3-6 months</SelectItem>
                  <SelectItem value="ongoing" className="font-subheading">Ongoing project</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label htmlFor="attachments" className="text-sm font-subheading font-medium text-primary-navy">Attachments (Optional)</Label>
              <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center bg-slate-50/50">
                <p className="text-slate-600 font-subheading mb-4">Drag and drop files here, or click to browse files</p>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-slate-200 text-slate-600 hover:border-primary-navy hover:text-primary-navy rounded-lg font-subheading"
                >
                  Browse Files
                </Button>
                <p className="text-sm text-slate-500 font-subheading mt-4">
                  Max file size: 10MB. Supported formats: PDF, DOC, DOCX, JPG, PNG
                </p>
              </div>
            </div>

            <div className="flex justify-center space-x-6 pt-6">
              <Button 
                variant="outline"
                className="px-8 py-3 h-12 border-slate-200 text-slate-600 hover:border-primary-navy hover:text-primary-navy rounded-xl font-subheading"
              >
                Save as Draft
              </Button>
              <Button 
                className="px-12 py-3 h-12 bg-primary-navy hover:bg-primary-navy/90 rounded-xl font-subheading"
              >
                Post Project
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
