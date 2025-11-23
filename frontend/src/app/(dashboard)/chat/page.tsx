import { ChatGroupModal } from "@/modules/auth/chat-room/chat-room-view";

const Page = () => {
  return (
    <div className="flex h-full flex-col rounded-sm bg-white">
      <ChatGroupModal open={undefined} onClose={undefined} addPeople={undefined} />
    </div>
  );
};

export default Page;
