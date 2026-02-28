"use client";

import React from "react";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import StatCard from "@/components/dashboard/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Eye,
  MessageSquare,
  Star,
  DollarSign,
  TrendingUp,
  Calendar,
  Image as ImageIcon,
  Clock,
} from "lucide-react";

export default function BusinessDashboardPage() {
  const stats = [
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

  const recentReviews = [
    {
      id: 1,
      user: "Sarah M.",
      rating: 5,
      comment: "Amazing food and great service! Will definitely come back.",
      date: "2 hours ago",
      responded: false,
    },
    {
      id: 2,
      user: "John D.",
      rating: 4,
      comment: "Good experience overall, but could improve the wait time.",
      date: "5 hours ago",
      responded: true,
    },
    {
      id: 3,
      user: "Emily R.",
      rating: 5,
      comment: "Best restaurant in Kathmandu! Highly recommended.",
      date: "1 day ago",
      responded: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <DashboardSidebar role="business" />
      <main className="flex-1 overflow-x-hidden">
        <DashboardHeader 
          title="Business Overview" 
          subtitle="Track your business performance and engagement" 
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
            {/* Recent Reviews */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Recent Customer Reviews</CardTitle>
                    <Button variant="outline" size="sm" className="text-blue-600 border-blue-600 hover:bg-blue-50">
                      View all
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentReviews.map((review) => (
                      <div
                        key={review.id}
                        className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-400 to-green-400 flex items-center justify-center text-white font-semibold">
                              {review.user.charAt(0)}
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900">{review.user}</p>
                              <div className="flex items-center gap-1 mt-0.5">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star
                                    key={star}
                                    className={`h-3 w-3 ${
                                      star <= review.rating
                                        ? "fill-yellow-400 text-yellow-400"
                                        : "text-gray-300"
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {review.responded ? (
                              <Badge className="bg-green-600 text-white text-xs">
                                Responded
                              </Badge>
                            ) : (
                              <Badge className="bg-yellow-600 text-white text-xs">
                                Pending
                              </Badge>
                            )}
                            <span className="text-xs text-gray-500">{review.date}</span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-700 mb-3">{review.comment}</p>
                        {!review.responded && (
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">
                            Respond to Review
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Performance Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Performance Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gradient-to-br from-blue-50 to-green-50 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <TrendingUp className="h-12 w-12 text-blue-600 mx-auto mb-2" />
                      <p className="text-gray-600">Performance metrics chart</p>
                      <p className="text-sm text-gray-500">Views, reviews, and engagement over time</p>
                    </div>
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
                  <Button className="w-full justify-start bg-green-600 hover:bg-green-700">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Respond to Reviews
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <ImageIcon className="h-4 w-4 mr-2" />
                    Upload Photos
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Calendar className="h-4 w-4 mr-2" />
                    Update Hours
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Clock className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                </CardContent>
              </Card>

              {/* Business Status */}
              <Card>
                <CardHeader>
                  <CardTitle>Business Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                      <span className="text-sm font-medium text-green-900">Profile Status</span>
                      <Badge className="bg-green-600 text-white">Active</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <span className="text-sm font-medium text-blue-900">Verification</span>
                      <Badge className="bg-blue-600 text-white">Verified</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <span className="text-sm font-medium text-yellow-900">Photos</span>
                      <Badge className="bg-yellow-600 text-white">12 uploaded</Badge>
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

