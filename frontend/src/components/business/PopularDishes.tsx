import React from "react";
import { Camera } from "lucide-react";

interface Dish {
  id: string;
  name: string;
  price: string;
  photoCount?: number;
  reviewCount?: number;
}

interface PopularDishesProps {
  dishes: Dish[];
}

const PopularDishes = ({ dishes }: PopularDishesProps) => {
  return (
    <div className="bg-white border-b border-gray-200 py-6">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Popular Dishes</h2>
          <button className="text-blue-600 hover:text-blue-700 font-medium">
            View full menu
          </button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {dishes.map((dish) => (
            <div key={dish.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
              <div className="relative h-40 bg-gray-100">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center">
                  <span className="text-gray-400 text-sm">Photo</span>
                </div>
                {(dish.photoCount || dish.reviewCount) && (
                  <div className="absolute bottom-2 left-2 flex items-center gap-2 text-white bg-black/50 px-2 py-1 rounded text-xs">
                    {dish.photoCount && (
                      <span className="flex items-center gap-1">
                        <Camera className="h-3 w-3" />
                        {dish.photoCount}
                      </span>
                    )}
                    {dish.reviewCount && (
                      <span>{dish.reviewCount} Reviews</span>
                    )}
                  </div>
                )}
              </div>
              <div className="p-3">
                <h3 className="font-semibold text-gray-900 mb-1">{dish.name}</h3>
                <p className="text-green-600 font-semibold">{dish.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularDishes;

