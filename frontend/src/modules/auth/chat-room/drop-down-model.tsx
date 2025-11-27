'use client';
import { useState, useRef, useEffect } from 'react';
import { UserPlus, Star, CheckSquare, Lock, LogOut } from 'lucide-react';
import AddGroupSidebar from './chat-room-model-view';
import ChatRoomModalView from './chat-room-model-view';


type UserType = {
  id: number;
  name: string;
};


const SidebarDropdown = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const users: UserType[] = [
    { id: 1, name: "Arjun" },
    { id: 2, name: "Sita" },
    { id: 3, name: "Ram" },
    { id: 4, name: "Shyam" },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="p-2 rounded-full hover:bg-gray-100"
        onClick={() => setOpen(!open)}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <ul className="flex flex-col py-2">
       
              <button className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => setIsModalOpen(true)}><UserPlus className="w-5 h-5" /> New group</button>
                
   
            <ChatRoomModalView users={users} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
 
            <li className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer">
              <Star className="w-5 h-5" /> Starred messages
            </li>
            <li className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer">
              <CheckSquare className="w-5 h-5" /> Select chats
            </li>
            <li className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer">
              <Lock className="w-5 h-5" /> App lock
            </li>
            <li className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer">
              <LogOut className="w-5 h-5" /> Log out
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default SidebarDropdown;
