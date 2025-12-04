"use client"
import React, { useState } from 'react'
import { ChatSidebar } from './chat-sidebar-view'
import { ChatArea } from './chat-area-view'
import { TChatRoomResponse } from '@/api-services/chat-rooms/chat-room-api-definations';

const DesignRoom = () => {
    const [selectedRoom, setSelectedRoom] = useState<TChatRoomResponse | null>(null);
  return (
    <div className="flex h-screen fixed w-full">
        <ChatSidebar selectedRoom={selectedRoom} onSelectRoom={setSelectedRoom} />
        <ChatArea  selectedRoom={selectedRoom}/>
    </div>
  )
}

export default DesignRoom