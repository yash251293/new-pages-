"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  Calendar,
  DollarSign,
  Eye,
  Users,
  Clock,
  Star,
  MapPin,
  Mail,
  MessageCircle,
  ChevronRight,
  MoreVertical,
  Edit,
  Archive,
  Share2,
  CheckCircle,
  AlertTriangle,
  PlayCircle,
  PauseCircle,
  FileText,
  Download,
  Send,
  ExternalLink,
  CreditCard,
  Shield,
  TrendingUp,
  X,
  BookmarkIcon
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"

export default function MyProjectsPage() {
  const [activeTab, setActiveTab] = useState("posted")
  const [updateMessage, setUpdateMessage] = useState("")
  const [selectedProject, setSelectedProject] = useState<number | null>(null)
  const [showMessageModal, setShowMessageModal] = useState(false)
  const [messageText, setMessageText] = useState("")
  const [selectedFreelancer, setSelectedFreelancer] = useState<any>(null)
  const [showFreelancerProfile, setShowFreelancerProfile] = useState(false)

  const projects = [
    {
      id: 1,
      title: "E-commerce React App Development",
      description: "Looking for a skilled React developer to build a modern e-commerce platform with shopping cart, payment integration, and user management.",
      budget: "$3,000-5,000",
      type: "Fixed Price",
      status: "Active",
      posted: "5 days ago",
      applicants: 8,
      skills: ["React", "Node.js", "MongoDB", "Stripe API"],
      applications: [
        {
          id: 1,
          name: "Sarah Chen",
          avatar: "SC",
          rating: 4.9,
          reviews: 47,
          hourlyRate: 75,
          location: "San Francisco, CA",
          proposal: "I have 5+ years of experience building e-commerce platforms with React...",
          appliedAt: "2 days ago",
          status: "pending"
        },
        {
          id: 2,
          name: "Alex Rodriguez",
          avatar: "AR",
          rating: 4.8,
          reviews: 32,
          hourlyRate: 65,
          location: "Austin, TX",
          proposal: "Your project caught my attention because it aligns perfectly with my expertise...",
          appliedAt: "3 days ago",
          status: "pending"
        },
        {
          id: 3,
          name: "David Kim",
          avatar: "DK",
          rating: 4.7,
          reviews: 29,
          hourlyRate: 80,
          location: "Seattle, WA",
          proposal: "I'm excited about the opportunity to work on your e-commerce platform...",
          appliedAt: "4 days ago",
          status: "interviewed"
        }
      ]
    },
    {
      id: 2,
      title: "Mobile App UI/UX Design",
      description: "Need a talented UI/UX designer to create modern, user-friendly designs for our fitness tracking mobile app.",
      budget: "$2,000-3,000",
      type: "Fixed Price",
      status: "Active",
      posted: "1 week ago",
      applicants: 12,
      skills: ["UI Design", "UX Research", "Figma", "Mobile Design"],
      applications: [
        {
          id: 4,
          name: "Emma Wilson",
          avatar: "EW",
          rating: 4.9,
          reviews: 54,
          hourlyRate: 90,
          location: "New York, NY",
          proposal: "I specialize in mobile app design and have created interfaces for 50+ apps...",
          appliedAt: "1 day ago",
          status: "pending"
        },
        {
          id: 5,
          name: "Michael Brown",
          avatar: "MB",
          rating: 4.6,
          reviews: 31,
          hourlyRate: 70,
          location: "Los Angeles, CA",
          proposal: "Your fitness app project is exactly what I love working on...",
          appliedAt: "3 days ago",
          status: "rejected"
        }
      ]
    },
    {
      id: 3,
      title: "Content Writing for Tech Blog",
      description: "Seeking an experienced content writer to create engaging blog posts about emerging technologies and startup trends.",
      budget: "$100-150",
      type: "Per Article",
      status: "Completed",
      posted: "2 weeks ago",
      applicants: 15,
      skills: ["Content Writing", "SEO", "Tech Writing", "Research"],
      applications: [
        {
          id: 6,
          name: "Lisa Johnson",
          avatar: "LJ",
          rating: 4.8,
          reviews: 43,
          hourlyRate: 45,
          location: "Remote",
          proposal: "I have extensive experience writing about technology and startups...",
          appliedAt: "1 week ago",
          status: "hired"
        }
      ]
    }
  ]

  // Ongoing projects with hired freelancers
  const ongoingProjects = [
    {
      id: 4,
      title: "Data Visualization Dashboard",
      description: "Building interactive data visualization dashboard with React and D3.js for financial analytics platform.",
      freelancer: {
        name: "Alex Chen",
        avatar: "AC",
        rating: 4.9,
        reviews: 67,
        location: "Toronto, Canada",
        hourlyRate: 125,
        responseTime: "2h",
        completedProjects: 45
      },
      status: "In Progress",
      progress: 65,
      startDate: "Oct 15, 2024",
      deadline: "Dec 15, 2024",
      lastUpdate: "2 days ago",
      contractType: "Milestone-based",
      totalValue: 15000,
      paidAmount: 9750,
      nextMilestone: "Interactive Charts Implementation",
      nextMilestoneAmount: 3750,
      nextMilestoneDue: "Nov 25, 2024",
      milestones: [
        { 
          id: 1, 
          title: "Project Setup & Architecture", 
          amount: 2250, 
          status: "completed", 
          dueDate: "Oct 25, 2024",
          completedDate: "Oct 23, 2024"
        },
        { 
          id: 2, 
          title: "Data Processing Module", 
          amount: 3750, 
          status: "completed", 
          dueDate: "Nov 5, 2024",
          completedDate: "Nov 3, 2024"
        },
        { 
          id: 3, 
          title: "Basic Dashboard Layout", 
          amount: 3750, 
          status: "completed", 
          dueDate: "Nov 15, 2024",
          completedDate: "Nov 12, 2024"
        },
        { 
          id: 4, 
          title: "Interactive Charts Implementation", 
          amount: 3750, 
          status: "in_progress", 
          dueDate: "Nov 25, 2024" 
        },
        { 
          id: 5, 
          title: "Testing & Deployment", 
          amount: 1500, 
          status: "pending", 
          dueDate: "Dec 15, 2024" 
        }
      ],
      recentUpdates: [
        {
          date: "Nov 18, 2024",
          message: "Completed the responsive design for dashboard components. Working on chart interactivity now.",
          attachments: ["dashboard_preview.png", "responsive_demo.gif"]
        },
        {
          date: "Nov 15, 2024", 
          message: "Dashboard layout is now complete. Moving to interactive charts phase.",
          attachments: ["layout_final.png"]
        }
      ],
      skills: ["React", "D3.js", "TypeScript", "Node.js", "PostgreSQL"],
      communicationFreency: "Daily updates",
      workingHours: "9 AM - 6 PM EST"
    },
    {
      id: 5,
      title: "E-commerce Mobile App Development",
      description: "React Native mobile app for fashion e-commerce with AR try-on features and social shopping.",
      freelancer: {
        name: "Maria Rodriguez",
        avatar: "MR",
        rating: 4.8,
        reviews: 43,
        location: "Mexico City, Mexico",
        hourlyRate: 85,
        responseTime: "1h",
        completedProjects: 32
      },
      status: "Review Required",
      progress: 90,
      startDate: "Sep 1, 2024",
      deadline: "Nov 30, 2024",
      lastUpdate: "1 day ago",
      contractType: "Fixed Price",
      totalValue: 10500,
      paidAmount: 8400,
      nextMilestone: "Final Testing & Bug Fixes",
      nextMilestoneAmount: 2100,
      nextMilestoneDue: "Nov 30, 2024",
      milestones: [
        { 
          id: 1, 
          title: "App Structure & Navigation", 
          amount: 2100, 
          status: "completed", 
          dueDate: "Sep 15, 2024",
          completedDate: "Sep 13, 2024"
        },
        { 
          id: 2, 
          title: "Product Catalog & Search", 
          amount: 2625, 
          status: "completed", 
          dueDate: "Oct 1, 2024",
          completedDate: "Sep 28, 2024"
        },
        { 
          id: 3, 
          title: "Shopping Cart & Checkout", 
          amount: 2625, 
          status: "completed", 
          dueDate: "Oct 15, 2024",
          completedDate: "Oct 12, 2024"
        },
        { 
          id: 4, 
          title: "AR Try-on Feature", 
          amount: 1050, 
          status: "completed", 
          dueDate: "Nov 10, 2024",
          completedDate: "Nov 8, 2024"
        },
        { 
          id: 5, 
          title: "Final Testing & Bug Fixes", 
          amount: 2100, 
          status: "review_required", 
          dueDate: "Nov 30, 2024" 
        }
      ],
      recentUpdates: [
        {
          date: "Nov 19, 2024",
          message: "App is ready for final review. All features implemented and tested. Please review the demo link below.",
          attachments: ["demo_app_link.txt", "test_results.pdf", "user_guide.pdf"]
        },
        {
          date: "Nov 16, 2024",
          message: "AR try-on feature is complete and working perfectly. Starting final testing phase.",
          attachments: ["ar_demo.mp4"]
        }
      ],
      skills: ["React Native", "AR/VR", "JavaScript", "Firebase", "Stripe"],
      communicationFreency: "Twice weekly",
      workingHours: "10 AM - 7 PM CST"
    },
    {
      id: 6,
      title: "Brand Identity & Website Design",
      description: "Complete brand identity package and responsive website design for sustainable fashion startup.",
      freelancer: {
        name: "Sophie Turner",
        avatar: "ST",
        rating: 4.9,
        reviews: 78,
        location: "London, UK",
        hourlyRate: 95,
        responseTime: "30min",
        completedProjects: 56
      },
      status: "On Hold",
      progress: 40,
      startDate: "Oct 1, 2024",
      deadline: "Jan 15, 2025",
      lastUpdate: "1 week ago",
      contractType: "Milestone-based",
      totalValue: 8500,
      paidAmount: 3400,
      nextMilestone: "Website Wireframes & Prototypes",
      nextMilestoneAmount: 2125,
      nextMilestoneDue: "Dec 1, 2024",
      milestones: [
        { 
          id: 1, 
          title: "Brand Research & Strategy", 
          amount: 1700, 
          status: "completed", 
          dueDate: "Oct 15, 2024",
          completedDate: "Oct 12, 2024"
        },
        { 
          id: 2, 
          title: "Logo Design & Brand Assets", 
          amount: 1700, 
          status: "completed", 
          dueDate: "Oct 30, 2024",
          completedDate: "Oct 28, 2024"
        },
        { 
          id: 3, 
          title: "Website Wireframes & Prototypes", 
          amount: 2125, 
          status: "on_hold", 
          dueDate: "Dec 1, 2024" 
        },
        { 
          id: 4, 
          title: "Website Design & Development", 
          amount: 2125, 
          status: "pending", 
          dueDate: "Dec 30, 2024" 
        },
        { 
          id: 5, 
          title: "Final Delivery & Handover", 
          amount: 850, 
          status: "pending", 
          dueDate: "Jan 15, 2025" 
        }
      ],
      recentUpdates: [
        {
          date: "Nov 12, 2024",
          message: "Project temporarily on hold per client request due to budget reallocation. Ready to resume when approved.",
          attachments: []
        },
        {
          date: "Oct 28, 2024",
          message: "Brand identity package completed and approved! Logo, color palette, and brand guidelines delivered.",
          attachments: ["brand_package.zip", "brand_guidelines.pdf"]
        }
      ],
      skills: ["Brand Design", "UI/UX", "Figma", "Adobe Creative Suite", "Webflow"],
      communicationFreency: "Weekly check-ins",
      workingHours: "9 AM - 5 PM GMT"
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800"
      case "Completed":
        return "bg-blue-100 text-blue-800"
      case "Paused":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-slate-100 text-slate-700"
    }
  }

  const getOngoingStatusColor = (status: string) => {
    switch (status) {
      case "In Progress":
        return "bg-blue-100 text-blue-800"
      case "Review Required":
        return "bg-orange-100 text-orange-800"
      case "On Hold":
        return "bg-yellow-100 text-yellow-800"
      case "Completed":
        return "bg-green-100 text-green-800"
      default:
        return "bg-slate-100 text-slate-700"
    }
  }

  const getMilestoneStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "in_progress":
        return "bg-blue-100 text-blue-800"
      case "review_required":
        return "bg-orange-100 text-orange-800"
      case "on_hold":
        return "bg-yellow-100 text-yellow-800"
      case "pending":
        return "bg-slate-100 text-slate-700"
      default:
        return "bg-slate-100 text-slate-700"
    }
  }

  const getMilestoneStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "Completed"
      case "in_progress":
        return "In Progress"
      case "review_required":
        return "Review Required"
      case "on_hold":
        return "On Hold"
      case "pending":
        return "Pending"
      default:
        return status
    }
  }

  const getMilestoneIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "in_progress":
        return <PlayCircle className="h-4 w-4 text-blue-600" />
      case "review_required":
        return <AlertTriangle className="h-4 w-4 text-orange-600" />
      case "on_hold":
        return <PauseCircle className="h-4 w-4 text-yellow-600" />
      case "pending":
        return <Clock className="h-4 w-4 text-slate-500" />
      default:
        return <Clock className="h-4 w-4 text-slate-500" />
    }
  }

  const sendUpdateRequest = (projectId: number) => {
    // Handle sending update request
    console.log(`Sending update request for project ${projectId}: ${updateMessage}`)
    setUpdateMessage("")
    setSelectedProject(null)
  }

  const getApplicationStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "interviewed":
        return "bg-blue-100 text-blue-800"
      case "hired":
        return "bg-green-100 text-green-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-slate-100 text-slate-700"
    }
  }

  const getApplicationStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "Pending Review"
      case "interviewed":
        return "Interviewed"
      case "hired":
        return "Hired"
      case "rejected":
        return "Rejected"
      default:
        return status
    }
  }

  const handleMessageClick = (e: React.MouseEvent, freelancer: any) => {
    e.stopPropagation()
    setSelectedFreelancer(freelancer)
    setShowMessageModal(true)
  }

  const handleViewProfileClick = (e: React.MouseEvent, freelancer: any) => {
    e.stopPropagation()
    setSelectedFreelancer(freelancer)
    setShowFreelancerProfile(true)
  }

  const handleSendMessage = () => {
    // Handle message sending logic here
    console.log("Sending message:", messageText)
    setShowMessageModal(false)
    setMessageText("")
  }

  return (
    <div className="min-h-full">
      <div className="w-[65%] mx-auto py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link href="/jobs/freelance">
              <Button variant="ghost" size="icon" className="text-slate-400 hover:text-primary-navy hover:bg-slate-50 rounded-full">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-4xl font-heading text-primary-navy">My Projects</h1>
              <p className="text-xl text-slate-600 font-subheading">Manage your projects and ongoing work</p>
            </div>
          </div>
          <Link href="/jobs/freelance/post">
            <Button className="bg-primary-navy hover:bg-slate-800 text-white rounded-lg px-6 font-subheading">
              Post New Project
            </Button>
          </Link>
        </div>

        {/* Tabs for Posted Projects and Ongoing Projects */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="posted" className="font-subheading">
              Posted Projects ({projects.length})
            </TabsTrigger>
            <TabsTrigger value="ongoing" className="font-subheading">
              Ongoing Projects ({ongoingProjects.length})
            </TabsTrigger>
          </TabsList>

          {/* Posted Projects Tab */}
          <TabsContent value="posted" className="space-y-6">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="border-slate-200 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="h-12 w-12 bg-[#0056B3]/10 rounded-xl flex items-center justify-center">
                      <Eye className="h-6 w-6 text-[#0056B3]" />
                    </div>
                    <div>
                      <p className="text-2xl font-heading text-primary-navy">3</p>
                      <p className="text-sm font-subheading text-slate-600">Active Projects</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-slate-200 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="h-12 w-12 bg-green-100 rounded-xl flex items-center justify-center">
                      <Users className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-heading text-primary-navy">35</p>
                      <p className="text-sm font-subheading text-slate-600">Total Applications</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-slate-200 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="h-12 w-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <MessageCircle className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-heading text-primary-navy">8</p>
                      <p className="text-sm font-subheading text-slate-600">Interviews Scheduled</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-slate-200 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="h-12 w-12 bg-amber-100 rounded-xl flex items-center justify-center">
                      <Star className="h-6 w-6 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-heading text-primary-navy">4.8</p>
                      <p className="text-sm font-subheading text-slate-600">Average Rating</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Posted Projects List */}
            <div className="space-y-6">
              {projects.map((project) => (
                <Card key={project.id} className="border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader className="border-b border-slate-100">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <CardTitle className="text-xl font-heading text-primary-navy">{project.title}</CardTitle>
                          <Badge className={`${getStatusColor(project.status)} font-subheading`}>
                            {project.status}
                          </Badge>
                        </div>
                        <p className="text-slate-600 font-subheading leading-relaxed mb-4">{project.description}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.skills.map((skill) => (
                            <Badge key={skill} className="bg-slate-100 text-slate-700 font-subheading">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex items-center space-x-6 text-sm text-slate-500">
                          <div className="flex items-center">
                            <DollarSign className="h-4 w-4 mr-1" />
                            <span className="font-subheading">{project.budget} • {project.type}</span>
                          </div>
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            <span className="font-subheading">Posted {project.posted}</span>
                          </div>
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-1" />
                            <span className="font-subheading">{project.applicants} applications</span>
                          </div>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="text-slate-400 hover:text-primary-navy hover:bg-slate-50 rounded-full">
                            <MoreVertical className="h-5 w-5" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Project
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Share2 className="h-4 w-4 mr-2" />
                            Share Project
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Archive className="h-4 w-4 mr-2" />
                            Archive Project
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-heading text-primary-navy">Applications ({project.applications.length})</h3>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="border-primary-navy text-primary-navy hover:bg-primary-navy hover:text-white rounded-xl font-subheading"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View All
                      </Button>
                    </div>
                    <div className="space-y-4">
                      {project.applications && project.applications.length > 0 ? (
                        project.applications.map((application) => (
                          <div key={application.id} className="border-t border-slate-200 pt-4 first:border-t-0 first:pt-0">
                            <div className="flex items-start space-x-4">
                              <Avatar className="h-12 w-12">
                                <AvatarFallback className="bg-gradient-to-br from-slate-600 to-slate-800 text-white font-heading">
                                  {application.avatar}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <div className="flex items-start justify-between">
                                  <div>
                                    <h4 className="font-heading text-primary-navy">{application.name}</h4>
                                    <div className="flex items-center space-x-4 mt-1">
                                      <div className="flex items-center">
                                        <Star className="h-4 w-4 fill-amber-400 text-amber-400 mr-1" />
                                        <span className="font-subheading">{application.rating} ({application.reviews} reviews)</span>
                                      </div>
                                      <div className="flex items-center">
                                        <DollarSign className="h-4 w-4 mr-1" />
                                        <span className="font-subheading">${application.hourlyRate}/hr</span>
                                      </div>
                                      <div className="flex items-center">
                                        <MapPin className="h-4 w-4 mr-1" />
                                        <span className="font-subheading">{application.location}</span>
                                      </div>
                                    </div>
                                  </div>
                                  <Badge 
                                    variant="outline" 
                                    className={`font-subheading ${
                                      application.status === "hired" 
                                        ? "border-green-500 text-green-600" 
                                        : application.status === "rejected" 
                                        ? "border-red-500 text-red-600"
                                        : "border-amber-500 text-amber-600"
                                    }`}
                                  >
                                    {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                                  </Badge>
                                </div>
                                <p className="text-slate-600 font-subheading mt-2">{application.proposal}</p>
                                <div className="flex items-center justify-between mt-4">
                                  <p className="text-xs text-slate-500 font-subheading">Applied {application.appliedAt}</p>
                                  <div className="flex space-x-2">
                                    <Button 
                                      variant="outline" 
                                      size="sm"
                                      className="border-primary-navy text-primary-navy hover:bg-primary-navy hover:text-white rounded-xl font-subheading"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedFreelancer(application);
                                        setShowMessageModal(true);
                                      }}
                                    >
                                      <Mail className="h-4 w-4 mr-1" />
                                      Message
                                    </Button>
                                    {(application.status === "pending" || application.status === "interviewed") && (
                                      <Link href={`/hire-freelancer?project=${project.id}&applicant=${application.id}`}>
                                        <Button 
                                          size="sm"
                                          className="bg-green-600 hover:bg-green-700 text-white rounded-lg font-subheading"
                                        >
                                          Hire Now
                                        </Button>
                                      </Link>
                                    )}
                                    <Button 
                                      size="sm"
                                      className="bg-primary-navy hover:bg-slate-800 text-white rounded-lg font-subheading"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedFreelancer(application);
                                        setShowFreelancerProfile(true);
                                      }}
                                    >
                                      View Profile
                                      <ChevronRight className="h-4 w-4 ml-1" />
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-8">
                          <p className="text-slate-500 font-subheading">No applications yet</p>
                        </div>
                      )}
                      {project.applications.length > 2 && (
                        <div className="text-center pt-2">
                          <Button 
                            variant="outline" 
                            className="border-primary-navy text-primary-navy hover:bg-primary-navy hover:text-white rounded-xl font-subheading"
                          >
                            View {project.applications.length - 2} more applications
                            <ChevronRight className="h-4 w-4 ml-1" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Empty State (if no projects) */}
            {projects.length === 0 && (
              <Card className="border-slate-200 shadow-sm">
                <CardContent className="p-12 text-center">
                  <div className="h-16 w-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Eye className="h-8 w-8 text-slate-400" />
                  </div>
                  <h3 className="text-xl font-heading text-slate-700 mb-2">No projects posted yet</h3>
                  <p className="text-slate-500 font-subheading mb-6">Start by posting your first project to find talented freelancers.</p>
                  <Link href="/jobs/freelance/post">
                    <Button className="bg-primary-navy hover:bg-slate-800 text-white rounded-lg px-6 font-subheading">
                      Post Your First Project
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Ongoing Projects Tab */}
          <TabsContent value="ongoing" className="space-y-6">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="border-slate-200 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="h-12 w-12 bg-[#0056B3]/10 rounded-xl flex items-center justify-center">
                      <TrendingUp className="h-6 w-6 text-[#0056B3]" />
                    </div>
                    <div>
                      <p className="text-2xl font-heading text-primary-navy">{ongoingProjects.length}</p>
                      <p className="text-sm font-subheading text-slate-600">Ongoing Projects</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-slate-200 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="h-12 w-12 bg-green-100 rounded-xl flex items-center justify-center">
                      <DollarSign className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-heading text-primary-navy">
                        ${ongoingProjects.reduce((sum, project) => sum + project.paidAmount, 0).toLocaleString()}
                      </p>
                      <p className="text-sm font-subheading text-slate-600">Total Paid</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-slate-200 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="h-12 w-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <Shield className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-heading text-primary-navy">
                        ${ongoingProjects.reduce((sum, project) => sum + project.nextMilestoneAmount, 0).toLocaleString()}
                      </p>
                      <p className="text-sm font-subheading text-slate-600">Pending Payments</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-slate-200 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="h-12 w-12 bg-amber-100 rounded-xl flex items-center justify-center">
                      <Clock className="h-6 w-6 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-heading text-primary-navy">
                        {Math.round(ongoingProjects.reduce((sum, project) => sum + project.progress, 0) / ongoingProjects.length) || 0}%
                      </p>
                      <p className="text-sm font-subheading text-slate-600">Avg Progress</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Ongoing Projects List */}
            <div className="space-y-6">
              {ongoingProjects.map((project) => (
                <Card key={project.id} className="border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader className="border-b border-slate-100">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <CardTitle className="text-2xl font-heading text-primary-navy">{project.title}</CardTitle>
                          <Badge className={`${getOngoingStatusColor(project.status)} font-subheading`}>
                            {project.status}
                          </Badge>
                        </div>
                        <p className="text-slate-600 font-subheading leading-relaxed mb-4">{project.description}</p>
                        
                        {/* Progress Bar */}
                        <div className="mb-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-subheading text-slate-600">Progress</span>
                            <span className="text-sm font-heading text-primary-navy">{project.progress}%</span>
                          </div>
                          <Progress value={project.progress} className="h-2" />
                        </div>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.skills.map((skill) => (
                            <Badge key={skill} className="bg-slate-100 text-slate-700 font-subheading">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                        
                        <div className="flex items-center space-x-6 text-sm text-slate-500">
                          <div className="flex items-center">
                            <DollarSign className="h-4 w-4 mr-1" />
                            <span className="font-subheading">${project.totalValue.toLocaleString()} • {project.contractType}</span>
                          </div>
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            <span className="font-subheading">Due {project.deadline}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            <span className="font-subheading">Updated {project.lastUpdate}</span>
                          </div>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="text-slate-400 hover:text-primary-navy hover:bg-slate-50 rounded-full">
                            <MoreVertical className="h-5 w-5" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuItem>
                            <FileText className="h-4 w-4 mr-2" />
                            View Contract
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="h-4 w-4 mr-2" />
                            Download Files
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Archive className="h-4 w-4 mr-2" />
                            Archive Project
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    {/* Freelancer Information */}
                    <div className="flex items-start space-x-4 mb-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
                      <Avatar className="h-16 w-16">
                        <AvatarFallback className="bg-gradient-to-br from-primary-navy to-slate-700 text-white text-lg font-heading">
                          {project.freelancer.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-xl font-heading text-primary-navy">{project.freelancer.name}</h4>
                          <div className="flex space-x-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="border-primary-navy text-primary-navy hover:bg-primary-navy hover:text-white rounded-lg font-subheading"
                            >
                              <MessageCircle className="h-4 w-4 mr-1" />
                              Message
                            </Button>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button 
                                  size="sm"
                                  variant="outline"
                                  className="border-primary-navy text-primary-navy hover:bg-primary-navy hover:text-white rounded-xl font-subheading"
                                  onClick={(e) => handleMessageClick(e, project.freelancer)}
                                >
                                  <Send className="h-4 w-4 mr-1" />
                                  Request Update
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-md">
                                <DialogHeader>
                                  <DialogTitle className="font-heading">Request Project Update</DialogTitle>
                                  <DialogDescription className="font-subheading">
                                    Send a message to {project.freelancer.name} requesting a project update.
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4">
                                  <Textarea
                                    placeholder="Hi! Could you please provide an update on the current progress?"
                                    value={updateMessage}
                                    onChange={(e) => setUpdateMessage(e.target.value)}
                                    className="min-h-[100px]"
                                  />
                                </div>
                                <DialogFooter>
                                  <Button
                                    type="submit"
                                    onClick={() => sendUpdateRequest(project.id)}
                                    className="bg-primary-navy hover:bg-slate-800 text-white rounded-lg font-subheading"
                                  >
                                    Send Request
                                  </Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4 mb-3 text-sm text-slate-600">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 mr-1 fill-amber-400 text-amber-400" />
                            <span className="font-subheading">{project.freelancer.rating} ({project.freelancer.reviews} reviews)</span>
                          </div>
                          <div className="flex items-center">
                            <DollarSign className="h-4 w-4 mr-1" />
                            <span className="font-subheading">${project.freelancer.hourlyRate}/hr</span>
                          </div>
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            <span className="font-subheading">{project.freelancer.location}</span>
                          </div>
                          <div className="flex items-center">
                            <MessageCircle className="h-4 w-4 mr-1" />
                            <span className="font-subheading">Responds in {project.freelancer.responseTime}</span>
                          </div>
                        </div>
                        <div className="text-sm text-slate-500 font-subheading">
                          <strong>{project.freelancer.completedProjects}</strong> projects completed • 
                          Working hours: <strong>{project.workingHours}</strong> • 
                          Communication: <strong>{project.communicationFreency}</strong>
                        </div>
                      </div>
                    </div>

                    {/* Payment Summary */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <Card className="border-green-200 bg-green-50">
                        <CardContent className="p-4 text-center">
                          <div className="flex items-center justify-center mb-2">
                            <Shield className="h-5 w-5 text-green-600 mr-2" />
                            <span className="text-sm font-subheading text-green-800">Paid Amount</span>
                          </div>
                          <p className="text-xl font-heading text-green-700">${project.paidAmount.toLocaleString()}</p>
                        </CardContent>
                      </Card>
                      <Card className="border-blue-200 bg-blue-50">
                        <CardContent className="p-4 text-center">
                          <div className="flex items-center justify-center mb-2">
                            <TrendingUp className="h-5 w-5 text-blue-600 mr-2" />
                            <span className="text-sm font-subheading text-blue-800">Next Milestone</span>
                          </div>
                          <p className="text-xl font-heading text-blue-700">${project.nextMilestoneAmount.toLocaleString()}</p>
                          <p className="text-xs text-blue-600 font-subheading">Due {project.nextMilestoneDue}</p>
                        </CardContent>
                      </Card>
                      <Card className="border-purple-200 bg-purple-50">
                        <CardContent className="p-4 text-center">
                          <div className="flex items-center justify-center mb-2">
                            <CreditCard className="h-5 w-5 text-purple-600 mr-2" />
                            <span className="text-sm font-subheading text-purple-800">Total Value</span>
                          </div>
                          <p className="text-xl font-heading text-purple-700">${project.totalValue.toLocaleString()}</p>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Milestones */}
                    <div className="mb-6">
                      <h4 className="text-lg font-heading text-primary-navy mb-4">Project Milestones</h4>
                      <div className="space-y-3">
                        {project.milestones.map((milestone, index) => (
                          <div key={milestone.id} className="flex items-center space-x-4 p-3 border border-slate-200 rounded-lg">
                            <div className="flex-shrink-0">
                              {getMilestoneIcon(milestone.status)}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <h5 className="font-heading text-slate-900">{milestone.title}</h5>
                                <div className="flex items-center space-x-2">
                                  <Badge className={`${getMilestoneStatusColor(milestone.status)} font-subheading text-xs`}>
                                    {getMilestoneStatusText(milestone.status)}
                                  </Badge>
                                  <span className="text-sm font-heading text-slate-900">${milestone.amount.toLocaleString()}</span>
                                </div>
                              </div>
                              <div className="flex items-center space-x-4 text-xs text-slate-500">
                                <span className="font-subheading">Due: {milestone.dueDate}</span>
                                {milestone.completedDate && (
                                  <span className="font-subheading text-green-600">Completed: {milestone.completedDate}</span>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Recent Updates */}
                    <div>
                      <h4 className="text-lg font-heading text-primary-navy mb-4">Recent Updates</h4>
                      <div className="space-y-4">
                        {project.recentUpdates.map((update, index) => (
                          <div key={index} className="border border-slate-200 rounded-lg p-4 bg-slate-50">
                            <div className="flex items-start justify-between mb-2">
                              <p className="text-sm font-subheading text-slate-600">{update.date}</p>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                className="text-primary-navy hover:text-slate-800 hover:bg-slate-100 rounded-lg font-subheading h-6 px-2"
                              >
                                <ExternalLink className="h-3 w-3" />
                              </Button>
                            </div>
                            <p className="text-slate-800 font-subheading leading-relaxed mb-3">{update.message}</p>
                            {update.attachments.length > 0 && (
                              <div className="flex flex-wrap gap-2">
                                {update.attachments.map((attachment, attachIndex) => (
                                  <Badge key={attachIndex} className="bg-blue-100 text-blue-800 font-subheading">
                                    <FileText className="h-3 w-3 mr-1" />
                                    {attachment}
                                  </Badge>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Empty State (if no ongoing projects) */}
            {ongoingProjects.length === 0 && (
              <Card className="border-slate-200 shadow-sm">
                <CardContent className="p-12 text-center">
                  <div className="h-16 w-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="h-8 w-8 text-slate-400" />
                  </div>
                  <h3 className="text-xl font-heading text-slate-700 mb-2">No ongoing projects</h3>
                  <p className="text-slate-500 font-subheading mb-6">Your active projects with hired freelancers will appear here.</p>
                  <Link href="/jobs/freelance/post">
                    <Button className="bg-primary-navy hover:bg-slate-800 text-white rounded-lg px-6 font-subheading">
                      Post a New Project
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>

        {/* Empty State for Posted Projects (if no projects) */}
        {projects.length === 0 && activeTab === "posted" && (
          <Card className="border-slate-200 shadow-sm">
            <CardContent className="p-12 text-center">
              <div className="h-16 w-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Eye className="h-8 w-8 text-slate-400" />
              </div>
              <h3 className="text-xl font-heading text-slate-700 mb-2">No projects posted yet</h3>
              <p className="text-slate-500 font-subheading mb-6">Start by posting your first project to find talented freelancers.</p>
              <Link href="/jobs/freelance/post">
                <Button className="bg-primary-navy hover:bg-slate-800 text-white rounded-lg px-6 font-subheading">
                  Post Your First Project
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Message Modal */}
      <Dialog open={showMessageModal} onOpenChange={setShowMessageModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowMessageModal(false)}
                  className="border-primary-navy text-primary-navy hover:bg-primary-navy hover:text-white rounded-xl font-subheading"
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
                <DialogTitle className="font-heading text-primary-navy">
                  Message {selectedFreelancer?.name}
                </DialogTitle>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowMessageModal(false)}
                className="border-primary-navy text-primary-navy hover:bg-primary-navy hover:text-white rounded-xl font-subheading"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </DialogHeader>
          <div className="space-y-4">
            <div className="bg-slate-50 p-4 rounded-lg">
              <p className="text-sm text-slate-500 mb-2">Your message will be sent to the freelancer's inbox</p>
              <Textarea
                className="w-full h-32 p-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-navy"
                placeholder="Type your message here..."
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
              />
            </div>
            <div className="flex justify-end space-x-3">
              <Button
                variant="outline"
                onClick={() => setShowMessageModal(false)}
                className="border-primary-navy text-primary-navy hover:bg-primary-navy hover:text-white rounded-xl font-subheading"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSendMessage}
                disabled={!messageText.trim()}
                className="bg-primary-navy hover:bg-slate-800 text-white rounded-xl font-subheading"
              >
                <Send className="h-4 w-4 mr-2" />
                Send Message
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Freelancer Profile Modal */}
      {selectedFreelancer && showFreelancerProfile && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowFreelancerProfile(false)}
                    className="border-primary-navy text-primary-navy hover:bg-primary-navy hover:text-white rounded-xl font-subheading"
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </Button>
                  <h1 className="text-2xl font-heading text-primary-navy">Freelancer Profile</h1>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowFreelancerProfile(false)}
                  className="border-primary-navy text-primary-navy hover:bg-primary-navy hover:text-white rounded-xl font-subheading"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Profile Content */}
              <div className="space-y-6">
                {/* Basic Info */}
                <div className="flex items-start space-x-6">
                  <Avatar className="h-20 w-20">
                    <AvatarFallback className="bg-gradient-to-br from-slate-600 to-slate-800 text-white font-heading text-2xl">
                      {selectedFreelancer.name.split(' ').map((n: string) => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="text-2xl font-heading text-primary-navy">{selectedFreelancer.name}</h2>
                    <p className="text-slate-600 font-subheading">{selectedFreelancer.title || 'Freelancer'}</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-amber-400 text-amber-400 mr-1" />
                        <span className="font-subheading">{selectedFreelancer.rating} ({selectedFreelancer.reviews} reviews)</span>
                      </div>
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 mr-1" />
                        <span className="font-subheading">${selectedFreelancer.hourlyRate}/hr</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span className="font-subheading">{selectedFreelancer.location}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Application Details */}
                <div className="bg-slate-50 rounded-xl p-6 space-y-6">
                  <h3 className="text-xl font-heading text-primary-navy">Application Details</h3>
                  
                  {/* Cover Letter */}
                  <div>
                    <h4 className="font-heading text-primary-navy mb-2">Cover Letter</h4>
                    <div className="bg-white rounded-lg p-4 border border-slate-200">
                      <p className="text-slate-600 font-subheading leading-relaxed">{selectedFreelancer.proposal}</p>
                    </div>
                  </div>

                  {/* Expected Salary */}
                  <div>
                    <h4 className="font-heading text-primary-navy mb-2">Expected Salary</h4>
                    <div className="bg-white rounded-lg p-4 border border-slate-200">
                      <p className="text-slate-600 font-subheading">${selectedFreelancer.hourlyRate}/hour</p>
                    </div>
                  </div>

                  {/* Available Start Date */}
                  <div>
                    <h4 className="font-heading text-primary-navy mb-2">Available Start Date</h4>
                    <div className="bg-white rounded-lg p-4 border border-slate-200">
                      <p className="text-slate-600 font-subheading">{selectedFreelancer.startDate || 'Immediately'}</p>
                    </div>
                  </div>

                  {/* Application Timeline */}
                  <div>
                    <h4 className="font-heading text-primary-navy mb-2">Application Timeline</h4>
                    <div className="bg-white rounded-lg p-4 border border-slate-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-slate-500">Applied</p>
                          <p className="font-subheading">{selectedFreelancer.appliedAt}</p>
                        </div>
                        <div>
                          <p className="text-sm text-slate-500">Status</p>
                          <Badge 
                            variant="outline" 
                            className={`font-subheading ${
                              selectedFreelancer.status === "hired" 
                                ? "border-green-500 text-green-600" 
                                : selectedFreelancer.status === "rejected" 
                                ? "border-red-500 text-red-600"
                                : "border-amber-500 text-amber-600"
                            }`}
                          >
                            {selectedFreelancer.status.charAt(0).toUpperCase() + selectedFreelancer.status.slice(1)}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Skills & Expertise */}
                <div>
                  <h3 className="font-heading text-primary-navy mb-2">Skills & Expertise</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedFreelancer.skills && selectedFreelancer.skills.map((skill: string) => (
                      <Badge key={skill} variant="secondary" className="font-subheading">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Experience */}
                <div>
                  <h3 className="font-heading text-primary-navy mb-2">Experience</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-50 p-4 rounded-lg">
                      <p className="text-sm text-slate-500">Experience</p>
                      <p className="font-subheading">{selectedFreelancer.experience || 'Not specified'}</p>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-lg">
                      <p className="text-sm text-slate-500">Completed Projects</p>
                      <p className="font-subheading">{selectedFreelancer.completedProjects || 'Not specified'}</p>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-lg">
                      <p className="text-sm text-slate-500">Client Retention</p>
                      <p className="font-subheading">{selectedFreelancer.clientRetention || 'Not specified'}</p>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-lg">
                      <p className="text-sm text-slate-500">Response Time</p>
                      <p className="font-subheading">{selectedFreelancer.responseTime || 'Not specified'}</p>
                    </div>
                  </div>
                </div>

                {/* Portfolio */}
                {selectedFreelancer.portfolio && selectedFreelancer.portfolio.length > 0 && (
                  <div>
                    <h3 className="font-heading text-primary-navy mb-2">Portfolio</h3>
                    <div className="space-y-2">
                      {selectedFreelancer.portfolio.map((item: any) => (
                        <div key={item.name} className="bg-slate-50 p-4 rounded-lg">
                          <p className="font-subheading font-medium">{item.name}</p>
                          <p className="text-sm text-slate-600">{item.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Testimonials */}
                {selectedFreelancer.testimonials && selectedFreelancer.testimonials.length > 0 && (
                  <div>
                    <h3 className="font-heading text-primary-navy mb-2">Client Testimonials</h3>
                    <div className="space-y-4">
                      {selectedFreelancer.testimonials.map((testimonial: any) => (
                        <div key={testimonial.client} className="bg-slate-50 p-4 rounded-lg">
                          <p className="font-subheading font-medium">{testimonial.client}</p>
                          <p className="text-sm text-slate-600 mt-1">{testimonial.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex space-x-4 pt-4">
                  <Button 
                    className="flex-1 bg-primary-navy hover:bg-slate-800 text-white rounded-xl font-subheading"
                    onClick={() => {
                      setShowFreelancerProfile(false)
                      setShowMessageModal(true)
                    }}
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Message Freelancer
                  </Button>
                  <Button 
                    variant="outline" 
                    className="border-primary-navy text-primary-navy hover:bg-primary-navy hover:text-white rounded-xl font-subheading"
                    onClick={() => setShowFreelancerProfile(false)}
                  >
                    <BookmarkIcon className="h-4 w-4 mr-2" />
                    Save Profile
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 