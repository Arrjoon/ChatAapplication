"use client";

import React, { useState } from "react";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Camera,
  Save,
  Edit,
  Calendar,
  MessageSquare,
  Star,
  Shield,
} from "lucide-react";

interface UserProfile {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: "admin" | "business" | "user";
  status: "active" | "inactive" | "suspended";
  address: string;
  city: string;
  bio: string;
  joinedDate: string;
  lastActive: string;
  reviewCount: number;
  helpfulVotes: number;
  photoUrl: string;
  website?: string;
  socialLinks?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
  };
}

// Mock user data - In production, fetch from API
const mockUserProfile: UserProfile = {
  id: 1,
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "+977 98-1234567",
  role: "user",
  status: "active",
  address: "Thamel, Kathmandu",
  city: "Kathmandu",
  bio: "Food enthusiast and local explorer. Love discovering hidden gems in Kathmandu!",
  joinedDate: "2023-01-15",
  lastActive: "2024-01-28",
  reviewCount: 45,
  helpfulVotes: 142,
  photoUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
  website: "",
  socialLinks: {
    facebook: "",
    instagram: "",
    twitter: "",
  },
};

export default function UserProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<UserProfile>(mockUserProfile);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleSocialLinkChange = (platform: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [platform]: value,
      },
    }));
  };

  const validate = (): boolean => {
    const newErrors: { [key: string]: string } = {};
    
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validate()) {
      // In production, save to API
      console.log("Saving profile:", formData);
      setIsEditing(false);
      // Show success message
      alert("Profile updated successfully!");
    }
  };

  const handleCancel = () => {
    setFormData(mockUserProfile); // Reset to original
    setIsEditing(false);
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <DashboardSidebar role="user" />
      <main className="flex-1 overflow-x-hidden">
        <DashboardHeader
          title="My Profile"
          subtitle="Manage your profile information and preferences"
        />

        <div className="p-6 space-y-6">
          {/* Profile Header Card */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                {/* Profile Photo */}
                <div className="relative group">
                  <div className="h-32 w-32 rounded-full overflow-hidden border-4 border-white shadow-lg bg-gradient-to-br from-blue-400 to-green-400">
                    {formData.photoUrl ? (
                      <img
                        src={formData.photoUrl}
                        alt={formData.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <User className="h-16 w-16 text-white" />
                      </div>
                    )}
                  </div>
                  {isEditing && (
                    <button
                      className="absolute bottom-0 right-0 h-10 w-10 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg hover:bg-blue-700 transition-colors"
                      onClick={() => {
                        const url = prompt("Enter image URL:");
                        if (url) handleChange("photoUrl", url);
                      }}
                    >
                      <Camera className="h-5 w-5" />
                    </button>
                  )}
                </div>

                {/* Profile Info */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      {isEditing ? (
                        <Input
                          type="text"
                          value={formData.name}
                          onChange={(e) => handleChange("name", e.target.value)}
                          className={`text-2xl font-bold mb-2 ${errors.name ? "border-red-500" : ""}`}
                        />
                      ) : (
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">
                          {formData.name}
                        </h1>
                      )}
                      {errors.name && (
                        <p className="text-sm text-red-500 mb-2">{errors.name}</p>
                      )}
                      <Badge className="bg-green-600 text-white mb-2">
                        <Shield className="h-3 w-3 mr-1" />
                        {formData.role.charAt(0).toUpperCase() + formData.role.slice(1)}
                      </Badge>
                      <p className="text-sm text-gray-600">
                        Member since {new Date(formData.joinedDate).toLocaleDateString("en-US", {
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                    {!isEditing && (
                      <Button
                        onClick={() => setIsEditing(true)}
                        className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white"
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Profile
                      </Button>
                    )}
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-6 mt-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MessageSquare className="h-4 w-4 text-blue-600" />
                      <span className="font-semibold">{formData.reviewCount}</span>
                      <span>Reviews</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span className="font-semibold">{formData.helpfulVotes}</span>
                      <span>Helpful Votes</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Profile Information */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Personal Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5 text-blue-600" />
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Email */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        Email <span className="text-red-500">*</span>
                      </label>
                      {isEditing ? (
                        <>
                          <Input
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleChange("email", e.target.value)}
                            className={errors.email ? "border-red-500" : ""}
                          />
                          {errors.email && (
                            <p className="text-sm text-red-500 mt-1">{errors.email}</p>
                          )}
                        </>
                      ) : (
                        <p className="text-gray-900 py-2">{formData.email}</p>
                      )}
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        Phone <span className="text-red-500">*</span>
                      </label>
                      {isEditing ? (
                        <>
                          <Input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => handleChange("phone", e.target.value)}
                            className={errors.phone ? "border-red-500" : ""}
                          />
                          {errors.phone && (
                            <p className="text-sm text-red-500 mt-1">{errors.phone}</p>
                          )}
                        </>
                      ) : (
                        <p className="text-gray-900 py-2">{formData.phone}</p>
                      )}
                    </div>
                  </div>

                  {/* Address */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      Address
                    </label>
                    {isEditing ? (
                      <Input
                        type="text"
                        value={formData.address}
                        onChange={(e) => handleChange("address", e.target.value)}
                        placeholder="Street address"
                      />
                    ) : (
                      <p className="text-gray-900 py-2">{formData.address || "Not provided"}</p>
                    )}
                  </div>

                  {/* City */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City
                    </label>
                    {isEditing ? (
                      <Input
                        type="text"
                        value={formData.city}
                        onChange={(e) => handleChange("city", e.target.value)}
                        placeholder="Kathmandu"
                      />
                    ) : (
                      <p className="text-gray-900 py-2">{formData.city}</p>
                    )}
                  </div>

                  {/* Bio */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bio
                    </label>
                    {isEditing ? (
                      <textarea
                        value={formData.bio}
                        onChange={(e) => handleChange("bio", e.target.value)}
                        placeholder="Tell us about yourself..."
                        rows={4}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900 py-2">{formData.bio || "No bio provided"}</p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Social Links */}
              {isEditing && (
                <Card>
                  <CardHeader>
                    <CardTitle>Social Links</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Website
                      </label>
                      <Input
                        type="url"
                        value={formData.website || ""}
                        onChange={(e) => handleChange("website", e.target.value)}
                        placeholder="https://example.com"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Facebook
                        </label>
                        <Input
                          type="url"
                          value={formData.socialLinks?.facebook || ""}
                          onChange={(e) => handleSocialLinkChange("facebook", e.target.value)}
                          placeholder="https://facebook.com/..."
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Instagram
                        </label>
                        <Input
                          type="url"
                          value={formData.socialLinks?.instagram || ""}
                          onChange={(e) => handleSocialLinkChange("instagram", e.target.value)}
                          placeholder="https://instagram.com/..."
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Twitter
                        </label>
                        <Input
                          type="url"
                          value={formData.socialLinks?.twitter || ""}
                          onChange={(e) => handleSocialLinkChange("twitter", e.target.value)}
                          placeholder="https://twitter.com/..."
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Action Buttons */}
              {isEditing && (
                <div className="flex items-center justify-end gap-3">
                  <Button variant="outline" onClick={handleCancel}>
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSave}
                    className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Account Status */}
              <Card>
                <CardHeader>
                  <CardTitle>Account Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                    <span className="text-sm font-medium text-green-900">Status</span>
                    <Badge className="bg-green-600 text-white">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <span className="text-sm font-medium text-blue-900">Member Since</span>
                    <span className="text-sm text-blue-700">
                      {new Date(formData.joinedDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-lg">
                    <span className="text-sm font-medium text-gray-900">Last Active</span>
                    <span className="text-sm text-gray-700">
                      {new Date(formData.lastActive).toLocaleDateString()}
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card>
                <CardHeader>
                  <CardTitle>Your Activity</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="h-5 w-5 text-blue-600" />
                      <span className="text-sm text-gray-700">Reviews Written</span>
                    </div>
                    <span className="text-lg font-bold text-gray-900">{formData.reviewCount}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Star className="h-5 w-5 text-yellow-500" />
                      <span className="text-sm text-gray-700">Helpful Votes</span>
                    </div>
                    <span className="text-lg font-bold text-gray-900">{formData.helpfulVotes}</span>
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

