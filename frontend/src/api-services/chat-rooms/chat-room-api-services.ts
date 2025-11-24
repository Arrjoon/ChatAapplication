import { apiClient } from "@/api/api-client";
import { IChatRoomApiServices, TChatRoomListResponse } from "./chat-room-api-definations";
import { FETCH_CHAT_ROOMS_LIST } from "@/lib/end-points";

class ChatRoomApiServices implements IChatRoomApiServices {
    async fetchChatRoomsList(search?:string): Promise<TChatRoomListResponse> {
        // Implementation for fetching chat rooms list
        const response = await apiClient.get(FETCH_CHAT_ROOMS_LIST,{
            params:{
                name: search || ''
            }
        });
        return response.data;
    }

    async fetchChatRoomDetails(roomId: number): Promise<any> {
        // Implementation for fetching chat room details
    }

    async createChatRoom(name: string, members: number[]): Promise<any> {
        // Implementation for creating a new chat room
    }
}

export default ChatRoomApiServices;