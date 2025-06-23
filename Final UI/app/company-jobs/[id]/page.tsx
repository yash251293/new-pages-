"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { 
  ArrowLeft,
  MapPin,
  Briefcase,
  Clock,
  DollarSign,
  Users,
  Eye,
  Target,
  Calendar,
  Building2,
  GraduationCap,
  Mail,
  Phone,
  Download,
  MessageSquare,
  UserCheck,
  UserX,
  Video,
  Star,
  Award,
  CheckCircle,
  XCircle,
  AlertCircle,
  Edit
} from "lucide-react"

export default function JobDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const jobId = params.id
  
  const [selectedApplicant, setSelectedApplicant] = useState<any>(null)

  // Mock job data
  const jobDetails = {
    id: jobId,
    title: "Senior Frontend Developer",
    department: "Engineering",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$120K - $150K",
    status: "Active",
    posted: "5 days ago",
    deadline: "March 15, 2024",
    description: "We are looking for a skilled Frontend Developer to join our engineering team. You will be responsible for developing user-facing features, ensuring cross-browser compatibility, and collaborating with designers and backend developers.",
    requirements: [
      "5+ years of experience with React and TypeScript",
      "Strong understanding of modern frontend technologies",
      "Experience with state management libraries (Redux, Zustand)",
      "Knowledge of testing frameworks (Jest, Cypress)",
      "Excellent communication skills"
    ],
    responsibilities: [
      "Develop and maintain user-facing features",
      "Optimize applications for maximum speed and scalability",
      "Collaborate with cross-functional teams",
      "Participate in code reviews and technical discussions",
      "Mentor junior developers"
    ],
    benefits: [
      "Competitive salary and equity package",
      "Health, dental, and vision insurance",
      "Flexible working hours",
      "Professional development budget",
      "Remote work options"
    ],
    applicants: 45,
    views: 892,
    conversionRate: 5.1
  }

  const applicants = [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.j@email.com",
      phone: "+1 (555) 123-4567",
      avatar: "/api/placeholder/64/64",
      title: "Senior Frontend Developer",
      company: "TechCorp Inc.",
      experience: "6 years",
      location: "San Francisco, CA",
      match: 95,
      status: "new",
      appliedDate: "2024-01-12",
      skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "GraphQL"],
      education: "BS Computer Science - Stanford University",
      resume: "/resume-sarah-johnson.pdf",
      coverLetter: "I am excited about the opportunity to join your team as a Senior Frontend Developer. With over 6 years of experience...",
      portfolio: "https://sarahjohnson.dev",
      rating: 4.9,
      previousProjects: 15
    },
    {
      id: 2,
      name: "Michael Chen",
      email: "m.chen@email.com",
      phone: "+1 (555) 987-6543",
      avatar: "/api/placeholder/64/64",
      title: "Frontend Developer",
      company: "StartupXYZ",
      experience: "4 years",
      location: "Remote",
      match: 88,
      status: "reviewing",
      appliedDate: "2024-01-10",
      skills: ["React", "Vue.js", "JavaScript", "CSS", "Node.js"],
      education: "MS Software Engineering - UC Berkeley",
      resume: "/resume-michael-chen.pdf",
      coverLetter: "I'm passionate about creating exceptional user experiences and would love to contribute to your team...",
      portfolio: "https://michaelchen.portfolio.com",
      rating: 4.7,
      previousProjects: 12
    },
    {
      id: 3,
      name: "David Kim",
      email: "david.kim@email.com",
      phone: "+1 (555) 456-7890",
      avatar: "/api/placeholder/64/64",
      title: "Full Stack Developer",
      company: "DevAgency",
      experience: "7 years",
      location: "New York, NY",
      match: 97,
      status: "shortlisted",
      appliedDate: "2024-01-08",
      skills: ["React", "TypeScript", "Python", "AWS", "Docker"],
      education: "PhD Computer Science - MIT",
      resume: "/resume-david-kim.pdf",
      coverLetter: "With my extensive background in both frontend and backend development, I believe I can bring valuable expertise...",
      portfolio: "https://davidkim.dev",
      rating: 4.8,
      previousProjects: 20
    }
  ]

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
      case "hired":
        return "bg-green-100 text-green-700 border-green-300"
      case "rejected":
        return "bg-red-50 text-red-600 border-red-200"
      default:
        return "bg-slate-50 text-slate-600 border-slate-200"
    }
  }

  const handleApplicantAction = (applicantId: number, action: string) => {
    console.log(`${action} applicant ${applicantId}`)
    // Here you would typically update the applicant status in your backend
  }

  const getMatchColor = (match: number) => {
    if (match >= 90) return "text-green-600"
    if (match >= 80) return "text-yellow-600"
    return "text-red-600"
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[65%] mx-auto py-8 px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-6">
            <Link href="/company-jobs">
              <Button
                variant="ghost"
                size="icon"
                className="border-primary-navy text-primary-navy hover:bg-primary-navy hover:text-white rounded-xl font-subheading mr-4"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div className="flex-1">
              <h1 className="text-4xl font-heading text-primary-navy">{jobDetails.title}</h1>
              <div className="flex items-center space-x-4 text-slate-600 font-subheading mt-2 text-lg">
                <span className="flex items-center">
                  <Building2 className="h-5 w-5 mr-1" />
                  {jobDetails.department}
                </span>
                <span className="flex items-center">
                  <MapPin className="h-5 w-5 mr-1" />
                  {jobDetails.location}
                </span>
                <span className="flex items-center">
                  <Briefcase className="h-5 w-5 mr-1" />
                  {jobDetails.type}
                </span>
                <span className="flex items-center">
                  <DollarSign className="h-5 w-5 mr-1" />
                  {jobDetails.salary}
                </span>
              </div>
            </div>
            <Badge className="bg-green-50 text-green-600 border-green-200 font-subheading text-base">
              {jobDetails.status}
            </Badge>
          </div>

          {/* Job Stats */}
          <div className="grid grid-cols-4 gap-6 mb-8">
            <Card className="border-slate-200">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <Users className="h-6 w-6 text-blue-600 mr-2" />
                  <span className="text-3xl font-heading text-primary-navy">{jobDetails.applicants}</span>
                </div>
                <p className="text-base font-subheading text-slate-600">Total Applicants</p>
              </CardContent>
            </Card>
            <Card className="border-slate-200">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <Eye className="h-6 w-6 text-green-600 mr-2" />
                  <span className="text-3xl font-heading text-primary-navy">{jobDetails.views}</span>
                </div>
                <p className="text-base font-subheading text-slate-600">Total Views</p>
              </CardContent>
            </Card>
            <Card className="border-slate-200">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <Target className="h-6 w-6 text-purple-600 mr-2" />
                  <span className="text-3xl font-heading text-primary-navy">{jobDetails.conversionRate}%</span>
                </div>
                <p className="text-base font-subheading text-slate-600">Conversion Rate</p>
              </CardContent>
            </Card>
            <Card className="border-slate-200">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <Calendar className="h-6 w-6 text-orange-600 mr-2" />
                  <span className="text-3xl font-heading text-primary-navy">10</span>
                </div>
                <p className="text-base font-subheading text-slate-600">Days Left</p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Job Details */}
          <div className="lg:col-span-2 space-y-6">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview" className="font-subheading">Overview</TabsTrigger>
                <TabsTrigger value="applicants" className="font-subheading">Applicants ({applicants.length})</TabsTrigger>
                <TabsTrigger value="analytics" className="font-subheading">Analytics</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="font-heading text-primary-navy">Job Description</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="font-subheading text-slate-700 leading-relaxed">
                      {jobDetails.description}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="font-heading text-primary-navy">Requirements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {jobDetails.requirements.map((req, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="font-subheading text-slate-700">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="font-heading text-primary-navy">Responsibilities</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {jobDetails.responsibilities.map((resp, index) => (
                        <li key={index} className="flex items-start">
                          <Target className="h-4 w-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="font-subheading text-slate-700">{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="font-heading text-primary-navy">Benefits</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {jobDetails.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start">
                          <Star className="h-4 w-4 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="font-subheading text-slate-700">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="applicants" className="space-y-6">
                <div className="space-y-4">
                  {applicants.map((applicant) => (
                    <Card key={applicant.id} className="border-slate-200 hover:border-primary-navy transition-colors">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-4">
                            <Avatar className="h-16 w-16">
                              <AvatarImage src={applicant.avatar} alt={applicant.name} />
                              <AvatarFallback className="bg-primary-navy text-white font-heading">
                                {applicant.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="text-xl font-heading text-primary-navy">{applicant.name}</h3>
                              <p className="font-subheading text-slate-600">{applicant.title} at {applicant.company}</p>
                              <div className="flex items-center space-x-4 mt-2 text-sm font-subheading text-slate-500">
                                <span className="flex items-center">
                                  <Clock className="h-3 w-3 mr-1" />
                                  {applicant.experience}
                                </span>
                                <span className="flex items-center">
                                  <MapPin className="h-3 w-3 mr-1" />
                                  {applicant.location}
                                </span>
                                <span className="flex items-center">
                                  <Calendar className="h-3 w-3 mr-1" />
                                  Applied {new Date(applicant.appliedDate).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <div className="text-right">
                              <div className={`text-2xl font-heading ${getMatchColor(applicant.match)}`}>
                                {applicant.match}%
                              </div>
                              <p className="text-xs font-subheading text-slate-500">Match</p>
                            </div>
                            <Badge className={`${getStatusColor(applicant.status)} font-subheading`}>
                              {applicant.status}
                            </Badge>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mt-4 mb-4">
                          {applicant.skills.slice(0, 5).map((skill, index) => (
                            <Badge key={index} variant="outline" className="text-xs font-subheading">
                              {skill}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-sm font-subheading text-slate-600">
                            <span className="flex items-center">
                              <Star className="h-3 w-3 mr-1" />
                              {applicant.rating} rating
                            </span>
                            <span className="flex items-center">
                              <Award className="h-3 w-3 mr-1" />
                              {applicant.previousProjects} projects
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setSelectedApplicant(applicant)}
                              className="border-primary-navy text-primary-navy hover:bg-primary-navy hover:text-white rounded-xl font-subheading"
                            >
                              View Details
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleApplicantAction(applicant.id, 'interview')}
                              className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white rounded-xl font-subheading"
                            >
                              <Video className="h-3 w-3 mr-1" />
                              Interview
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => handleApplicantAction(applicant.id, 'hire')}
                              className="bg-green-600 hover:bg-green-700 text-white rounded-xl font-subheading"
                            >
                              <UserCheck className="h-3 w-3 mr-1" />
                              Hire
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleApplicantAction(applicant.id, 'reject')}
                              className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white rounded-xl font-subheading"
                            >
                              <UserX className="h-3 w-3 mr-1" />
                              Reject
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="analytics" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="font-heading text-primary-navy">Application Analytics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="font-subheading text-slate-700">Applications per day</span>
                        <span className="font-heading text-primary-navy">8.2</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-subheading text-slate-700">Average response time</span>
                        <span className="font-heading text-primary-navy">2.3 days</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-subheading text-slate-700">Top source</span>
                        <span className="font-heading text-primary-navy">LinkedIn (62%)</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column - Quick Actions */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-heading text-primary-navy">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start font-subheading">
                  <Edit className="h-4 w-4 mr-3" />
                  Edit Job Posting
                </Button>
                <Button variant="outline" className="w-full justify-start font-subheading">
                  <Users className="h-4 w-4 mr-3" />
                  Share Job
                </Button>
                <Button variant="outline" className="w-full justify-start font-subheading">
                  <Download className="h-4 w-4 mr-3" />
                  Export Applicants
                </Button>
                <Button variant="outline" className="w-full justify-start font-subheading text-red-600 border-red-200 hover:bg-red-50">
                  <XCircle className="h-4 w-4 mr-3" />
                  Close Job
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-heading text-primary-navy">Job Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm font-subheading">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span className="text-slate-700">Job posted - {jobDetails.posted}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    <span className="text-slate-700">First application received</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
                    <span className="text-slate-700">Application deadline - {jobDetails.deadline}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Applicant Details Modal */}
      {selectedApplicant && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={selectedApplicant.avatar} alt={selectedApplicant.name} />
                    <AvatarFallback className="bg-primary-navy text-white font-heading">
                      {selectedApplicant.name.split(' ').map((n: string) => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h1 className="text-2xl font-heading text-primary-navy">{selectedApplicant.name}</h1>
                    <p className="font-subheading text-slate-600">{selectedApplicant.title}</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSelectedApplicant(null)}
                  className="border-primary-navy text-primary-navy hover:bg-primary-navy hover:text-white rounded-xl font-subheading"
                >
                  <XCircle className="h-5 w-5" />
                </Button>
              </div>

              {/* Applicant Details */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-heading text-primary-navy mb-2">Contact Information</h3>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4 text-slate-500" />
                        <span className="font-subheading text-slate-700">{selectedApplicant.email}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-slate-500" />
                        <span className="font-subheading text-slate-700">{selectedApplicant.phone}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-heading text-primary-navy mb-2">Education</h3>
                    <p className="font-subheading text-slate-700">{selectedApplicant.education}</p>
                  </div>

                  <div>
                    <h3 className="font-heading text-primary-navy mb-2">Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedApplicant.skills.map((skill: string, index: number) => (
                        <Badge key={index} variant="outline" className="font-subheading">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-heading text-primary-navy mb-2">Cover Letter</h3>
                    <p className="font-subheading text-slate-700 text-sm leading-relaxed">
                      {selectedApplicant.coverLetter}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-heading text-primary-navy mb-2">Portfolio & Resume</h3>
                    <div className="space-y-2">
                      <Button variant="outline" size="sm" className="w-full justify-start font-subheading">
                        <Download className="h-3 w-3 mr-2" />
                        Download Resume
                      </Button>
                      <Button variant="outline" size="sm" className="w-full justify-start font-subheading">
                        <ArrowLeft className="h-3 w-3 mr-2" />
                        View Portfolio
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end space-x-3 mt-6">
                <Button
                  variant="outline"
                  onClick={() => handleApplicantAction(selectedApplicant.id, 'message')}
                  className="border-primary-navy text-primary-navy hover:bg-primary-navy hover:text-white rounded-xl font-subheading"
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Message
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleApplicantAction(selectedApplicant.id, 'interview')}
                  className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white rounded-xl font-subheading"
                >
                  <Video className="h-4 w-4 mr-2" />
                  Schedule Interview
                </Button>
                <Button
                  onClick={() => handleApplicantAction(selectedApplicant.id, 'hire')}
                  className="bg-green-600 hover:bg-green-700 text-white rounded-xl font-subheading"
                >
                  <UserCheck className="h-4 w-4 mr-2" />
                  Hire Candidate
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleApplicantAction(selectedApplicant.id, 'reject')}
                  className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white rounded-xl font-subheading"
                >
                  <UserX className="h-4 w-4 mr-2" />
                  Reject
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 