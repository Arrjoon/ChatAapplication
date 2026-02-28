"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FilterSidebarProps {
  onFilterChange?: (filters: any) => void;
}

const FilterSidebar = ({ onFilterChange }: FilterSidebarProps) => {
  const [openSections, setOpenSections] = useState<string[]>(['price', 'suggested']);
  const [selectedPrice, setSelectedPrice] = useState<string[]>([]);
  const [selectedSuggested, setSelectedSuggested] = useState<string[]>([]);
  const [selectedDietary, setSelectedDietary] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);

  const toggleSection = (section: string) => {
    setOpenSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const togglePrice = (price: string) => {
    setSelectedPrice(prev => 
      prev.includes(price) 
        ? prev.filter(p => p !== price)
        : [...prev, price]
    );
  };

  const toggleFilter = (filter: string, state: string[], setState: (filters: string[]) => void) => {
    setState(
      state.includes(filter)
        ? state.filter(f => f !== filter)
        : [...state, filter]
    );
  };

  const priceRanges = ["Rs. 500-1000", "Rs. 1000-2000", "Rs. 2000-5000", "Rs. 5000+"];
  const suggestedOptions = [
    "Open Now",
    "Reservations",
    "Offers Online Waitlist",
    "Offers Delivery",
    "Offers Takeout",
    "Good for Dinner",
    "Good for Lunch",
    "Good for Breakfast"
  ];
  const dietaryOptions = ["Halal", "Vegan", "Vegetarian", "Kosher", "Gluten-Free"];
  const categoryOptions = [
    "New American", "Italian", "French", "Restaurants", "American", 
    "Steakhouses", "Nepali", "Indian", "Chinese", "Japanese"
  ];
  const featureOptions = [
    "Outdoor Seating", "Good for Lunch", "Good for Kids", 
    "Good for Groups", "Full Bar", "Wi-Fi", "Parking Available"
  ];

  return (
    <aside className="w-full md:w-64 lg:w-72 bg-white border-r border-gray-200 h-[calc(100vh-73px)] overflow-y-auto sticky top-0">
      <div className="p-4 space-y-6">
        {/* Price Filter */}
        <div>
          <button
            onClick={() => toggleSection('price')}
            className="flex items-center justify-between w-full text-lg font-semibold text-gray-900 mb-3"
          >
            <span>Price</span>
            {openSections.includes('price') ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </button>
          {openSections.includes('price') && (
            <div className="flex flex-wrap gap-2">
              {priceRanges.map((price) => (
                <button
                  key={price}
                  onClick={() => togglePrice(price)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedPrice.includes(price)
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {price}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Suggested Filter */}
        <div>
          <button
            onClick={() => toggleSection('suggested')}
            className="flex items-center justify-between w-full text-lg font-semibold text-gray-900 mb-3"
          >
            <span>Suggested</span>
            {openSections.includes('suggested') ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </button>
          {openSections.includes('suggested') && (
            <div className="space-y-2">
              {suggestedOptions.map((option) => (
                <label key={option} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedSuggested.includes(option)}
                    onChange={() => toggleFilter(option, selectedSuggested, setSelectedSuggested)}
                    className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{option}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Dietary Restrictions */}
        <div>
          <button
            onClick={() => toggleSection('dietary')}
            className="flex items-center justify-between w-full text-lg font-semibold text-gray-900 mb-3"
          >
            <span>Dietary Restrictions</span>
            {openSections.includes('dietary') ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </button>
          {openSections.includes('dietary') && (
            <div className="flex flex-wrap gap-2">
              {dietaryOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => toggleFilter(option, selectedDietary, setSelectedDietary)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    selectedDietary.includes(option)
                      ? "bg-green-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Category */}
        <div>
          <button
            onClick={() => toggleSection('category')}
            className="flex items-center justify-between w-full text-lg font-semibold text-gray-900 mb-3"
          >
            <span>Category</span>
            {openSections.includes('category') ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </button>
          {openSections.includes('category') && (
            <div className="space-y-2">
              {categoryOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => toggleFilter(option, selectedCategory, setSelectedCategory)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                    selectedCategory.includes(option)
                      ? "bg-blue-50 text-blue-700 font-medium"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {option}
                </button>
              ))}
              <button className="text-sm text-blue-600 hover:text-blue-700 font-medium mt-2">
                See all
              </button>
            </div>
          )}
        </div>

        {/* Features */}
        <div>
          <button
            onClick={() => toggleSection('features')}
            className="flex items-center justify-between w-full text-lg font-semibold text-gray-900 mb-3"
          >
            <span>Features</span>
            {openSections.includes('features') ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </button>
          {openSections.includes('features') && (
            <div className="space-y-2">
              {featureOptions.map((option) => (
                <label key={option} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedFeatures.includes(option)}
                    onChange={() => toggleFilter(option, selectedFeatures, setSelectedFeatures)}
                    className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{option}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default FilterSidebar;

