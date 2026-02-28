"use client";

import React from "react";
import { useParams } from "next/navigation";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/Footer";
import BusinessHeader from "@/components/business/BusinessHeader";
import BusinessUpdates from "@/components/business/BusinessUpdates";
import PopularDishes from "@/components/business/PopularDishes";
import BusinessHighlights from "@/components/business/BusinessHighlights";
import LocationHours from "@/components/business/LocationHours";
import BusinessReviews from "@/components/business/BusinessReviews";

// Mock data - In production, fetch from API based on slug
const mockBusinessData = {
  slug: "sisterita-kathmandu",
  name: "Sisterita",
  rating: 4.5,
  reviewCount: 1002,
  priceRange: "Rs. 1000-2000",
  categories: ["Breakfast & Brunch", "New American", "Thai"],
  status: "Closed",
  statusHours: "8:00 AM - 2:00 PM",
  address: "Thamel, Kathmandu 44600",
  neighborhood: "Thamel",
  phone: "+977 1-4412345",
  website: "sisterita.com",
  photoCount: 2142,
  isClaimed: true,
  updates: [
    {
      id: "1",
      title: "Join us on Mother's Day!!",
      content: "Enjoy our breakfast and Lunch from 8 am to 2.30pm… read more",
      date: "May 10, 2025",
    },
    {
      id: "2",
      title: "We're open on St. Patrick's Day",
      content: "We'll be here from 8 am to 2.30 pm on Mar 17. If… read more",
    },
  ],
  popularDishes: [
    { id: "1", name: "Voilà French Toast Brioche", price: "Rs. 1,650", photoCount: 225, reviewCount: 281 },
    { id: "2", name: "Grilled Cheese & French Onion Soup", price: "Rs. 1,650", photoCount: 77, reviewCount: 80 },
    { id: "3", name: "Waffle and Fried Chicken", price: "Rs. 1,650", photoCount: 81, reviewCount: 57 },
    { id: "4", name: "Alcatraz Escape", price: "Rs. 1,950", photoCount: 52, reviewCount: 38 },
    { id: "5", name: "Emerald", price: "Rs. 1,800", photoCount: 46, reviewCount: 40 },
    { id: "6", name: "Tartine Avocado Toast", price: "Rs. 1,275", photoCount: 32, reviewCount: 34 },
  ],
  highlights: [
    "Locally sourced ingredients",
    "Casual dining",
    "Takes reservations",
    "Catering service",
    "Large group friendly",
    "Discounts available",
    "Outdoor seating",
    "Wi-Fi available",
  ],
  businessHours: [
    { day: "Mon", hours: "8:00 AM - 2:00 PM" },
    { day: "Tue", hours: "8:00 AM - 2:00 PM" },
    { day: "Wed", hours: "8:00 AM - 2:00 PM" },
    { day: "Thu", hours: "8:00 AM - 2:00 PM" },
    { day: "Fri", hours: "8:00 AM - 2:00 PM", isToday: true, isClosed: true },
    { day: "Sat", hours: "8:00 AM - 2:30 PM" },
    { day: "Sun", hours: "8:00 AM - 2:30 PM" },
  ],
  reviews: [
    {
      id: "1",
      userName: "Jan",
      userLocation: "Kathmandu, Nepal",
      rating: 5,
      date: "Dec 28, 2025",
      content: "Loved our experience at Sisterita in Kathmandu. This place is a hidden gem! Very cool and cozy atmosphere, staff was genuinely warm and welcoming. The food was fantastic, and the French toast was hands down the highlight. Can't wait to come back!",
      photos: [
        "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=200&q=80",
      ],
      helpful: 0,
      thanks: 1,
      love: 1,
    },
    {
      id: "2",
      userName: "Fatima H.",
      userLocation: "Kathmandu, Nepal",
      rating: 5,
      date: "Dec 21, 2025",
      content: "I really enjoyed with my family in the restaurant. The food amazing and service absolutely good. The ambiance is great. I will come again and again to enjoy.",
      helpful: 0,
      thanks: 1,
      love: 1,
    },
    {
      id: "3",
      userName: "Cendi Z.",
      userLocation: "Kathmandu, Nepal",
      rating: 5,
      date: "Jan 9, 2026",
      content: "I went during New Year's week, and they still had their Christmas decorations up--so cute! The restaurant gives major Paris vibes, and we loved the aesthetics. I definitely recommend making a reservation because there was a line to get in. The food was amazing, especially their matcha!",
      photos: [
        "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=200&q=80",
        "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=200&q=80",
      ],
      helpful: 1,
      thanks: 0,
      love: 1,
    },
  ],
};

export default function BusinessDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  // In production, fetch business data based on slug
  const business = mockBusinessData;

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        <BusinessHeader
          name={business.name}
          rating={business.rating}
          reviewCount={business.reviewCount}
          priceRange={business.priceRange}
          categories={business.categories}
          status={business.status}
          hours={business.statusHours}
          address={business.address}
          photoCount={business.photoCount}
          isClaimed={business.isClaimed}
        />

        <BusinessUpdates updates={business.updates} />

        <PopularDishes dishes={business.popularDishes} />

        <BusinessHighlights highlights={business.highlights} />

        <LocationHours
          address={business.address}
          neighborhood={business.neighborhood}
          hours={business.businessHours}
          phone={business.phone}
          website={business.website}
        />

        <div className="bg-white border-b border-gray-200 py-6">
          <div className="mx-auto max-w-7xl px-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">About the Business</h3>
            <p className="text-gray-700 leading-relaxed">
              Best Breakfast & Brunch & Lunch Experience in Town. We serve authentic fusion cuisine
              combining New American and Thai flavors. Our locally sourced ingredients and warm
              atmosphere make us a favorite spot in Thamel. Come experience the best brunch in
              Kathmandu!
            </p>
          </div>
        </div>

        <BusinessReviews reviews={business.reviews} totalReviews={business.reviewCount} />
      </div>
      <Footer />
    </>
  );
}

