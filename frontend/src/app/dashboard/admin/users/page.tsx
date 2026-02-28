"use client";

import React, { useState } from "react";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import UserFormSidebar from "@/components/user/UserFormSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  User,
  Plus,
  Search,
  Edit,
  Trash2,
  Mail,
  Phone,
  Shield,
  CheckCircle2,
  XCircle,
  Ban,
  Filter,
  Star,
  MessageSquare,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface UserData {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: "admin" | "business" | "user";
  status: "active" | "inactive" | "suspended";
  address?: string;
  city?: string;
  joinedDate: string;
  lastActive: string;
  reviewCount: number;
  photoUrl?: string;
}

// Mock data
const mockUsers: UserData[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+977 98-1234567",
    role: "admin",
    status: "active",
    address: "Thamel, Kathmandu",
    city: "Kathmandu",
    joinedDate: "2023-01-15",
    lastActive: "2024-01-28",
    reviewCount: 45,
    photoUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
  },
  {
    id: 2,
    name: "Sarah Smith",
    email: "sarah.smith@example.com",
    phone: "+977 98-2345678",
    role: "business",
    status: "active",
    address: "Durbar Marg, Kathmandu",
    city: "Kathmandu",
    joinedDate: "2023-03-20",
    lastActive: "2024-01-27",
    reviewCount: 12,
    photoUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike.j@example.com",
    phone: "+977 98-3456789",
    role: "user",
    status: "active",
    address: "Boudha, Kathmandu",
    city: "Kathmandu",
    joinedDate: "2023-06-10",
    lastActive: "2024-01-28",
    reviewCount: 28,
    photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
  },
  {
    id: 4,
    name: "Emily Chen",
    email: "emily.chen@example.com",
    phone: "+977 98-4567890",
    role: "user",
    status: "inactive",
    address: "Lazimpat, Kathmandu",
    city: "Kathmandu",
    joinedDate: "2023-08-05",
    lastActive: "2024-01-15",
    reviewCount: 8,
    photoUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
  },
  {
    id: 5,
    name: "David Wilson",
    email: "david.w@example.com",
    phone: "+977 98-5678901",
    role: "business",
    status: "suspended",
    address: "Patan, Lalitpur",
    city: "Lalitpur",
    joinedDate: "2023-02-14",
    lastActive: "2024-01-10",
    reviewCount: 0,
    photoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
  },
  {
    id: 6,
    name: "Lisa Anderson",
    email: "lisa.a@example.com",
    phone: "+977 98-6789012",
    role: "user",
    status: "active",
    address: "Koteshwor, Kathmandu",
    city: "Kathmandu",
    joinedDate: "2023-11-20",
    lastActive: "2024-01-28",
    reviewCount: 67,
    photoUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400",
  },
];

export default function UsersPage() {
  const [users, setUsers] = useState<UserData[]>(mockUsers);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<UserData | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [roleFilter, setRoleFilter] = useState<string>("all");

  const handleCreate = () => {
    setEditingUser(null);
    setIsFormOpen(true);
  };

  const handleEdit = (user: UserData) => {
    setEditingUser(user);
    setIsFormOpen(true);
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter((u) => u.id !== id));
    }
  };

  const handleSave = (userData: any) => {
    if (editingUser) {
      // Update existing user
      setUsers(
        users.map((u) =>
          u.id === editingUser.id
            ? { ...u, ...userData, id: editingUser.id }
            : u
        )
      );
    } else {
      // Create new user
      const newUser: UserData = {
        ...userData,
        id: users.length + 1,
        joinedDate: userData.joinedDate || new Date().toISOString().split("T")[0],
        lastActive: userData.lastActive || new Date().toISOString().split("T")[0],
        reviewCount: userData.reviewCount || 0,
      };
      setUsers([...users, newUser]);
    }
    setIsFormOpen(false);
    setEditingUser(null);
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
      case "inactive":
        return (
          <Badge className="bg-gray-600 text-white">
            <XCircle className="h-3 w-3 mr-1" />
            Inactive
          </Badge>
        );
      case "suspended":
        return (
          <Badge className="bg-red-600 text-white">
            <Ban className="h-3 w-3 mr-1" />
            Suspended
          </Badge>
        );
      default:
        return null;
    }
  };

  const getRoleBadge = (role: string) => {
    const roleColors = {
      admin: "bg-blue-600",
      business: "bg-green-600",
      user: "bg-gray-600",
    };
    return (
      <Badge className={`${roleColors[role as keyof typeof roleColors]} text-white`}>
        <Shield className="h-3 w-3 mr-1" />
        {role.charAt(0).toUpperCase() + role.slice(1)}
      </Badge>
    );
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.phone.includes(searchQuery);
    const matchesStatus = statusFilter === "all" || user.status === statusFilter;
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    return matchesSearch && matchesStatus && matchesRole;
  });

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <DashboardSidebar role="admin" />
      <main className="flex-1 overflow-x-hidden">
        <DashboardHeader
          title="User Management"
          subtitle="Manage all users on the platform"
        />

        <div className="p-6 space-y-6">
          {/* Header Actions */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">All Users</h2>
              <p className="text-sm text-gray-600 mt-1">
                {filteredUsers.length} user{filteredUsers.length !== 1 ? "s" : ""} found
              </p>
            </div>
            <Button
              onClick={handleCreate}
              className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create User
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
                    placeholder="Search users by name, email, or phone..."
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
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="suspended">Suspended</SelectItem>
                  </SelectContent>
                </Select>

                {/* Role Filter */}
                <Select value={roleFilter} onValueChange={setRoleFilter}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="All Roles" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="business">Business</SelectItem>
                    <SelectItem value="user">User</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Users Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUsers.map((user) => (
              <Card key={user.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  {/* Header with Photo */}
                  <div className="relative bg-gradient-to-br from-blue-400 to-green-400 p-6">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        {user.photoUrl ? (
                          <img
                            src={user.photoUrl}
                            alt={user.name}
                            className="h-16 w-16 rounded-full object-cover border-4 border-white shadow-lg"
                          />
                        ) : (
                          <div className="h-16 w-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-4 border-white shadow-lg">
                            <User className="h-8 w-8 text-white" />
                          </div>
                        )}
                        <div className="absolute -bottom-1 -right-1">
                          {getStatusBadge(user.status)}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-white mb-1">
                          {user.name}
                        </h3>
                        {getRoleBadge(user.role)}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 space-y-3">
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Mail className="h-4 w-4 text-gray-400" />
                        <span className="truncate">{user.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Phone className="h-4 w-4 text-gray-400" />
                        <span>{user.phone}</span>
                      </div>
                      {user.address && (
                        <div className="flex items-center gap-2 text-gray-600">
                          <span className="text-gray-400">📍</span>
                          <span className="truncate">{user.address}</span>
                        </div>
                      )}
                    </div>

                    {/* Stats */}
                    <div className="flex items-center gap-4 pt-3 border-t border-gray-200">
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <MessageSquare className="h-4 w-4 text-blue-600" />
                        <span className="font-medium">{user.reviewCount}</span>
                        <span className="text-gray-500">reviews</span>
                      </div>
                      <div className="text-xs text-gray-500">
                        Joined {new Date(user.joinedDate).toLocaleDateString()}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 pt-3 border-t border-gray-200">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => handleEdit(user)}
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        onClick={() => handleDelete(user.id)}
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
          {filteredUsers.length === 0 && (
            <Card>
              <CardContent className="py-12 text-center">
                <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No users found
                </h3>
                <p className="text-gray-600 mb-4">
                  {searchQuery || statusFilter !== "all" || roleFilter !== "all"
                    ? "Try adjusting your filters"
                    : "Get started by creating your first user"}
                </p>
                {(!searchQuery && statusFilter === "all" && roleFilter === "all") && (
                  <Button
                    onClick={handleCreate}
                    className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Create User
                  </Button>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      {/* User Form Sidebar */}
      <UserFormSidebar
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingUser(null);
        }}
        user={editingUser}
        onSave={handleSave}
      />
    </div>
  );
}

