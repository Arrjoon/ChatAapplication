"use client";

import { X, Upload } from "lucide-react";

export const GroupInfoModal = ({ open }: { open: boolean }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="font-semibold text-lg">Group Info</div>
          <button>
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-medium">Group Name</label>
          <input type="text" placeholder="Enter group name" className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-medium">Group Picture</label>
          <div className="w-full h-32 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer bg-gray-50">
            <Upload className="h-6 w-6 text-gray-400" />
          </div>
        </div>

        <div className="flex justify-end space-x-2">
          <button className="px-4 py-2 border rounded-lg">Cancel</button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">Save</button>
        </div>
      </div>
    </div>
  );
};
