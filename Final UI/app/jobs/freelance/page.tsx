"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BookmarkIcon, Search, Briefcase, Users, PlusCircle, Filter, FolderOpen, Star, Clock, DollarSign, MapPin, Users2, Calendar, ChevronRight, FileText, CheckCircle, X, ArrowLeft, Upload, Send, MessageCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useState } from "react"

export default function FreelancePage() {
  const [activeTab, setActiveTab] = useState("gigs")
  const [showFilters, setShowFilters] = useState(false)
  const [showGigsFilters, setShowGigsFilters] = useState(false)
  const [budgetRange, setBudgetRange] = useState([0, 5000])
  const [projectBudgetRange, setProjectBudgetRange] = useState([0, 10000])
  const [selectedProject, setSelectedProject] = useState<any>(null)
  const [showApplyModal, setShowApplyModal] = useState(false)
  const [applicationData, setApplicationData] = useState({
    coverLetter: "",
    proposedRate: "",
    timeline: "",
    portfolio: null
  })
  const [selectedFreelancer, setSelectedFreelancer] = useState<any>(null)
  const [showMessageModal, setShowMessageModal] = useState(false)
  const [messageData, setMessageData] = useState({
    subject: "",
    message: "",
    projectBudget: "",
    timeline: ""
  })

  const projects = [
    {
      id: 1,
      title: "React Native Developer for Fitness App",
      budget: "$2,000-3,000 fixed price",
      category: "Mobile Dev",
      description: "Looking for an experienced React Native developer to build a fitness tracking app with workout plans, progress tracking, and social features.",
      fullDescription: "We are developing a comprehensive fitness tracking application that will revolutionize how users approach their workout routines. The app needs to include workout plans, progress tracking, social features for community engagement, and integration with wearable devices. The ideal candidate should have extensive experience with React Native, Firebase backend integration, and mobile UI/UX best practices.",
      skills: ["React Native", "Firebase", "UI/UX", "API Integration"],
      duration: "4-6 weeks",
      postedDate: "2 days ago",
      icon: Briefcase,
      client: {
        name: "FitTech Solutions",
        rating: 4.8,
        reviews: 23,
        jobsPosted: 15,
        memberSince: "2022"
      },
      requirements: [
        "3+ years of React Native development experience",
        "Experience with Firebase and real-time databases",
        "Portfolio of published mobile applications",
        "Understanding of fitness/health app requirements",
        "Ability to work in US timezone"
      ]
    },
    {
      id: 2,
      title: "Content Writer for SaaS Blog Articles",
      budget: "$50-75 per article",
      category: "Content",
      description: "We need a skilled content writer to create engaging, SEO-optimized blog articles for our SaaS clients in the marketing technology space.",
      fullDescription: "Our content marketing agency is seeking a talented writer who can create compelling, SEO-optimized blog articles for our SaaS clients. You'll be responsible for researching industry trends, creating outlines, and writing high-quality articles that drive engagement and conversions. This is an ongoing opportunity with potential for 8-12 articles per month.",
      skills: ["SEO", "B2B", "SaaS", "Marketing"],
      duration: "Ongoing work",
      postedDate: "1 week ago",
      icon: Users,
      client: {
        name: "ContentPro Agency",
        rating: 4.9,
        reviews: 67,
        jobsPosted: 45,
        memberSince: "2020"
      },
      requirements: [
        "Proven experience in SaaS/B2B content writing",
        "Strong SEO knowledge and keyword research skills",
        "Ability to write in different tones and styles",
        "Experience with content management systems",
        "Native English speaker preferred"
      ]
    },
    {
      id: 3,
      title: "Data Visualization Expert for Financial Dashboard",
      budget: "$100 - $200/hr",
      category: "Data Science",
      description: "We are seeking a skilled data visualization expert to create an interactive financial dashboard using tools like Tableau or Power BI.",
      fullDescription: "Our financial services company needs a data visualization expert to create a comprehensive dashboard that will help our clients make informed investment decisions. The dashboard should integrate multiple data sources, provide real-time updates, and offer interactive features for data exploration. You'll work closely with our data science team to ensure accurate representation of complex financial data.",
      skills: ["Tableau", "Power BI", "Data Visualization", "Financial Analysis"],
      duration: "Part-time",
      postedDate: "3 days ago",
      icon: Search,
      client: {
        name: "InvestWise Analytics",
        rating: 4.7,
        reviews: 34,
        jobsPosted: 12,
        memberSince: "2021"
      },
      requirements: [
        "Expert-level Tableau or Power BI skills",
        "Experience with financial data visualization",
        "Knowledge of SQL and data modeling",
        "Understanding of financial markets and KPIs",
        "Available for 20-25 hours per week"
      ]
    }
  ]

  const freelancers = [
    {
      id: 1,
      name: "David Chen",
      initials: "DC",
      title: "Full Stack Developer | React | Node.js | AWS",
      rate: 65,
      rating: 4.9,
      reviews: 42,
      location: "San Francisco, CA",
      availability: "Available Now",
      shortBio: "I build scalable web applications with modern JavaScript frameworks. Specialized in React, Node.js, and cloud infrastructure.",
      fullBio: "I'm a full-stack developer with 8+ years of experience building scalable web applications for startups and enterprise companies. I specialize in React, Node.js, and AWS cloud infrastructure. I've successfully delivered 50+ projects ranging from MVP development to large-scale enterprise applications. My expertise includes modern JavaScript frameworks, microservices architecture, and DevOps practices.",
      skills: ["React", "Node.js", "TypeScript", "AWS", "MongoDB"],
      experience: "8+ years",
      completedProjects: 127,
      clientRetention: "95%",
      responseTime: "< 1 hour",
      languages: ["English (Native)", "Mandarin (Fluent)"],
      certifications: ["AWS Solutions Architect", "MongoDB Developer"],
      portfolio: [
        { name: "E-commerce Platform", description: "Built scalable marketplace serving 100k+ users" },
        { name: "FinTech Dashboard", description: "Real-time financial analytics platform" },
        { name: "Healthcare Management System", description: "HIPAA-compliant patient management system" }
      ],
      testimonials: [
        { client: "TechStart Inc.", text: "David delivered exceptional work on time and within budget. His technical expertise is outstanding." },
        { client: "InnovateCorp", text: "Working with David was a game-changer for our project. Highly recommend!" }
      ]
    },
    {
      id: 2,
      name: "Sarah Johnson",
      initials: "SJ",
      title: "UI/UX Designer | Brand Identity | Mobile Apps",
      rate: 75,
      rating: 4.8,
      reviews: 36,
      location: "Austin, TX",
      availability: "Available in 1 week",
      shortBio: "I create beautiful, intuitive interfaces for web and mobile applications with a focus on user experience and conversion.",
      fullBio: "I'm a UI/UX designer with 6+ years of experience creating digital experiences that users love. I specialize in user research, interface design, and conversion optimization. I've worked with Fortune 500 companies and fast-growing startups to design products that drive business results. My design philosophy centers around user-centered design and data-driven decisions.",
      skills: ["UI Design", "UX Research", "Figma", "Adobe XD", "Prototyping"],
      experience: "6+ years",
      completedProjects: 89,
      clientRetention: "92%",
      responseTime: "< 2 hours",
      languages: ["English (Native)", "Spanish (Conversational)"],
      certifications: ["Google UX Design Professional", "Adobe Certified Expert"],
      portfolio: [
        { name: "Mobile Banking App", description: "Complete UX redesign increasing user engagement by 40%" },
        { name: "SaaS Dashboard", description: "B2B platform design serving 10k+ businesses" },
        { name: "E-learning Platform", description: "Educational app with 50k+ active users" }
      ],
      testimonials: [
        { client: "DesignCorp", text: "Sarah's design transformed our user experience completely. Conversion rates increased by 35%." },
        { client: "AppFlow Inc.", text: "Outstanding designer with great communication skills. Delivered beyond expectations." }
      ]
    },
    {
      id: 3,
      name: "Michael Rodriguez",
      initials: "MR",
      title: "Content Strategist | SEO Writer | B2B SaaS",
      rate: 45,
      rating: 4.7,
      reviews: 29,
      location: "Remote",
      availability: "Available Now",
      shortBio: "I help B2B SaaS companies increase organic traffic and conversions with strategic content that ranks and converts.",
      fullBio: "I'm a content strategist and SEO writer with 5+ years of experience helping B2B SaaS companies grow through content marketing. I've helped companies increase organic traffic by 300%+ and generate millions in revenue through strategic content. I specialize in technical writing, SEO optimization, and content that converts prospects into customers.",
      skills: ["SEO", "Content Strategy", "Blog Writing", "Copywriting", "SaaS"],
      experience: "5+ years",
      completedProjects: 156,
      clientRetention: "88%",
      responseTime: "< 4 hours",
      languages: ["English (Native)", "Spanish (Native)"],
      certifications: ["Google Analytics", "HubSpot Content Marketing", "SEMrush SEO Toolkit"],
      portfolio: [
        { name: "SaaS Content Strategy", description: "300% organic traffic growth for B2B SaaS platform" },
        { name: "Technical Blog Series", description: "Developer-focused content driving 100k+ monthly visits" },
        { name: "Lead Magnet Campaign", description: "Content series generating 5000+ qualified leads" }
      ],
      testimonials: [
        { client: "GrowthSaaS", text: "Michael's content strategy transformed our inbound marketing. ROI exceeded expectations." },
        { client: "TechTools Pro", text: "Exceptional writer who understands both technical concepts and marketing strategy." }
      ]
    }
  ]

  const handleProjectClick = (project: any) => {
    setSelectedProject(project)
  }

  const handleApplyClick = (e: any, project: any) => {
    e.stopPropagation()
    setSelectedProject(project)
    setShowApplyModal(true)
  }

  const handleSubmitApplication = () => {
    // Handle application submission logic here
    console.log("Application submitted:", { project: selectedProject?.title, ...applicationData })
    setShowApplyModal(false)
    setApplicationData({ coverLetter: "", proposedRate: "", timeline: "", portfolio: null })
  }

  const handleFreelancerClick = (freelancer: any) => {
    setSelectedFreelancer(freelancer)
  }

  const handleContactClick = (e: any, freelancer: any) => {
    e.stopPropagation()
    setSelectedFreelancer(freelancer)
    setShowMessageModal(true)
  }

  const handleSendMessage = () => {
    // Handle message sending here - this would integrate with your messaging system
    console.log("Sending message to:", selectedFreelancer.name, messageData)
    setShowMessageModal(false)
    setSelectedFreelancer(null)
    setMessageData({
      subject: "",
      message: "",
      projectBudget: "",
      timeline: ""
    })
  }

  return (
    <div className="min-h-full">
      <div className="w-[65%] mx-auto py-4">
        <div className="flex items-center justify-between mb-8">
        <div>
            <h1 className="text-4xl font-heading text-primary-navy mb-2">Freelance Marketplace</h1>
            <p className="text-slate-600 font-subheading text-xl">Find work or hire talented professionals</p>
        </div>
        {activeTab === "freelancers" && (
        <Link href="/jobs/freelance/post">
              <Button className="bg-primary-navy hover:bg-slate-800 text-white rounded-full px-6 py-3 font-subheading">
            <PlusCircle className="h-4 w-4 mr-2" />
            Post a Project
          </Button>
        </Link>
        )}
      </div>

      <Tabs defaultValue="gigs" className="mb-8" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 mb-8 bg-slate-100 p-2 rounded-2xl">
            <TabsTrigger value="gigs" className="text-base py-3 font-subheading rounded-xl data-[state=active]:bg-primary-navy data-[state=active]:text-white">
            <Briefcase className="h-4 w-4 mr-2" />
            Gigs & Projects
          </TabsTrigger>
            <TabsTrigger value="freelancers" className="text-base py-3 font-subheading rounded-xl data-[state=active]:bg-primary-navy data-[state=active]:text-white">
            <Users className="h-4 w-4 mr-2" />
            Hire Freelancers
          </TabsTrigger>
        </TabsList>

        <TabsContent value="gigs">
            <div className="flex gap-6">
              {/* Enhanced Sidebar for Gigs */}
              <div className="w-64 flex-shrink-0">
                <div className="space-y-6">
                  {/* Applied Projects */}
                  <Card className="border-slate-200 shadow-sm">
                    <CardHeader className="pb-4">
                      <CardTitle className="text-xl font-heading text-primary-navy flex items-center">
                        <FileText className="h-5 w-5 mr-2" />
                        My Applications
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Link href="/jobs/freelance/my-applications">
                        <Button 
                          variant="outline" 
                          className="w-full justify-between border-primary-navy text-primary-navy hover:bg-primary-navy hover:text-white rounded-xl font-subheading"
                        >
                          <span className="flex items-center">
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Applied Projects
                          </span>
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </Link>
                      <div className="text-sm text-slate-500 font-subheading text-center py-2">
                        <p>8 active applications</p>
                        <p>3 interviews pending</p>
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
                          onClick={() => setShowGigsFilters(!showGigsFilters)}
                          className="text-[#0056B3] hover:text-primary-navy hover:bg-primary-navy/5 rounded-lg"
                        >
                          {showGigsFilters ? 'Hide' : 'Show'}
                        </Button>
                      </CardTitle>
                    </CardHeader>
                    {showGigsFilters && (
                      <CardContent className="space-y-6">
                        {/* Project Type */}
                        <div>
                          <h4 className="font-subheading font-medium text-primary-navy mb-3">Project Type</h4>
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <Checkbox id="fixed-price" />
                              <label htmlFor="fixed-price" className="text-sm font-subheading text-slate-600">Fixed Price</label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="hourly" />
                              <label htmlFor="hourly" className="text-sm font-subheading text-slate-600">Hourly Rate</label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="milestone" />
                              <label htmlFor="milestone" className="text-sm font-subheading text-slate-600">Milestone Based</label>
                            </div>
                          </div>
                        </div>

                        <Separator />

                        {/* Budget Range */}
                        <div>
                          <h4 className="font-subheading font-medium text-primary-navy mb-3">Budget Range</h4>
                          <div className="px-2">
                            <Slider
                              value={projectBudgetRange}
                              onValueChange={setProjectBudgetRange}
                              max={10000}
                              min={100}
                              step={100}
                              className="mb-3"
                            />
                            <div className="flex justify-between text-sm font-subheading text-slate-500">
                              <span>${projectBudgetRange[0]}</span>
                              <span>${projectBudgetRange[1]}</span>
                            </div>
                          </div>
                        </div>

                        <Separator />

                        {/* Project Duration */}
                        <div>
                          <h4 className="font-subheading font-medium text-primary-navy mb-3">Project Duration</h4>
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <Checkbox id="short-term" />
                              <label htmlFor="short-term" className="text-sm font-subheading text-slate-600">Less than 1 month</label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="medium-term" />
                              <label htmlFor="medium-term" className="text-sm font-subheading text-slate-600">1-3 months</label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="long-term" />
                              <label htmlFor="long-term" className="text-sm font-subheading text-slate-600">3+ months</label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="ongoing" />
                              <label htmlFor="ongoing" className="text-sm font-subheading text-slate-600">Ongoing</label>
                            </div>
                          </div>
                        </div>

                        <Separator />

                        {/* Client Rating */}
                        <div>
                          <h4 className="font-subheading font-medium text-primary-navy mb-3">Client Rating</h4>
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <Checkbox id="rating-5" />
                              <label htmlFor="rating-5" className="text-sm font-subheading text-slate-600">5.0 stars</label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="rating-4" />
                              <label htmlFor="rating-4" className="text-sm font-subheading text-slate-600">4.0+ stars</label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="rating-3" />
                              <label htmlFor="rating-3" className="text-sm font-subheading text-slate-600">3.0+ stars</label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="no-rating" />
                              <label htmlFor="no-rating" className="text-sm font-subheading text-slate-600">No rating yet</label>
                            </div>
                          </div>
                        </div>

                        <Separator />

                        {/* Skills Required */}
                        <div>
                          <h4 className="font-subheading font-medium text-primary-navy mb-3">Skills Required</h4>
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <Checkbox id="react-proj" />
                              <label htmlFor="react-proj" className="text-sm font-subheading text-slate-600">React</label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="nodejs-proj" />
                              <label htmlFor="nodejs-proj" className="text-sm font-subheading text-slate-600">Node.js</label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="python-proj" />
                              <label htmlFor="python-proj" className="text-sm font-subheading text-slate-600">Python</label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="design-proj" />
                              <label htmlFor="design-proj" className="text-sm font-subheading text-slate-600">UI/UX Design</label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="mobile-proj" />
                              <label htmlFor="mobile-proj" className="text-sm font-subheading text-slate-600">Mobile Development</label>
                            </div>
                          </div>
                        </div>

                        <Button className="w-full bg-primary-navy hover:bg-primary-navy/90 text-white rounded-lg font-subheading">
                          Apply Filters
                        </Button>
                      </CardContent>
                    )}
                  </Card>
                </div>
              </div>

              {/* Main Content Area */}
              <div className="flex-1">
                <div className="flex space-x-4 mb-8">
            <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <Input 
                      placeholder="Search projects by title, skills, or keywords" 
                      className="pl-12 pr-4 py-3 border-slate-200 focus:border-slate-400 focus:ring-slate-100 rounded-xl font-subheading"
                    />
            </div>
            <Select>
                    <SelectTrigger className="w-[180px] border-primary-navy text-primary-navy hover:bg-primary-navy hover:text-white rounded-xl font-subheading focus:ring-0 focus:outline-none">
                      <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent className="border-primary-navy">
                      <SelectItem value="newest" className="focus:bg-primary-navy focus:text-white">Newest First</SelectItem>
                      <SelectItem value="budget-high" className="focus:bg-primary-navy focus:text-white">Highest Budget</SelectItem>
                      <SelectItem value="budget-low" className="focus:bg-primary-navy focus:text-white">Lowest Budget</SelectItem>
                      <SelectItem value="deadline" className="focus:bg-primary-navy focus:text-white">Deadline</SelectItem>
                      <SelectItem value="applications" className="focus:bg-primary-navy focus:text-white">Fewest Applications</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            {projects.map((project) => {
              const IconComponent = project.icon
              return (
                <Card 
                  key={project.id}
                  className="border-0 shadow-sm hover:shadow-md transition-all duration-200 rounded-2xl bg-white cursor-pointer"
                  onClick={() => handleProjectClick(project)}
                >
                  <CardContent className="p-8">
              <div className="flex items-start">
                <div className="flex-1">
                        <div className="flex items-center space-x-4 mb-4">
                          <div className="h-16 w-16 rounded-xl bg-slate-100 flex items-center justify-center">
                            <IconComponent className="h-8 w-8 text-primary-navy" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-heading text-xl text-primary-navy">{project.title}</h3>
                            <div className="flex items-center space-x-3 mt-2">
                              <p className="text-base text-slate-600 font-subheading">{project.budget}</p>
                              <span className="text-sm bg-[#0056B3]/10 text-[#0056B3] px-3 py-1 rounded-full font-medium">{project.category}</span>
                      </div>
                    </div>
                  </div>
                        <p className="text-slate-600 font-subheading leading-relaxed mb-5 text-base">
                          {project.description}
                  </p>
                        <div className="flex flex-wrap gap-2 mb-5">
                          {project.skills.map((skill, index) => (
                            <span key={index} className="text-sm bg-slate-100 text-slate-700 px-3 py-1 rounded-full font-medium">{skill}</span>
                          ))}
                  </div>
                  <div className="flex items-center justify-between">
                          <p className="text-sm text-slate-500 font-subheading">Estimated duration: {project.duration} • Posted {project.postedDate}</p>
                          <div className="flex space-x-3">
                            <Button variant="ghost" size="icon" className="h-9 w-9 text-slate-400 hover:text-primary-navy hover:bg-slate-50">
                        <BookmarkIcon className="h-4 w-4" />
                      </Button>
                            <Button 
                              size="sm" 
                              className="bg-primary-navy hover:bg-slate-800 text-white rounded-lg px-4 font-subheading"
                              onClick={(e) => handleApplyClick(e, project)}
                            >
                              Apply
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
                  </div>

                <div className="mt-8 flex justify-center">
                  <Button variant="outline" className="rounded-full border-slate-200 text-slate-600 hover:border-primary-navy hover:text-primary-navy font-subheading px-6">
                    Load More Projects
                  </Button>
                </div>
              </div>
            </div>
        </TabsContent>

        <TabsContent value="freelancers">
            <div className="flex gap-6">
              {/* Enhanced Sidebar */}
              <div className="w-64 flex-shrink-0">
                <div className="space-y-6">
                  {/* Posted Projects */}
                  <Card className="border-slate-200 shadow-sm">
                    <CardHeader className="pb-4">
                      <CardTitle className="text-xl font-heading text-primary-navy flex items-center">
                        <FolderOpen className="h-5 w-5 mr-2" />
                        My Projects
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Link href="/jobs/freelance/my-projects">
                        <Button 
                          variant="outline" 
                          className="w-full justify-between border-primary-navy text-primary-navy hover:bg-primary-navy hover:text-white rounded-xl font-subheading"
                        >
                          <span className="flex items-center">
                            <FolderOpen className="h-4 w-4 mr-2" />
                            Posted Projects
                          </span>
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </Link>
                      <div className="text-sm text-slate-500 font-subheading text-center py-2">
                        <p>3 active projects</p>
                        <p>12 total applications</p>
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
                          className="text-[#0056B3] hover:text-primary-navy hover:bg-primary-navy/5 rounded-lg"
                        >
                          {showFilters ? 'Hide' : 'Show'}
                        </Button>
                      </CardTitle>
                    </CardHeader>
                    {showFilters && (
                      <CardContent className="space-y-6">
                        {/* Experience Level */}
                        <div>
                          <h4 className="font-subheading font-medium text-primary-navy mb-3">Experience Level</h4>
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <Checkbox id="entry" />
                              <label htmlFor="entry" className="text-sm font-subheading text-slate-600">Entry Level</label>
                    </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="intermediate" />
                              <label htmlFor="intermediate" className="text-sm font-subheading text-slate-600">Intermediate</label>
                  </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="expert" />
                              <label htmlFor="expert" className="text-sm font-subheading text-slate-600">Expert</label>
                    </div>
                  </div>
                        </div>

                        <Separator />

                        {/* Hourly Rate */}
                        <div>
                          <h4 className="font-subheading font-medium text-primary-navy mb-3">Hourly Rate Range</h4>
                          <div className="px-2">
                            <Slider
                              value={budgetRange}
                              onValueChange={setBudgetRange}
                              max={200}
                              min={10}
                              step={5}
                              className="mb-3"
                            />
                            <div className="flex justify-between text-sm font-subheading text-slate-500">
                              <span>${budgetRange[0]}/hr</span>
                              <span>${budgetRange[1]}/hr</span>
                </div>
              </div>
            </div>

                        <Separator />

                        {/* Location */}
                    <div>
                          <h4 className="font-subheading font-medium text-primary-navy mb-3">Location</h4>
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <Checkbox id="anywhere" />
                              <label htmlFor="anywhere" className="text-sm font-subheading text-slate-600">Anywhere</label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="us" />
                              <label htmlFor="us" className="text-sm font-subheading text-slate-600">United States</label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="eu" />
                              <label htmlFor="eu" className="text-sm font-subheading text-slate-600">Europe</label>
                            </div>
                      <div className="flex items-center space-x-2">
                              <Checkbox id="timezone" />
                              <label htmlFor="timezone" className="text-sm font-subheading text-slate-600">My Timezone</label>
                      </div>
                    </div>
                  </div>

                        <Separator />

                        {/* Availability */}
                        <div>
                          <h4 className="font-subheading font-medium text-primary-navy mb-3">Availability</h4>
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <Checkbox id="available" />
                              <label htmlFor="available" className="text-sm font-subheading text-slate-600">Available Now</label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="week" />
                              <label htmlFor="week" className="text-sm font-subheading text-slate-600">Within a Week</label>
                  </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="month" />
                              <label htmlFor="month" className="text-sm font-subheading text-slate-600">Within a Month</label>
                    </div>
                  </div>
                </div>

                        <Separator />

                        {/* Skills */}
                        <div>
                          <h4 className="font-subheading font-medium text-primary-navy mb-3">Required Skills</h4>
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <Checkbox id="react" />
                              <label htmlFor="react" className="text-sm font-subheading text-slate-600">React</label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="nodejs" />
                              <label htmlFor="nodejs" className="text-sm font-subheading text-slate-600">Node.js</label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="python" />
                              <label htmlFor="python" className="text-sm font-subheading text-slate-600">Python</label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="design" />
                              <label htmlFor="design" className="text-sm font-subheading text-slate-600">UI/UX Design</label>
              </div>
            </div>
          </div>

                        <Button className="w-full bg-primary-navy hover:bg-primary-navy/90 text-white rounded-lg font-subheading">
                          Apply Filters
                        </Button>
                      </CardContent>
                    )}
                  </Card>
                </div>
          </div>

              {/* Main Content Area */}
              <div className="flex-1">
                <div className="flex space-x-4 mb-8">
            <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <Input 
                      placeholder="Search freelancers by name, skills, or expertise" 
                      className="pl-12 pr-4 py-3 border-slate-200 focus:border-slate-400 focus:ring-slate-100 rounded-xl font-subheading"
                    />
            </div>
            <Select>
                    <SelectTrigger className="w-[180px] border-primary-navy text-primary-navy hover:bg-primary-navy hover:text-white rounded-xl font-subheading focus:ring-0 focus:outline-none">
                      <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent className="border-primary-navy">
                      <SelectItem value="rating" className="focus:bg-primary-navy focus:text-white">Highest Rating</SelectItem>
                      <SelectItem value="reviews" className="focus:bg-primary-navy focus:text-white">Most Reviews</SelectItem>
                      <SelectItem value="recent" className="focus:bg-primary-navy focus:text-white">Recently Active</SelectItem>
                      <SelectItem value="price-low" className="focus:bg-primary-navy focus:text-white">Price: Low to High</SelectItem>
                      <SelectItem value="price-high" className="focus:bg-primary-navy focus:text-white">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            {freelancers.map((freelancer) => (
              <Card 
                key={freelancer.id}
                className="border-0 shadow-sm hover:shadow-md transition-all duration-200 rounded-2xl bg-white cursor-pointer"
                onClick={() => handleFreelancerClick(freelancer)}
              >
                <CardContent className="p-8">
                  <div className="flex items-start space-x-6">
                    <div className="h-24 w-24 rounded-2xl bg-gradient-to-br from-primary-navy to-slate-700 flex items-center justify-center text-white text-3xl font-heading">
                      {freelancer.initials}
                    </div>
                <div className="flex-1">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-heading text-2xl text-primary-navy">{freelancer.name}</h3>
                        <div className="flex items-center space-x-1">
                          <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                          <span className="font-subheading font-medium text-primary-navy text-base">{freelancer.rating}</span>
                          <span className="text-slate-500 text-base font-subheading">/5 ({freelancer.reviews} reviews)</span>
                        </div>
                      </div>
                      <p className="font-subheading text-slate-600 mb-4 text-lg">
                        {freelancer.title}
                      </p>
                      <p className="text-slate-600 font-subheading leading-relaxed mb-5 text-base">
                        {freelancer.shortBio}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-5">
                        {freelancer.skills.map((skill, index) => (
                          <Badge key={index} className="bg-slate-100 text-slate-700 font-subheading text-sm px-3 py-1">{skill}</Badge>
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center text-primary-navy">
                            <DollarSign className="h-5 w-5 mr-1" />
                            <span className="font-heading text-xl">{freelancer.rate}/hr</span>
                          </div>
                          <div className="flex items-center text-slate-500">
                            <Clock className="h-5 w-5 mr-1" />
                            <span className="text-base font-subheading">{freelancer.availability}</span>
                          </div>
                          <div className="flex items-center text-slate-500">
                            <MapPin className="h-5 w-5 mr-1" />
                            <span className="text-base font-subheading">{freelancer.location}</span>
                          </div>
                        </div>
                        <Button 
                          size="sm" 
                          className="bg-primary-navy hover:bg-slate-800 text-white rounded-lg px-6 font-subheading"
                          onClick={(e) => handleContactClick(e, freelancer)}
                        >
                          Contact
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

                <div className="mt-8 flex justify-center">
                  <Button variant="outline" className="rounded-full border-slate-200 text-slate-600 hover:border-primary-navy hover:text-primary-navy font-subheading px-6">
                    Load More Freelancers
                  </Button>
                </div>
              </div>
          </div>
        </TabsContent>
      </Tabs>
      </div>

      {/* Project Details Modal */}
      {selectedProject && !showApplyModal && (
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
                    className="border-primary-navy text-primary-navy hover:bg-primary-navy hover:text-white rounded-xl font-subheading"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                  <h1 className="text-2xl font-heading text-primary-navy">Project Details</h1>
                </div>
              </div>

              {/* Project Content */}
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="h-16 w-16 rounded-xl bg-slate-100 flex items-center justify-center">
                    <selectedProject.icon className="h-8 w-8 text-primary-navy" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-heading text-primary-navy mb-2">{selectedProject.title}</h2>
                    <div className="flex items-center space-x-4 mb-3">
                      <p className="text-lg text-slate-600 font-subheading">{selectedProject.budget}</p>
                      <span className="text-sm bg-[#0056B3]/10 text-[#0056B3] px-3 py-1 rounded-full font-medium">
                        {selectedProject.category}
                      </span>
                    </div>
                    <p className="text-slate-500 font-subheading">Posted {selectedProject.postedDate}</p>
                  </div>
                </div>

                <Separator />

                {/* Project Description */}
                <div>
                  <h3 className="text-lg font-heading text-primary-navy mb-3">Project Description</h3>
                  <p className="text-slate-600 font-subheading leading-relaxed">{selectedProject.fullDescription}</p>
                </div>

                {/* Skills Required */}
                <div>
                  <h3 className="text-lg font-heading text-primary-navy mb-3">Skills Required</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.skills.map((skill: string, index: number) => (
                      <Badge key={index} className="bg-slate-100 text-slate-700 font-subheading">{skill}</Badge>
                    ))}
                  </div>
                </div>

                {/* Project Requirements */}
                <div>
                  <h3 className="text-lg font-heading text-primary-navy mb-3">Requirements</h3>
                  <ul className="space-y-2">
                    {selectedProject.requirements.map((requirement: string, index: number) => (
                      <li key={index} className="flex items-start space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                        <span className="text-slate-600 font-subheading">{requirement}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Client Information */}
                <div>
                  <h3 className="text-lg font-heading text-primary-navy mb-3">About the Client</h3>
                  <Card className="border-slate-200">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-heading text-primary-navy">{selectedProject.client.name}</h4>
                          <div className="flex items-center space-x-4 mt-1">
                            <div className="flex items-center space-x-1">
                              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                              <span className="font-subheading text-sm">{selectedProject.client.rating}/5</span>
                              <span className="text-xs text-slate-500">({selectedProject.client.reviews} reviews)</span>
                            </div>
                            <span className="text-xs text-slate-500">{selectedProject.client.jobsPosted} jobs posted</span>
                            <span className="text-xs text-slate-500">Member since {selectedProject.client.memberSince}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-4 pt-4">
                  <Button 
                    className="flex-1 bg-primary-navy hover:bg-slate-800 text-white rounded-xl font-subheading"
                    onClick={() => setShowApplyModal(true)}
                  >
                    Apply to Project
                  </Button>
                  <Button variant="outline" className="rounded-xl font-subheading">
                    <BookmarkIcon className="h-4 w-4 mr-2" />
                    Save Project
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Apply Modal */}
      <Dialog open={showApplyModal} onOpenChange={setShowApplyModal}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-heading text-primary-navy">
              Apply to: {selectedProject?.title}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6 mt-4">
            {/* Cover Letter */}
            <div>
              <Label htmlFor="coverLetter" className="font-subheading text-primary-navy">Cover Letter</Label>
              <Textarea
                id="coverLetter"
                placeholder="Explain why you're the perfect fit for this project..."
                value={applicationData.coverLetter}
                onChange={(e) => setApplicationData({...applicationData, coverLetter: e.target.value})}
                className="mt-2 min-h-[120px] rounded-xl font-subheading"
              />
            </div>

            {/* Proposed Rate */}
            <div>
              <Label htmlFor="proposedRate" className="font-subheading text-primary-navy">Your Proposed Rate</Label>
              <Input
                id="proposedRate"
                placeholder="Enter your rate (e.g., $50/hour or $2000 fixed)"
                value={applicationData.proposedRate}
                onChange={(e) => setApplicationData({...applicationData, proposedRate: e.target.value})}
                className="mt-2 rounded-xl font-subheading"
              />
            </div>

            {/* Timeline */}
            <div>
              <Label htmlFor="timeline" className="font-subheading text-primary-navy">Estimated Timeline</Label>
              <Input
                id="timeline"
                placeholder="How long will this project take? (e.g., 2-3 weeks)"
                value={applicationData.timeline}
                onChange={(e) => setApplicationData({...applicationData, timeline: e.target.value})}
                className="mt-2 rounded-xl font-subheading"
              />
            </div>

            {/* Portfolio/Attachments */}
            <div>
              <Label htmlFor="portfolio" className="font-subheading text-primary-navy">Portfolio/Relevant Work (Optional)</Label>
              <div className="mt-2 border-2 border-dashed border-slate-300 rounded-xl p-6 text-center">
                <Upload className="h-8 w-8 text-slate-400 mx-auto mb-2" />
                <p className="text-sm text-slate-600 font-subheading">
                  Drop files here or click to upload
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  PDF, DOC, or image files up to 10MB
                </p>
              </div>
            </div>

            {/* Project Budget Information */}
            {selectedProject && (
              <Card className="border-slate-200 bg-slate-50">
                <CardContent className="p-4">
                  <h4 className="font-heading text-primary-navy mb-2">Project Budget: {selectedProject.budget}</h4>
                  <p className="text-sm text-slate-600 font-subheading">
                    Make sure your proposed rate aligns with the client's budget range.
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Action Buttons */}
            <div className="flex space-x-4 pt-4">
              <Button 
                variant="outline" 
                className="flex-1 border-primary-navy text-primary-navy hover:bg-primary-navy hover:text-white rounded-xl font-subheading"
                onClick={() => setShowApplyModal(false)}
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

      {/* Freelancer Details Modal */}
      {selectedFreelancer && !showMessageModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setSelectedFreelancer(null)}
                    className="border-primary-navy text-primary-navy hover:bg-primary-navy hover:text-white rounded-xl font-subheading"
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </Button>
                  <h1 className="text-2xl font-heading text-primary-navy">Freelancer Profile</h1>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSelectedFreelancer(null)}
                  className="border-primary-navy text-primary-navy hover:bg-primary-navy hover:text-white rounded-xl font-subheading"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Freelancer Profile Content */}
              <div className="space-y-6">
                {/* Basic Info */}
                <div className="flex items-start space-x-6">
                  <div className="h-24 w-24 rounded-2xl bg-gradient-to-br from-primary-navy to-slate-700 flex items-center justify-center text-white text-3xl font-heading">
                    {selectedFreelancer.initials}
                  </div>
                <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h2 className="text-2xl font-heading text-primary-navy">{selectedFreelancer.name}</h2>
                      <div className="flex items-center space-x-1">
                        <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                        <span className="font-subheading font-medium text-primary-navy text-lg">{selectedFreelancer.rating}</span>
                        <span className="text-slate-500 font-subheading">/5 ({selectedFreelancer.reviews} reviews)</span>
                      </div>
                    </div>
                    <p className="text-lg font-subheading text-slate-600 mb-3">{selectedFreelancer.title}</p>
                    <div className="flex items-center space-x-6 text-slate-500 font-subheading">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{selectedFreelancer.location}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{selectedFreelancer.availability}</span>
                      </div>
                    <div className="flex items-center">
                        <DollarSign className="h-4 w-4 mr-1" />
                        <span className="font-heading text-primary-navy">${selectedFreelancer.rate}/hr</span>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Stats */}
                <div className="grid grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-slate-50 rounded-xl">
                    <div className="text-2xl font-heading text-primary-navy">{selectedFreelancer.completedProjects}</div>
                    <div className="text-sm font-subheading text-slate-600">Projects Completed</div>
                  </div>
                  <div className="text-center p-4 bg-slate-50 rounded-xl">
                    <div className="text-2xl font-heading text-primary-navy">{selectedFreelancer.clientRetention}</div>
                    <div className="text-sm font-subheading text-slate-600">Client Retention</div>
                  </div>
                  <div className="text-center p-4 bg-slate-50 rounded-xl">
                    <div className="text-2xl font-heading text-primary-navy">{selectedFreelancer.experience}</div>
                    <div className="text-sm font-subheading text-slate-600">Experience</div>
                  </div>
                  <div className="text-center p-4 bg-slate-50 rounded-xl">
                    <div className="text-2xl font-heading text-primary-navy">{selectedFreelancer.responseTime}</div>
                    <div className="text-sm font-subheading text-slate-600">Response Time</div>
                  </div>
                </div>

                {/* About */}
                <div>
                  <h3 className="text-lg font-heading text-primary-navy mb-3">About</h3>
                  <p className="text-slate-600 font-subheading leading-relaxed">{selectedFreelancer.fullBio}</p>
                </div>

                {/* Skills */}
                <div>
                  <h3 className="text-lg font-heading text-primary-navy mb-3">Skills & Expertise</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedFreelancer.skills.map((skill: string, index: number) => (
                      <Badge key={index} className="bg-[#0056B3]/10 text-[#0056B3] font-subheading px-3 py-1">{skill}</Badge>
                    ))}
                  </div>
                </div>

                {/* Languages */}
                <div>
                  <h3 className="text-lg font-heading text-primary-navy mb-3">Languages</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedFreelancer.languages.map((language: string, index: number) => (
                      <Badge key={index} className="bg-slate-100 text-slate-700 font-subheading">{language}</Badge>
                    ))}
                  </div>
                </div>

                {/* Certifications */}
                <div>
                  <h3 className="text-lg font-heading text-primary-navy mb-3">Certifications</h3>
                  <div className="space-y-2">
                    {selectedFreelancer.certifications.map((cert: string, index: number) => (
                      <div key={index} className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="font-subheading text-slate-600">{cert}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Portfolio */}
                <div>
                  <h3 className="text-lg font-heading text-primary-navy mb-3">Recent Work</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedFreelancer.portfolio.map((project: any, index: number) => (
                      <Card key={index} className="border-slate-200">
                        <CardContent className="p-4">
                          <h4 className="font-heading text-primary-navy mb-2">{project.name}</h4>
                          <p className="text-sm font-subheading text-slate-600">{project.description}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Testimonials */}
                <div>
                  <h3 className="text-lg font-heading text-primary-navy mb-3">Client Testimonials</h3>
                  <div className="space-y-4">
                    {selectedFreelancer.testimonials.map((testimonial: any, index: number) => (
                      <Card key={index} className="border-slate-200">
                        <CardContent className="p-4">
                          <p className="font-subheading text-slate-600 mb-2">"{testimonial.text}"</p>
                          <p className="text-sm font-subheading text-primary-navy">— {testimonial.client}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-4 pt-4">
                  <Button 
                    className="flex-1 bg-primary-navy hover:bg-slate-800 text-white rounded-xl font-subheading"
                    onClick={() => setShowMessageModal(true)}
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Contact & Message
                  </Button>
                  <Button variant="outline" className="border-primary-navy text-primary-navy hover:bg-primary-navy hover:text-white rounded-xl font-subheading">
                    <BookmarkIcon className="h-4 w-4 mr-2" />
                    Save Profile
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Message Modal */}
      {showMessageModal && selectedFreelancer && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowMessageModal(false)}
                    className="border-primary-navy text-primary-navy hover:bg-primary-navy hover:text-white rounded-xl font-subheading"
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </Button>
                  <div>
                    <h1 className="text-xl font-heading text-primary-navy">Contact {selectedFreelancer.name}</h1>
                    <p className="text-sm font-subheading text-slate-600">Send a message to start the conversation</p>
                  </div>
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

              {/* Message Form */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-heading text-primary-navy mb-2">Subject</label>
                  <Input
                    placeholder="Project inquiry - [Brief description]"
                    value={messageData.subject}
                    onChange={(e) => setMessageData({ ...messageData, subject: e.target.value })}
                    className="rounded-xl font-subheading"
                  />
            </div>

                <div>
                  <label className="block text-sm font-heading text-primary-navy mb-2">Message</label>
                  <textarea
                    placeholder={`Hi ${selectedFreelancer.name}, I'm interested in working with you on a project. Here's what I need help with...`}
                    value={messageData.message}
                    onChange={(e) => setMessageData({ ...messageData, message: e.target.value })}
                    rows={6}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-navy focus:border-transparent font-subheading"
                  />
                    </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-heading text-primary-navy mb-2">Project Budget (Optional)</label>
                    <Input
                      placeholder="$5,000 - $10,000"
                      value={messageData.projectBudget}
                      onChange={(e) => setMessageData({ ...messageData, projectBudget: e.target.value })}
                      className="rounded-xl font-subheading"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-heading text-primary-navy mb-2">Timeline (Optional)</label>
                    <Input
                      placeholder="2-4 weeks"
                      value={messageData.timeline}
                      onChange={(e) => setMessageData({ ...messageData, timeline: e.target.value })}
                      className="rounded-xl font-subheading"
                    />
                  </div>
                </div>

                {/* Quick Templates */}
                <div>
                  <h4 className="text-sm font-heading text-primary-navy mb-3">Quick Templates</h4>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs font-subheading"
                      onClick={() => setMessageData({
                        ...messageData,
                        subject: "Web Development Project Inquiry",
                        message: `Hi ${selectedFreelancer.name}, I came across your profile and I'm impressed by your expertise in ${selectedFreelancer.skills.slice(0, 3).join(', ')}. I have a web development project that I'd like to discuss with you. Would you be available for a quick call to go over the details?`
                      })}
                    >
                      Web Development
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs font-subheading"
                      onClick={() => setMessageData({
                        ...messageData,
                        subject: "Design Project Collaboration",
                        message: `Hello ${selectedFreelancer.name}, I'm looking for a talented designer to help with my project. Your portfolio looks amazing and I think you'd be a great fit. I'd love to discuss the project details with you.`
                      })}
                    >
                      Design Work
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs font-subheading"
                      onClick={() => setMessageData({
                        ...messageData,
                        subject: "Long-term Partnership Opportunity",
                        message: `Hi ${selectedFreelancer.name}, I'm looking for a reliable freelancer for ongoing projects. Based on your experience and excellent reviews, I think we could have a great working relationship. Let's connect!`
                      })}
                    >
                      Long-term
                    </Button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-4 pt-4">
                  <Button 
                    className="flex-1 bg-primary-navy hover:bg-slate-800 text-white rounded-xl font-subheading"
                    onClick={handleSendMessage}
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                  <Button 
                    variant="outline" 
                    className="border-primary-navy text-primary-navy hover:bg-primary-navy hover:text-white rounded-xl font-subheading"
                    onClick={() => setShowMessageModal(false)}
                  >
                    Cancel
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
