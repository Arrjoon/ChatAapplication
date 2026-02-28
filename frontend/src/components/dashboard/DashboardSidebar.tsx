"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Building2,
  Users,
  User,
  MessageSquare,
  BarChart3,
  Settings,
  FileText,
  Star,
  Bookmark,
  Bell,
  HelpCircle,
  LogOut,
  Sparkles,
  Newspaper,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface NavItem {
  title: string;
  href: string;
  icon: React.ReactNode;
  badge?: number;
}

interface DashboardSidebarProps {
  role: "admin" | "business" | "user";
}

const DashboardSidebar = ({ role }: DashboardSidebarProps) => {
  const pathname = usePathname();

  const adminNavItems: NavItem[] = [
    { title: "Dashboard", href: "/dashboard/admin", icon: <LayoutDashboard className="h-5 w-5" /> },
    { title: "Posts", href: "/dashboard/admin/posts", icon: <Newspaper className="h-5 w-5" />, badge: 23 },
    { title: "Businesses", href: "/dashboard/admin/businesses", icon: <Building2 className="h-5 w-5" />, badge: 12 },
    { title: "Users", href: "/dashboard/admin/users", icon: <Users className="h-5 w-5" />, badge: 5 },
    { title: "Reviews", href: "/dashboard/admin/reviews", icon: <MessageSquare className="h-5 w-5" /> },
    { title: "Analytics", href: "/dashboard/admin/analytics", icon: <BarChart3 className="h-5 w-5" /> },
    { title: "Reports", href: "/dashboard/admin/reports", icon: <FileText className="h-5 w-5" /> },
    { title: "Settings", href: "/dashboard/admin/settings", icon: <Settings className="h-5 w-5" /> },
  ];

  const businessNavItems: NavItem[] = [
    { title: "Overview", href: "/dashboard/business", icon: <LayoutDashboard className="h-5 w-5" /> },
    { title: "My Business", href: "/dashboard/business/profile", icon: <Building2 className="h-5 w-5" /> },
    { title: "Reviews", href: "/dashboard/business/reviews", icon: <MessageSquare className="h-5 w-5" />, badge: 8 },
    { title: "Analytics", href: "/dashboard/business/analytics", icon: <BarChart3 className="h-5 w-5" /> },
    { title: "Photos", href: "/dashboard/business/photos", icon: <FileText className="h-5 w-5" /> },
    { title: "Settings", href: "/dashboard/business/settings", icon: <Settings className="h-5 w-5" /> },
  ];

  const userNavItems: NavItem[] = [
    { title: "Dashboard", href: "/dashboard/user", icon: <LayoutDashboard className="h-5 w-5" /> },
    { title: "My Profile", href: "/dashboard/user/profile", icon: <User className="h-5 w-5" /> },
    { title: "My Reviews", href: "/dashboard/user/reviews", icon: <Star className="h-5 w-5" /> },
    { title: "Saved Places", href: "/dashboard/user/saved", icon: <Bookmark className="h-5 w-5" /> },
    { title: "Activity", href: "/dashboard/user/activity", icon: <FileText className="h-5 w-5" /> },
    { title: "Notifications", href: "/dashboard/user/notifications", icon: <Bell className="h-5 w-5" />, badge: 3 },
    { title: "Settings", href: "/dashboard/user/settings", icon: <Settings className="h-5 w-5" /> },
  ];

  const navItems = role === "admin" ? adminNavItems : role === "business" ? businessNavItems : userNavItems;

  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-screen sticky top-0 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <Link href="/" className="flex items-center gap-3">
          <div className="relative">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 via-blue-500 to-green-600 text-white shadow-lg">
              <Sparkles className="h-5 w-5" />
            </div>
            <div className="absolute -top-1 -right-1 h-3 w-3 bg-green-500 rounded-full border-2 border-white"></div>
          </div>
          <div>
            <div className="text-lg font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              LocalFinder
            </div>
            <div className="text-xs text-gray-500 capitalize">{role} Dashboard</div>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname?.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all",
                isActive
                  ? "bg-gradient-to-r from-blue-50 to-green-50 text-blue-700 border-l-4 border-blue-600"
                  : "text-gray-700 hover:bg-gray-50 hover:text-blue-600"
              )}
            >
              {item.icon}
              <span className="flex-1">{item.title}</span>
              {item.badge && (
                <span className="px-2 py-0.5 bg-green-600 text-white text-xs font-bold rounded-full">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Help & Logout */}
      <div className="p-4 border-t border-gray-200 space-y-2">
        <Link
          href="/help"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-all"
        >
          <HelpCircle className="h-5 w-5" />
          <span>Help & Support</span>
        </Link>
        <Button
          variant="ghost"
          className="w-full justify-start text-gray-700 hover:text-red-600 hover:bg-red-50"
        >
          <LogOut className="h-5 w-5 mr-3" />
          Log Out
        </Button>
      </div>
    </aside>
  );
};

export default DashboardSidebar;

