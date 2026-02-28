"use client";

import React from "react";
import Link from "next/link";
import { Star, MapPin, Clock, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BusinessListingCardProps {
  id: number;
  name: string;
  image: string;
  rating: number;
  reviewCount: number;
  location: string;
  priceRange: string;
  status: string;
  statusTime?: string;
  features: string[];
  waitTime?: string;
  waitlistInfo?: string;
  reviewSnippet?: string;
  categories: string[];
  actionButton?: {
    label: string;
    variant?: "default" | "outline";
  };
}

const BusinessListingCard = ({
  name,
  image,
  rating,
  reviewCount,
  location,
  priceRange,
  status,
  statusTime,
  features,
  waitTime,
  waitlistInfo,
  reviewSnippet,
  categories,
  actionButton,
}: BusinessListingCardProps) => {
  const formatReviewCount = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    }
    return count.toString();
  };

  // Generate slug from name
  const slug = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

  return (
    <div className="bg-white border-b border-gray-200 p-6 hover:bg-gray-50 transition-colors">
      <div className="flex gap-4">
        {/* Image */}
        <Link href={`/listings/${slug}`} className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-lg overflow-hidden shrink-0">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover hover:scale-105 transition-transform"
          />
        </Link>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-start justify-between gap-4 mb-2">
            <div className="flex-1 min-w-0">
              <Link href={`/listings/${slug}`}>
                <h3 className="text-xl font-semibold text-gray-900 mb-1 hover:text-blue-600 cursor-pointer">
                  {name}
                </h3>
              </Link>
              <div className="flex items-center gap-2 flex-wrap">
                {/* Rating */}
                <div className="flex items-center gap-1">
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-4 w-4 ${
                          star <= rating
                            ? "fill-blue-600 text-blue-600"
                            : "fill-gray-300 text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium text-gray-700 ml-1">
                    {rating}
                  </span>
                  <span className="text-sm text-gray-500">
                    ({formatReviewCount(reviewCount)} reviews)
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Location and Price */}
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
            <MapPin className="h-4 w-4" />
            <span>{location}</span>
            <span className="text-green-600 font-semibold">•</span>
            <span className="text-green-600 font-semibold">{priceRange}</span>
          </div>

          {/* Status */}
          <div className="flex items-center gap-2 text-sm mb-2">
            <Clock className="h-4 w-4 text-gray-500" />
            <span className="text-gray-700">
              {status} {statusTime && <span className="text-gray-500">({statusTime})</span>}
            </span>
          </div>

          {/* Features */}
          <div className="flex flex-wrap items-center gap-2 mb-2">
            {features.map((feature, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1 text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded"
              >
                <CheckCircle2 className="h-3 w-3 text-green-600" />
                {feature}
              </span>
            ))}
          </div>

          {/* Wait Time / Waitlist */}
          {(waitTime || waitlistInfo) && (
            <div className="text-sm text-blue-600 font-medium mb-2">
              {waitTime && <span>Live wait time: {waitTime}</span>}
              {waitlistInfo && <span>{waitlistInfo}</span>}
            </div>
          )}

          {/* Review Snippet */}
          {reviewSnippet && (
            <p className="text-sm text-gray-600 mb-2 line-clamp-2">
              "{reviewSnippet}"
            </p>
          )}

          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-3">
            {categories.map((category, idx) => (
              <span
                key={idx}
                className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded"
              >
                {category}
              </span>
            ))}
          </div>

          {/* Action Button */}
          {actionButton && (
            <Button
              variant={actionButton.variant || "default"}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              {actionButton.label}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BusinessListingCard;

