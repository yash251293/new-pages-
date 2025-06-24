"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { BookmarkIcon, Filter, Search, Clock, CheckCircle, XCircle, Calendar, Briefcase, MapPin, DollarSign, Building, FileText, ChevronRight, Star, Users, Award, TrendingUp, Zap, Globe, ArrowLeft, X, Send, Upload } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import Link from "next/link"

const appliedJobs = [
  {
    id: "1",
    title: "Senior Frontend Developer",
    company: "TechVision",
    logo: "/abstract-tech-logo.png",
    location: "San Francisco, CA",
    salary: "$120K - $150K",
    type: "Full-time",
    remote: "Remote",
    appliedDate: "3 days ago",
    status: "under_review",
    statusText: "Under Review",
    description: "We're looking for a senior frontend developer to lead our web application development team.",
    skills: ["React", "TypeScript", "Redux", "5+ years"],
  },
  {
    id: "4",
    title: "Digital Marketing Manager",
    company: "GrowthBoost",
    logo: "/marketing-agency-logo.png",
    location: "New York, NY",
    salary: "$75K - $95K",
    type: "Full-time",
    remote: "Hybrid",
    appliedDate: "1 week ago",
    status: "interview_scheduled",
    statusText: "Interview Scheduled",
    description: "Lead our digital marketing efforts across multiple channels to drive growth for our B2B clients.",
    skills: ["SEO", "SEM", "Social Media", "Analytics"],
  },
  {
    id: "6",
    title: "UX Designer",
    company: "DesignCorp",
    logo: "/design-agency-logo.png",
    location: "Austin, TX",
    salary: "$80K - $100K",
    type: "Full-time",
    remote: "Remote",
    appliedDate: "2 weeks ago",
    status: "rejected",
    statusText: "Not Selected",
    description: "Create intuitive user experiences for our mobile and web applications.",
    skills: ["Figma", "User Research", "Prototyping", "3+ years"],
  },
  {
    id: "7",
    title: "Backend Engineer",
    company: "CloudTech",
    logo: "/tech-startup-logo.png",
    location: "Seattle, WA",
    salary: "$100K - $130K",
    type: "Full-time",
    remote: "Hybrid",
    appliedDate: "3 weeks ago",
    status: "applied",
    statusText: "Application Submitted",
    description: "Build scalable backend systems and APIs for our cloud platform.",
    skills: ["Node.js", "AWS", "Docker", "PostgreSQL"],
  },
]

const getStatusIcon = (status: string) => {
  switch (status) {
    case "applied":
      return <Clock className="h-4 w-4 text-primary-navy" />
    case "under_review":
      return <Clock className="h-4 w-4 text-orange-500" />
    case "interview_scheduled":
      return <Calendar className="h-4 w-4 text-green-500" />
    case "rejected":
      return <XCircle className="h-4 w-4 text-red-500" />
    case "accepted":
      return <CheckCircle className="h-4 w-4 text-green-500" />
    default:
      return <Clock className="h-4 w-4 text-slate-400" />
  }
}

const getStatusBadge = (status: string, statusText: string) => {
  const variants = {
    applied: "bg-primary-navy/10 text-primary-navy border-primary-navy/20",
    under_review: "bg-orange-50 text-orange-600 border-orange-200",
    interview_scheduled: "bg-green-50 text-green-600 border-green-200",
    rejected: "bg-red-50 text-red-600 border-red-200",
    accepted: "bg-green-50 text-green-600 border-green-200",
  }

  return <Badge className={`${variants[status as keyof typeof variants]} font-subheading`}>{statusText}</Badge>
}

export default function JobsPage() {
  const [showFilters, setShowFilters] = useState(false)
  const [salaryRange, setSalaryRange] = useState([40000, 200000])
  const [experienceRange, setExperienceRange] = useState([0, 15])
  const [selectedJob, setSelectedJob] = useState<any>(null)
  const [showApplicationModal, setShowApplicationModal] = useState(false)
  const [applicationData, setApplicationData] = useState({
    coverLetter: "",
    expectedSalary: "",
    availableStartDate: "",
    resume: null,
    portfolio: null
  })
  
  const statusCounts = {
    total: appliedJobs.length,
    pending: appliedJobs.filter(job => job.status === "applied" || job.status === "under_review").length,
    interviews: appliedJobs.filter(job => job.status === "interview_scheduled").length,
    hired: appliedJobs.filter(job => job.status === "accepted").length,
  }

  const jobs = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      company: "TechVision",
      logo: "/abstract-tech-logo.png",
      location: "San Francisco, CA",
      salary: "$120K - $150K",
      type: "Full-time",
      remote: "Remote",
      posted: "3 days ago",
      description: "We're looking for a senior frontend developer to lead our web application development team and architect scalable solutions for our growing platform.",
      fullDescription: "We are seeking a highly skilled Senior Frontend Developer to join our dynamic team at TechVision. You will be responsible for architecting and developing scalable web applications using modern frontend technologies. This role offers the opportunity to work on cutting-edge projects that impact millions of users worldwide. You'll collaborate closely with our product, design, and backend teams to create exceptional user experiences.",
      skills: ["React", "TypeScript", "Redux", "5+ years"],
      requirements: [
        "5+ years of experience in frontend development",
        "Expert knowledge of React and TypeScript",
        "Experience with state management libraries (Redux, MobX)",
        "Strong understanding of modern JavaScript (ES6+)",
        "Experience with testing frameworks (Jest, React Testing Library)",
        "Familiarity with modern build tools (Webpack, Vite)",
        "Experience with CSS-in-JS libraries or CSS modules"
      ],
      responsibilities: [
        "Lead frontend architecture decisions and technical direction",
        "Mentor junior developers and conduct code reviews",
        "Collaborate with design team to implement pixel-perfect UIs",
        "Optimize application performance and ensure scalability",
        "Participate in agile development processes and sprint planning",
        "Stay up-to-date with latest frontend technologies and best practices"
      ],
      companyInfo: {
        name: "TechVision",
        size: "100-500 employees",
        industry: "Technology",
        founded: "2018",
        description: "TechVision is a fast-growing technology company that develops innovative software solutions for businesses worldwide.",
        benefits: ["Health Insurance", "401(k) Matching", "Unlimited PTO", "Remote Work", "Learning Budget"],
        culture: "Innovation-driven, collaborative, and growth-focused environment"
      },
      applicationDeadline: "2024-02-15",
      hiringManager: "Sarah Chen, Engineering Manager"
    },
    {
      id: 2,
      title: "Python AI Engineer",
      company: "Flexbone",
      logo: "/flexbone-logo.png",
      location: "Atlanta, GA",
      salary: "$90K - $110K",
      type: "Contract",
      remote: "Hybrid",
      posted: "1 week ago",
      description: "Join our AI team to develop cutting-edge machine learning solutions for healthcare applications and make a real impact on patient outcomes.",
      fullDescription: "Flexbone is looking for a talented Python AI Engineer to join our healthcare AI division. You will be working on revolutionary machine learning models that help healthcare providers make better decisions and improve patient outcomes. This role involves working with large healthcare datasets, developing predictive models, and deploying AI solutions in production environments.",
      skills: ["Python", "TensorFlow", "Machine Learning", "3+ years"],
      requirements: [
        "3+ years of experience in machine learning and AI",
        "Strong proficiency in Python and ML libraries (TensorFlow, PyTorch, scikit-learn)",
        "Experience with data preprocessing and feature engineering",
        "Knowledge of deep learning architectures and techniques",
        "Experience with cloud platforms (AWS, GCP, or Azure)",
        "Understanding of healthcare data standards (HL7, FHIR) is a plus",
        "Master's degree in Computer Science, Data Science, or related field"
      ],
      responsibilities: [
        "Develop and train machine learning models for healthcare applications",
        "Work with healthcare data to extract meaningful insights",
        "Collaborate with data scientists and healthcare professionals",
        "Deploy and monitor ML models in production environments",
        "Conduct research on new AI techniques and methodologies",
        "Ensure models meet regulatory and compliance requirements"
      ],
      companyInfo: {
        name: "Flexbone",
        size: "50-100 employees",
        industry: "Healthcare Technology",
        founded: "2020",
        description: "Flexbone develops AI-powered solutions for healthcare providers to improve patient care and operational efficiency.",
        benefits: ["Health Insurance", "Flexible Hours", "Professional Development", "Stock Options"],
        culture: "Mission-driven team focused on improving healthcare through technology"
      },
      applicationDeadline: "2024-02-20",
      hiringManager: "Dr. Michael Torres, Head of AI"
    },
    {
      id: 3,
      title: "Full Stack Developer",
      company: "Source",
      logo: "/generic-company-logo.png",
      location: "Chicago, IL",
      salary: "$85K - $105K",
      type: "Full-time",
      remote: "On-site",
      posted: "2 weeks ago",
      description: "We need a talented full stack developer to build and maintain web applications for our clients in the construction industry.",
      fullDescription: "Source is seeking a Full Stack Developer to join our development team. You will be responsible for building and maintaining web applications that serve our clients in the construction industry. This role requires both frontend and backend development skills, with a focus on creating robust, scalable solutions that help construction companies manage their projects more efficiently.",
      skills: ["JavaScript", "Node.js", "React", "MongoDB"],
      requirements: [
        "3+ years of full stack development experience",
        "Proficiency in JavaScript and modern frameworks (React, Vue, or Angular)",
        "Strong backend development skills with Node.js",
        "Experience with databases (MongoDB, PostgreSQL, or MySQL)",
        "Knowledge of RESTful API design and development",
        "Familiarity with version control systems (Git)",
        "Understanding of web security best practices"
      ],
      responsibilities: [
        "Develop and maintain full stack web applications",
        "Design and implement RESTful APIs",
        "Work closely with clients to understand requirements",
        "Ensure application performance and scalability",
        "Participate in code reviews and technical discussions",
        "Troubleshoot and debug applications"
      ],
      companyInfo: {
        name: "Source",
        size: "20-50 employees",
        industry: "Construction Technology",
        founded: "2015",
        description: "Source provides technology solutions to construction companies, helping them streamline operations and improve project management.",
        benefits: ["Health Insurance", "Retirement Plan", "Professional Development", "Team Events"],
        culture: "Close-knit team with strong focus on client satisfaction and technical excellence"
      },
      applicationDeadline: "2024-02-25",
      hiringManager: "Jennifer Kim, CTO"
    },
    {
      id: 4,
      title: "Digital Marketing Manager",
      company: "GrowthBoost",
      logo: "/marketing-agency-logo.png",
      location: "New York, NY",
      salary: "$75K - $95K",
      type: "Full-time",
      remote: "Hybrid",
      posted: "5 days ago",
      description: "Lead our digital marketing efforts across multiple channels to drive growth for our B2B clients and expand market reach.",
      fullDescription: "GrowthBoost is looking for a dynamic Digital Marketing Manager to lead our marketing initiatives and drive growth for our B2B clients. You will be responsible for developing and executing comprehensive digital marketing strategies across multiple channels including SEO, SEM, social media, and content marketing. This role offers the opportunity to work with diverse clients and make a significant impact on their business growth.",
      skills: ["SEO", "SEM", "Social Media", "Analytics"],
      requirements: [
        "3+ years of digital marketing experience, preferably in B2B",
        "Strong knowledge of SEO and SEM best practices",
        "Experience with social media marketing and management",
        "Proficiency in Google Analytics and other marketing tools",
        "Excellent content creation and copywriting skills",
        "Experience with marketing automation platforms",
        "Strong analytical skills and data-driven mindset"
      ],
      responsibilities: [
        "Develop and execute digital marketing strategies for B2B clients",
        "Manage SEO and SEM campaigns to drive organic and paid traffic",
        "Create and manage social media content and campaigns",
        "Analyze campaign performance and provide actionable insights",
        "Collaborate with creative team on marketing materials",
        "Stay up-to-date with digital marketing trends and best practices"
      ],
      companyInfo: {
        name: "GrowthBoost",
        size: "30-75 employees",
        industry: "Digital Marketing",
        founded: "2017",
        description: "GrowthBoost is a digital marketing agency specializing in B2B growth strategies and lead generation.",
        benefits: ["Health Insurance", "Flexible Work", "Professional Development", "Performance Bonuses"],
        culture: "Creative, data-driven team focused on delivering exceptional results for clients"
      },
      applicationDeadline: "2024-02-18",
      hiringManager: "Alex Rodriguez, Marketing Director"
    },
    {
      id: 5,
      title: "Product Manager - Fintech",
      company: "FinTech Solutions",
      logo: "/finance-company-logo.png",
      location: "Boston, MA",
      salary: "$110K - $140K",
      type: "Full-time",
      remote: "Hybrid",
      posted: "1 week ago",
      description: "Drive the product roadmap for our financial technology solutions, working closely with engineering and design teams to deliver exceptional user experiences.",
      fullDescription: "FinTech Solutions is seeking an experienced Product Manager to drive the development of our financial technology products. You will be responsible for defining product strategy, managing the product roadmap, and working closely with cross-functional teams to deliver innovative solutions that meet our customers' needs. This role requires a deep understanding of the fintech industry and strong leadership skills.",
      skills: ["Product Management", "Fintech", "Agile", "5+ years"],
      requirements: [
        "5+ years of product management experience, preferably in fintech",
        "Strong understanding of financial services and regulations",
        "Experience with agile development methodologies",
        "Excellent analytical and problem-solving skills",
        "Strong communication and leadership abilities",
        "Experience with product analytics and user research",
        "MBA or relevant advanced degree preferred"
      ],
      responsibilities: [
        "Define and execute product strategy and roadmap",
        "Gather and prioritize product requirements from stakeholders",
        "Work closely with engineering and design teams",
        "Conduct market research and competitive analysis",
        "Manage product launches and go-to-market strategies",
        "Monitor product performance and user feedback"
      ],
      companyInfo: {
        name: "FinTech Solutions",
        size: "200-500 employees",
        industry: "Financial Technology",
        founded: "2016",
        description: "FinTech Solutions provides innovative financial technology products that help businesses manage their finances more effectively.",
        benefits: ["Health Insurance", "401(k) Matching", "Stock Options", "Flexible PTO", "Learning Budget"],
        culture: "Innovation-focused environment with emphasis on customer success and collaboration"
      },
      applicationDeadline: "2024-02-22",
      hiringManager: "David Park, VP of Product"
    }
  ]

  const handleJobClick = (job: any) => {
    setSelectedJob(job)
  }

  const handleApplyClick = () => {
    setShowApplicationModal(true)
  }

  const handleSubmitApplication = () => {
    // Handle application submission here
    console.log("Application submitted:", { job: selectedJob?.title, ...applicationData })
    setShowApplicationModal(false)
    setApplicationData({ 
      coverLetter: "", 
      expectedSalary: "", 
      availableStartDate: "", 
      resume: null, 
      portfolio: null 
    })
  }
  
  return (
    <>
      <div className="w-[65%] mx-auto py-6">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-4xl font-heading text-primary-navy mb-2">Career Opportunities</h1>
        <p className="text-slate-600 font-subheading text-xl">Discover your next career move with leading companies</p>
      </div>

      <div className="flex gap-6">
        {/* Enhanced Sidebar for Jobs */}
        <div className="w-64 flex-shrink-0">
          <div className="space-y-6">
            {/* Applied Jobs */}
            <Card className="border-slate-200 shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-heading text-primary-navy flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  My Applications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/jobs/freelance/applied-jobs">
                  <Button 
                    variant="outline" 
                    className="w-full justify-between border-primary-navy text-primary-navy hover:bg-primary-navy hover:text-white rounded-xl font-subheading"
                  >
                    <span className="flex items-center">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Applied Jobs
                    </span>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
                <div className="grid grid-cols-2 gap-2 text-sm text-slate-500 font-subheading">
                  <div className="text-center">
                    <p className="font-semibold text-primary-navy">{statusCounts.total}</p>
                    <p className="text-xs">Total Applied</p>
                  </div>
                  <div className="text-center">
                    <p className="font-semibold text-blue-600">{statusCounts.interviews}</p>
                    <p className="text-xs">Interviews</p>
                  </div>
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
                  {/* Job Type */}
                  <div>
                    <h4 className="font-subheading font-medium text-primary-navy mb-3">Job Type</h4>
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
                        <Checkbox id="internship" />
                        <label htmlFor="internship" className="text-sm font-subheading text-slate-600">Internship</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="freelance" />
                        <label htmlFor="freelance" className="text-sm font-subheading text-slate-600">Freelance</label>
                      </div>
                    </div>
          </div>

                  <Separator />

                  {/* Experience Level */}
                      <div>
                    <h4 className="font-subheading font-medium text-primary-navy mb-3">Experience Level</h4>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="entry-level" />
                        <label htmlFor="entry-level" className="text-sm font-subheading text-slate-600">Entry Level (0-2 years)</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="mid-level" />
                        <label htmlFor="mid-level" className="text-sm font-subheading text-slate-600">Mid Level (3-5 years)</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="senior-level" />
                        <label htmlFor="senior-level" className="text-sm font-subheading text-slate-600">Senior Level (6-10 years)</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="executive" />
                        <label htmlFor="executive" className="text-sm font-subheading text-slate-600">Executive (10+ years)</label>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Salary Range */}
                  <div>
                    <h4 className="font-subheading font-medium text-primary-navy mb-3">Salary Range</h4>
                    <div className="px-2">
                      <Slider
                        value={salaryRange}
                        onValueChange={setSalaryRange}
                        max={200000}
                        min={30000}
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

                  {/* Work Mode */}
                  <div>
                    <h4 className="font-subheading font-medium text-primary-navy mb-3">Work Mode</h4>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="remote" />
                        <label htmlFor="remote" className="text-sm font-subheading text-slate-600">Remote</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="hybrid" />
                        <label htmlFor="hybrid" className="text-sm font-subheading text-slate-600">Hybrid</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="on-site" />
                        <label htmlFor="on-site" className="text-sm font-subheading text-slate-600">On-site</label>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Company Size */}
                  <div>
                    <h4 className="font-subheading font-medium text-primary-navy mb-3">Company Size</h4>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="startup" />
                        <label htmlFor="startup" className="text-sm font-subheading text-slate-600">Startup (1-50 employees)</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="small" />
                        <label htmlFor="small" className="text-sm font-subheading text-slate-600">Small (51-200 employees)</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="medium" />
                        <label htmlFor="medium" className="text-sm font-subheading text-slate-600">Medium (201-1000 employees)</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="large" />
                        <label htmlFor="large" className="text-sm font-subheading text-slate-600">Large (1000+ employees)</label>
                      </div>
                </div>
              </div>

                  <Separator />

                  {/* Industry */}
                      <div>
                    <h4 className="font-subheading font-medium text-primary-navy mb-3">Industry</h4>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="technology" />
                        <label htmlFor="technology" className="text-sm font-subheading text-slate-600">Technology</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="finance" />
                        <label htmlFor="finance" className="text-sm font-subheading text-slate-600">Finance & Banking</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="healthcare" />
                        <label htmlFor="healthcare" className="text-sm font-subheading text-slate-600">Healthcare</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="education" />
                        <label htmlFor="education" className="text-sm font-subheading text-slate-600">Education</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="marketing" />
                        <label htmlFor="marketing" className="text-sm font-subheading text-slate-600">Marketing & Advertising</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="retail" />
                        <label htmlFor="retail" className="text-sm font-subheading text-slate-600">Retail & E-commerce</label>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Skills & Technologies */}
                  <div>
                    <h4 className="font-subheading font-medium text-primary-navy mb-3">Skills & Technologies</h4>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="react" />
                        <label htmlFor="react" className="text-sm font-subheading text-slate-600">React</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="python" />
                        <label htmlFor="python" className="text-sm font-subheading text-slate-600">Python</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="javascript" />
                        <label htmlFor="javascript" className="text-sm font-subheading text-slate-600">JavaScript</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="aws" />
                        <label htmlFor="aws" className="text-sm font-subheading text-slate-600">AWS</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="figma" />
                        <label htmlFor="figma" className="text-sm font-subheading text-slate-600">Figma</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="sql" />
                        <label htmlFor="sql" className="text-sm font-subheading text-slate-600">SQL</label>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Company Benefits */}
                  <div>
                    <h4 className="font-subheading font-medium text-primary-navy mb-3">Benefits</h4>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="health-insurance" />
                        <label htmlFor="health-insurance" className="text-sm font-subheading text-slate-600">Health Insurance</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="401k" />
                        <label htmlFor="401k" className="text-sm font-subheading text-slate-600">401(k) Matching</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="equity" />
                        <label htmlFor="equity" className="text-sm font-subheading text-slate-600">Equity/Stock Options</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="pto" />
                        <label htmlFor="pto" className="text-sm font-subheading text-slate-600">Unlimited PTO</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="learning" />
                        <label htmlFor="learning" className="text-sm font-subheading text-slate-600">Learning & Development</label>
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
        <div className="flex-1 space-y-8">
          {/* Search and Filters */}
          <Card className="border-slate-200 shadow-sm">
            <CardContent className="p-6">
              <div className="relative w-full">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                <Input 
                  placeholder="Search positions, companies, or keywords..." 
                  className="pl-12 h-12 border-slate-200 focus:border-slate-300 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 font-subheading rounded-xl w-full"
                />
              </div>
            </CardContent>
          </Card>

          {/* Job Listings */}
          <div className="space-y-4">
            {jobs.map((job) => {
              const getRemoteColor = (remote: string) => {
                switch (remote) {
                  case "Remote":
                    return "bg-green-100 text-green-700"
                  case "Hybrid":
                    return "bg-blue-100 text-blue-700"
                  case "On-site":
                    return "bg-red-100 text-red-700"
                  default:
                    return "bg-slate-100 text-slate-700"
                }
              }

              return (
                <Card 
                  key={job.id}
                  className="border-slate-200 hover:shadow-lg hover:border-primary-navy/30 transition-all duration-200 group cursor-pointer"
                  onClick={() => handleJobClick(job)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start space-x-4 mb-4">
                          <div className="w-16 h-16 rounded-lg overflow-hidden border border-slate-200 flex-shrink-0">
                            <img src={job.logo} alt={job.company} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-xl font-heading text-primary-navy group-hover:text-primary-navy transition-colors line-clamp-1">{job.title}</h3>
                            <div className="flex items-center space-x-3 text-slate-600 mt-1 text-base">
                              <div className="flex items-center space-x-1">
                                <Building className="h-4 w-4" />
                                <span className="font-subheading truncate">{job.company}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <MapPin className="h-4 w-4" />
                                <span className="font-subheading truncate">{job.location}</span>
                              </div>
                            </div>
                      </div>
                    </div>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          {job.skills.slice(0, 4).map((skill, index) => (
                            <span 
                              key={index}
                              className={`px-3 py-1 rounded-full text-sm font-subheading ${
                                skill.includes('+') || skill.includes('years') 
                                  ? 'bg-primary-navy/10 text-primary-navy' 
                                  : 'bg-slate-100 text-slate-700'
                              }`}
                            >
                              {skill}
                            </span>
                          ))}
                          {job.skills.length > 4 && (
                            <span className="px-3 py-1 rounded-full text-sm font-subheading bg-slate-100 text-slate-700">
                              +{job.skills.length - 4} more
                            </span>
                          )}
                    </div>
                        
                        <p className="text-slate-600 font-subheading leading-relaxed mb-4 text-base line-clamp-3">
                          {job.description}
                        </p>
                        
                        <div className="flex items-center justify-between text-base">
                          <div className="flex items-center space-x-4 text-slate-500">
                            <div className="flex items-center space-x-1">
                              <DollarSign className="h-4 w-4" />
                              <span className="font-subheading">{job.salary}</span>
                            </div>
                            <span className="font-subheading">{job.type}</span>
                            <span className={`px-3 py-1 rounded-full text-sm font-subheading ${getRemoteColor(job.remote)}`}>
                              {job.remote}
                            </span>
                          </div>
                          <span className="text-sm text-slate-400 font-subheading">Posted {job.posted}</span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                        className="text-slate-400 hover:text-primary-navy hover:bg-primary-navy/5 rounded-full flex-shrink-0"
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                    }}
                  >
                    <BookmarkIcon className="h-4 w-4" />
                  </Button>
                </div>
                  </CardContent>
                </Card>
              )
            })}
                      </div>
                    </div>
                    </div>
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
                  className="rounded-xl"
                >
                  <ArrowLeft className="h-5 w-5" />
                  </Button>
                <h1 className="text-2xl font-heading text-primary-navy">Job Details</h1>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setSelectedJob(null)}
                    className="border-primary-navy text-primary-navy hover:bg-primary-navy hover:text-white rounded-xl font-subheading"
                  >
                    <X className="h-5 w-5" />
                  </Button>
            </div>

            {/* Job Content */}
            <div className="space-y-6">
              {/* Basic Info */}
              <div className="flex items-start space-x-6">
                <div className="w-20 h-20 rounded-xl overflow-hidden border border-slate-200 flex-shrink-0">
                  <img src={selectedJob.logo} alt={selectedJob.company} className="w-full h-full object-cover" />
                </div>
                  <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-2xl font-heading text-primary-navy">{selectedJob.title}</h2>
                    <span className={`px-3 py-1 rounded-full text-sm font-subheading ${
                      selectedJob.remote === "Remote" ? "bg-green-100 text-green-700" :
                      selectedJob.remote === "Hybrid" ? "bg-blue-100 text-blue-700" :
                      selectedJob.remote === "On-site" ? "bg-red-100 text-red-700" :
                      "bg-slate-100 text-slate-700"
                    }`}>
                      {selectedJob.remote}
                    </span>
                      </div>
                  <div className="flex items-center space-x-6 text-slate-600 font-subheading mb-3">
                    <div className="flex items-center space-x-1">
                      <Building className="h-4 w-4" />
                      <span>{selectedJob.company}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4" />
                      <span>{selectedJob.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <DollarSign className="h-4 w-4" />
                      <span className="font-heading text-primary-navy">{selectedJob.salary}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 text-slate-500 font-subheading">
                    <span>{selectedJob.type}</span>
                    <span>•</span>
                    <span>Posted {selectedJob.posted}</span>
                    <span>•</span>
                    <span>Apply by {selectedJob.applicationDeadline}</span>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Job Description */}
                      <div>
                <h3 className="text-lg font-heading text-primary-navy mb-3">Job Description</h3>
                <p className="text-slate-600 font-subheading leading-relaxed">{selectedJob.fullDescription}</p>
                      </div>

              {/* Skills Required */}
              <div>
                <h3 className="text-lg font-heading text-primary-navy mb-3">Skills Required</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedJob.skills.map((skill: string, index: number) => (
                    <Badge key={index} className={`font-subheading ${
                      skill.includes('+') || skill.includes('years') 
                        ? 'bg-[#0056B3]/10 text-[#0056B3]' 
                        : 'bg-slate-100 text-slate-700'
                    }`}>{skill}</Badge>
                  ))}
                </div>
              </div>

              {/* Requirements */}
              <div>
                <h3 className="text-lg font-heading text-primary-navy mb-3">Requirements</h3>
                <ul className="space-y-2">
                  {selectedJob.requirements.map((requirement: string, index: number) => (
                    <li key={index} className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                      <span className="text-slate-600 font-subheading">{requirement}</span>
                    </li>
                  ))}
                </ul>
          </div>

              {/* Responsibilities */}
              <div>
                <h3 className="text-lg font-heading text-primary-navy mb-3">Responsibilities</h3>
                <ul className="space-y-2">
                  {selectedJob.responsibilities.map((responsibility: string, index: number) => (
                    <li key={index} className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-primary-navy mt-1 flex-shrink-0" />
                      <span className="text-slate-600 font-subheading">{responsibility}</span>
                    </li>
                  ))}
                </ul>
          </div>

              {/* Company Information */}
              <div>
                <h3 className="text-lg font-heading text-primary-navy mb-3">About the Company</h3>
                <Card className="border-slate-200">
                  <CardContent className="p-4">
                    <div className="space-y-3">
                          <div>
                        <h4 className="font-heading text-primary-navy">{selectedJob.companyInfo.name}</h4>
                        <div className="flex items-center space-x-4 mt-1 text-sm text-slate-500">
                          <span>{selectedJob.companyInfo.size}</span>
                          <span>•</span>
                          <span>{selectedJob.companyInfo.industry}</span>
                          <span>•</span>
                          <span>Founded {selectedJob.companyInfo.founded}</span>
                        </div>
                      </div>
                      <p className="text-slate-600 font-subheading">{selectedJob.companyInfo.description}</p>
                      <div>
                        <h5 className="font-subheading font-medium text-primary-navy mb-2">Benefits</h5>
                        <div className="flex flex-wrap gap-2">
                          {selectedJob.companyInfo.benefits.map((benefit: string, index: number) => (
                            <Badge key={index} className="bg-green-50 text-green-700 font-subheading">{benefit}</Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h5 className="font-subheading font-medium text-primary-navy mb-2">Company Culture</h5>
                        <p className="text-slate-600 font-subheading">{selectedJob.companyInfo.culture}</p>
                        </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Hiring Manager */}
              <div>
                <h3 className="text-lg font-heading text-primary-navy mb-3">Hiring Manager</h3>
                <p className="text-slate-600 font-subheading">{selectedJob.hiringManager}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4 pt-4">
                <Button 
                  className="flex-1 bg-primary-navy hover:bg-primary-navy/90 text-white rounded-xl font-subheading"
                  onClick={handleApplyClick}
                >
                  Apply for this Position
                </Button>
                <Button variant="outline" className="border-primary-navy text-primary-navy hover:bg-primary-navy hover:text-white rounded-xl font-subheading">
                  <BookmarkIcon className="h-4 w-4 mr-2" />
                  Save Job
                </Button>
              </div>
            </div>
                    </div>
                  </div>
                </div>
    )}

    {/* Application Modal */}
    <Dialog open={showApplicationModal} onOpenChange={setShowApplicationModal}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-heading text-primary-navy">
            Apply for: {selectedJob?.title}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 mt-4">
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
            <Label htmlFor="expectedSalary" className="font-subheading text-primary-navy">Expected Salary</Label>
            <Input
              id="expectedSalary"
              placeholder="e.g., $120,000 or Competitive"
              value={applicationData.expectedSalary}
              onChange={(e) => setApplicationData({...applicationData, expectedSalary: e.target.value})}
              className="mt-2 rounded-xl font-subheading"
            />
          </div>

          {/* Available Start Date */}
          <div>
            <Label htmlFor="availableStartDate" className="font-subheading text-primary-navy">Available Start Date</Label>
            <Input
              id="availableStartDate"
              placeholder="e.g., Immediately, 2 weeks notice, etc."
              value={applicationData.availableStartDate}
              onChange={(e) => setApplicationData({...applicationData, availableStartDate: e.target.value})}
              className="mt-2 rounded-xl font-subheading"
            />
          </div>

          {/* Resume Upload */}
          <div>
            <Label htmlFor="resume" className="font-subheading text-primary-navy">Resume/CV</Label>
            <div className="mt-2 border-2 border-dashed border-slate-300 rounded-xl p-6 text-center">
              <Upload className="h-8 w-8 text-slate-400 mx-auto mb-2" />
              <p className="text-sm text-slate-600 font-subheading">
                Upload your resume or CV
              </p>
              <p className="text-xs text-slate-500 mt-1">
                PDF, DOC, or DOCX files up to 5MB
              </p>
            </div>
              </div>

          {/* Portfolio/Additional Materials */}
          <div>
            <Label htmlFor="portfolio" className="font-subheading text-primary-navy">Portfolio/Additional Materials (Optional)</Label>
            <div className="mt-2 border-2 border-dashed border-slate-300 rounded-xl p-6 text-center">
              <Upload className="h-8 w-8 text-slate-400 mx-auto mb-2" />
              <p className="text-sm text-slate-600 font-subheading">
                Upload portfolio, work samples, or additional documents
              </p>
              <p className="text-xs text-slate-500 mt-1">
                PDF, DOC, images, or ZIP files up to 10MB
              </p>
            </div>
          </div>

          {/* Job Information Summary */}
          {selectedJob && (
            <Card className="border-slate-200 bg-slate-50">
              <CardContent className="p-4">
                <h4 className="font-heading text-primary-navy mb-2">Position Summary</h4>
                <div className="text-sm text-slate-600 font-subheading space-y-1">
                  <p><strong>Company:</strong> {selectedJob.company}</p>
                  <p><strong>Location:</strong> {selectedJob.location}</p>
                  <p><strong>Salary:</strong> {selectedJob.salary}</p>
                  <p><strong>Type:</strong> {selectedJob.type} • {selectedJob.remote}</p>
                  <p><strong>Application Deadline:</strong> {selectedJob.applicationDeadline}</p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-4 pt-4">
            <Button 
              variant="outline" 
              className="flex-1 border-primary-navy text-primary-navy hover:bg-primary-navy hover:text-white rounded-xl font-subheading"
              onClick={() => setShowApplicationModal(false)}
            >
              Cancel
            </Button>
            <Button 
              className="flex-1 bg-primary-navy hover:bg-primary-navy/90 text-white rounded-xl font-subheading"
              onClick={handleSubmitApplication}
            >
              <Send className="h-4 w-4 mr-2" />
              Submit Application
            </Button>
          </div>
    </div>
      </DialogContent>
    </Dialog>
    </>
  )
}
