"use client";

import { useCreateGroupChat } from "@/hooks/chat-room/useCreateGroupChat";
import { useFetchUserList } from "@/hooks/user/useFetchUser";
import { CreateGroupChatFormData, createGroupChatSchema } from "@/modules/chat-group-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

interface ChatRoomModalViewProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ChatRoomModalView({
  isOpen,
  onClose,
}: ChatRoomModalViewProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const { mutate: createGroupChat } = useCreateGroupChat();
  const { data: users = [], isLoading, isError } = useFetchUserList();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors }, // Added to show validation errors
  } = useForm<CreateGroupChatFormData>({
    resolver: zodResolver(createGroupChatSchema),
  });

  if (!isOpen) return null;

  console.log(errors); 

  console.log("All Users:", users);
  console.log("selectedUsers:", selectedUsers);
  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  console.log("Filtered Users:", filteredUsers);
  const toggleUser = (userId: string) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const onSubmit = (formData: CreateGroupChatFormData) => {
    // Remove this alert in production
    console.log("Form Data:", formData);
    console.log("Selected Users:", selectedUsers);
    
    
    createGroupChat(
      {
        group_name: formData.name ?? "",
        picture: formData.picture ?? null,
        user_ids: selectedUsers,
        is_group: true,
      },
      {
        onSuccess: () => {
          onClose();
        },
        onError: (error) => {
          console.error("Failed to create group chat:", error);
          // You can add error handling UI here
        },
      }
    );
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-126 p-6 relative animate-scaleIn">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-lg"
          onClick={onClose}
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold mb-4 text-gray-800">Create Group</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Group Name Input with error display */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Group Name"
              {...register("name")}
              className={`w-full border ${
                errors.name ? "border-red-500" : "border-gray-300"
              } p-2.5 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none`}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Image Input */}
          <div className="mb-4">
            <Controller
              name="picture"
              control={control}
              render={({ field }) => (
                <input
                  type="file"
                  accept="image/*"
                  className="w-full text-sm"
                  onChange={(e) => field.onChange(e.target.files?.[0] ?? null)}
                />
              )}
            />
            {errors.picture && (
              <p className="text-red-500 text-sm mt-1">{errors.picture.message}</p>
            )}
          </div>

          {/* Search Users */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search Users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          {/* Users List */}
          <div className="max-h-56 overflow-y-auto border border-gray-200 rounded-lg mb-4">
            {filteredUsers.length === 0 ? (
              <p className="text-center text-gray-500 py-3">No users found</p>
            ) : (
              filteredUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => toggleUser(user.id)}
                >
                  <span>{user.username}</span>
                  {selectedUsers.includes(user.id) && (
                    <span className="text-blue-600">✓</span>
                  )}
                </div>
              ))
            )}
          </div>

          {/* Selected Users Count */}
          {selectedUsers.length > 0 && (
            <div className="mb-4 text-sm text-gray-600">
              Selected {selectedUsers.length} user{selectedUsers.length > 1 ? "s" : ""}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            disabled={selectedUsers.length === 0}
          >
            Create Group
          </button>
        </form>
      </div>
    </div>
  );
}