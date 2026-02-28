"use client";

import React from "react";
import { ArrowRight, Star, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface FeaturedList {
  id: string;
  title: string;
  description: string;
  image: string;
  count: number;
}

const featuredLists: FeaturedList[] = [
  {
    id: "1",
    title: "Top 100 Places to Eat in 2026",
    description: "Discover the best restaurants in Kathmandu",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80",
    count: 100,
  },
  {
    id: "2",
    title: "Best Coffee Shops",
    description: "Your guide to amazing coffee experiences",
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&q=80",
    count: 50,
  },
  {
    id: "3",
    title: "Hidden Gems",
    description: "Local favorites you need to try",
    image: "https://images.unsplash.com/photo-1552569973-610e8c050afb?w=600&q=80",
    count: 75,
  },
];

const FeaturedSection = () => {
  return (
    <section className="w-full bg-gradient-to-br from-blue-50 via-white to-green-50 py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex items-start justify-between mb-10">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <span className="text-sm font-semibold text-green-600 uppercase tracking-wide">Featured Lists</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3 leading-tight">
              Top 100 Places to Eat in 2026
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl">
              Discover the most popular and highly-rated restaurants, cafes, and dining experiences in Kathmandu
            </p>
          </div>
          <Button variant="outline" className="hidden lg:flex border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold px-6">
            See all lists
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {featuredLists.map((list, idx) => (
            <Link
              key={list.id}
              href={`/lists/${list.id}`}
              className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-green-200"
            >
              <div className="relative h-72 overflow-hidden">
                <img
                  src={list.image}
                  alt={list.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20"></div>
                
                {/* Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-green-600 text-white text-xs font-bold rounded-full">
                    #{idx + 1} List
                  </span>
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className="h-4 w-4 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                    <span className="text-white/90 text-sm font-medium">{list.count} places</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-green-300 transition-colors">
                    {list.title}
                  </h3>
                  <p className="text-white/80 text-sm leading-relaxed mb-4">{list.description}</p>
                  <div className="flex items-center text-white/90 text-sm font-medium group-hover:text-green-300 transition-colors">
                    Explore list
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="text-center mt-8 lg:hidden">
          <Button variant="outline" className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold">
            See all lists
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;

