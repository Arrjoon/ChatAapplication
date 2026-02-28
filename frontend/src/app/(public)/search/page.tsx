"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import Footer from "@/components/layout/Footer";
import SearchPageSearchBar from "@/components/search/SearchPageSearchBar";
import FilterSidebar from "@/components/search/FilterSidebar";
import BusinessListingCard from "@/components/search/BusinessListingCard";
import MapSidebar from "@/components/search/MapSidebar";

// Mock data for Kathmandu restaurants
const mockBusinesses = [
  {
    id: 1,
    name: "Bottega",
    image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400&q=80",
    rating: 4.3,
    reviewCount: 1600,
    location: "Thamel • Rs. 2000-5000",
    priceRange: "Rs. 2000-5000",
    status: "Open until 11:00 PM",
    statusTime: "Closes in 2 hours",
    features: ["Outdoor seating", "Locally owned & operated"],
    waitTime: "11 - 26 mins",
    reviewSnippet: "The pasta here is absolutely amazing! Fresh ingredients and authentic Italian taste.",
    categories: ["Italian", "Pasta Shops", "Pizza"],
    actionButton: { label: "Order", variant: "default" as const },
    lat: 27.7172,
    lng: 85.3240,
  },
  {
    id: 2,
    name: "Fog Harbor Fish House",
    image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400&q=80",
    rating: 4.4,
    reviewCount: 12500,
    location: "Durbar Marg • Rs. 1000-2000",
    priceRange: "Rs. 1000-2000",
    status: "Closes in 9 min",
    features: ["Family-owned & operated", "Full bar"],
    waitlistInfo: "Waitlist opens at 11:00 am",
    reviewSnippet: "The food was good. Not 'blow my mind amazing' but good enough to compensate for everything else.",
    categories: ["Seafood", "Wine Bars", "Cocktail Bars"],
    actionButton: { label: "Reserve", variant: "default" as const },
    lat: 27.7200,
    lng: 85.3300,
  },
  {
    id: 3,
    name: "Bodega",
    image: "https://images.unsplash.com/photo-1552569973-610e8c050afb?w=400&q=80",
    rating: 4.3,
    reviewCount: 884,
    location: "Lazimpat • Rs. 500-1000",
    priceRange: "Rs. 500-1000",
    status: "Open now",
    features: ["Good for groups", "Wi-Fi"],
    categories: ["Nepali", "Indian", "Asian"],
    actionButton: { label: "Order", variant: "default" as const },
    lat: 27.7150,
    lng: 85.3200,
  },
  {
    id: 4,
    name: "Himalayan Java",
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&q=80",
    rating: 4.5,
    reviewCount: 2100,
    location: "Thamel • Rs. 500-1000",
    priceRange: "Rs. 500-1000",
    status: "Open until 10:00 PM",
    features: ["Wi-Fi", "Good for work"],
    categories: ["Cafe", "Coffee", "Breakfast"],
    actionButton: { label: "Order", variant: "default" as const },
    lat: 27.7180,
    lng: 85.3250,
  },
  {
    id: 5,
    name: "Newari Kitchen",
    image: "https://images.unsplash.com/photo-1552569973-610e8c050afb?w=400&q=80",
    rating: 4.6,
    reviewCount: 3200,
    location: "Patan • Rs. 1000-2000",
    priceRange: "Rs. 1000-2000",
    status: "Open now",
    features: ["Traditional", "Family-friendly"],
    reviewSnippet: "Authentic Newari cuisine! The momos and choila are to die for.",
    categories: ["Nepali", "Traditional", "Local"],
    actionButton: { label: "Reserve", variant: "default" as const },
    lat: 27.6800,
    lng: 85.3250,
  },
];

export default function SearchResultsPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "Restaurants";
  const location = searchParams.get("location") || "Kathmandu, Nepal";
  const [sortBy, setSortBy] = useState("recommended");

  return (
    <>
      <SearchPageSearchBar 
        initialQuery={query}
        initialLocation={location}
      />
      <div className="min-h-screen bg-gray-50">
        {/* Results Header Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-[1920px] px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Top 10 Best {query} Near {location}
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                All '{query.toLowerCase()}' results near me in {location} - {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="recommended">Recommended</option>
                <option value="rating">Highest Rated</option>
                <option value="reviews">Most Reviewed</option>
                <option value="distance">Distance</option>
              </select>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span className="font-medium">Sponsored Results</span>
            <span className="text-gray-400">ℹ️</span>
          </div>
        </div>
      </div>

      {/* Main Content - Three Column Layout */}
      <div className="flex">
        {/* Left Sidebar - Filters */}
        <FilterSidebar />

        {/* Center - Results */}
        <main className="flex-1 min-w-0 bg-white">
          <div className="divide-y divide-gray-200">
            {mockBusinesses.map((business) => (
              <BusinessListingCard
                key={business.id}
                {...business}
              />
            ))}
          </div>
        </main>

        {/* Right Sidebar - Map */}
        <MapSidebar
          locations={mockBusinesses.map((b) => ({
            id: b.id,
            name: b.name,
            lat: b.lat,
            lng: b.lng,
          }))}
        />
      </div>
      </div>
      <Footer />
    </>
  );
}

