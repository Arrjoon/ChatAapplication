"use client";

import React, { useState } from "react";
import { Maximize2, Plus, Minus, MapPin } from "lucide-react";

interface MapSidebarProps {
  locations?: Array<{
    id: number;
    name: string;
    lat: number;
    lng: number;
  }>;
}

const MapSidebar = ({ locations = [] }: MapSidebarProps) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [searchAsMapMoves, setSearchAsMapMoves] = useState(false);

  // Mock map data for Kathmandu
  const kathmanduCenter = { lat: 27.7172, lng: 85.3240 };

  return (
    <aside className="w-full lg:w-96 bg-white border-l border-gray-200 h-[calc(100vh-73px)] sticky top-0">
      <div className="relative h-full">
        {/* Map Container */}
        <div className="relative w-full h-full bg-gray-100">
          {/* Placeholder Map - In production, use Google Maps or Mapbox */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="h-16 w-16 text-blue-600 mx-auto mb-4" />
              <p className="text-gray-600 font-medium">Kathmandu Map</p>
              <p className="text-sm text-gray-500 mt-2">
                {locations.length} locations shown
              </p>
            </div>
          </div>

          {/* Map Controls */}
          <div className="absolute top-4 right-4 space-y-2">
            {/* Search as map moves checkbox */}
            <div className="bg-white rounded-lg shadow-lg p-2">
              <label className="flex items-center gap-2 text-xs text-gray-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={searchAsMapMoves}
                  onChange={(e) => setSearchAsMapMoves(e.target.checked)}
                  className="w-3 h-3 text-blue-600 rounded border-gray-300"
                />
                <span>Search as map moves</span>
              </label>
            </div>

            {/* Zoom Controls */}
            <div className="bg-white rounded-lg shadow-lg flex flex-col">
              <button
                className="p-2 hover:bg-gray-100 transition-colors border-b border-gray-200"
                aria-label="Zoom in"
              >
                <Plus className="h-4 w-4 text-gray-700" />
              </button>
              <button
                className="p-2 hover:bg-gray-100 transition-colors"
                aria-label="Zoom out"
              >
                <Minus className="h-4 w-4 text-gray-700" />
              </button>
            </div>

            {/* Fullscreen */}
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="bg-white rounded-lg shadow-lg p-2 hover:bg-gray-100 transition-colors"
              aria-label="Fullscreen"
            >
              <Maximize2 className="h-4 w-4 text-gray-700" />
            </button>
          </div>

          {/* Location Pins */}
          {locations.map((location, idx) => (
            <div
              key={location.id}
              className="absolute"
              style={{
                left: `${20 + (idx * 15) % 60}%`,
                top: `${30 + (idx * 10) % 40}%`,
              }}
            >
              <div className="relative">
                <div className="w-8 h-8 bg-green-600 rounded-full border-2 border-white shadow-lg flex items-center justify-center text-white font-bold text-xs">
                  {idx + 1}
                </div>
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-green-600"></div>
              </div>
            </div>
          ))}

          {/* Map Footer */}
          <div className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm border-t border-gray-200 p-2">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <div className="flex items-center gap-4">
                <button className="hover:text-gray-700">Keyboard shortcuts</button>
                <span>Map Data ©2026</span>
              </div>
              <div className="flex items-center gap-4">
                <button className="hover:text-gray-700">Terms</button>
                <button className="hover:text-gray-700">Report a map error</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default MapSidebar;

