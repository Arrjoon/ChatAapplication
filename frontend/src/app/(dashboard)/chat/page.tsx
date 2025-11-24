"use client";

import ChatRoomApiServices from "@/api-services/chat-rooms/chat-room-api-services";
import { useEffect } from "react";


export default function ChatRoomTestPage() {
    return <div>

        <div className="relative bg-gray-300 p-10 h-80">
            <div className="absolute top-0 left-0 bg-red-500 p-2">
                Top Left
            </div>
            
            <div className="absolute top-0 right-0 bg-blue-500 p-2">
                Top Right
            </div>
            
            <div className="absolute bottom-0 left-0  bg-green-500 p-2">
                Bottom Left
            </div>
            
            <div className="absolute bottom-0 right-0 bg-yellow-500 p-2">
                Bottom Right
            </div>
        </div>
        {/* <!-- Without absolute - normal width --> */}

        <div className="relative bg-red-200 p-4 h-32 top-14 z-20">
            <div className="absolute top-0 left-0 bg-red-500 text-white p-2">
                Absolute div (only as wide as its content)
            </div>
        </div>

        <div className="relative ">
        <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            3
        </span>
        </div>
    </div>;
}
