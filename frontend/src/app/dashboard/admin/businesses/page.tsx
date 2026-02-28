"use client";

import React, { useState } from "react";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import BusinessFormSidebar from "@/components/business/BusinessFormSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Building2,
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  CheckCircle2,
  Clock,
  XCircle,
  Filter,
  MoreVertical,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Business {
  id: number;
  name: string;
  category: string;
  address: string;
  city: string;
  phone: string;
  email: string;
  status: "active" | "pending" | "inactive";
  rating?: number;
  reviewCount?: number;
  createdAt: string;
  imageUrl?: string;
}

// Mock data
const mockBusinesses: Business[] = [
  {
    id: 1,
    name: "Himalayan Restaurant",
    category: "Restaurant",
    address: "Thamel, Kathmandu",
    city: "Kathmandu",
    phone: "+977 1-4412345",
    email: "info@himalayan.com",
    status: "active",
    rating: 4.5,
    reviewCount: 128,
    createdAt: "2024-01-15",
    imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400",
  },
  {
    id: 2,
    name: "Thamel Coffee House",
    category: "Cafe",
    address: "Thamel, Kathmandu",
    city: "Kathmandu",
    phone: "+977 1-4423456",
    email: "contact@thamelcoffee.com",
    status: "pending",
    rating: 4.8,
    reviewCount: 89,
    createdAt: "2024-01-20",
    imageUrl: "https://images.unsplash.com/photo-1501339847302-ac426a4c7c8e?w=400",
  },
  {
    id: 3,
    name: "Kathmandu Spa",
    category: "Spa",
    address: "Durbar Marg, Kathmandu",
    city: "Kathmandu",
    phone: "+977 1-4434567",
    email: "info@kathmanduspa.com",
    status: "active",
    rating: 4.2,
    reviewCount: 67,
    createdAt: "2024-01-10",
    imageUrl: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=400",
  },
  {
    id: 4,
    name: "Nepal Adventure Tours",
    category: "Tourism",
    address: "Lazimpat, Kathmandu",
    city: "Kathmandu",
    phone: "+977 1-4445678",
    email: "info@nepaltours.com",
    status: "inactive",
    rating: 4.7,
    reviewCount: 145,
    createdAt: "2024-01-05",
    imageUrl: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400",
  },
  {
    id: 5,
    name: "Everest Bakery",
    category: "Restaurant",
    address: "Boudha, Kathmandu",
    city: "Kathmandu",
    phone: "+977 1-4456789",
    email: "info@everestbakery.com",
    status: "pending",
    rating: 4.3,
    reviewCount: 52,
    createdAt: "2024-01-25",
    imageUrl: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400",
  },
];

export default function BusinessesPage() {
  const [businesses, setBusinesses] = useState<Business[]>(mockBusinesses);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingBusiness, setEditingBusiness] = useState<Business | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  const handleCreate = () => {
    setEditingBusiness(null);
    setIsFormOpen(true);
  };

  const handleEdit = (business: Business) => {
    setEditingBusiness(business);
    setIsFormOpen(true);
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this business?")) {
      setBusinesses(businesses.filter((b) => b.id !== id));
    }
  };

  const handleSave = (businessData: any) => {
    if (editingBusiness) {
      // Update existing business
      setBusinesses(
        businesses.map((b) =>
          b.id === editingBusiness.id
            ? { ...b, ...businessData, id: editingBusiness.id }
            : b
        )
      );
    } else {
      // Create new business
      const newBusiness: Business = {
        ...businessData,
        id: businesses.length + 1,
        createdAt: new Date().toISOString().split("T")[0],
        rating: 0,
        reviewCount: 0,
      };
      setBusinesses([...businesses, newBusiness]);
    }
    setIsFormOpen(false);
    setEditingBusiness(null);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-green-600 text-white">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            Active
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-yellow-600 text-white">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        );
      case "inactive":
        return (
          <Badge className="bg-red-600 text-white">
            <XCircle className="h-3 w-3 mr-1" />
            Inactive
          </Badge>
        );
      default:
        return null;
    }
  };

  const filteredBusinesses = businesses.filter((business) => {
    const matchesSearch =
      business.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      business.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      business.address.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || business.status === statusFilter;
    const matchesCategory = categoryFilter === "all" || business.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const categories = Array.from(new Set(businesses.map((b) => b.category)));

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <DashboardSidebar role="admin" />
      <main className="flex-1 overflow-x-hidden">
        <DashboardHeader
          title="Business Management"
          subtitle="Manage all businesses on the platform"
        />

        <div className="p-6 space-y-6">
          {/* Header Actions */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">All Businesses</h2>
              <p className="text-sm text-gray-600 mt-1">
                {filteredBusinesses.length} business{filteredBusinesses.length !== 1 ? "es" : ""} found
              </p>
            </div>
            <Button
              onClick={handleCreate}
              className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Business
            </Button>
          </div>

          {/* Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Search */}
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search businesses..."
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
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>

                {/* Category Filter */}
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Businesses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBusinesses.map((business) => (
              <Card key={business.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  {/* Image */}
                  <div className="relative h-48 bg-gradient-to-br from-blue-400 to-green-400 overflow-hidden">
                    {business.imageUrl ? (
                      <img
                        src={business.imageUrl}
                        alt={business.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Building2 className="h-16 w-16 text-white/50" />
                      </div>
                    )}
                    <div className="absolute top-3 right-3">
                      {getStatusBadge(business.status)}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 space-y-3">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-1">
                        {business.name}
                      </h3>
                      <Badge variant="outline" className="text-xs">
                        {business.category}
                      </Badge>
                    </div>

                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-gray-400" />
                        <span>{business.address}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-400">📞</span>
                        <span>{business.phone}</span>
                      </div>
                      {business.rating && (
                        <div className="flex items-center gap-2">
                          <span className="text-yellow-500">⭐</span>
                          <span>
                            {business.rating} ({business.reviewCount} reviews)
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 pt-3 border-t border-gray-200">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => handleEdit(business)}
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        onClick={() => handleDelete(business.id)}
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
          {filteredBusinesses.length === 0 && (
            <Card>
              <CardContent className="py-12 text-center">
                <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No businesses found
                </h3>
                <p className="text-gray-600 mb-4">
                  {searchQuery || statusFilter !== "all" || categoryFilter !== "all"
                    ? "Try adjusting your filters"
                    : "Get started by creating your first business"}
                </p>
                {(!searchQuery && statusFilter === "all" && categoryFilter === "all") && (
                  <Button
                    onClick={handleCreate}
                    className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Create Business
                  </Button>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      {/* Business Form Sidebar */}
      <BusinessFormSidebar
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingBusiness(null);
        }}
        business={editingBusiness}
        onSave={handleSave}
      />
    </div>
  );
}

