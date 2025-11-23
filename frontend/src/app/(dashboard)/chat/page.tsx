"use client";

import ChatRoomApiServices from "@/api-services/chat-rooms/chat-room-api-services";
import { useEffect } from "react";


export default function ChatRoomTestPage() {
    useEffect(() => {
        const test = async () => {
            try {
                const service = new ChatRoomApiServices();
                const res = await service.fetchChatRoomsList();  
                
                console.log("Chat Rooms List:", res);
            } catch (err) {
                console.error("API error:", err);
            }
        };

        test();
    }, []);

    return <div>Check the console for results</div>;
}
