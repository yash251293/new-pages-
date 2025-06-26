"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { 
  CreditCard, 
  Plus, 
  Download, 
  ArrowLeft, 
  Check, 
  Calendar,
  DollarSign,
  Edit,
  Trash2,
  ExternalLink,
  Receipt,
  AlertCircle,
  User,
  Clock,
  FileText,
  Building2,
  Users,
  Briefcase
} from "lucide-react"
import Link from "next/link"

export default function CompanyBillingPage() {
  const paymentMethods = [
    {
      id: 1,
      type: "Corporate Visa",
      lastFour: "8888",
      expiryMonth: 3,
      expiryYear: 2026,
      isDefault: true,
      holderName: "TechCorp Solutions LLC"
    },
    {
      id: 2,
      type: "American Express",
      lastFour: "1001",
      expiryMonth: 11,
      expiryYear: 2025,
      isDefault: false,
      holderName: "TechCorp Solutions LLC"
    }
  ]

  const businessPayments = [
    {
      id: 1,
      date: "2024-01-18",
      freelancer: "Senior React Developer",
      project: "E-commerce Platform Development",
      amount: 8500.00,
      status: "completed",
      paymentType: "Project Completion",
      duration: "6 weeks",
      invoiceNumber: "INV-2024-001"
    },
    {
      id: 2,
      date: "2024-01-15",
      freelancer: "UX/UI Design Team",
      project: "Mobile App Interface Design",
      amount: 6200.00,
      status: "completed",
      paymentType: "Milestone Payment (4/4)",
      duration: "1 month",
      invoiceNumber: "INV-2024-002"
    },
    {
      id: 3,
      date: "2024-01-12",
      freelancer: "Backend Engineer",
      project: "API Integration & Database",
      amount: 7800.00,
      status: "completed",
      paymentType: "Milestone Payment (3/3)",
      duration: "5 weeks",
      invoiceNumber: "INV-2024-003"
    },
    {
      id: 4,
      date: "2024-01-08",
      freelancer: "Digital Marketing Specialist",
      project: "Q1 Marketing Campaign",
      amount: 4500.00,
      status: "completed",
      paymentType: "Monthly Retainer",
      duration: "1 month",
      invoiceNumber: "INV-2024-004"
    },
    {
      id: 5,
      date: "2024-01-05",
      freelancer: "DevOps Consultant",
      project: "Cloud Infrastructure Setup",
      amount: 5200.00,
      status: "completed",
      paymentType: "Project Payment",
      duration: "2 weeks",
      invoiceNumber: "INV-2024-005"
    },
    {
      id: 6,
      date: "2024-01-02",
      freelancer: "Content Strategy Team",
      project: "Website Content Overhaul",
      amount: 3400.00,
      status: "pending",
      paymentType: "Project Payment",
      duration: "3 weeks",
      invoiceNumber: "INV-2024-006"
    },
    {
      id: 7,
      date: "2023-12-28",
      freelancer: "Security Consultant",
      project: "Cybersecurity Audit",
      amount: 9200.00,
      status: "completed",
      paymentType: "Consulting Fee",
      duration: "4 weeks",
      invoiceNumber: "INV-2023-098"
    },
    {
      id: 8,
      date: "2023-12-22",
      freelancer: "Full-Stack Developer",
      project: "Customer Portal Development",
      amount: 11800.00,
      status: "completed",
      paymentType: "Project Completion",
      duration: "8 weeks",
      invoiceNumber: "INV-2023-099"
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-200"
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "failed":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-slate-100 text-slate-800 border-slate-200"
    }
  }

  const totalSpent = businessPayments.reduce((sum, payment) => sum + payment.amount, 0)
  const completedPayments = businessPayments.filter(p => p.status === "completed").length
  const pendingPayments = businessPayments.filter(p => p.status === "pending").length

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      <div className="w-[65%] mx-auto py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <Link href="/company-profile">
                <Button variant="ghost" size="icon" className="p-2 hover:bg-slate-100 rounded-xl">
                  <ArrowLeft className="h-5 w-5 text-slate-600" />
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-primary-navy">Company Billing & Payments</h1>
                <p className="text-lg text-slate-600 font-semibold">
                  Manage corporate payment methods and view business hiring transaction history
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Building2 className="h-6 w-6 text-primary-navy" />
              <span className="text-sm font-semibold text-slate-600">Business Account</span>
            </div>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-slate-200 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <DollarSign className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-primary-navy">${totalSpent.toLocaleString()}</p>
                  <p className="text-sm text-slate-600 font-semibold">Total Business Spend</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Check className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-primary-navy">{completedPayments}</p>
                  <p className="text-sm text-slate-600 font-semibold">Completed Payments</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Clock className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-primary-navy">{pendingPayments}</p>
                  <p className="text-sm text-slate-600 font-semibold">Pending Payments</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-primary-navy">23</p>
                  <p className="text-sm text-slate-600 font-semibold">Active Contractors</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Payment Methods */}
          <div className="lg:col-span-2 space-y-8">
            {/* Payment Methods */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-bold text-primary-navy">Corporate Payment Methods</CardTitle>
                  <Button className="bg-primary-navy hover:bg-primary-navy/90 text-white font-semibold">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Card
                  </Button>
                </div>
                <CardDescription className="font-semibold">
                  Manage your company's payment methods for hiring freelancers and contractors
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {paymentMethods.map((method) => (
                  <div key={method.id} className="border border-slate-200 rounded-xl p-4 hover:border-primary-navy/30 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-8 bg-gradient-to-r from-primary-navy to-blue-600 rounded-lg flex items-center justify-center">
                          <CreditCard className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <p className="font-bold text-slate-900">{method.type} •••• {method.lastFour}</p>
                            {method.isDefault && (
                              <Badge variant="outline" className="text-xs font-bold border-green-200 text-green-700 bg-green-50">
                                Default
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-slate-600 font-semibold">{method.holderName}</p>
                          <p className="text-xs text-slate-500">Expires {method.expiryMonth.toString().padStart(2, '0')}/{method.expiryYear}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm" className="text-slate-600 hover:text-primary-navy">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-slate-600 hover:text-red-600">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Business Payment History */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl font-bold text-primary-navy">Business Payment History</CardTitle>
                    <CardDescription className="font-semibold">
                      Track all payments made to freelancers and contractors
                    </CardDescription>
                  </div>
                  <Button variant="outline" className="border-slate-200 hover:border-primary-navy hover:text-primary-navy font-semibold">
                    <Download className="h-4 w-4 mr-2" />
                    Export CSV
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {businessPayments.map((payment) => (
                    <div key={payment.id} className="border border-slate-200 rounded-xl p-4 hover:border-primary-navy/30 transition-colors">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-primary-navy/10 rounded-full flex items-center justify-center">
                            <Briefcase className="h-5 w-5 text-primary-navy" />
                          </div>
                          <div>
                            <p className="font-bold text-slate-900">{payment.freelancer}</p>
                            <p className="text-sm text-slate-600 font-semibold">{payment.project}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-primary-navy">${payment.amount.toLocaleString()}</p>
                          <Badge className={`text-xs font-bold ${getStatusColor(payment.status)}`}>
                            {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm text-slate-600">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span className="font-semibold">{new Date(payment.date).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span className="font-semibold">{payment.duration}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <FileText className="h-4 w-4" />
                            <span className="font-semibold">{payment.invoiceNumber}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs font-semibold bg-blue-50 text-blue-700 px-2 py-1 rounded-full">
                            {payment.paymentType}
                          </span>
                          <Button variant="ghost" size="sm" className="text-slate-600 hover:text-primary-navy">
                            <Receipt className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Quick Actions & Info */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-bold text-primary-navy">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start border-slate-200 hover:border-primary-navy hover:text-primary-navy font-semibold">
                  <Plus className="h-4 w-4 mr-3" />
                  Add Payment Method
                </Button>
                <Button variant="outline" className="w-full justify-start border-slate-200 hover:border-primary-navy hover:text-primary-navy font-semibold">
                  <Download className="h-4 w-4 mr-3" />
                  Download Statements
                </Button>
                <Button variant="outline" className="w-full justify-start border-slate-200 hover:border-primary-navy hover:text-primary-navy font-semibold">
                  <FileText className="h-4 w-4 mr-3" />
                  Tax Documents
                </Button>
                <Button variant="outline" className="w-full justify-start border-slate-200 hover:border-primary-navy hover:text-primary-navy font-semibold">
                  <ExternalLink className="h-4 w-4 mr-3" />
                  Payment Settings
                </Button>
              </CardContent>
            </Card>

            {/* Payment Security */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-bold text-primary-navy">Payment Security</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mt-1">
                    <Check className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-sm">SSL Encryption</p>
                    <p className="text-xs text-slate-600">All payments are secured with 256-bit SSL encryption</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mt-1">
                    <Check className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-sm">PCI Compliance</p>
                    <p className="text-xs text-slate-600">We're PCI DSS Level 1 certified</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mt-1">
                    <Check className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-sm">Fraud Protection</p>
                    <p className="text-xs text-slate-600">Advanced fraud detection and monitoring</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Support */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-bold text-primary-navy">Need Help?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start border-slate-200 hover:border-primary-navy hover:text-primary-navy font-semibold">
                  <AlertCircle className="h-4 w-4 mr-3" />
                  Contact Support
                </Button>
                <Button variant="outline" className="w-full justify-start border-slate-200 hover:border-primary-navy hover:text-primary-navy font-semibold">
                  <FileText className="h-4 w-4 mr-3" />
                  Billing FAQ
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
} 