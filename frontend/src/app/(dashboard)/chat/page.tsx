
"use client"
import { ChatArea } from '@/modules/ui/view/chat-room/chat-area-view';
import DesignRoom from '@/modules/ui/view/chat-room/chat-room-design';
import { ChatSidebar } from '@/modules/ui/view/chat-room/chat-sidebar-view';
import { GroupInfoModal } from '@/modules/ui/view/chat-room/group-info-model-view';
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