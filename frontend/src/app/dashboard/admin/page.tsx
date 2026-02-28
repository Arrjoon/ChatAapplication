"use client";

import React, { useState } from "react";
import Link from "next/link";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import StatCard from "@/components/dashboard/StatCard";
import MediaManager from "@/components/media/MediaManager";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Newspaper,
  Users,
  FileText,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Clock,
  FolderOpen,
  Eye,
  Edit,
} from "lucide-react";

export default function AdminDashboardPage() {
  const [mediaManagerOpen, setMediaManagerOpen] = useState(false);

  const stats = [
    {
      title: "Total Articles",
      value: "1,245",
      change: "+24 this week",
      changeType: "positive" as const,
      icon: Newspaper,
      iconColor: "text-blue-600",
      iconBg: "bg-blue-50",
    },
    {
      title: "Published",
      value: "1,089",
      change: "+18 today",
      changeType: "positive" as const,
      icon: CheckCircle2,
      iconColor: "text-green-600",
      iconBg: "bg-green-50",
    },
    {
      title: "Pending Review",
      value: "23",
      change: "5 new today",
      changeType: "neutral" as const,
      icon: Clock,
      iconColor: "text-yellow-600",
      iconBg: "bg-yellow-50",
    },
    {
      title: "Total Views",
      value: "125.4K",
      change: "+12% this week",
      changeType: "positive" as const,
      icon: Eye,
      iconColor: "text-purple-600",
      iconBg: "bg-purple-50",
    },
  ];

  const recentArticles = [
    { 
      id: 1, 
      title: "Breaking: Major Policy Changes Announced", 
      status: "published", 
      category: "Politics", 
      date: "2 hours ago",
      views: "1.2K"
    },
    { 
      id: 2, 
      title: "Technology Innovation Summit Coverage", 
      status: "pending", 
      category: "Technology", 
      date: "5 hours ago",
      views: "0"
    },
    { 
      id: 3, 
      title: "Sports Championship Highlights", 
      status: "published", 
      category: "Sports", 
      date: "1 day ago",
      views: "3.5K"
    },
    { 
      id: 4, 
      title: "Economic Analysis Report", 
      status: "draft", 
      category: "Business", 
      date: "2 days ago",
      views: "0"
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <DashboardSidebar role="admin" />
      <main className="flex-1 overflow-x-hidden">
        <DashboardHeader 
          title="News Portal Dashboard" 
          subtitle="Manage articles, media, and content" 
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
            {/* Recent Articles */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Recent Articles</CardTitle>
                    <Link href="/dashboard/admin/posts">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-blue-600 border-blue-600 hover:bg-blue-50"
                      >
                        View all
                      </Button>
                    </Link>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentArticles.map((article) => (
                      <div
                        key={article.id}
                        className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center gap-4 flex-1 min-w-0">
                          <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold shrink-0">
                            {article.title.charAt(0)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-gray-900 truncate">{article.title}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline" className="text-xs">
                                {article.category}
                              </Badge>
                              <span className="text-xs text-gray-500">{article.date}</span>
                              <span className="text-xs text-gray-500">• {article.views} views</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          {article.status === "published" ? (
                            <Badge className="bg-green-600 text-white">
                              <CheckCircle2 className="h-3 w-3 mr-1" />
                              Published
                            </Badge>
                          ) : article.status === "pending" ? (
                            <Badge className="bg-yellow-600 text-white">
                              <Clock className="h-3 w-3 mr-1" />
                              Pending
                            </Badge>
                          ) : (
                            <Badge className="bg-gray-600 text-white">
                              <Edit className="h-3 w-3 mr-1" />
                              Draft
                            </Badge>
                          )}
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Analytics Chart Placeholder */}
              <Card>
                <CardHeader>
                  <CardTitle>Content Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <TrendingUp className="h-12 w-12 text-blue-600 mx-auto mb-2" />
                      <p className="text-gray-600">Content performance analytics</p>
                      <p className="text-sm text-gray-500">Article views, engagement, and trends</p>
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
                  <Link href="/dashboard/admin/posts/new" className="w-full">
                    <Button className="w-full justify-start bg-blue-600 hover:bg-blue-700">
                      <FileText className="h-4 w-4 mr-2" />
                      Create Post
                    </Button>
                  </Link>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => setMediaManagerOpen(true)}
                  >
                    <FolderOpen className="h-4 w-4 mr-2" />
                    Media Manager
                  </Button>
                  <Link href="/dashboard/admin/posts" className="w-full">
                    <Button variant="outline" className="w-full justify-start">
                      <Newspaper className="h-4 w-4 mr-2" />
                      Manage Posts
                    </Button>
                  </Link>
                  <Link href="/dashboard/admin/users" className="w-full">
                    <Button variant="outline" className="w-full justify-start">
                      <Users className="h-4 w-4 mr-2" />
                      Manage Users
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* System Alerts */}
              <Card>
                <CardHeader>
                  <CardTitle>System Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <AlertCircle className="h-4 w-4 text-yellow-600 mt-0.5 shrink-0" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-yellow-900">23 articles pending review</p>
                        <p className="text-xs text-yellow-700 mt-1">Requires your attention</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5 shrink-0" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-blue-900">System running smoothly</p>
                        <p className="text-xs text-blue-700">All services operational</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      {/* Media Manager Modal */}
      <MediaManager open={mediaManagerOpen} onOpenChange={setMediaManagerOpen} />
    </div>
  );
}
