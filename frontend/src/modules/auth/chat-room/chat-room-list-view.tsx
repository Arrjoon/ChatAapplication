"use client";

import { User } from "lucide-react";

export const ChatSidebar = () => {

    const getInitials = (name:string) => {
      return name
        .split(" ")
        .map((part) => part.charAt(0))
        .join("")
        .toUpperCase()
        .slice(0, 2);
    }
  // Static chat rooms
  const chatRooms = [
    { id: 1, name: "Snowberry", lastMessage: "Hey, how are you?", avatar: "" },
    { id: 2, name: "TingTing", lastMessage: "Let's meet tomorrow.", avatar: "" },
    { id: 3, name: "Pomelo HRM", lastMessage: "Campaign launch at 5 PM. dfgfdjgkldfgj dgj dfgjkldfg jdflg jdflgj dflgjdfklgjdfklg dflgjdfklgj dfklgjdf gdfg jf", avatar: "" },
    { id: 4, name: "Design Team", lastMessage: "Please review the new designs.", avatar: "" },
    { id: 5, name: "Mike Johnson", lastMessage: "Can you send the report?", avatar: "" },
  ];


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
                <div className="flex items-center justify-center h-16"> chats </div>
                <div className="flex-col overflow-y-auto h-[calc(100vh-120px)]">
                    {chatRooms.map((room) => (
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
                            <div className="font-serif truncate">{room.lastMessage}</div>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
        </div>
       
  );
};
