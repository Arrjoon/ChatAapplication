import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon: LucideIcon;
  iconColor?: string;
  iconBg?: string;
}

const StatCard = ({
  title,
  value,
  change,
  changeType = "neutral",
  icon: Icon,
  iconColor = "text-blue-600",
  iconBg = "bg-blue-50",
}: StatCardProps) => {
  const changeColors = {
    positive: "text-green-600",
    negative: "text-red-600",
    neutral: "text-gray-600",
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
            <p className="text-3xl font-bold text-gray-900 mb-2">{value}</p>
            {change && (
              <p className={`text-sm font-medium ${changeColors[changeType]}`}>
                {change}
              </p>
            )}
          </div>
          <div className={`${iconBg} p-3 rounded-xl`}>
            <Icon className={`h-6 w-6 ${iconColor}`} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;

