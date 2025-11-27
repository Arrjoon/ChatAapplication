import { apiClient } from "@/api/api-client";
import { IChatRoomApiServices, TChatRoomListResponse, TCreateChatRoomPayload } from "./chat-room-api-definations";
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

    async createChatRoom(req:FormData): Promise<TCreateChatRoomPayload> {
        // Implementation for creating a new chat room
        const response =  await apiClient.post(FETCH_CHAT_ROOMS_LIST, req, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    }
}

export default new ChatRoomApiServices;