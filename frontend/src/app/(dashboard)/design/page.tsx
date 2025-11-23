
"use client"
import { ChatSidebar } from '@/modules/auth/chat-room/chat-room-list-view';
import { ChatGroupModal } from '@/modules/auth/chat-room/room-create-model-view'
import React, { useState } from 'react'

const Design = () => {
const [open, setOpen] = useState(false);
  return (
    <>
      <button onClick={() => setOpen(true)}>Open Modal</button>

      <ChatGroupModal 
        open={open} 
        onClose={() => setOpen(false)} 
        addPeople={false} 
      />
      
      <ChatSidebar />
    </>
  );
}

export default Design