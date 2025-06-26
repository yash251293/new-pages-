"use client"

import type React from "react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { BookmarkIcon, Heart, MessageCircle, MoreHorizontal, X, Send, ImageIcon, Plus, Smile, AtSign, Hash } from "lucide-react"
import { useState } from "react"

export default function FeedPage() {
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
      <div className="w-[65%] mx-auto py-4">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
        <div>
            <h1 className="text-4xl font-heading text-primary-navy mb-2">What's Happening Today?</h1>
            <p className="text-slate-600 font-subheading text-xl">Follow, share, and grow with your network</p>
      </div>

          {/* New Post Button */}
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button 
                className="bg-primary-navy hover:bg-primary-navy/90 text-white rounded-full px-6 py-2 shadow-lg hover:shadow-xl transition-all duration-200 font-subheading"
              >
                <Plus className="h-4 w-4 mr-2" />
                New Post
          </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] p-0 bg-white rounded-2xl shadow-2xl border-0 [&>button]:!outline-none [&>button]:!ring-0 [&>button]:!shadow-none [&>button]:focus:!outline-none [&>button]:focus:!ring-0 [&>button]:focus:!shadow-none">
              <DialogHeader className="p-6 pb-4 border-b border-slate-100">
                <DialogTitle className="text-xl font-heading text-primary-navy">Create a Post</DialogTitle>
              </DialogHeader>
              
              <div className="p-6">
                <div className="flex space-x-4 mb-4">
                  <Avatar className="w-12 h-12">
                <AvatarImage src="/placeholder-user.jpg" alt="User" />
                    <AvatarFallback className="bg-[#0056B3]/10 text-[#0056B3] font-medium">UN</AvatarFallback>
              </Avatar>
                  <div className="flex-1">
                  <Textarea
                      placeholder="What's happening in your professional journey?"
                    value={postText}
                    onChange={(e) => setPostText(e.target.value)}
                      className="min-h-[120px] resize-none border-slate-200 !outline-none !ring-0 !shadow-none focus:!outline-none focus:!ring-0 focus:!shadow-none focus:!border-slate-200 text-base font-subheading rounded-xl"
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
                                           <Button variant="ghost" size="sm" className="cursor-pointer text-slate-600 hover:text-primary-navy hover:bg-primary-navy/10" asChild>
                          <span>
                         <ImageIcon className="h-5 w-5 mr-2" />
                            Photo
                          </span>
                        </Button>
                      </label>
                   
                   <Button variant="ghost" size="sm" className="text-slate-600 hover:text-primary-navy hover:bg-primary-navy/10">
                     <Smile className="h-5 w-5 mr-2" />
                     Emoji
                   </Button>
                   
                   <Button variant="ghost" size="sm" className="text-slate-600 hover:text-primary-navy hover:bg-primary-navy/10">
                     <AtSign className="h-5 w-5 mr-2" />
                     Mention
                   </Button>
                    </div>

                  <div className="flex space-x-3">
                      <Button
                        variant="outline"
                      onClick={() => setIsDialogOpen(false)}
                      className="rounded-full px-6 border-slate-200 text-slate-600 hover:bg-slate-50"
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={handlePost}
                        disabled={!postText.trim() && !selectedImage}
                       className="bg-primary-navy hover:bg-primary-navy/90 text-white rounded-full px-6 shadow-md hover:shadow-lg transition-all"
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
          <Button variant="default" className="rounded-full bg-primary-navy hover:bg-primary-navy/90 text-white shadow-sm">
            All Posts
          </Button>
          <Button variant="outline" className="rounded-full border-primary-navy text-primary-navy hover:bg-primary-navy hover:text-white">
            Tech Industry
          </Button>
          <Button variant="outline" className="rounded-full border-primary-navy text-primary-navy hover:bg-primary-navy hover:text-white">
            Job Opportunities
          </Button>
          <Button variant="outline" className="rounded-full border-primary-navy text-primary-navy hover:bg-primary-navy hover:text-white">
            Career Insights
          </Button>
          <Button variant="outline" className="rounded-full border-primary-navy text-primary-navy hover:bg-primary-navy hover:text-white">
            Success Stories
          </Button>
          <Button variant="outline" className="rounded-full border-primary-navy text-primary-navy hover:bg-primary-navy hover:text-white">
            Professional Tips
          </Button>
            </div>

        {/* Feed Posts */}
        <div className="space-y-6">
          {/* Featured Post */}
          <Card className="border-0 shadow-md hover:shadow-lg transition-all duration-200 rounded-2xl bg-white">
            <CardContent className="p-8">
              <div className="flex justify-between items-start mb-6">
            <div className="flex space-x-4">
                  <Avatar className="w-16 h-16">
                <AvatarImage src="/placeholder-user.jpg" alt="User" />
                    <AvatarFallback className="bg-[#0056B3]/10 text-[#0056B3] font-medium text-lg">CL</AvatarFallback>
              </Avatar>
              <div>
                    <div className="font-heading text-xl text-primary-navy">Carl Livingston</div>
                    <div className="text-base text-slate-500 font-subheading">Computer Science · Stanford University · 2024</div>
                    <div className="text-sm text-slate-400 mt-1">2 hours ago</div>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="text-slate-400 hover:text-slate-600 h-10 w-10">
                  <MoreHorizontal className="h-6 w-6" />
                </Button>
              </div>

              <div className="mb-6">
                <p className="text-slate-700 font-subheading leading-relaxed text-base">
                  Just finished my final interview round at Google! 🎉 The preparation was intense, but these interview tips from the 100 Networks community were game-changers. 
                  
                  Key takeaways that helped me:
                  • Research the company culture deeply
                  • Practice behavioral questions with real examples
                  • Ask thoughtful questions about the role
                  
                  Grateful for this amazing community! 💙
                </p>
            </div>

              <div className="rounded-xl overflow-hidden border border-slate-100 mb-6">
                <img src="/campus-walk.png" alt="Students on campus" className="w-full h-52 object-cover" />
                <div className="p-6 bg-slate-50">
                  <h3 className="font-heading text-lg text-primary-navy mb-2">5 Interview Tips That Actually Work</h3>
                  <p className="text-base text-slate-600 font-subheading">Transform your interview game with research-backed strategies...</p>
                  <p className="text-sm text-[#0056B3] mt-2 font-medium">100networks.com</p>
          </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6 text-slate-500">
                  <span className="text-base font-subheading">127 likes • 23 comments</span>
            </div>
              <div className="flex space-x-2">
                  <Button variant="ghost" size="sm" className="text-slate-500 hover:text-red-500 hover:bg-red-50 rounded-full h-10 w-10">
                    <Heart className="h-6 w-6" />
                </Button>
                  <Button variant="ghost" size="sm" className="text-slate-500 hover:text-primary-navy hover:bg-primary-navy/10 rounded-full h-10 w-10">
                    <MessageCircle className="h-6 w-6" />
                </Button>
                  <Button variant="ghost" size="sm" className="text-slate-500 hover:text-amber-500 hover:bg-amber-50 rounded-full h-10 w-10">
                    <BookmarkIcon className="h-6 w-6" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

          {/* Regular Post */}
          <Card className="border-0 shadow-md hover:shadow-lg transition-all duration-200 rounded-2xl bg-white">
            <CardContent className="p-8">
              <div className="flex justify-between items-start mb-6">
            <div className="flex space-x-4">
                  <Avatar className="w-16 h-16">
                <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
                    <AvatarFallback className="bg-[#0056B3]/10 text-[#0056B3] font-medium text-lg">IA</AvatarFallback>
              </Avatar>
              <div>
                    <div className="font-heading text-xl text-primary-navy">Ian Arruda, MPM, CAPM</div>
                    <div className="text-base text-slate-500 font-subheading">Arizona State University · Project Management</div>
                    <div className="text-sm text-slate-400 mt-1">1 day ago</div>
              </div>
            </div>
                <Button variant="ghost" size="icon" className="text-slate-400 hover:text-slate-600 h-10 w-10">
                  <MoreHorizontal className="h-6 w-6" />
              </Button>
            </div>

              <div className="mb-6">
                <p className="text-slate-700 font-subheading leading-relaxed text-base">
                  🎓 I finally did it! After two years of balancing work, studies, and life, I've earned my Master of Project Management degree from Arizona State University.
                  
                  This journey taught me that persistence pays off. Thank you to everyone who supported me along the way – mentors, classmates, and the incredible 100 Networks community! 
                  
                  Next chapter: Leading impactful projects and helping others achieve their goals. 🚀
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6 text-slate-500">
                  <span className="text-base font-subheading">89 likes • 12 comments</span>
          </div>
              <div className="flex space-x-2">
                  <Button variant="ghost" size="sm" className="text-slate-500 hover:text-red-500 hover:bg-red-50 rounded-full h-10 w-10">
                    <Heart className="h-6 w-6" />
                </Button>
                  <Button variant="ghost" size="sm" className="text-slate-500 hover:text-primary-navy hover:bg-primary-navy/10 rounded-full h-10 w-10">
                    <MessageCircle className="h-6 w-6" />
                </Button>
                  <Button variant="ghost" size="sm" className="text-slate-500 hover:text-amber-500 hover:bg-amber-50 rounded-full h-10 w-10">
                    <BookmarkIcon className="h-6 w-6" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

          {/* Community Spotlight Card */}
          <Card className="border-0 shadow-md rounded-2xl bg-gradient-to-r from-primary-navy to-[#0056B3] text-white">
            <CardContent className="p-8">
              <div className="flex items-start space-x-6">
                <div className="bg-white/20 backdrop-blur-sm p-4 rounded-xl">
                  <span className="text-3xl">✨</span>
            </div>
            <div className="flex-1">
                  <h3 className="font-heading text-2xl mb-3">Welcome to the Community Feed!</h3>
                  <p className="text-[#0056B3]/30 font-subheading leading-relaxed mb-6 text-lg">
                    Follow thousands of students and professionals. Share your journey, get advice, and discover opportunities that align with your goals.
                  </p>
                  <Button 
                    variant="secondary" 
                    className="bg-white text-primary-navy hover:bg-primary-navy hover:text-white rounded-full font-subheading border border-white px-6 py-3 text-base"
                    onClick={() => setIsDialogOpen(true)}
                  >
                    Share Your Story
                  </Button>
            </div>
                <Button variant="ghost" size="icon" className="text-white/70 hover:text-white hover:bg-white/10 h-10 w-10">
                  <X className="h-6 w-6" />
            </Button>
          </div>
        </CardContent>
      </Card>
        </div>
      </div>
    </div>
  )
}
