"use client";

import { useState } from "react"; // Keep for local UI state like notifications if still needed
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation"; // Added useRouter for logout redirect
import { Bell, Briefcase, Globe, Inbox, LayoutDashboard, MessageSquare, Users, Building2, Settings, LogOut } from "lucide-react"; // Added LogOut
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// Button component is not directly used in the modified version for user actions, but might be for other things.
// import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext"; // Import useAuth

const navItems = [
  { name: "Explore", href: "/explore", icon: LayoutDashboard },
  { name: "Feed", href: "/feed", icon: MessageSquare },
  { name: "Messages", href: "/inbox", icon: Inbox },
  { name: "Jobs", href: "/jobs", icon: Briefcase },
  { name: "Freelance", href: "/jobs/freelance", icon: Globe },
  { name: "Network", href: "/people", icon: Users },
  { name: "Companies", href: "/employers", icon: Building2 },
];

export default function Header() {
  const [notifications, setNotifications] = useState(18); // Example local state
  const pathname = usePathname();
  const router = useRouter();
  const { user, isLoading, logout } = useAuth();

  const handleLogout = () => {
    logout(); // Clears context and localStorage
    router.push('/'); // Redirect to landing page after logout
  };

  const getAvatarFallback = () => {
    if (user?.full_name) {
      return user.full_name.substring(0, 2).toUpperCase();
    }
    if (user?.company_name) {
      return user.company_name.substring(0, 2).toUpperCase();
    }
    if (user?.email) {
      return user.email.substring(0, 2).toUpperCase();
    }
    return "U";
  };

  return (
    <header className="border-b bg-background">
      <div className="flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <div className="flex items-center">
          <Link href={user ? "/feed" : "/"} className="flex items-center"> {/* Link to feed if logged in, else landing */}
            <span className="font-logo text-2xl font-bold">
              100<span className="text-[#0056B3]">Networks</span>
            </span>
          </Link>
        </div>

        {/* Navigation - Show only if user is logged in, or adjust based on app logic */}
        {user && (
          <nav className="flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors relative",
                  pathname === item.href
                    ? "bg-primary text-primary-foreground" // Using theme colors
                    : "text-slate-600 hover:bg-slate-100 hover:text-primary",
                )}
              >
                <item.icon className="mr-2 h-4 w-4" />
                {item.name}
              </Link>
            ))}
          </nav>
        )}

        {/* Right side - User actions or Login/Signup */}
        <div className="flex items-center space-x-1">
          {isLoading ? (
            <div className="h-8 w-24 animate-pulse bg-gray-200 rounded-md"></div> // Placeholder for loading
          ) : user ? (
            <>
              <Link
                href="/notifications"
                className={cn(
                  "flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors relative",
                  pathname === "/notifications"
                    ? "bg-primary text-primary-foreground"
                    : "text-slate-600 hover:bg-slate-100 hover:text-primary",
                )}
              >
                <Bell className="h-4 w-4" />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-[10px] font-medium text-white flex items-center justify-center">
                    {notifications}
                  </span>
                )}
              </Link>
              <Link
                href="/profile" // This should eventually be a dynamic user profile page
                className={cn(
                  "flex items-center space-x-2 px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                  pathname === "/profile"
                    ? "bg-primary text-primary-foreground"
                    : "text-slate-600 hover:bg-slate-100 hover:text-primary",
                )}
              >
                <Avatar className="h-6 w-6">
                  <AvatarImage src={undefined /* user.avatarUrl || placeholder */} alt={user.email} />
                  <AvatarFallback className="text-xs">{getAvatarFallback()}</AvatarFallback>
                </Avatar>
                <div className="text-left hidden md:block">
                  <p className="text-xs font-medium">Your Profile</p>
                </div>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    className={cn(
                      "flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                       pathname.startsWith("/settings") // check if current path starts with /settings
                        ? "bg-primary text-primary-foreground"
                        : "text-slate-600 hover:bg-slate-100 hover:text-primary",
                    )}
                  >
                    <Settings className="h-4 w-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem asChild>
                    <Link href="/settings" className="font-subheading">Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/billing" className="font-subheading">Billing</Link>
                  </DropdownMenuItem>
                  {user.user_type === 'individual' && ( // Example conditional item
                    <DropdownMenuItem asChild>
                      <Link href="/company-profile" className="font-subheading">Switch to Company Profile</Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/help" className="font-subheading">Help center</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/terms" className="font-subheading">Terms of Service</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="font-subheading cursor-pointer flex items-center">
                    <LogOut className="mr-2 h-4 w-4" /> Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              {/* Buttons to show if user is not logged in AND not loading */}
              {/* These might not be desired if HeaderWrapper handles when to show this header */}
              {/* For now, let's assume HeaderWrapper shows this header only when appropriate */}
              {/* Or, if this header is always shown, we'd add Login/Signup buttons here */}
              {/* <Button variant="outline" asChild><Link href="/auth/login">Login</Link></Button> */}
              {/* <Button asChild><Link href="/auth/signup">Sign Up</Link></Button> */}
            </>
          )}
        </div>
      </div>
    </header>
  );
}
