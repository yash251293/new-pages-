"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Logo } from "@/components/logo"
import { ChevronRight } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function LandingPage() {
  const router = useRouter()
  const [userType, setUserType] = useState<'company' | 'individual'>('company')

  const handleUserTypeSelect = (type: 'company' | 'individual') => {
    setUserType(type)
    router.push(`/auth/signup?type=${type}`)
  }

  return (
    <div className="flex flex-col min-h-screen bg-white text-brand-text-dark">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex justify-between items-center">
          <Logo className="font-['Lora'] text-brand-text-darker" />
          <div className="space-x-4 flex items-center">
            <button
              onClick={() => handleUserTypeSelect('company')}
              className={`text-sm font-bold px-6 py-2.5 rounded-xl transition-all duration-200 ${
                userType === 'company'
                  ? 'bg-brand-blue text-white shadow-lg shadow-brand-blue/20'
                  : 'bg-gray-100 text-brand-text-dark hover:bg-gray-200'
              }`}
            >
              For Company
            </button>
            <button
              onClick={() => handleUserTypeSelect('individual')}
              className={`text-sm font-bold px-6 py-2.5 rounded-xl transition-all duration-200 ${
                userType === 'individual'
                  ? 'bg-brand-blue text-white shadow-lg shadow-brand-blue/20'
                  : 'bg-gray-100 text-brand-text-dark hover:bg-gray-200'
              }`}
            >
              For Individual
            </button>
          </div>
        </nav>
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-['Lora'] leading-tight mb-6 text-brand-text-dark">
                Expand Your World: Connect, Collaborate, Succeed with 100 Networks
              </h1>
              <p className="text-lg text-brand-text-medium mb-8 font-['Abhaya_Libre_Medium']">
                100 Networks empowers you to build meaningful professional relationships, discover collaborations, and
                accelerate your growth. Find your next connection, mentor, or business partner today.
              </p>
              <Button
                size="lg"
                className="bg-brand-blue hover:bg-brand-blue-light text-base font-medium px-6 py-3"
                onClick={() => handleUserTypeSelect(userType)}
              >
                Get Started
              </Button>
            </div>
            <div>
              <Image
                src="/image21.png?width=600&height=500"
                alt="Hero Illustration"
                width={580}
                height={500}
                className="rounded-lg"
              />
            </div>
          </div>
        </section>

        {/* 3 Simple Steps Section */}
        <section className="py-16 md:py-24 bg-brand-bg-light-gray">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-['Abhaya_Libre_Bold'] text-brand-text-dark text-center mb-16">
              Building Your Network in 3 Simple Steps
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: "/icon1.png?width=80&height=80",
                  title: "Create Your Profile",
                  description:
                    "Showcase your expertise, projects, and aspirations. Let your professional story shine and attract the right connections.",
                },
                {
                  icon: "/icon2.png?width=80&height=80",
                  title: "Discover & Connect",
                  description:
                    "Explore diverse networks, find professionals by industry, skill, or interest, and send personalized connection requests to like-minded individuals.",
                },
                {
                  icon: "/icon3.png?width=80&height=80",
                  title: "Collaborate & Grow",
                  description:
                    "Engage in discussions, initiate projects, find mentors, and unlock new opportunities that drive your professional and business success.",
                },
              ].map((step, index) => (
                <Card key={index} className="text-center bg-white shadow-md rounded-lg p-6">
                  <CardHeader className="p-0 mb-4">
                    <Image
                      src={step.icon || "/icon4.png?width=60&height=60&query=abstract+icon"}
                      alt={`${step.title} icon`}
                      width={60}
                      height={60}
                      className="mx-auto mb-4"
                    />
                    <CardTitle className="text-xl font-['Abhaya_Libre_Bold'] text-brand-text-dark">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <p className="text-brand-text-medium text-sm leading-relaxed">{step.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Feature Sections */}
        {[
          {
            icon: "/icon5.png?width=80&height=80",
            title: "Expand Your World: Connect, Collaborate, Succeed with 100 Networks.",
            description:
              "100 Networks empowers you to build meaningful professional relationships, discover collaborations, and accelerate your growth. Find your next connection, mentor, or business partner today.",
            image: "/image1.png?width=500&height=400",
            imgLeft: false,
          },
          {
            icon: "/icon6.png?width=80&height=80",
            title: "Forge Your Future: Connect, Hire, Grow with 100 Networks.",
            description:
              "Beyond traditional networking, our platform empowers you to discover unparalleled career opportunities and secure the talent that drives innovation. Your next breakthrough is just a connection away.",
            image: "/image5.png?width=500&height=400",
            imgLeft: true,
          },
          {
            icon: "/icon4.png?width=80&height=80",
            title: "Discover Your Fit: Internships & Jobs Designed For Your Growth.",
            description:
              "Navigate your career path with confidence. 100 Networks simplifies your search, connecting you with curated internships and rewarding jobs that perfectly align with your aspirations and propel your professional journey.",
            image: "/image6.png?width=500&height=400",
            imgLeft: false,
          },
        ].map((feature, index) => (
          <section key={index} className={`py-16 md:py-24 ${index % 2 === 0 ? "bg-white" : "bg-brand-bg-light-gray"}`}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
              <div className={` ${feature.imgLeft ? "md:order-2" : ""}`}>
                <Image
                  src={feature.icon || "/placeholder.svg?width=60&height=60&query=feature+icon"}
                  alt="Feature Icon"
                  width={60}
                  height={60}
                  className="mb-4"
                />
                <h2 className="text-3xl sm:text-[32px] font-['Abhaya_Libre_Bold'] text-brand-text-dark mb-4 leading-snug">
                  {feature.title}
                </h2>
                <p className="text-base text-brand-text-medium mb-6 leading-relaxed">{feature.description}</p>
                <Button variant="link" className="text-brand-blue p-0 h-auto hover:text-brand-blue-light font-medium">
                  Learn More <ChevronRight className="ml-1 w-4 h-4" />
                </Button>
              </div>
              <div className={`flex justify-center ${feature.imgLeft ? "md:order-1" : ""}`}>
                <Image
                  src={feature.image || "/placeholder.svg"}
                  alt={feature.title}
                  width={500}
                  height={400}
                  className="rounded-lg"
                />
              </div>
            </div>
          </section>
        ))}

        {/* Mission Section */}
        <section className="py-16 md:py-24 bg-brand-bg-beige">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Logo className="font-['Lora'] text-brand-text-darker" />
            <p className="text-lg md:text-xl text-brand-text-medium max-w-3xl mx-auto leading-relaxed">
              Our mission at 100 Networks is to empower individuals at every career stage by providing unparalleled
              access to top-tier internships and rewarding job opportunities.
            </p>
          </div>
        </section>
      </main>

      <footer className="py-8 bg-brand-text-dark text-brand-bg-light-gray">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} 100Networks. All rights reserved.</p>
          <div className="mt-2 space-x-4">
            <Link href="#" className="hover:underline">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:underline">
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
