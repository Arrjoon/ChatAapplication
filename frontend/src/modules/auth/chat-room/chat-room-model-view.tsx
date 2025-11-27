"use client";

import { useState } from "react";

type UserType = {
  id: number;
  name: string;
};

interface ChatRoomModalViewProps {
  users: UserType[];
  isOpen: boolean;
  onClose: () => void;
}

export default function ChatRoomModalView({
  users,
  isOpen,
  onClose,
}: ChatRoomModalViewProps) {
  const [groupName, setGroupName] = useState("");
  const [groupImage, setGroupImage] = useState<File | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);

  if (!isOpen) return null;

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleUser = (userId: number) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSubmit = () => {
    console.log("Group Name:", groupName);
    console.log("Group Image:", groupImage);
    console.log("Selected Users:", selectedUsers);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-50">
      
      {/* MODAL CARD */}
      <div className="bg-white rounded-xl shadow-xl w-126 p-6 relative animate-scaleIn">
        
        {/* CLOSE BUTTON */}
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-lg"
          onClick={onClose}
        >
          ✕
        </button>

        {/* TITLE */}
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Create Group</h2>

        {/* GROUP NAME INPUT */}
        <input
          type="text"
          placeholder="Group Name"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          className="w-full border border-gray-300 mb-4 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
        />

        {/* IMAGE INPUT */}
        <input
          type="file"
          accept="image/*"
          className="w-full mb-4 text-sm"
          onChange={(e) => setGroupImage(e.target.files?.[0] ?? null)}
        />

        {/* SEARCH USERS */}
        <input
          type="text"
          placeholder="Search Users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full border border-gray-300 mb-4 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
        />

        {/* USERS LIST */}
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
                <span>{user.name}</span>
                {selectedUsers.includes(user.id) && (
                  <span className="text-blue-600">✓</span>
                )}
              </div>
            ))
          )}
        </div>

        {/* SUBMIT BUTTON */}
        <button
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg font-medium disabled:bg-gray-300 disabled:cursor-not-allowed"
          disabled={!groupName || selectedUsers.length === 0}
          onClick={handleSubmit}
        >
          Create Group
        </button>
      </div>
    </div>
  );
}
