"use client";

import React, { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import StatCard from "@/components/dashboard/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  TrendingUp,
  Users,
  Building2,
  Star,
  MessageSquare,
  Eye,
  DollarSign,
  Calendar,
} from "lucide-react";

// Mock data - In production, fetch from API
const getUserRole = (): "admin" | "business" | "user" => {
  return "admin"; // This would come from auth context
};

export default function DashboardPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const role = (searchParams.get("role") as "admin" | "business" | "user") || getUserRole();

  // Redirect to role-specific dashboard if no role param
  useEffect(() => {
    if (!searchParams.get("role")) {
      const userRole = getUserRole();
      router.replace(`/dashboard/${userRole}`);
    }
  }, [router, searchParams]);

  // Admin Dashboard Stats
  const adminStats = [
    {
      title: "Total Businesses",
      value: "1,234",
      change: "+12% from last month",
      changeType: "positive" as const,
      icon: Building2,
      iconColor: "text-blue-600",
      iconBg: "bg-blue-50",
    },
    {
      title: "Active Users",
      value: "8,456",
      change: "+8% from last month",
      changeType: "positive" as const,
      icon: Users,
      iconColor: "text-green-600",
      iconBg: "bg-green-50",
    },
    {
      title: "Total Reviews",
      value: "12,890",
      change: "+15% from last month",
      changeType: "positive" as const,
      icon: MessageSquare,
      iconColor: "text-blue-600",
      iconBg: "bg-blue-50",
    },
    {
      title: "Average Rating",
      value: "4.6",
      change: "+0.2 from last month",
      changeType: "positive" as const,
      icon: Star,
      iconColor: "text-yellow-600",
      iconBg: "bg-yellow-50",
    },
  ];

  // Business Dashboard Stats
  const businessStats = [
    {
      title: "Profile Views",
      value: "2,456",
      change: "+23% from last week",
      changeType: "positive" as const,
      icon: Eye,
      iconColor: "text-blue-600",
      iconBg: "bg-blue-50",
    },
    {
      title: "Total Reviews",
      value: "128",
      change: "+5 this week",
      changeType: "positive" as const,
      icon: MessageSquare,
      iconColor: "text-green-600",
      iconBg: "bg-green-50",
    },
    {
      title: "Average Rating",
      value: "4.5",
      change: "+0.1 this week",
      changeType: "positive" as const,
      icon: Star,
      iconColor: "text-yellow-600",
      iconBg: "bg-yellow-50",
    },
    {
      title: "Revenue (Rs.)",
      value: "45,600",
      change: "+12% from last month",
      changeType: "positive" as const,
      icon: DollarSign,
      iconColor: "text-green-600",
      iconBg: "bg-green-50",
    },
  ];

  // User Dashboard Stats
  const userStats = [
    {
      title: "Reviews Written",
      value: "24",
      change: "+3 this month",
      changeType: "positive" as const,
      icon: MessageSquare,
      iconColor: "text-blue-600",
      iconBg: "bg-blue-50",
    },
    {
      title: "Saved Places",
      value: "18",
      change: "+2 this week",
      changeType: "positive" as const,
      icon: Building2,
      iconColor: "text-green-600",
      iconBg: "bg-green-50",
    },
    {
      title: "Photos Added",
      value: "67",
      change: "+8 this month",
      changeType: "positive" as const,
      icon: Eye,
      iconColor: "text-blue-600",
      iconBg: "bg-blue-50",
    },
    {
      title: "Helpful Votes",
      value: "142",
      change: "+15 this month",
      changeType: "positive" as const,
      icon: Star,
      iconColor: "text-yellow-600",
      iconBg: "bg-yellow-50",
    },
  ];

  const stats = role === "admin" ? adminStats : role === "business" ? businessStats : userStats;
  const pageTitle = role === "admin" ? "Admin Dashboard" : role === "business" ? "Business Overview" : "My Dashboard";
  const pageSubtitle = role === "admin" 
    ? "Manage your platform and monitor activity" 
    : role === "business"
    ? "Track your business performance and engagement"
    : "Your activity and contributions";

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <DashboardSidebar role={role} />
      <main className="flex-1 overflow-x-hidden">
        <DashboardHeader title={pageTitle} subtitle={pageSubtitle} />
        
        <div className="p-6 space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
              <StatCard key={idx} {...stat} />
            ))}
          </div>

          {/* Recent Activity / Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Recent Reviews */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Recent {role === "admin" ? "Reviews" : role === "business" ? "Customer Reviews" : "My Reviews"}</CardTitle>
                    <Button variant="outline" size="sm" className="text-blue-600 border-blue-600 hover:bg-blue-50">
                      View all
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[1, 2, 3].map((item) => (
                      <div key={item} className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-400 to-green-400 flex items-center justify-center text-white font-semibold shrink-0">
                          U{item}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold text-gray-900">User {item}</span>
                            <div className="flex items-center gap-1">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className="h-3 w-3 fill-yellow-400 text-yellow-400"
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">
                            Great experience! The food was amazing and the service was excellent.
                          </p>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">Restaurant</Badge>
                            <span className="text-xs text-gray-500">2 hours ago</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Analytics Chart Placeholder */}
              {role === "admin" || role === "business" ? (
                <Card>
                  <CardHeader>
                    <CardTitle>Analytics Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 bg-gradient-to-br from-blue-50 to-green-50 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <TrendingUp className="h-12 w-12 text-blue-600 mx-auto mb-2" />
                        <p className="text-gray-600">Chart visualization would go here</p>
                        <p className="text-sm text-gray-500">Views, Reviews, Engagement metrics</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ) : null}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {role === "admin" && (
                    <>
                      <Button className="w-full justify-start bg-blue-600 hover:bg-blue-700">
                        <Building2 className="h-4 w-4 mr-2" />
                        Add New Business
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Users className="h-4 w-4 mr-2" />
                        Manage Users
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Review Moderation
                      </Button>
                    </>
                  )}
                  {role === "business" && (
                    <>
                      <Button className="w-full justify-start bg-green-600 hover:bg-green-700">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Respond to Reviews
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Eye className="h-4 w-4 mr-2" />
                        Upload Photos
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Calendar className="h-4 w-4 mr-2" />
                        Update Hours
                      </Button>
                    </>
                  )}
                  {role === "user" && (
                    <>
                      <Button className="w-full justify-start bg-blue-600 hover:bg-blue-700">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Write a Review
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Building2 className="h-4 w-4 mr-2" />
                        Add Business
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Eye className="h-4 w-4 mr-2" />
                        Upload Photos
                      </Button>
                    </>
                  )}
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[1, 2, 3, 4].map((item) => (
                      <div key={item} className="flex items-start gap-3 text-sm">
                        <div className="h-2 w-2 rounded-full bg-green-500 mt-2 shrink-0"></div>
                        <div className="flex-1">
                          <p className="text-gray-900 font-medium">
                            {role === "admin" && "New business registered"}
                            {role === "business" && "New review received"}
                            {role === "user" && "Review published"}
                          </p>
                          <p className="text-gray-500 text-xs">{item} hour{item > 1 ? "s" : ""} ago</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

