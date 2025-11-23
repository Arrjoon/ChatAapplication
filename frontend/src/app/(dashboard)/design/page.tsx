
"use client"
import { ChatArea } from '@/modules/auth/chat-room/chat-area-view';
import { ChatSidebar } from '@/modules/auth/chat-room/chat-sidebar-view';
import { GroupInfoModal } from '@/modules/auth/chat-room/group-info-model-view';
import { ChatGroupModal } from '@/modules/auth/chat-room/room-create-model-view'
import React, { useState } from 'react'

const Design = () => {
const [open, setOpen] = useState(false);
  return (
    <>
      {/* <button onClick={() => setOpen(true)}>Open Modal</button>

      <ChatGroupModal 
        open={open} 
        onClose={() => setOpen(false)} 
        addPeople={false} 
        /> */}

    <div className="flex h-screen">
        <ChatSidebar />
        <ChatArea />
        {/* Example: show modal */}
        {/* <GroupInfoModal open={true} /> */}
    </div>
    </>
  );
}

export default Design