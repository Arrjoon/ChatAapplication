import MessageBubble from "./messageBubble";


export default function ChatWindow(){
    return(
        <div className="flex flex-col h-screen w-full">

            {/* Header */}
            <div className="flex items-center justify-center p-4 border-b bg-white shadow">
                <div className="text-xl font-semibold ">
                    chat rooms
                </div>
            </div>
            {/* Messages  */}
            <div className="flex-1 overflow-y-auto bg-gray-50 p-4 space-y-3">
                <MessageBubble/> 
                <MessageBubble/>
            </div>


            {/* Input  */}

            <div className="p-4 border-t bg-white flex gap-2" >
                <input className="flex-1 rounded-lg border p-2 "
                placeholder="Type message "
                />
                <button className="bg-blue-600 text-white px-4 rounded-lg">
                    Send
                </button>

            </div>



        </div>
    )
}