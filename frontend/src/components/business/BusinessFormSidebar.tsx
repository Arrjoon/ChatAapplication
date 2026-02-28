"use client";

import React, { useState, useEffect } from "react";
import { X, Building2, MapPin, Phone, Globe, Clock, DollarSign, Image as ImageIcon, Save } from "lucide-react";
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

interface Business {
  id?: number;
  name: string;
  category: string;
  description: string;
  address: string;
  city: string;
  phone: string;
  email: string;
  website: string;
  priceRange: string;
  status: "active" | "pending" | "inactive";
  imageUrl: string;
  hours: {
    [key: string]: { open: string; close: string; closed?: boolean };
  };
}

interface BusinessFormSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  business?: Business | null;
  onSave: (business: Omit<Business, "id">) => void;
}

const BusinessFormSidebar = ({ isOpen, onClose, business, onSave }: BusinessFormSidebarProps) => {
  const [formData, setFormData] = useState<Omit<Business, "id">>({
    name: "",
    category: "",
    description: "",
    address: "",
    city: "Kathmandu",
    phone: "",
    email: "",
    website: "",
    priceRange: "Rs. 500-1000",
    status: "pending",
    imageUrl: "",
    hours: {
      monday: { open: "09:00", close: "18:00", closed: false },
      tuesday: { open: "09:00", close: "18:00", closed: false },
      wednesday: { open: "09:00", close: "18:00", closed: false },
      thursday: { open: "09:00", close: "18:00", closed: false },
      friday: { open: "09:00", close: "18:00", closed: false },
      saturday: { open: "09:00", close: "18:00", closed: false },
      sunday: { open: "09:00", close: "18:00", closed: true },
    },
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (business) {
      setFormData({
        name: business.name || "",
        category: business.category || "",
        description: business.description || "",
        address: business.address || "",
        city: business.city || "Kathmandu",
        phone: business.phone || "",
        email: business.email || "",
        website: business.website || "",
        priceRange: business.priceRange || "Rs. 500-1000",
        status: business.status || "pending",
        imageUrl: business.imageUrl || "",
        hours: business.hours || formData.hours,
      });
    } else {
      // Reset form for new business
      setFormData({
        name: "",
        category: "",
        description: "",
        address: "",
        city: "Kathmandu",
        phone: "",
        email: "",
        website: "",
        priceRange: "Rs. 500-1000",
        status: "pending",
        imageUrl: "",
        hours: {
          monday: { open: "09:00", close: "18:00", closed: false },
          tuesday: { open: "09:00", close: "18:00", closed: false },
          wednesday: { open: "09:00", close: "18:00", closed: false },
          thursday: { open: "09:00", close: "18:00", closed: false },
          friday: { open: "09:00", close: "18:00", closed: false },
          saturday: { open: "09:00", close: "18:00", closed: false },
          sunday: { open: "09:00", close: "18:00", closed: true },
        },
      });
    }
    setErrors({});
  }, [business, isOpen]);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleHoursChange = (day: string, field: "open" | "close" | "closed", value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      hours: {
        ...prev.hours,
        [day]: {
          ...prev.hours[day],
          [field]: value,
        },
      },
    }));
  };

  const validate = (): boolean => {
    const newErrors: { [key: string]: string } = {};
    
    if (!formData.name.trim()) newErrors.name = "Business name is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

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

  const categories = [
    "Restaurant",
    "Cafe",
    "Hotel",
    "Spa",
    "Tourism",
    "Shopping",
    "Entertainment",
    "Healthcare",
    "Education",
    "Automotive",
    "Other",
  ];

  const priceRanges = [
    "Rs. 200-500",
    "Rs. 500-1000",
    "Rs. 1000-2000",
    "Rs. 2000-5000",
    "Rs. 5000+",
  ];

  const days = [
    { key: "monday", label: "Monday" },
    { key: "tuesday", label: "Tuesday" },
    { key: "wednesday", label: "Wednesday" },
    { key: "thursday", label: "Thursday" },
    { key: "friday", label: "Friday" },
    { key: "saturday", label: "Saturday" },
    { key: "sunday", label: "Sunday" },
  ];

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
                <Building2 className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold">
                  {business ? "Edit Business" : "Create New Business"}
                </h2>
                <p className="text-sm text-white/90">
                  {business ? "Update business information" : "Add a new business to the platform"}
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
                <Building2 className="h-5 w-5 text-blue-600" />
                Basic Information
              </h3>

              {/* Business Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Business Name <span className="text-red-500">*</span>
                </label>
                <Input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  placeholder="Enter business name"
                  className={errors.name ? "border-red-500" : ""}
                />
                {errors.name && (
                  <p className="text-sm text-red-500 mt-1">{errors.name}</p>
                )}
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
                  <SelectTrigger className={errors.category ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.category && (
                  <p className="text-sm text-red-500 mt-1">{errors.category}</p>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  placeholder="Describe your business..."
                  rows={4}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Image URL */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <ImageIcon className="h-4 w-4" />
                  Image URL
                </label>
                <Input
                  type="url"
                  value={formData.imageUrl}
                  onChange={(e) => handleChange("imageUrl", e.target.value)}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardContent className="pt-6 space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Phone className="h-5 w-5 text-green-600" />
                Contact Information
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    placeholder="+977 1-4412345"
                    className={errors.phone ? "border-red-500" : ""}
                  />
                  {errors.phone && (
                    <p className="text-sm text-red-500 mt-1">{errors.phone}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    placeholder="business@example.com"
                    className={errors.email ? "border-red-500" : ""}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500 mt-1">{errors.email}</p>
                  )}
                </div>
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Address <span className="text-red-500">*</span>
                </label>
                <Input
                  type="text"
                  value={formData.address}
                  onChange={(e) => handleChange("address", e.target.value)}
                  placeholder="Street address"
                  className={errors.address ? "border-red-500" : ""}
                />
                {errors.address && (
                  <p className="text-sm text-red-500 mt-1">{errors.address}</p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

                {/* Website */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    Website
                  </label>
                  <Input
                    type="url"
                    value={formData.website}
                    onChange={(e) => handleChange("website", e.target.value)}
                    placeholder="https://example.com"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Business Details */}
          <Card>
            <CardContent className="pt-6 space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-blue-600" />
                Business Details
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price Range
                  </label>
                  <Select
                    value={formData.priceRange}
                    onValueChange={(value) => handleChange("priceRange", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {priceRanges.map((range) => (
                        <SelectItem key={range} value={range}>
                          {range}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Status */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) => handleChange("status", value as "active" | "pending" | "inactive")}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Business Hours */}
          <Card>
            <CardContent className="pt-6 space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Clock className="h-5 w-5 text-green-600" />
                Business Hours
              </h3>

              <div className="space-y-3">
                {days.map((day) => (
                  <div key={day.key} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg">
                    <div className="w-24 shrink-0">
                      <label className="text-sm font-medium text-gray-700">
                        {day.label}
                      </label>
                    </div>
                    <div className="flex-1 flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={!formData.hours[day.key]?.closed}
                        onChange={(e) => handleHoursChange(day.key, "closed", !e.target.checked)}
                        className="h-4 w-4 text-blue-600 rounded"
                      />
                      {!formData.hours[day.key]?.closed ? (
                        <>
                          <Input
                            type="time"
                            value={formData.hours[day.key]?.open || "09:00"}
                            onChange={(e) => handleHoursChange(day.key, "open", e.target.value)}
                            className="flex-1"
                          />
                          <span className="text-gray-500">to</span>
                          <Input
                            type="time"
                            value={formData.hours[day.key]?.close || "18:00"}
                            onChange={(e) => handleHoursChange(day.key, "close", e.target.value)}
                            className="flex-1"
                          />
                        </>
                      ) : (
                        <span className="text-gray-500 text-sm">Closed</span>
                      )}
                    </div>
                  </div>
                ))}
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
              {business ? "Update Business" : "Create Business"}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default BusinessFormSidebar;

