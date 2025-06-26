"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, User, Bell, Shield, Eye, Globe, Palette, Download, Trash2, Key, Mail, Smartphone, Monitor, Moon, Sun, Volume2, VolumeX } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function SettingsPage() {
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    jobAlerts: true,
    networkUpdates: true,
    eventInvites: true,
    messages: true,
    companyFollows: true
  })

  const [privacy, setPrivacy] = useState({
    profileVisibility: "public",
    showEmail: false,
    showPhone: false,
    searchable: true,
    activityStatus: true
  })

  const [appearance, setAppearance] = useState({
    theme: "light",
    language: "english",
    timezone: "UTC-5"
  })

  const router = useRouter()

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
                <h1 className="text-3xl font-heading text-primary-navy">Settings</h1>
                <p className="text-slate-600 font-subheading">Manage your account preferences and privacy settings</p>
              </div>
            </div>
          </div>

          <Tabs defaultValue="account" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5 bg-slate-100 p-1 rounded-xl">
              <TabsTrigger value="account" className="flex items-center space-x-2 font-medium">
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">Account</span>
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center space-x-2 font-medium">
                <Bell className="h-4 w-4" />
                <span className="hidden sm:inline">Notifications</span>
              </TabsTrigger>
              <TabsTrigger value="privacy" className="flex items-center space-x-2 font-medium">
                <Shield className="h-4 w-4" />
                <span className="hidden sm:inline">Privacy</span>
              </TabsTrigger>
              <TabsTrigger value="appearance" className="flex items-center space-x-2 font-medium">
                <Palette className="h-4 w-4" />
                <span className="hidden sm:inline">Display</span>
              </TabsTrigger>
              <TabsTrigger value="data" className="flex items-center space-x-2 font-medium">
                <Download className="h-4 w-4" />
                <span className="hidden sm:inline">Data</span>
              </TabsTrigger>
            </TabsList>

            {/* Account Settings */}
            <TabsContent value="account">
              <div className="grid gap-6">
                <Card className="shadow-sm border-slate-200">
                  <CardHeader>
                    <CardTitle className="font-heading text-primary-navy">Personal Information</CardTitle>
                    <CardDescription className="font-subheading">Update your personal details and contact information</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName" className="font-subheading">First Name</Label>
                        <Input id="firstName" defaultValue="Kushal" className="h-12 rounded-xl" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName" className="font-subheading">Last Name</Label>
                        <Input id="lastName" defaultValue="Agarwal" className="h-12 rounded-xl" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="font-subheading">Email Address</Label>
                      <Input id="email" type="email" defaultValue="kushalagarwal@example.com" className="h-12 rounded-xl" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="font-subheading">Phone Number</Label>
                      <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" className="h-12 rounded-xl" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location" className="font-subheading">Location</Label>
                      <Input id="location" defaultValue="San Francisco, CA" className="h-12 rounded-xl" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-sm border-slate-200">
                  <CardHeader>
                    <CardTitle className="font-heading text-primary-navy">Professional Information</CardTitle>
                    <CardDescription className="font-subheading">Manage your professional profile details</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="jobTitle" className="font-subheading">Current Job Title</Label>
                      <Input id="jobTitle" defaultValue="Software Engineer" className="h-12 rounded-xl" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company" className="font-subheading">Company</Label>
                      <Input id="company" defaultValue="Tech Innovators Inc." className="h-12 rounded-xl" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="industry" className="font-subheading">Industry</Label>
                      <Select defaultValue="technology">
                        <SelectTrigger className="h-12 rounded-xl">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="technology">Technology</SelectItem>
                          <SelectItem value="finance">Finance</SelectItem>
                          <SelectItem value="healthcare">Healthcare</SelectItem>
                          <SelectItem value="education">Education</SelectItem>
                          <SelectItem value="marketing">Marketing</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-sm border-slate-200">
                  <CardHeader>
                    <CardTitle className="font-heading text-primary-navy">Security</CardTitle>
                    <CardDescription className="font-subheading">Manage your account security and authentication</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                      <div className="flex items-center space-x-3">
                        <Key className="h-5 w-5 text-[#0056B3]" />
                        <div>
                          <p className="font-subheading text-sm">Change Password</p>
                          <p className="text-xs text-slate-500">Last changed 30 days ago</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="font-medium">
                        Update
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                      <div className="flex items-center space-x-3">
                        <Smartphone className="h-5 w-5 text-[#0056B3]" />
                        <div>
                          <p className="font-subheading text-sm">Two-Factor Authentication</p>
                          <p className="text-xs text-slate-500">Add an extra layer of security</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="font-medium">
                        Enable
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Notifications Settings */}
            <TabsContent value="notifications">
              <div className="grid gap-6">
                <Card className="shadow-sm border-slate-200">
                  <CardHeader>
                    <CardTitle className="font-heading text-primary-navy">Notification Preferences</CardTitle>
                    <CardDescription className="font-subheading">Choose how you want to be notified about updates and activities</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                        <div className="flex items-center space-x-3">
                          <Mail className="h-5 w-5 text-[#0056B3]" />
                          <div>
                            <p className="font-subheading text-sm">Email Notifications</p>
                            <p className="text-xs text-slate-500">Receive updates via email</p>
                          </div>
                        </div>
                        <Switch 
                          checked={notifications.email}
                          onCheckedChange={(checked) => setNotifications({...notifications, email: checked})}
                        />
                      </div>
                      <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                        <div className="flex items-center space-x-3">
                          <Bell className="h-5 w-5 text-[#0056B3]" />
                          <div>
                            <p className="font-subheading text-sm">Push Notifications</p>
                            <p className="text-xs text-slate-500">Browser and mobile notifications</p>
                          </div>
                        </div>
                        <Switch 
                          checked={notifications.push}
                          onCheckedChange={(checked) => setNotifications({...notifications, push: checked})}
                        />
                      </div>
                      <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                        <div className="flex items-center space-x-3">
                          <Smartphone className="h-5 w-5 text-[#0056B3]" />
                          <div>
                            <p className="font-subheading text-sm">SMS Notifications</p>
                            <p className="text-xs text-slate-500">Important updates via text message</p>
                          </div>
                        </div>
                        <Switch 
                          checked={notifications.sms}
                          onCheckedChange={(checked) => setNotifications({...notifications, sms: checked})}
                        />
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="font-heading text-primary-navy">Activity Notifications</h3>
                      <div className="space-y-3">
                        {[
                          { key: 'jobAlerts', title: 'Job Recommendations', desc: 'New job matches and opportunities' },
                          { key: 'networkUpdates', title: 'Network Activity', desc: 'New followers and connections' },
                          { key: 'eventInvites', title: 'Event Invitations', desc: 'Career fairs and networking events' },
                          { key: 'messages', title: 'Direct Messages', desc: 'Messages from recruiters and connections' },
                          { key: 'companyFollows', title: 'Company Updates', desc: 'Updates from companies you follow' }
                        ].map((item) => (
                          <div key={item.key} className="flex items-center justify-between p-3 border border-slate-200 rounded-lg">
                            <div>
                              <p className="font-subheading text-sm">{item.title}</p>
                              <p className="text-xs text-slate-500">{item.desc}</p>
                            </div>
                            <Switch 
                              checked={notifications[item.key]}
                              onCheckedChange={(checked) => setNotifications({...notifications, [item.key]: checked})}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Privacy Settings */}
            <TabsContent value="privacy">
              <div className="grid gap-6">
                <Card className="shadow-sm border-slate-200">
                  <CardHeader>
                    <CardTitle className="font-heading text-primary-navy">Profile Visibility</CardTitle>
                    <CardDescription className="font-subheading">Control who can see your profile and information</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label className="font-subheading">Profile Visibility</Label>
                      <Select value={privacy.profileVisibility} onValueChange={(value) => setPrivacy({...privacy, profileVisibility: value})}>
                        <SelectTrigger className="h-12 rounded-xl">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="public">Public - Anyone can view</SelectItem>
                          <SelectItem value="network">Network Only - Only connections</SelectItem>
                          <SelectItem value="private">Private - Only me</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                        <div className="flex items-center space-x-3">
                          <Mail className="h-5 w-5 text-[#0056B3]" />
                          <div>
                            <p className="font-subheading text-sm">Show Email Address</p>
                            <p className="text-xs text-slate-500">Display email on your public profile</p>
                          </div>
                        </div>
                        <Switch 
                          checked={privacy.showEmail}
                          onCheckedChange={(checked) => setPrivacy({...privacy, showEmail: checked})}
                        />
                      </div>
                      <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                        <div className="flex items-center space-x-3">
                          <Smartphone className="h-5 w-5 text-[#0056B3]" />
                          <div>
                            <p className="font-subheading text-sm">Show Phone Number</p>
                            <p className="text-xs text-slate-500">Display phone on your public profile</p>
                          </div>
                        </div>
                        <Switch 
                          checked={privacy.showPhone}
                          onCheckedChange={(checked) => setPrivacy({...privacy, showPhone: checked})}
                        />
                      </div>
                      <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                        <div className="flex items-center space-x-3">
                          <Eye className="h-5 w-5 text-[#0056B3]" />
                          <div>
                            <p className="font-subheading text-sm">Searchable Profile</p>
                            <p className="text-xs text-slate-500">Allow others to find you in search</p>
                          </div>
                        </div>
                        <Switch 
                          checked={privacy.searchable}
                          onCheckedChange={(checked) => setPrivacy({...privacy, searchable: checked})}
                        />
                      </div>
                      <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                        <div className="flex items-center space-x-3">
                          <Globe className="h-5 w-5 text-[#0056B3]" />
                          <div>
                            <p className="font-subheading text-sm">Activity Status</p>
                            <p className="text-xs text-slate-500">Show when you're online</p>
                          </div>
                        </div>
                        <Switch 
                          checked={privacy.activityStatus}
                          onCheckedChange={(checked) => setPrivacy({...privacy, activityStatus: checked})}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Appearance Settings */}
            <TabsContent value="appearance">
              <div className="grid gap-6">
                <Card className="shadow-sm border-slate-200">
                  <CardHeader>
                    <CardTitle className="font-heading text-primary-navy">Display Preferences</CardTitle>
                    <CardDescription className="font-subheading">Customize how 100Networks looks and feels</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label className="font-subheading">Theme</Label>
                      <Select value={appearance.theme} onValueChange={(value) => setAppearance({...appearance, theme: value})}>
                        <SelectTrigger className="h-12 rounded-xl">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="light">
                            <div className="flex items-center space-x-2">
                              <Sun className="h-4 w-4" />
                              <span>Light Mode</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="dark">
                            <div className="flex items-center space-x-2">
                              <Moon className="h-4 w-4" />
                              <span>Dark Mode</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="system">
                            <div className="flex items-center space-x-2">
                              <Monitor className="h-4 w-4" />
                              <span>System Default</span>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label className="font-subheading">Language</Label>
                      <Select value={appearance.language} onValueChange={(value) => setAppearance({...appearance, language: value})}>
                        <SelectTrigger className="h-12 rounded-xl">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="english">English (US)</SelectItem>
                          <SelectItem value="spanish">Español</SelectItem>
                          <SelectItem value="french">Français</SelectItem>
                          <SelectItem value="german">Deutsch</SelectItem>
                          <SelectItem value="chinese">中文</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label className="font-subheading">Timezone</Label>
                      <Select value={appearance.timezone} onValueChange={(value) => setAppearance({...appearance, timezone: value})}>
                        <SelectTrigger className="h-12 rounded-xl">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="UTC-8">Pacific Time (UTC-8)</SelectItem>
                          <SelectItem value="UTC-7">Mountain Time (UTC-7)</SelectItem>
                          <SelectItem value="UTC-6">Central Time (UTC-6)</SelectItem>
                          <SelectItem value="UTC-5">Eastern Time (UTC-5)</SelectItem>
                          <SelectItem value="UTC+0">UTC (GMT)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                      <div className="flex items-center space-x-3">
                        <Volume2 className="h-5 w-5 text-[#0056B3]" />
                        <div>
                          <p className="font-subheading text-sm">Sound Effects</p>
                          <p className="text-xs text-slate-500">Play sounds for notifications and interactions</p>
                        </div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Data & Export Settings */}
            <TabsContent value="data">
              <div className="grid gap-6">
                <Card className="shadow-sm border-slate-200">
                  <CardHeader>
                    <CardTitle className="font-heading text-primary-navy">Data Management</CardTitle>
                    <CardDescription className="font-subheading">Export your data or delete your account</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl">
                      <div className="flex items-center space-x-3">
                        <Download className="h-5 w-5 text-blue-600" />
                        <div>
                          <p className="font-subheading text-sm">Export Your Data</p>
                          <p className="text-xs text-slate-500">Download a copy of your profile and activity data</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="font-medium">
                        Download
                      </Button>
                    </div>

                    <Separator />

                    <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                      <div className="flex items-start space-x-3">
                        <Trash2 className="h-5 w-5 text-red-600 mt-0.5" />
                        <div className="flex-1">
                          <h3 className="font-heading text-red-800 text-sm mb-2">Delete Account</h3>
                          <p className="text-xs text-red-600 mb-4">
                            Permanently delete your account and all associated data. This action cannot be undone.
                          </p>
                          <Button variant="destructive" size="sm" className="font-medium">
                            Delete Account
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

          {/* Save Changes */}
          <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-slate-200">
            <Button variant="outline" className="font-medium">
              Cancel
            </Button>
            <Button className="bg-primary-navy hover:bg-primary-navy/90 font-medium">
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
} 