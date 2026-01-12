import { useQuery } from "@tanstack/react-query";

import ChatRoomApiServices from "@/api-services/chat-rooms/chat-room-api-services";
import { TChatRoomMessagesResponse } from "@/api-services/chat-rooms/chat-room-api-definations";


export const useFetchChatRoomMessages = (
  roomId: number,
  limit: number = 20,
  before?: number
) => {
  return useQuery<TChatRoomMessagesResponse>({
    queryKey: ["chat-room-messages", roomId, limit, before],
    queryFn: () =>
      ChatRoomApiServices.fetchChatRoomMessages(roomId, { limit, before }),
    enabled: !!roomId,
    // staleTime: 0,
    // refetchInterval: 5000,
    // refetchIntervalInBackground: true,
    staleTime: Infinity,
  });
};
