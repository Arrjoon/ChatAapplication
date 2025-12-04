
"use client"
import { ChatArea } from '@/modules/auth/chat-room/chat-area-view';
import DesignRoom from '@/modules/auth/chat-room/chat-room-design';
import { ChatSidebar } from '@/modules/auth/chat-room/chat-sidebar-view';
import { GroupInfoModal } from '@/modules/auth/chat-room/group-info-model-view';
import { ChatGroupModal } from '@/modules/auth/chat-room/room-create-model-view1'
import React, { useState } from 'react'

const Design = () => {
const [open, setOpen] = useState(false);
  return (
    <div>
      <DesignRoom />
    </div>
  );
}

export default Design