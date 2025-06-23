"use client"

import type React from "react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { BookmarkIcon, Heart, MessageCircle, MoreHorizontal, X, Send, ImageIcon, Plus, Smile, AtSign, Hash, Building, TrendingUp, Award, Users, Share } from "lucide-react"
import { useState } from "react"

export default function CompanyFeedPage() {
  const [postText, setPostText] = useState("")
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handlePost = () => {
    // Handle posting logic here
    console.log("Posting:", { text: postText, image: selectedImage })
    setPostText("")
    setSelectedImage(null)
    setIsDialogOpen(false)
  }

  const removeImage = () => {
    setSelectedImage(null)
  }

  return (
    <div className="min-h-full">
      <div className="w-[65%] mx-auto py-6">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-primary-navy mb-2">Feed</h1>
            <p className="text-lg font-semibold text-slate-600">
              Connect with the professional community and share your company updates
            </p>
          </div>
          
          {/* New Post Button */}
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button 
                className="bg-primary-navy hover:bg-primary-navy/90 text-white rounded-lg px-6 py-2 shadow-lg hover:shadow-xl transition-all duration-200 font-bold text-sm"
              >
                <Plus className="h-4 w-4 mr-2" />
                New Post
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] p-0 bg-white rounded-2xl shadow-2xl border-0">
              <DialogHeader className="p-6 pb-4 border-b border-slate-100">
                <DialogTitle className="text-lg font-bold text-primary-navy">Create a Company Post</DialogTitle>
              </DialogHeader>
              
              <div className="p-6">
                <div className="flex space-x-4 mb-4">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="bg-primary-navy text-white font-bold">C</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <Textarea
                      placeholder="Share company updates, job openings, or industry insights..."
                      value={postText}
                      onChange={(e) => setPostText(e.target.value)}
                      className="min-h-[120px] resize-none border-slate-200 focus:border-primary-navy/30 focus:ring-primary-navy/10 text-sm font-semibold rounded-xl"
                      autoFocus
                    />
                  </div>
                </div>

                {selectedImage && (
                  <div className="relative mb-4">
                    <img
                      src={selectedImage}
                      alt="Selected"
                      className="w-full h-64 object-cover rounded-xl border border-slate-200"
                    />
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-3 right-3 h-8 w-8 rounded-full shadow-lg"
                      onClick={removeImage}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}

                {/* Post Options */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <div className="flex items-center space-x-4">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload-modal"
                    />
                    <label htmlFor="image-upload-modal">
                      <Button variant="ghost" size="sm" className="cursor-pointer text-slate-600 hover:text-primary-navy hover:bg-primary-navy/10 font-bold text-sm" asChild>
                        <span>
                          <ImageIcon className="h-5 w-5 mr-2" />
                          Photo
                        </span>
                      </Button>
                    </label>
                    
                    <Button variant="ghost" size="sm" className="text-slate-600 hover:text-primary-navy hover:bg-primary-navy/10 font-bold text-sm">
                      <Hash className="h-5 w-5 mr-2" />
                      Tag
                    </Button>
                    
                    <Button variant="ghost" size="sm" className="text-slate-600 hover:text-primary-navy hover:bg-primary-navy/10 font-bold text-sm">
                      <AtSign className="h-5 w-5 mr-2" />
                      Mention
                    </Button>
                  </div>

                  <div className="flex space-x-3">
                    <Button
                      variant="outline"
                      onClick={() => setIsDialogOpen(false)}
                      className="rounded-lg px-6 border-slate-200 text-slate-600 hover:bg-slate-50 font-bold text-sm"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handlePost}
                      disabled={!postText.trim() && !selectedImage}
                      className="bg-primary-navy hover:bg-primary-navy/90 text-white rounded-lg px-6 shadow-md hover:shadow-lg transition-all font-bold text-sm"
                    >
                      <Send className="h-4 w-4 mr-2" />
                      Post
                    </Button>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-3 mb-8">
          <Button variant="default" className="rounded-lg bg-primary-navy hover:bg-primary-navy/90 text-white shadow-sm font-bold text-sm">
            All Posts
          </Button>
          <Button variant="outline" className="rounded-lg border-primary-navy text-primary-navy hover:bg-primary-navy hover:text-white font-bold text-sm">
            <Building className="h-4 w-4 mr-2" />
            Companies
          </Button>
          <Button variant="outline" className="rounded-lg border-primary-navy text-primary-navy hover:bg-primary-navy hover:text-white font-bold text-sm">
            <TrendingUp className="h-4 w-4 mr-2" />
            Industry News
          </Button>
          <Button variant="outline" className="rounded-lg border-primary-navy text-primary-navy hover:bg-primary-navy hover:text-white font-bold text-sm">
            <Users className="h-4 w-4 mr-2" />
            Hiring Updates
          </Button>
          <Button variant="outline" className="rounded-lg border-primary-navy text-primary-navy hover:bg-primary-navy hover:text-white font-bold text-sm">
            <Award className="h-4 w-4 mr-2" />
            Company Culture
          </Button>
        </div>

        {/* Feed Posts */}
        <div className="space-y-6">
          {/* Featured Company Post */}
          <Card className="border-0 shadow-md hover:shadow-lg transition-all duration-200 rounded-xl bg-white">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex space-x-4">
                  <Avatar className="w-16 h-16">
                    <AvatarFallback className="bg-blue-100 text-blue-600 font-bold text-sm">TC</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="text-lg font-bold text-primary-navy">TechCorp Solutions</div>
                    <div className="text-sm font-semibold text-slate-500">Software Development • Fortune 500</div>
                    <div className="text-xs font-semibold text-slate-400 mt-1">3 hours ago</div>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="text-slate-400 hover:text-slate-600 h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>

              <div className="mb-4">
                <p className="text-sm font-semibold text-slate-700 leading-relaxed">
                  🚀 We're thrilled to announce that TechCorp has been recognized as one of the "Best Places to Work in Tech 2024"! 
                  
                  This achievement reflects our commitment to:
                  • Innovation-driven culture
                  • Work-life balance and remote flexibility
                  • Continuous learning opportunities
                  • Competitive compensation and benefits
                  
                  We're actively hiring for 15+ positions across engineering, product, and design. Join our mission to build the future of technology! 💙
                </p>
              </div>

              <div className="rounded-xl overflow-hidden border border-slate-100 mb-4">
                <img src="/campus-walk.png" alt="TechCorp office" className="w-full h-48 object-cover" />
                <div className="p-4 bg-slate-50">
                  <h3 className="text-lg font-bold text-primary-navy mb-2">Best Places to Work 2024</h3>
                  <p className="text-sm font-semibold text-slate-600">TechCorp recognized for exceptional workplace culture and employee satisfaction...</p>
                  <p className="text-xs text-blue-600 mt-2 font-bold">techcorp.com/careers</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6 text-slate-500">
                  <span className="text-sm font-semibold">184 likes • 37 comments</span>
                </div>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="sm" className="text-slate-500 hover:text-red-500 hover:bg-red-50 rounded-lg h-8 w-8">
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-slate-500 hover:text-primary-navy hover:bg-primary-navy/10 rounded-lg h-8 w-8">
                    <MessageCircle className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-slate-500 hover:text-amber-500 hover:bg-amber-50 rounded-lg h-8 w-8">
                    <BookmarkIcon className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-slate-500 hover:text-green-500 hover:bg-green-50 rounded-lg h-8 w-8">
                    <Share className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Job Opening Post */}
          <Card className="border-0 shadow-md hover:shadow-lg transition-all duration-200 rounded-xl bg-white">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex space-x-4">
                  <Avatar className="w-16 h-16">
                    <AvatarFallback className="bg-green-100 text-green-600 font-bold text-sm">DS</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="text-lg font-bold text-primary-navy">DataStream Analytics</div>
                    <div className="text-sm font-semibold text-slate-500">AI & Machine Learning • Series B Startup</div>
                    <div className="text-xs font-semibold text-slate-400 mt-1">1 day ago</div>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="text-slate-400 hover:text-slate-600 h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>

              <div className="mb-4">
                <p className="text-sm font-semibold text-slate-700 leading-relaxed">
                  🎯 We're looking for passionate AI Engineers to join our growing team!
                  
                  What we offer:
                  • Competitive salary: $120k - $180k
                  • Equity package with high growth potential
                  • Flexible remote work policy
                  • $5k annual learning budget
                  
                  Requirements: 3+ years Python, TensorFlow/PyTorch, and a passion for solving real-world problems with AI.
                  
                  Ready to shape the future of data analytics? Apply now! 🔗
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6 text-slate-500">
                  <span className="text-sm font-semibold">92 likes • 28 comments</span>
                </div>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="sm" className="text-slate-500 hover:text-red-500 hover:bg-red-50 rounded-lg h-8 w-8">
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-slate-500 hover:text-primary-navy hover:bg-primary-navy/10 rounded-lg h-8 w-8">
                    <MessageCircle className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-slate-500 hover:text-amber-500 hover:bg-amber-50 rounded-lg h-8 w-8">
                    <BookmarkIcon className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-slate-500 hover:text-green-500 hover:bg-green-50 rounded-lg h-8 w-8">
                    <Share className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Industry Insight Post */}
          <Card className="border-0 shadow-md hover:shadow-lg transition-all duration-200 rounded-xl bg-white">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex space-x-4">
                  <Avatar className="w-16 h-16">
                    <AvatarFallback className="bg-purple-100 text-purple-600 font-bold text-sm">GV</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="text-lg font-bold text-primary-navy">GrowthVentures Capital</div>
                    <div className="text-sm font-semibold text-slate-500">Venture Capital • Investment Firm</div>
                    <div className="text-xs font-semibold text-slate-400 mt-1">2 days ago</div>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="text-slate-400 hover:text-slate-600 h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>

              <div className="mb-4">
                <p className="text-sm font-semibold text-slate-700 leading-relaxed">
                  📈 Market Update: The tech hiring landscape is evolving rapidly in 2024.
                  
                  Key trends we're seeing:
                  • 40% increase in AI/ML role demand
                  • Remote-first policies becoming standard
                  • Companies prioritizing diverse talent pipelines
                  • Emphasis on full-stack capabilities
                  
                  For job seekers: Focus on upskilling and demonstrating adaptability. 
                  For companies: Competitive packages and culture are more important than ever.
                  
                  What trends are you seeing in your industry? 🤔
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6 text-slate-500">
                  <span className="text-sm font-semibold">156 likes • 42 comments</span>
                </div>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="sm" className="text-slate-500 hover:text-red-500 hover:bg-red-50 rounded-lg h-8 w-8">
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-slate-500 hover:text-primary-navy hover:bg-primary-navy/10 rounded-lg h-8 w-8">
                    <MessageCircle className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-slate-500 hover:text-amber-500 hover:bg-amber-50 rounded-lg h-8 w-8">
                    <BookmarkIcon className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-slate-500 hover:text-green-500 hover:bg-green-50 rounded-lg h-8 w-8">
                    <Share className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Company Culture Post */}
          <Card className="border-0 shadow-md hover:shadow-lg transition-all duration-200 rounded-xl bg-white">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex space-x-4">
                  <Avatar className="w-16 h-16">
                    <AvatarFallback className="bg-orange-100 text-orange-600 font-bold text-sm">IS</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="text-lg font-bold text-primary-navy">InnovateSoft</div>
                    <div className="text-sm font-semibold text-slate-500">Product Development • Scale-up</div>
                    <div className="text-xs font-semibold text-slate-400 mt-1">3 days ago</div>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="text-slate-400 hover:text-slate-600 h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>

              <div className="mb-4">
                <p className="text-sm font-semibold text-slate-700 leading-relaxed">
                  ✨ Team Spotlight Friday! 
                  
                  This week we're celebrating Sarah Chen from our Engineering team who:
                  • Led the successful migration to our new microservices architecture
                  • Mentored 3 junior developers through our peer learning program
                  • Organized our monthly tech talk series
                  
                  Sarah embodies our values of innovation, collaboration, and continuous growth. Thank you for making InnovateSoft an amazing place to work! 🙌
                  
                  #TeamSpotlight #CompanyCulture #Engineering
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6 text-slate-500">
                  <span className="text-sm font-semibold">73 likes • 15 comments</span>
                </div>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="sm" className="text-slate-500 hover:text-red-500 hover:bg-red-50 rounded-lg h-8 w-8">
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-slate-500 hover:text-primary-navy hover:bg-primary-navy/10 rounded-lg h-8 w-8">
                    <MessageCircle className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-slate-500 hover:text-amber-500 hover:bg-amber-50 rounded-lg h-8 w-8">
                    <BookmarkIcon className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-slate-500 hover:text-green-500 hover:bg-green-50 rounded-lg h-8 w-8">
                    <Share className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Community Spotlight Card */}
          <Card className="border-0 shadow-sm rounded-xl bg-gradient-to-r from-primary-navy to-[#0056B3] text-white">
            <CardContent className="p-6">
              <div className="flex items-start space-x-6">
                <div className="bg-white/20 backdrop-blur-sm p-4 rounded-xl">
                  <span className="text-2xl">🏢</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold mb-2">Welcome to the Company Feed!</h3>
                  <p className="text-white/80 text-sm font-semibold leading-relaxed mb-4">
                    Connect with businesses, discover opportunities, and share your company's story with the professional community.
                  </p>
                  <Button 
                    variant="secondary" 
                    className="bg-white text-primary-navy hover:bg-primary-navy hover:text-white rounded-lg font-bold border border-white px-4 py-2 text-sm"
                    onClick={() => setIsDialogOpen(true)}
                  >
                    Share Update
                  </Button>
                </div>
                <Button variant="ghost" size="icon" className="text-white/70 hover:text-white hover:bg-white/10 h-8 w-8">
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 