import { TChatRoomResponse, TCreateChatRoomPayload } from "@/api-services/chat-rooms/chat-room-api-definations";
import ChatRoomApiServices from "@/api-services/chat-rooms/chat-room-api-services";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { CHAT_ROOM_LIST_QUERY_KEY } from "./useFetchChatRoomList";


export const useCreateGroupChat = () => {
  const queryClient = useQueryClient();
  // Implementation for the hook to create a group chat\
  return useMutation<TChatRoomResponse, Error, TCreateChatRoomPayload>({
    mutationFn: async (req) => {
      const formData = new FormData();
      formData.append("group_name", req.group_name ?? "");

      if (req.picture instanceof File) {
        formData.append("picture", req.picture);
      } else {
        formData.append("picture", '');
      }

      req.user_ids.forEach((id) => {
        formData.append("user_ids", id);  // NOT JSON.stringify
      });

      formData.append("is_group", req?.is_group ? "true" : "false");


      return await ChatRoomApiServices.createChatRoom(formData);
    },
    onSuccess: (data) => {
      console.log("Group chat created successfully:", data);
      queryClient.invalidateQueries({ queryKey: [CHAT_ROOM_LIST_QUERY_KEY] });
    }
  });

}