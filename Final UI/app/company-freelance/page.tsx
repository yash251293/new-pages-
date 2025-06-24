"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Separator } from "@/components/ui/separator"
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
  Clock,
  DollarSign,
  Calendar,
  X,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  FileText,
  CheckCircle,
  Settings
} from "lucide-react"

export default function CompanyFreelance() {
  const router = useRouter()
  const [showNewProjectForm, setShowNewProjectForm] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [filters, setFilters] = useState({
    category: "all",
    status: "all",
    experience: "all",
    duration: "all",
    budgetRange: [1000, 50000],
    skills: [] as string[],
    activeOnly: false
  })
  const [showFilters, setShowFilters] = useState(true)
  const [projectData, setProjectData] = useState({
    title: "",
    description: "",
    duration: "",
    budget: "",
    experience: "",
    skills: "",
    category: "",
    timeline: ""
  })

  const handleProjectClick = (projectId: number) => {
    router.push(`/company-freelance/${projectId}`)
  }

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Creating project:", projectData)
    setShowNewProjectForm(false)
    setProjectData({
      title: "",
      description: "",
      duration: "",
      budget: "",
      experience: "",
      skills: "",
      category: "",
      timeline: ""
    })
  }

  const freelanceMetrics = [
    {
      title: "Active Projects",
      value: "8",
      change: "+2",
      isPositive: true,
      icon: Briefcase,
      period: "vs last month"
    },
    {
      title: "Total Proposals", 
      value: "156",
      change: "+23.4%",
      isPositive: true,
      icon: Users,
      period: "vs last month"
    },
    {
      title: "Average Views per Project",
      value: "847", 
      change: "+15.8%",
      isPositive: true,
      icon: Eye,
      period: "vs last month"
    },
    {
      title: "Proposal Rate",
      value: "12.3%",
      change: "+1.2%",
      isPositive: true,
      icon: Target,
      period: "vs last month"
    }
  ]

  const projects = [
    {
      id: 1,
      title: "React Native Mobile App Development",
      category: "Mobile Development",
      duration: "2-3 months",
      budget: "$8,000 - $12,000",
      budgetValue: 10000,
      experience: "Expert",
      status: "Active",
      proposals: 24,
      views: 456,
      posted: "3 days ago",
      timeline: "ASAP",
      skills: ["React Native", "TypeScript", "API Integration"],
      proposals_data: [
        { name: "Alex Rivera", rating: 4.9, proposal_amount: "$9,500", status: "new" },
        { name: "Sarah Kim", rating: 4.8, proposal_amount: "$10,200", status: "reviewing" },
        { name: "James Chen", rating: 5.0, proposal_amount: "$8,800", status: "shortlisted" }
      ]
    },
    {
      id: 2,
      title: "Brand Identity Design Package",
      category: "Graphic Design",
      duration: "4-6 weeks",
      budget: "$3,000 - $5,000", 
      budgetValue: 4000,
      experience: "Intermediate",
      status: "Active",
      proposals: 18,
      views: 324,
      posted: "1 week ago",
      timeline: "2 weeks",
      skills: ["Logo Design", "Brand Strategy", "Adobe Creative Suite"],
      proposals_data: [
        { name: "Maria Rodriguez", rating: 4.9, proposal_amount: "$3,800", status: "interviewed" },
        { name: "David Park", rating: 4.7, proposal_amount: "$4,200", status: "reviewing" }
      ]
    },
    {
      id: 3,
      title: "WordPress E-commerce Website",
      category: "Web Development",
      duration: "6-8 weeks",
      budget: "$5,000 - $8,000",
      budgetValue: 6500,
      experience: "Intermediate",
      status: "Draft",
      proposals: 0,
      views: 0,
      posted: "Draft",
      timeline: "1 month",
      skills: ["WordPress", "WooCommerce", "PHP", "UI/UX"],
      proposals_data: []
    },
    {
      id: 4,
      title: "Social Media Content Creation",
      category: "Content Marketing",
      duration: "Ongoing",
      budget: "$2,000/month",
      budgetValue: 2000,
      experience: "Intermediate", 
      status: "Active",
      proposals: 31,
      views: 567,
      posted: "5 days ago",
      timeline: "Ongoing",
      skills: ["Content Strategy", "Social Media", "Copywriting"],
      proposals_data: [
        { name: "Emma Wilson", rating: 4.8, proposal_amount: "$1,800", status: "new" },
        { name: "Lucas Taylor", rating: 4.9, proposal_amount: "$2,100", status: "reviewing" }
      ]
    },
    {
      id: 5,
      title: "Machine Learning Data Analysis",
      category: "Data Science",
      duration: "3-4 months",
      budget: "$15,000 - $20,000",
      budgetValue: 17500,
      experience: "Expert",
      status: "Completed",
      proposals: 42,
      views: 789,
      posted: "2 months ago",
      timeline: "Flexible",
      skills: ["Python", "Machine Learning", "TensorFlow", "Data Analysis"],
      proposals_data: []
    },
    {
      id: 6,
      title: "iOS Swift App Development",
      category: "Mobile Development",
      duration: "8-10 weeks",
      budget: "$12,000 - $18,000",
      budgetValue: 15000,
      experience: "Expert",
      status: "Closed",
      proposals: 38,
      views: 623,
      posted: "6 weeks ago",
      timeline: "ASAP",
      skills: ["Swift", "iOS", "Core Data", "SwiftUI"],
      proposals_data: []
    }
  ]

  // Skills for filter options
  const allSkills = ["React Native", "TypeScript", "API Integration", "Logo Design", "Brand Strategy", "Adobe Creative Suite", "WordPress", "WooCommerce", "PHP", "UI/UX", "Content Strategy", "Social Media", "Copywriting", "Python", "Machine Learning", "TensorFlow", "Data Analysis", "Swift", "iOS", "Core Data", "SwiftUI"]

  const categories = ["Mobile Development", "Graphic Design", "Web Development", "Content Marketing", "Data Science"]

  const handleSkillToggle = (skill: string) => {
    setFilters(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }))
  }

  const clearFilters = () => {
    setFilters({
      category: "all",
      status: "all",
      experience: "all",
      duration: "all",
      budgetRange: [1000, 50000],
      skills: [],
      activeOnly: false
    })
    setSearchQuery("")
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-50 text-green-600 border-green-200"
      case "Draft":
        return "bg-yellow-50 text-yellow-600 border-yellow-200"
      case "Completed":
        return "bg-blue-50 text-blue-600 border-blue-200"
      case "Closed":
        return "bg-red-50 text-red-600 border-red-200"
      default:
        return "bg-slate-50 text-slate-600 border-slate-200"
    }
  }

  const getProposalStatusColor = (status: string) => {
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

  // Apply filters
  const filteredProjects = projects.filter(project => {
    // Search filter
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))

    // Category filter
    const matchesCategory = filters.category === "all" || project.category === filters.category

    // Status filter
    const matchesStatus = filters.status === "all" || project.status === filters.status

    // Experience filter
    const matchesExperience = filters.experience === "all" || project.experience === filters.experience

    // Duration filter
    const matchesDuration = filters.duration === "all" || 
      (filters.duration === "short" && project.duration.includes("weeks")) ||
      (filters.duration === "medium" && (project.duration.includes("2-3 months") || project.duration.includes("3-4 months"))) ||
      (filters.duration === "long" && (project.duration.includes("6+") || project.duration.includes("Ongoing")))

    // Budget filter
    const matchesBudget = project.budgetValue >= filters.budgetRange[0] && project.budgetValue <= filters.budgetRange[1]

    // Skills filter
    const matchesSkills = filters.skills.length === 0 || 
      filters.skills.some(skill => project.skills.includes(skill))

    // Active only filter
    const matchesActiveOnly = !filters.activeOnly || project.status === "Active"

    return matchesSearch && matchesCategory && matchesStatus && matchesExperience && 
           matchesDuration && matchesBudget && matchesSkills && matchesActiveOnly
  })

  return (
    <div className="w-[65%] mx-auto py-8 px-4">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary-navy mb-2">Freelance Projects</h1>
        <p className="text-lg font-semibold text-slate-600">
          Manage your freelance projects and review proposals from talented professionals.
        </p>
      </div>

      <div className="flex gap-6">
        {/* Sidebar */}
        <div className="w-64 flex-shrink-0">
          <div className="space-y-6">
            {/* Project Management */}
            <Card className="border-slate-200 shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-bold text-primary-navy flex items-center">
                  <Briefcase className="h-5 w-5 mr-2" />
                  Project Management
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-between border-slate-200 hover:border-primary-navy hover:text-primary-navy rounded-lg font-semibold text-sm"
                >
                  <span className="flex items-center">
                    <FileText className="h-4 w-4 mr-2" />
                    Active Projects
                  </span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-between border-slate-200 hover:border-primary-navy hover:text-primary-navy rounded-lg font-semibold text-sm"
                >
                  <span className="flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    Draft Projects
                  </span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-between border-slate-200 hover:border-primary-navy hover:text-primary-navy rounded-lg font-semibold text-sm"
                >
                  <span className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Completed Projects
                  </span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <div className="text-sm text-slate-500 font-semibold text-center py-2">
                  <p>8 active projects</p>
                  <p>156 total proposals</p>
                </div>
              </CardContent>
            </Card>

            {/* Advanced Filters */}
            <Card className="border-slate-200 shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-bold text-primary-navy flex items-center justify-between">
                  <span className="flex items-center">
                    <Filter className="h-5 w-5 mr-2" />
                    Advanced Filters
                  </span>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setShowFilters(!showFilters)}
                    className="text-[#0056B3] hover:text-primary-navy hover:bg-primary-navy/5 rounded-lg"
                  >
                    {showFilters ? 'Hide' : 'Show'}
                  </Button>
                </CardTitle>
              </CardHeader>
              {showFilters && (
                <CardContent className="space-y-6">
                  {/* Search */}
                  <div>
                    <h4 className="font-semibold text-primary-navy mb-3 text-sm">Search Projects</h4>
                    <div className="relative">
                      <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                      <Input
                        placeholder="Search by title, category, or skills..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 rounded-lg font-semibold text-sm"
                      />
                    </div>
                  </div>

                  <Separator />

                  {/* Project Status */}
                  <div>
                    <h4 className="font-semibold text-primary-navy mb-3 text-sm">Project Status</h4>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="active-status" />
                        <label htmlFor="active-status" className="text-sm font-semibold text-slate-600">Active</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="draft-status" />
                        <label htmlFor="draft-status" className="text-sm font-semibold text-slate-600">Draft</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="completed-status" />
                        <label htmlFor="completed-status" className="text-sm font-semibold text-slate-600">Completed</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="closed-status" />
                        <label htmlFor="closed-status" className="text-sm font-semibold text-slate-600">Closed</label>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Category */}
                  <div>
                    <h4 className="font-semibold text-primary-navy mb-3 text-sm">Category</h4>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="web-dev" />
                        <label htmlFor="web-dev" className="text-sm font-semibold text-slate-600">Web Development</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="mobile-dev" />
                        <label htmlFor="mobile-dev" className="text-sm font-semibold text-slate-600">Mobile Development</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="design" />
                        <label htmlFor="design" className="text-sm font-semibold text-slate-600">Design</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="content" />
                        <label htmlFor="content" className="text-sm font-semibold text-slate-600">Content Creation</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="data-science" />
                        <label htmlFor="data-science" className="text-sm font-semibold text-slate-600">Data Science</label>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Experience Level */}
                  <div>
                    <h4 className="font-semibold text-primary-navy mb-3 text-sm">Experience Level</h4>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="beginner" />
                        <label htmlFor="beginner" className="text-sm font-semibold text-slate-600">Beginner</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="intermediate" />
                        <label htmlFor="intermediate" className="text-sm font-semibold text-slate-600">Intermediate</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="expert" />
                        <label htmlFor="expert" className="text-sm font-semibold text-slate-600">Expert</label>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Project Duration */}
                  <div>
                    <h4 className="font-semibold text-primary-navy mb-3 text-sm">Project Duration</h4>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="short-duration" />
                        <label htmlFor="short-duration" className="text-sm font-semibold text-slate-600">Less than 1 month</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="medium-duration" />
                        <label htmlFor="medium-duration" className="text-sm font-semibold text-slate-600">1-3 months</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="long-duration" />
                        <label htmlFor="long-duration" className="text-sm font-semibold text-slate-600">3+ months</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="ongoing-duration" />
                        <label htmlFor="ongoing-duration" className="text-sm font-semibold text-slate-600">Ongoing</label>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Budget Range */}
                  <div>
                    <h4 className="font-semibold text-primary-navy mb-3 text-sm">Budget Range</h4>
                    <div className="px-2">
                      <Slider
                        value={filters.budgetRange}
                        onValueChange={(value) => setFilters(prev => ({...prev, budgetRange: value}))}
                        max={50000}
                        min={1000}
                        step={500}
                        className="mb-3"
                      />
                      <div className="flex justify-between text-sm font-semibold text-slate-500">
                        <span>${filters.budgetRange[0].toLocaleString()}</span>
                        <span>${filters.budgetRange[1].toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Skills Required */}
                  <div>
                    <h4 className="font-semibold text-primary-navy mb-3 text-sm">Skills Required</h4>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="react-skill" />
                        <label htmlFor="react-skill" className="text-sm font-semibold text-slate-600">React</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="nodejs-skill" />
                        <label htmlFor="nodejs-skill" className="text-sm font-semibold text-slate-600">Node.js</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="python-skill" />
                        <label htmlFor="python-skill" className="text-sm font-semibold text-slate-600">Python</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="design-skill" />
                        <label htmlFor="design-skill" className="text-sm font-semibold text-slate-600">UI/UX Design</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="mobile-skill" />
                        <label htmlFor="mobile-skill" className="text-sm font-semibold text-slate-600">Mobile Development</label>
                      </div>
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>

            {/* Settings */}
            <Card className="border-slate-200 shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-bold text-primary-navy flex items-center">
                  <Settings className="h-5 w-5 mr-2" />
                  Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-between border-slate-200 hover:border-primary-navy hover:text-primary-navy rounded-lg font-semibold text-sm"
                >
                  <span className="flex items-center">
                    <Users className="h-4 w-4 mr-2" />
                    Company Profile
                  </span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
                                <Button 
                  variant="outline" 
                  className="w-full justify-between border-slate-200 hover:border-primary-navy hover:text-primary-navy rounded-lg font-semibold text-sm"
                >
                  <span className="flex items-center">
                    <Briefcase className="h-4 w-4 mr-2" />
                    Project Preferences
                  </span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {freelanceMetrics.map((metric, index) => (
              <Card key={index} className="p-6 border border-slate-200 rounded-lg hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="flex items-center justify-between mb-3">
                    <div className={`p-2 rounded-lg ${metric.isPositive ? 'bg-green-50' : 'bg-red-50'}`}>
                      <metric.icon className={`h-5 w-5 ${metric.isPositive ? 'text-green-600' : 'text-red-600'}`} />
                    </div>
                    <div className={`flex items-center text-sm font-bold ${metric.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                      {metric.isPositive ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                      {metric.change}
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-slate-900">{metric.value}</div>
                  <div className="text-sm font-semibold text-slate-600">{metric.title}</div>
                  <div className="text-xs font-semibold text-slate-500 mt-1">{metric.period}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between items-center mb-6">
            <div className="text-sm font-semibold text-slate-600">
              Showing {filteredProjects.length} of {projects.length} projects
            </div>
            <Button 
              onClick={() => setShowNewProjectForm(true)}
              className="bg-primary-navy hover:bg-primary-navy/90 text-white rounded-lg font-bold"
            >
              <Plus className="h-4 w-4 mr-2" />
              New Project
            </Button>
          </div>

          {/* Projects List */}
          <div className="space-y-6">
            {filteredProjects.map((project) => (
              <Card key={project.id} className="border border-slate-200 rounded-lg hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleProjectClick(project.id)}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-heading text-primary-navy">{project.title}</h3>
                        <Badge className={`${getStatusColor(project.status)} text-xs font-subheading px-2 py-1`}>
                          {project.status}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-4 text-sm font-subheading text-slate-500 mb-3">
                        <span>{project.category}</span>
                        <span>•</span>
                        <span>{project.duration}</span>
                        <span>•</span>
                        <span>{project.budget}</span>
                        <span>•</span>
                        <span>{project.experience} level</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); }}>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Skills */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {project.skills.map((skill, index) => (
                        <Badge key={index} variant="outline" className="text-xs font-subheading border-slate-300">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Project Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center p-3 bg-slate-50 rounded">
                      <div className="text-lg font-heading text-slate-900">{project.proposals}</div>
                      <div className="text-xs font-subheading text-slate-500">Proposals</div>
                    </div>
                    <div className="text-center p-3 bg-slate-50 rounded">
                      <div className="text-lg font-heading text-slate-900">{project.views}</div>
                      <div className="text-xs font-subheading text-slate-500">Views</div>
                    </div>
                    <div className="text-center p-3 bg-slate-50 rounded">
                      <div className="text-lg font-heading text-slate-900">{project.posted}</div>
                      <div className="text-xs font-subheading text-slate-500">Posted</div>
                    </div>
                  </div>

                  {/* Recent Proposals */}
                  {project.proposals_data.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-sm font-heading text-slate-900 mb-2">Recent Proposals</h4>
                      <div className="space-y-2">
                        {project.proposals_data.slice(0, 2).map((proposal, index) => (
                          <div key={index} className="flex items-center justify-between p-2 bg-slate-50 rounded">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-primary-navy text-white rounded-full flex items-center justify-center text-xs font-subheading">
                                {proposal.name.split(' ').map(n => n[0]).join('')}
                              </div>
                              <div>
                                <div className="text-sm font-subheading text-slate-900">{proposal.name}</div>
                                <div className="text-xs font-subheading text-slate-500">Rating: {proposal.rating}★</div>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge className={`${getProposalStatusColor(proposal.status)} text-xs font-subheading`}>
                                {proposal.status}
                              </Badge>
                              <span className="text-sm font-heading text-slate-900">{proposal.proposal_amount}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex space-x-3">
                    <Button 
                      className="flex-1 bg-primary-navy hover:bg-primary-navy/90 text-white rounded-lg font-subheading text-sm"
                      onClick={(e) => { e.stopPropagation(); handleProjectClick(project.id); }}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                    <Button 
                      variant="outline" 
                      className="border-primary-navy text-primary-navy hover:bg-primary-navy hover:text-white rounded-lg font-subheading text-sm"
                      onClick={(e) => { e.stopPropagation(); }}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Project
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <Briefcase className="h-16 w-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-slate-600 mb-2">No projects found</h3>
              <p className="text-slate-500 font-semibold">Try adjusting your filters to see more projects.</p>
            </div>
          )}
        </div>
      </div>

      {/* New Project Modal */}
      {showNewProjectForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-primary-navy">Post New Project</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowNewProjectForm(false)}
                  className="rounded-xl"
                >
                  <XCircle className="h-6 w-6" />
                </Button>
              </div>
            </div>
            
            <form onSubmit={handleCreateProject} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="project-title" className="font-bold text-primary-navy text-base">Project Title *</Label>
                  <Input
                    id="project-title"
                    placeholder="e.g. React Native App Development"
                    value={projectData.title}
                    onChange={(e) => setProjectData({...projectData, title: e.target.value})}
                    className="rounded-xl font-semibold text-base py-3"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category" className="font-bold text-primary-navy text-base">Category</Label>
                  <Select value={projectData.category} onValueChange={(value) => setProjectData({...projectData, category: value})}>
                    <SelectTrigger className="rounded-xl font-semibold text-base py-3">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      <SelectItem value="web-development" className="font-semibold">Web Development</SelectItem>
                      <SelectItem value="mobile-development" className="font-semibold">Mobile Development</SelectItem>
                      <SelectItem value="design" className="font-semibold">Design & Creative</SelectItem>
                      <SelectItem value="content-marketing" className="font-semibold">Content & Marketing</SelectItem>
                      <SelectItem value="data-science" className="font-semibold">Data Science</SelectItem>
                      <SelectItem value="consulting" className="font-semibold">Consulting</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="budget" className="font-bold text-primary-navy text-base">Budget Range *</Label>
                  <Input
                    id="budget"
                    placeholder="e.g. $5,000 - $10,000"
                    value={projectData.budget}
                    onChange={(e) => setProjectData({...projectData, budget: e.target.value})}
                    className="rounded-xl font-semibold text-base py-3"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="duration" className="font-bold text-primary-navy text-base">Project Duration *</Label>
                  <Select value={projectData.duration} onValueChange={(value) => setProjectData({...projectData, duration: value})}>
                    <SelectTrigger className="rounded-xl font-semibold text-base py-3">
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      <SelectItem value="1-2-weeks" className="font-semibold">1-2 weeks</SelectItem>
                      <SelectItem value="3-4-weeks" className="font-semibold">3-4 weeks</SelectItem>
                      <SelectItem value="1-2-months" className="font-semibold">1-2 months</SelectItem>
                      <SelectItem value="3-6-months" className="font-semibold">3-6 months</SelectItem>
                      <SelectItem value="6-months+" className="font-semibold">6+ months</SelectItem>
                      <SelectItem value="ongoing" className="font-semibold">Ongoing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experience" className="font-bold text-primary-navy text-base">Experience Level</Label>
                  <Select value={projectData.experience} onValueChange={(value) => setProjectData({...projectData, experience: value})}>
                    <SelectTrigger className="rounded-xl font-semibold text-base py-3">
                      <SelectValue placeholder="Select experience level" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      <SelectItem value="entry" className="font-semibold">Entry Level</SelectItem>
                      <SelectItem value="intermediate" className="font-semibold">Intermediate</SelectItem>
                      <SelectItem value="expert" className="font-semibold">Expert</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timeline" className="font-bold text-primary-navy text-base">Start Timeline</Label>
                  <Input
                    id="timeline"
                    placeholder="e.g. ASAP, 2 weeks, 1 month"
                    value={projectData.timeline}
                    onChange={(e) => setProjectData({...projectData, timeline: e.target.value})}
                    className="rounded-xl font-semibold text-base py-3"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="skills" className="font-bold text-primary-navy text-base">Required Skills</Label>
                <Input
                  id="skills"
                  placeholder="e.g. React, Node.js, TypeScript (comma separated)"
                  value={projectData.skills}
                  onChange={(e) => setProjectData({...projectData, skills: e.target.value})}
                  className="rounded-xl font-semibold text-base py-3"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="font-bold text-primary-navy text-base">Project Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the project requirements, deliverables, and expectations..."
                  value={projectData.description}
                  onChange={(e) => setProjectData({...projectData, description: e.target.value})}
                  className="min-h-32 rounded-xl font-semibold text-base"
                  required
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Button 
                  type="button" 
                  variant="outline"
                  className="flex-1 border-primary-navy text-primary-navy hover:bg-primary-navy hover:text-white rounded-xl font-bold text-base py-3"
                  onClick={() => setShowNewProjectForm(false)}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="flex-1 bg-primary-navy hover:bg-primary-navy/90 text-white rounded-xl font-bold text-base py-3"
                >
                  Post Project
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}