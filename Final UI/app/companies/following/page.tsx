"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Filter, MapPin, Users, Building2, Star, TrendingUp, Award, ArrowLeft, Heart, Eye, EyeOff, Bookmark, Calendar, Globe, Bell, BellOff, UserMinus, Briefcase } from "lucide-react"
import Link from "next/link"

const followingCompanies = [
  {
    id: 1,
    name: "100Networks",
    industry: "Internet & Software",
    followers: "2.08M",
    location: "San Francisco, CA",
    employees: "250 - 1,000",
    type: "Private",
    logo: null,
    logoFallback: "1N",
    isFollowing: true,
    isVerified: true,
    description: "Professional networking platform following talent with opportunities",
    openJobs: 47,
    rating: 4.8,
    followedDate: "2024-01-15",
    hasNotifications: true,
    lastUpdate: "Posted 5 new jobs",
    updateTime: "2 hours ago"
  },
  {
    id: 2,
    name: "Amazon",
    industry: "Internet & Software",
    followers: "145K",
    location: "Seattle, WA",
    employees: "25,000+",
    type: "Public",
    logo: "/placeholder.svg?height=48&width=48&query=amazon logo",
    isFollowing: true,
    isVerified: true,
    description: "Leading e-commerce and cloud computing company",
    openJobs: 235,
    rating: 4.2,
    followedDate: "2024-01-10",
    hasNotifications: true,
    lastUpdate: "Updated company culture page",
    updateTime: "1 day ago"
  },
  {
    id: 3,
    name: "Microsoft",
    industry: "Internet & Software",
    followers: "89.3K",
    location: "Redmond, WA",
    employees: "25,000+",
    type: "Public",
    logo: "/placeholder.svg?height=48&width=48&query=microsoft logo",
    isFollowing: true,
    isVerified: true,
    description: "Empowering every person and organization on the planet to achieve more",
    openJobs: 198,
    rating: 4.4,
    followedDate: "2024-02-01",
    hasNotifications: false,
    lastUpdate: "Shared quarterly results",
    updateTime: "3 days ago"
  }
]

const recentActivity = [
  {
    id: 1,
    companyName: "100Networks",
    companyLogo: null,
    companyLogoFallback: "1N",
    activity: "Posted 5 new software engineering positions",
    time: "2 hours ago",
    type: "job_posting"
  },
  {
    id: 2,
    companyName: "Amazon",
    companyLogo: "/placeholder.svg?height=32&width=32&query=amazon logo",
    activity: "Updated their company culture and values page",
    time: "1 day ago",
    type: "company_update"
  },
  {
    id: 3,
    companyName: "Microsoft",
    companyLogo: "/placeholder.svg?height=32&width=32&query=microsoft logo",
    activity: "Shared Q4 2024 earnings report",
    time: "3 days ago",
    type: "announcement"
  },
  {
    id: 4,
    companyName: "100Networks",
    companyLogo: null,
    companyLogoFallback: "1N",
    activity: "Won 'Best Workplace 2024' award",
    time: "1 week ago",
    type: "achievement"
  }
]

export default function FollowingCompaniesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("recently-followed")
  const [activeTab, setActiveTab] = useState("companies")

  const filteredCompanies = followingCompanies.filter(company =>
    company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    company.industry.toLowerCase().includes(searchQuery.toLowerCase()) ||
    company.location.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleUnfollow = (companyId: number) => {
    // Handle unfollowing logic here
    console.log(`Unfollowed company ${companyId}`)
  }

  const toggleNotifications = (companyId: number) => {
    // Handle notification toggle logic here
    console.log(`Toggled notifications for company ${companyId}`)
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'job_posting':
        return <Briefcase className="h-4 w-4 text-blue-500" />
      case 'company_update':
        return <Building2 className="h-4 w-4 text-green-500" />
      case 'announcement':
        return <Bell className="h-4 w-4 text-purple-500" />
      case 'achievement':
        return <Award className="h-4 w-4 text-yellow-500" />
      default:
        return <Globe className="h-4 w-4 text-slate-500" />
    }
  }

  return (
    <div className="max-w-[65%] mx-auto py-8 px-4">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <Link href="/employers">
            <Button
              variant="outline"
              size="icon"
              className="border-primary-navy text-primary-navy hover:bg-primary-navy hover:text-white rounded-xl font-subheading"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
        </div>
        <h1 className="text-4xl font-heading text-primary-navy mb-3">Following Companies</h1>
        <p className="text-slate-600 font-subheading text-lg">Companies you're following and their latest updates</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="border-slate-200 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-subheading text-slate-500">Total Following</p>
                <p className="text-2xl font-heading text-primary-navy">{followingCompanies.length}</p>
              </div>
              <Eye className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-slate-200 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-subheading text-slate-500">With Notifications</p>
                <p className="text-2xl font-heading text-green-600">{followingCompanies.filter(c => c.hasNotifications).length}</p>
              </div>
              <Bell className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-slate-200 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-subheading text-slate-500">Open Positions</p>
                <p className="text-2xl font-heading text-orange-600">{followingCompanies.reduce((sum, c) => sum + c.openJobs, 0)}</p>
              </div>
              <Briefcase className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-slate-200 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-subheading text-slate-500">Recent Updates</p>
                <p className="text-2xl font-heading text-purple-600">{recentActivity.length}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs for Companies and Activity */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="companies" className="font-subheading">Companies ({followingCompanies.length})</TabsTrigger>
          <TabsTrigger value="activity" className="font-subheading">Recent Activity ({recentActivity.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="companies" className="space-y-8">
          {/* Search and Filters */}
          <Card className="border-slate-200 shadow-sm">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <Input 
                    placeholder="Search following companies..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 h-12 border-slate-200 focus:border-primary-navy focus:ring-primary-navy/10 font-subheading rounded-xl"
                  />
                </div>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[200px] h-12 border-slate-200 focus:border-primary-navy rounded-xl font-subheading">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="recently-followed" className="font-subheading">Recently Followed</SelectItem>
                    <SelectItem value="name" className="font-subheading">Company Name</SelectItem>
                    <SelectItem value="rating" className="font-subheading">Highest Rated</SelectItem>
                    <SelectItem value="jobs" className="font-subheading">Most Jobs</SelectItem>
                    <SelectItem value="activity" className="font-subheading">Most Active</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Companies List */}
          <div className="space-y-4">
            {filteredCompanies.length === 0 ? (
              <Card className="border-slate-200 shadow-sm">
                <CardContent className="p-12 text-center">
                  <Eye className="h-16 w-16 mx-auto text-slate-300 mb-4" />
                  <h3 className="text-xl font-heading text-slate-600 mb-2">No companies found</h3>
                  <p className="text-slate-500 font-subheading mb-6">
                    {searchQuery ? "Try adjusting your search terms" : "Start following companies to see them here"}
                  </p>
                  <Link href="/employers">
                    <Button className="bg-primary-navy hover:bg-primary-navy/90 text-white rounded-lg font-subheading">
                      Browse Companies
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              filteredCompanies.map((company) => (
                <Card key={company.id} className="border-slate-200 hover:shadow-lg hover:border-primary-navy/30 transition-all duration-200 group">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-4 mb-4">
                          <div className="relative">
                            {company.logo ? (
                              <div className="w-16 h-16 rounded-xl overflow-hidden border border-slate-200 flex-shrink-0">
                                <img src={company.logo} alt={company.name} className="w-full h-full object-cover" />
                              </div>
                            ) : (
                              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary-navy to-[#0056B3] flex items-center justify-center text-white font-heading text-lg">
                                {company.logoFallback}
                              </div>
                            )}
                            {company.isVerified && (
                              <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                                <Award className="h-3 w-3 text-white" />
                              </div>
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <h2 className="text-xl font-heading text-primary-navy group-hover:text-primary-navy transition-colors">
                                {company.name}
                              </h2>
                              {company.isVerified && (
                                <Badge className="bg-green-50 text-green-700 border-green-200 font-subheading text-xs">
                                  Verified
                                </Badge>
                              )}
                              <Eye className="h-4 w-4 text-blue-500" />
                              {company.hasNotifications && (
                                <Badge className="bg-blue-50 text-blue-700 border-blue-200 font-subheading text-xs">
                                  <Bell className="h-3 w-3 mr-1" />
                                  Notifications On
                                </Badge>
                              )}
                            </div>
                            <p className="text-slate-600 font-subheading leading-relaxed mb-3">
                              {company.description}
                            </p>
                            <div className="flex items-center space-x-4 text-sm text-slate-500 mb-2">
                              <div className="flex items-center space-x-1">
                                <Building2 className="h-4 w-4" />
                                <span className="font-subheading">{company.industry}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <MapPin className="h-4 w-4" />
                                <span className="font-subheading">{company.location}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Users className="h-4 w-4" />
                                <span className="font-subheading">{company.employees}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Calendar className="h-4 w-4" />
                                <span className="font-subheading">Following since {new Date(company.followedDate).toLocaleDateString()}</span>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2 text-sm">
                              <div className="flex items-center space-x-1 text-green-600">
                                <TrendingUp className="h-3 w-3" />
                                <span className="font-subheading">{company.lastUpdate}</span>
                              </div>
                              <span className="text-slate-400">•</span>
                              <span className="text-slate-500 font-subheading">{company.updateTime}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-6">
                            <div className="flex items-center space-x-1 text-slate-500">
                              <TrendingUp className="h-4 w-4" />
                              <span className="font-subheading text-sm">{company.followers} followers</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Star className="h-4 w-4 text-yellow-500" />
                              <span className="font-subheading text-sm text-slate-600">{company.rating}</span>
                            </div>
                            <Badge className="bg-slate-100 text-slate-700 font-subheading">
                              {company.type}
                            </Badge>
                            <span className="text-sm text-slate-500 font-subheading">
                              {company.openJobs} open positions
                            </span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-slate-200 hover:border-primary-navy hover:text-primary-navy rounded-lg font-subheading"
                            >
                              View Jobs
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => toggleNotifications(company.id)}
                              className={company.hasNotifications 
                                ? "border-blue-200 text-blue-600 hover:border-blue-300 hover:bg-blue-50 rounded-lg font-subheading" 
                                : "border-slate-200 hover:border-blue-300 hover:text-blue-600 rounded-lg font-subheading"
                              }
                            >
                              {company.hasNotifications ? (
                                <>
                                  <BellOff className="h-4 w-4 mr-1" />
                                  Mute
                                </>
                              ) : (
                                <>
                                  <Bell className="h-4 w-4 mr-1" />
                                  Notify
                                </>
                              )}
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleUnfollow(company.id)}
                              className="border-red-200 text-red-600 hover:border-red-300 hover:bg-red-50 rounded-lg font-subheading"
                            >
                              <UserMinus className="h-4 w-4 mr-1" />
                              Unfollow
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="activity" className="space-y-6">
          <Card className="border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-heading text-primary-navy">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-4 p-4 rounded-lg border border-slate-100 hover:border-slate-200 transition-colors">
                  <div className="flex-shrink-0">
                    {activity.companyLogo ? (
                      <div className="w-10 h-10 rounded-lg overflow-hidden border border-slate-200">
                        <img src={activity.companyLogo} alt={activity.companyName} className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-navy to-[#0056B3] flex items-center justify-center text-white font-heading text-sm">
                        {activity.companyLogoFallback}
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-subheading font-medium text-primary-navy">{activity.companyName}</span>
                      {getActivityIcon(activity.type)}
                    </div>
                    <p className="text-slate-600 font-subheading text-sm mb-1">{activity.activity}</p>
                    <p className="text-slate-400 font-subheading text-xs">{activity.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Quick Actions */}
      <div className="mt-12 text-center">
        <div className="flex justify-center space-x-4">
          <Link href="/employers">
            <Button 
              variant="outline" 
              size="lg"
              className="border-slate-200 hover:border-primary-navy hover:text-primary-navy rounded-xl font-subheading px-8"
            >
              <Bookmark className="h-4 w-4 mr-2" />
              Find More Companies
            </Button>
          </Link>
          <Link href="/companies/starred">
            <Button 
              variant="outline" 
              size="lg"
              className="border-slate-200 hover:border-primary-navy hover:text-primary-navy rounded-xl font-subheading px-8"
            >
              <Heart className="h-4 w-4 mr-2" />
              View Starred
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
} 