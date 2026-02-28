import React from "react";
import { CheckCircle2 } from "lucide-react";

interface BusinessHighlightsProps {
  highlights: string[];
}

const BusinessHighlights = ({ highlights }: BusinessHighlightsProps) => {
  return (
    <div className="bg-white border-b border-gray-200 py-6">
      <div className="mx-auto max-w-7xl px-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Highlights from the Business</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {highlights.map((highlight, idx) => (
            <div key={idx} className="flex items-center gap-2 text-gray-700">
              <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0" />
              <span className="text-sm">{highlight}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BusinessHighlights;

