"use client";

import { TChatRoomListResponse } from "@/api-services/chat-rooms/chat-room-api-definations";
import ChatRoomApiServices from "@/api-services/chat-rooms/chat-room-api-services";
import { User } from "lucide-react";
import { use, useEffect, useState } from "react";
import SidebarUserInfo from "./user-info-view";


const api = new ChatRoomApiServices();
export const ChatSidebar = () => {

    const [ searchTerm, setSearchTerm] = useState<string>("");

    const [loading,setLoading]=useState<boolean>(false);

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
      setLoading(true);
      try{
        //   await new Promise(resolve => setTimeout(resolve, 2000));
          const response = await api.fetchChatRoomsList(searchTerm);
          setRooms(response);
      }
      catch(err){
          console.error("Error fetching chat rooms:", err);
      }
      finally{
          setLoading(false);
      }
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
            <SidebarUserInfo />
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

                {loading && (
                    <div className="flex items-center justify-center p-4">
                        Loading chat rooms...
                    </div>
                )}

                {!loading && (

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
                            <div className="font-bold truncate">{room.name}</div>
                            <div className="font-serif truncate">{room.last_message?.content}</div>
                        </div>
                    </div>
                    ))}
                </div>
            )}
            </div>
        </div>
       
  );
};
