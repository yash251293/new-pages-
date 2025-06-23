"use client"

import { useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { 
  ArrowLeft,
  Eye,
  Users,
  Target,
  Clock,
  DollarSign,
  Calendar,
  MapPin,
  Star,
  MessageCircle,
  UserCheck,
  UserX,
  Download,
  ExternalLink,
  Briefcase,
  Award,
  Globe,
  Mail,
  Phone,
  XCircle
} from "lucide-react"

export default function FreelanceProjectDetails() {
  const router = useRouter()
  const params = useParams()
  const projectId = params.id as string
  const [selectedApplicant, setSelectedApplicant] = useState<any>(null)
  const [showApplicantDetails, setShowApplicantDetails] = useState(false)

  // Mock project data - in real app, this would be fetched based on projectId
  const project = {
    id: parseInt(projectId),
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
    skills: ["React Native", "TypeScript", "API Integration", "Firebase", "Redux"],
    description: `We are looking for an experienced React Native developer to build a cross-platform mobile application for our e-commerce platform. The app should include user authentication, product browsing, shopping cart functionality, payment integration, and real-time notifications.

Key Features Required:
• User registration and authentication
• Product catalog with search and filtering
• Shopping cart and checkout process
• Payment gateway integration (Stripe/PayPal)
• Push notifications
• User profile management
• Order history and tracking
• Admin panel integration via APIs

Technical Requirements:
• React Native (latest version)
• TypeScript implementation
• Redux for state management
• Firebase for backend services
• RESTful API integration
• Clean, maintainable code
• Unit testing
• App store deployment assistance

Deliverables:
• Complete mobile app for iOS and Android
• Source code with documentation
• Testing on both platforms
• App store submission support
• 3 months post-launch support`,
    company: "TechCorp Inc.",
    postedBy: "Sarah Johnson",
    location: "Remote",
    applicants: [
      {
        id: 1,
        name: "Alex Rivera",
        title: "Senior React Native Developer",
        rating: 4.9,
        reviews: 127,
        hourlyRate: "$65/hr",
        proposalAmount: "$9,500",
        completedProjects: 89,
        successRate: "98%",
        responseTime: "1 hour",
        location: "San Francisco, CA",
        profileImage: "/api/placeholder/64/64",
        status: "new",
        appliedDate: "2 days ago",
        availability: "Available now",
        coverLetter: "I'm excited about this React Native project and believe I'm the perfect fit. With 6+ years of experience in mobile development and 89 successfully completed projects, I've built numerous e-commerce apps with similar requirements. My expertise includes React Native, TypeScript, Redux, and Firebase integration. I can deliver a high-quality, cross-platform app that meets all your specifications within the 2-3 month timeline.",
        skills: ["React Native", "TypeScript", "Redux", "Firebase", "API Integration", "Payment Integration"],
        portfolio: [
          { title: "E-commerce Mobile App", description: "Built for retail client", link: "#" },
          { title: "Food Delivery App", description: "React Native + Firebase", link: "#" },
        ],
        education: "B.S. Computer Science, Stanford University",
        experience: "6+ years",
        languages: ["English (Native)", "Spanish (Fluent)"],
        certifications: ["React Native Certified Developer", "Firebase Certified"],
        email: "alex.rivera@email.com",
        phone: "+1 (555) 123-4567"
      },
      {
        id: 2,
        name: "Sarah Kim",
        title: "Mobile App Developer",
        rating: 4.8,
        reviews: 94,
        hourlyRate: "$58/hr",
        proposalAmount: "$10,200",
        completedProjects: 67,
        successRate: "96%",
        responseTime: "2 hours",
        location: "Austin, TX",
        profileImage: "/api/placeholder/64/64",
        status: "reviewing",
        appliedDate: "3 days ago",
        availability: "Available in 1 week",
        coverLetter: "I specialize in React Native development with a focus on e-commerce applications. I've successfully delivered 67 mobile projects with a 96% success rate. My approach emphasizes clean code, thorough testing, and seamless user experience. I'm particularly experienced with payment integrations and have worked with Stripe, PayPal, and other major payment processors.",
        skills: ["React Native", "JavaScript", "Node.js", "MongoDB", "Stripe Integration"],
        portfolio: [
          { title: "Shopping App", description: "React Native e-commerce solution", link: "#" },
          { title: "Marketplace App", description: "Multi-vendor platform", link: "#" },
        ],
        education: "M.S. Computer Science, UT Austin",
        experience: "5+ years",
        languages: ["English (Native)", "Korean (Native)"],
        certifications: ["AWS Certified Developer", "Google Mobile Developer"],
        email: "sarah.kim@email.com",
        phone: "+1 (555) 234-5678"
      },
      {
        id: 3,
        name: "James Chen",
        title: "Full Stack Mobile Developer",
        rating: 5.0,
        reviews: 156,
        hourlyRate: "$72/hr",
        proposalAmount: "$8,800",
        completedProjects: 134,
        successRate: "99%",
        responseTime: "30 minutes",
        location: "Seattle, WA",
        profileImage: "/api/placeholder/64/64",
        status: "shortlisted",
        appliedDate: "4 days ago",
        availability: "Available now",
        coverLetter: "As a top-rated developer with 134 completed projects and a 99% success rate, I bring extensive experience in React Native development. I've built similar e-commerce apps and can deliver exceptional results within your timeline. My competitive proposal reflects my efficiency and established development processes.",
        skills: ["React Native", "TypeScript", "GraphQL", "AWS", "CI/CD", "App Store Optimization"],
        portfolio: [
          { title: "Enterprise E-commerce App", description: "Fortune 500 client", link: "#" },
          { title: "FinTech Mobile App", description: "Payment processing app", link: "#" },
        ],
        education: "B.S. Software Engineering, University of Washington",
        experience: "8+ years",
        languages: ["English (Native)", "Mandarin (Fluent)"],
        certifications: ["React Native Expert", "AWS Solutions Architect"],
        email: "james.chen@email.com",
        phone: "+1 (555) 345-6789"
      },
      {
        id: 4,
        name: "Maria Rodriguez",
        title: "React Native Specialist",
        rating: 4.9,
        reviews: 203,
        hourlyRate: "$60/hr",
        proposalAmount: "$9,200",
        completedProjects: 78,
        successRate: "97%",
        responseTime: "1 hour",
        location: "Miami, FL",
        profileImage: "/api/placeholder/64/64",
        status: "interviewed",
        appliedDate: "5 days ago",
        availability: "Available in 2 weeks",
        coverLetter: "I'm a specialized React Native developer with deep expertise in e-commerce solutions. My portfolio includes multiple successful app store launches and I excel at creating intuitive user experiences with robust backend integrations. I'm committed to delivering pixel-perfect designs and scalable architecture.",
        skills: ["React Native", "TypeScript", "Redux Toolkit", "Firebase", "Payment Gateways"],
        portfolio: [
          { title: "Fashion E-commerce App", description: "High-end retail client", link: "#" },
          { title: "B2B Marketplace", description: "Enterprise solution", link: "#" },
        ],
        education: "B.S. Computer Science, FIU",
        experience: "4+ years",
        languages: ["English (Fluent)", "Spanish (Native)"],
        certifications: ["React Native Certified", "Google Play Developer"],
        email: "maria.rodriguez@email.com",
        phone: "+1 (555) 456-7890"
      },
      {
        id: 5,
        name: "David Park",
        title: "Mobile Developer",
        rating: 4.7,
        reviews: 89,
        hourlyRate: "$55/hr",
        proposalAmount: "$11,000",
        completedProjects: 56,
        successRate: "94%",
        responseTime: "3 hours",
        location: "Los Angeles, CA",
        profileImage: "/api/placeholder/64/64",
        status: "new",
        appliedDate: "1 day ago",
        availability: "Available now",
        coverLetter: "I bring 4+ years of React Native experience with a focus on performance optimization and user experience. I've successfully delivered e-commerce apps with complex payment integrations and real-time features. My development approach ensures scalable, maintainable code that's easy to extend.",
        skills: ["React Native", "JavaScript", "Node.js", "PostgreSQL", "Docker"],
        portfolio: [
          { title: "Grocery Delivery App", description: "Real-time tracking", link: "#" },
          { title: "Social Commerce App", description: "Community-driven shopping", link: "#" },
        ],
        education: "B.S. Information Systems, UCLA",
        experience: "4+ years",
        languages: ["English (Fluent)", "Korean (Fluent)"],
        certifications: ["React Native Developer", "Scrum Master"],
        email: "david.park@email.com",
        phone: "+1 (555) 567-8901"
      }
    ]
  }

  const handleAction = (applicantId: number, action: 'hire' | 'reject' | 'message') => {
    const applicant = project.applicants.find(a => a.id === applicantId)
    console.log(`${action} applicant:`, applicant?.name)
    // Here you would implement the actual action logic
  }

  const openApplicantDetails = (applicant: any) => {
    setSelectedApplicant(applicant)
    setShowApplicantDetails(true)
  }

  const getStatusColor = (status: string) => {
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

  const getProjectStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-50 text-green-600 border-green-200"
      case "Draft":
        return "bg-yellow-50 text-yellow-600 border-yellow-200"
      case "Completed":
        return "bg-blue-50 text-blue-600 border-blue-200"
      case "Cancelled":
        return "bg-red-50 text-red-600 border-red-200"
      default:
        return "bg-slate-50 text-slate-600 border-slate-200"
    }
  }

  return (
    <div className="w-[65%] mx-auto py-8">
      {/* Header with Back Button */}
      <div className="mb-8">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="mb-4 font-subheading text-primary-navy hover:bg-primary-navy/10"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Projects
        </Button>
        
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-3">
              <h1 className="text-3xl font-heading text-primary-navy">{project.title}</h1>
              <Badge className={`${getProjectStatusColor(project.status)} font-subheading px-3 py-1`}>
                {project.status}
              </Badge>
            </div>
            <div className="flex items-center space-x-4 text-lg font-subheading text-slate-600 mb-4">
              <span className="flex items-center">
                <Briefcase className="h-5 w-5 mr-2" />
                {project.category}
              </span>
              <span>•</span>
              <span className="flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                {project.duration}
              </span>
              <span>•</span>
              <span className="flex items-center">
                <DollarSign className="h-5 w-5 mr-2 text-green-600" />
                <span className="font-heading text-green-600">{project.budget}</span>
              </span>
            </div>
            <div className="flex items-center space-x-4 text-base font-subheading text-slate-500">
              <span>Posted by {project.postedBy}</span>
              <span>•</span>
              <span>{project.posted}</span>
              <span>•</span>
              <span>{project.experience} level required</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button variant="outline" className="border-primary-navy text-primary-navy hover:bg-primary-navy hover:text-white rounded-lg font-subheading">
              Edit Project
            </Button>
            <Button className="bg-primary-navy hover:bg-primary-navy/90 text-white rounded-lg font-subheading">
              Promote Project
            </Button>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="border-slate-200">
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center mb-3">
              <Users className="h-6 w-6 text-blue-600 mr-2" />
              <span className="text-2xl font-heading text-slate-900">{project.proposals}</span>
            </div>
            <p className="font-subheading text-slate-600">Total Proposals</p>
          </CardContent>
        </Card>
        
        <Card className="border-slate-200">
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center mb-3">
              <Eye className="h-6 w-6 text-green-600 mr-2" />
              <span className="text-2xl font-heading text-slate-900">{project.views}</span>
            </div>
            <p className="font-subheading text-slate-600">Project Views</p>
          </CardContent>
        </Card>
        
        <Card className="border-slate-200">
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center mb-3">
              <Target className="h-6 w-6 text-purple-600 mr-2" />
              <span className="text-2xl font-heading text-slate-900">{((project.proposals / project.views) * 100).toFixed(1)}%</span>
            </div>
            <p className="font-subheading text-slate-600">Proposal Rate</p>
          </CardContent>
        </Card>
        
        <Card className="border-slate-200">
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center mb-3">
              <Calendar className="h-6 w-6 text-orange-600 mr-2" />
              <span className="text-2xl font-heading text-slate-900">3</span>
            </div>
            <p className="font-subheading text-slate-600">Days Left</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview" className="font-subheading">Overview</TabsTrigger>
          <TabsTrigger value="applicants" className="font-subheading">Applicants ({project.applicants.length})</TabsTrigger>
          <TabsTrigger value="analytics" className="font-subheading">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Project Description */}
            <div className="lg:col-span-2">
              <Card className="border-slate-200">
                <CardHeader>
                  <CardTitle className="font-heading text-primary-navy">Project Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose max-w-none">
                    <div className="whitespace-pre-line font-subheading text-slate-700 leading-relaxed">
                      {project.description}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Project Details Sidebar */}
            <div className="space-y-6">
              {/* Skills Required */}
              <Card className="border-slate-200">
                <CardHeader>
                  <CardTitle className="font-heading text-primary-navy">Skills Required</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {project.skills.map((skill, index) => (
                      <Badge key={index} variant="outline" className="font-subheading border-slate-300">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="border-slate-200">
                <CardHeader>
                  <CardTitle className="font-heading text-primary-navy">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full border-primary-navy text-primary-navy hover:bg-primary-navy hover:text-white font-subheading">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Message All Applicants
                  </Button>
                  <Button variant="outline" className="w-full border-slate-300 text-slate-700 hover:bg-slate-50 font-subheading">
                    <Download className="h-4 w-4 mr-2" />
                    Export Proposals
                  </Button>
                  <Button variant="outline" className="w-full border-slate-300 text-slate-700 hover:bg-slate-50 font-subheading">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Share Project
                  </Button>
                </CardContent>
              </Card>

              {/* Project Timeline */}
              <Card className="border-slate-200">
                <CardHeader>
                  <CardTitle className="font-heading text-primary-navy">Project Timeline</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 font-subheading">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600">Posted</span>
                      <span className="font-heading text-slate-900">{project.posted}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600">Duration</span>
                      <span className="font-heading text-slate-900">{project.duration}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600">Start Date</span>
                      <span className="font-heading text-slate-900">{project.timeline}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600">Budget Range</span>
                      <span className="font-heading text-green-600">{project.budget}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="applicants" className="space-y-6">
          <div className="space-y-4">
            {project.applicants.map((applicant) => (
              <Card key={applicant.id} className="border-slate-200 hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex space-x-4 flex-1">
                      <Avatar className="w-16 h-16">
                        <AvatarImage src={applicant.profileImage} />
                        <AvatarFallback className="bg-primary-navy text-white font-heading">
                          {applicant.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-xl font-heading text-primary-navy">{applicant.name}</h3>
                          <div className="flex items-center space-x-2">
                            <Badge className={`${getStatusColor(applicant.status)} font-subheading px-3 py-1`}>
                              {applicant.status}
                            </Badge>
                          </div>
                        </div>
                        
                        <p className="font-subheading text-slate-600 mb-2">{applicant.title}</p>
                        
                        <div className="flex items-center space-x-4 text-sm font-subheading text-slate-500 mb-3">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-500 mr-1" />
                            <span className="font-heading">{applicant.rating}</span>
                            <span className="ml-1">({applicant.reviews} reviews)</span>
                          </div>
                          <span>•</span>
                          <span>{applicant.completedProjects} projects</span>
                          <span>•</span>
                          <span>{applicant.successRate} success</span>
                          <span>•</span>
                          <span className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            {applicant.location}
                          </span>
                        </div>
                        
                        <div className="flex items-center space-x-6 mb-4">
                          <div>
                            <span className="text-sm font-subheading text-slate-500">Proposal Amount</span>
                            <p className="text-lg font-heading text-green-600">{applicant.proposalAmount}</p>
                          </div>
                          <div>
                            <span className="text-sm font-subheading text-slate-500">Hourly Rate</span>
                            <p className="text-lg font-heading text-slate-900">{applicant.hourlyRate}</p>
                          </div>
                          <div>
                            <span className="text-sm font-subheading text-slate-500">Response Time</span>
                            <p className="text-lg font-heading text-slate-900">{applicant.responseTime}</p>
                          </div>
                        </div>

                        <div className="mb-4">
                          <h4 className="font-heading text-slate-900 mb-2">Skills</h4>
                          <div className="flex flex-wrap gap-2">
                            {applicant.skills.slice(0, 4).map((skill, index) => (
                              <Badge key={index} variant="outline" className="font-subheading text-xs border-slate-300">
                                {skill}
                              </Badge>
                            ))}
                            {applicant.skills.length > 4 && (
                              <Badge variant="outline" className="font-subheading text-xs border-slate-300">
                                +{applicant.skills.length - 4} more
                              </Badge>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex space-x-3">
                          <Button 
                            className="bg-green-600 hover:bg-green-700 text-white rounded-lg font-subheading"
                            onClick={() => handleAction(applicant.id, 'hire')}
                          >
                            <UserCheck className="h-4 w-4 mr-2" />
                            Hire
                          </Button>
                          <Button 
                            variant="outline" 
                            className="border-red-300 text-red-600 hover:bg-red-50 rounded-lg font-subheading"
                            onClick={() => handleAction(applicant.id, 'reject')}
                          >
                            <UserX className="h-4 w-4 mr-2" />
                            Reject
                          </Button>
                          <Button 
                            variant="outline" 
                            className="border-blue-300 text-blue-600 hover:bg-blue-50 rounded-lg font-subheading"
                            onClick={() => handleAction(applicant.id, 'message')}
                          >
                            <MessageCircle className="h-4 w-4 mr-2" />
                            Message
                          </Button>
                          <Button 
                            variant="outline" 
                            className="border-slate-300 text-slate-700 hover:bg-slate-50 rounded-lg font-subheading"
                            onClick={() => openApplicantDetails(applicant)}
                          >
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle className="font-heading text-primary-navy">Proposal Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-subheading text-slate-600">Total Proposals</span>
                    <span className="font-heading text-2xl text-slate-900">{project.proposals}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-subheading text-slate-600">Average Proposal</span>
                    <span className="font-heading text-2xl text-green-600">$9,540</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-subheading text-slate-600">Proposal Range</span>
                    <span className="font-heading text-lg text-slate-900">$8,800 - $11,000</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle className="font-heading text-primary-navy">Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-subheading text-slate-600">Views</span>
                    <span className="font-heading text-2xl text-slate-900">{project.views}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-subheading text-slate-600">Proposal Rate</span>
                    <span className="font-heading text-2xl text-blue-600">{((project.proposals / project.views) * 100).toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-subheading text-slate-600">Response Time</span>
                    <span className="font-heading text-lg text-slate-900">1.8 hours avg</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Applicant Details Modal */}
      {showApplicantDetails && selectedApplicant && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-heading text-primary-navy">Applicant Details</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowApplicantDetails(false)}
                  className="rounded-xl"
                >
                  <XCircle className="h-6 w-6" />
                </Button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Profile Info */}
                <div className="lg:col-span-1 space-y-6">
                  <div className="text-center">
                    <Avatar className="w-24 h-24 mx-auto mb-4">
                      <AvatarImage src={selectedApplicant.profileImage} />
                      <AvatarFallback className="bg-primary-navy text-white font-heading text-2xl">
                        {selectedApplicant.name.split(' ').map((n: string) => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="text-2xl font-heading text-primary-navy">{selectedApplicant.name}</h3>
                    <p className="font-subheading text-slate-600 mb-2">{selectedApplicant.title}</p>
                    <div className="flex items-center justify-center mb-4">
                      <Star className="h-5 w-5 text-yellow-500 mr-1" />
                      <span className="font-heading text-lg">{selectedApplicant.rating}</span>
                      <span className="font-subheading text-slate-500 ml-1">({selectedApplicant.reviews} reviews)</span>
                    </div>
                  </div>

                  <Card className="border-slate-200">
                    <CardHeader>
                      <CardTitle className="font-heading text-primary-navy text-lg">Contact Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 text-slate-500 mr-3" />
                        <span className="font-subheading text-slate-700">{selectedApplicant.email}</span>
                      </div>
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 text-slate-500 mr-3" />
                        <span className="font-subheading text-slate-700">{selectedApplicant.phone}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 text-slate-500 mr-3" />
                        <span className="font-subheading text-slate-700">{selectedApplicant.location}</span>
                      </div>
                      <div className="flex items-center">
                        <Globe className="h-4 w-4 text-slate-500 mr-3" />
                        <span className="font-subheading text-slate-700">{selectedApplicant.availability}</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-slate-200">
                    <CardHeader>
                      <CardTitle className="font-heading text-primary-navy text-lg">Quick Stats</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between">
                        <span className="font-subheading text-slate-600">Completed Projects</span>
                        <span className="font-heading text-slate-900">{selectedApplicant.completedProjects}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-subheading text-slate-600">Success Rate</span>
                        <span className="font-heading text-green-600">{selectedApplicant.successRate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-subheading text-slate-600">Response Time</span>
                        <span className="font-heading text-slate-900">{selectedApplicant.responseTime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-subheading text-slate-600">Hourly Rate</span>
                        <span className="font-heading text-slate-900">{selectedApplicant.hourlyRate}</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Right Column - Detailed Info */}
                <div className="lg:col-span-2 space-y-6">
                  <Card className="border-slate-200">
                    <CardHeader>
                      <CardTitle className="font-heading text-primary-navy">Cover Letter</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="font-subheading text-slate-700 leading-relaxed">{selectedApplicant.coverLetter}</p>
                    </CardContent>
                  </Card>

                  <Card className="border-slate-200">
                    <CardHeader>
                      <CardTitle className="font-heading text-primary-navy">Skills & Expertise</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {selectedApplicant.skills.map((skill: string, index: number) => (
                          <Badge key={index} variant="outline" className="font-subheading border-slate-300">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-slate-200">
                    <CardHeader>
                      <CardTitle className="font-heading text-primary-navy">Portfolio</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {selectedApplicant.portfolio.map((item: any, index: number) => (
                          <div key={index} className="flex items-center justify-between p-3 border border-slate-200 rounded-lg">
                            <div>
                              <h4 className="font-heading text-slate-900">{item.title}</h4>
                              <p className="font-subheading text-slate-600 text-sm">{item.description}</p>
                            </div>
                            <Button variant="outline" size="sm" className="font-subheading">
                              <ExternalLink className="h-4 w-4 mr-2" />
                              View
                            </Button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="border-slate-200">
                      <CardHeader>
                        <CardTitle className="font-heading text-primary-navy">Education</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="font-subheading text-slate-700">{selectedApplicant.education}</p>
                      </CardContent>
                    </Card>

                    <Card className="border-slate-200">
                      <CardHeader>
                        <CardTitle className="font-heading text-primary-navy">Experience</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="font-subheading text-slate-700">{selectedApplicant.experience}</p>
                      </CardContent>
                    </Card>
                  </div>

                  <Card className="border-slate-200">
                    <CardHeader>
                      <CardTitle className="font-heading text-primary-navy">Languages</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {selectedApplicant.languages.map((language: string, index: number) => (
                          <Badge key={index} variant="outline" className="font-subheading border-slate-300">
                            {language}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-slate-200">
                    <CardHeader>
                      <CardTitle className="font-heading text-primary-navy">Certifications</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {selectedApplicant.certifications.map((cert: string, index: number) => (
                          <div key={index} className="flex items-center">
                            <Award className="h-4 w-4 text-blue-600 mr-2" />
                            <span className="font-subheading text-slate-700">{cert}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-center space-x-4 mt-8 pt-6 border-t border-slate-200">
                <Button 
                  className="bg-green-600 hover:bg-green-700 text-white rounded-lg font-subheading px-8 py-3"
                  onClick={() => {
                    handleAction(selectedApplicant.id, 'hire')
                    setShowApplicantDetails(false)
                  }}
                >
                  <UserCheck className="h-4 w-4 mr-2" />
                  Hire {selectedApplicant.name}
                </Button>
                <Button 
                  variant="outline" 
                  className="border-blue-300 text-blue-600 hover:bg-blue-50 rounded-lg font-subheading px-8 py-3"
                  onClick={() => {
                    handleAction(selectedApplicant.id, 'message')
                    setShowApplicantDetails(false)
                  }}
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
                <Button 
                  variant="outline" 
                  className="border-red-300 text-red-600 hover:bg-red-50 rounded-lg font-subheading px-8 py-3"
                  onClick={() => {
                    handleAction(selectedApplicant.id, 'reject')
                    setShowApplicantDetails(false)
                  }}
                >
                  <UserX className="h-4 w-4 mr-2" />
                  Reject Application
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 