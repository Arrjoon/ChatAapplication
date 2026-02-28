import React from "react";
import { Calendar } from "lucide-react";

interface Update {
  id: string;
  title: string;
  content: string;
  date?: string;
}

interface BusinessUpdatesProps {
  updates: Update[];
}

const BusinessUpdates = ({ updates }: BusinessUpdatesProps) => {
  if (updates.length === 0) return null;

  return (
    <div className="bg-white border-b border-gray-200 py-6">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Updates From This Business</h2>
        <div className="space-y-4">
          {updates.map((update) => (
            <div key={update.id} className="border-l-4 border-green-600 pl-4 py-2">
              <div className="flex items-center gap-2 mb-1">
                {update.date && (
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Calendar className="h-4 w-4" />
                    <span>{update.date}</span>
                  </div>
                )}
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">{update.title}</h3>
              <p className="text-gray-600 text-sm">{update.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BusinessUpdates;

