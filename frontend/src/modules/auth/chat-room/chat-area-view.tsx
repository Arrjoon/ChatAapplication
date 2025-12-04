"use client";

import { TChatRoomResponse } from "@/api-services/chat-rooms/chat-room-api-definations";
import { User } from "lucide-react";

type selectedRoomprops = {
  selectedRoom: TChatRoomResponse | null;
};

export const ChatArea = ({selectedRoom}:selectedRoomprops) => {
  return (
    <div className="flex-1 bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="h-14 bg-white border-b border-gray-300 flex items-center px-4">
        <div>{selectedRoom && selectedRoom.name}</div>
        <div className="ml-auto">
          info icon
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 bg-gray-200 p-4 overflow-y-auto flex flex-col gap-4">
        {/* Example Message */}
        <div className="flex items-start gap-2">
          <User className="w-6 h-6 text-gray-600" />
          <div className="bg-white p-3 rounded-lg shadow">
            Hello! This is a sample message.
            {selectedRoom ? ` You are in the room: ${selectedRoom.name}` : " No room selected."}
          </div>
        </div>
        <div className="flex items-start gap-2">
          <User className="w-6 h-6 text-gray-600" />
          <div className="bg-white p-3 rounded-lg shadow">
            Another message in the chat area.
          </div>
        </div>
    
      </div>
   

      {/* Input Area */}
      <div className="h-16 bg-white border-t border-gray-300 flex items-center px-4">
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button className="ml-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
          Send
        </button>
      </div>


     
    </div>
  );
};
