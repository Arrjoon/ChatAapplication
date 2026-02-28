"use client";

import React, { useState } from "react";
import { MapPin, Clock, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Hours {
  day: string;
  hours: string;
  isToday?: boolean;
  isClosed?: boolean;
}

interface LocationHoursProps {
  address: string;
  neighborhood?: string;
  hours: Hours[];
  phone?: string;
  website?: string;
}

const LocationHours = ({ address, neighborhood, hours, phone, website }: LocationHoursProps) => {
  const [showAllHours, setShowAllHours] = useState(false);

  return (
    <div className="bg-white border-b border-gray-200 py-6">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Location & Hours</h3>
          <Button variant="ghost" size="sm" className="text-gray-600">
            <Edit className="h-4 w-4 mr-1" />
            Suggest an edit
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Location */}
          <div>
            <div className="flex items-start gap-2 mb-2">
              <MapPin className="h-5 w-5 text-gray-500 mt-0.5" />
              <div>
                <p className="text-gray-900 font-medium">{address}</p>
                {neighborhood && (
                  <p className="text-gray-600 text-sm">{neighborhood}</p>
                )}
              </div>
            </div>
            {phone && (
              <p className="text-gray-600 text-sm mb-2">{phone}</p>
            )}
            {website && (
              <a href={website} className="text-blue-600 hover:text-blue-700 text-sm">
                {website}
              </a>
            )}
            <div className="mt-4 h-48 bg-gray-100 rounded-lg flex items-center justify-center">
              <span className="text-gray-400">Map View</span>
            </div>
            <Button className="mt-3 bg-green-600 hover:bg-green-700 text-white">
              Get Directions
            </Button>
          </div>

          {/* Hours */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Clock className="h-5 w-5 text-gray-500" />
              <span className="font-medium text-gray-900">Hours</span>
            </div>
            <div className="space-y-1">
              {(showAllHours ? hours : hours.slice(0, 3)).map((day, idx) => (
                <div
                  key={idx}
                  className={`flex justify-between text-sm ${
                    day.isToday ? "font-semibold text-gray-900" : "text-gray-600"
                  }`}
                >
                  <span>{day.day}</span>
                  <span className={day.isClosed ? "text-red-600" : ""}>
                    {day.hours}
                  </span>
                </div>
              ))}
              {hours.length > 3 && (
                <button
                  onClick={() => setShowAllHours(!showAllHours)}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium mt-2"
                >
                  {showAllHours ? "Show less" : "See all hours"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationHours;

