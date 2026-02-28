"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import RichTextEditor from "@/components/post/RichTextEditor";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Save,
  X,
  FileText,
  Image,
  Tag,
  Calendar,
  User,
  Eye,
  ArrowLeft,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";

interface PostData {
  id: number;
  title: string;
  content: string;
  excerpt: string;
  category: string;
  status: "draft" | "pending" | "published";
  featuredImage?: string;
  author: string;
  publishedDate?: string;
  tags: string;
  metaTitle?: string;
  metaDescription?: string;
  views?: number;
}

// Mock data - in production, fetch from API
const mockPosts: PostData[] = [
  {
    id: 1,
    title: "Breaking: Major Policy Changes Announced",
    content: "<p>Full article content here...</p>",
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
    content: "<p>Full article content here...</p>",
    excerpt: "Leading tech companies gathered to discuss the future of innovation and digital transformation.",
    category: "Technology",
    status: "pending",
    featuredImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800",
    author: "Jane Smith",
    publishedDate: "2024-01-27",
    tags: "technology, innovation, summit",
    views: 0,
  },
];

export default function EditPostPage() {
  const router = useRouter();
  const params = useParams();
  const postId = parseInt(params.id as string);

  const [formData, setFormData] = useState<PostData>({
    id: 0,
    title: "",
    content: "",
    excerpt: "",
    category: "News",
    status: "draft",
    featuredImage: "",
    author: "",
    publishedDate: new Date().toISOString().split("T")[0],
    tags: "",
    metaTitle: "",
    metaDescription: "",
    views: 0,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In production, fetch post from API
    const post = mockPosts.find((p) => p.id === postId);
    if (post) {
      setFormData(post);
    }
    setIsLoading(false);
  }, [postId]);

  const handleChange = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validate = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.content.trim() || formData.content === "<p><br></p>") {
      newErrors.content = "Content is required";
    }
    if (!formData.excerpt.trim()) newErrors.excerpt = "Excerpt is required";
    if (!formData.author.trim()) newErrors.author = "Author is required";
    if (formData.excerpt.length > 200)
      newErrors.excerpt = "Excerpt must be less than 200 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSaving(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // In production, update via API
    console.log("Updating post:", formData);

    setIsSaving(false);
    router.push("/dashboard/admin/posts");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex">
        <DashboardSidebar role="admin" />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading post...</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <DashboardSidebar role="admin" />
      <main className="flex-1 overflow-x-hidden">
        <DashboardHeader
          title="Edit Post"
          subtitle="Update post information and content"
        />

        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Header Actions */}
            <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <Link href="/dashboard/admin/posts">
                <Button variant="outline" type="button">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Posts
                </Button>
              </Link>
              <div className="flex items-center gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push("/dashboard/admin/posts")}
                >
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSaving}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {isSaving ? "Saving..." : "Update Post"}
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Title */}
                <Card>
                  <CardContent className="pt-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Title <span className="text-red-500">*</span>
                      </label>
                      <Input
                        type="text"
                        value={formData.title}
                        onChange={(e) => handleChange("title", e.target.value)}
                        placeholder="Enter post title"
                        className={`text-2xl font-bold h-14 ${errors.title ? "border-red-500" : ""}`}
                      />
                      {errors.title && (
                        <p className="text-sm text-red-500 mt-1">{errors.title}</p>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Content Editor */}
                <Card>
                  <CardContent className="pt-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Content <span className="text-red-500">*</span>
                      </label>
                      <RichTextEditor
                        value={formData.content}
                        onChange={(value) => handleChange("content", value)}
                        placeholder="Write your article content here..."
                      />
                      {errors.content && (
                        <p className="text-sm text-red-500 mt-1">{errors.content}</p>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Excerpt */}
                <Card>
                  <CardContent className="pt-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Excerpt/Summary <span className="text-red-500">*</span>
                        <span className="text-xs text-gray-500 ml-2">
                          ({formData.excerpt.length}/200)
                        </span>
                      </label>
                      <textarea
                        value={formData.excerpt}
                        onChange={(e) => handleChange("excerpt", e.target.value)}
                        placeholder="Brief summary of the article"
                        rows={3}
                        maxLength={200}
                        className={`w-full px-3 py-2 border rounded-md resize-none ${
                          errors.excerpt ? "border-red-500" : "border-gray-300"
                        }`}
                      />
                      {errors.excerpt && (
                        <p className="text-sm text-red-500 mt-1">{errors.excerpt}</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Publish Settings */}
                <Card>
                  <CardContent className="pt-6 space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <FileText className="h-5 w-5 text-blue-600" />
                      Publish Settings
                    </h3>

                    <div className="space-y-4">
                      {/* Status */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Status <span className="text-red-500">*</span>
                        </label>
                        <Select
                          value={formData.status}
                          onValueChange={(value) =>
                            handleChange("status", value as "draft" | "pending" | "published")
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="draft">Draft</SelectItem>
                            <SelectItem value="pending">Pending Review</SelectItem>
                            <SelectItem value="published">Published</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Category */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Category <span className="text-red-500">*</span>
                        </label>
                        <Select
                          value={formData.category}
                          onValueChange={(value) => handleChange("category", value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
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

                      {/* Published Date */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          Published Date
                        </label>
                        <Input
                          type="date"
                          value={formData.publishedDate}
                          onChange={(e) => handleChange("publishedDate", e.target.value)}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Featured Image */}
                <Card>
                  <CardContent className="pt-6 space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <Image className="h-5 w-5 text-purple-600" />
                      Featured Image
                    </h3>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Image URL
                      </label>
                      <Input
                        type="url"
                        value={formData.featuredImage}
                        onChange={(e) => handleChange("featuredImage", e.target.value)}
                        placeholder="https://example.com/image.jpg"
                      />
                      {formData.featuredImage && (
                        <img
                          src={formData.featuredImage}
                          alt="Featured"
                          className="mt-3 w-full h-48 object-cover rounded-md border"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = "none";
                          }}
                        />
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Author */}
                <Card>
                  <CardContent className="pt-6 space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <User className="h-5 w-5 text-blue-600" />
                      Author
                    </h3>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Author Name <span className="text-red-500">*</span>
                      </label>
                      <Input
                        type="text"
                        value={formData.author}
                        onChange={(e) => handleChange("author", e.target.value)}
                        placeholder="Author name"
                        className={errors.author ? "border-red-500" : ""}
                      />
                      {errors.author && (
                        <p className="text-sm text-red-500 mt-1">{errors.author}</p>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Tags */}
                <Card>
                  <CardContent className="pt-6 space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <Tag className="h-5 w-5 text-green-600" />
                      Tags
                    </h3>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tags (comma separated)
                      </label>
                      <Input
                        type="text"
                        value={formData.tags}
                        onChange={(e) => handleChange("tags", e.target.value)}
                        placeholder="breaking, news, politics"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Separate multiple tags with commas
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* SEO */}
                <Card>
                  <CardContent className="pt-6 space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <Eye className="h-5 w-5 text-purple-600" />
                      SEO Information
                    </h3>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Meta Title
                      </label>
                      <Input
                        type="text"
                        value={formData.metaTitle}
                        onChange={(e) => handleChange("metaTitle", e.target.value)}
                        placeholder="SEO title for search engines"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Meta Description
                      </label>
                      <textarea
                        value={formData.metaDescription}
                        onChange={(e) => handleChange("metaDescription", e.target.value)}
                        placeholder="SEO description for search engines"
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md resize-none"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

