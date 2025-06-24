"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { 
  Building2, 
  Bell, 
  Settings, 
  User, 
  LogOut, 
  Plus,
  Users,
  Briefcase,
  BarChart3,
  MessageSquare,
  CreditCard,
  Hash
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { cn } from "@/lib/utils"

export default function CompanyHeader() {
  const [searchQuery, setSearchQuery] = useState("")
  const pathname = usePathname()

  return (
    <header className="border-b bg-background">
      <div className="flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/company-dashboard" className="flex items-center">
            <span className="font-logo text-2xl font-bold">
              100<span className="text-[#0056B3]">Networks</span>
            </span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex items-center space-x-1">
          <Link 
            href="/company-dashboard" 
            className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              pathname === '/company-dashboard' 
                ? 'bg-primary-navy text-white' 
                : 'text-slate-600 hover:bg-slate-100 hover:text-primary-navy'
            }`}
          >
            <BarChart3 className="h-4 w-4 mr-2" />
            Dashboard
          </Link>
          <Link 
            href="/company-jobs" 
            className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              pathname === '/company-jobs' 
                ? 'bg-primary-navy text-white' 
                : 'text-slate-600 hover:bg-slate-100 hover:text-primary-navy'
            }`}
          >
            <Briefcase className="h-4 w-4 mr-2" />
            Jobs
          </Link>
          <Link 
            href="/company-freelance" 
            className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              pathname === '/company-freelance' 
                ? 'bg-primary-navy text-white' 
                : 'text-slate-600 hover:bg-slate-100 hover:text-primary-navy'
            }`}
          >
            <Users className="h-4 w-4 mr-2" />
            Freelance
          </Link>
          <Link 
            href="/browse-professionals" 
            className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              pathname === '/browse-professionals' 
                ? 'bg-primary-navy text-white' 
                : 'text-slate-600 hover:bg-slate-100 hover:text-primary-navy'
            }`}
          >
            <BarChart3 className="h-4 w-4 mr-2" />
            Browse Professionals
          </Link>
          <Link 
            href="/company-feed" 
            className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              pathname === '/company-feed' 
                ? 'bg-primary-navy text-white' 
                : 'text-slate-600 hover:bg-slate-100 hover:text-primary-navy'
            }`}
          >
            <Hash className="h-4 w-4 mr-2" />
            Feed
          </Link>
          <Link 
            href="/company-messages" 
            className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              pathname === '/company-messages' 
                ? 'bg-primary-navy text-white' 
                : 'text-slate-600 hover:bg-slate-100 hover:text-primary-navy'
            }`}
          >
            <MessageSquare className="h-4 w-4 mr-2" />
            Messages
          </Link>
        </nav>

        {/* Right side - Notifications, Profile and Settings */}
        <div className="flex items-center space-x-1">
          {/* Notifications */}
          <Link 
            href="/notifications"
            className={cn(
              "flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors relative",
              pathname === "/notifications"
                ? "bg-primary-navy text-white"
                : "text-slate-600 hover:bg-slate-100 hover:text-primary-navy",
            )}
          >
            <Bell className="h-4 w-4" />
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-[10px] font-medium text-white flex items-center justify-center">
              3
            </span>
          </Link>

          {/* Company Profile */}
          <Link 
            href="/company-profile"
            className={cn(
              "flex items-center space-x-2 px-3 py-2 text-sm font-medium rounded-lg transition-colors",
              pathname === "/company-profile"
                ? "bg-primary-navy text-white"
                : "text-slate-600 hover:bg-slate-100 hover:text-primary-navy",
            )}
          >
            <div className="w-6 h-6 bg-primary-navy rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-medium">C</span>
            </div>
            <div className="text-left hidden md:block">
              <p className="text-xs font-medium">Company</p>
            </div>
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className={cn(
                  "flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                  pathname === "/settings"
                    ? "bg-primary-navy text-white"
                    : "text-slate-600 hover:bg-slate-100 hover:text-primary-navy",
                )}
              >
                <Settings className="h-4 w-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem asChild>
                <Link href="/company-profile" className="font-subheading">
                  <Building2 className="h-4 w-4 mr-2" />
                  Company Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="font-subheading">
                <Users className="h-4 w-4 mr-2" />
                Team Members
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/company-billing" className="font-subheading">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Billing & Plans
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="font-subheading">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/explore" className="font-subheading">
                  <User className="h-4 w-4 mr-2" />
                  Switch to Personal
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="font-subheading">
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
} 