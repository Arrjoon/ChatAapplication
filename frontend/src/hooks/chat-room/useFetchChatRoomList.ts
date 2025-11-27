import { TChatRoomListResponse } from "@/api-services/chat-rooms/chat-room-api-definations";
import ChatRoomApiServices from "@/api-services/chat-rooms/chat-room-api-services";
import { useQuery } from "@tanstack/react-query";

export const CHAT_ROOM_LIST_QUERY_KEY = 'chatRoomList';


const chatRoomApi = new ChatRoomApiServices();
export const useFetchChatRoomList = (search:string) => {
    return useQuery<TChatRoomListResponse>({
        queryKey :[CHAT_ROOM_LIST_QUERY_KEY,search],
        queryFn:() => chatRoomApi.fetchChatRoomsList(search),
    }
    );
}