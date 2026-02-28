"use client";

import React, { useState, useEffect } from "react";
import { X, User, Mail, Phone, Shield, Calendar, MapPin, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface UserData {
  id?: number;
  name: string;
  email: string;
  phone: string;
  role: "admin" | "business" | "user";
  status: "active" | "inactive" | "suspended";
  address?: string;
  city?: string;
  joinedDate?: string;
  lastActive?: string;
  reviewCount?: number;
  photoUrl?: string;
}

interface UserFormSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  user?: UserData | null;
  onSave: (user: Omit<UserData, "id">) => void;
}

const UserFormSidebar = ({ isOpen, onClose, user, onSave }: UserFormSidebarProps) => {
  const [formData, setFormData] = useState<Omit<UserData, "id">>({
    name: "",
    email: "",
    phone: "",
    role: "user",
    status: "active",
    address: "",
    city: "Kathmandu",
    joinedDate: new Date().toISOString().split("T")[0],
    lastActive: new Date().toISOString().split("T")[0],
    reviewCount: 0,
    photoUrl: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        role: user.role || "user",
        status: user.status || "active",
        address: user.address || "",
        city: user.city || "Kathmandu",
        joinedDate: user.joinedDate || new Date().toISOString().split("T")[0],
        lastActive: user.lastActive || new Date().toISOString().split("T")[0],
        reviewCount: user.reviewCount || 0,
        photoUrl: user.photoUrl || "",
      });
    } else {
      // Reset form for new user
      setFormData({
        name: "",
        email: "",
        phone: "",
        role: "user",
        status: "active",
        address: "",
        city: "Kathmandu",
        joinedDate: new Date().toISOString().split("T")[0],
        lastActive: new Date().toISOString().split("T")[0],
        reviewCount: 0,
        photoUrl: "",
      });
    }
    setErrors({});
  }, [user, isOpen]);

  const handleChange = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
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
        className={`fixed top-0 right-0 h-full w-full sm:w-[600px] lg:w-[700px] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out overflow-y-auto ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-green-600 text-white p-6 shadow-lg z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <User className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold">
                  {user ? "Edit User" : "Create New User"}
                </h2>
                <p className="text-sm text-white/90">
                  {user ? "Update user information" : "Add a new user to the platform"}
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
                <User className="h-5 w-5 text-blue-600" />
                Basic Information
              </h3>

              {/* Profile Photo URL */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Profile Photo URL
                </label>
                <Input
                  type="url"
                  value={formData.photoUrl}
                  onChange={(e) => handleChange("photoUrl", e.target.value)}
                  placeholder="https://example.com/photo.jpg"
                />
              </div>

              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <Input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  placeholder="Enter full name"
                  className={errors.name ? "border-red-500" : ""}
                />
                {errors.name && (
                  <p className="text-sm text-red-500 mt-1">{errors.name}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email <span className="text-red-500">*</span>
                </label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  placeholder="user@example.com"
                  className={errors.email ? "border-red-500" : ""}
                />
                {errors.email && (
                  <p className="text-sm text-red-500 mt-1">{errors.email}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Phone <span className="text-red-500">*</span>
                </label>
                <Input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  placeholder="+977 98-1234567"
                  className={errors.phone ? "border-red-500" : ""}
                />
                {errors.phone && (
                  <p className="text-sm text-red-500 mt-1">{errors.phone}</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Role & Status */}
          <Card>
            <CardContent className="pt-6 space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Shield className="h-5 w-5 text-green-600" />
                Role & Status
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Role */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Role <span className="text-red-500">*</span>
                  </label>
                  <Select
                    value={formData.role}
                    onValueChange={(value) => handleChange("role", value as "admin" | "business" | "user")}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="user">User</SelectItem>
                      <SelectItem value="business">Business Owner</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
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
                    onValueChange={(value) => handleChange("status", value as "active" | "inactive" | "suspended")}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="suspended">Suspended</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Location Information */}
          <Card>
            <CardContent className="pt-6 space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-blue-600" />
                Location Information
              </h3>

              {/* Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address
                </label>
                <Input
                  type="text"
                  value={formData.address}
                  onChange={(e) => handleChange("address", e.target.value)}
                  placeholder="Street address"
                />
              </div>

              {/* City */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City
                </label>
                <Input
                  type="text"
                  value={formData.city}
                  onChange={(e) => handleChange("city", e.target.value)}
                  placeholder="Kathmandu"
                />
              </div>
            </CardContent>
          </Card>

          {/* Additional Information */}
          <Card>
            <CardContent className="pt-6 space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-green-600" />
                Additional Information
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Joined Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Joined Date
                  </label>
                  <Input
                    type="date"
                    value={formData.joinedDate}
                    onChange={(e) => handleChange("joinedDate", e.target.value)}
                  />
                </div>

                {/* Last Active */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Active
                  </label>
                  <Input
                    type="date"
                    value={formData.lastActive}
                    onChange={(e) => handleChange("lastActive", e.target.value)}
                  />
                </div>
              </div>

              {/* Review Count */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Review Count
                </label>
                <Input
                  type="number"
                  value={formData.reviewCount}
                  onChange={(e) => handleChange("reviewCount", parseInt(e.target.value) || 0)}
                  placeholder="0"
                  min="0"
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
              className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white px-6"
            >
              <Save className="h-4 w-4 mr-2" />
              {user ? "Update User" : "Create User"}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UserFormSidebar;

