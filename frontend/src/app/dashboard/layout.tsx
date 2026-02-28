"use client";

import React from "react";

// Dashboard layout - individual pages handle their own sidebar
// This allows for role-specific sidebars on each page
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {children}
    </div>
  );
}

