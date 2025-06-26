"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import { useRouter } from "next/navigation"
import { 
  Users, 
  Eye, 
  ArrowUpRight,
  ArrowDownRight,
  MapPin,
  Briefcase,
  Plus,
  Search,
  Filter,
  Edit,
  MoreHorizontal,
  XCircle,
  Target,
  ChevronRight,
  FileText,
  CheckCircle,
  TrendingUp,
  BarChart3,
  Clock,
  Building2,
  Settings
} from "lucide-react"

export default function CompanyJobs() {
  const router = useRouter()
  const [showNewJobForm, setShowNewJobForm] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [salaryRange, setSalaryRange] = useState([50000, 200000])
  const [showActiveJobsPopup, setShowActiveJobsPopup] = useState(false)
  const [showDraftJobsPopup, setShowDraftJobsPopup] = useState(false)
  const [showClosedJobsPopup, setShowClosedJobsPopup] = useState(false)
  const [showCompanyProfilePopup, setShowCompanyProfilePopup] = useState(false)
  const [showJobPreferencesPopup, setShowJobPreferencesPopup] = useState(false)
  const [showSettingsPopup, setShowSettingsPopup] = useState(false)
  const [jobData, setJobData] = useState({
    title: "",
    description: "",
    location: "",
    type: "",
    salary: "",
    experience: "",
    department: ""
  })

  const handleJobClick = (jobId: number) => {
    router.push(`/company-jobs/${jobId}`)
  }

  const handleCreateJob = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Creating job:", jobData)
    setShowNewJobForm(false)
    setJobData({
      title: "",
      description: "",
      location: "",
      type: "",
      salary: "",
      experience: "",
      department: ""
    })
  }

  const jobMetrics = [
    {
      title: "Total Job Posts",
      value: "12",
      change: "+3",
      isPositive: true,
      icon: Briefcase,
      period: "vs last month"
    },
    {
      title: "Total Applications", 
      value: "342",
      change: "+18.2%",
      isPositive: true,
      icon: Users,
      period: "vs last month"
    },
    {
      title: "Average Views per Job",
      value: "1,247", 
      change: "+12.5%",
      isPositive: true,
      icon: Eye,
      period: "vs last month"
    },
    {
      title: "Application Rate",
      value: "4.8%",
      change: "+0.3%",
      isPositive: true,
      icon: Target,
      period: "vs last month"
    }
  ]

  const jobs = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      department: "Engineering",
      location: "San Francisco, CA",
      type: "Full-time",
      salary: "$120K - $150K",
      status: "Active",
      applicants: 45,
      views: 892,
      posted: "5 days ago",
      applications: [
        { name: "Sarah Johnson", match: 95, status: "new" },
        { name: "Michael Chen", match: 88, status: "reviewing" },
        { name: "David Kim", match: 97, status: "shortlisted" }
      ]
    },
    {
      id: 2,
      title: "Product Manager",
      department: "Product",
      location: "Remote",
      type: "Full-time", 
      salary: "$130K - $160K",
      status: "Active",
      applicants: 28,
      views: 654,
      posted: "1 week ago",
      applications: [
        { name: "Emily Rodriguez", match: 92, status: "interviewed" },
        { name: "Lisa Wang", match: 85, status: "reviewing" }
      ]
    },
    {
      id: 3,
      title: "UX Designer",
      department: "Design",
      location: "New York, NY",
      type: "Full-time",
      salary: "$90K - $120K",
      status: "Draft",
      applicants: 0,
      views: 0,
      posted: "Draft",
      applications: []
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-50 text-green-600 border-green-200"
      case "Draft":
        return "bg-yellow-50 text-yellow-600 border-yellow-200"
      case "Closed":
        return "bg-red-50 text-red-600 border-red-200"
      default:
        return "bg-slate-50 text-slate-600 border-slate-200"
    }
  }

  const getApplicationStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-blue-50 text-blue-600 border-blue-200"
      case "reviewing":
        return "bg-yellow-50 text-yellow-600 border-yellow-200"
      case "shortlisted":
        return "bg-green-50 text-green-600 border-green-200"
      case "interviewed":
        return "bg-purple-50 text-purple-600 border-purple-200"
      default:
        return "bg-slate-50 text-slate-600 border-slate-200"
    }
  }

  const filteredJobs = jobs.filter(job => 
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.department.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="max-w-[65%] mx-auto py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-heading text-primary-navy mb-2">Job Management</h1>
            <p className="text-xl font-subheading text-slate-600">
              Manage your job postings, track applications, and analyze performance.
            </p>
          </div>
          <Button 
            onClick={() => setShowNewJobForm(true)}
            className="bg-primary-navy hover:bg-primary-navy/90 text-white rounded-lg font-subheading text-base px-6 py-3"
          >
            <Plus className="h-5 w-5 mr-2" />
            Post New Job
          </Button>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {jobMetrics.map((metric, index) => (
          <Card key={index} className="border-slate-200 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-blue-100 rounded-xl">
                  <metric.icon className="h-6 w-6 text-blue-600" />
                </div>
                <div className={`flex items-center space-x-1 text-base font-subheading ${
                  metric.isPositive ? 'text-green-600' : 'text-red-600'
                }`}>
                  {metric.isPositive ? (
                    <ArrowUpRight className="h-4 w-4" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4" />
                  )}
                  <span>{metric.change}</span>
                </div>
              </div>
              <div>
                <h3 className="text-3xl font-heading text-primary-navy mb-1">{metric.value}</h3>
                <p className="text-base font-subheading text-slate-600">{metric.title}</p>
                <p className="text-sm font-subheading text-slate-400">{metric.period}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content with Sidebar */}
      <div className="flex gap-6">
        {/* Sidebar */}
        <div className="w-64 flex-shrink-0">
          <div className="space-y-6">
            {/* Job Management */}
            <Card className="border-slate-200 shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-heading text-primary-navy flex items-center">
                  <Briefcase className="h-5 w-5 mr-2" />
                  Job Management
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-between border-slate-200 hover:border-primary-navy hover:text-primary-navy rounded-lg font-subheading text-sm"
                  onClick={() => setShowActiveJobsPopup(true)}
                >
                  <span className="flex items-center">
                    <FileText className="h-4 w-4 mr-2" />
                    Active Jobs
                  </span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-between border-slate-200 hover:border-primary-navy hover:text-primary-navy rounded-lg font-subheading text-sm"
                  onClick={() => setShowDraftJobsPopup(true)}
                >
                  <span className="flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    Draft Jobs
                  </span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-between border-slate-200 hover:border-primary-navy hover:text-primary-navy rounded-lg font-subheading text-sm"
                  onClick={() => setShowClosedJobsPopup(true)}
                >
                  <span className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Closed Jobs
                  </span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <div className="text-sm text-slate-500 font-subheading text-center py-2">
                  <p>12 total job posts</p>
                  <p>342 applications</p>
                </div>
              </CardContent>
            </Card>

            {/* Advanced Filters */}
            <Card className="border-slate-200 shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-heading text-primary-navy flex items-center justify-between">
                  <span className="flex items-center">
                    <Filter className="h-5 w-5 mr-2" />
                    Advanced Filters
                  </span>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setShowFilters(!showFilters)}
                    className="text-[#0056B3] hover:text-primary-navy hover:bg-primary-navy/5 rounded-lg font-subheading"
                  >
                    {showFilters ? 'Hide' : 'Show'}
                  </Button>
                </CardTitle>
              </CardHeader>
              {showFilters && (
                <CardContent className="space-y-6">
                  {/* Job Status */}
                  <div>
                    <h4 className="font-heading text-primary-navy mb-3 text-sm">Job Status</h4>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="active-jobs" />
                        <label htmlFor="active-jobs" className="text-sm font-subheading text-slate-600">Active</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="draft-jobs" />
                        <label htmlFor="draft-jobs" className="text-sm font-subheading text-slate-600">Draft</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="closed-jobs" />
                        <label htmlFor="closed-jobs" className="text-sm font-subheading text-slate-600">Closed</label>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Department */}
                  <div>
                    <h4 className="font-heading text-primary-navy mb-3 text-sm">Department</h4>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="engineering" />
                        <label htmlFor="engineering" className="text-sm font-subheading text-slate-600">Engineering</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="product" />
                        <label htmlFor="product" className="text-sm font-subheading text-slate-600">Product</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="design" />
                        <label htmlFor="design" className="text-sm font-subheading text-slate-600">Design</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="marketing" />
                        <label htmlFor="marketing" className="text-sm font-subheading text-slate-600">Marketing</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="sales" />
                        <label htmlFor="sales" className="text-sm font-subheading text-slate-600">Sales</label>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Job Type */}
                  <div>
                    <h4 className="font-heading text-primary-navy mb-3 text-sm">Job Type</h4>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="full-time" />
                        <label htmlFor="full-time" className="text-sm font-subheading text-slate-600">Full-time</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="part-time" />
                        <label htmlFor="part-time" className="text-sm font-subheading text-slate-600">Part-time</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="contract" />
                        <label htmlFor="contract" className="text-sm font-subheading text-slate-600">Contract</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="remote" />
                        <label htmlFor="remote" className="text-sm font-subheading text-slate-600">Remote</label>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Salary Range */}
                  <div>
                    <h4 className="font-heading text-primary-navy mb-3 text-sm">Salary Range</h4>
                    <div className="px-2">
                      <Slider
                        value={salaryRange}
                        onValueChange={setSalaryRange}
                        max={200000}
                        min={50000}
                        step={5000}
                        className="mb-3"
                      />
                      <div className="flex justify-between text-sm font-subheading text-slate-500">
                        <span>${salaryRange[0].toLocaleString()}</span>
                        <span>${salaryRange[1].toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Experience Level */}
                  <div>
                    <h4 className="font-heading text-primary-navy mb-3 text-sm">Experience Level</h4>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="entry-level" />
                        <label htmlFor="entry-level" className="text-sm font-subheading text-slate-600">Entry Level</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="mid-level" />
                        <label htmlFor="mid-level" className="text-sm font-subheading text-slate-600">Mid Level</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="senior-level" />
                        <label htmlFor="senior-level" className="text-sm font-subheading text-slate-600">Senior Level</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="lead-principal" />
                        <label htmlFor="lead-principal" className="text-sm font-subheading text-slate-600">Lead/Principal</label>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Application Count */}
                  <div>
                    <h4 className="font-heading text-primary-navy mb-3 text-sm">Application Count</h4>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="high-volume" />
                        <label htmlFor="high-volume" className="text-sm font-subheading text-slate-600">50+ applications</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="medium-volume" />
                        <label htmlFor="medium-volume" className="text-sm font-subheading text-slate-600">10-49 applications</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="low-volume" />
                        <label htmlFor="low-volume" className="text-sm font-subheading text-slate-600">1-9 applications</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="no-applications" />
                        <label htmlFor="no-applications" className="text-sm font-subheading text-slate-600">No applications</label>
                      </div>
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>

            {/* Settings */}
            <Card className="border-slate-200 shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-heading text-primary-navy flex items-center">
                  <Settings className="h-5 w-5 mr-2" />
                  Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-between border-slate-200 hover:border-primary-navy hover:text-primary-navy rounded-lg font-subheading text-sm"
                  onClick={() => setShowCompanyProfilePopup(true)}
                >
                  <span className="flex items-center">
                    <Building2 className="h-4 w-4 mr-2" />
                    Company Profile
                  </span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-between border-slate-200 hover:border-primary-navy hover:text-primary-navy rounded-lg font-subheading text-sm"
                  onClick={() => setShowJobPreferencesPopup(true)}
                >
                  <span className="flex items-center">
                    <Settings className="h-4 w-4 mr-2" />
                    Job Preferences
                  </span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Search and Filter */}
          <Card className="mb-8 border border-slate-200 rounded-lg">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="flex-1 relative">
                  <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                  <Input
                    placeholder="Search jobs by title or department..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 rounded-lg font-subheading text-sm"
                  />
                </div>
                <Button variant="outline" className="font-subheading text-sm px-4 py-2">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Jobs List */}
          <div className="grid grid-cols-1 gap-6 mb-8">
            {filteredJobs.map((job) => (
              <Card key={job.id} className="border border-slate-200 rounded-lg hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleJobClick(job.id)}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-2xl font-heading text-primary-navy">{job.title}</h3>
                        <Badge className={`${getStatusColor(job.status)} text-sm font-subheading px-3 py-1`}>
                          {job.status}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-4 text-base font-subheading text-slate-600 mb-3">
                        <span className="flex items-center">
                          <MapPin className="h-5 w-5 mr-1" />
                          {job.location}
                        </span>
                        <span>•</span>
                        <span>{job.department}</span>
                        <span>•</span>
                        <span>{job.type}</span>
                        <span>•</span>
                        <span className="font-heading text-primary-navy">{job.salary}</span>
                      </div>
                      <p className="text-base font-subheading text-slate-500">Posted {job.posted}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm" className="font-subheading" onClick={(e) => { e.stopPropagation(); }}>
                        <Edit className="h-5 w-5" />
                      </Button>
                      <Button variant="ghost" size="sm" className="font-subheading" onClick={(e) => { e.stopPropagation(); }}>
                        <MoreHorizontal className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>

                  {/* Job Stats */}
                  <div className="grid grid-cols-3 gap-6 mb-4">
                    <div className="text-center p-4 bg-slate-50 rounded-lg">
                      <div className="flex items-center justify-center mb-2">
                        <Users className="h-5 w-5 text-slate-500 mr-2" />
                        <span className="text-2xl font-heading text-slate-900">{job.applicants}</span>
                      </div>
                      <p className="text-sm font-subheading text-slate-600">Applicants</p>
                    </div>
                    <div className="text-center p-4 bg-slate-50 rounded-lg">
                      <div className="flex items-center justify-center mb-2">
                        <Eye className="h-5 w-5 text-slate-500 mr-2" />
                        <span className="text-2xl font-heading text-slate-900">{job.views}</span>
                      </div>
                      <p className="text-sm font-subheading text-slate-600">Views</p>
                    </div>
                    <div className="text-center p-4 bg-slate-50 rounded-lg">
                      <div className="flex items-center justify-center mb-2">
                        <Target className="h-5 w-5 text-slate-500 mr-2" />
                        <span className="text-2xl font-heading text-slate-900">{job.views > 0 ? ((job.applicants / job.views) * 100).toFixed(1) : '0'}%</span>
                      </div>
                      <p className="text-sm font-subheading text-slate-600">Conversion</p>
                    </div>
                  </div>

                  {/* Recent Applications */}
                  {job.applications.length > 0 && (
                    <div>
                      <h4 className="text-base font-heading text-slate-900 mb-3">Recent Applications</h4>
                      <div className="space-y-2">
                        {job.applications.slice(0, 3).map((application, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded">
                            <span className="text-base font-subheading text-slate-900">{application.name}</span>
                            <div className="flex items-center space-x-2">
                              <span className="text-sm font-heading text-slate-900">{application.match}% match</span>
                              <Badge className={`${getApplicationStatusColor(application.status)} text-sm font-subheading px-2 py-1`}>
                                {application.status}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Active Jobs Popup */}
      {showActiveJobsPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-heading text-primary-navy">Active Jobs</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowActiveJobsPopup(false)}
                  className="rounded-xl"
                >
                  <XCircle className="h-6 w-6" />
                </Button>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="grid gap-4">
                  {jobs.filter(job => job.status === "Active").map((job) => (
                    <div key={job.id} className="p-4 border border-slate-200 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-xl font-heading text-primary-navy">{job.title}</h3>
                          <p className="text-base font-subheading text-slate-600">{job.department} • {job.location}</p>
                          <p className="text-sm font-subheading text-slate-500">Posted {job.posted}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-heading text-slate-900">{job.applicants} applicants</p>
                          <p className="text-sm font-subheading text-green-600">Active</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Draft Jobs Popup */}
      {showDraftJobsPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-heading text-primary-navy">Draft Jobs</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowDraftJobsPopup(false)}
                  className="rounded-xl"
                >
                  <XCircle className="h-6 w-6" />
                </Button>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="grid gap-4">
                  {jobs.filter(job => job.status === "Draft").map((job) => (
                    <div key={job.id} className="p-4 border border-slate-200 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-xl font-heading text-primary-navy">{job.title}</h3>
                          <p className="text-base font-subheading text-slate-600">{job.department} • {job.location}</p>
                          <p className="text-sm font-subheading text-slate-500">Draft</p>
                        </div>
                        <div className="text-right">
                          <Button className="bg-primary-navy hover:bg-primary-navy/90 text-white rounded-lg font-subheading text-sm px-4 py-2">
                            Publish
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Closed Jobs Popup */}
      {showClosedJobsPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-heading text-primary-navy">Closed Jobs</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowClosedJobsPopup(false)}
                  className="rounded-xl"
                >
                  <XCircle className="h-6 w-6" />
                </Button>
              </div>
            </div>
            <div className="p-6">
              <div className="text-center py-12">
                <CheckCircle className="h-16 w-16 text-slate-400 mx-auto mb-4" />
                <h3 className="text-xl font-heading text-slate-600 mb-2">No Closed Jobs</h3>
                <p className="font-subheading text-slate-500">Jobs that are closed will appear here for reference.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Company Profile Popup */}
      {showCompanyProfilePopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-heading text-primary-navy">Company Profile Settings</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowCompanyProfilePopup(false)}
                  className="rounded-xl"
                >
                  <XCircle className="h-6 w-6" />
                </Button>
              </div>
            </div>
            <div className="p-6 space-y-6">
              <div className="space-y-4">
                <div>
                  <Label className="font-heading text-primary-navy text-base">Company Name</Label>
                  <Input className="rounded-xl font-subheading text-base py-3 mt-2" defaultValue="TechCorp Inc." />
                </div>
                <div>
                  <Label className="font-heading text-primary-navy text-base">Company Description</Label>
                  <Textarea className="rounded-xl font-subheading text-base mt-2" rows={4} defaultValue="Leading technology company focused on innovation..." />
                </div>
                <div>
                  <Label className="font-heading text-primary-navy text-base">Industry</Label>
                  <Select defaultValue="technology">
                    <SelectTrigger className="rounded-xl font-subheading text-base py-3 mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      <SelectItem value="technology" className="font-subheading">Technology</SelectItem>
                      <SelectItem value="finance" className="font-subheading">Finance</SelectItem>
                      <SelectItem value="healthcare" className="font-subheading">Healthcare</SelectItem>
                      <SelectItem value="education" className="font-subheading">Education</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="font-heading text-primary-navy text-base">Company Size</Label>
                  <Select defaultValue="100-500">
                    <SelectTrigger className="rounded-xl font-subheading text-base py-3 mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      <SelectItem value="1-10" className="font-subheading">1-10 employees</SelectItem>
                      <SelectItem value="11-50" className="font-subheading">11-50 employees</SelectItem>
                      <SelectItem value="51-100" className="font-subheading">51-100 employees</SelectItem>
                      <SelectItem value="100-500" className="font-subheading">100-500 employees</SelectItem>
                      <SelectItem value="500+" className="font-subheading">500+ employees</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex gap-4 pt-6">
                <Button 
                  variant="outline"
                  className="flex-1 border-primary-navy text-primary-navy hover:bg-primary-navy hover:text-white rounded-xl font-subheading text-base py-3"
                  onClick={() => setShowCompanyProfilePopup(false)}
                >
                  Cancel
                </Button>
                <Button className="flex-1 bg-primary-navy hover:bg-primary-navy/90 text-white rounded-xl font-subheading text-base py-3">
                  Save Changes
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Job Preferences Popup */}
      {showJobPreferencesPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-heading text-primary-navy">Job Preferences</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowJobPreferencesPopup(false)}
                  className="rounded-xl"
                >
                  <XCircle className="h-6 w-6" />
                </Button>
              </div>
            </div>
            <div className="p-6 space-y-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-heading text-primary-navy text-lg mb-3">Default Job Settings</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="auto-screening" />
                      <label htmlFor="auto-screening" className="font-subheading text-slate-700">Enable automatic candidate screening</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="email-notifications" defaultChecked />
                      <label htmlFor="email-notifications" className="font-subheading text-slate-700">Email notifications for new applications</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="public-listing" defaultChecked />
                      <label htmlFor="public-listing" className="font-subheading text-slate-700">Make jobs publicly searchable</label>
                    </div>
                  </div>
                </div>
                <Separator />
                <div>
                  <h3 className="font-heading text-primary-navy text-lg mb-3">Application Requirements</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="require-cover-letter" />
                      <label htmlFor="require-cover-letter" className="font-subheading text-slate-700">Require cover letter</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="require-portfolio" />
                      <label htmlFor="require-portfolio" className="font-subheading text-slate-700">Require portfolio/work samples</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="require-references" />
                      <label htmlFor="require-references" className="font-subheading text-slate-700">Require professional references</label>
                    </div>
                  </div>
                </div>
                <Separator />
                <div>
                  <h3 className="font-heading text-primary-navy text-lg mb-3">Posting Duration</h3>
                  <Select defaultValue="30">
                    <SelectTrigger className="rounded-xl font-subheading text-base py-3">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      <SelectItem value="7" className="font-subheading">7 days</SelectItem>
                      <SelectItem value="14" className="font-subheading">14 days</SelectItem>
                      <SelectItem value="30" className="font-subheading">30 days</SelectItem>
                      <SelectItem value="60" className="font-subheading">60 days</SelectItem>
                      <SelectItem value="90" className="font-subheading">90 days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex gap-4 pt-6">
                <Button 
                  variant="outline"
                  className="flex-1 border-primary-navy text-primary-navy hover:bg-primary-navy hover:text-white rounded-xl font-subheading text-base py-3"
                  onClick={() => setShowJobPreferencesPopup(false)}
                >
                  Cancel
                </Button>
                <Button className="flex-1 bg-primary-navy hover:bg-primary-navy/90 text-white rounded-xl font-subheading text-base py-3">
                  Save Preferences
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* New Job Modal */}
      {showNewJobForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-heading text-primary-navy">Post New Job</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowNewJobForm(false)}
                  className="rounded-xl"
                >
                  <XCircle className="h-6 w-6" />
                </Button>
              </div>
            </div>
            
            <form onSubmit={handleCreateJob} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="job-title" className="font-heading text-primary-navy text-base">Job Title *</Label>
                  <Input
                    id="job-title"
                    placeholder="e.g. Software Engineer, Product Designer, etc."
                    value={jobData.title}
                    onChange={(e) => setJobData({...jobData, title: e.target.value})}
                    className="rounded-xl font-subheading text-base py-3"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="department" className="font-heading text-primary-navy text-base">Department</Label>
                  <Select value={jobData.department} onValueChange={(value) => setJobData({...jobData, department: value})}>
                    <SelectTrigger className="rounded-xl font-subheading text-base py-3">
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      <SelectItem value="engineering" className="font-subheading">Engineering</SelectItem>
                      <SelectItem value="product" className="font-subheading">Product</SelectItem>
                      <SelectItem value="design" className="font-subheading">Design</SelectItem>
                      <SelectItem value="marketing" className="font-subheading">Marketing</SelectItem>
                      <SelectItem value="sales" className="font-subheading">Sales</SelectItem>
                      <SelectItem value="operations" className="font-subheading">Operations</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location" className="font-heading text-primary-navy text-base">Location *</Label>
                  <Input
                    id="location"
                    placeholder="e.g. San Francisco, CA or Remote"
                    value={jobData.location}
                    onChange={(e) => setJobData({...jobData, location: e.target.value})}
                    className="rounded-xl font-subheading text-base py-3"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="job-type" className="font-heading text-primary-navy text-base">Job Type *</Label>
                  <Select value={jobData.type} onValueChange={(value) => setJobData({...jobData, type: value})}>
                    <SelectTrigger className="rounded-xl font-subheading text-base py-3">
                      <SelectValue placeholder="Select job type" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      <SelectItem value="full-time" className="font-subheading">Full-time</SelectItem>
                      <SelectItem value="part-time" className="font-subheading">Part-time</SelectItem>
                      <SelectItem value="contract" className="font-subheading">Contract</SelectItem>
                      <SelectItem value="freelance" className="font-subheading">Freelance</SelectItem>
                      <SelectItem value="internship" className="font-subheading">Internship</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="salary" className="font-heading text-primary-navy text-base">Salary Range</Label>
                  <Input
                    id="salary"
                    placeholder="e.g. $80K - $120K"
                    value={jobData.salary}
                    onChange={(e) => setJobData({...jobData, salary: e.target.value})}
                    className="rounded-xl font-subheading text-base py-3"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experience" className="font-heading text-primary-navy text-base">Experience Level</Label>
                  <Select value={jobData.experience} onValueChange={(value) => setJobData({...jobData, experience: value})}>
                    <SelectTrigger className="rounded-xl font-subheading text-base py-3">
                      <SelectValue placeholder="Select experience level" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      <SelectItem value="entry" className="font-subheading">Entry Level (0-2 years)</SelectItem>
                      <SelectItem value="mid" className="font-subheading">Mid Level (2-5 years)</SelectItem>
                      <SelectItem value="senior" className="font-subheading">Senior Level (5+ years)</SelectItem>
                      <SelectItem value="lead" className="font-subheading">Lead/Principal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="font-heading text-primary-navy text-base">Job Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the responsibilities of the position. You can always change this later."
                  value={jobData.description}
                  onChange={(e) => setJobData({...jobData, description: e.target.value})}
                  className="min-h-32 rounded-xl font-subheading text-base"
                  required
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Button 
                  type="button" 
                  variant="outline"
                  className="flex-1 border-primary-navy text-primary-navy hover:bg-primary-navy hover:text-white rounded-xl font-subheading text-base py-3"
                  onClick={() => setShowNewJobForm(false)}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="flex-1 bg-primary-navy hover:bg-primary-navy/90 text-white rounded-xl font-subheading text-base py-3"
                >
                  Post Job
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
 
 
