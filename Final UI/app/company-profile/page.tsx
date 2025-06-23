"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  MapPin,
  Mail,
  Phone,
  Globe,
  Edit,
  Plus,
  Building2,
  Users,
  Eye,
  Star,
  Calendar,
  ExternalLink,
  Download,
  Camera,
  Verified,
  Briefcase,
  TrendingUp,
  Award,
  FileText,
  LinkIcon,
  Settings,
  Share2,
  DollarSign,
  Target,
  History
} from "lucide-react"
import Link from "next/link"

export default function CompanyProfilePage() {
  const [isEditing, setIsEditing] = useState(false)

  return (
    <div className="w-[65%] mx-auto py-6">
      {/* Enhanced Header Card */}
      <Card className="mb-8 border-slate-200 shadow-lg overflow-hidden">
        <div className="relative">
          {/* Modern Cover Photo */}
          <div className="h-56 bg-gradient-to-br from-primary-navy via-[#0056B3] to-slate-600 relative">
            <div className="absolute inset-0 bg-black/20"></div>
            <Button
              size="sm"
              variant="secondary"
              className="absolute top-4 right-4 bg-white/90 hover:bg-white text-slate-700 rounded-lg font-semibold"
            >
              <Camera className="h-4 w-4 mr-2" />
              Edit Cover
            </Button>
          </div>

          {/* Enhanced Company Section */}
          <div className="relative px-8 pb-8">
            <div className="flex flex-col lg:flex-row lg:items-end lg:space-x-8">
              {/* Company Logo */}
              <div className="relative mb-6 lg:mb-0 -mt-16">
                <Avatar className="h-36 w-36 border-4 border-white shadow-xl">
                  <AvatarImage src="/company-logo.png" alt="TechCorp Inc" />
                  <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-primary-navy to-[#0056B3] text-white">TC</AvatarFallback>
                </Avatar>
                <Button
                  size="icon"
                  variant="secondary"
                  className="absolute bottom-2 right-2 h-10 w-10 rounded-full bg-white shadow-lg hover:shadow-xl border-2 border-slate-100"
                >
                  <Edit className="h-4 w-4" />
                </Button>
              </div>

              {/* Company Info */}
              <div className="flex-1 mt-8">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                  <div className="mb-4 lg:mb-0">
                    <div className="flex items-center space-x-3 mb-2">
                      <h1 className="text-3xl font-bold text-primary-navy">TechCorp Inc</h1>
                      <Verified className="h-6 w-6 text-[#0056B3]" />
                      <Badge className="bg-green-50 text-green-700 border-green-200 font-bold text-xs">
                        Verified Company
                      </Badge>
                    </div>
                    <p className="text-xl font-semibold text-slate-600 mb-2">Leading Technology Solutions Provider</p>
                    <div className="flex items-center text-slate-500 font-semibold">
                      <MapPin className="h-4 w-4 mr-2" />
                      San Francisco, CA • Founded 2015 • 250+ employees
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    <Button variant="outline" className="border-slate-200 hover:border-primary-navy hover:text-primary-navy rounded-lg font-semibold">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                    <Button className="bg-primary-navy hover:bg-primary-navy/90 text-white rounded-lg font-semibold">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Company Profile
                    </Button>
                  </div>
                </div>

                {/* Contact & Links */}
                <div className="flex flex-wrap gap-6 mt-6 text-sm">
                  <a href="mailto:contact@techcorp.com" className="flex items-center text-[#0056B3] hover:text-primary-navy transition-colors font-semibold">
                    <Mail className="h-4 w-4 mr-2" />
                    contact@techcorp.com
                  </a>
                  <div className="flex items-center text-slate-500 font-semibold">
                    <Phone className="h-4 w-4 mr-2" />
                    (555) 987-6543
                  </div>
                  <a href="https://techcorp.com" target="_blank" rel="noopener noreferrer" className="flex items-center text-[#0056B3] hover:text-primary-navy transition-colors font-semibold">
                    <Globe className="h-4 w-4 mr-2" />
                    techcorp.com
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </a>
                </div>

                {/* Enhanced Stats */}
                <div className="flex flex-wrap gap-8 mt-6">
                  <div className="flex items-center space-x-2">
                    <Users className="h-5 w-5 text-[#0056B3]" />
                    <div>
                      <span className="font-bold text-lg text-primary-navy">250+</span>
                      <span className="text-slate-500 font-semibold ml-1">employees</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Eye className="h-5 w-5 text-[#0056B3]" />
                    <div>
                      <span className="font-bold text-lg text-primary-navy">5,234</span>
                      <span className="text-slate-500 font-semibold ml-1">profile views</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Star className="h-5 w-5 text-yellow-500" />
                    <div>
                      <span className="font-bold text-lg text-primary-navy">4.8</span>
                      <span className="text-slate-500 font-semibold ml-1">company rating</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5 text-green-500" />
                    <div>
                      <span className="font-bold text-lg text-primary-navy">$50M</span>
                      <span className="text-slate-500 font-semibold ml-1">total funding</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Enhanced About Section */}
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between border-b border-slate-100 pb-4">
              <h2 className="text-2xl font-bold text-primary-navy">About TechCorp</h2>
              <Button variant="ghost" size="icon" className="text-slate-400 hover:text-primary-navy hover:bg-primary-navy/5 rounded-full">
                <Edit className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-slate-600 font-semibold leading-relaxed text-lg mb-4">
                TechCorp Inc is a leading technology solutions provider specializing in enterprise software development, 
                cloud infrastructure, and AI-powered solutions. We serve Fortune 500 companies worldwide, helping them 
                transform their digital capabilities and achieve sustainable growth.
              </p>
              <p className="text-slate-600 font-semibold leading-relaxed text-lg">
                Founded in 2015, we've grown from a small startup to a globally recognized technology company with offices 
                in San Francisco, New York, and London. Our mission is to democratize access to cutting-edge technology 
                and empower businesses to thrive in the digital age.
              </p>
              <div className="flex flex-wrap gap-2 mt-6">
                <Badge className="bg-[#0056B3]/10 text-[#0056B3] border-[#0056B3]/20 font-bold">Actively hiring</Badge>
                <Badge className="bg-green-50 text-green-700 border-green-200 font-bold">Remote-first</Badge>
                <Badge className="bg-purple-50 text-purple-700 border-purple-200 font-bold">Series C</Badge>
                <Badge className="bg-yellow-50 text-yellow-700 border-yellow-200 font-bold">B Corp Certified</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Company Details */}
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between border-b border-slate-100 pb-4">
              <h2 className="text-2xl font-bold text-primary-navy">Company Details</h2>
              <Button variant="ghost" size="icon" className="text-slate-400 hover:text-primary-navy hover:bg-primary-navy/5 rounded-full">
                <Edit className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 mb-2">Industry</h3>
                    <p className="text-slate-600 font-semibold">Technology, Software Development</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 mb-2">Company Size</h3>
                    <p className="text-slate-600 font-semibold">201-500 employees</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 mb-2">Company Type</h3>
                    <p className="text-slate-600 font-semibold">Private Company</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 mb-2">Founded</h3>
                    <p className="text-slate-600 font-semibold">2015</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 mb-2">Headquarters</h3>
                    <p className="text-slate-600 font-semibold">San Francisco, California, USA</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 mb-2">Funding Stage</h3>
                    <p className="text-slate-600 font-semibold">Series C</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 mb-2">Total Funding</h3>
                    <p className="text-slate-600 font-semibold">$50.2M</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 mb-2">Specialties</h3>
                    <p className="text-slate-600 font-semibold">Cloud Computing, AI/ML, Enterprise Software</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Open Positions */}
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between border-b border-slate-100 pb-4">
              <h2 className="text-2xl font-bold text-primary-navy">Open Positions</h2>
              <Button variant="ghost" size="icon" className="text-slate-400 hover:text-primary-navy hover:bg-primary-navy/5 rounded-full">
                <Plus className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-slate-200 rounded-xl hover:border-primary-navy/30 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 bg-gradient-to-br from-primary-navy to-[#0056B3] rounded-lg flex items-center justify-center">
                      <Briefcase className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-primary-navy">Senior Software Engineer</h3>
                      <p className="text-slate-600 font-semibold text-sm">Engineering • Full-time • San Francisco, CA</p>
                      <p className="text-slate-500 font-semibold text-xs">Posted 2 days ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-green-50 text-green-700 border-green-200 font-bold text-xs">12 applicants</Badge>
                    <Button size="sm" variant="outline" className="border-primary-navy text-primary-navy hover:bg-primary-navy hover:text-white rounded-lg font-bold text-xs">
                      View Details
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border border-slate-200 rounded-xl hover:border-primary-navy/30 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 bg-gradient-to-br from-purple-600 to-purple-700 rounded-lg flex items-center justify-center">
                      <Users className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-primary-navy">Product Manager</h3>
                      <p className="text-slate-600 font-semibold text-sm">Product • Full-time • Remote</p>
                      <p className="text-slate-500 font-semibold text-xs">Posted 5 days ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-yellow-50 text-yellow-700 border-yellow-200 font-bold text-xs">24 applicants</Badge>
                    <Button size="sm" variant="outline" className="border-primary-navy text-primary-navy hover:bg-primary-navy hover:text-white rounded-lg font-bold text-xs">
                      View Details
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border border-slate-200 rounded-xl hover:border-primary-navy/30 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 bg-gradient-to-br from-green-600 to-green-700 rounded-lg flex items-center justify-center">
                      <Target className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-primary-navy">UX Designer</h3>
                      <p className="text-slate-600 font-semibold text-sm">Design • Full-time • New York, NY</p>
                      <p className="text-slate-500 font-semibold text-xs">Posted 1 week ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-blue-50 text-blue-700 border-blue-200 font-bold text-xs">8 applicants</Badge>
                    <Button size="sm" variant="outline" className="border-primary-navy text-primary-navy hover:bg-primary-navy hover:text-white rounded-lg font-bold text-xs">
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="text-center pt-4">
                <Button variant="outline" className="border-primary-navy text-primary-navy hover:bg-primary-navy hover:text-white rounded-lg font-bold">
                  View All Open Positions (12)
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Company Culture & Values */}
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between border-b border-slate-100 pb-4">
              <h2 className="text-2xl font-bold text-primary-navy">Culture & Values</h2>
              <Button variant="ghost" size="icon" className="text-slate-400 hover:text-primary-navy hover:bg-primary-navy/5 rounded-full">
                <Edit className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center mt-1">
                      <Users className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-primary-navy mb-1">Collaboration</h3>
                      <p className="text-slate-600 font-semibold text-sm">We believe great things happen when diverse minds work together</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="h-10 w-10 bg-green-100 rounded-lg flex items-center justify-center mt-1">
                      <TrendingUp className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-primary-navy mb-1">Innovation</h3>
                      <p className="text-slate-600 font-semibold text-sm">Pushing boundaries and challenging the status quo</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="h-10 w-10 bg-purple-100 rounded-lg flex items-center justify-center mt-1">
                      <Award className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-primary-navy mb-1">Excellence</h3>
                      <p className="text-slate-600 font-semibold text-sm">Delivering exceptional quality in everything we do</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="h-10 w-10 bg-yellow-100 rounded-lg flex items-center justify-center mt-1">
                      <Globe className="h-5 w-5 text-yellow-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-primary-navy mb-1">Impact</h3>
                      <p className="text-slate-600 font-semibold text-sm">Making a positive difference in the world</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* Admin Contact */}
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="border-b border-slate-100 pb-4">
              <h2 className="text-xl font-bold text-primary-navy">Admin Contact</h2>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-4 mb-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src="/admin-avatar.png" alt="Sarah Chen" />
                  <AvatarFallback className="bg-primary-navy text-white font-bold">SC</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-bold text-primary-navy">Sarah Chen</h3>
                  <p className="text-slate-600 font-semibold text-sm">Chief Human Resources Officer</p>
                  <a href="mailto:sarah.chen@techcorp.com" className="text-[#0056B3] hover:text-primary-navy font-semibold text-sm">
                    sarah.chen@techcorp.com
                  </a>
                </div>
              </div>
              <Button className="w-full bg-primary-navy hover:bg-primary-navy/90 text-white rounded-lg font-bold">
                <Mail className="h-4 w-4 mr-2" />
                Contact Admin
              </Button>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="border-b border-slate-100 pb-4">
              <h2 className="text-xl font-bold text-primary-navy">Quick Stats</h2>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-600">Active Job Posts</span>
                <span className="font-bold text-primary-navy">12</span>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-600">Total Applications</span>
                <span className="font-bold text-primary-navy">156</span>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-600">Response Rate</span>
                <span className="font-bold text-green-600">89%</span>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-600">Avg. Response Time</span>
                <span className="font-bold text-primary-navy">2.3 days</span>
              </div>
            </CardContent>
          </Card>

          {/* Company Links */}
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between border-b border-slate-100 pb-4">
              <h2 className="text-xl font-bold text-primary-navy">Company Links</h2>
              <Button variant="ghost" size="icon" className="text-slate-400 hover:text-primary-navy hover:bg-primary-navy/5 rounded-full">
                <Plus className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <a href="https://techcorp.com" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 border border-slate-200 rounded-lg hover:border-primary-navy/30 transition-colors group">
                <div className="flex items-center space-x-3">
                  <div className="h-8 w-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Globe className="h-4 w-4 text-blue-600" />
                  </div>
                  <span className="font-semibold text-slate-700 group-hover:text-primary-navy">Website</span>
                </div>
                <ExternalLink className="h-4 w-4 text-slate-400 group-hover:text-primary-navy" />
              </a>

              <a href="https://linkedin.com/company/techcorp" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 border border-slate-200 rounded-lg hover:border-primary-navy/30 transition-colors group">
                <div className="flex items-center space-x-3">
                  <div className="h-8 w-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <LinkIcon className="h-4 w-4 text-blue-600" />
                  </div>
                  <span className="font-semibold text-slate-700 group-hover:text-primary-navy">LinkedIn</span>
                </div>
                <ExternalLink className="h-4 w-4 text-slate-400 group-hover:text-primary-navy" />
              </a>

              <a href="https://github.com/techcorp" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 border border-slate-200 rounded-lg hover:border-primary-navy/30 transition-colors group">
                <div className="flex items-center space-x-3">
                  <div className="h-8 w-8 bg-gray-100 rounded-lg flex items-center justify-center">
                    <FileText className="h-4 w-4 text-gray-600" />
                  </div>
                  <span className="font-semibold text-slate-700 group-hover:text-primary-navy">GitHub</span>
                </div>
                <ExternalLink className="h-4 w-4 text-slate-400 group-hover:text-primary-navy" />
              </a>
            </CardContent>
          </Card>

          {/* Company Settings */}
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="border-b border-slate-100 pb-4">
              <h2 className="text-xl font-bold text-primary-navy">Settings</h2>
            </CardHeader>
            <CardContent className="pt-6 space-y-3">
              <Button variant="outline" className="w-full justify-start border-slate-200 hover:border-primary-navy hover:text-primary-navy rounded-lg font-semibold">
                <Settings className="h-4 w-4 mr-3" />
                Account Settings
              </Button>
              <Button variant="outline" className="w-full justify-start border-slate-200 hover:border-primary-navy hover:text-primary-navy rounded-lg font-semibold">
                <Users className="h-4 w-4 mr-3" />
                Team Management
              </Button>
              <Link href="/company-billing">
                <Button variant="outline" className="w-full justify-start border-slate-200 hover:border-primary-navy hover:text-primary-navy rounded-lg font-semibold">
                  <DollarSign className="h-4 w-4 mr-3" />
                  Billing & Subscription
                </Button>
              </Link>
              <Button variant="outline" className="w-full justify-start border-slate-200 hover:border-primary-navy hover:text-primary-navy rounded-lg font-semibold">
                <History className="h-4 w-4 mr-3" />
                Activity History
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 