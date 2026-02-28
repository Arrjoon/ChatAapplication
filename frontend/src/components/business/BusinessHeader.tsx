import React from "react";
import { Star, MapPin, Clock, Camera, Share2, Bookmark, UserPlus, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BusinessHeaderProps {
  name: string;
  rating: number;
  reviewCount: number;
  priceRange: string;
  categories: string[];
  status: string;
  hours: string;
  address: string;
  photoCount?: number;
  isClaimed?: boolean;
}

const BusinessHeader = ({
  name,
  rating,
  reviewCount,
  priceRange,
  categories,
  status,
  hours,
  address,
  photoCount = 0,
  isClaimed = false,
}: BusinessHeaderProps) => {
  const formatReviewCount = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    }
    return count.toString();
  };

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="mx-auto max-w-7xl px-4 py-6">
        {/* Business Name and Rating */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-4xl font-bold text-gray-900">{name}</h1>
              {isClaimed && (
                <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full">
                  Claimed
                </span>
              )}
            </div>
            
            {/* Rating and Info */}
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-5 w-5 ${
                        star <= rating
                          ? "fill-blue-600 text-blue-600"
                          : "fill-gray-300 text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-lg font-semibold text-gray-900">{rating}</span>
                <span className="text-gray-600">
                  ({formatReviewCount(reviewCount)} reviews)
                </span>
              </div>
              
              <span className="text-green-600 font-semibold">{priceRange}</span>
              
              <div className="flex flex-wrap gap-2">
                {categories.map((cat, idx) => (
                  <span key={idx} className="text-gray-600">
                    {cat}{idx < categories.length - 1 && ","}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Status and Hours */}
        <div className="flex items-center gap-6 mb-4 text-sm">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-gray-500" />
            <span className={status.includes("Closed") ? "text-red-600" : "text-green-600"}>
              {status}
            </span>
            {hours && <span className="text-gray-500">({hours})</span>}
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-gray-500" />
            <span className="text-gray-600">{address}</span>
          </div>
          {photoCount > 0 && (
            <div className="flex items-center gap-2">
              <Camera className="h-4 w-4 text-gray-500" />
              <span className="text-gray-600">See all {photoCount} photos</span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 flex-wrap">
          <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
            Write a review
          </Button>
          <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50">
            <Camera className="h-4 w-4 mr-2" />
            Add photos/videos
          </Button>
          <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50">
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
          <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50">
            <Bookmark className="h-4 w-4 mr-2" />
            Save
          </Button>
          <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50">
            <UserPlus className="h-4 w-4 mr-2" />
            Follow
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BusinessHeader;

