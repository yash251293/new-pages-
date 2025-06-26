import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send } from "lucide-react"

export default function MessageDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <Avatar className="h-12 w-12">
            <AvatarImage
              src="/placeholder.svg?height=48&width=48&query=professional woman"
              alt="Dr. Catrenia McLendon"
            />
            <AvatarFallback>CM</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-xl font-bold">Dr. Catrenia McLendon</h1>
            <p className="text-sm text-muted-foreground">
              Academic Liaison/Project and Content Manager · IBM SkillsBuild
            </p>
          </div>
        </div>
        <Button variant="outline">Not interested</Button>
      </div>

      <div className="border-t pt-4">
        <div className="flex items-start space-x-4 mb-8">
          <div className="text-sm text-muted-foreground text-right min-w-[100px]">Mon, May 12</div>
          <div className="flex-1">
            <div className="flex items-start space-x-4 mb-6">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32&query=professional woman" alt="Dr. Catrenia" />
                <AvatarFallback>DC</AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="font-medium">Dr. Catrenia</h3>
                  <span className="text-xs text-muted-foreground">9:05am</span>
                </div>
                <div className="mt-2 space-y-2">
                  <p>Hello Anshuman,</p>
                  <p>
                    Just a quick reminder to RSVP for IBM's Tech Talk Wednesdays on May 14th! Don't miss out on this
                    60-minute session to level up your skills and connect with industry experts and fellow students.
                  </p>
                  <p>
                    <strong>Secure your spot here:</strong>{" "}
                    <Link href="#" className="text-blue-600 hover:underline">
                      IBM USA College and University Student Tech Talk Wednesdays
                    </Link>
                  </p>
                  <p>We can't wait to see you there!</p>
                  <p>Dr Catrenia McLendon</p>
                </div>
              </div>
            </div>

            <div className="ml-12 p-4 bg-muted rounded-lg">
              <div className="flex items-start space-x-4">
                <img src="/placeholder.svg?height=40&width=40&query=IBM logo" alt="IBM" className="h-10 w-10" />
                <div>
                  <h3 className="font-medium">IBM SkillsBuild</h3>
                  <p className="text-sm text-muted-foreground">Information Technology</p>
                  <div className="mt-2">
                    <h4 className="font-medium">IBM USA College and University Student Tech Talk Wednesdays</h4>
                    <p className="text-sm text-muted-foreground">Past · Thu, May 15 · Virtual</p>
                    <p className="text-xs text-muted-foreground mt-1">Created by IBM SkillsBuild</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t pt-4">
        <div className="flex items-center space-x-2 p-2">
          <Input placeholder="Type a message" className="flex-1" />
          <Button size="icon" className="rounded-full">
            <Send className="h-4 w-4" />
            <span className="sr-only">Send message</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
