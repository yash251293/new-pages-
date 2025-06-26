"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { BookmarkIcon, ArrowLeft, X, Send, MessageCircle, Building2, MapPin, Calendar, DollarSign, Clock, Users, Star, Award, CheckCircle, Target, Upload, UserCheck, Briefcase } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ExplorePage() {
  const [selectedJob, setSelectedJob] = useState<any>(null)
  const [selectedProject, setSelectedProject] = useState<any>(null)
  const [selectedCompany, setSelectedCompany] = useState<any>(null)
  const [showApplicationModal, setShowApplicationModal] = useState(false)
  const [showProjectApplicationModal, setShowProjectApplicationModal] = useState(false)
  const [showJobsModal, setShowJobsModal] = useState(false)
  const [followedCompanies, setFollowedCompanies] = useState<number[]>([])
  const [applicationData, setApplicationData] = useState({
    coverLetter: "",
    expectedSalary: "",
    startDate: "",
    resume: null,
    portfolio: null
  })
  const [projectApplicationData, setProjectApplicationData] = useState({
    proposal: "",
    estimatedBudget: "",
    timeline: "",
    portfolio: null,
    experience: ""
  })

  const jobs = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      company: "Atreyus Ai",
      industry: "Information Technology",
      logo: "/abstract-tech-logo.png",
      type: "Full-time",
      location: "Remote",
      salaryRange: "$120,000 - $150,000",
      posted: "3 days ago",
      description: "We're looking for an experienced Frontend Developer to join our AI-driven platform team. You'll be responsible for building beautiful, responsive user interfaces that make complex AI tools accessible to everyone.",
      requirements: ["5+ years React experience", "TypeScript proficiency", "Experience with modern build tools", "Strong UI/UX design sense"],
      responsibilities: ["Build responsive web applications", "Collaborate with AI/ML teams", "Optimize for performance", "Code reviews and mentoring"],
      companyInfo: {
        size: "50-200 employees",
        founded: 2019,
        website: "atreyus.ai",
        description: "Atreyus AI is building the future of artificial intelligence platforms for businesses."
      },
      benefits: ["Health Insurance", "Stock Options", "Remote Work", "Flexible Hours", "Learning Budget"]
    },
    {
      id: 2,
      title: "Python AI Engineer",
      company: "Flexbone",
      industry: "Healthcare",
      logo: "/flexbone-logo.png",
      type: "Contract",
      location: "Hybrid",
      salaryRange: "$90,000 - $110,000",
      posted: "1 week ago",
      description: "Join our healthcare innovation team to develop AI-powered solutions that improve patient outcomes. We're building the next generation of medical diagnostic tools.",
      requirements: ["3+ years Python experience", "Machine Learning expertise", "Healthcare domain knowledge preferred", "Experience with TensorFlow/PyTorch"],
      responsibilities: ["Develop ML models for medical diagnosis", "Work with healthcare professionals", "Ensure regulatory compliance", "Data analysis and visualization"],
      companyInfo: {
        size: "200-500 employees",
        founded: 2015,
        website: "flexbone.com",
        description: "Flexbone is revolutionizing healthcare through innovative technology solutions."
      },
      benefits: ["Health Insurance", "Dental & Vision", "401(k)", "Professional Development", "Health Savings Account"]
    },
    {
      id: 3,
      title: "Full Stack Developer",
      company: "Source",
      industry: "Engineering & Construction",
      logo: "/generic-company-logo.png",
      type: "Full-time",
      location: "On-site",
      salaryRange: "$85,000 - $105,000",
      posted: "2 weeks ago",
      description: "We're seeking a Full Stack Developer to help build project management tools for the construction industry. You'll work on both frontend and backend systems.",
      requirements: ["4+ years full-stack experience", "Node.js and React", "Database design experience", "API development"],
      responsibilities: ["Full-stack web development", "Database architecture", "API design and implementation", "Code quality and testing"],
      companyInfo: {
        size: "100-300 employees",
        founded: 2010,
        website: "source-eng.com",
        description: "Source provides innovative software solutions for the engineering and construction industry."
      },
      benefits: ["Health Insurance", "401(k) Matching", "Paid Time Off", "Professional Development", "Company Events"]
    }
  ]

  const freelanceProjects = [
    {
      id: 1,
      title: "E-commerce Website Redesign",
      company: "Ra Labs",
      industry: "Internet & Software",
      logo: "/placeholder.svg?height=40&width=40",
      budget: "$3,000-5,000",
      duration: "4 weeks",
      posted: "2 days ago",
      description: "We need a complete redesign of our e-commerce platform. The project involves modernizing the UI/UX, improving conversion rates, and implementing responsive design across all devices.",
      requirements: ["React/Next.js experience", "E-commerce platform knowledge", "UI/UX design skills", "Responsive design expertise"],
      deliverables: ["Complete website redesign", "Mobile-responsive layouts", "Shopping cart optimization", "Payment gateway integration"],
      companyInfo: {
        size: "10-50 employees",
        founded: 2018,
        website: "ralabs.com",
        description: "Ra Labs creates innovative software solutions for modern businesses."
      },
      skills: ["React", "Next.js", "Figma", "Shopify", "CSS/Sass"]
    },
    {
      id: 2,
      title: "React Dashboard Development",
      company: "Instalify, Inc.",
      industry: "Internet & Software",
      logo: "/placeholder.svg?height=40&width=40",
      budget: "$50/hr",
      duration: "2-3 months",
      posted: "5 days ago",
      description: "Build a comprehensive admin dashboard for our SaaS platform. The dashboard will include analytics, user management, reporting features, and real-time data visualization.",
      requirements: ["Advanced React skills", "Data visualization experience", "API integration", "Real-time features"],
      deliverables: ["Admin dashboard interface", "Data visualization components", "User management system", "Real-time notifications"],
      companyInfo: {
        size: "20-100 employees",
        founded: 2020,
        website: "instalify.com",
        description: "Instalify provides installation and maintenance software for service companies."
      },
      skills: ["React", "D3.js", "Chart.js", "WebSockets", "Material-UI"]
    },
    {
      id: 3,
      title: "Financial App UI/UX Design",
      company: "Dynex Capital",
      industry: "Investment / Portfolio Management",
      logo: "/placeholder.svg?height=40&width=40",
      budget: "$2,500-4,000",
      duration: "3 weeks",
      posted: "1 week ago",
      description: "Design a modern, intuitive interface for our financial portfolio management app. Focus on clean design, data visualization, and user experience for financial professionals.",
      requirements: ["Financial app design experience", "Figma/Sketch proficiency", "Data visualization design", "Mobile design"],
      deliverables: ["Complete UI/UX design", "Interactive prototypes", "Design system", "Mobile app designs"],
      companyInfo: {
        size: "50-200 employees",
        founded: 2012,
        website: "dynexcapital.com",
        description: "Dynex Capital provides innovative investment and portfolio management solutions."
      },
      skills: ["Figma", "Sketch", "Principle", "InVision", "Adobe Creative Suite"]
    }
  ]

  const companies = [
    {
      id: 1,
      name: "TechFlow Solutions",
      industry: "Web Development & Design",
      logo: "/placeholder.svg?height=60&width=60",
      size: "50-200 employees",
      location: "San Francisco, CA",
      founded: 2018,
      verified: true,
      companyType: "Startup",
      description: "Leading web development agency specializing in modern React applications and e-commerce solutions.",
      mission: "To empower businesses with cutting-edge web technologies that drive growth and innovation.",
      vision: "Becoming the go-to partner for companies seeking exceptional digital experiences.",
      values: ["Innovation", "Quality", "Collaboration", "Continuous Learning"],
      benefits: ["Flexible Work Hours", "Health Insurance", "Stock Options", "Professional Development", "Remote Work Options"],
      culture: "We foster a collaborative environment where creativity meets technical excellence. Our team values work-life balance and continuous learning.",
      recentNews: [
        "Launched AI-powered web analytics platform",
        "Expanded team by 40% in Q3 2024",
        "Partnership with major e-commerce brands"
      ],
      website: "techflowsolutions.com",
      email: "careers@techflowsolutions.com",
      phone: "+1 (555) 123-4567",
      jobOpenings: [
        {
          id: 101,
          title: "Senior React Developer",
          department: "Engineering",
          location: "San Francisco, CA / Remote",
          type: "Full-time",
          salary: "$120,000 - $150,000",
          experience: "5+ years",
          postedDate: "2024-01-15",
          description: "Lead development of next-generation React applications for enterprise clients."
        },
        {
          id: 102,
          title: "UI/UX Designer",
          department: "Design",
          location: "San Francisco, CA",
          type: "Full-time",
          salary: "$90,000 - $120,000",
          experience: "3+ years",
          postedDate: "2024-01-20",
          description: "Design beautiful and intuitive user interfaces for web applications."
        }
      ]
    },
    {
      id: 2,
      name: "WebCraft Studios",
      industry: "Digital Agency",
      logo: "/placeholder.svg?height=60&width=60",
      size: "20-50 employees",
      location: "Austin, TX",
      founded: 2020,
      verified: true,
      companyType: "Agency",
      description: "Creative digital agency focused on building exceptional web experiences for startups and established brands.",
      mission: "Crafting digital experiences that tell your brand's story and drive meaningful connections.",
      vision: "To be recognized as the most innovative digital agency in the creative industry.",
      values: ["Creativity", "Authenticity", "Excellence", "Partnership"],
      benefits: ["Creative Freedom", "Health & Dental", "Flexible PTO", "Team Retreats", "Learning Stipend"],
      culture: "A creative playground where designers and developers collaborate to push the boundaries of what's possible on the web.",
      recentNews: [
        "Won 3 Webby Awards for client projects",
        "Opened new office in Denver",
        "Featured in Design Week Magazine"
      ],
      website: "webcraftstudios.com",
      email: "hello@webcraftstudios.com",
      phone: "+1 (555) 234-5678",
      jobOpenings: [
        {
          id: 201,
          title: "Full Stack Developer",
          department: "Development",
          location: "Austin, TX / Remote",
          type: "Full-time",
          salary: "$95,000 - $125,000",
          experience: "4+ years",
          postedDate: "2024-01-18",
          description: "Build end-to-end web solutions using modern JavaScript frameworks."
        }
      ]
    },
    {
      id: 3,
      name: "DevForge Technologies",
      industry: "Software Development",
      logo: "/placeholder.svg?height=60&width=60",
      size: "100-500 employees",
      location: "Seattle, WA",
      founded: 2015,
      verified: true,
      companyType: "Tech Company",
      description: "Enterprise software development company specializing in scalable web applications and cloud solutions.",
      mission: "Forging the future of enterprise software through innovative development practices and cutting-edge technology.",
      vision: "To be the leading provider of enterprise web solutions that transform how businesses operate.",
      values: ["Innovation", "Reliability", "Scalability", "Team Excellence"],
      benefits: ["Comprehensive Health Coverage", "401(k) Matching", "Sabbatical Program", "Professional Certifications", "Gym Membership"],
      culture: "We believe in empowering our developers with the latest tools and technologies while maintaining a supportive team environment.",
      recentNews: [
        "Completed Series B funding round",
        "Launched new cloud platform",
        "Acquired two smaller tech companies"
      ],
      website: "devforge.tech",
      email: "careers@devforge.tech",
      phone: "+1 (555) 345-6789",
      jobOpenings: [
        {
          id: 301,
          title: "Backend Developer",
          department: "Engineering",
          location: "Seattle, WA",
          type: "Full-time",
          salary: "$110,000 - $140,000",
          experience: "3+ years",
          postedDate: "2024-01-22",
          description: "Develop robust backend systems for enterprise-level applications."
        },
        {
          id: 302,
          title: "DevOps Engineer",
          department: "Infrastructure",
          location: "Seattle, WA / Remote",
          type: "Full-time",
          salary: "$125,000 - $155,000",
          experience: "5+ years",
          postedDate: "2024-01-25",
          description: "Manage cloud infrastructure and deployment pipelines."
        }
      ]
    }
  ]

  const handleJobClick = (job: any) => {
    setSelectedJob(job)
  }

  const handleProjectClick = (project: any) => {
    setSelectedProject(project)
  }

  const handleApplyClick = () => {
    setShowApplicationModal(true)
  }

  const handleProjectApplyClick = () => {
    setShowProjectApplicationModal(true)
  }

  const handleSubmitApplication = () => {
    console.log("Job application submitted:", { job: selectedJob?.title, ...applicationData })
    setShowApplicationModal(false)
    setApplicationData({ coverLetter: "", expectedSalary: "", startDate: "", resume: null, portfolio: null })
  }

  const handleSubmitProjectApplication = () => {
    console.log("Project application submitted:", { project: selectedProject?.title, ...projectApplicationData })
    setShowProjectApplicationModal(false)
    setProjectApplicationData({ proposal: "", estimatedBudget: "", timeline: "", portfolio: null, experience: "" })
  }

  const handleCompanyClick = (company: any) => {
    setSelectedCompany(company)
  }

  const handleViewJobsClick = () => {
    setShowJobsModal(true)
  }

  const handleFollowClick = (companyId: number) => {
    setFollowedCompanies(prev => 
      prev.includes(companyId) 
        ? prev.filter(id => id !== companyId)
        : [...prev, companyId]
    )
  }

  const isFollowed = (companyId: number) => {
    return followedCompanies.includes(companyId)
  }

  return (
    <>
      <div className="w-[65%] mx-auto">
      <h1 className="text-4xl font-heading text-primary-navy mb-6">Explore</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-blue-50 via-indigo-50 to-[#0056B3]/15 border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardContent className="p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary-navy/10 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
            <div className="relative z-10">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary-navy rounded-xl flex items-center justify-center mr-4">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-2xl font-heading text-primary-navy">Welcome to 100 Networks</h2>
              </div>
              <p className="text-slate-600 font-subheading mb-6 text-lg leading-relaxed">
                Connect with industry professionals, discover exciting opportunities, and accelerate your career growth in our thriving global community.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button size="sm" className="bg-primary-navy hover:bg-primary-navy/90 shadow-md font-subheading">
                  <UserCheck className="h-4 w-4 mr-2" />
                  Complete Profile
                </Button>
                <Button size="sm" variant="outline" className="border-primary-navy text-primary-navy hover:bg-primary-navy hover:text-white font-subheading" asChild>
                  <Link href="/jobs">
                    <Briefcase className="h-4 w-4 mr-2" />
                    Explore Jobs
                  </Link>
                </Button>
                <Button size="sm" variant="outline" className="border-primary-navy text-primary-navy hover:bg-primary-navy hover:text-white whitespace-nowrap font-subheading" asChild>
                  <Link href="/jobs/freelance">
                    <Target className="h-4 w-4 mr-2" />
                    Freelance Work
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardContent className="p-8 relative overflow-hidden">
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-green-500/10 to-transparent rounded-full translate-y-12 -translate-x-12"></div>
            <div className="relative z-10">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mr-4">
                  <Star className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-2xl font-heading text-slate-800">Get Discovered</h2>
              </div>
              <p className="text-slate-600 font-subheading mb-6 text-lg leading-relaxed">
                Showcase your expertise and preferences to attract the perfect opportunities. Let top companies and clients find you.
              </p>
              <div className="space-y-3">
                <Button variant="outline" className="w-full border-green-500 text-green-600 hover:bg-green-500 hover:text-white font-subheading shadow-sm" asChild>
                  <Link href="/career-interests">
                    <Award className="h-4 w-4 mr-2" />
                    Update Career Interests
                  </Link>
                </Button>
                <div className="flex items-center text-sm text-slate-500 font-subheading">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                  <span>Complete your profile to increase visibility by 3x</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="recommended" className="mb-8">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="recommended" className="font-subheading data-[state=active]:bg-primary-navy data-[state=active]:text-white">Recommended</TabsTrigger>
          <TabsTrigger value="trending" className="font-subheading data-[state=active]:bg-primary-navy data-[state=active]:text-white">Trending</TabsTrigger>
          <TabsTrigger value="nearby" className="font-subheading data-[state=active]:bg-primary-navy data-[state=active]:text-white">Nearby</TabsTrigger>
        </TabsList>

        <TabsContent value="recommended">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-heading text-primary-navy">
                Opportunities for <span className="text-[#0056B3]">software developers</span>
              </h2>
              <Link href="/jobs" className="text-base text-[#0056B3] hover:underline font-subheading">
                View more
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {jobs.map((job) => (
                <Card 
                  key={job.id} 
                  className="cursor-pointer hover:shadow-md transition-shadow border border-gray-200"
                  onClick={() => handleJobClick(job)}
                >
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex items-start space-x-3">
                        <img src={job.logo} alt={job.company} className="h-12 w-12 rounded" />
                        <div>
                          <p className="font-subheading font-medium text-base">{job.company}</p>
                          <p className="text-sm text-muted-foreground">{job.industry}</p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-10 w-10 hover:bg-primary-navy/10"
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          // Handle bookmark logic
                        }}
                      >
                        <BookmarkIcon className="h-5 w-5" />
                      </Button>
                    </div>
                    <h3 className="font-heading text-primary-navy mb-2 text-lg">{job.title}</h3>
                    <p className="text-base text-muted-foreground mb-3 font-subheading">{job.type} • {job.location}</p>
                    <p className="text-sm text-muted-foreground mb-4">{job.salaryRange} • Posted {job.posted}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-heading text-primary-navy">
                Freelance projects in <span className="text-[#0056B3]">web development</span>
              </h2>
              <Link href="/jobs/freelance" className="text-base text-[#0056B3] hover:underline font-subheading">
                View more
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {freelanceProjects.map((project) => (
                <Card 
                  key={project.id} 
                  className="border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => handleProjectClick(project)}
                >
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex items-start space-x-3">
                        <img src={project.logo} alt={project.company} className="h-12 w-12 rounded" />
                        <div>
                          <p className="font-subheading font-medium text-base">{project.company}</p>
                          <p className="text-sm text-muted-foreground">{project.industry}</p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-10 w-10 hover:bg-primary-navy/10"
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          // Handle bookmark logic
                        }}
                      >
                        <BookmarkIcon className="h-5 w-5" />
                      </Button>
                    </div>
                    <h3 className="font-heading text-primary-navy mb-2 text-lg">{project.title}</h3>
                    <p className="text-base text-muted-foreground mb-3 font-subheading">{project.budget} • {project.duration}</p>
                    <p className="text-sm text-muted-foreground mb-4">Posted {project.posted}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-heading text-primary-navy">
                Top companies for <span className="text-[#0056B3]">web development</span>
              </h2>
              <Link href="/employers" className="text-base text-[#0056B3] hover:underline font-subheading">
                View more
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {companies.map((company) => (
                <Card 
                  key={company.id} 
                  className="border border-gray-200 hover:shadow-lg transition-all duration-300 cursor-pointer group hover:border-primary-navy/30"
                  onClick={() => handleCompanyClick(company)}
                >
                  <CardContent className="p-0">
                    {/* Header with gradient background */}
                    <div className="bg-gradient-to-r from-primary-navy/5 to-blue-50 p-6 border-b border-gray-100">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-start space-x-4">
                          <div className="relative">
                            <img src={company.logo} alt={company.name} className="h-16 w-16 rounded-lg shadow-sm" />
                            {company.verified && (
                              <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center border-2 border-white">
                                <CheckCircle className="h-4 w-4 text-white" />
                              </div>
                            )}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-heading text-lg text-primary-navy mb-1 group-hover:text-blue-700 transition-colors">
                              {company.name}
                            </h3>
                            <p className="text-sm text-muted-foreground mb-2">{company.industry}</p>
                            <Badge variant="outline" className="text-xs font-subheading border-primary-navy/30 text-primary-navy">
                              {company.companyType}
                            </Badge>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 hover:bg-white/80 opacity-70 hover:opacity-100 transition-opacity"
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            // Handle bookmark logic
                          }}
                        >
                          <BookmarkIcon className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <p className="text-sm text-slate-600 font-subheading leading-relaxed line-clamp-2">
                        {company.description}
                      </p>
                    </div>

                    {/* Company details */}
                    <div className="p-6">
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4 text-primary-navy/60" />
                          <span className="font-subheading">{company.location}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <Users className="h-4 w-4 text-primary-navy/60" />
                          <span className="font-subheading">{company.size}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4 text-primary-navy/60" />
                          <span className="font-subheading">Founded {company.founded}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-green-600">
                          <Building2 className="h-4 w-4" />
                          <span className="font-subheading font-medium">{company.jobOpenings.length} open roles</span>
                        </div>
                      </div>

                      {/* Benefits preview */}
                      <div className="mb-4">
                        <p className="text-xs font-subheading text-slate-500 mb-2">Top Benefits:</p>
                        <div className="flex flex-wrap gap-1">
                          {company.benefits.slice(0, 3).map((benefit, index) => (
                            <Badge key={index} variant="secondary" className="text-xs font-subheading bg-slate-100 text-slate-600 hover:bg-slate-200">
                              {benefit}
                            </Badge>
                          ))}
                          {company.benefits.length > 3 && (
                            <Badge variant="secondary" className="text-xs font-subheading bg-slate-100 text-slate-600">
                              +{company.benefits.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 border-primary-navy text-primary-navy hover:bg-primary-navy hover:text-white font-subheading"
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            handleFollowClick(company.id)
                          }}
                        >
                          {isFollowed(company.id) ? 'Following' : 'Follow'}
                        </Button>
                        <Button
                          size="sm"
                          className="flex-1 bg-primary-navy hover:bg-primary-navy/90 text-white font-subheading"
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            handleViewJobsClick()
                          }}
                        >
                          View Jobs
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="trending">
          <div className="text-center py-12">
            <h3 className="text-lg font-heading text-primary-navy mb-2">Trending content coming soon</h3>
            <p className="text-muted-foreground font-subheading">We're gathering the most popular opportunities for you</p>
          </div>
        </TabsContent>

        <TabsContent value="nearby">
          <div className="text-center py-12">
            <h3 className="text-lg font-heading text-primary-navy mb-2">Enable location services</h3>
            <p className="text-muted-foreground font-subheading mb-4">Allow location access to see opportunities near you</p>
            <Button className="bg-primary-navy hover:bg-primary-navy/90">Enable Location</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>

    {/* Job Details Modal */}
    {selectedJob && !showApplicationModal && (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSelectedJob(null)}
                  className="border-primary-navy text-primary-navy hover:bg-primary-navy hover:text-white rounded-xl font-subheading"
                >
                  <X className="h-5 w-5" />
                </Button>
                <h1 className="text-2xl font-heading text-primary-navy">Job Details</h1>
              </div>
            </div>

            {/* Job Content */}
            <div className="space-y-6">
              {/* Basic Info */}
              <div className="flex items-start space-x-4">
                <img src={selectedJob.logo} alt={selectedJob.company} className="h-16 w-16 rounded-xl" />
                <div className="flex-1">
                  <h2 className="text-2xl font-heading text-primary-navy mb-1">{selectedJob.title}</h2>
                  <p className="text-lg text-slate-600 font-subheading mb-2">{selectedJob.company}</p>
                  <div className="grid grid-cols-2 gap-4 text-slate-600 font-subheading mb-4">
                    <div className="flex items-center space-x-2">
                      <Building2 className="h-4 w-4 text-slate-500" />
                      <span>{selectedJob.industry}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-slate-500" />
                      <span>{selectedJob.location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <DollarSign className="h-4 w-4 text-slate-500" />
                      <span>{selectedJob.salaryRange}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-slate-500" />
                      <span>{selectedJob.type}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-slate-500" />
                      <span>Posted {selectedJob.posted}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-slate-500" />
                      <span>{selectedJob.companyInfo.size}</span>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Description */}
              <div>
                <h3 className="text-lg font-heading text-primary-navy mb-3">Job Description</h3>
                <p className="text-slate-600 font-subheading leading-relaxed">{selectedJob.description}</p>
              </div>

              {/* Requirements */}
              <div>
                <h3 className="text-lg font-heading text-primary-navy mb-3">Requirements</h3>
                <div className="space-y-2">
                  {selectedJob.requirements.map((req: string, index: number) => (
                    <div key={index} className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                      <span className="text-slate-600 font-subheading">{req}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Responsibilities */}
              <div>
                <h3 className="text-lg font-heading text-primary-navy mb-3">Responsibilities</h3>
                <div className="space-y-2">
                  {selectedJob.responsibilities.map((resp: string, index: number) => (
                    <div key={index} className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-[#0056B3] rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-slate-600 font-subheading">{resp}</span>
                    </div>
                  ))}
                </div>
        </div>

              {/* Company Info */}
              <div>
                <h3 className="text-lg font-heading text-primary-navy mb-3">About {selectedJob.company}</h3>
                <p className="text-slate-600 font-subheading leading-relaxed mb-3">{selectedJob.companyInfo.description}</p>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-slate-500">Founded:</span>
                    <span className="ml-2 text-slate-700 font-subheading">{selectedJob.companyInfo.founded}</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Size:</span>
                    <span className="ml-2 text-slate-700 font-subheading">{selectedJob.companyInfo.size}</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Website:</span>
                    <span className="ml-2 text-slate-700 font-subheading">{selectedJob.companyInfo.website}</span>
                  </div>
                </div>
              </div>

              {/* Benefits */}
              <div>
                <h3 className="text-lg font-heading text-primary-navy mb-3">Benefits</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedJob.benefits.map((benefit: string, index: number) => (
                    <Badge key={index} className="bg-green-100 text-green-700 font-subheading">
                      <Award className="h-3 w-3 mr-1" />
                      {benefit}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Apply Button */}
              <div className="pt-4">
                <Button 
                  className="w-full bg-primary-navy hover:bg-slate-800 text-white rounded-xl font-subheading"
                  onClick={handleApplyClick}
                >
                  <Target className="h-4 w-4 mr-2" />
                  Apply for this Position
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )}

    {/* Freelance Project Details Modal */}
    {selectedProject && !showProjectApplicationModal && (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSelectedProject(null)}
                  className="rounded-xl"
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
                <h1 className="text-2xl font-heading text-primary-navy">Project Details</h1>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSelectedProject(null)}
                className="rounded-xl"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Project Content */}
            <div className="space-y-6">
              {/* Basic Info */}
              <div className="flex items-start space-x-4">
                <img src={selectedProject.logo} alt={selectedProject.company} className="h-16 w-16 rounded-xl" />
                <div className="flex-1">
                  <h2 className="text-2xl font-heading text-primary-navy mb-1">{selectedProject.title}</h2>
                  <p className="text-lg text-slate-600 font-subheading mb-2">{selectedProject.company}</p>
                  <div className="grid grid-cols-2 gap-4 text-slate-600 font-subheading mb-4">
                    <div className="flex items-center space-x-2">
                      <Building2 className="h-4 w-4 text-slate-500" />
                      <span>{selectedProject.industry}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <DollarSign className="h-4 w-4 text-slate-500" />
                      <span>{selectedProject.budget}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-slate-500" />
                      <span>{selectedProject.duration}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-slate-500" />
                      <span>Posted {selectedProject.posted}</span>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Description */}
              <div>
                <h3 className="text-lg font-heading text-primary-navy mb-3">Project Description</h3>
                <p className="text-slate-600 font-subheading leading-relaxed">{selectedProject.description}</p>
              </div>

              {/* Requirements */}
              <div>
                <h3 className="text-lg font-heading text-primary-navy mb-3">Requirements</h3>
                <div className="space-y-2">
                  {selectedProject.requirements.map((req: string, index: number) => (
                    <div key={index} className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                      <span className="text-slate-600 font-subheading">{req}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Deliverables */}
              <div>
                <h3 className="text-lg font-heading text-primary-navy mb-3">Deliverables</h3>
                <div className="space-y-2">
                  {selectedProject.deliverables.map((deliverable: string, index: number) => (
                    <div key={index} className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-[#0056B3] rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-slate-600 font-subheading">{deliverable}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Required Skills */}
              <div>
                <h3 className="text-lg font-heading text-primary-navy mb-3">Required Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.skills.map((skill: string, index: number) => (
                    <Badge key={index} className="bg-blue-100 text-blue-700 font-subheading">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Company Info */}
              <div>
                <h3 className="text-lg font-heading text-primary-navy mb-3">About {selectedProject.company}</h3>
                <p className="text-slate-600 font-subheading leading-relaxed mb-3">{selectedProject.companyInfo.description}</p>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-slate-500">Founded:</span>
                    <span className="ml-2 text-slate-700 font-subheading">{selectedProject.companyInfo.founded}</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Size:</span>
                    <span className="ml-2 text-slate-700 font-subheading">{selectedProject.companyInfo.size}</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Website:</span>
                    <span className="ml-2 text-slate-700 font-subheading">{selectedProject.companyInfo.website}</span>
                  </div>
                </div>
              </div>

              {/* Apply Button */}
              <div className="pt-4">
                <Button 
                  className="w-full bg-primary-navy hover:bg-slate-800 text-white rounded-xl font-subheading"
                  onClick={handleProjectApplyClick}
                >
                  <Send className="h-4 w-4 mr-2" />
                  Submit Proposal
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )}

    {/* Job Application Modal */}
    <Dialog open={showApplicationModal} onOpenChange={setShowApplicationModal}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-heading text-primary-navy">
            Apply for {selectedJob?.title}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 mt-4">
          {/* Job Info */}
          {selectedJob && (
            <Card className="border-slate-200 bg-slate-50">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <img src={selectedJob.logo} alt={selectedJob.company} className="h-12 w-12 rounded" />
                  <div>
                    <h4 className="font-heading text-primary-navy">{selectedJob.title}</h4>
                    <p className="text-slate-600 font-subheading text-sm">{selectedJob.company} • {selectedJob.location}</p>
                  </div>
                </div>
            </CardContent>
          </Card>
          )}

          {/* Cover Letter */}
          <div>
            <Label htmlFor="coverLetter" className="font-subheading text-primary-navy">Cover Letter</Label>
            <Textarea
              id="coverLetter"
              placeholder="Tell us why you're the perfect fit for this role..."
              value={applicationData.coverLetter}
              onChange={(e) => setApplicationData({...applicationData, coverLetter: e.target.value})}
              className="mt-2 min-h-[120px] rounded-xl font-subheading"
            />
          </div>

          {/* Expected Salary */}
          <div>
            <Label htmlFor="salary" className="font-subheading text-primary-navy">Expected Salary</Label>
            <Input
              id="salary"
              placeholder="e.g., $120,000"
              value={applicationData.expectedSalary}
              onChange={(e) => setApplicationData({...applicationData, expectedSalary: e.target.value})}
              className="mt-2 rounded-xl font-subheading"
            />
          </div>

          {/* Start Date */}
          <div>
            <Label htmlFor="startDate" className="font-subheading text-primary-navy">Available Start Date</Label>
            <Input
              id="startDate"
              type="date"
              value={applicationData.startDate}
              onChange={(e) => setApplicationData({...applicationData, startDate: e.target.value})}
              className="mt-2 rounded-xl font-subheading"
            />
          </div>

          {/* Resume Upload */}
          <div>
            <Label className="font-subheading text-primary-navy">Resume</Label>
            <div className="mt-2 border-2 border-dashed border-slate-200 rounded-xl p-6 text-center">
              <Upload className="h-8 w-8 text-slate-400 mx-auto mb-2" />
              <p className="text-slate-600 font-subheading">Click to upload your resume</p>
              <p className="text-slate-400 font-subheading text-sm">PDF, DOC, or DOCX (max 5MB)</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4 pt-4">
            <Button 
              variant="outline" 
              className="flex-1 rounded-xl font-subheading"
              onClick={() => setShowApplicationModal(false)}
            >
              Cancel
            </Button>
            <Button 
              className="flex-1 bg-primary-navy hover:bg-slate-800 text-white rounded-xl font-subheading"
              onClick={handleSubmitApplication}
            >
              <Send className="h-4 w-4 mr-2" />
              Submit Application
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>

    {/* Project Application Modal */}
    <Dialog open={showProjectApplicationModal} onOpenChange={setShowProjectApplicationModal}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-heading text-primary-navy">
            Submit Proposal for {selectedProject?.title}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 mt-4">
          {/* Project Info */}
          {selectedProject && (
            <Card className="border-slate-200 bg-slate-50">
            <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <img src={selectedProject.logo} alt={selectedProject.company} className="h-12 w-12 rounded" />
                  <div>
                    <h4 className="font-heading text-primary-navy">{selectedProject.title}</h4>
                    <p className="text-slate-600 font-subheading text-sm">{selectedProject.company} • {selectedProject.budget}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Proposal */}
          <div>
            <Label htmlFor="proposal" className="font-subheading text-primary-navy">Project Proposal</Label>
            <Textarea
              id="proposal"
              placeholder="Describe your approach to this project..."
              value={projectApplicationData.proposal}
              onChange={(e) => setProjectApplicationData({...projectApplicationData, proposal: e.target.value})}
              className="mt-2 min-h-[120px] rounded-xl font-subheading"
            />
          </div>

          {/* Budget */}
          <div>
            <Label htmlFor="budget" className="font-subheading text-primary-navy">Your Budget Estimate</Label>
            <Input
              id="budget"
              placeholder="e.g., $4,500"
              value={projectApplicationData.estimatedBudget}
              onChange={(e) => setProjectApplicationData({...projectApplicationData, estimatedBudget: e.target.value})}
              className="mt-2 rounded-xl font-subheading"
            />
          </div>

          {/* Timeline */}
          <div>
            <Label htmlFor="timeline" className="font-subheading text-primary-navy">Estimated Timeline</Label>
            <Input
              id="timeline"
              placeholder="e.g., 3-4 weeks"
              value={projectApplicationData.timeline}
              onChange={(e) => setProjectApplicationData({...projectApplicationData, timeline: e.target.value})}
              className="mt-2 rounded-xl font-subheading"
            />
          </div>

          {/* Portfolio Upload */}
          <div>
            <Label className="font-subheading text-primary-navy">Portfolio/Previous Work</Label>
            <div className="mt-2 border-2 border-dashed border-slate-200 rounded-xl p-6 text-center">
              <Upload className="h-8 w-8 text-slate-400 mx-auto mb-2" />
              <p className="text-slate-600 font-subheading">Upload portfolio or work samples</p>
              <p className="text-slate-400 font-subheading text-sm">PDF, Images, or ZIP (max 10MB)</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4 pt-4">
            <Button 
              variant="outline" 
              className="flex-1 rounded-xl font-subheading"
              onClick={() => setShowProjectApplicationModal(false)}
            >
              Cancel
            </Button>
            <Button 
              className="flex-1 bg-primary-navy hover:bg-slate-800 text-white rounded-xl font-subheading"
              onClick={handleSubmitProjectApplication}
            >
              <Send className="h-4 w-4 mr-2" />
              Submit Proposal
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>

    {/* Company Details Modal */}
    {selectedCompany && !showJobsModal && (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSelectedCompany(null)}
                  className="rounded-xl"
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
                <h1 className="text-2xl font-heading text-primary-navy">Company Profile</h1>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSelectedCompany(null)}
                className="rounded-xl"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Company Content */}
            <div className="space-y-6">
              {/* Basic Info */}
              <div className="flex items-start space-x-4">
                <img src={selectedCompany.logo} alt={selectedCompany.name} className="h-20 w-20 rounded-xl" />
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h2 className="text-2xl font-heading text-primary-navy">{selectedCompany.name}</h2>
                    {selectedCompany.verified && (
                      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                        <CheckCircle className="h-4 w-4 text-white" />
                      </div>
                    )}
                    <Badge 
                      className={`${
                        selectedCompany.companyType === 'Startup' ? 'bg-green-100 text-green-700' :
                        selectedCompany.companyType === 'Agency' ? 'bg-purple-100 text-purple-700' :
                        'bg-blue-100 text-blue-700'
                      } font-subheading`}
                    >
                      {selectedCompany.companyType}
                    </Badge>
                  </div>
                  <p className="text-lg text-slate-600 font-subheading mb-3">{selectedCompany.industry}</p>
                  <div className="grid grid-cols-2 gap-4 text-slate-600 font-subheading">
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-slate-500" />
                      <span>{selectedCompany.location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-slate-500" />
                      <span>{selectedCompany.size}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-slate-500" />
                      <span>Founded {selectedCompany.founded}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Building2 className="h-4 w-4 text-slate-500" />
                      <span>{selectedCompany.jobOpenings.length} open positions</span>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              {/* About */}
              <div>
                <h3 className="text-lg font-heading text-primary-navy mb-3">About {selectedCompany.name}</h3>
                <p className="text-slate-600 font-subheading leading-relaxed">{selectedCompany.description}</p>
              </div>

              {/* Mission & Vision */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-heading text-primary-navy mb-2">Mission</h4>
                  <p className="text-slate-600 font-subheading">{selectedCompany.mission}</p>
                </div>
                <div>
                  <h4 className="font-heading text-primary-navy mb-2">Vision</h4>
                  <p className="text-slate-600 font-subheading">{selectedCompany.vision}</p>
                </div>
              </div>

              {/* Values */}
              <div>
                <h3 className="text-lg font-heading text-primary-navy mb-3">Our Values</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedCompany.values.map((value: string, index: number) => (
                    <Badge key={index} className="bg-blue-100 text-blue-700 font-subheading">
                      <Star className="h-3 w-3 mr-1" />
                      {value}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Benefits */}
              <div>
                <h3 className="text-lg font-heading text-primary-navy mb-3">Benefits & Perks</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedCompany.benefits.map((benefit: string, index: number) => (
                    <Badge key={index} className="bg-green-100 text-green-700 font-subheading">
                      <Award className="h-3 w-3 mr-1" />
                      {benefit}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Culture */}
              <div>
                <h3 className="text-lg font-heading text-primary-navy mb-3">Company Culture</h3>
                <p className="text-slate-600 font-subheading leading-relaxed">{selectedCompany.culture}</p>
              </div>

              {/* Recent News */}
              <div>
                <h3 className="text-lg font-heading text-primary-navy mb-3">Recent News</h3>
                <div className="space-y-2">
                  {selectedCompany.recentNews.map((news: string, index: number) => (
                    <div key={index} className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-[#0056B3] rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-slate-600 font-subheading">{news}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Info */}
              <div>
                <h3 className="text-lg font-heading text-primary-navy mb-3">Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-slate-500">Website:</span>
                    <span className="ml-2 text-slate-700 font-subheading">{selectedCompany.website}</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Email:</span>
                    <span className="ml-2 text-slate-700 font-subheading">{selectedCompany.email}</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Phone:</span>
                    <span className="ml-2 text-slate-700 font-subheading">{selectedCompany.phone}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4 pt-4">
                <Button 
                  className="flex-1 bg-primary-navy hover:bg-slate-800 text-white rounded-xl font-subheading"
                  onClick={handleViewJobsClick}
                >
                  <Building2 className="h-4 w-4 mr-2" />
                  View Open Positions ({selectedCompany.jobOpenings.length})
                </Button>
                <Button 
                  variant="outline" 
                  className={`rounded-xl font-subheading ${
                    isFollowed(selectedCompany.id) 
                      ? 'bg-[#0056B3] text-white border-[#0056B3] hover:bg-primary-navy' 
                      : 'border-[#0056B3] text-[#0056B3] hover:bg-primary-navy hover:text-white'
                  }`}
                  onClick={() => handleFollowClick(selectedCompany.id)}
                >
                  {isFollowed(selectedCompany.id) ? (
                    <>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Following
                    </>
                  ) : (
                    <>
                      <Users className="h-4 w-4 mr-2" />
                      Follow
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )}

    {/* Jobs Modal */}
    <Dialog open={showJobsModal} onOpenChange={setShowJobsModal}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-heading text-primary-navy">
            Open Positions at {selectedCompany?.name}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 mt-4">
          {/* Company Info Header */}
          {selectedCompany && (
            <Card className="border-slate-200 bg-slate-50">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <img src={selectedCompany.logo} alt={selectedCompany.name} className="h-12 w-12 rounded" />
                  <div>
                    <h4 className="font-heading text-primary-navy">{selectedCompany.name}</h4>
                    <p className="text-slate-600 font-subheading text-sm">{selectedCompany.industry} • {selectedCompany.location}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Job Listings */}
          <div className="space-y-4">
            {selectedCompany?.jobOpenings.map((job: any) => (
              <Card key={job.id} className="border-slate-200 hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-heading text-primary-navy mb-2">{job.title}</h3>
                      <p className="text-slate-600 font-subheading mb-3">{job.description}</p>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm text-slate-600 font-subheading mb-4">
                        <div className="flex items-center space-x-2">
                          <Building2 className="h-4 w-4 text-slate-500" />
                          <span>{job.department}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4 text-slate-500" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <DollarSign className="h-4 w-4 text-slate-500" />
                          <span>{job.salary}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-slate-500" />
                          <span>{job.type}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Star className="h-4 w-4 text-slate-500" />
                          <span>{job.experience} experience</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-slate-500" />
                          <span>Posted {new Date(job.postedDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button className="bg-primary-navy hover:bg-slate-800 text-white rounded-xl font-subheading">
                      <Target className="h-4 w-4 mr-2" />
                      Apply Now
              </Button>
                  </div>
            </CardContent>
          </Card>
            ))}
        </div>

          {/* Back Button */}
          <div className="flex justify-center pt-4">
            <Button 
              variant="outline" 
              className="rounded-xl font-subheading"
              onClick={() => setShowJobsModal(false)}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Company Profile
            </Button>
      </div>
    </div>
      </DialogContent>
    </Dialog>
    </>
  )
}
