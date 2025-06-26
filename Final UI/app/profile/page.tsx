import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  MapPin,
  Mail,
  Phone,
  Globe,
  Edit,
  Plus,
  Award,
  Briefcase,
  GraduationCap,
  Users,
  Eye,
  MessageCircle,
  Star,
  Calendar,
  ExternalLink,
  Download,
  Camera,
  Verified
} from "lucide-react"

export default function ProfilePage() {
  return (
    <div className="max-w-6xl mx-auto py-6">
      {/* Enhanced Header Card */}
      <Card className="mb-8 border-slate-200 shadow-lg overflow-hidden">
        <div className="relative">
          {/* Modern Cover Photo */}
          <div className="h-56 bg-gradient-to-br from-primary-navy via-[#0056B3] to-slate-600 relative">
            <div className="absolute inset-0 bg-black/20"></div>
            <Button
              size="sm"
              variant="secondary"
              className="absolute top-4 right-4 bg-white/90 hover:bg-white text-slate-700 rounded-lg font-subheading"
            >
              <Camera className="h-4 w-4 mr-2" />
              Edit Cover
            </Button>
          </div>

          {/* Enhanced Profile Section */}
          <div className="relative px-8 pb-8">
            <div className="flex flex-col lg:flex-row lg:items-end lg:space-x-8">
              {/* Profile Picture */}
              <div className="relative mb-6 lg:mb-0 -mt-16">
                <Avatar className="h-36 w-36 border-4 border-white shadow-xl">
                  <AvatarImage src="/professional-user-avatar.png" alt="Alex Johnson" />
                  <AvatarFallback className="text-2xl font-heading bg-gradient-to-br from-primary-navy to-[#0056B3] text-white">AJ</AvatarFallback>
                </Avatar>
                <Button
                  size="icon"
                  variant="secondary"
                  className="absolute bottom-2 right-2 h-10 w-10 rounded-full bg-white shadow-lg hover:shadow-xl border-2 border-slate-100"
                >
                  <Edit className="h-4 w-4" />
                </Button>
              </div>

              {/* Profile Info */}
              <div className="flex-1 mt-8">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                  <div className="mb-4 lg:mb-0">
                    <div className="flex items-center space-x-3 mb-2">
                      <h1 className="text-3xl font-heading text-primary-navy">Alex Johnson</h1>
                      <Verified className="h-6 w-6 text-[#0056B3]" />
                    </div>
                    <p className="text-xl font-subheading text-slate-600 mb-2">Senior Software Engineer at TechCorp</p>
                    <div className="flex items-center text-slate-500 font-subheading">
                      <MapPin className="h-4 w-4 mr-2" />
                      San Francisco, CA • Available for opportunities
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    <Button variant="outline" className="border-slate-200 hover:border-primary-navy hover:text-primary-navy rounded-lg font-subheading">
                      <Download className="h-4 w-4 mr-2" />
                      Resume
                    </Button>
                    <Button className="bg-primary-navy hover:bg-primary-navy/90 text-white rounded-lg font-subheading">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Button>
                  </div>
                </div>

                {/* Contact & Links */}
                <div className="flex flex-wrap gap-6 mt-6 text-sm">
                  <a href="mailto:alex.johnson@email.com" className="flex items-center text-[#0056B3] hover:text-primary-navy transition-colors font-subheading">
                    <Mail className="h-4 w-4 mr-2" />
                    alex.johnson@email.com
                  </a>
                  <div className="flex items-center text-slate-500 font-subheading">
                    <Phone className="h-4 w-4 mr-2" />
                    (555) 123-4567
                  </div>
                  <a href="https://alexjohnson.dev" target="_blank" rel="noopener noreferrer" className="flex items-center text-[#0056B3] hover:text-primary-navy transition-colors font-subheading">
                    <Globe className="h-4 w-4 mr-2" />
                    alexjohnson.dev
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </a>
                </div>

                {/* Enhanced Stats */}
                <div className="flex flex-wrap gap-8 mt-6">
                  <div className="flex items-center space-x-2">
                    <Users className="h-5 w-5 text-[#0056B3]" />
                    <div>
                      <span className="font-heading text-lg text-primary-navy">500+</span>
                      <span className="text-slate-500 font-subheading ml-1">followers</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Eye className="h-5 w-5 text-[#0056B3]" />
                    <div>
                      <span className="font-heading text-lg text-primary-navy">1,234</span>
                      <span className="text-slate-500 font-subheading ml-1">profile views</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Star className="h-5 w-5 text-yellow-500" />
                    <div>
                      <span className="font-heading text-lg text-primary-navy">4.9</span>
                      <span className="text-slate-500 font-subheading ml-1">rating</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Enhanced About Section */}
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between border-b border-slate-100 pb-4">
              <h2 className="text-2xl font-heading text-primary-navy">About</h2>
              <Button variant="ghost" size="icon" className="text-slate-400 hover:text-primary-navy hover:bg-primary-navy/5 rounded-full">
                <Edit className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-slate-600 font-subheading leading-relaxed text-lg">
                Passionate software engineer with 7+ years of experience building scalable web applications. Specialized
                in React, Node.js, and cloud technologies. I love solving complex problems and mentoring junior
                developers. Currently focused on building AI-powered solutions that make a positive impact on people's
                lives.
              </p>
              <div className="flex flex-wrap gap-2 mt-6">
                <Badge className="bg-[#0056B3]/10 text-[#0056B3] border-[#0056B3]/20 font-subheading">Open to work</Badge>
                <Badge className="bg-green-50 text-green-700 border-green-200 font-subheading">Remote friendly</Badge>
                <Badge className="bg-yellow-50 text-yellow-700 border-yellow-200 font-subheading">Mentor available</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Experience Section */}
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between border-b border-slate-100 pb-4">
              <h2 className="text-2xl font-heading text-primary-navy">Experience</h2>
              <Button variant="ghost" size="icon" className="text-slate-400 hover:text-primary-navy hover:bg-primary-navy/5 rounded-full">
                <Plus className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="pt-6 space-y-8">
              <div className="flex space-x-6">
                <div className="flex-shrink-0">
                  <div className="h-16 w-16 bg-gradient-to-br from-primary-navy to-[#0056B3] rounded-xl flex items-center justify-center shadow-lg">
                    <Briefcase className="h-8 w-8 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-heading text-primary-navy">Senior Software Engineer</h3>
                      <p className="text-slate-600 font-subheading text-lg">TechCorp • Full-time</p>
                      <div className="flex items-center space-x-4 mt-1 text-sm text-slate-500">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span className="font-subheading">Jan 2022 - Present • 3 yrs</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span className="font-subheading">San Francisco, CA</span>
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="text-slate-400 hover:text-primary-navy hover:bg-primary-navy/5 rounded-full">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-slate-600 font-subheading leading-relaxed mb-4">
                    Lead development of microservices architecture serving 1M+ users. Mentored 5 junior developers and
                    improved team productivity by 40%. Built scalable solutions using modern tech stack.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-slate-100 text-slate-700 font-subheading">React</Badge>
                    <Badge className="bg-slate-100 text-slate-700 font-subheading">Node.js</Badge>
                    <Badge className="bg-slate-100 text-slate-700 font-subheading">AWS</Badge>
                    <Badge className="bg-slate-100 text-slate-700 font-subheading">TypeScript</Badge>
                    <Badge className="bg-[#0056B3]/10 text-[#0056B3] font-subheading">Leadership</Badge>
                  </div>
                </div>
              </div>

              <div className="flex space-x-6">
                <div className="flex-shrink-0">
                  <div className="h-16 w-16 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Briefcase className="h-8 w-8 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-heading text-primary-navy">Software Engineer</h3>
                      <p className="text-slate-600 font-subheading text-lg">StartupXYZ • Full-time</p>
                      <div className="flex items-center space-x-4 mt-1 text-sm text-slate-500">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span className="font-subheading">Jun 2019 - Dec 2021 • 2 yrs 7 mos</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span className="font-subheading">Remote</span>
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="text-slate-400 hover:text-primary-navy hover:bg-primary-navy/5 rounded-full">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-slate-600 font-subheading leading-relaxed mb-4">
                    Built and maintained e-commerce platform handling $10M+ in annual revenue. Implemented CI/CD
                    pipelines and reduced deployment time by 60%. Worked in fast-paced startup environment.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-slate-100 text-slate-700 font-subheading">Vue.js</Badge>
                    <Badge className="bg-slate-100 text-slate-700 font-subheading">Python</Badge>
                    <Badge className="bg-slate-100 text-slate-700 font-subheading">Docker</Badge>
                    <Badge className="bg-slate-100 text-slate-700 font-subheading">PostgreSQL</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Education Section */}
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between border-b border-slate-100 pb-4">
              <h2 className="text-2xl font-heading text-primary-navy">Education</h2>
              <Button variant="ghost" size="icon" className="text-slate-400 hover:text-primary-navy hover:bg-primary-navy/5 rounded-full">
                <Plus className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex space-x-6">
                <div className="flex-shrink-0">
                  <div className="h-16 w-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                    <GraduationCap className="h-8 w-8 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-heading text-primary-navy mb-1">Bachelor of Science in Computer Science</h3>
                  <p className="text-slate-600 font-subheading text-lg mb-2">University of California, Berkeley</p>
                  <p className="text-slate-500 font-subheading mb-3">2015 - 2019 • Magna Cum Laude</p>
                  <p className="text-slate-600 font-subheading leading-relaxed">
                    Graduated Magna Cum Laude with focus on software engineering and data structures. Active in computer science organizations and hackathons.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Projects Section */}
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between border-b border-slate-100 pb-4">
              <h2 className="text-2xl font-heading text-primary-navy">Featured Projects</h2>
              <Button variant="ghost" size="icon" className="text-slate-400 hover:text-primary-navy hover:bg-primary-navy/5 rounded-full">
                <Plus className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              <Card className="border-slate-200 hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-heading text-primary-navy">AI-Powered Task Manager</h3>
                      <p className="text-slate-500 font-subheading">Personal Project • 2024</p>
                    </div>
                    <ExternalLink className="h-5 w-5 text-slate-400 hover:text-primary-navy cursor-pointer" />
                  </div>
                  <p className="text-slate-600 font-subheading leading-relaxed mb-4">
                    Built a smart task management app using React and OpenAI API that automatically categorizes and
                    prioritizes tasks based on user behavior. Features real-time collaboration and AI-driven insights.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-slate-100 text-slate-700 font-subheading">React</Badge>
                    <Badge className="bg-slate-100 text-slate-700 font-subheading">OpenAI API</Badge>
                    <Badge className="bg-slate-100 text-slate-700 font-subheading">Tailwind CSS</Badge>
                    <Badge className="bg-[#0056B3]/10 text-[#0056B3] font-subheading">AI/ML</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-slate-200 hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-heading text-primary-navy">E-commerce Analytics Dashboard</h3>
                      <p className="text-slate-500 font-subheading">Freelance Project • 2023</p>
                    </div>
                    <ExternalLink className="h-5 w-5 text-slate-400 hover:text-primary-navy cursor-pointer" />
                  </div>
                  <p className="text-slate-600 font-subheading leading-relaxed mb-4">
                    Developed a real-time analytics dashboard for an e-commerce client, resulting in 25% increase in
                    conversion rates. Featured advanced data visualization and custom metrics.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-slate-100 text-slate-700 font-subheading">Vue.js</Badge>
                    <Badge className="bg-slate-100 text-slate-700 font-subheading">D3.js</Badge>
                    <Badge className="bg-slate-100 text-slate-700 font-subheading">Node.js</Badge>
                    <Badge className="bg-green-100 text-green-700 font-subheading">Analytics</Badge>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* Enhanced Skills Section */}
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between border-b border-slate-100 pb-4">
              <h2 className="text-xl font-heading text-primary-navy">Technical Skills</h2>
              <Button variant="ghost" size="icon" className="text-slate-400 hover:text-primary-navy hover:bg-primary-navy/5 rounded-full">
                <Plus className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-subheading font-medium text-primary-navy">JavaScript</span>
                    <span className="text-xs font-subheading text-slate-500">Expert</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div className="bg-[#0056B3] h-2 rounded-full" style={{ width: "95%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-subheading font-medium text-primary-navy">React</span>
                    <span className="text-xs font-subheading text-slate-500">Expert</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div className="bg-[#0056B3] h-2 rounded-full" style={{ width: "90%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-subheading font-medium text-primary-navy">Node.js</span>
                    <span className="text-xs font-subheading text-slate-500">Advanced</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div className="bg-[#0056B3] h-2 rounded-full" style={{ width: "85%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-subheading font-medium text-primary-navy">AWS</span>
                    <span className="text-xs font-subheading text-slate-500">Advanced</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div className="bg-[#0056B3] h-2 rounded-full" style={{ width: "80%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-subheading font-medium text-primary-navy">Python</span>
                    <span className="text-xs font-subheading text-slate-500">Intermediate</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div className="bg-[#0056B3] h-2 rounded-full" style={{ width: "70%" }}></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Certifications Section */}
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between border-b border-slate-100 pb-4">
              <h2 className="text-xl font-heading text-primary-navy">Certifications</h2>
              <Button variant="ghost" size="icon" className="text-slate-400 hover:text-primary-navy hover:bg-primary-navy/5 rounded-full">
                <Plus className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="flex items-start space-x-4 p-3 rounded-lg bg-yellow-50 border border-yellow-200">
                <Award className="h-6 w-6 text-yellow-600 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="font-subheading font-medium text-primary-navy">AWS Certified Solutions Architect</h3>
                  <p className="text-sm font-subheading text-slate-600">Amazon Web Services • 2023</p>
                  <Badge className="bg-yellow-100 text-yellow-800 font-subheading text-xs mt-2">Active</Badge>
                </div>
              </div>
              <div className="flex items-start space-x-4 p-3 rounded-lg bg-blue-50 border border-blue-200">
                <Award className="h-6 w-6 text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="font-subheading font-medium text-primary-navy">React Developer Certification</h3>
                  <p className="text-sm font-subheading text-slate-600">Meta • 2022</p>
                  <Badge className="bg-blue-100 text-blue-800 font-subheading text-xs mt-2">Active</Badge>
                </div>
              </div>
              <div className="flex items-start space-x-4 p-3 rounded-lg bg-green-50 border border-green-200">
                <Award className="h-6 w-6 text-green-600 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="font-subheading font-medium text-primary-navy">Scrum Master Certified</h3>
                  <p className="text-sm font-subheading text-slate-600">Scrum Alliance • 2021</p>
                  <Badge className="bg-green-100 text-green-800 font-subheading text-xs mt-2">Active</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Languages Section */}
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between border-b border-slate-100 pb-4">
              <h2 className="text-xl font-heading text-primary-navy">Languages</h2>
              <Button variant="ghost" size="icon" className="text-slate-400 hover:text-primary-navy hover:bg-primary-navy/5 rounded-full">
                <Plus className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="pt-6 space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-subheading text-primary-navy">English</span>
                <Badge className="bg-green-100 text-green-800 font-subheading">Native</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-subheading text-primary-navy">Spanish</span>
                <Badge className="bg-blue-100 text-blue-800 font-subheading">Conversational</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-subheading text-primary-navy">French</span>
                <Badge className="bg-slate-100 text-slate-700 font-subheading">Basic</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Recommendations Section */}
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between border-b border-slate-100 pb-4">
              <h2 className="text-xl font-heading text-primary-navy">Recommendations</h2>
              <Button variant="ghost" size="icon" className="text-slate-400 hover:text-primary-navy hover:bg-primary-navy/5 rounded-full">
                <MessageCircle className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div className="border-l-4 border-[#0056B3] pl-6 py-4 bg-slate-50 rounded-r-lg">
                  <p className="font-subheading text-slate-700 italic leading-relaxed mb-4">
                    "Alex is an exceptional developer who consistently delivers high-quality code. Their leadership
                    skills and technical expertise make them invaluable to any team. I highly recommend Alex for senior engineering roles."
                  </p>
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/manager-avatar.png" alt="Sarah Chen" />
                      <AvatarFallback className="font-heading text-xs bg-primary-navy text-white">SC</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-subheading font-medium text-primary-navy">Sarah Chen</p>
                      <p className="text-sm font-subheading text-slate-500">Engineering Manager at TechCorp</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
