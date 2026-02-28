import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star, ThumbsUp, Lightbulb, Heart, MessageCircle, Hand, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ActivityCard {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  action: string;
  timestamp: string;
  business?: {
    name: string;
    rating: number;
    reviewCount: number;
    priceRange: string;
    categories: string[];
    images?: string[];
  };
  review?: {
    rating: number;
    text: string;
  };
  image?: string;
}

const mockActivities: ActivityCard[] = [
  {
    id: "1",
    user: { name: "Hendra T.", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Hendra" },
    action: "added 7 photos",
    timestamp: "Just now",
    business: {
      name: "Popoca Oakland",
      rating: 4,
      reviewCount: 217,
      priceRange: "$$$",
      categories: ["Salvadoran", "Bars"],
      images: [
        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80",
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80"
      ]
    }
  },
  {
    id: "2",
    user: { name: "Hendra T.", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Hendra" },
    action: "wrote a review",
    timestamp: "1 minute ago",
    business: {
      name: "Popoca Oakland",
      rating: 5,
      reviewCount: 217,
      priceRange: "$$$",
      categories: ["Salvadoran", "Bars"]
    },
    review: {
      rating: 5,
      text: "Popoca is a great restaurant and absolutely worth visiting. The pupusas are excellent and clearly... Read more"
    },
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=80"
  },
  {
    id: "3",
    user: { name: "Abi H.", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Abi" },
    action: "added a photo",
    timestamp: "5 minutes ago",
    business: {
      name: "Tang Jip",
      rating: 4,
      reviewCount: 61,
      priceRange: "$$",
      categories: ["Korean", "Barbeque", "Soup"]
    },
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&q=80"
  },
  {
    id: "4",
    user: { name: "Chandra R.", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Chandra" },
    action: "added a photo",
    timestamp: "6 minutes ago",
    business: {
      name: "Udon Mugizo - San Francisco",
      rating: 4,
      reviewCount: 2207,
      priceRange: "$$",
      categories: ["Japanese", "Noodles", "Soup"]
    },
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&q=80"
  },
  {
    id: "5",
    user: { name: "Ernesto U.", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ernesto" },
    action: "added 2 photos",
    timestamp: "6 minutes ago",
    business: {
      name: "Mountain Mike's Pizza",
      rating: 3,
      reviewCount: 96,
      priceRange: "$$",
      categories: ["Pizza", "Chicken Wings"],
      images: [
        "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&q=80",
        "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&q=80"
      ]
    }
  },
  {
    id: "6",
    user: { name: "Adrian M.", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Adrian" },
    action: "added 6 photos",
    timestamp: "8 minutes ago",
    business: {
      name: "The Progress",
      rating: 4,
      reviewCount: 1315,
      priceRange: "$$$$",
      categories: ["New American", "Cocktail Bars"],
      images: [
        "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&q=80",
        "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&q=80"
      ]
    }
  }
];

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

const RecentActivity = () => {
  return (
    <section className="w-full bg-white py-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Recent Activity
          </h2>
          <p className="text-gray-600 text-lg">
            See what's happening in your community
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockActivities.map((activity) => (
            <Card key={activity.id} className="overflow-hidden hover:shadow-xl transition-all hover:scale-[1.02] border-2 hover:border-blue-200">
              <CardContent className="p-0">
                {/* User Info */}
                <div className="flex items-center gap-3 p-4 pb-3 bg-gradient-to-r from-blue-50/50 to-transparent">
                  <div className="relative">
                    <img
                      src={activity.user.avatar}
                      alt={activity.user.name}
                      className="h-12 w-12 rounded-full border-2 border-blue-200"
                    />
                    <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-green-500 rounded-full border-2 border-white"></div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900">
                      {activity.user.name} <span className="font-normal text-gray-600">{activity.action}</span>
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">{activity.timestamp}</p>
                  </div>
                </div>

                {/* Business Info */}
                {activity.business && (
                  <div className="px-4 pb-3">
                    <h3 className="font-bold text-gray-900 mb-2 text-base">
                      {activity.business.name}
                    </h3>
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <StarRating rating={activity.business.rating} />
                      <span className="text-xs text-gray-600">
                        {activity.business.reviewCount} reviews
                      </span>
                      <span className="text-xs text-green-600 font-semibold bg-green-50 px-2 py-0.5 rounded">
                        {activity.business.priceRange}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {activity.business.categories.map((cat, idx) => (
                        <span key={idx} className="text-xs text-gray-600 bg-gray-100 px-2 py-0.5 rounded-full">
                          {cat}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Images */}
                {activity.image && (
                  <div className="relative w-full h-56 bg-gray-200 group">
                    <img
                      src={activity.image}
                      alt={activity.business?.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="absolute bottom-3 right-3">
                      <Button size="icon-sm" variant="secondary" className="h-9 w-9 rounded-full bg-white/90 hover:bg-white shadow-lg">
                        <ThumbsUp className="h-4 w-4 text-green-600" />
                      </Button>
                    </div>
                  </div>
                )}

                {activity.business?.images && (
                  <div className="grid grid-cols-2 gap-2 px-4 pb-4">
                    {activity.business.images.map((img, idx) => (
                      <div key={idx} className="relative aspect-square bg-gray-200 rounded-lg overflow-hidden group">
                        <img
                          src={img}
                          alt={`${activity.business?.name} ${idx + 1}`}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className="absolute bottom-2 right-2">
                          <Button size="icon-sm" variant="secondary" className="h-7 w-7 rounded-full bg-white/90 hover:bg-white shadow-md">
                            <ThumbsUp className="h-3.5 w-3.5 text-green-600" />
                          </Button>
                        </div>
                      </div>
                    ))}
                    {activity.action.includes("7") && (
                      <div className="col-span-2 pt-2">
                        <Button variant="link" className="text-sm text-blue-600 hover:text-blue-700 font-medium p-0 h-auto">
                          Show all 7 photos →
                        </Button>
                      </div>
                    )}
                  </div>
                )}

                {/* Review */}
                {activity.review && (
                  <>
                    <div className="relative w-full h-72 bg-gray-200 group">
                      <img
                        src={activity.image}
                        alt={activity.business?.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                    </div>
                    <div className="px-4 py-4 bg-gradient-to-b from-white to-gray-50">
                      <div className="flex items-center gap-2 mb-3">
                        <StarRating rating={activity.review.rating} />
                        <span className="text-xs text-gray-500">5 stars</span>
                      </div>
                      <p className="text-sm text-gray-700 leading-relaxed line-clamp-3 mb-4">
                        {activity.review.text}
                      </p>
                      <div className="flex items-center gap-2 pt-3 border-t border-gray-200">
                        <Button variant="ghost" size="sm" className="h-9 flex-1 hover:bg-blue-50 hover:text-blue-700">
                          <Lightbulb className="h-4 w-4 mr-1.5" />
                          <span className="text-xs">Useful</span>
                        </Button>
                        <Button variant="ghost" size="sm" className="h-9 flex-1 hover:bg-green-50 hover:text-green-700">
                          <Hand className="h-4 w-4 mr-1.5" />
                          <span className="text-xs">Funny</span>
                        </Button>
                        <Button variant="ghost" size="sm" className="h-9 flex-1 hover:bg-green-50 hover:text-green-700">
                          <Heart className="h-4 w-4 mr-1.5" />
                          <span className="text-xs">Love</span>
                        </Button>
                        <Button variant="ghost" size="sm" className="h-9 flex-1 hover:bg-blue-50 hover:text-blue-700">
                          <MessageCircle className="h-4 w-4 mr-1.5" />
                          <span className="text-xs">Comment</span>
                        </Button>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button 
            variant="outline" 
            className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 border-blue-200 text-base font-semibold px-8 py-6 h-auto"
          >
            Show more activity
            <ChevronDown className="h-5 w-5 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default RecentActivity;

