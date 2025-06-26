"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Search, Filter, MapPin, Users, Building2, Star, TrendingUp, Award, ArrowLeft, Heart, HeartOff, Eye, Bookmark, Calendar, Globe } from "lucide-react"
import Link from "next/link"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

const starredCompanies = [
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
    starredDate: "2024-01-15"
  },
  {
    id: 2,
    name: "Google",
    industry: "Internet & Software",
    followers: "71.6K",
    location: "Mountain View, CA",
    employees: "25,000+",
    type: "Public",
    logo: "/placeholder.svg?height=48&width=48&query=google logo",
    isFollowing: false,
    isVerified: true,
    description: "Organizing the world's information and making it universally accessible",
    openJobs: 156,
    rating: 4.5,
    starredDate: "2024-01-20"
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
    isFollowing: false,
    isVerified: true,
    description: "Empowering every person and organization on the planet to achieve more",
    openJobs: 198,
    rating: 4.4,
    starredDate: "2024-02-01"
  },
  {
    id: 4,
    name: "FactSet",
    industry: "Financial Services",
    followers: "5.35K",
    location: "Norwalk, CT",
    employees: "10,000 - 25,000",
    type: "Public",
    logo: "/placeholder.svg?height=48&width=48&query=factset logo",
    isFollowing: false,
    isVerified: true,
    description: "Financial data and software solutions for investment professionals",
    openJobs: 32,
    rating: 4.1,
    starredDate: "2024-02-10"
  }
]

export default function StarredCompaniesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("recently-starred")
  const [activeTab, setActiveTab] = useState('starred')

  const filteredCompanies = starredCompanies.filter(company =>
    company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    company.industry.toLowerCase().includes(searchQuery.toLowerCase()) ||
    company.location.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleUnstar = (companyId: number) => {
    // Handle unstarring logic here
    console.log(`Unstarred company ${companyId}`)
  }

  return (
    <div className="min-h-screen">
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
          <h1 className="text-4xl font-heading text-primary-navy mb-3">Starred Companies</h1>
          <p className="text-slate-600 font-subheading text-xl">
            Manage your starred companies and follow their updates
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-heading text-primary-navy flex items-center">
                <Star className="h-5 w-5 mr-2" />
                Starred Companies
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-slate-500 font-subheading text-center py-3">
                <p className="text-2xl font-heading text-primary-navy">24</p>
                <p>Companies you've starred</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-heading text-primary-navy flex items-center">
                <Users className="h-5 w-5 mr-2" />
                Following
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-slate-500 font-subheading text-center py-3">
                <p className="text-2xl font-heading text-primary-navy">12</p>
                <p>Companies you follow</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <div className="mt-12 text-center">
          <div className="flex gap-4">
            <Button
              variant="outline"
              className="border-primary-navy text-primary-navy hover:bg-primary-navy hover:text-white rounded-xl font-subheading focus:bg-primary-navy focus:text-white focus:ring-0 focus:outline-none"
              onClick={() => setActiveTab('starred')}
            >
              Starred Companies
            </Button>
            <Button
              variant="outline"
              className="border-primary-navy text-primary-navy hover:bg-primary-navy hover:text-white rounded-xl font-subheading focus:bg-primary-navy focus:text-white focus:ring-0 focus:outline-none"
              onClick={() => setActiveTab('following')}
            >
              Following
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="mt-8">
          {/* Search and Filter Bar */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="px-3 py-1 border-primary-navy text-primary-navy bg-primary-navy/5 rounded-lg font-subheading text-sm px-3 py-1">
                All
              </Badge>
              <Badge variant="outline" className="px-3 py-1 border-slate-200 text-slate-600 hover:border-primary-navy hover:text-primary-navy rounded-lg font-subheading cursor-pointer transition-all duration-200">
                Technology
              </Badge>
              <Badge variant="outline" className="px-3 py-1 border-slate-200 text-slate-600 hover:border-primary-navy hover:text-primary-navy rounded-lg font-subheading cursor-pointer transition-all duration-200">
                Finance
              </Badge>
              <Badge variant="outline" className="px-3 py-1 border-slate-200 text-slate-600 hover:border-primary-navy hover:text-primary-navy rounded-lg font-subheading cursor-pointer transition-all duration-200">
                Healthcare
              </Badge>
              <Badge variant="outline" className="px-3 py-1 border-slate-200 text-slate-600 hover:border-primary-navy hover:text-primary-navy rounded-lg font-subheading cursor-pointer transition-all duration-200">
                Education
              </Badge>
              <Badge variant="outline" className="px-3 py-1 border-slate-200 text-slate-600 hover:border-primary-navy hover:text-primary-navy rounded-lg font-subheading cursor-pointer transition-all duration-200">
                Retail
              </Badge>
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40 h-10 border-slate-200 focus:border-primary-navy rounded-lg font-subheading focus:ring-0 focus:outline-none">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent className="rounded-lg border-primary-navy">
                <SelectItem value="recently-starred" className="border-primary-navy text-primary-navy hover:bg-primary-navy hover:text-white rounded-xl font-subheading focus:bg-primary-navy focus:text-white">Recently Starred</SelectItem>
                <SelectItem value="name" className="border-primary-navy text-primary-navy hover:bg-primary-navy hover:text-white rounded-xl font-subheading focus:bg-primary-navy focus:text-white">Company Name</SelectItem>
                <SelectItem value="rating" className="border-primary-navy text-primary-navy hover:bg-primary-navy hover:text-white rounded-xl font-subheading focus:bg-primary-navy focus:text-white">Highest Rated</SelectItem>
                <SelectItem value="jobs" className="border-primary-navy text-primary-navy hover:bg-primary-navy hover:text-white rounded-xl font-subheading focus:bg-primary-navy focus:text-white">Most Jobs</SelectItem>
                <SelectItem value="followers" className="border-primary-navy text-primary-navy hover:bg-primary-navy hover:text-white rounded-xl font-subheading focus:bg-primary-navy focus:text-white">Most Followers</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Company Cards Grid */}
          <div className="grid grid-cols-1 gap-6">
            {starredCompanies.map((company) => (
              <Card key={company.id} className="border-slate-200 hover:border-primary-navy transition-colors duration-200">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={company.logo} alt={company.name} />
                        <AvatarFallback className="bg-primary-navy text-white font-heading text-xl">
                          {company.logoFallback}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="text-xl font-heading text-primary-navy mb-1">{company.name}</h3>
                        <p className="text-slate-600 font-subheading mb-2">{company.industry}</p>
                        <div className="flex items-center space-x-4 text-slate-500 font-subheading">
                          <div className="flex items-center space-x-1">
                            <MapPin className="h-4 w-4" />
                            <span>{company.location}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Users className="h-4 w-4" />
                            <span>{company.employees}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4" />
                            <span>{company.rating} rating</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Button
                        variant="outline"
                        className="border-primary-navy text-primary-navy hover:bg-primary-navy hover:text-white rounded-xl font-subheading"
                        onClick={() => handleUnstar(company.id)}
                      >
                        <HeartOff className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 