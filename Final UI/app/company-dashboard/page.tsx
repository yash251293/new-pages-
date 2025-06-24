"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Users, 
  Briefcase, 
  Eye, 
  TrendingUp,
  TrendingDown,
  DollarSign,
  Clock,
  Calendar,
  Star,
  Award,
  Target,
  UserCheck,
  Mail,
  Phone,
  MapPin,
  Building2,
  BarChart3,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle,
  Search,
  Filter
} from "lucide-react"
import Link from "next/link"

export default function CompanyDashboard() {
  const metrics = [
    {
      title: "Total Job Views",
      value: "12,847",
      change: "+12.5%",
      isPositive: true,
      icon: Eye,
      period: "vs last month"
    },
    {
      title: "Applications Received",
      value: "342",
      change: "+8.2%",
      isPositive: true,
      icon: Users,
      period: "vs last month"
    },
    {
      title: "Active Job Posts",
      value: "8",
      change: "+2",
      isPositive: true,
      icon: Briefcase,
      period: "vs last month"
    },
    {
      title: "Avg. Time to Hire",
      value: "18 days",
      change: "-3 days",
      isPositive: true,
      icon: Clock,
      period: "vs last month"
    }
  ]

  const recentApplications = [
    {
      id: 1,
      name: "Sarah Johnson",
      position: "Senior Frontend Developer", 
      location: "San Francisco, CA",
      experience: "5+ years",
      match: 95,
      applied: "2 hours ago",
      status: "new"
    },
    {
      id: 2,
      name: "Michael Chen",
      position: "Product Manager",
      location: "Remote",
      experience: "3+ years", 
      match: 88,
      applied: "5 hours ago",
      status: "reviewing"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      position: "UX Designer",
      location: "New York, NY",
      experience: "4+ years",
      match: 92,
      applied: "1 day ago",
      status: "shortlisted"
    },
    {
      id: 4,
      name: "David Kim",
      position: "Senior Frontend Developer",
      location: "Seattle, WA", 
      experience: "6+ years",
      match: 97,
      applied: "2 days ago",
      status: "interviewed"
    },
    {
      id: 5,
      name: "Lisa Wang",
      position: "Product Manager",
      location: "Austin, TX",
      experience: "4+ years",
      match: 85,
      applied: "3 days ago",
      status: "reviewing"
    }
  ]

  const topJobs = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      applicants: 45,
      views: 892,
      posted: "5 days ago",
      status: "active",
      conversion: "5.0%"
    },
    {
      id: 2,
      title: "Product Manager",
      applicants: 28,
      views: 654,
      posted: "1 week ago", 
      status: "active",
      conversion: "4.3%"
    },
    {
      id: 3,
      title: "UX Designer",
      applicants: 31,
      views: 567,
      posted: "3 days ago",
      status: "active", 
      conversion: "5.5%"
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
      default:
        return "bg-slate-50 text-slate-600 border-slate-200"
    }
  }

  return (
    <div className="w-[65%] mx-auto py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-heading text-primary-navy mb-2">Dashboard</h1>
            <p className="text-lg text-slate-600 font-subheading">
              Welcome back! Here's what's happening with your recruiting.
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Button 
              variant="outline" 
              className="rounded-lg font-subheading text-sm px-4 py-2"
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              Analytics
            </Button>
          </div>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metrics.map((metric, index) => (
          <Card key={index} className="p-6 border border-slate-200 rounded-lg hover:shadow-lg transition-shadow">
            <CardContent className="p-0">
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2 rounded-lg ${metric.isPositive ? 'bg-green-50' : 'bg-red-50'}`}>
                  <metric.icon className={`h-5 w-5 ${metric.isPositive ? 'text-green-600' : 'text-red-600'}`} />
                </div>
                <div className={`flex items-center text-sm font-subheading ${metric.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                  {metric.isPositive ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                  {metric.change}
                </div>
              </div>
              <h3 className="text-2xl font-heading text-slate-900 mb-1">{metric.value}</h3>
              <p className="text-sm text-slate-600 font-subheading">{metric.title}</p>
              <p className="text-xs text-slate-500 font-subheading mt-1">{metric.period}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Recent Applications */}
        <Card className="border border-slate-200 rounded-lg">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-heading text-slate-900">Recent Applications</CardTitle>
              <Link href="/company-dashboard?tab=applicants">
                <Button variant="ghost" size="sm" className="text-primary-navy hover:bg-primary-navy/10 font-subheading text-sm">
                  View All
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-4 p-6 pt-0">
              {recentApplications.slice(0, 4).map((applicant) => (
                <div key={applicant.id} className="flex items-center space-x-4 p-4 border border-slate-100 rounded-lg hover:bg-slate-50 transition-colors">
                  <div className="w-10 h-10 bg-primary-navy rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-subheading">
                      {applicant.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-subheading text-base text-slate-900 truncate">{applicant.name}</h4>
                    <p className="text-sm text-slate-600 font-subheading">{applicant.position}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="flex items-center text-xs text-slate-500 font-subheading">
                        <MapPin className="h-3 w-3 mr-1" />
                        {applicant.location}
                      </span>
                      <span className="text-xs text-slate-500">•</span>
                      <span className="text-xs text-slate-500 font-subheading">{applicant.experience}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-2 mb-1">
                      <Star className="h-3 w-3 text-yellow-500" />
                      <span className="text-sm font-subheading text-slate-900">{applicant.match}%</span>
                    </div>
                    <Badge className={`${getStatusColor(applicant.status)} text-xs font-subheading px-2 py-1`}>
                      {applicant.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Performing Jobs */}
        <Card className="border border-slate-200 rounded-lg">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-heading text-slate-900">Top Performing Jobs</CardTitle>
              <Link href="/company-jobs">
                <Button variant="ghost" size="sm" className="text-primary-navy hover:bg-primary-navy/10 font-subheading text-sm">
                  View All
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-4 p-6 pt-0">
              {topJobs.map((job) => (
                <div key={job.id} className="p-4 border border-slate-100 rounded-lg hover:bg-slate-50 transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-subheading text-base text-slate-900">{job.title}</h4>
                    <Badge className="bg-green-50 text-green-600 border-green-200 text-xs font-subheading px-2 py-1">
                      {job.status}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-1">
                        <Users className="h-4 w-4 text-slate-500 mr-1" />
                        <span className="text-lg font-heading text-slate-900">{job.applicants}</span>
                      </div>
                      <p className="text-xs text-slate-600 font-subheading">Applicants</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-1">
                        <Eye className="h-4 w-4 text-slate-500 mr-1" />
                        <span className="text-lg font-heading text-slate-900">{job.views}</span>
                      </div>
                      <p className="text-xs text-slate-600 font-subheading">Views</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-1">
                        <Target className="h-4 w-4 text-slate-500 mr-1" />
                        <span className="text-lg font-heading text-slate-900">{job.conversion}</span>
                      </div>
                      <p className="text-xs text-slate-600 font-subheading">Conversion</p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 font-subheading mt-2">Posted {job.posted}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 