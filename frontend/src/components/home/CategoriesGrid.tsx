import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { 
  UtensilsCrossed, 
  ShoppingBag, 
  Sparkles, 
  Target, 
  Scissors, 
  Car, 
  Home, 
  MoreHorizontal 
} from "lucide-react";

interface Category {
  name: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
}

const categories: Category[] = [
  {
    name: "Restaurants",
    icon: <UtensilsCrossed className="h-8 w-8" />,
    color: "text-blue-600",
    bgColor: "bg-blue-50"
  },
  {
    name: "Shopping",
    icon: <ShoppingBag className="h-8 w-8" />,
    color: "text-blue-600",
    bgColor: "bg-blue-50"
  },
  {
    name: "Nightlife",
    icon: <Sparkles className="h-8 w-8" />,
    color: "text-blue-600",
    bgColor: "bg-blue-50"
  },
  {
    name: "Active Life",
    icon: <Target className="h-8 w-8" />,
    color: "text-green-600",
    bgColor: "bg-green-50"
  },
  {
    name: "Beauty & Spas",
    icon: <Scissors className="h-8 w-8" />,
    color: "text-green-600",
    bgColor: "bg-green-50"
  },
  {
    name: "Automotive",
    icon: <Car className="h-8 w-8" />,
    color: "text-blue-600",
    bgColor: "bg-blue-50"
  },
  {
    name: "Home Services",
    icon: <Home className="h-8 w-8" />,
    color: "text-blue-600",
    bgColor: "bg-blue-50"
  },
  {
    name: "More",
    icon: <MoreHorizontal className="h-8 w-8" />,
    color: "text-gray-600",
    bgColor: "bg-gray-50"
  }
];

const CategoriesGrid = () => {
  return (
    <section className="w-full bg-gradient-to-b from-gray-50 to-white py-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Explore Categories
          </h2>
          <p className="text-gray-600 text-lg">
            Find exactly what you're looking for
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Card
              key={category.name}
              className="cursor-pointer hover:shadow-xl transition-all hover:scale-105 border-2 hover:border-blue-500 overflow-hidden group"
            >
              <CardContent className={`flex flex-col items-center justify-center p-8 aspect-square ${category.bgColor} group-hover:bg-white transition-all`}>
                <div className={`mb-4 ${category.color} group-hover:scale-110 transition-transform`}>
                  {category.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 text-center group-hover:text-blue-700 transition-colors">
                  {category.name}
                </h3>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesGrid;

