import ChatRoomItem from "./chatRoomItem";

export default function ChatRoomList(){
    return (
        <div className="w-full max-w-md bg-white  h-screen ">

            <h2 className="text-xl  font-semibold mb-4"> Groups Chats </h2>
            <div className="space-y-2">
                <ChatRoomItem />
                <ChatRoomItem />
                <ChatRoomItem />
            </div>
            
        </div>
    )
}