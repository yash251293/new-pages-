import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  ArrowLeft,
  BookmarkIcon,
  Share2,
  MapPin,
  Clock,
  DollarSign,
  Users,
  Building2,
  Calendar,
  CheckCircle,
  AlertCircle,
} from "lucide-react"

// Mock job data - in a real app, this would come from an API
const getJobData = (id: string) => {
  const jobs = {
    "1": {
      id: "1",
      title: "Senior Frontend Developer",
      company: "TechVision",
      companyLogo: "/abstract-tech-logo.png",
      location: "San Francisco, CA",
      type: "Full-time",
      remote: "Remote",
      salary: "$120K - $150K",
      postedDate: "3 days ago",
      applicants: "47 applicants",
      description: `We are seeking a highly skilled Senior Frontend Developer to join our dynamic team at TechVision. You will be responsible for developing and maintaining cutting-edge web applications using modern JavaScript frameworks.

As a Senior Frontend Developer, you will work closely with our design and backend teams to create exceptional user experiences. You'll have the opportunity to mentor junior developers and contribute to architectural decisions that shape our product's future.`,
      responsibilities: [
        "Develop and maintain responsive web applications using React and TypeScript",
        "Collaborate with UX/UI designers to implement pixel-perfect designs",
        "Optimize applications for maximum speed and scalability",
        "Mentor junior developers and conduct code reviews",
        "Participate in architectural decisions and technical planning",
        "Write clean, maintainable, and well-documented code",
        "Stay up-to-date with the latest frontend technologies and best practices",
      ],
      requirements: [
        "5+ years of experience in frontend development",
        "Expert knowledge of React, TypeScript, and modern JavaScript",
        "Experience with state management libraries (Redux, Zustand)",
        "Proficiency in CSS preprocessors and CSS-in-JS solutions",
        "Experience with testing frameworks (Jest, React Testing Library)",
        "Knowledge of build tools and bundlers (Webpack, Vite)",
        "Strong understanding of web performance optimization",
        "Excellent communication and collaboration skills",
      ],
      niceToHave: [
        "Experience with Next.js and server-side rendering",
        "Knowledge of GraphQL and Apollo Client",
        "Experience with design systems and component libraries",
        "Familiarity with CI/CD pipelines",
        "Experience with mobile app development (React Native)",
      ],
      benefits: [
        "Competitive salary and equity package",
        "Comprehensive health, dental, and vision insurance",
        "Flexible work arrangements and remote-first culture",
        "Professional development budget ($2,000/year)",
        "Unlimited PTO and flexible working hours",
        "Top-tier equipment and home office setup allowance",
        "Team retreats and company events",
      ],
      companyInfo: {
        size: "50-200 employees",
        industry: "Information Technology",
        founded: "2018",
        description:
          "TechVision is a fast-growing startup focused on building innovative solutions for the modern workplace. We're passionate about creating technology that empowers teams to work more efficiently and collaboratively.",
      },
      skills: ["React", "TypeScript", "Redux", "CSS", "JavaScript", "Git"],
      experienceLevel: "Senior level",
    },
    "2": {
      id: "2",
      title: "Python AI Engineer",
      company: "Flexbone",
      companyLogo: "/flexbone-logo.png",
      location: "Atlanta, GA",
      type: "Contract",
      remote: "Hybrid",
      salary: "$90K - $110K",
      postedDate: "1 week ago",
      applicants: "23 applicants",
      description: `Join our AI team at Flexbone to develop cutting-edge machine learning solutions for healthcare applications. You'll work on projects that directly impact patient care and medical research.

We're looking for a passionate Python AI Engineer who can translate complex healthcare challenges into innovative AI solutions. You'll collaborate with medical professionals, data scientists, and software engineers to build scalable ML systems.`,
      responsibilities: [
        "Design and implement machine learning models for healthcare applications",
        "Develop and maintain AI pipelines using Python and TensorFlow/PyTorch",
        "Collaborate with healthcare professionals to understand domain requirements",
        "Optimize model performance and ensure scalability",
        "Implement data preprocessing and feature engineering pipelines",
        "Deploy models to production environments using cloud platforms",
        "Monitor model performance and implement continuous improvement strategies",
      ],
      requirements: [
        "3+ years of experience in machine learning and AI development",
        "Strong proficiency in Python and ML libraries (TensorFlow, PyTorch, scikit-learn)",
        "Experience with data preprocessing and feature engineering",
        "Knowledge of cloud platforms (AWS, GCP, or Azure)",
        "Understanding of MLOps practices and model deployment",
        "Experience with healthcare data and HIPAA compliance is a plus",
        "Strong analytical and problem-solving skills",
      ],
      niceToHave: [
        "PhD in Computer Science, AI, or related field",
        "Experience with medical imaging and computer vision",
        "Knowledge of natural language processing for medical texts",
        "Experience with distributed computing frameworks",
        "Publications in AI/ML conferences or journals",
      ],
      benefits: [
        "Competitive contract rate",
        "Flexible working arrangements",
        "Access to cutting-edge healthcare datasets",
        "Opportunity to work on impactful healthcare solutions",
        "Professional development opportunities",
        "Potential for full-time conversion",
      ],
      companyInfo: {
        size: "200-500 employees",
        industry: "Healthcare Technology",
        founded: "2015",
        description:
          "Flexbone is a healthcare technology company dedicated to improving patient outcomes through innovative AI solutions. We work with hospitals and research institutions to develop next-generation medical technologies.",
      },
      skills: ["Python", "TensorFlow", "Machine Learning", "PyTorch", "AWS", "Data Science"],
      experienceLevel: "Mid level",
    },
  }

  return jobs[id as keyof typeof jobs] || jobs["1"]
}

export default function JobDetailPage({ params }: { params: { id: string } }) {
  const job = getJobData(params.id)

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center mb-6">
        <Link href="/jobs" className="mr-4">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl font-bold">Job Details</h1>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="icon">
            <Share2 className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <BookmarkIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Job Header */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start space-x-4 mb-6">
                <img src={job.companyLogo || "/placeholder.svg"} alt={job.company} className="h-16 w-16 rounded-lg" />
                <div className="flex-1">
                  <h1 className="text-2xl font-bold mb-2">{job.title}</h1>
                  <div className="flex items-center space-x-4 text-muted-foreground mb-4">
                    <div className="flex items-center">
                      <Building2 className="h-4 w-4 mr-1" />
                      {job.company}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {job.location}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {job.postedDate}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">{job.type}</Badge>
                    <Badge variant="secondary">{job.remote}</Badge>
                    <Badge variant="secondary">{job.experienceLevel}</Badge>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-muted rounded-lg">
                <div className="flex items-center">
                  <DollarSign className="h-5 w-5 text-green-600 mr-2" />
                  <div>
                    <p className="text-sm text-muted-foreground">Salary</p>
                    <p className="font-medium">{job.salary}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Users className="h-5 w-5 text-blue-600 mr-2" />
                  <div>
                    <p className="text-sm text-muted-foreground">Applicants</p>
                    <p className="font-medium">{job.applicants}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-purple-600 mr-2" />
                  <div>
                    <p className="text-sm text-muted-foreground">Posted</p>
                    <p className="font-medium">{job.postedDate}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Job Description */}
          <Card>
            <CardHeader>
              <CardTitle>Job Description</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{job.description}</p>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                  Key Responsibilities
                </h3>
                <ul className="space-y-2">
                  {job.responsibilities.map((responsibility, index) => (
                    <li key={index} className="flex items-start">
                      <div className="h-2 w-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0" />
                      <span className="text-muted-foreground">{responsibility}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <AlertCircle className="h-5 w-5 text-orange-600 mr-2" />
                  Requirements
                </h3>
                <ul className="space-y-2">
                  {job.requirements.map((requirement, index) => (
                    <li key={index} className="flex items-start">
                      <div className="h-2 w-2 bg-orange-600 rounded-full mt-2 mr-3 flex-shrink-0" />
                      <span className="text-muted-foreground">{requirement}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-semibold mb-4">Nice to Have</h3>
                <ul className="space-y-2">
                  {job.niceToHave.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <div className="h-2 w-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-semibold mb-4">Benefits & Perks</h3>
                <ul className="space-y-2">
                  {job.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <div className="h-2 w-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0" />
                      <span className="text-muted-foreground">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Apply Card */}
          <Card className="sticky top-6">
            <CardContent className="p-6">
              <Button className="w-full mb-4" size="lg" asChild>
                <Link href={`/jobs/${job.id}/apply`}>Apply for this position</Link>
              </Button>
              <Button variant="outline" className="w-full mb-4">
                Save for later
              </Button>
              <p className="text-sm text-muted-foreground text-center">
                By applying, you agree to our Terms of Service and Privacy Policy
              </p>
            </CardContent>
          </Card>

          {/* Skills */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Required Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {job.skills.map((skill, index) => (
                  <Badge key={index} variant="outline">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Company Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">About {job.company}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <img src={job.companyLogo || "/placeholder.svg"} alt={job.company} className="h-12 w-12 rounded" />
                <div>
                  <h3 className="font-medium">{job.company}</h3>
                  <p className="text-sm text-muted-foreground">{job.companyInfo.industry}</p>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Company size:</span>
                  <span>{job.companyInfo.size}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Founded:</span>
                  <span>{job.companyInfo.founded}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Industry:</span>
                  <span>{job.companyInfo.industry}</span>
                </div>
              </div>

              <Separator />

              <p className="text-sm text-muted-foreground">{job.companyInfo.description}</p>

              <Button variant="outline" className="w-full">
                View Company Profile
              </Button>
            </CardContent>
          </Card>

          {/* Similar Jobs */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Similar Jobs</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="p-3 border rounded-lg hover:bg-muted cursor-pointer">
                  <h4 className="font-medium text-sm">Frontend Developer</h4>
                  <p className="text-xs text-muted-foreground">Google • Remote</p>
                  <p className="text-xs text-muted-foreground">$100K - $130K</p>
                </div>
                <div className="p-3 border rounded-lg hover:bg-muted cursor-pointer">
                  <h4 className="font-medium text-sm">React Developer</h4>
                  <p className="text-xs text-muted-foreground">Meta • San Francisco</p>
                  <p className="text-xs text-muted-foreground">$110K - $140K</p>
                </div>
                <div className="p-3 border rounded-lg hover:bg-muted cursor-pointer">
                  <h4 className="font-medium text-sm">Full Stack Engineer</h4>
                  <p className="text-xs text-muted-foreground">Stripe • Remote</p>
                  <p className="text-xs text-muted-foreground">$120K - $160K</p>
                </div>
              </div>
              <Button variant="outline" className="w-full" size="sm">
                View More Jobs
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
