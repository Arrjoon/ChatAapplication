"use client";

import React, { useState, useEffect } from "react";
import { Search, MapPin, ChevronDown, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Category {
  name: string;
  subcategories: string[];
}

const categories: Category[] = [
  {
    name: "Restaurants",
    subcategories: ["Fine Dining", "Casual Dining", "Fast Food", "Cafes", "Bars & Pubs", "Food Trucks"]
  },
  {
    name: "Shopping",
    subcategories: ["Fashion", "Electronics", "Home & Garden", "Books", "Sports", "Jewelry"]
  },
  {
    name: "Fitness & Sports",
    subcategories: ["Gyms", "Yoga Studios", "Swimming Pools", "Tennis Courts", "Basketball", "Running"]
  },
  {
    name: "Beauty & Wellness",
    subcategories: ["Hair Salons", "Spas", "Nail Salons", "Massage", "Skincare", "Makeup"]
  },
  {
    name: "Home Services",
    subcategories: ["Plumbing", "Electrical", "Cleaning", "Landscaping", "Painting", "Roofing"]
  },
  {
    name: "Automotive",
    subcategories: ["Car Repair", "Car Wash", "Auto Parts", "Tire Shops", "Oil Change", "Detailing"]
  },
  {
    name: "Entertainment",
    subcategories: ["Movies", "Concerts", "Theaters", "Museums", "Parks", "Events"]
  }
];

const StickySearchBar = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Mark as mounted on client side only
    setMounted(true);
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      // Only set sticky if scrolled past 400px (give plenty of room)
      setIsSticky(scrollPosition > 400);
    };
    
    // Wait for page to fully load before checking scroll
    const timeoutId = setTimeout(() => {
      handleScroll();
    }, 1000);
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleCategoryClick = (categoryName: string) => {
    setOpenDropdown(openDropdown === categoryName ? null : categoryName);
  };

  return (
    <>
      {/* Sticky Search Bar - Appears at top when scrolled (Hidden initially) */}
      <div
        className={`fixed left-0 right-0 z-40 transition-all duration-500 ${
          isSticky
            ? "top-[73px] translate-y-0 opacity-100 pointer-events-auto"
            : "-translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        <div className="bg-white/98 backdrop-blur-md shadow-xl border-b">
          <div className="mx-auto max-w-7xl px-4 py-3 sm:py-4">
            {/* Search Bar */}
            <div className="bg-gray-100 rounded-xl shadow-lg p-2 flex flex-col sm:flex-row gap-2 border border-gray-200 mb-4">
              <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-white rounded-lg">
                <Search className="h-5 w-5 text-gray-400 shrink-0" />
                <Input
                  type="text"
                  placeholder="things to do, nail salons, plumbers"
                  className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-base p-0 h-auto placeholder:text-gray-500 bg-transparent"
                />
              </div>
              <div className="flex-1 sm:w-64 flex items-center gap-3 px-4 py-3 bg-white rounded-lg relative">
                <MapPin className="h-5 w-5 text-gray-400 shrink-0" />
                <Input
                  type="text"
                  placeholder="Location"
                  defaultValue="Kathmandu"
                  className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-base p-0 h-auto placeholder:text-gray-500 bg-transparent pr-8 flex-1"
                />
                <ChevronDown className="h-4 w-4 text-gray-400 absolute right-4" />
              </div>
              <Button
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-white px-6 sm:px-8 py-6 h-auto text-base font-semibold shadow-md shrink-0 rounded-lg"
              >
                <Search className="h-5 w-5 mr-2" />
                Search
              </Button>
            </div>

            {/* Category Navigation with Dropdowns */}
            <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide pb-2">
              {categories.map((category) => (
                <div key={category.name} className="relative shrink-0">
                  <button
                    onClick={() => handleCategoryClick(category.name)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                      openDropdown === category.name
                        ? "bg-blue-50 text-blue-700"
                        : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                    }`}
                  >
                    {category.name}
                    <ChevronDown
                      className={`h-4 w-4 text-gray-500 transition-transform ${
                        openDropdown === category.name ? "rotate-180 text-blue-600" : ""
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
                            <h3 className="font-semibold text-gray-900 text-base">{category.name}</h3>
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
        </div>
      </div>

      {/* Initial Search Bar - In Hero Center (Always visible initially) */}
      <div 
        className={`relative z-50 w-full ${
          mounted && isSticky ? "hidden" : "block"
        }`}
      >
        <div className="w-full px-4">
          {/* Search Bar */}
          <div className="bg-gray-100 rounded-2xl shadow-lg p-2.5 sm:p-3 flex flex-col sm:flex-row gap-2 border border-gray-200">
            <div className="flex-1 flex items-center gap-3 px-4 py-3 sm:py-4 bg-white rounded-lg">
              <Search className="h-5 w-5 text-gray-400 shrink-0" />
              <Input
                type="text"
                placeholder="things to do, nail salons, plumbers"
                className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-base sm:text-lg p-0 h-auto placeholder:text-gray-500 bg-transparent"
              />
            </div>
            <div className="flex-1 sm:w-64 flex items-center gap-3 px-4 py-3 sm:py-4 bg-white rounded-lg relative">
              <MapPin className="h-5 w-5 text-gray-400 shrink-0" />
              <Input
                type="text"
                placeholder="Location"
                defaultValue="Kathmandu"
                className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-base sm:text-lg p-0 h-auto placeholder:text-gray-500 bg-transparent pr-8 flex-1"
              />
              <ChevronDown className="h-4 w-4 text-gray-400 absolute right-4" />
            </div>
            <Button
              size="lg"
              className="bg-green-600 hover:bg-green-700 text-white px-6 sm:px-8 py-6 sm:py-7 h-auto text-base sm:text-lg font-semibold shadow-md shrink-0 rounded-lg"
            >
              <Search className="h-5 w-5 mr-2" />
              Search
            </Button>
          </div>

          {/* Category Navigation Below Search */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-5 sm:mt-6">
            {categories.map((category) => (
              <div key={category.name} className="relative">
                <button
                  onClick={() => handleCategoryClick(category.name)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm sm:text-base font-medium transition-all ${
                    openDropdown === category.name
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  {category.name}
                  <ChevronDown
                    className={`h-4 w-4 text-gray-500 transition-transform ${
                      openDropdown === category.name ? "rotate-180 text-blue-600" : ""
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
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-72 sm:w-80 bg-white rounded-xl shadow-2xl border-2 border-blue-100 z-50 overflow-hidden">
                      <div className="p-3 sm:p-4">
                        <div className="flex items-center justify-between mb-3 px-2 py-1">
                          <h3 className="font-semibold text-gray-900 text-base sm:text-lg">{category.name}</h3>
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
      </div>
    </>
  );
};

export default StickySearchBar;

