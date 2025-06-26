"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, FileText, Shield, Users, Eye, AlertTriangle, Scale, Clock } from "lucide-react"
import { useRouter } from "next/navigation"

export default function TermsOfServicePage() {
  const router = useRouter()

  const sections = [
    {
      id: "acceptance",
      title: "1. Acceptance of Terms",
      icon: FileText,
      content: `By accessing and using 100Networks, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.`
    },
    {
      id: "description",
      title: "2. Service Description",
      icon: Users,
      content: `100Networks is a professional networking platform that connects job seekers, professionals, and employers. Our service includes profile creation, job searching, company discovery, networking features, and career development resources.`
    },
    {
      id: "eligibility",
      title: "3. User Eligibility",
      icon: Shield,
      content: `You must be at least 18 years old to use our services. By using 100Networks, you represent and warrant that you have the right, authority, and capacity to enter into this agreement and to abide by all terms and conditions.`
    },
    {
      id: "accounts",
      title: "4. User Accounts and Registration",
      icon: Users,
      content: `When you create an account with us, you must provide information that is accurate, complete, and current at all times. You are responsible for safeguarding the password and for any activities that occur under your account.`
    },
    {
      id: "conduct",
      title: "5. User Conduct and Content",
      icon: AlertTriangle,
      content: `You agree not to use the service to upload, post, or transmit any content that is unlawful, harmful, threatening, abusive, harassing, defamatory, vulgar, obscene, or otherwise objectionable. Professional conduct is expected at all times.`
    },
    {
      id: "privacy",
      title: "6. Privacy and Data Protection",
      icon: Eye,
      content: `Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your information when you use our service. By using 100Networks, you agree to the collection and use of information in accordance with our Privacy Policy.`
    },
    {
      id: "intellectual",
      title: "7. Intellectual Property Rights",
      icon: Scale,
      content: `The service and its original content, features, and functionality are and will remain the exclusive property of 100Networks. The service is protected by copyright, trademark, and other laws.`
    },
    {
      id: "termination",
      title: "8. Termination",
      icon: Clock,
      content: `We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.`
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      <div className="max-w-5xl mx-auto p-6">
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
                <h1 className="text-3xl font-heading text-primary-navy">Terms of Service</h1>
                <p className="text-slate-600 font-subheading">Last updated: December 2024</p>
              </div>
            </div>
          </div>

          {/* Introduction */}
          <Card className="shadow-sm border-slate-200 mb-8">
            <CardContent className="p-8">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-[#0056B3]/10 rounded-xl">
                  <Scale className="h-6 w-6 text-[#0056B3]" />
                </div>
                <div>
                  <h2 className="text-xl font-heading text-primary-navy mb-3">Welcome to 100Networks</h2>
                  <p className="font-subheading text-slate-600 leading-relaxed mb-4">
                    These Terms of Service ("Terms") govern your use of 100Networks operated by 100Networks, Inc. 
                    Please read these Terms carefully before using our service.
                  </p>
                  <p className="font-subheading text-slate-600 leading-relaxed">
                    By accessing or using our service, you agree to be bound by these Terms. If you disagree with 
                    any part of these terms, then you may not access the service.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Terms Sections */}
          <div className="space-y-6">
            {sections.map((section) => {
              const IconComponent = section.icon
              return (
                <Card key={section.id} className="shadow-sm border-slate-200">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-[#0056B3]/10 rounded-lg">
                        <IconComponent className="h-5 w-5 text-[#0056B3]" />
                      </div>
                      <CardTitle className="font-heading text-primary-navy">{section.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="font-subheading text-slate-600 leading-relaxed">{section.content}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Additional Terms */}
          <div className="mt-8 space-y-6">
            <Card className="shadow-sm border-slate-200">
              <CardHeader>
                <CardTitle className="font-heading text-primary-navy">9. Limitation of Liability</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="font-subheading text-slate-600 leading-relaxed">
                  In no event shall 100Networks, nor its directors, employees, partners, agents, suppliers, or affiliates, 
                  be liable for any indirect, incidental, special, consequential, or punitive damages, including without 
                  limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
                </p>
                <ul className="list-disc list-inside space-y-2 text-slate-600 font-subheading ml-4">
                  <li>Your access to or use of or inability to access or use the service</li>
                  <li>Any conduct or content of any third party on the service</li>
                  <li>Any content obtained from the service</li>
                  <li>Unauthorized access, use or alteration of your transmissions or content</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="shadow-sm border-slate-200">
              <CardHeader>
                <CardTitle className="font-heading text-primary-navy">10. Disclaimers</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-subheading text-slate-600 leading-relaxed">
                  The information on this service is provided on an "as is" basis. To the fullest extent permitted by law, 
                  this Company excludes all representations, warranties, conditions and terms whether express or implied, 
                  statutory or otherwise. We make no warranty that the service will be uninterrupted, timely, secure, or error-free.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-sm border-slate-200">
              <CardHeader>
                <CardTitle className="font-heading text-primary-navy">11. Governing Law</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-subheading text-slate-600 leading-relaxed">
                  These Terms shall be interpreted and governed by the laws of the State of California, United States, 
                  without regard to its conflict of law provisions. Our failure to enforce any right or provision of these 
                  Terms will not be considered a waiver of those rights.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-sm border-slate-200">
              <CardHeader>
                <CardTitle className="font-heading text-primary-navy">12. Changes to Terms</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-subheading text-slate-600 leading-relaxed">
                  We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision 
                  is material, we will try to provide at least 30 days' notice prior to any new terms taking effect. 
                  What constitutes a material change will be determined at our sole discretion.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <Card className="shadow-sm border-slate-200 bg-primary-navy text-white mt-8">
            <CardContent className="p-8">
              <div className="text-center">
                <h3 className="text-xl font-heading mb-4">Questions About These Terms?</h3>
                <p className="font-subheading mb-6 opacity-90">
                  If you have any questions about these Terms of Service, please contact us.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-md mx-auto">
                  <div className="text-center">
                    <p className="font-subheading text-sm opacity-75 mb-1">Email</p>
                    <p className="font-heading">legal@100networks.com</p>
                  </div>
                  <div className="text-center">
                    <p className="font-subheading text-sm opacity-75 mb-1">Address</p>
                    <p className="font-heading text-sm">100 Networks Ave<br />San Francisco, CA 94105</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Agreement Confirmation */}
          <div className="mt-8 p-6 bg-slate-100 rounded-xl border border-slate-200">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="h-6 w-6 text-amber-600 mt-1" />
              <div>
                <h3 className="font-heading text-primary-navy mb-2">Important Notice</h3>
                <p className="font-subheading text-slate-600 text-sm leading-relaxed">
                  By continuing to use 100Networks, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. 
                  If you do not agree to these terms, you must discontinue use of our service immediately.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 