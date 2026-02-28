"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SearchPageSearchBarProps {
  initialQuery?: string;
  initialLocation?: string;
}

const SearchPageSearchBar = ({ 
  initialQuery = "things to do, nail salons, plumbers",
  initialLocation = "Kathmandu"
}: SearchPageSearchBarProps) => {
  const [query, setQuery] = useState(initialQuery);
  const [location, setLocation] = useState(initialLocation);
  const router = useRouter();

  const handleSearch = () => {
    router.push(`/search?q=${encodeURIComponent(query)}&location=${encodeURIComponent(location)}`);
  };

  return (
    <div className="w-full bg-white/98 backdrop-blur-md shadow-xl border-b sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 py-4">
        {/* Search Bar */}
        <div className="bg-gray-100 rounded-xl shadow-lg p-2 flex flex-col sm:flex-row gap-2 border border-gray-200 mb-4">
          <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-white rounded-lg">
            <Search className="h-5 w-5 text-gray-400 shrink-0" />
            <Input
              type="text"
              placeholder="things to do, nail salons, plumbers"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-base p-0 h-auto placeholder:text-gray-500 bg-transparent"
            />
          </div>
          <div className="flex-1 sm:w-64 flex items-center gap-3 px-4 py-3 bg-white rounded-lg relative">
            <MapPin className="h-5 w-5 text-gray-400 shrink-0" />
            <Input
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-base p-0 h-auto placeholder:text-gray-500 bg-transparent pr-8 flex-1"
            />
            <ChevronDown className="h-4 w-4 text-gray-400 absolute right-4" />
          </div>
          <Button
            onClick={handleSearch}
            size="lg"
            className="bg-green-600 hover:bg-green-700 text-white px-6 sm:px-8 py-6 h-auto text-base font-semibold shadow-md shrink-0 rounded-lg"
          >
            <Search className="h-5 w-5 mr-2" />
            Search
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchPageSearchBar;

