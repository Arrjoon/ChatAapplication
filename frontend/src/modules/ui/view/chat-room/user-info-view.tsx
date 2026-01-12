'use client';

import { User } from 'lucide-react';
import { useUser } from '@/context/UserContext'; 
import SidebarDropdown from './drop-down-model';

const SidebarUserInfo = () => {
  const { user } = useUser(); 

  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-200">
      <div className="flex-1 p-2 flex items-center gap-2">
        <div className="bg-gray-100 rounded-full w-10 h-10 flex items-center justify-center">
          <User className="h-8 w-8 text-gray-500" />
        </div>
        <div className="flex flex-col text-xl">
          <div className="font-bold">{user?.username || 'You'}</div>
          <div className="text-sm">{user ? 'online' : 'offline'}</div>
        </div>
      </div>
      <div>New</div>
      <SidebarDropdown />
    </div>
  );
};

export default SidebarUserInfo;
