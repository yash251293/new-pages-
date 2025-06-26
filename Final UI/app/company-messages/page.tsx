"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Search, 
  MoreHorizontal, 
  Circle, 
  Star, 
  Archive, 
  Trash2, 
  Filter,
  Users,
  Building,
  Briefcase,
  MessageSquare,
  Clock,
  CheckCircle,
  AlertCircle,
  PlusCircle
} from "lucide-react"

export default function CompanyMessagesPage() {
  return (
    <div className="min-h-full">
      <div className="w-[65%] mx-auto py-6">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-primary-navy mb-2">Messages</h1>
            <p className="text-lg font-semibold text-slate-600">
              Manage communications with candidates, freelancers, and business partners
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Button className="bg-primary-navy hover:bg-primary-navy/90 text-white rounded-lg font-bold text-sm">
              <PlusCircle className="h-4 w-4 mr-2" />
              New Message
            </Button>
            <Button variant="outline" size="sm" className="rounded-lg border-slate-200 text-slate-600 hover:border-primary-navy/30 hover:text-primary-navy font-bold text-sm">
              <Archive className="h-4 w-4 mr-2" />
              Archive
            </Button>
            <Button variant="outline" size="sm" className="rounded-lg border-slate-200 text-slate-600 hover:border-primary-navy/30 hover:text-primary-navy font-bold text-sm">
              <Star className="h-4 w-4 mr-2" />
              Starred
            </Button>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="flex gap-4 mb-6">
          <Card className="flex-1 border-0 shadow-sm rounded-xl bg-white">
            <CardContent className="p-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                <Input 
                  placeholder="Search conversations, candidates, or companies..." 
                  className="pl-12 pr-4 py-3 border-slate-200 focus:border-primary-navy/30 focus:ring-primary-navy/10 rounded-xl font-semibold text-sm"
                />
              </div>
            </CardContent>
          </Card>
          <Button variant="outline" className="px-6 border-slate-200 text-slate-600 hover:border-primary-navy hover:text-primary-navy rounded-xl font-bold text-sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>

        {/* Message Categories */}
        <div className="flex space-x-2 mb-6">
          <Button className="bg-primary-navy text-white rounded-lg font-bold text-sm">
            All Messages
          </Button>
          <Button variant="outline" className="border-slate-200 text-slate-600 hover:bg-slate-50 rounded-lg font-bold text-sm">
            <Users className="h-4 w-4 mr-2" />
            Job Applications
          </Button>
          <Button variant="outline" className="border-slate-200 text-slate-600 hover:bg-slate-50 rounded-lg font-bold text-sm">
            <Briefcase className="h-4 w-4 mr-2" />
            Freelance Inquiries
          </Button>
          <Button variant="outline" className="border-slate-200 text-slate-600 hover:bg-slate-50 rounded-lg font-bold text-sm">
            <Building className="h-4 w-4 mr-2" />
            Business Partners
          </Button>
        </div>

        {/* Messages List */}
        <div className="space-y-4">
          {/* Priority Message - New Application */}
          <Card className="border-0 shadow-md hover:shadow-lg transition-all duration-200 rounded-xl bg-white border-l-4 border-l-green-500">
            <CardContent className="p-0">
              <div className="flex items-center space-x-6 p-6 cursor-pointer group">
                <div className="relative">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src="/placeholder.svg?height=64&width=64" alt="Sarah Chen" />
                    <AvatarFallback className="bg-green-100 text-green-600 font-bold text-sm">SC</AvatarFallback>
                  </Avatar>
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white">
                    <Circle className="w-3 h-3 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" fill="currentColor" />
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <h3 className="text-lg font-bold text-primary-navy">Sarah Chen</h3>
                      <Badge className="bg-green-50 text-green-600 border-green-200 font-bold text-xs">
                        New Application
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-semibold text-slate-500 whitespace-nowrap">2 hours ago</span>
                      <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8">
                        <MoreHorizontal className="h-4 w-4 text-slate-400" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-sm font-semibold text-slate-600 mb-2">Senior Full-Stack Developer • 8+ years experience</p>
                  <p className="text-sm font-semibold text-slate-600 leading-relaxed line-clamp-2">
                    Hi! I'm very interested in the Senior Developer position. I have extensive experience with React, Node.js, and cloud architecture. I would love to discuss how my skills can contribute to your team...
                  </p>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center space-x-4">
                      <Badge className="bg-blue-50 text-blue-600 border-blue-200 font-bold text-xs">
                        <Briefcase className="h-3 w-3 mr-1" />
                        Senior Developer Role
                      </Badge>
                      <span className="text-xs font-semibold text-slate-500">3 attachments</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white rounded-lg font-bold text-xs">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Review Application
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-amber-500 hover:bg-amber-50">
                        <Star className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Freelance Inquiry */}
          <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-200 rounded-xl bg-white border-l-4 border-l-blue-500">
            <CardContent className="p-0">
              <div className="flex items-center space-x-6 p-6 cursor-pointer group">
                <div className="relative">
                  <Avatar className="w-16 h-16">
                    <AvatarFallback className="bg-blue-100 text-blue-600 font-bold text-sm">MR</AvatarFallback>
                  </Avatar>
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 rounded-full border-2 border-white">
                    <MessageSquare className="w-3 h-3 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <h3 className="text-lg font-bold text-primary-navy">Marcus Rodriguez</h3>
                      <Badge className="bg-blue-50 text-blue-600 border-blue-200 font-bold text-xs">
                        Freelance Inquiry
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-semibold text-slate-500">Yesterday</span>
                      <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8">
                        <MoreHorizontal className="h-4 w-4 text-slate-400" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-sm font-semibold text-slate-600 mb-2">UI/UX Designer • $65/hr • 4.8★ (35 projects)</p>
                  <p className="text-sm font-semibold text-slate-600 leading-relaxed line-clamp-2">
                    I saw your project posting for mobile app design. I specialize in fintech and healthcare apps with a focus on user experience. I'd love to discuss your project requirements...
                  </p>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center space-x-4">
                      <Badge className="bg-purple-50 text-purple-600 border-purple-200 font-bold text-xs">
                        <Users className="h-3 w-3 mr-1" />
                        Mobile App Project
                      </Badge>
                      <span className="text-xs font-semibold text-slate-500">Portfolio attached</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button size="sm" variant="outline" className="border-blue-500 text-blue-600 hover:bg-blue-50 rounded-lg font-bold text-xs">
                        View Proposal
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-amber-500 hover:bg-amber-50">
                        <Star className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Interview Follow-up */}
          <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-200 rounded-xl bg-white">
            <CardContent className="p-0">
              <div className="flex items-center space-x-6 p-6 cursor-pointer group">
                <Avatar className="w-16 h-16">
                  <AvatarFallback className="bg-slate-100 text-slate-600 font-bold text-sm">AT</AvatarFallback>
                </Avatar>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <h3 className="text-lg font-bold text-primary-navy">Alexandra Thompson</h3>
                      <Badge className="bg-orange-50 text-orange-600 border-orange-200 font-bold text-xs">
                        Interview Follow-up
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-semibold text-slate-500">2 days ago</span>
                      <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8">
                        <MoreHorizontal className="h-4 w-4 text-slate-400" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-sm font-semibold text-slate-600 mb-2">Senior Software Engineer • Interviewed for Lead Developer</p>
                  <p className="text-sm font-semibold text-slate-600 leading-relaxed line-clamp-2">
                    Thank you for the great interview yesterday! I wanted to follow up on the technical discussion we had about microservices architecture...
                  </p>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center space-x-4">
                      <Badge className="bg-slate-100 text-slate-600 font-bold text-xs">
                        <Clock className="h-3 w-3 mr-1" />
                        Interview Complete
                      </Badge>
                      <span className="text-xs font-semibold text-slate-500">Reference list attached</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button size="sm" variant="outline" className="border-slate-300 text-slate-600 hover:bg-slate-50 rounded-lg font-bold text-xs">
                        View Notes
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-red-500 hover:bg-red-50">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Business Partnership */}
          <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-200 rounded-xl bg-white">
            <CardContent className="p-0">
              <div className="flex items-center space-x-6 p-6 cursor-pointer group">
                <Avatar className="w-16 h-16">
                  <AvatarFallback className="bg-indigo-100 text-indigo-600 font-bold text-sm">TC</AvatarFallback>
                </Avatar>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <h3 className="text-lg font-bold text-primary-navy">TechCorp Solutions</h3>
                      <Badge className="bg-indigo-50 text-indigo-600 border-indigo-200 font-bold text-xs">
                        Partnership
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-semibold text-slate-500">1 week ago</span>
                      <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8">
                        <MoreHorizontal className="h-4 w-4 text-slate-400" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-sm font-semibold text-slate-600 mb-2">Strategic Partnership Opportunity • Enterprise Solutions</p>
                  <p className="text-sm font-semibold text-slate-600 leading-relaxed line-clamp-2">
                    We're interested in exploring a strategic partnership for talent acquisition solutions. Our mutual clients could benefit from our combined expertise...
                  </p>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center space-x-4">
                      <Badge className="bg-slate-100 text-slate-600 font-bold text-xs">
                        <Building className="h-3 w-3 mr-1" />
                        Business Development
                      </Badge>
                      <span className="text-xs font-semibold text-slate-500">Proposal document</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button size="sm" variant="outline" className="border-indigo-500 text-indigo-600 hover:bg-indigo-50 rounded-lg font-bold text-xs">
                        Schedule Meeting
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-amber-500 hover:bg-amber-50">
                        <Star className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Urgent Message */}
          <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-200 rounded-xl bg-white border-l-4 border-l-red-500">
            <CardContent className="p-0">
              <div className="flex items-center space-x-6 p-6 cursor-pointer group">
                <div className="relative">
                  <Avatar className="w-16 h-16">
                    <AvatarFallback className="bg-red-100 text-red-600 font-bold text-sm">JD</AvatarFallback>
                  </Avatar>
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full border-2 border-white">
                    <AlertCircle className="w-3 h-3 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <h3 className="text-lg font-bold text-primary-navy">Jennifer Davis</h3>
                      <Badge className="bg-red-50 text-red-600 border-red-200 font-bold text-xs">
                        Urgent
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-semibold text-slate-500">3 days ago</span>
                      <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8">
                        <MoreHorizontal className="h-4 w-4 text-slate-400" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-sm font-semibold text-slate-600 mb-2">Project Manager • Existing Client</p>
                  <p className="text-sm font-semibold text-slate-600 leading-relaxed line-clamp-2">
                    We need to discuss the project timeline urgently. There have been some changes in requirements that affect our delivery schedule. Can we schedule a call ASAP?
                  </p>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center space-x-4">
                      <Badge className="bg-red-50 text-red-600 border-red-200 font-bold text-xs">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        Timeline Issue
                      </Badge>
                      <span className="text-xs font-semibold text-slate-500">Requires response</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold text-xs">
                        Respond Now
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-red-500 hover:bg-red-50">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer Message */}
        <Card className="border-0 shadow-sm rounded-xl bg-gradient-to-r from-primary-navy to-[#0056B3] text-white mt-8">
          <CardContent className="p-6">
            <div className="text-center">
              <h3 className="text-lg font-bold mb-2">Professional Communication Hub</h3>
              <p className="text-white/80 text-sm font-semibold leading-relaxed">
                Streamline your talent acquisition and business communications. Respond promptly to maintain professional relationships.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}