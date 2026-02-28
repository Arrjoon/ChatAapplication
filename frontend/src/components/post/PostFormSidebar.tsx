"use client";

import React, { useState, useEffect } from "react";
import { X, FileText, Image, Tag, Calendar, User, Eye, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PostData {
  id?: number;
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

interface PostFormSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  post?: PostData | null;
  onSave: (post: Omit<PostData, "id">) => void;
}

const PostFormSidebar = ({ isOpen, onClose, post, onSave }: PostFormSidebarProps) => {
  const [formData, setFormData] = useState<Omit<PostData, "id">>({
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

  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title || "",
        content: post.content || "",
        excerpt: post.excerpt || "",
        category: post.category || "News",
        status: post.status || "draft",
        featuredImage: post.featuredImage || "",
        author: post.author || "",
        publishedDate: post.publishedDate || new Date().toISOString().split("T")[0],
        tags: post.tags || "",
        metaTitle: post.metaTitle || "",
        metaDescription: post.metaDescription || "",
        views: post.views || 0,
      });
    } else {
      // Reset form for new post
      setFormData({
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
    }
    setErrors({});
  }, [post, isOpen]);

  const handleChange = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validate = (): boolean => {
    const newErrors: { [key: string]: string } = {};
    
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.content.trim()) newErrors.content = "Content is required";
    if (!formData.excerpt.trim()) newErrors.excerpt = "Excerpt is required";
    if (!formData.author.trim()) newErrors.author = "Author is required";
    if (formData.excerpt.length > 200) newErrors.excerpt = "Excerpt must be less than 200 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSave(formData);
      onClose();
    }
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[700px] lg:w-[800px] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out overflow-y-auto ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 shadow-lg z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold">
                  {post ? "Edit Post" : "Create New Post"}
                </h2>
                <p className="text-sm text-white/90">
                  {post ? "Update post information" : "Add a new news article"}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-white hover:bg-white/20"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Information */}
          <Card>
            <CardContent className="pt-6 space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-600" />
                Basic Information
              </h3>

              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title <span className="text-red-500">*</span>
                </label>
                <Input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  placeholder="Enter post title"
                  className={errors.title ? "border-red-500" : ""}
                />
                {errors.title && (
                  <p className="text-sm text-red-500 mt-1">{errors.title}</p>
                )}
              </div>

              {/* Excerpt */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Excerpt/Summary <span className="text-red-500">*</span>
                  <span className="text-xs text-gray-500 ml-2">({formData.excerpt.length}/200)</span>
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

              {/* Content */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Content <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.content}
                  onChange={(e) => handleChange("content", e.target.value)}
                  placeholder="Write your article content here..."
                  rows={12}
                  className={`w-full px-3 py-2 border rounded-md resize-none ${
                    errors.content ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.content && (
                  <p className="text-sm text-red-500 mt-1">{errors.content}</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Media & Category */}
          <Card>
            <CardContent className="pt-6 space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Image className="h-5 w-5 text-purple-600" />
                Media & Category
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

                {/* Status */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status <span className="text-red-500">*</span>
                  </label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) => handleChange("status", value as "draft" | "pending" | "published")}
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
              </div>

              {/* Featured Image */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Featured Image URL
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
                    className="mt-2 w-full h-48 object-cover rounded-md border"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                )}
              </div>
            </CardContent>
          </Card>

          {/* Author & Publishing */}
          <Card>
            <CardContent className="pt-6 space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <User className="h-5 w-5 text-blue-600" />
                Author & Publishing
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Author */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Author <span className="text-red-500">*</span>
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

              {/* Views */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  Views
                </label>
                <Input
                  type="number"
                  value={formData.views}
                  onChange={(e) => handleChange("views", parseInt(e.target.value) || 0)}
                  placeholder="0"
                  min="0"
                />
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

          {/* SEO Information */}
          <Card>
            <CardContent className="pt-6 space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Eye className="h-5 w-5 text-purple-600" />
                SEO Information
              </h3>

              {/* Meta Title */}
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

              {/* Meta Description */}
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

          {/* Form Actions */}
          <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6 -mx-6 -mb-6 flex items-center justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="px-6"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6"
            >
              <Save className="h-4 w-4 mr-2" />
              {post ? "Update Post" : "Create Post"}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default PostFormSidebar;

