"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Bell, Check, Settings, Filter, Star, Calendar, Users, Briefcase, Heart, MessageSquare, UserPlus, ArrowLeft } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function NotificationsPage() {
  const [filter, setFilter] = useState("all")
  const [showSettings, setShowSettings] = useState(false)
  const router = useRouter()

  const notifications = [
    {
      id: 1,
      type: "event",
      icon: Calendar,
      title: "Event Invitation",
      message: "You've been invited to Just In Time Fair - Engineering-Focused on May 9th 2025. Register to attend!",
      time: "12 days ago",
      unread: true,
      category: "Events"
    },
    {
      id: 2,
      type: "job",
      icon: Briefcase,
      title: "New Job Match",
      message: "A new Software Engineer position at Microsoft matches your preferences. Apply now!",
      time: "1 day ago",
      unread: true,
      category: "Jobs"
    },
    {
      id: 3,
      type: "connection",
      icon: UserPlus,
      title: "New Follower",
      message: "Sarah Johnson started following you. Check out her profile!",
      time: "2 days ago",
      unread: true,
      category: "Network"
    },
    {
      id: 4,
      type: "like",
      icon: Heart,
      title: "Post Liked",
      message: "Your recent post about career growth received 15 new likes and 3 comments.",
      time: "3 days ago",
      unread: false,
      category: "Activity"
    },
    {
      id: 5,
      type: "message",
      icon: MessageSquare,
      title: "New Message",
      message: "You have a new message from TechCorp recruiter about the Senior Developer position.",
      time: "5 days ago",
      unread: false,
      category: "Messages"
    },
    {
      id: 6,
      type: "event",
      icon: Calendar,
      title: "Military Career Event",
      message: "You've been invited to Beyond Your Stripes – State Farm Virtual Military Career Event on May 6th 2025.",
      time: "13 days ago",
      unread: false,
      category: "Events"
    }
  ]

  const filteredNotifications = filter === "all" 
    ? notifications 
    : filter === "unread" 
    ? notifications.filter(n => n.unread)
    : notifications.filter(n => n.category.toLowerCase() === filter)

  const unreadCount = notifications.filter(n => n.unread).length

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
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
                <h1 className="text-3xl font-heading text-primary-navy">Notifications</h1>
                <p className="text-slate-600 font-subheading">Stay updated with your latest activities</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              {unreadCount > 0 && (
                <Badge variant="secondary" className="bg-red-100 text-red-700 font-medium">
                  {unreadCount} unread
                </Badge>
              )}
              <Button variant="outline" size="sm" onClick={() => setShowSettings(!showSettings)}>
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            {["all", "unread", "jobs", "events", "network", "messages", "activity"].map((filterType) => (
              <button
                key={filterType}
                onClick={() => setFilter(filterType)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  filter === filterType
                    ? "bg-primary-navy text-white shadow-md"
                    : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
                {filterType === "unread" && unreadCount > 0 && (
                  <span className="ml-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                    {unreadCount}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Notifications Settings Panel */}
        {showSettings && (
          <div className="mb-6 p-6 bg-white rounded-xl shadow-sm border border-slate-200">
            <h3 className="text-lg font-heading text-primary-navy mb-4">Notification Preferences</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <label className="flex items-center space-x-3">
                  <input type="checkbox" defaultChecked className="rounded border-slate-300" />
                  <span className="text-sm font-subheading">Job recommendations</span>
                </label>
                <label className="flex items-center space-x-3">
                  <input type="checkbox" defaultChecked className="rounded border-slate-300" />
                  <span className="text-sm font-subheading">Event invitations</span>
                </label>
                <label className="flex items-center space-x-3">
                  <input type="checkbox" defaultChecked className="rounded border-slate-300" />
                  <span className="text-sm font-subheading">New followers</span>
                </label>
              </div>
              <div className="space-y-3">
                <label className="flex items-center space-x-3">
                  <input type="checkbox" defaultChecked className="rounded border-slate-300" />
                  <span className="text-sm font-subheading">Messages</span>
                </label>
                <label className="flex items-center space-x-3">
                  <input type="checkbox" className="rounded border-slate-300" />
                  <span className="text-sm font-subheading">Email notifications</span>
                </label>
                <label className="flex items-center space-x-3">
                  <input type="checkbox" className="rounded border-slate-300" />
                  <span className="text-sm font-subheading">Push notifications</span>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Notifications List */}
        <div className="space-y-4">
          {filteredNotifications.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-slate-200">
              <Bell className="h-12 w-12 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-heading text-slate-600 mb-2">No notifications found</h3>
              <p className="text-slate-500 font-subheading">
                {filter === "all" ? "You're all caught up!" : `No ${filter} notifications at the moment.`}
              </p>
            </div>
          ) : (
            filteredNotifications.map((notification) => {
              const IconComponent = notification.icon
              return (
                <div
                  key={notification.id}
                  className={`group flex items-start space-x-4 p-6 bg-white rounded-xl shadow-sm border transition-all duration-200 hover:shadow-md hover:border-primary-navy/20 ${
                    notification.unread ? "border-[#0056B3]/30 bg-[#0056B3]/5" : "border-slate-200"
                  }`}
                >
                  {/* Unread Indicator */}
                  {notification.unread && (
                    <div className="min-w-[4px] self-stretch bg-[#0056B3] rounded-full"></div>
                  )}
                  
                  {/* Icon */}
                  <div className={`p-3 rounded-xl ${
                    notification.unread 
                      ? "bg-[#0056B3] text-white" 
                      : "bg-slate-100 text-slate-600"
                  }`}>
                    <IconComponent className="h-5 w-5" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <h3 className={`font-heading text-sm ${
                          notification.unread ? "text-primary-navy" : "text-slate-700"
                        }`}>
                          {notification.title}
                        </h3>
                        <Badge variant="outline" className="text-xs px-2 py-1">
                          {notification.category}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-slate-500 whitespace-nowrap">
                          {notification.time}
                        </span>
                        {notification.unread && (
                          <button className="opacity-0 group-hover:opacity-100 transition-opacity">
                            <Check className="h-4 w-4 text-slate-400 hover:text-primary-navy" />
                          </button>
                        )}
                      </div>
                    </div>
                    <p className={`font-subheading text-sm leading-relaxed ${
                      notification.unread ? "text-slate-700" : "text-slate-600"
                    }`}>
                      {notification.message}
                    </p>
                  </div>
                </div>
              )
            })
          )}
        </div>

        {/* Load More */}
        {filteredNotifications.length > 0 && (
          <div className="text-center mt-8">
            <Button variant="outline" className="font-medium">
              Load more notifications
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
