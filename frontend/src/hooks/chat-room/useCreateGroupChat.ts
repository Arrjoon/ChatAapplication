import { TChatRoomResponse, TCreateChatRoomPayload } from "@/api-services/chat-rooms/chat-room-api-definations";
import ChatRoomApiServices from "@/api-services/chat-rooms/chat-room-api-services";
import { useMutation } from "@tanstack/react-query"


export const useCreateGroupChat = () => {
    // Implementation for the hook to create a group chat\
    return useMutation<TChatRoomResponse,Error,TCreateChatRoomPayload>({
      mutationFn: async (req) => {
        const formData = new FormData();
        formData.append("group_name", req.name ?? "");

        if (req.picture instanceof File) {
          formData.append("picture", req.picture);
        } else {
          formData.append("picture", req.picture);
        }

        formData.append("participants", JSON.stringify(req.participants));

        
      formData.append("is_group", req?.is_group ? "true" : "false");
        

      return await ChatRoomApiServices.createChatRoom(formData);
      },
    });

}