import React, { useState } from "react";
import { Star, ThumbsUp, Heart, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Review {
  id: string;
  userName: string;
  userLocation?: string;
  userPhoto?: string;
  rating: number;
  date: string;
  content: string;
  photos?: string[];
  helpful?: number;
  thanks?: number;
  love?: number;
}

interface BusinessReviewsProps {
  reviews: Review[];
  totalReviews: number;
}

const BusinessReviews = ({ reviews, totalReviews }: BusinessReviewsProps) => {
  const [filterRating, setFilterRating] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const StarRating = ({ rating }: { rating: number }) => {
    return (
      <div className="flex items-center gap-1">
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
    );
  };

  const filteredReviews = reviews.filter((review) => {
    if (filterRating && review.rating !== filterRating) return false;
    if (searchQuery && !review.content.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="bg-white border-b border-gray-200 py-6">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Recommended Reviews
          </h2>
          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Search reviews"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Rating Filter */}
        <div className="flex items-center gap-2 mb-6 flex-wrap">
          <span className="text-sm text-gray-600">Filter by rating:</span>
          {[5, 4, 3, 2, 1].map((rating) => (
            <button
              key={rating}
              onClick={() => setFilterRating(filterRating === rating ? null : rating)}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                filterRating === rating
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {rating} star{rating > 1 ? "s" : ""}
            </button>
          ))}
        </div>

        {/* Reviews List */}
        <div className="space-y-6">
          {filteredReviews.map((review) => (
            <div key={review.id} className="border-b border-gray-100 pb-6 last:border-0">
              <div className="flex items-start gap-4">
                {/* User Avatar */}
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-green-400 flex items-center justify-center text-white font-semibold shrink-0">
                  {review.userName.charAt(0).toUpperCase()}
                </div>

                {/* Review Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-semibold text-gray-900">{review.userName}</span>
                    {review.userLocation && (
                      <span className="text-gray-500 text-sm">{review.userLocation}</span>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2 mb-2">
                    <StarRating rating={review.rating} />
                    <span className="text-gray-500 text-sm">{review.date}</span>
                  </div>

                  <p className="text-gray-700 mb-3 leading-relaxed">{review.content}</p>

                  {/* Review Photos */}
                  {review.photos && review.photos.length > 0 && (
                    <div className="flex gap-2 mb-3">
                      {review.photos.slice(0, 3).map((photo, idx) => (
                        <div
                          key={idx}
                          className="w-20 h-20 rounded-lg bg-gray-100 overflow-hidden"
                        >
                          <img
                            src={photo}
                            alt={`Review photo ${idx + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Review Actions */}
                  <div className="flex items-center gap-4">
                    <Button variant="ghost" size="sm" className="h-8 text-xs">
                      <ThumbsUp className="h-3 w-3 mr-1" />
                      Helpful {review.helpful || 0}
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 text-xs">
                      <MessageCircle className="h-3 w-3 mr-1" />
                      Thanks {review.thanks || 0}
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 text-xs">
                      <Heart className="h-3 w-3 mr-1" />
                      Love this {review.love || 0}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
            See all {totalReviews} reviews
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BusinessReviews;

