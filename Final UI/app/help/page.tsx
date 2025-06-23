"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ArrowLeft, Search, MessageCircle, Mail, Phone, ExternalLink, Users, Briefcase, Building2, Shield, BookOpen, Star, Video, FileText, HelpCircle } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function HelpCenterPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  const helpCategories = [
    {
      icon: Users,
      title: "Getting Started",
      description: "Learn the basics of 100Networks",
      articles: [
        "Creating your profile",
        "Setting up your professional information",
        "Adding skills and experience",
        "Uploading your resume"
      ]
    },
    {
      icon: Briefcase,
      title: "Job Search",
      description: "Find and apply for opportunities",
      articles: [
        "How to search for jobs",
        "Setting up job alerts",
        "Application best practices",
        "Tracking your applications"
      ]
    },
    {
      icon: Building2,
      title: "Company Profiles",
      description: "Connect with employers",
      articles: [
        "Following companies",
        "Company reviews and ratings",
        "Understanding company culture",
        "Connecting with recruiters"
      ]
    },
    {
      icon: Users,
      title: "Networking",
      description: "Build professional connections",
      articles: [
        "Finding and connecting with professionals",
        "Messaging etiquette",
        "Building your network",
        "Industry groups and events"
      ]
    },
    {
      icon: Shield,
      title: "Privacy & Security",
      description: "Keep your account safe",
      articles: [
        "Privacy settings guide",
        "Account security tips",
        "Managing your visibility",
        "Reporting inappropriate content"
      ]
    },
    {
      icon: BookOpen,
      title: "Freelancing",
      description: "Freelance opportunities and projects",
      articles: [
        "Finding freelance projects",
        "Setting your rates",
        "Building a portfolio",
        "Client communication"
      ]
    }
  ]

  const faqItems = [
    {
      question: "How do I create an effective profile?",
      answer: "Start with a professional photo, write a compelling headline, and fill out all sections including your experience, education, and skills. Use keywords relevant to your industry to help recruiters find you."
    },
    {
      question: "Why am I not getting responses to my job applications?",
      answer: "Ensure your profile is complete, tailor your applications to each job, use relevant keywords, and follow up appropriately. Consider getting your resume reviewed by our career experts."
    },
    {
      question: "How can I increase my visibility to recruiters?",
      answer: "Complete your profile, stay active on the platform, engage with content, join industry groups, and ensure your skills match current job market demands."
    },
    {
      question: "What should I include in my professional summary?",
      answer: "Your professional summary should highlight your key achievements, core skills, years of experience, and career objectives in 2-3 sentences. Make it specific to your industry."
    },
    {
      question: "How do I report inappropriate behavior?",
      answer: "Use the report feature on any profile, message, or content. Our moderation team reviews all reports within 24 hours and takes appropriate action to maintain a professional environment."
    },
    {
      question: "Can I change my email address?",
      answer: "Yes, you can update your email address in Settings > Account > Personal Information. You'll need to verify the new email address before the change takes effect."
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => router.back()}
                className="p-2 hover:bg-slate-100 rounded-xl"
              >
                <ArrowLeft className="h-5 w-5 text-slate-600" />
              </Button>
              <div>
                <h1 className="text-3xl font-heading text-primary-navy">Help Center</h1>
                <p className="text-slate-600 font-subheading">Find answers and get support for your 100Networks experience</p>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative mb-8">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
            <Input
              placeholder="Search for help articles, topics, or questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-14 rounded-xl text-lg bg-white shadow-sm border-slate-200"
            />
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card className="shadow-sm border-slate-200 hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-[#0056B3]/10 rounded-xl">
                    <MessageCircle className="h-6 w-6 text-[#0056B3]" />
                  </div>
                  <div>
                    <h3 className="font-heading text-primary-navy">Live Chat</h3>
                    <p className="text-sm text-slate-600 font-subheading">Chat with our support team</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm border-slate-200 hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-green-100 rounded-xl">
                    <Mail className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-heading text-primary-navy">Email Support</h3>
                    <p className="text-sm text-slate-600 font-subheading">Get help via email</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm border-slate-200 hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-blue-100 rounded-xl">
                    <Video className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-heading text-primary-navy">Video Tutorials</h3>
                    <p className="text-sm text-slate-600 font-subheading">Watch step-by-step guides</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Help Categories */}
          <div className="mb-8">
            <h2 className="text-2xl font-heading text-primary-navy mb-6">Browse by Category</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {helpCategories.map((category, index) => {
                const IconComponent = category.icon
                return (
                  <Card key={index} className="shadow-sm border-slate-200 hover:shadow-md transition-shadow cursor-pointer">
                    <CardHeader>
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-[#0056B3]/10 rounded-lg">
                          <IconComponent className="h-5 w-5 text-[#0056B3]" />
                        </div>
                        <div>
                          <CardTitle className="font-heading text-primary-navy text-lg">{category.title}</CardTitle>
                          <CardDescription className="font-subheading">{category.description}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {category.articles.map((article, articleIndex) => (
                          <li key={articleIndex} className="flex items-center space-x-2 text-sm text-slate-600 hover:text-primary-navy cursor-pointer">
                            <FileText className="h-4 w-4" />
                            <span className="font-subheading">{article}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-heading text-primary-navy mb-6">Frequently Asked Questions</h2>
            <Card className="shadow-sm border-slate-200">
              <CardContent className="p-6">
                <Accordion type="single" collapsible className="w-full">
                  {faqItems.map((item, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="font-heading text-primary-navy hover:text-primary-navy">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="font-subheading text-slate-600 leading-relaxed">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </div>

          {/* Contact Support */}
          <Card className="shadow-sm border-slate-200 bg-primary-navy text-white">
            <CardContent className="p-8 text-center">
              <HelpCircle className="h-12 w-12 mx-auto mb-4" />
              <h3 className="text-xl font-heading mb-2">Still need help?</h3>
              <p className="font-subheading mb-6 opacity-90">
                Can't find what you're looking for? Our support team is here to help you succeed.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="secondary" className="font-medium">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Start Live Chat
                </Button>
                <Button variant="outline" className="font-medium text-white border-white hover:bg-white hover:text-primary-navy">
                  <Mail className="h-4 w-4 mr-2" />
                  Send Email
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Additional Resources */}
          <div className="mt-8">
            <h2 className="text-2xl font-heading text-primary-navy mb-6">Additional Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="shadow-sm border-slate-200">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Star className="h-6 w-6 text-yellow-500" />
                    <h3 className="font-heading text-primary-navy">Success Stories</h3>
                  </div>
                  <p className="text-sm text-slate-600 font-subheading mb-4">
                    Learn from other professionals who have found success on 100Networks.
                  </p>
                  <Button variant="outline" size="sm" className="font-medium">
                    Read Stories
                    <ExternalLink className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>

              <Card className="shadow-sm border-slate-200">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <BookOpen className="h-6 w-6 text-[#0056B3]" />
                    <h3 className="font-heading text-primary-navy">Career Resources</h3>
                  </div>
                  <p className="text-sm text-slate-600 font-subheading mb-4">
                    Access our library of career guides, templates, and industry insights.
                  </p>
                  <Button variant="outline" size="sm" className="font-medium">
                    Browse Resources
                    <ExternalLink className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 