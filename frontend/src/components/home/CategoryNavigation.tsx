"use client";

import React, { useState } from "react";
import { ChevronDown, X } from "lucide-react";

interface Category {
  name: string;
  subcategories: string[];
  icon?: string;
}

const categories: Category[] = [
  {
    name: "Restaurants",
    subcategories: ["Fine Dining", "Casual Dining", "Fast Food", "Cafes", "Bars & Pubs", "Food Trucks"],
    icon: "🍽️"
  },
  {
    name: "Shopping",
    subcategories: ["Fashion", "Electronics", "Home & Garden", "Books", "Sports", "Jewelry"],
    icon: "🛍️"
  },
  {
    name: "Fitness & Sports",
    subcategories: ["Gyms", "Yoga Studios", "Swimming Pools", "Tennis Courts", "Basketball", "Running"],
    icon: "💪"
  },
  {
    name: "Beauty & Wellness",
    subcategories: ["Hair Salons", "Spas", "Nail Salons", "Massage", "Skincare", "Makeup"],
    icon: "💅"
  },
  {
    name: "Home Services",
    subcategories: ["Plumbing", "Electrical", "Cleaning", "Landscaping", "Painting", "Roofing"],
    icon: "🏠"
  },
  {
    name: "Automotive",
    subcategories: ["Car Repair", "Car Wash", "Auto Parts", "Tire Shops", "Oil Change", "Detailing"],
    icon: "🚗"
  },
  {
    name: "Entertainment",
    subcategories: ["Movies", "Concerts", "Theaters", "Museums", "Parks", "Events"],
    icon: "🎬"
  },
  {
    name: "More",
    subcategories: ["Education", "Healthcare", "Real Estate", "Legal", "Financial", "Travel"],
    icon: "➕"
  }
];

const CategoryNavigation = () => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const handleCategoryClick = (categoryName: string) => {
    setOpenDropdown(openDropdown === categoryName ? null : categoryName);
  };

  return (
    <nav className="w-full border-b bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide py-3">
          {categories.map((category) => (
            <div key={category.name} className="relative shrink-0">
              <button
                onClick={() => handleCategoryClick(category.name)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                  openDropdown === category.name
                    ? "bg-blue-50 text-blue-700 border-2 border-blue-200"
                    : "text-gray-700 hover:bg-gray-100 border-2 border-transparent"
                }`}
              >
                {category.icon && <span className="text-lg">{category.icon}</span>}
                {category.name}
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${
                    openDropdown === category.name ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown Menu */}
              {openDropdown === category.name && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setOpenDropdown(null)}
                  />
                  <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-xl shadow-2xl border-2 border-blue-100 z-50 overflow-hidden">
                    <div className="p-3">
                      <div className="flex items-center justify-between mb-3 px-2 py-1">
                        <h3 className="font-semibold text-gray-900 text-base flex items-center gap-2">
                          {category.icon && <span>{category.icon}</span>}
                          {category.name}
                        </h3>
                        <button
                          onClick={() => setOpenDropdown(null)}
                          className="p-1 hover:bg-gray-100 rounded transition-colors"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {category.subcategories.map((subcat) => (
                          <a
                            key={subcat}
                            href="#"
                            className="px-3 py-2.5 rounded-lg hover:bg-blue-50 hover:text-blue-700 text-sm text-gray-700 transition-colors text-center border border-transparent hover:border-blue-200"
                            onClick={() => setOpenDropdown(null)}
                          >
                            {subcat}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default CategoryNavigation;
