"use client";

import React from "react";
import Link from "next/link";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import StatCard from "@/components/dashboard/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  MessageSquare,
  Building2,
  Eye,
  Star,
  Bookmark,
  TrendingUp,
  Calendar,
  User,
} from "lucide-react";

export default function UserDashboardPage() {
  const stats = [
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

  const recentActivity = [
    {
      id: 1,
      type: "review",
      title: "Reviewed Himalayan Restaurant",
      description: "5 stars - Great food and service!",
      date: "2 hours ago",
      icon: MessageSquare,
    },
    {
      id: 2,
      type: "saved",
      title: "Saved Thamel Coffee House",
      description: "Added to your saved places",
      date: "5 hours ago",
      icon: Bookmark,
    },
    {
      id: 3,
      type: "photo",
      title: "Uploaded 3 photos",
      description: "Added photos to Nepal Adventure Tours",
      date: "1 day ago",
      icon: Eye,
    },
    {
      id: 4,
      type: "review",
      title: "Reviewed Kathmandu Spa",
      description: "4 stars - Relaxing experience",
      date: "2 days ago",
      icon: MessageSquare,
    },
  ];

  const savedPlaces = [
    { id: 1, name: "Himalayan Restaurant", category: "Restaurant", rating: 4.5 },
    { id: 2, name: "Thamel Coffee House", category: "Cafe", rating: 4.8 },
    { id: 3, name: "Kathmandu Spa", category: "Spa", rating: 4.2 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <DashboardSidebar role="user" />
      <main className="flex-1 overflow-x-hidden">
        <DashboardHeader 
          title="My Dashboard" 
          subtitle="Your activity and contributions" 
        />
        
        <div className="p-6 space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
              <StatCard key={idx} {...stat} />
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Activity */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Recent Activity</CardTitle>
                    <Button variant="outline" size="sm" className="text-blue-600 border-blue-600 hover:bg-blue-50">
                      View all
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentActivity.map((activity) => {
                      const Icon = activity.icon;
                      return (
                        <div
                          key={activity.id}
                          className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-400 to-green-400 flex items-center justify-center text-white shrink-0">
                            <Icon className="h-5 w-5" />
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold text-gray-900">{activity.title}</p>
                            <p className="text-sm text-gray-600 mt-0.5">{activity.description}</p>
                            <span className="text-xs text-gray-500 mt-1 inline-block">{activity.date}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* My Reviews */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>My Recent Reviews</CardTitle>
                    <Button variant="outline" size="sm" className="text-blue-600 border-blue-600 hover:bg-blue-50">
                      View all
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[1, 2].map((item) => (
                      <div
                        key={item}
                        className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="font-semibold text-gray-900">Himalayan Restaurant</p>
                            <div className="flex items-center gap-2 mt-1">
                              <div className="flex items-center gap-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star
                                    key={star}
                                    className={`h-3 w-3 ${
                                      star <= 5
                                        ? "fill-yellow-400 text-yellow-400"
                                        : "text-gray-300"
                                    }`}
                                  />
                                ))}
                              </div>
                              <Badge variant="outline" className="text-xs">
                                Restaurant
                              </Badge>
                            </div>
                          </div>
                          <span className="text-xs text-gray-500">3 days ago</span>
                        </div>
                        <p className="text-sm text-gray-700">
                          Great experience! The food was amazing and the service was excellent. Highly recommended!
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Link href="/dashboard/user/profile" className="w-full">
                    <Button className="w-full justify-start bg-blue-600 hover:bg-blue-700">
                      <User className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Button>
                  </Link>
                  <Button className="w-full justify-start bg-green-600 hover:bg-green-700">
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
                </CardContent>
              </Card>

              {/* Saved Places */}
              <Card>
                <CardHeader>
                  <CardTitle>Saved Places</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {savedPlaces.map((place) => (
                      <div
                        key={place.id}
                        className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <p className="font-semibold text-gray-900 text-sm">{place.name}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline" className="text-xs">
                                {place.category}
                              </Badge>
                              <div className="flex items-center gap-1">
                                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                <span className="text-xs text-gray-600">{place.rating}</span>
                              </div>
                            </div>
                          </div>
                          <Bookmark className="h-4 w-4 text-green-600 shrink-0" />
                        </div>
                      </div>
                    ))}
                    <Button variant="outline" className="w-full mt-2">
                      View all saved places
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Contribution Stats */}
              <Card>
                <CardHeader>
                  <CardTitle>Your Contributions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <span className="text-sm font-medium text-blue-900">Elite Reviewer</span>
                      <Badge className="bg-blue-600 text-white">Level 3</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                      <span className="text-sm font-medium text-green-900">Photos</span>
                      <Badge className="bg-green-600 text-white">67</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <span className="text-sm font-medium text-yellow-900">Helpful Votes</span>
                      <Badge className="bg-yellow-600 text-white">142</Badge>
                    </div>
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

