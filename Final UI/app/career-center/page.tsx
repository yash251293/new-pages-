import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Calendar, FileText, Lightbulb, Users } from "lucide-react"

export default function CareerCenterPage() {
  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Career Center</h1>

      <Tabs defaultValue="resources" className="mb-8">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
          <TabsTrigger value="career-fairs">Career Fairs</TabsTrigger>
        </TabsList>
        <TabsContent value="resources">
          <div className="grid grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-blue-500" />
                  Resume Resources
                </CardTitle>
                <CardDescription>Perfect your resume</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Get templates, tips, and feedback to create a standout resume.
                </p>
                <Button variant="outline" className="w-full">
                  View Resources
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <BookOpen className="h-5 w-5 mr-2 text-green-500" />
                  Interview Prep
                </CardTitle>
                <CardDescription>Ace your interviews</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Practice common questions and learn techniques to impress employers.
                </p>
                <Button variant="outline" className="w-full">
                  Start Practicing
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Lightbulb className="h-5 w-5 mr-2 text-yellow-500" />
                  Career Exploration
                </CardTitle>
                <CardDescription>Discover your path</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Explore industries, roles, and find the right career for your skills and interests.
                </p>
                <Button variant="outline" className="w-full">
                  Explore Careers
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Users className="h-5 w-5 mr-2 text-purple-500" />
                  Networking
                </CardTitle>
                <CardDescription>Build your following</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Learn how to network effectively and build professional relationships.
                </p>
                <Button variant="outline" className="w-full">
                  Networking Tips
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-red-500" />
                  Job Search Strategy
                </CardTitle>
                <CardDescription>Find your dream job</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Develop a strategic approach to finding and landing the right opportunities.
                </p>
                <Button variant="outline" className="w-full">
                  View Strategies
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="appointments">
          <div className="text-center py-12">
            <h3 className="text-lg font-medium mb-2">No scheduled appointments</h3>
            <p className="text-muted-foreground mb-4">Schedule a meeting with a career advisor</p>
            <Button>Book Appointment</Button>
          </div>
        </TabsContent>
        <TabsContent value="career-fairs">
          <div className="text-center py-12">
            <h3 className="text-lg font-medium mb-2">No upcoming career fairs</h3>
            <p className="text-muted-foreground mb-4">Check back later for career fairs at your school</p>
            <Button>View Career Fairs</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
