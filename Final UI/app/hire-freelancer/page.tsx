"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { 
  ArrowLeft, 
  Shield, 
  CreditCard, 
  DollarSign, 
  Calendar, 
  CheckCircle, 
  AlertCircle, 
  Star, 
  MapPin, 
  Clock,
  Users,
  FileText,
  Lock,
  Eye,
  Banknote,
  TrendingUp,
  Award,
  MessageCircle,
  Check,
  X,
  PlusCircle
} from "lucide-react"
import Link from "next/link"

export default function HireFreelancerPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const projectId = searchParams.get('project')
  const applicantId = searchParams.get('applicant')
  
  const [paymentType, setPaymentType] = useState("escrow")
  const [paymentOption, setPaymentOption] = useState("full")
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("1")
  const [contractTerms, setContractTerms] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [showPaymentPortal, setShowPaymentPortal] = useState(false)
  const [showSuccessPopup, setShowSuccessPopup] = useState(false)
  const [paymentStep, setPaymentStep] = useState(1)

  // Mock data - in real app, fetch based on projectId and applicantId
  const project = {
    id: 1,
    title: "E-commerce React App Development",
    description: "Looking for a skilled React developer to build a modern e-commerce platform with shopping cart, payment integration, and user management.",
    budget: "$3,000-5,000",
    agreedAmount: 4200,
    timeline: "6-8 weeks",
    skills: ["React", "Node.js", "MongoDB", "Stripe API"]
  }

  const freelancer = {
    id: 1,
    name: "Sarah Chen",
    avatar: "SC",
    rating: 4.9,
    reviews: 47,
    hourlyRate: 75,
    location: "San Francisco, CA",
    completedProjects: 28,
    successRate: 98,
    responseTime: "within 2 hours",
    specialties: ["React Development", "E-commerce", "Full-Stack"],
    portfolio: ["TechCorp E-commerce", "StartupXYZ Platform", "FinanceApp Dashboard"]
  }

  const paymentMethods = [
    {
      id: "1",
      type: "Visa",
      lastFour: "4242",
      isDefault: true
    },
    {
      id: "2", 
      type: "Mastercard",
      lastFour: "5555",
      isDefault: false
    }
  ]

  const handleHireFreelancer = async () => {
    setIsProcessing(true)
    
    if (paymentType === "direct") {
      // For direct payments, skip payment portal and go directly to success
      await new Promise(resolve => setTimeout(resolve, 1500)) // Brief processing time
      setIsProcessing(false)
      setShowSuccessPopup(true)
    } else {
      // For escrow payments, show payment portal
      setShowPaymentPortal(true)
    }
  }

  const processPayment = async () => {
    setPaymentStep(2)
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 3000))
    setPaymentStep(3)
    await new Promise(resolve => setTimeout(resolve, 1000))
    setShowPaymentPortal(false)
    setIsProcessing(false)
    setShowSuccessPopup(true)
  }

  const closeSuccessPopup = () => {
    setShowSuccessPopup(false)
    router.push('/jobs/freelance/my-projects')
  }

  const milestonePayments = {
    first: paymentOption === "milestone" ? Math.round(project.agreedAmount * 0.5) : 0,
    second: paymentOption === "milestone" ? project.agreedAmount - Math.round(project.agreedAmount * 0.5) : 0
  }

  const totalAmount = project.agreedAmount + (paymentType === "escrow" ? Math.round(project.agreedAmount * 0.05) : 0)

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
        <div className="w-[65%] mx-auto py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-4 mb-6">
              <Link href="/jobs/freelance/my-projects">
                <Button variant="ghost" size="icon" className="p-2 hover:bg-slate-100 rounded-xl">
                  <ArrowLeft className="h-5 w-5 text-slate-600" />
                </Button>
              </Link>
              <div>
                <h1 className="text-4xl font-heading text-primary-navy">Hire Freelancer</h1>
                <p className="text-xl text-slate-600 font-subheading">
                  Complete your hiring process with secure escrow payment
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Project & Freelancer Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Project Information */}
              <Card className="border-slate-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-xl font-heading text-primary-navy">Project Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-heading text-slate-900 mb-2">{project.title}</h3>
                    <p className="text-slate-600 leading-relaxed font-subheading">{project.description}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.skills.map((skill) => (
                      <Badge key={skill} variant="outline" className="bg-slate-50 border-slate-200 text-slate-700 font-subheading">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center text-sm text-slate-600">
                        <DollarSign className="h-4 w-4 mr-1" />
                        <span className="font-subheading">Budget: {project.budget}</span>
                      </div>
                      <div className="flex items-center text-sm text-slate-600">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span className="font-subheading">Timeline: {project.timeline}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-slate-500 font-subheading">Agreed Amount</p>
                      <p className="text-xl font-heading text-green-600">${project.agreedAmount.toLocaleString()}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Freelancer Information */}
              <Card className="border-slate-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-xl font-heading text-primary-navy">Freelancer Profile</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start space-x-4 mb-6">
                    <Avatar className="h-16 w-16">
                      <AvatarFallback className="bg-gradient-to-br from-primary-navy to-slate-700 text-white text-lg font-heading">
                        {freelancer.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-2xl font-heading text-slate-900">{freelancer.name}</h3>
                        <Badge className="bg-green-100 text-green-800 border-green-200">
                          <Award className="h-3 w-3 mr-1" />
                          Top Rated
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-4 mb-3">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 mr-1 fill-amber-400 text-amber-400" />
                          <span className="font-subheading">{freelancer.rating} ({freelancer.reviews} reviews)</span>
                        </div>
                        <div className="flex items-center text-slate-600">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span className="font-subheading">{freelancer.location}</span>
                        </div>
                        <div className="flex items-center text-slate-600">
                          <DollarSign className="h-4 w-4 mr-1" />
                          <span className="font-subheading">${freelancer.hourlyRate}/hr</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {freelancer.specialties.map((specialty) => (
                          <Badge key={specialty} variant="outline" className="text-xs border-blue-200 text-blue-700 bg-blue-50">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Freelancer Stats */}
                  <div className="grid grid-cols-3 gap-4 p-4 bg-slate-50 rounded-lg">
                    <div className="text-center">
                      <p className="text-2xl font-heading text-primary-navy">{freelancer.completedProjects}</p>
                      <p className="text-xs text-slate-600 font-subheading">Projects Completed</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-heading text-primary-navy">{freelancer.successRate}%</p>
                      <p className="text-xs text-slate-600 font-subheading">Success Rate</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-heading text-primary-navy">2h</p>
                      <p className="text-xs text-slate-600 font-subheading">Response Time</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Type Selection */}
              <Card className="border-slate-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-xl font-heading text-primary-navy">Payment Method</CardTitle>
                  <CardDescription className="font-subheading">
                    Choose your preferred payment method for this project
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={paymentType} onValueChange={setPaymentType}>
                    <div className="space-y-4">
                      {/* 100Networks Escrow Option */}
                      <div className="flex items-start space-x-3 p-4 border-2 border-green-200 rounded-lg bg-green-50 hover:border-green-300 transition-colors">
                        <RadioGroupItem value="escrow" id="escrow" className="mt-1" />
                        <Label htmlFor="escrow" className="flex-1 cursor-pointer">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              <Shield className="h-5 w-5 text-green-600" />
                              <h4 className="font-heading text-green-900">100Networks Escrow Payment</h4>
                              <Badge className="bg-green-600 text-white">Recommended</Badge>
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-green-700 font-subheading">5% Platform Fee</p>
                            </div>
                          </div>
                          <p className="text-sm text-green-700 mb-3 font-subheading">
                            Your payment is held securely by 100Networks until project completion. Funds are only released when you approve the deliverables.
                          </p>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                            <div className="flex items-start space-x-2">
                              <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                              <div>
                                <p className="text-xs font-subheading text-green-800">Secure Payment Protection</p>
                                <p className="text-xs text-green-600 font-subheading">Funds held until work completion</p>
                              </div>
                            </div>
                            <div className="flex items-start space-x-2">
                              <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                              <div>
                                <p className="text-xs font-subheading text-green-800">Dispute Resolution</p>
                                <p className="text-xs text-green-600 font-subheading">Expert mediation if issues arise</p>
                              </div>
                            </div>
                            <div className="flex items-start space-x-2">
                              <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                              <div>
                                <p className="text-xs font-subheading text-green-800">Quality Guarantee</p>
                                <p className="text-xs text-green-600 font-subheading">Full refund if work not delivered</p>
                              </div>
                            </div>
                            <div className="flex items-start space-x-2">
                              <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                              <div>
                                <p className="text-xs font-subheading text-green-800">Communication Support</p>
                                <p className="text-xs text-green-600 font-subheading">Platform mediated messaging</p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-4 text-xs">
                            <div className="flex items-center text-green-600">
                              <Award className="h-3 w-3 mr-1" />
                              <span className="font-subheading">Verified freelancers only</span>
                            </div>
                            <div className="flex items-center text-green-600">
                              <Lock className="h-3 w-3 mr-1" />
                              <span className="font-subheading">Bank-level security</span>
                            </div>
                            <div className="flex items-center text-green-600">
                              <MessageCircle className="h-3 w-3 mr-1" />
                              <span className="font-subheading">24/7 support</span>
                            </div>
                          </div>
                        </Label>
                      </div>

                      {/* Direct Payment Option */}
                      <div className="flex items-start space-x-3 p-4 border-2 border-orange-200 rounded-lg bg-orange-50 hover:border-orange-300 transition-colors">
                        <RadioGroupItem value="direct" id="direct" className="mt-1" />
                        <Label htmlFor="direct" className="flex-1 cursor-pointer">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              <Banknote className="h-5 w-5 text-orange-600" />
                              <h4 className="font-heading text-orange-900">Direct Payment to Freelancer</h4>
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-orange-700 font-subheading">No Platform Fee</p>
                            </div>
                          </div>
                          <p className="text-sm text-orange-700 mb-3 font-subheading">
                            Pay the freelancer directly without 100Networks holding the funds. You save on platform fees but lose protection benefits.
                          </p>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                            <div className="flex items-start space-x-2">
                              <AlertCircle className="h-4 w-4 text-orange-600 mt-0.5" />
                              <div>
                                <p className="text-xs font-subheading text-orange-800">No Payment Protection</p>
                                <p className="text-xs text-orange-600 font-subheading">Funds released immediately</p>
                              </div>
                            </div>
                            <div className="flex items-start space-x-2">
                              <AlertCircle className="h-4 w-4 text-orange-600 mt-0.5" />
                              <div>
                                <p className="text-xs font-subheading text-orange-800">No Dispute Support</p>
                                <p className="text-xs text-orange-600 font-subheading">Handle issues independently</p>
                              </div>
                            </div>
                            <div className="flex items-start space-x-2">
                              <AlertCircle className="h-4 w-4 text-orange-600 mt-0.5" />
                              <div>
                                <p className="text-xs font-subheading text-orange-800">No Refund Guarantee</p>
                                <p className="text-xs text-orange-600 font-subheading">No automatic refund protection</p>
                              </div>
                            </div>
                            <div className="flex items-start space-x-2">
                              <TrendingUp className="h-4 w-4 text-orange-600 mt-0.5" />
                              <div>
                                <p className="text-xs font-subheading text-orange-800">Save Platform Fees</p>
                                <p className="text-xs text-orange-600 font-subheading">No additional charges</p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="p-2 bg-orange-100 rounded border-l-4 border-orange-400">
                            <p className="text-xs text-orange-700 font-subheading">
                              ⚠️ Warning: You will not have 100Networks protection if you choose direct payment
                            </p>
                          </div>
                        </Label>
                      </div>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>

              {/* Payment Structure Options - Only show for escrow */}
              {paymentType === "escrow" && (
                <Card className="border-slate-200 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-xl font-heading text-primary-navy">Payment Structure</CardTitle>
                    <CardDescription className="font-subheading">
                      Choose how you want to structure the payment
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup value={paymentOption} onValueChange={setPaymentOption}>
                      <div className="space-y-4">
                        {/* Full Payment Option */}
                        <div className="flex items-start space-x-3 p-4 border border-slate-200 rounded-lg hover:border-primary-navy/30 transition-colors">
                          <RadioGroupItem value="full" id="full" className="mt-1" />
                          <Label htmlFor="full" className="flex-1 cursor-pointer">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center space-x-2">
                                <Banknote className="h-5 w-5 text-primary-navy" />
                                <h4 className="font-heading text-slate-900">Full Payment</h4>
                              </div>
                              <div className="text-right">
                                <p className="text-lg font-heading text-primary-navy">${project.agreedAmount.toLocaleString()}</p>
                              </div>
                            </div>
                            <p className="text-sm text-slate-600">
                              Pay the full amount upfront. Funds are held in escrow until project completion.
                            </p>
                            <div className="flex items-center mt-2 text-xs text-slate-500">
                              <Clock className="h-3 w-3 mr-1" />
                              <span>Funds released upon project completion approval</span>
                            </div>
                          </Label>
                        </div>

                        {/* Milestone Payment Option */}
                        <div className="flex items-start space-x-3 p-4 border border-slate-200 rounded-lg hover:border-primary-navy/30 transition-colors">
                          <RadioGroupItem value="milestone" id="milestone" className="mt-1" />
                          <Label htmlFor="milestone" className="flex-1 cursor-pointer">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center space-x-2">
                                <TrendingUp className="h-5 w-5 text-blue-600" />
                                <h4 className="font-heading text-slate-900">Milestone Payments</h4>
                              </div>
                              <div className="text-right">
                                <p className="text-sm text-blue-600 font-subheading">2 Milestones</p>
                              </div>
                            </div>
                            <p className="text-sm text-slate-600">
                              Split payment into two milestones for better project management and risk mitigation.
                            </p>
                            <div className="grid grid-cols-2 gap-3 mt-3">
                              <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                                <p className="text-xs text-blue-600 font-subheading">50% at Start</p>
                                <p className="text-xl font-heading text-blue-700">${milestonePayments.first.toLocaleString()}</p>
                                <p className="text-xs text-blue-600">Released when project begins</p>
                              </div>
                              <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                                <p className="text-xs text-green-600 font-subheading">50% at Completion</p>
                                <p className="text-xl font-heading text-green-700">${milestonePayments.second.toLocaleString()}</p>
                                <p className="text-xs text-green-600">Released upon completion</p>
                              </div>
                            </div>
                            <div className="flex items-center mt-2 text-xs text-blue-600">
                              <TrendingUp className="h-3 w-3 mr-1" />
                              <span>Better for larger projects • Improved cash flow</span>
                            </div>
                          </Label>
                        </div>
                      </div>
                    </RadioGroup>
                  </CardContent>
                </Card>
              )}

              {/* Contract Terms */}
              <Card className="border-slate-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-xl font-heading text-primary-navy">Contract Terms</CardTitle>
                  <CardDescription className="font-subheading">
                    Add any specific terms or requirements for this project
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="Enter any specific deliverables, deadlines, or requirements that were discussed..."
                    value={contractTerms}
                    onChange={(e) => setContractTerms(e.target.value)}
                    className="min-h-[120px] border-slate-200 focus:border-primary-navy"
                  />
                  <p className="text-xs text-slate-500 mt-2">
                    These terms will be included in the contract sent to the freelancer
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Payment Method & Summary */}
            <div className="space-y-6">
              {/* Payment Method Selection */}
              {paymentType === "escrow" && (
                <Card className="border-slate-200 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-lg font-heading text-primary-navy">Credit Card</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <RadioGroup value={selectedPaymentMethod} onValueChange={setSelectedPaymentMethod}>
                      {paymentMethods.map((method) => (
                        <div key={method.id} className="flex items-center space-x-3 p-3 border border-slate-200 rounded-lg hover:border-primary-navy/30 transition-colors">
                          <RadioGroupItem value={method.id} id={method.id} />
                          <Label htmlFor={method.id} className="flex-1 cursor-pointer">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-6 bg-gradient-to-r from-primary-navy to-blue-600 rounded flex items-center justify-center">
                                  <CreditCard className="h-3 w-3 text-white" />
                                </div>
                                <div>
                                  <p className="font-subheading text-slate-900">{method.type} •••• {method.lastFour}</p>
                                  {method.isDefault && (
                                    <p className="text-xs text-green-600 font-subheading">Default</p>
                                  )}
                                </div>
                              </div>
                            </div>
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                    <Link href="/billing">
                      <Button variant="outline" className="w-full border-slate-200 hover:border-primary-navy hover:text-primary-navy font-subheading">
                        <CreditCard className="h-4 w-4 mr-2" />
                        Add New Payment Method
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              )}

              {/* Payment Summary */}
              <Card className="border-slate-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-heading text-primary-navy">Payment Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600 font-subheading">Project Amount</span>
                      <span className="font-heading text-slate-900">${project.agreedAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600 font-subheading">Platform Fee {paymentType === "escrow" ? "(5%)" : "(0%)"}</span>
                      <span className="font-heading text-slate-900">${paymentType === "escrow" ? Math.round(project.agreedAmount * 0.05) : 0}</span>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-heading text-slate-900">Total</span>
                      <span className="text-lg font-heading text-primary-navy">${totalAmount.toLocaleString()}</span>
                    </div>
                  </div>

                  {paymentOption === "milestone" && paymentType === "escrow" && (
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <p className="text-xs text-blue-600 font-subheading mb-2">Milestone Breakdown:</p>
                      <div className="space-y-1 text-xs">
                        <div className="flex justify-between">
                          <span>First payment (50%)</span>
                          <span className="font-heading text-blue-700">${(milestonePayments.first + Math.round(milestonePayments.first * 0.05)).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Final payment (50%)</span>
                          <span className="font-heading text-blue-700">${(milestonePayments.second + Math.round(milestonePayments.second * 0.05)).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Security & Escrow Info */}
              {paymentType === "escrow" && (
                <Card className="border-green-200 bg-green-50 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-lg font-heading text-green-800 flex items-center">
                      <Shield className="h-5 w-5 mr-2" />
                      Escrow Protection
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <Check className="h-4 w-4 text-green-600 mt-0.5" />
                      <p className="text-sm text-green-700 font-subheading">
                        Your payment is held securely by 100networks until project completion
                      </p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Check className="h-4 w-4 text-green-600 mt-0.5" />
                      <p className="text-sm text-green-700 font-subheading">
                        Funds are only released when you approve the final deliverables
                      </p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Check className="h-4 w-4 text-green-600 mt-0.5" />
                      <p className="text-sm text-green-700 font-subheading">
                        Built-in dispute resolution process for your protection
                      </p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Check className="h-4 w-4 text-green-600 mt-0.5" />
                      <p className="text-sm text-green-700 font-subheading">
                        Full refund guarantee if project is not delivered
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Hire Button */}
              <Button 
                onClick={handleHireFreelancer}
                disabled={isProcessing}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-heading py-3 rounded-lg"
              >
                {isProcessing ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Processing...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <Lock className="h-4 w-4 mr-2" />
                    Hire {freelancer.name} Now
                  </div>
                )}
              </Button>

              <p className="text-xs text-slate-500 text-center">
                By clicking "Hire Now", you agree to the 
                <span className="text-primary-navy font-subheading"> Terms of Service</span> and 
                <span className="text-primary-navy font-subheading"> Escrow Agreement</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Portal Modal */}
      {showPaymentPortal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-heading text-primary-navy mb-2">Secure Payment Portal</h2>
              <p className="text-slate-600">Processing your payment securely</p>
            </div>

            {paymentStep === 1 && (
              <div className="space-y-6">
                <div className="p-4 bg-slate-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-subheading text-slate-700">Total Amount</span>
                    <span className="text-xl font-heading text-primary-navy">${totalAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-slate-600">
                    <span>Payment Method</span>
                    <span>Visa •••• 4242</span>
                  </div>
                </div>
                
                <Button 
                  onClick={processPayment}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-heading py-3"
                >
                  <Lock className="h-4 w-4 mr-2" />
                  Authorize Payment
                </Button>
              </div>
            )}

            {paymentStep === 2 && (
              <div className="text-center space-y-4">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600 mx-auto"></div>
                <div>
                  <p className="font-subheading text-slate-900">Processing Payment...</p>
                  <p className="text-sm text-slate-600">Please wait while we securely process your payment</p>
                </div>
              </div>
            )}

            {paymentStep === 3 && (
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <div>
                  <p className="font-subheading text-green-600">Payment Authorized!</p>
                  <p className="text-sm text-slate-600">Redirecting to success page...</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Success Popup */}
      {showSuccessPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-8">
            <div className="text-center space-y-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              
              <div>
                <h2 className="text-4xl font-heading text-green-600 mb-2">Success!</h2>
                <p className="text-xl text-slate-700 font-subheading">You have successfully hired {freelancer.name}</p>
              </div>

                              <div className="p-4 bg-green-50 rounded-lg border border-green-200 text-left">
                  <h3 className="font-heading text-green-800 mb-2">What happens next:</h3>
                  <ul className="space-y-2 text-sm text-green-700">
                    <li className="flex items-start">
                      <Check className="h-4 w-4 mr-2 mt-0.5" />
                      <span>Contract sent to {freelancer.name} for acceptance</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 mr-2 mt-0.5" />
                      <span>
                        {paymentType === "escrow" 
                          ? "Funds secured in escrow until project completion"
                          : "You'll coordinate payment directly with the freelancer"
                        }
                      </span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 mr-2 mt-0.5" />
                      <span>You'll receive email updates on project progress</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 mr-2 mt-0.5" />
                      <span>Communication channel activated in your dashboard</span>
                    </li>
                  </ul>
                </div>

                              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm text-blue-700">
                    <strong>Project Amount:</strong> ${project.agreedAmount.toLocaleString()}<br/>
                    <strong>Platform Fee:</strong> ${paymentType === "escrow" ? Math.round(project.agreedAmount * 0.05) : 0}<br/>
                    <strong>Total {paymentType === "escrow" ? "Paid" : "Agreed"}:</strong> ${totalAmount.toLocaleString()}
                    {paymentType === "direct" && (
                      <><br/><em className="text-blue-600">Payment to be coordinated directly with freelancer</em></>
                    )}
                  </p>
                </div>

              <div className="flex space-x-3">
                <Button 
                  onClick={closeSuccessPopup}
                  className="flex-1 bg-primary-navy hover:bg-primary-navy/90 text-white font-heading"
                >
                  View My Projects
                </Button>
                <Button 
                  onClick={() => setShowSuccessPopup(false)}
                  variant="outline"
                  className="flex-1 border-slate-200 hover:border-primary-navy hover:text-primary-navy font-subheading"
                >
                  Stay Here
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
} 