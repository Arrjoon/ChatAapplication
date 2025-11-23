"use client";

import { X, Upload, User } from "lucide-react";

export const ChatGroupModal = ({ open, onClose, addPeople }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="sm:max-w-xl w-full max-h-[90vh] mx-4 flex flex-col bg-white rounded-2xl shadow-xl border border-gray-200">

        {/* Header */}
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800">
            {addPeople ? "Add Members to Group" : "Create Chat Group"}
          </h2>
          <button className="p-2 rounded-full hover:bg-gray-100">
            <X className="h-4 w-4 text-gray-500" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 flex flex-col gap-6 p-6 overflow-auto">

          {/* Group Name */}
          {!addPeople && (
            <div>
              <label className="font-medium text-gray-700 mb-2 block">Group Name *</label>
              <input
                type="text"
                placeholder="Enter a group name..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          )}

          {/* Group Picture */}
          {!addPeople && (
            <div>
              <label className="font-medium text-gray-700 mb-2 block">Group Picture</label>
              <div className="w-full h-32 flex items-center justify-center border-2 border-dashed rounded-xl cursor-pointer hover:border-blue-400 bg-gray-50">
                <div className="flex flex-col items-center justify-center text-gray-400">
                  <Upload className="h-8 w-8 mb-1" />
                  <span className="text-sm">Upload Image</span>
                </div>
              </div>
            </div>
          )}

          {/* Member Selection */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="font-medium text-gray-700">
                {addPeople ? "Select Members to Add" : "Select Members"}
              </label>
              <span className="text-sm text-gray-500">2 selected</span>
            </div>
            <input
              type="text"
              placeholder="Search members..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <div className="h-64 overflow-auto border rounded-lg border-gray-200 bg-white mt-2">
              <div className="p-2 space-y-2">
                {/* Example static members */}
                {["John Doe", "Sarah Wilson", "Mike Johnson", "Design Team", "Marketing Group"].map((name, idx) => (
                  <div key={idx} className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4" />
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-sm font-medium text-blue-600">
                        {name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()}
                      </div>
                      <p className="text-sm font-medium text-gray-800 truncate">{name}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end space-x-2 pt-4">
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100">Cancel</button>
            <button className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">
              {addPeople ? "Add Members" : "Create Group"}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
