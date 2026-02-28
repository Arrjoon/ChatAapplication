"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Newspaper,
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  Calendar,
  User,
  Tag,
  CheckCircle2,
  Clock,
  FileText,
  Filter,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PostData {
  id: number;
  title: string;
  content: string;
  excerpt: string;
  category: string;
  status: "draft" | "pending" | "published";
  featuredImage?: string;
  author: string;
  publishedDate: string;
  tags: string;
  views: number;
}

// Mock data
const mockPosts: PostData[] = [
  {
    id: 1,
    title: "Breaking: Major Policy Changes Announced",
    content: "Full article content here...",
    excerpt: "The government has announced significant policy changes that will affect millions of citizens.",
    category: "Politics",
    status: "published",
    featuredImage: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800",
    author: "John Doe",
    publishedDate: "2024-01-28",
    tags: "breaking, politics, government",
    views: 1250,
  },
  {
    id: 2,
    title: "Technology Innovation Summit Coverage",
    content: "Full article content here...",
    excerpt: "Leading tech companies gathered to discuss the future of innovation and digital transformation.",
    category: "Technology",
    status: "pending",
    featuredImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800",
    author: "Jane Smith",
    publishedDate: "2024-01-27",
    tags: "technology, innovation, summit",
    views: 0,
  },
  {
    id: 3,
    title: "Sports Championship Highlights",
    content: "Full article content here...",
    excerpt: "Exciting moments from the recent championship match that kept fans on the edge of their seats.",
    category: "Sports",
    status: "published",
    featuredImage: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800",
    author: "Mike Johnson",
    publishedDate: "2024-01-26",
    tags: "sports, championship, highlights",
    views: 3500,
  },
  {
    id: 4,
    title: "Economic Analysis Report",
    content: "Full article content here...",
    excerpt: "Comprehensive analysis of current economic trends and their implications for the market.",
    category: "Business",
    status: "draft",
    featuredImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
    author: "Sarah Williams",
    publishedDate: "2024-01-25",
    tags: "business, economy, analysis",
    views: 0,
  },
  {
    id: 5,
    title: "Health and Wellness Tips for 2024",
    content: "Full article content here...",
    excerpt: "Expert advice on maintaining a healthy lifestyle in the new year with practical tips.",
    category: "Health",
    status: "published",
    featuredImage: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800",
    author: "Dr. Emily Chen",
    publishedDate: "2024-01-24",
    tags: "health, wellness, tips",
    views: 890,
  },
  {
    id: 6,
    title: "Education System Reforms",
    content: "Full article content here...",
    excerpt: "New reforms in the education system aim to improve learning outcomes for students nationwide.",
    category: "Education",
    status: "published",
    featuredImage: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800",
    author: "Robert Brown",
    publishedDate: "2024-01-23",
    tags: "education, reform, students",
    views: 2100,
  },
];

export default function PostsPage() {
  const router = useRouter();
  const [posts, setPosts] = useState<PostData[]>(mockPosts);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  const handleCreate = () => {
    router.push("/dashboard/admin/posts/new");
  };

  const handleEdit = (post: PostData) => {
    router.push(`/dashboard/admin/posts/${post.id}/edit`);
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this post?")) {
      setPosts(posts.filter((p) => p.id !== id));
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "published":
        return (
          <Badge className="bg-green-600 text-white">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            Published
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-yellow-600 text-white">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        );
      case "draft":
        return (
          <Badge className="bg-gray-600 text-white">
            <FileText className="h-3 w-3 mr-1" />
            Draft
          </Badge>
        );
      default:
        return null;
    }
  };

  const getCategoryBadge = (category: string) => {
    const categoryColors: { [key: string]: string } = {
      News: "bg-blue-600",
      Politics: "bg-red-600",
      Technology: "bg-purple-600",
      Sports: "bg-orange-600",
      Business: "bg-green-600",
      Entertainment: "bg-pink-600",
      Health: "bg-teal-600",
      Education: "bg-indigo-600",
    };
    return (
      <Badge className={`${categoryColors[category] || "bg-gray-600"} text-white`}>
        {category}
      </Badge>
    );
  };

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || post.status === statusFilter;
    const matchesCategory = categoryFilter === "all" || post.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <DashboardSidebar role="admin" />
      <main className="flex-1 overflow-x-hidden">
        <DashboardHeader
          title="Post Management"
          subtitle="Manage all news articles and posts"
        />

        <div className="p-6 space-y-6">
          {/* Header Actions */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">All Posts</h2>
              <p className="text-sm text-gray-600 mt-1">
                {filteredPosts.length} post{filteredPosts.length !== 1 ? "s" : ""} found
              </p>
            </div>
            <Button
              onClick={handleCreate}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Post
            </Button>
          </div>

          {/* Filters */}
          <Card>
            <CardContent className="pt-2">
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Search */}
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search posts by title, excerpt, or author..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>

                {/* Status Filter */}
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                  </SelectContent>
                </Select>

                {/* Category Filter */}
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="News">News</SelectItem>
                    <SelectItem value="Politics">Politics</SelectItem>
                    <SelectItem value="Technology">Technology</SelectItem>
                    <SelectItem value="Sports">Sports</SelectItem>
                    <SelectItem value="Business">Business</SelectItem>
                    <SelectItem value="Entertainment">Entertainment</SelectItem>
                    <SelectItem value="Health">Health</SelectItem>
                    <SelectItem value="Education">Education</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <Card key={post.id} className="hover:shadow-lg transition-shadow overflow-hidden">
                <CardContent className="p-0">
                  {/* Featured Image */}
                  {post.featuredImage && (
                    <div className="relative h-48 w-full overflow-hidden bg-gray-200">
                      <img
                        src={post.featuredImage}
                        alt={post.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = "none";
                        }}
                      />
                      <div className="absolute top-3 right-3">
                        {getStatusBadge(post.status)}
                      </div>
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-5 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-lg font-bold text-gray-900 line-clamp-2 flex-1">
                        {post.title}
                      </h3>
                    </div>

                    <p className="text-sm text-gray-600 line-clamp-2">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center gap-2 flex-wrap">
                      {getCategoryBadge(post.category)}
                      {post.tags.split(",").slice(0, 2).map((tag, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {tag.trim()}
                        </Badge>
                      ))}
                    </div>

                    {/* Meta Information */}
                    <div className="space-y-2 text-sm text-gray-600 pt-3 border-t border-gray-200">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-gray-400" />
                        <span className="truncate">{post.author}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span className="text-xs">
                            {new Date(post.publishedDate).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="h-4 w-4 text-gray-400" />
                          <span className="text-xs">{post.views} views</span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 pt-3 border-t border-gray-200">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => handleEdit(post)}
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        onClick={() => handleDelete(post.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Empty State */}
          {filteredPosts.length === 0 && (
            <Card>
              <CardContent className="py-12 text-center">
                <Newspaper className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No posts found
                </h3>
                <p className="text-gray-600 mb-4">
                  {searchQuery || statusFilter !== "all" || categoryFilter !== "all"
                    ? "Try adjusting your filters"
                    : "Get started by creating your first post"}
                </p>
                {(!searchQuery && statusFilter === "all" && categoryFilter === "all") && (
                  <Button
                    onClick={handleCreate}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Create Post
                  </Button>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}

