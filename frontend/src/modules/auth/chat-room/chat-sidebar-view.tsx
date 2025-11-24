"use client";

import { TChatRoomListResponse } from "@/api-services/chat-rooms/chat-room-api-definations";
import ChatRoomApiServices from "@/api-services/chat-rooms/chat-room-api-services";
import { User } from "lucide-react";
import { use, useEffect, useState } from "react";

const api = new ChatRoomApiServices();
export const ChatSidebar = () => {

    const [ searchTerm, setSearchTerm] = useState<string>("");

    const getInitials = (name:string) => {
      return name
        .split(" ")
        .map((part) => part.charAt(0))
        .join("")
        .toUpperCase()
        .slice(0, 2);
    }

    const [rooms,setRooms] = useState<TChatRoomListResponse>([]);

    

    const loadChatRooms = async () => {
      const response = await api.fetchChatRoomsList(searchTerm);
      setRooms(response);
    };

    useEffect(() => {
        try{
            loadChatRooms();
        }
        catch(err){
            console.error("Failed to load chat rooms:", err);
        }
    }, [searchTerm]);


  return (
    <div className="w-80 bg-white border-r border-gray-200 h-screen flex flex-col" >
        {/* your info  */}
            <div className="flex items-center justify-between p-4 border-gray-200">
                <div className="flex-1 p-2 border-b border-gray-200 flex items-center gap-2">
                    <div className="bg-gray-100 rounded-full w-10 h-10 flex items-center justify-center">
                        <User className="h-30 w-8 text-gray-500" />
                    </div>
                    <div className="flex-col items-center text-xl">
                        <div className="font-bold">You</div>
                        <div className="text-sm">online</div>
                    </div>
                </div>
                <div >
                    New
                </div>
            </div>
            <div>
                <div className="flex items-center justify-center"> chats </div>
                {/* search bar */}
                <div className="p-4">
                    <input 
                        type="text" 
                        placeholder="Search chats..." 
                        className="border border-gray-300 rounded-lg w-full px-3 py-2 focus:outline-none foucs:ring-2 focus:ring-blue-400"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                {/* chat list  */}    

                <div className="flex-col overflow-y-auto h-[calc(100vh-120px)]">
                    {rooms.map((room) => (
                    <div key={room.id} className="flex items-center p-4 hover:bg-gray-50 cursor-pointer">
                        {room.avatar ? (
                        <img src={room.avatar} alt={room.name} className="avatar" />
                        ) : (
                        <div className="bg-gray-100 rounded-full w-12 h-12 flex items-center justify-center">
                            {getInitials(room.name)}
                        </div>
                        )}
                        <div className="flex-1 ml-3 overflow-hidden">
                            <div className="font-semibold text-gray-800 truncate">{room.name}</div>
                            <div className="font-serif truncate">{room.last_message?.content}</div>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
        </div>
       
  );
};
